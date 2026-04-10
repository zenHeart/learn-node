// FS - 实战：文件复制

const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
const sourceFile = path.join(testDir, 'source.txt');
const destFile = path.join(testDir, 'dest.txt');

// 准备测试
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}
// 创建一个 100KB 的测试文件
const content = '测试内容行\n'.repeat(5000);
fs.writeFileSync(sourceFile, content);
console.log('源文件大小:', fs.statSync(sourceFile).size, 'bytes');

// 方式1：简单复制（适合小文件）
function copyFileSync(src, dest) {
  const data = fs.readFileSync(src);
  fs.writeFileSync(dest, data);
  console.log(`复制完成: ${src} -> ${dest}`);
}

// 方式2：流式复制（适合大文件）
function copyFileStream(src, dest) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);

    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', () => {
      console.log(`流式复制完成: ${src} -> ${dest}`);
      resolve();
    });

    readStream.pipe(writeStream);
  });
}

// 方式3：分片复制（带进度）
function copyFileWithProgress(src, dest, chunkSize = 64 * 1024) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src, { highWaterMark: chunkSize });
    const writeStream = fs.createWriteStream(dest);
    let totalBytes = 0;
    const srcSize = fs.statSync(src).size;

    readStream.on('data', (chunk) => {
      totalBytes += chunk.length;
      const progress = ((totalBytes / srcSize) * 100).toFixed(1);
      process.stdout.write(`\r进度: ${progress}% (${totalBytes}/${srcSize})`);
      writeStream.write(chunk);
    });

    readStream.on('end', () => {
      writeStream.end();
      console.log(`\n带进度复制完成`);
      resolve();
    });

    readStream.on('error', reject);
    writeStream.on('error', reject);
  });
}

// 执行复制
copyFileSync(sourceFile, destFile);

// 验证
const srcSize = fs.statSync(sourceFile).size;
const destSize = fs.statSync(destFile).size;
console.log('源文件:', srcSize, '目标文件:', destSize, '一致:', srcSize === destSize);

// 清理
fs.unlinkSync(sourceFile);
fs.unlinkSync(destFile);
fs.rmdirSync(testDir);
console.log('清理完成');

// 运行结果:
// 源文件大小: ... bytes
// 复制完成: ...source.txt -> ...dest.txt
// 源文件: ... 目标文件: ... 一致: true
// 清理完成
