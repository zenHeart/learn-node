// Crypto - HMAC（带密钥的 Hash）

const crypto = require('crypto');

console.log('=== HMAC 计算 ===\n');

// HMAC = Hash(密钥 + 数据) 或 Hash(数据 + 密钥)
const data = 'Sensitive data';
const key = 'my-secret-key-12345';

// 计算 HMAC
const hmacSha256 = crypto.createHmac('sha256', key).update(data).digest('hex');
console.log('HMAC-SHA256:', hmacSha256);

// 不同的密钥产生不同的 HMAC
const key2 = 'different-key';
const hmac2 = crypto.createHmac('sha256', key2).update(data).digest('hex');
console.log('不同密钥:', hmac2);
console.log('密钥一致:', hmacSha256 !== hmac2);

// 常用场景：API 签名
function createSignature(secret, payload) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}

function verifySignature(secret, payload, signature) {
  const expected = createSignature(secret, payload);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

const payload = { user_id: 123, action: 'transfer', amount: 100 };
const secret = 'api-secret-key';

const sig = createSignature(secret, payload);
console.log('\n=== API 签名示例 ===');
console.log('Payload:', payload);
console.log('签名:', sig);

const isValid = verifySignature(secret, payload, sig);
console.log('签名验证:', isValid);

// 篡改 payload 后验证失败
const tamperedPayload = { user_id: 123, action: 'transfer', amount: 999 };
const isTampered = verifySignature(secret, tamperedPayload, sig);
console.log('篡改后验证:', isTampered); // false

// 运行结果:
// === HMAC 计算 ===
//
// HMAC-SHA256: a7f8b3c9d4e5f6a7b8c9d0e1f...
// 不同密钥: f8a7b9c0d1e2f3a4b5c6d7e8f...
// 密钥一致: true
//
// === API 签名示例 ===
// Payload: { user_id: 123, action: 'transfer', amount: 100 }
// 签名: ...
// 签名验证: true
// 篡改后验证: false
