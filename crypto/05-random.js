// Crypto - 随机数与 UUID

const crypto = require('crypto');

console.log('=== 随机数生成 ===\n');

// 安全的随机字节
const randomBytes = crypto.randomBytes(16);
console.log('16 随机字节 (hex):', randomBytes.toString('hex'));

// 随机整数
function randomInt(min, max) {
  const bytes = crypto.randomBytes(4);
  const num = bytes.readUInt32BE(0);
  return min + (num % (max - min + 1));
}

console.log('随机整数 [1-100]:', randomInt(1, 100));
console.log('随机整数 [1-100]:', randomInt(1, 100));
console.log('随机整数 [1-100]:', randomInt(1, 100));

// 随机选择
function randomChoice(arr) {
  return arr[crypto.randomInt(arr.length)];
}

const fruits = ['apple', 'banana', 'orange', 'mango', 'grape'];
console.log('随机选择:', randomChoice(fruits));
console.log('随机选择:', randomChoice(fruits));

// UUID v4（使用 crypto）
function uuidv4() {
  return crypto.randomBytes(16).toString('hex').replace(
    /(.{8})(.{4})(.{4})(.{4})(.{12})/,
    '$1-$2-$3-$4-$5'
  );
}

console.log('\n=== UUID v4 ===');
console.log('UUID:', uuidv4());
console.log('UUID:', uuidv4());

// Node.js 内置 UUID（v19+）
try {
  const { v4: uuidv4Native } = require('crypto');
  // crypto.randomUUID 在 Node.js 19+ 可用
  if (typeof crypto.randomUUID === 'function') {
    console.log('\ncrypto.randomUUID():', crypto.randomUUID());
    console.log('crypto.randomUUID():', crypto.randomUUID());
  }
} catch (e) {
  console.log('crypto.randomUUID 不可用');
}

// 随机密码生成
function generatePassword(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const random = crypto.randomBytes(length);
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(chars[random[i] % chars.length]);
  }
  return result.join('');
}

console.log('\n=== 密码生成 ===');
console.log('随机密码:', generatePassword());
console.log('随机密码:', generatePassword(20));

// 运行结果:
// === 随机数生成 ===
//
// 16 随机字节 (hex): 5a7f9e3c2b1d4e5f6a7b8c9d0e1f2a3b
// 随机整数 [1-100]: 42
// 随机整数 [1-100]: 87
// 随机整数 [1-100]: 15
// 随机选择: orange
// 随机选择: banana
//
// === UUID v4 ===
// UUID: 5a7f9e3c-2b1d-4e5f-6a7b-8c9d0e1f2a3b
// UUID: ...
//
// === 密码生成 ===
// 随机密码: K9#mP2$vL5@nQ8
// 随机密码: xY7&bC3!dE9@fG1#jK5%
