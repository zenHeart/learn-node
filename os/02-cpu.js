// OS - CPU 信息和负载

const os = require('os');

console.log('=== CPU 信息 ===\n');

// CPU 详情
const cpus = os.cpus();
console.log('CPU 核心数:', cpus.length);

cpus.forEach((cpu, index) => {
  console.log(`\nCPU ${index}:`);
  console.log('  型号:', cpu.model);
  console.log('  频率:', cpu.speed, 'MHz');
  console.log('  核心类型:', cpu.times);
});

// 总体 CPU 使用率（采样）
console.log('\n=== CPU 使用率采样 ===');

function getCPUUsage(callback) {
  const start = os.cpus();
  let idle1 = 0, total1 = 0;
  let idle2 = 0, total2 = 0;

  start.forEach((cpu) => {
    for (const type in cpu.times) {
      total1 += cpu.times[type];
    }
    idle1 += cpu.times.idle;
  });

  setTimeout(() => {
    const end = os.cpus();
    end.forEach((cpu) => {
      for (const type in cpu.times) {
        total2 += cpu.times[type];
      }
      idle2 += cpu.times.idle;
    });

    const idleDiff = idle2 - idle1;
    const totalDiff = total2 - total1;
    const usage = 100 - (100 * idleDiff / totalDiff);
    callback(usage.toFixed(2));
  }, 1000);
}

// 负载均值（Unix 风格）
console.log('系统负载 (1/5/15 min):', os.loadavg()); // Unix only
console.log('常驻内存 (rss):', (process.memoryUsage().rss / 1024 / 1024).toFixed(2), 'MB');

// 运行结果:
// === CPU 信息 ===
//
// CPU 核心数: ...
//
// CPU 0:
//   型号: Intel(R) Core(TM) i7-...
//   频率: ... MHz
//   核心类型: { user: ..., nice: ..., idle: ..., irq: ..., sys: ... }
//
// === CPU 使用率采样 ===
// 系统负载 (1/5/15 min): [0, 0, 0] (Windows)
// 常驻内存 (rss): ... MB
