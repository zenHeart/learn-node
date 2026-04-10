// FS - 异步读写文件（回调风格）

const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test-data');
const filePath = path.join(testDir, 'async-demo.txt');

// 异步创建目录
fs.mkdir(testDir, { recursive: true }, (err) => {
  if (err) console.error('创建目录失败:', err);
  else console.log('目录创建成功');

  // 异步写入文件
  fs.writeFile(filePath, '异步写入第一行\n', 'utf8', (err) => {
    if (err) throw err;
    console.log('文件写入成功');

    // 异步追加内容
    fs.appendFile(filePath, '异步追加第二行\n', 'utf8', (err) => {
      if (err) throw err;
      console.log('追加内容成功');

      // 异步读取文件
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('\n文件内容:');
        console.log(data);

        // 异步删除文件
        fs.unlink(filePath, (err) => {
          if (err) throw err;

          // 异步删除目录
          fs.rmdir(testDir, (err) => {
            if (err) throw err;
            console.log('\n清理完成');
          });
        });
      });
    });
  });
});

// 运行结果:
// 目录创建成功
// 文件写入成功
// 追加内容成功
//
// 文件内容:
// 异步写入第一行
// 异步追加第二行
//
// 清理完成
