// Crypto - RSA 非对称加密

const crypto = require('crypto');

console.log('=== RSA 非对称加密 ===\n');

// 生成 RSA 密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // 2048 位（安全）
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

console.log('公钥长度:', publicKey.length, '字符');
console.log('私钥长度:', privateKey.length, '字符');

// 加密（使用公钥）
const plaintext = 'RSA encryption test! 你好';
const encrypted = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  Buffer.from(plaintext)
);

console.log('\n原文:', plaintext);
console.log('加密后 (base64):', encrypted.toString('base64'));

// 解密（使用私钥）
const decrypted = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  encrypted
);

console.log('解密后:', decrypted.toString('utf8'));

// 签名（使用私钥）
console.log('\n=== 数字签名 ===');
const sign = crypto.createSign('SHA256');
sign.update(plaintext);
sign.end();
const signature = sign.sign(privateKey);
console.log('签名 (base64):', signature.toString('base64'));

// 验签（使用公钥）
const verify = crypto.createVerify('SHA256');
verify.update(plaintext);
verify.end();
const isValid = verify.verify(publicKey, signature);
console.log('验签结果:', isValid);

// 篡改后验签失败
const tampered = plaintext + '!';
const verify2 = crypto.createVerify('SHA256');
verify2.update(tampered);
verify2.end();
const isTampered = verify2.verify(publicKey, signature);
console.log('篡改后验签:', isTampered); // false

// 运行结果:
// === RSA 非对称加密 ===
//
// 公钥长度: ... 字符
// 私钥长度: ... 字符
//
// 原文: RSA encryption test! 你好
// 加密后 (base64): ...
// 解密后: RSA encryption test! 你好
//
// === 数字签名 ===
// 签名 (base64): ...
// 验签结果: true
// 篡改后验签: false
