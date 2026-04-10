// FS - 文件监控

const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
const watchFile = path.join(testDir, 'watch.txt');

// 准备测试目录
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}
fs.writeFileSync(watchFile, '初始内容', 'utf8');
console.log('创建监控文件:', watchFile);

console.log('\n--- 开始监控 watch.txt ---');

// 方法1: fs.watch（更轻量，跨平台）
const watcher = fs.watch(watchFile, (eventType, filename) => {
  console.log(`fs.watch 事件: ${eventType} - ${filename}`);
});

// 方法2: fs.watchFile（基于轮询）
fs.watchFile(watchFile, { interval: 100 }, (curr, prev) => {
  console.log(`fs.watchFile 事件:`);
  console.log(`  修改前 mtime: ${prev.mtime}`);
  console.log(`  修改后 mtime: ${curr.mtime}`);
  console.log(`  文件大小: ${curr.size}`);
});

// 模拟文件修改
setTimeout(() => {
  console.log('\n--- 第一次修改 ---');
  fs.appendFileSync(watchFile, '\n第一行追加', 'utf8');
}, 200);

setTimeout(() => {
  console.log('\n--- 第二次修改（重写） ---');
  fs.writeFileSync(watchFile, '完全重写的内容', 'utf8');
}, 500);

setTimeout(() => {
  console.log('\n--- 停止监控 ---');
  watcher.close();
  fs.unwatchFile(watchFile);

  // 清理
  fs.unlinkSync(watchFile);
  fs.rmdirSync(testDir);
  console.log('清理完成');
  process.exit(0);
}, 1000);

// 运行结果:
// 创建监控文件: ...
//
// --- 开始监控 watch.txt ---
// --- 第一次修改 ---
// fs.watch 事件: rename - watch.txt
// fs.watchFile 事件:
//   修改前 mtime: ...
//   修改后 mtime: ...
//   文件大小: ...
//
// --- 第二次修改（重写） ---
// fs.watch 事件: change - watch.txt
// fs.watchFile 事件:
//   修改前 mtime: ...
//   修改后 mtime: ...
//   文件大小: ...
//
// --- 停止监控 ---
// 清理完成
