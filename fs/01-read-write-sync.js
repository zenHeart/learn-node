// FS - 同步读写文件

const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
const filePath = path.join(testDir, 'sync-demo.txt');

// 确保目录存在
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
  console.log('创建目录:', testDir);
}

// 写入文件（同步）
const content = 'Hello, Node.js!\n第二行内容\n第三行内容';
fs.writeFileSync(filePath, content, 'utf8');
console.log('写入文件完成');

// 读取文件（同步）
const readContent = fs.readFileSync(filePath, 'utf8');
console.log('读取内容:');
console.log(readContent);

// 判断文件是否存在
console.log('文件是否存在:', fs.existsSync(filePath));

// 追加内容（同步）
fs.appendFileSync(filePath, '\n追加内容', 'utf8');
console.log('追加内容完成');

// 读取并验证
console.log('追加后内容:');
console.log(fs.readFileSync(filePath, 'utf8'));

// 获取文件信息
const stat = fs.statSync(filePath);
console.log('\n文件信息:');
console.log('  大小:', stat.size, 'bytes');
console.log('  创建时间:', stat.birthtime);
console.log('  修改时间:', stat.mtime);
console.log('  是否是文件:', stat.isFile());
console.log('  是否是目录:', stat.isDirectory());

// 清理
fs.unlinkSync(filePath);
fs.rmdirSync(testDir);
console.log('\n清理完成');

// 运行结果:
// 创建目录: ...\fs\test-data
// 写入文件完成
// 读取内容:
// Hello, Node.js!
// 第二行内容
// 第三行内容
// 文件是否存在: true
// 追加内容完成
// 追加后内容:
// Hello, Node.js!
// 第二行内容
// 第三行内容
// 追加内容
//
// 文件信息:
//   大小: ... bytes
//   创建时间: ...
//   修改时间: ...
//   是否是文件: true
//   是否是目录: false
// 清理完成
