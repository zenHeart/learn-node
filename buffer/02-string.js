// Buffer - 字符串与 Buffer 互转

const str = 'Hello, Node.js Buffer! 你好';

// 编码：字符串 -> Buffer
const buf = Buffer.from(str, 'utf8');
console.log('原始字符串:', str);
console.log('Buffer (utf8):', buf);
console.log('Buffer 长度:', buf.length);

// 解码：Buffer -> 字符串
console.log('转回字符串:', buf.toString('utf8'));

// 十六进制转换
const hexStr = buf.toString('hex');
console.log('十六进制:', hexStr);

const bufFromHex = Buffer.from(hexStr, 'hex');
console.log('从十六进制恢复:', bufFromHex.toString('utf8'));

// Base64 转换
const base64Str = buf.toString('base64');
console.log('Base64:', base64Str);

const bufFromBase64 = Buffer.from(base64Str, 'base64');
console.log('从 Base64 恢复:', bufFromBase64.toString('utf8'));

// 运行结果:
// 原始字符串: Hello, Node.js Buffer! 你好
// Buffer (utf8): <Buffer 48 65 6c 6c 6f 2c 20 4e 6f 64 65 2e 6a 73 20 42 75 66 66 65 72 21 20 e4 bd a0 e5 a5 bd>
// Buffer 长度: 26
// 转回字符串: Hello, Node.js Buffer! 你好
// 十六进制: 48656c6c6f2c204e6f64652e6a73204275666665722120e4bda0e5a5bd
// 从十六进制恢复: Hello, Node.js Buffer! 你好
// Base64: SGVsbG8sIE5vZGUuanMgQnVmZmVyISDimYnvv6E=
// 从 Base64 恢复: Hello, Node.js Buffer! 你好
