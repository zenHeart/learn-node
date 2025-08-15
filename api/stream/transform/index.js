import { Transform } from 'node:stream';

// 创建一个 Transform 流，将输入的小写字母转换为大写
const upperCaseTransform = new Transform({
   transform(chunk, encoding, callback) {
      // 将 chunk 转为字符串并转换为大写
      const upperChunk = chunk.toString().toUpperCase();
      // 推送转换后的数据
      callback(null, upperChunk);
   }
});

// 示例：从标准输入读取数据，转换为大写后输出到标准输出
process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

// 使用方法：在终端输入内容，回车后会看到输出为大写字母