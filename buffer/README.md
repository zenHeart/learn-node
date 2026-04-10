# Buffer 模块

用于处理二进制数据，Node.js 中字符编码、文件流、网络传输都离不开 Buffer。

## 主要功能

- 创建缓冲区（alloc / from / allocUnsafe）
- 读写数据（writeUInt8/16/32、readUInt8/16/32）
- 字符串编解码（utf8、ascii、hex、base64）
- 缓冲区拼接与切片
- 类型化数组（Buffer.from(array)）

## 示例列表

| 文件 | 说明 |
|------|------|
| 01-alloc.js | 创建缓冲区的三种方式 |
| 02-string.js | 字符串与 Buffer 互转 |
| 03-read-write.js | 读写不同类型数据 |
| 04-slice-concat.js | 切片与拼接 |
| 05-base64.js | Base64 编解码实战 |
