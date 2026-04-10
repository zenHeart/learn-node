// Stream - pipe 管道连接

const { Readable, Writable, Transform, pipeline } = require('stream');
const fs = require('fs');
const path = require('path');

// 模拟数据源
const readable = Readable.from(['第一行数据\n', '第二行数据\n', '第三行数据\n']);

// 转换流：大写转换
const upperTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// 转换流：添加行号
let lineNum = 0;
const numberTransform = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\n');
    lines.forEach((line, i) => {
      if (line && i < lines.length - 1) {
        lineNum++;
        this.push(`[${lineNum}] ${line}\n`);
      }
    });
    callback();
  }
});

// 输出流
let output = '';
const writable = new Writable({
  write(chunk, encoding, callback) {
    output += chunk.toString();
    callback();
  }
});

// 使用 pipe 连接
console.log('=== pipe 连接 ===\n');
readable
  .pipe(upperTransform)
  .pipe(numberTransform)
  .pipe(writable);

writable.on('finish', () => {
  console.log('最终输出:');
  console.log(output);

  // 使用 pipeline（更现代，推荐）
  console.log('\n=== pipeline 函数 ===\n');
  const { promisify } = require('util');
  const pipelineAsync = promisify(pipeline);

  async function run() {
    const r = Readable.from(['a\n', 'b\n', 'c\n']);
    const t = new Transform({ transform: (c, e, cb) => cb(null, c.toString().toUpperCase()) });
    let result = '';
    const w = new Writable({ write: (c, e, cb) => { result += c; cb(); } });

    await pipelineAsync(r, t, w);
    console.log('pipeline 结果:', result.trim());
  }

  run();
});

// 运行结果:
// === pipe 连接 ===
//
// 最终输出:
// [1] 第一行数据
// [2] 第二行数据
// [3] 第三行数据
//
// === pipeline 函数 ===
//
// pipeline 结果: A B C
