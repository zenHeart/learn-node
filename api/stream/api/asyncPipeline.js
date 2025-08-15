import { Readable, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// 创建一个可读流，输出一些数据
const readable = Readable.from(['Hello, ', 'world!', '\n']);

// 创建一个可写流，输出到标准输出
const writable = new Writable({
   write(chunk, _, callback) {
      process.stdout.write(chunk);
      callback();
   }
});

async function main() {
  try {
    await pipeline(
      readable,
      writable
    );
    console.log('Pipeline succeeded.');
  } catch (err) {
    console.error('Pipeline failed.', err);
  }
}

main();