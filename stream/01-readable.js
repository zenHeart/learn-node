// Stream - 可读流基础

const { Readable } = require('stream');

// 方式1：从数据创建可读流
const data = ['第一行', '第二行', '第三行', 'END'];
const readable1 = Readable.from(data);

readable1.on('data', (chunk) => {
  console.log('readable1:', chunk.toString());
});

readable1.on('end', () => {
  console.log('readable1 结束\n');
});

// 方式2：自定义可读流（manual 模式）
const readable2 = new Readable({
  read(size) {
    // 每次需要数据时调用
    // 可以 push 数据或 push null 结束
    if (this.destroyed) return;
    
    setTimeout(() => {
      if (this.currentChar > 90) {
        this.push(null); // 结束
      } else {
        this.push(String.fromCharCode(this.currentChar));
        this.currentChar++;
      }
    }, 50);
  }
});
readable2.currentChar = 65; // 'A'

readable2.on('data', (chunk) => {
  console.log('readable2:', chunk.toString());
});

readable2.on('end', () => {
  console.log('readable2 结束\n');
});

// 方式3：模拟数据源
class NumberStream extends Readable {
  constructor(max) {
    super();
    this.max = max;
    this.current = 1;
  }

  _read() {
    if (this.current > this.max) {
      this.push(null);
    } else {
      const data = JSON.stringify({ num: this.current }) + '\n';
      this.push(data);
      this.current++;
    }
  }
}

const numStream = new NumberStream(5);
numStream.on('data', (chunk) => {
  process.stdout.write('numStream: ' + chunk);
});

numStream.on('end', () => {
  console.log('\nnumStream 结束');
});

// 运行结果:
// readable1: 第一行
// readable1: 第二行
// readable1: 第三行
// readable1: END
// readable1 结束
//
// readable2: A
// readable2: B
// ... (每个 50ms 一个字符)
// readable2 结束
//
// numStream: {"num":1}
// numStream: {"num":2}
// ...
// numStream: {"num":5}
// numStream 结束
