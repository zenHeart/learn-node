// Buffer - 创建缓冲区的三种方式

// 1. Buffer.alloc(size) - 初始化为零的缓冲区，安全
const buf1 = Buffer.alloc(10);
console.log('Buffer.alloc(10):', buf1);

// 2. Buffer.allocUnsafe(size) - 未初始化，速度快但可能有旧数据
const buf2 = Buffer.allocUnsafe(10);
console.log('Buffer.allocUnsafe(10):', buf2);

// 3. Buffer.from() - 从已有数据创建
const buf3 = Buffer.from([1, 2, 3, 256]); // 256 会被截断为 0
console.log('Buffer.from([1,2,3,256]):', buf3);

const buf4 = Buffer.from('你好 Node.js', 'utf8');
console.log('Buffer.from("你好 Node.js"):', buf4);

const buf5 = Buffer.from('5a7a9e4f', 'hex'); // 从十六进制字符串
console.log('Buffer.from("5a7a9e4f", "hex"):', buf5);

// 运行结果:
// Buffer.alloc(10): <Buffer 00 00 00 00 00 00 00 00 00 00>
// Buffer.allocUnsafe(10): <Buffer 68 65 6c 6c 6f 00 00 00 00 00> (随机旧数据)
// Buffer.from([1,2,3,256]): <Buffer 01 02 03 00>
// Buffer.from("你好 Node.js"): <Buffer e4 bd a0 e5 a5 bd 20 4e 6f 64 65 2e 6a 73>
// Buffer.from("5a7a9e4f", "hex"): <Buffer 5a 7a 9e 4f>
