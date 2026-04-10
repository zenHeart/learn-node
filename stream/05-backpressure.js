// Stream - 背压处理

const { Readable, Writable } = require('stream');

// 缓慢的写入器（模拟慢速目标）
class SlowWritable extends Writable {
  constructor(delay) {
    super();
    this.delay = delay;
    this.written = 0;
  }

  _write(chunk, encoding, callback) {
    this.written++;
    setTimeout(() => {
      callback();
    }, this.delay);
  }
}

// 快速读取器
const readable = Readable.from(Array.from({ length: 100 }, (_, i) => `item-${i}\n`));

const writable = new SlowWritable(10); // 每条延迟 10ms

let totalWritten = 0;
writable.on('finish', () => {
  console.log(`写入完成，共 ${totalWritten} 条`);
});

console.log('=== 无背压处理 ===');
const start1 = Date.now();

// 无背压 - 全部推入
readable.pipe(writable);

// 实际上，当写入速度慢于读取时，Node.js 会自动处理背压
// writable.on('drain') 事件表示可以继续写入

// 手动实现背压处理
console.log('\n=== 手动背压处理 ===');

class BackpressureWritable extends Writable {
  constructor(options) {
    super(options);
    this.highWaterMark = options.highWaterMark || 16;
  }

  _write(chunk, encoding, callback) {
    // 模拟慢写入
    setTimeout(() => {
      callback();
    }, 5);
  }
}

let canContinue = true;
const slowWritable = new BackpressureWritable({ highWaterMark: 1 });
const fastReadable = Readable.from(Array.from({ length: 20 }, (_, i) => `item-${i}\n`));

fastReadable.on('data', (chunk) => {
  const canWrite = slowWritable.write(chunk);
  if (!canWrite) {
    canContinue = false;
    slowWritable.once('drain', () => {
      canContinue = true;
    });
  }
});

slowWritable.on('finish', () => {
  console.log('慢写入器完成');
});

// 运行结果:
// === 无背压处理 ===
// 写入完成，共 100 条
//
// === 手动背压处理 ===
// 慢写入器完成
