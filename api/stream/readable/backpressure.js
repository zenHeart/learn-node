import { Readable } from 'node:stream';

// 一个简单的 Readable 流，每次 push 一个数字
class NumberStream extends Readable {
   constructor(max = 100) {
      super({ objectMode: true });
      this.current = 1;
      this.max = max;
   }
   _read() {
      // 模拟数据生成速度很快
      setTimeout(() => {
         if (this.current > this.max) {
            this.push(null); // 结束
         } else {
            const canContinue = this.push(this.current++);
            if (!canContinue) {
               // 如果返回 false，说明下游处理不过来，触发背压
               console.log('背压：暂停推送，等待下游消费...');
            }
         }
      }, 10); // 快速推送
   }
}

// 下游消费速度很慢，模拟处理瓶颈
const stream = new NumberStream(20);
stream.on('data', num => {
   console.log('收到:', num);
   // 模拟慢速消费
   stream.pause();
   setTimeout(() => stream.resume(), 300);
});
stream.on('end', () => console.log('全部完成'));

/*
说明：
- 当下游消费速度慢时，Readable.push() 会返回 false，_read 不会被继续调用，流自动暂停数据生成。
- 等下游消费完毕（resume），_read 会再次被调用，继续推送数据。
- 这就是 Node.js 流的背压调解机制：自动协调生产者和消费者速度，防止内存溢出。
*/