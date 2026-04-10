// Buffer - 切片与拼接

// 切片：从大 Buffer 切出子 Buffer（共享内存）
const buf1 = Buffer.from('Hello, World! Node.js', 'utf8');
console.log('原始 Buffer:', buf1.toString());

const slice1 = buf1.slice(0, 5);
console.log('slice(0, 5):', slice1.toString());

const slice2 = buf1.slice(7, 13);
console.log('slice(7, 13):', slice2.toString());

// 注意：切片共享内存，修改切片会影响原 Buffer
const buf2 = Buffer.from('ABCDEFGH', 'utf8');
const sub = buf2.slice(0, 4);
sub[0] = 88; // 'X' 的 ASCII
console.log('修改切片后原 Buffer:', buf2.toString()); // XB CDEFGH

// 拼接：多个 Buffer 合并
const bufA = Buffer.from('Hello', 'utf8');
const bufB = Buffer.from(' ', 'utf8');
const bufC = Buffer.from('Node.js', 'utf8');

const combined = Buffer.concat([bufA, bufB, bufC]);
console.log('拼接结果:', combined.toString());

// 实际应用：分块接收数据后合并
const chunks = [];
chunks.push(Buffer.from('第一', 'utf8'));
chunks.push(Buffer.from('部分', 'utf8'));
chunks.push(Buffer.from('第二部分', 'utf8'));
const received = Buffer.concat(chunks);
console.log('分块合并:', received.toString());

// 运行结果:
// 原始 Buffer: Hello, World! Node.js
// slice(0, 5): Hello
// slice(7, 13): World!
// 修改切片后原 Buffer: XB CDEFGH
// 拼接结果: Hello Node.js
// 分块合并: 第一部分第二部分
