// Stream - 可写流基础

const { Writable, Transform } = require('stream');

// 方式1：收集所有数据
let result = [];
const writable1 = new Writable({
  write(chunk, encoding, callback) {
    result.push(chunk.toString());
    callback();
  }
});

writable1.write('Hello ');
writable1.write('World');
writable1.end('!', () => {
  console.log('writable1 结果:', result.join(''));
});

// 方式2：逐行处理
class LineWritable extends Writable {
  constructor(options) {
    super(options);
    this.lines = [];
  }

  _write(chunk, encoding, callback) {
    const line = chunk.toString().trim();
    if (line) {
      this.lines.push(line);
    }
    callback();
  }
}

const lineWriter = new LineWritable();
lineWriter.write(Buffer.from('第一行\n'));
lineWriter.write(Buffer.from('第二行\n'));
lineWriter.write(Buffer.from('第三行\n'));
lineWriter.end('', () => {
  console.log('lineWriter 行数:', lineWriter.lines.length);
  consoleWriter.lines.forEach((l, i) => console.log(`  ${i + 1}: ${l}`));
});

// 方式3：累积写入文件
const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

const fileStream = fs.createWriteStream(path.join(testDir, 'stream-out.txt'));
fileStream.write('第一行写入\n');
fileStream.write('第二行写入\n');
fileStream.end('最后一行', () => {
  console.log('\n文件写入完成');
  console.log('文件内容:', fs.readFileSync(path.join(testDir, 'stream-out.txt'), 'utf8'));

  // 清理
  fs.unlinkSync(path.join(testDir, 'stream-out.txt'));
  fs.rmdirSync(testDir);
  console.log('清理完成');
});

// 运行结果:
// writable1 结果: Hello World!
// lineWriter 行数: 3
//   1: 第一行
//   2: 第二行
//   3: 第三行
//
// 文件写入完成
// 文件内容: 第一行写入
// 第二行写入
// 最后一行
// 清理完成
