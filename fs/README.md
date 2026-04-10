# FS 模块

Node.js 文件系统操作，读写文件、目录管理、文件监控等。

## 主要功能

- 文件读写（readFile / writeFile / appendFile）
- 流式读写（createReadStream / createWriteStream）
- 目录操作（mkdir / rmdir / readdir）
- 文件信息（stat / lstat）
- 文件监控（watch / watchFile）
- 路径操作（existsSync / mkdirSync）

## 示例列表

| 文件 | 说明 |
|------|------|
| 01-read-write-sync.js | 同步读写文件 |
| 02-read-write-async.js | 异步读写文件（回调） |
| 03-read-write-promise.js | 异步读写文件（Promise） |
| 04-stream.js | 流式读写大文件 |
| 05-dir.js | 目录操作 |
| 06-stat.js | 文件信息 stat |
| 07-watch.js | 文件监控 |
| 08-copy.js | 复制文件实战 |
