// Crypto - AES 对称加密

const crypto = require('crypto');

console.log('=== AES 对称加密 ===\n');

// AES 加密参数
const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.scryptSync('my-password', 'salt', 32); // 32 bytes for AES-256
const IV = crypto.randomBytes(16); // 16 bytes for AES-CBC

// 加密函数
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encrypted };
}

// 解密函数
function decrypt(encryptedData) {
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(encryptedData.iv, 'hex'));
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 测试
const plaintext = 'Hello, AES encryption! 你好加密！';
console.log('原文:', plaintext);

const encrypted = encrypt(plaintext);
console.log('\n加密后:');
console.log('  IV:', encrypted.iv);
console.log('  密文:', encrypted.encrypted);

const decrypted = decrypt(encrypted);
console.log('\n解密后:', decrypted);
console.log('一致:', plaintext === decrypted);

// 实际应用：加密文件内容
console.log('\n=== 加密文件示例 ===');
const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

const testFile = path.join(testDir, 'secret.txt');
const secretData = '这是秘密内容：12345678';

const encryptedFile = encrypt(secretData);
fs.writeFileSync(testFile, JSON.stringify(encryptedFile), 'utf8');
console.log('已加密写入文件:', testFile);

// 读取并解密
const loaded = JSON.parse(fs.readFileSync(testFile, 'utf8'));
console.log('解密后:', decrypt(loaded));

// 清理
fs.unlinkSync(testFile);
fs.rmdirSync(testDir);
console.log('清理完成');

// 运行结果:
// === AES 对称加密 ===
//
// 原文: Hello, AES encryption! 你好加密！
//
// 加密后:
//   IV: ...
//   密文: ...
//
// 解密后: Hello, AES encryption! 你好加密！
// 一致: true
//
// === 加密文件示例 ===
// 已加密写入文件: ...\secret.txt
// 解密后: 这是秘密内容：12345678
// 清理完成
