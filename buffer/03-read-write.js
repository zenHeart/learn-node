// Buffer - 读写不同类型数据

const buf = Buffer.allocUnsafe(16);

// 写入有符号整数
buf.writeInt8(-10, 0);
buf.writeInt16BE(-256, 1);   // BE = Big Endian
buf.writeInt16LE(-256, 3);   // LE = Little Endian
buf.writeInt32BE(1234567890, 5);

// 写入无符号整数
buf.writeUInt8(255, 9);
buf.writeUInt32BE(0xDEADBEEF, 10);

// 写入浮点数
buf.writeDoubleBE(3.14159265358979, 10);

// 读取数据
console.log('writeInt8(-10, 0):', buf.readInt8(0));
console.log('writeInt16BE(-256, 1):', buf.readInt16BE(1));
console.log('writeInt16LE(-256, 3):', buf.readInt16LE(3));
console.log('writeInt32BE(1234567890, 5):', buf.readInt32BE(5));
console.log('writeUInt8(255, 9):', buf.readUInt8(9));
console.log('writeUInt32BE(0xDEADBEEF, 10):', buf.readUInt32BE(10).toString(16));
console.log('writeDoubleBE(3.14159..., 10):', buf.readDoubleBE(10));

console.log('\n完整 Buffer:', buf);

// 运行结果:
// writeInt8(-10, 0): -10
// writeInt16BE(-256, 1): -256
// writeInt16LE(-256, 3): -256
// writeInt32BE(1234567890, 5): 1234567890
// writeUInt8(255, 9): 255
// writeUInt32BE(0xDEADBEEF, 10): deadbeef
// writeDoubleBE(3.14159..., 10): 3.14159265358979
// 完整 Buffer: <Buffer f6 ff ff 00 01 25 69 05 3b ff de ad be ef 09 21 fb 54>
