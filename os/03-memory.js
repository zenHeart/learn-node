// OS - 内存使用情况

const os = require('os');

console.log('=== 内存信息 ===\n');

// 系统总内存和空闲内存
const total = os.totalmem();
const free = os.freemem();
const used = total - free;

console.log('总内存:', formatBytes(total));
console.log('空闲内存:', formatBytes(free));
console.log('已用内存:', formatBytes(used));
console.log('使用率:', ((used / total) * 100).toFixed(1) + '%');

// Node.js 进程内存（process.memoryUsage）
console.log('\n=== Node.js 进程内存 ===');
const mem = process.memoryUsage();
console.log('rss (常驻内存):', formatBytes(mem.rss));
console.log('heapTotal (堆总):', formatBytes(mem.heapTotal));
console.log('heapUsed (堆已用):', formatBytes(mem.heapUsed));
console.log('external (外部):', formatBytes(mem.external));
console.log('arrayBuffers:', formatBytes(mem.arrayBuffers || 0));

// 每隔 1 秒打印一次内存变化
console.log('\n=== 内存变化监控 (3秒) ===');
let prev = process.memoryUsage().heapUsed;

const interval = setInterval(() => {
  const curr = process.memoryUsage().heapUsed;
  const diff = curr - prev;
  console.log(`堆已用: ${formatBytes(curr)} (变化: ${diff > 0 ? '+' : ''}${formatBytes(diff)})`);
  prev = curr;
}, 1000);

setTimeout(() => {
  clearInterval(interval);
  console.log('监控结束');
}, 3500);

// 辅助函数
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

// 运行结果:
// === 内存信息 ===
//
// 总内存: ... GB
// 空闲内存: ... GB
// 已用内存: ... GB
// 使用率: ...%
//
// === Node.js 进程内存 ===
// rss (常驻内存): ... MB
// heapTotal (堆总): ... MB
// heapUsed (堆已用): ... MB
// external (外部): ... MB
// arrayBuffers: ... MB
//
// === 内存变化监控 (3秒) ===
// 堆已用: ... MB (变化: ... MB)
// 堆已用: ... MB (变化: ... KB)
// 堆已用: ... MB (变化: ... KB)
// 监控结束
