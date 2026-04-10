// Stream - 转换流实战：JSON 解析

const { Transform } = require('stream');

// 字节流 -> 行流 -> JSON 对象流
class LineParser extends Transform {
  constructor() {
    super({ objectMode: true }); // 对象模式
    this.buffer = '';
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop(); // 保留不完整的一行

    for (const line of lines) {
      if (line.trim()) {
        try {
          const obj = JSON.parse(line);
          this.push(obj);
        } catch (e) {
          this.emit('error', new Error(`JSON 解析失败: ${line}`));
          return;
        }
      }
    }
    callback();
  }

  _flush(callback) {
    // 处理最后一行
    if (this.buffer.trim()) {
      try {
        const obj = JSON.parse(this.buffer);
        this.push(obj);
      } catch (e) {
        // 忽略最后不完整的 JSON
      }
    }
    callback();
  }
}

// 使用
const { Readable } = require('stream');
const data = [
  '{"id":1,"name":"Alice","age":25}',
  '{"id":2,"name":"Bob","age":30}',
  '{"id":3,"name":"Charlie","age":35}',
];
const readable = Readable.from(data.join('\n') + '\n');

const parser = new LineParser();

readable
  .pipe(parser)
  .on('data', (obj) => {
    console.log('解析对象:', obj);
  })
  .on('end', () => {
    console.log('解析完成');
  })
  .on('error', (err) => {
    console.error('错误:', err.message);
  });

// 运行结果:
// 解析对象: { id: 1, name: 'Alice', age: 25 }
// 解析对象: { id: 2, name: 'Bob', age: 30 }
// 解析对象: { id: 3, name: 'Charlie', age: 35 }
// 解析完成
