import { Readable } from 'node:stream';

/**
 * highWaterMark 用法最小示例：
 *  - 生成一段文本，逐字符输出
 *  - 通过将 highWaterMark 设为 1，展示可以控制内部一次缓存的最大字节量
 *  - 不演示背压细节，只关注 highWaterMark 参数的设置与效果
 */
class CharStream extends Readable {
   #i = 0;
   #src;
   constructor(text, { highWaterMark = 1 } = {}) {
      super({ highWaterMark });
      this.#src = text;
   }
   _read() {
      // 异步让出事件循环，模拟数据逐步到达
      setTimeout(() => {
         if (this.#i >= this.#src.length) {
            this.push(null); // 结束
            return;
         }
         const ch = this.#src[this.#i++];
         this.push(ch); // 单字符（ASCII => 1 字节）
      }, 10);
   }
}

const text = 'ReadableHighWaterMarkDemo';
let count = 0;
const s = new CharStream(text, { highWaterMark: 1 });

s.on('data', ch => {
   count += ch.length;
   process.stdout.write(`字符:'${ch}' 累计:${count}/${text.length}\n`);
});
s.on('end', () => console.log(`完成，总字符=${count}`));

/* 说明:
 * 1. 未开启 objectMode 时 highWaterMark 按字节；这里设为 1 => 内部最多缓存 ≈1 字节后再触发下一轮读取。
 * 2. 因为一次只 push 一个字符，观察上就是逐字符输出。
 * 3. 如果把 highWaterMark 改大 (例如 16)，内部可能会更快连续读取并批量排队等待 data 事件触发，视觉上字符更密集。
 */