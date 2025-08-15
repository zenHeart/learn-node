#!/usr/bin/env node
import { Readable } from 'node:stream';

/**
 * 更贴切的 Readable 使用场景示例：生成“实时日志”数据。
 * 适用：数据并非来自现有底层资源(文件/Socket)，而是应用内合成/计算结果，需要按需(push)给消费者。
 *
 * 特点：
 *  - 下游需要数据时 Node 会调用 _read(size)
 *  - 我们批量生成若干行（受 size 与内部策略影响）直到 push 返回 false（表示缓冲区满）就暂停
 *  - Node 在缓冲区被消费后会再次调用 _read 触发继续生成 —— 展示背压调节
 */
class RandomLogStream extends Readable {
   #emitted = 0;
   constructor({ total = 1000, batch = 10, levelWeights } = {}) {
      super({ encoding: 'utf8' });
      this.total = total;
      this.batch = batch;
      this.levelWeights = levelWeights || { INFO: 0.7, WARN: 0.2, ERROR: 0.1 };
      this.#levels = Object.entries(this.levelWeights);
   }
   #levels;

   #pickLevel() {
      const r = Math.random();
      let acc = 0;
      for (const [lvl, w] of this.#levels) {
         acc += w;
         if (r <= acc) return lvl;
      }
      return this.#levels[this.#levels.length - 1][0];
   }

   _read(size) { // size: 下游希望读取的大致字节数(可忽略)
      if (this.#emitted >= this.total) {
         this.push(null); // 结束
         return;
      }
      let linesGenerated = 0;
      while (this.#emitted < this.total && linesGenerated < this.batch) {
         const ts = new Date().toISOString();
         const level = this.#pickLevel();
         const msg = `user=${Math.floor(Math.random()*1000)} op=action${Math.floor(Math.random()*50)}`;
         const line = `[${ts}] ${level} ${msg} seq=${this.#emitted}\n`;
         const canContinue = this.push(line);
         this.#emitted++;
         linesGenerated++;
         if (!canContinue) {
            // 底层缓冲区已满，暂停生成，待消费后 Node 会再次调用 _read
            return;
         }
      }
      // 还有剩余但未触发背压，异步调度下一轮，避免长时间阻塞事件循环
      if (this.#emitted < this.total) {
         setImmediate(() => this._read(size));
      } else {
         this.push(null);
      }
   }
}

function printUsage() {
   console.log(`用法:\n  node usecase-countline.js [总行数] [批量大小]\n示例:\n  node usecase-countline.js 50 5\n说明:\n  该脚本生成模拟日志行 (随机级别)。演示自定义 Readable 通过 _read 按需合成数据并处理背压。`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
   const total = parseInt(process.argv[2] || '30', 10);
   const batch = parseInt(process.argv[3] || '10', 10);
   if (process.argv.includes('-h') || process.argv.includes('--help')) {
      printUsage();
      process.exit(0);
   }
   const stream = new RandomLogStream({ total, batch });
   stream.on('data', chunk => process.stdout.write(chunk));
   stream.on('end', () => process.stderr.write(`\n完成，共 ${total} 行。\n`));
   stream.on('error', e => {
      console.error('错误:', e);
      process.exit(1);
   });
}

export { RandomLogStream };