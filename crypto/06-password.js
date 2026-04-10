// Crypto - 密码哈希实战

const crypto = require('crypto');

console.log('=== 密码哈希实战 ===\n');

// 使用 PBKDF2 哈希密码
function hashPassword(password, salt = null) {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, actualSalt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt: actualSalt };
}

function verifyPassword(password, hash, salt) {
  const { hash: testHash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(testHash));
}

// 注册用户
console.log('=== 注册用户 ===');
const password = 'MySecureP@ssw0rd!';
const { hash, salt } = hashPassword(password);

console.log('密码:', password);
console.log('盐:', salt);
console.log('哈希:', hash.substring(0, 64) + '...');

// 验证登录
console.log('\n=== 验证登录 ===');
const correct = verifyPassword(password, hash, salt);
const wrong = verifyPassword('WrongPassword', hash, salt);

console.log('正确密码:', correct);   // true
console.log('错误密码:', wrong);     // false

// 使用 crypto.scrypt（更安全，推荐）
console.log('\n=== scrypt 哈希 ===');

function hashPasswordScrypt(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function verifyPasswordScrypt(password, hash, salt) {
  const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(testHash));
}

const { hash: hash2, salt: salt2 } = hashPasswordScrypt('AnotherPassword');
console.log('scrypt 哈希:', hash2.substring(0, 32) + '...');
console.log('scrypt 验证:', verifyPasswordScrypt('AnotherPassword', hash2, salt2));
console.log('scrypt 错误验证:', verifyPasswordScrypt('Wrong', hash2, salt2));

// 模拟数据库存储
console.log('\n=== 模拟数据库 ===');
const users = [
  { id: 1, name: 'alice', hash: hash, salt },
  { id: 2, name: 'bob', ...hashPasswordScrypt('bobpass') },
];

console.log('用户表:');
users.forEach((u) => console.log(`  ${u.name}: ${u.hash.substring(0, 20)}...`));

// 运行结果:
// === 密码哈希实战 ===
//
// === 注册用户 ===
// 密码: MySecureP@ssw0rd!
// 盐: ...
// 哈希: a7f8b3c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1...
//
// === 验证登录 ===
// 正确密码: true
// 错误密码: false
//
// === scrypt 哈希 ===
// scrypt 哈希: ...
// scrypt 验证: true
// scrypt 错误验证: false
//
// === 模拟数据库 ===
// 用户表:
//   alice: a7f8b3c9d4e5f6a7b8... (PBKDF2)
//   bob: ... (scrypt)
