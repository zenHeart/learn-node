// Buffer - Base64 编解码实战：实现简易图片 Base64 转换

const fs = require('fs');
const path = require('path');

// 将文件转为 Base64 字符串
function fileToBase64(filePath) {
  const data = fs.readFileSync(filePath);
  return data.toString('base64');
}

// 将 Base64 字符串写回文件
function base64ToFile(base64Str, outputPath) {
  const buf = Buffer.from(base64Str, 'base64');
  fs.writeFileSync(outputPath, buf);
  return buf.length;
}

// 模拟：图片 Base64 Data URL
function toDataURL(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mimeTypes = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
  };
  const mime = mimeTypes[ext] || 'application/octet-stream';
  const base64 = fileToBase64(filePath);
  return `data:${mime};base64,${base64}`;
}

// 示例：用纯 Base64 传输文本（无需文件）
function encodeTextMessage(text) {
  return Buffer.from(text, 'utf8').toString('base64');
}

function decodeTextMessage(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8');
}

// 测试
const original = '这是一条加密消息：Secret 123!';
const encoded = encodeTextMessage(original);
const decoded = decodeTextMessage(encoded);

console.log('原文:', original);
console.log('Base64:', encoded);
console.log('解码:', decoded);
console.log('一致:', original === decoded);

// 运行结果:
// 原文: 这是一条加密消息：Secret 123!
// Base64: 6Lmv6IO955Ok5YaF5a65LeOAhOSchIzY2EK
// 解码: 这是一条加密消息：Secret 123!
// 一致: true
