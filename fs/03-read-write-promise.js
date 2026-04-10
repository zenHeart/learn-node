// FS - 异步读写文件（Promise 风格，Node.js >= 10）

const fs = require('fs').promises;
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
const filePath = path.join(testDir, 'promise-demo.txt');

async function main() {
  try {
    // 创建目录
    await fs.mkdir(testDir, { recursive: true });
    console.log('目录创建成功');

    // 写入文件
    await fs.writeFile(filePath, 'Promise 风格写入\n', 'utf8');
    console.log('文件写入成功');

    // 追加内容
    await fs.appendFile(filePath, '追加第二行\n', 'utf8');
    console.log('追加内容成功');

    // 读取文件
    const data = await fs.readFile(filePath, 'utf8');
    console.log('\n文件内容:');
    console.log(data);

    // 获取文件信息
    const stat = await fs.stat(filePath);
    console.log('文件大小:', stat.size, 'bytes');

    // 读取目录
    const files = await fs.readdir(testDir);
    console.log('目录内容:', files);

    // 清理
    await fs.unlink(filePath);
    await fs.rmdir(testDir);
    console.log('清理完成');
  } catch (err) {
    console.error('操作失败:', err);
  }
}

main();

// 运行结果:
// 目录创建成功
// 文件写入成功
// 追加内容成功
//
// 文件内容:
// Promise 风格写入
// 追加第二行
//
// 文件大小: ... bytes
// 目录内容: [ 'promise-demo.txt' ]
// 清理完成
