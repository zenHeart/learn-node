import { Buffer } from 'node:buffer';

const size = 100 * 1024 * 1024; // 100MB

// 使用 Buffer.alloc 分配已初始化的内存（填充为0）
const bufAlloc = Buffer.alloc(size);

// 使用 Buffer.allocUnsafe 分配未初始化的内存（内容不确定，速度更快）
const bufAllocUnsafe = Buffer.allocUnsafe(size);

console.log(`Buffer.alloc 分配完成，大小: ${(bufAlloc.length / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Buffer.allocUnsafe 分配完成，大小: ${(bufAllocUnsafe.length / (1024 * 1024)).toFixed(2)} MB`);


const mem = process.memoryUsage();
console.log('进程内存占用:');

console.table({
   rss: `${(mem.rss / (1024 * 1024)).toFixed(2)} MB`,
   heapTotal: `${(mem.heapTotal / (1024 * 1024)).toFixed(2)} MB`,
   heapUsed: `${(mem.heapUsed / (1024 * 1024)).toFixed(2)} MB`,
   external: `${(mem.external / (1024 * 1024)).toFixed(2)} MB`
});
// 说明：Buffer.alloc 分配的内存已初始化为0，安全但较慢；
// Buffer.allocUnsafe 分配的内存未初始化，速度快但内容不可预测，需谨慎使用。
