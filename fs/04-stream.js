// FS - 流式读写（适合大文件）

const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
const sourceFile = path.join(testDir, 'source.txt');
const destFile = path.join(testDir, 'dest-copy.txt');

// 确保目录存在
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// 创建测试文件（1万行）
const lines = [];
for (let i = 1; i <= 10000; i++) {
  lines.push(`这是第 ${i} 行数据，包含了用于测试流式读写的内容。`);
}
fs.writeFileSync(sourceFile, lines.join('\n'), 'utf8');
console.log('源文件创建完成:', fs.statSync(sourceFile).size, 'bytes');

// 读取流
const readStream = fs.createReadStream(sourceFile, {
  encoding: 'utf8',
  highWaterMark: 64 * 1024, // 64KB 一批
});

// 写入流
const writeStream = fs.createWriteStream(destFile, {
  encoding: 'utf8',
});

let lineCount = 0;
let charCount = 0;

// 监听数据事件
readStream.on('data', (chunk) => {
  lineCount += (chunk.match(/\n/g) || []).length;
  charCount += chunk.length;
  writeStream.write(chunk);
});

readStream.on('end', () => {
  writeStream.end();
  console.log('复制完成');
  console.log('处理行数:', lineCount);
  console.log('总字符数:', charCount);

  // 验证
  const srcSize = fs.statSync(sourceFile).size;
  const destSize = fs.statSync(destFile).size;
  console.log('源文件大小:', srcSize);
  console.log('目标文件大小:', destSize);
  console.log('大小一致:', srcSize === destSize);

  // 清理
  fs.unlinkSync(sourceFile);
  fs.unlinkSync(destFile);
  fs.rmdirSync(testDir);
  console.log('清理完成');
});

readStream.on('error', (err) => {
  console.error('读取错误:', err);
});

// 运行结果:
// 源文件创建完成: ... bytes
// 复制完成
// 处理行数: 9999
// 总字符数: ...
// 源文件大小: ...
// 目标文件大小: ...
// 大小一致: true
// 清理完成
