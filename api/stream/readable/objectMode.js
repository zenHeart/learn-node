import { Readable } from 'node:stream';
import { Writable } from 'node:stream';

// 示例1：objectMode 基本用法，流中传递对象
const objectStream = new Readable({
   objectMode: true,
   read() {}
});

// 推送几个对象到流中
objectStream.push({ name: 'Alice', age: 25 });
objectStream.push({ name: 'Bob', age: 30 });
objectStream.push(null); // 结束流

objectStream.on('data', (obj) => {
   console.log('Received object:', obj);
});
objectStream.on('end', () => {
   console.log('Stream ended.');
});

// 示例2：自定义 Readable，自动生成对象
class CounterStream extends Readable {
   constructor(max) {
      super({ objectMode: true });
      this.current = 1;
      this.max = max;
   }
   _read() {
      if (this.current <= this.max) {
         this.push({ count: this.current });
         this.current++;
      } else {
         this.push(null);
      }
   }
}

const counter = new CounterStream(3);
counter.on('data', (obj) => {
   console.log('Counter object:', obj);
});
counter.on('end', () => {
   console.log('Counter stream ended.');
});

// 示例3：与 pipe 结合使用（传递对象到 Writable）

const writable = new Writable({
   objectMode: true,
   write(obj, _, callback) {
      console.log('Writable received:', obj);
      callback();
   }
});

const objStream = Readable.from([{ x: 1 }, { x: 2 }, { x: 3 }], { objectMode: true });
objStream.pipe(writable);