import { Readable, Writable, pipeline } from 'node:stream';

// 创建一个可读流，输出一些数据
const readable = Readable.from(['Hello, ', 'world!', '\n']);

// 创建一个可写流，输出到标准输出
const writable = new Writable({
   write(chunk, _, callback) {
      process.stdout.write(chunk);
      callback();
   }
});

// 使用 pipeline 方法将可读流的数据传递到可写流
pipeline(
  readable,
  writable,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);

// 运行后会在终端输出：Hello, world!