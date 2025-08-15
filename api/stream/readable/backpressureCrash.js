import { Readable } from 'node:stream';

/**
 * 背压导致内存膨胀 / 崩溃的典型错误示例 与 正确写法对比
 *
 * 用法:
 *   node backpressureCrash.js bad  200000   # 触发错误写法 (危险: 会快速占用内存)
 *   node backpressureCrash.js good 200000   # 正确写法 (受背压调节)
 *   环境变量 LOG_INTERVAL 控制内存日志间隔(默认 10000)
 *
 * 核心点：
 *  - push() 返回 false => 内部缓冲(highWaterMark)已满，应停止继续生产，等待 'drain'/下一次 _read 机会
 *  - 错误写法: 在一个 while 循环里忽略返回值，事件循环被长时间阻塞，data 事件无法及时处理，所有对象挤进内部队列 => 内存爆炸
 *  - 正确写法: 遇到 false 就 break，等待框架稍后再次调用 _read，形成“生产-消费”节奏
 */

// ========== 错误示例 ==========
class BadNumberStream extends Readable {
   constructor(max = 1e6) {
      super({ objectMode: true, highWaterMark: 16 });
      this.current = 0;
      this.max = max;
   }
   _read() {
      // 疯狂同步 while，阻塞事件循环，忽略 push() 返回值
      while (this.current < this.max) {
         const obj = { n: this.current++, payload: 'x'.repeat(1024) }; // 每条附加 1KB 字符串放大内存增长速度
         this.push(obj); // 错误: 不判断返回值
         if (this.current % this.logInterval === 0) this.logMem();
      }
      this.push(null);
   }
   logInterval = parseInt(process.env.LOG_INTERVAL || '10000', 10);
   logMem() {
      const { rss, heapUsed, external } = process.memoryUsage();
      console.error(`[BAD] produced=${this.current} rss=${fmt(rss)} heap=${fmt(heapUsed)} external=${fmt(external)}`);
   }
}

// ========== 正确示例 ==========
class GoodNumberStream extends Readable {
   constructor(max = 1e6) {
      super({ objectMode: true, highWaterMark: 16 });
      this.current = 0;
      this.max = max;
   }
   _read() {
      let canPush = true;
      while (canPush && this.current < this.max) {
         const obj = { n: this.current++, payload: 'x'.repeat(1024) };
         canPush = this.push(obj); // 当内部缓冲达到 highWaterMark => false，停止本轮生产
         if (this.current % this.logInterval === 0) this.logMem('[GOOD]');
      }
      if (this.current >= this.max) this.push(null);
      // 若 canPush=false，Readable 框架在缓冲被下游取走后会再次调用 _read，无需手动 setTimeout
   }
   logInterval = parseInt(process.env.LOG_INTERVAL || '10000', 10);
   logMem(tag='[GOOD]') {
      const { rss, heapUsed, external } = process.memoryUsage();
      console.error(`${tag} produced=${this.current} rss=${fmt(rss)} heap=${fmt(heapUsed)} external=${fmt(external)}`);
   }
}

function fmt(bytes) {
   return (bytes / 1024 / 1024).toFixed(1) + 'MB';
}

// ========== 运行控制 ==========
const mode = process.argv[2] || 'bad';
const max = parseInt(process.argv[3] || '200000', 10);

if (!['bad', 'good'].includes(mode)) {
   console.log('用法: node backpressureCrash.js <bad|good> [maxItems]\n示例: node backpressureCrash.js bad 500000');
   process.exit(1);
}

console.error(`启动模式=${mode} max=${max}`);
const stream = mode === 'bad' ? new BadNumberStream(max) : new GoodNumberStream(max);

let consumed = 0;
stream.on('data', obj => {
   // 模拟“慢消费者”: 这里只是同步计数，不特意延迟，因为坏例子已经阻塞事件循环造成积压
   consumed++;
   if (consumed % 20000 === 0) {
      const { rss, heapUsed } = process.memoryUsage();
      console.log(`消费进度 consumed=${consumed} rss=${fmt(rss)} heap=${fmt(heapUsed)}`);
   }
});

stream.on('end', () => {
   console.log(`结束 consumed=${consumed}`);
});

stream.on('error', e => {
   console.error('流错误:', e);
});

process.on('warning', w => console.warn('Warning:', w));

/* 说明:
 * bad 模式: 单次 _read 内 while 同步塞满(甚至超出)缓冲, data 事件要等 while 结束后才会被处理, 期间所有对象排队占内存 -> rss 快速增长, 可能 OOM.
 * good 模式: 遇到 push=false 立刻停止本轮生产, 待消费后框架调用下一次 _read, 内存保持稳定的缓冲窗口。
 * 观察: rss/heapUsed 在 bad 下持续向上, good 下呈锯齿或缓慢增长。
 */
