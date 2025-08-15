import { once } from 'node:events';
import { Writable } from 'node:stream';
class MyStream extends Writable {
  constructor() {
    super({ highWaterMark: 10 /* 10 bytes */ });
  }
  _write(data, encode, cb) {
    process.stdout.write(data.toString().toUpperCase() + '\n', cb);
  }
}
const stream = new MyStream();
for (let i = 0; i < 10; i++) {
  const waitDrain = !stream.write('hello');
  if (waitDrain) {
    console.log('>> wait drain');
    await once(stream, 'drain');
  }
}
stream.end('world');