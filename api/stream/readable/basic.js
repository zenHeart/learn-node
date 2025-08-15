import { Readable } from 'node:stream';
class MyStream extends Readable {
   #count=0;

   _read() {
      this.push(`hi，${this.#count} !\n`)
      if(++this.#count > 5) {
         // 停止流读取
         this.push(null);
      }
   }
}

const stream = new MyStream();

// 首次监听 data 事件，会主动触发 _read 事件
stream.on('data', chunk => console.log(chunk.toString()));
stream.on('end', () => console.log('Stream ended'));