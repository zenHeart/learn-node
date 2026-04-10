// FS - 文件信息 stat

const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
const filePath = path.join(testDir, 'stat-demo.txt');

// 准备测试数据
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}
fs.writeFileSync(filePath, '测试文件内容', 'utf8');

// 获取文件信息
const stat = fs.statSync(filePath);

console.log('=== 文件信息 ===');
console.log('文件路径:', filePath);
console.log('是否是文件:', stat.isFile());
console.log('是否是目录:', stat.isDirectory());
console.log('是否是符号链接:', stat.isSymbolicLink());
console.log('文件大小:', stat.size, 'bytes');
console.log('创建时间 (birthtime):', stat.birthtime);
console.log('修改时间 (mtime):', stat.mtime);
console.log('访问时间 (atime):', stat.atime);

// lstat vs stat（处理符号链接）
const linkPath = path.join(testDir, 'link.txt');
fs.symlinkSync(filePath, linkPath);

const lstat = fs.lstatSync(linkPath);
const statViaLink = fs.statSync(linkPath);

console.log('\n=== 符号链接信息 ===');
console.log('lstat (链接本身):', lstat.isSymbolicLink()); // true
console.log('stat (链接指向):', statViaLink.isSymbolicLink()); // false

// 异步获取信息
fs.stat(filePath, (err, stat) => {
  if (!err) {
    console.log('\n=== 异步 stat ===');
    console.log('文件大小:', stat.size);
    console.log('修改时间:', stat.mtime);
  }

  // 清理
  fs.unlinkSync(filePath);
  fs.unlinkSync(linkPath);
  fs.rmdirSync(testDir);
  console.log('清理完成');
});

// 运行结果:
// === 文件信息 ===
// 文件路径: ...\stat-demo.txt
// 是否是文件: true
// 是否是目录: false
// 是否是符号链接: false
// 文件大小: 15 bytes
// 创建时间 (birthtime): ...
// 修改时间 (mtime): ...
// 访问时间 (atime): ...
//
// === 符号链接信息 ===
// lstat (链接本身): true
// stat (链接指向): false
//
// === 异步 stat ===
// 文件大小: 15
// 修改时间: ...
// 清理完成
