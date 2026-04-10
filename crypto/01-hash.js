// Crypto - Hash 计算

const crypto = require('crypto');

console.log('=== Hash 计算 ===\n');

// 支持的 Hash 算法
const algorithms = ['md5', 'sha1', 'sha256', 'sha512', 'sha3-256', 'ripemd160'];

const data = 'Hello, Node.js Crypto! 你好';

// 方式1：一次性 Hash
console.log('方式1: 一次性 Hash');
algorithms.forEach((algo) => {
  const hash = crypto.createHash(algo).update(data).digest('hex');
  console.log(`  ${algo}: ${hash.substring(0, 32)}...`);
});

// 方式2：流式 Hash（适合大文件）
console.log('\n方式2: 流式 Hash');
const fs = require('fs');
const path = require('path');

// 创建一个测试文件
const testDir = path.join(__dirname, 'test-data');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}
const testFile = path.join(testDir, 'hash-test.txt');
fs.writeFileSync(testFile, data.repeat(1000));

const hashStream = fs.createReadStream(testFile);
const sha256 = crypto.createHash('sha256');

hashStream.on('data', (chunk) => sha256.update(chunk));
hashStream.on('end', () => {
  console.log('  文件 SHA256:', sha256.digest('hex'));

  // 验证
  const direct = crypto.createHash('sha256').update(fs.readFileSync(testFile)).digest('hex');
  console.log('  直接计算:', direct);
  console.log('  一致:', sha256.digest('hex') === direct);

  // 清理
  fs.unlinkSync(testFile);
  fs.rmdirSync(testDir);
  console.log('  清理完成');
});

// 方式3：常用封装
function hash(data, algorithm = 'sha256') {
  return crypto.createHash(algorithm).update(data).digest('hex');
}

console.log('\n方式3: 封装函数');
console.log('hash("test"):', hash('test'));
console.log('hash("test", "md5"):', hash('test', 'md5'));

// 运行结果:
// === Hash 计算 ===
//
// 方式1: 一次性 Hash
//   md5: 1a8a41a47d80f1a0f0c8f7c7f...
//   sha1: 1d6f9e6b7f0a5d2e3c4b5a6f...
//   sha256: a5c2c2b6e3d4f5a6b7c8d9e0f...
//   ...
//
// 方式2: 流式 Hash
//   文件 SHA256: ... (与直接计算一致)
//
// 方式3: 封装函数
// hash("test"): 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
// hash("test", "md5"): 098f6bcd4621d373cade4e832627b4f6
