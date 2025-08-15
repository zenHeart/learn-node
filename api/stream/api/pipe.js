import { Readable, Writable } from 'node:stream';

// 创建一个可读流，输出一些数据
const readable = Readable.from(['Hello, ', 'world!', '\n']);

// 创建一个可写流，输出到标准输出
const writable = new Writable({
   write(chunk, _, callback) {
      process.stdout.write(chunk);
      callback();
   }
});
// 使用 pipe 方法将可读流的数据传递到可写流
readable.pipe(writable);

// 运行后会在终端输出：Hello, world!