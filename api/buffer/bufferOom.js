import { Buffer } from 'node:buffer';

// 分配 100MB 堆外内存
const size = 100 * 1024 * 1024 ; // 100MB
const buf = Buffer.alloc(size);

console.log(`Buffer 分配完成，大小: ${(buf.length / (1024 * 1024)).toFixed(2)} MB`);

const mem = process.memoryUsage();
process.nextTick(() => {
   console.log('进程内存占用:');
   console.table({
      rss: `${(mem.rss / (1024 * 1024)).toFixed(2)} MB`,
      heapTotal: `${(mem.heapTotal / (1024 * 1024)).toFixed(2)} MB`,
      heapUsed: `${(mem.heapUsed / (1024 * 1024)).toFixed(2)} MB`,
      external: `${(mem.external / (1024 * 1024)).toFixed(2)} MB`
   });
})

// 说明：Buffer 占用的是堆外内存（external 字段），而不是 heapUsed
