// HTTP - 静态文件服务器

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3003;
const STATIC_DIR = path.join(__dirname, 'public');

// MIME 类型表
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function serveStatic(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // 只处理 GET 请求
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
    return;
  }

  // 安全路径：避免 .. 遍历
  let filePath = path.join(STATIC_DIR, req.url === '/' ? 'index.html' : req.url);
  filePath = path.normalize(filePath);

  // 确保在 STATIC_DIR 内
  if (!filePath.startsWith(STATIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  console.log(`请求: ${req.url} -> ${filePath}`);
  serveStatic(filePath, res);
});

server.listen(PORT, () => {
  console.log(`静态文件服务器运行在 http://localhost:${PORT}`);
  console.log(`静态目录: ${STATIC_DIR}`);

  // 创建测试文件
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(path.join(publicDir, 'index.html'), '<h1>Index</h1><p>Static server works!</p>');
    fs.writeFileSync(path.join(publicDir, 'style.css'), 'body { font-family: sans-serif; }');
    fs.writeFileSync(path.join(publicDir, 'app.js'), 'console.log("Hello from static file!");');
    console.log('测试文件已创建');
  }

  // 发送测试请求
  setTimeout(() => {
    const http = require('http');
    http.get(`http://localhost:${PORT}/`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log('\n测试请求结果:');
        console.log('状态:', res.statusCode);
        console.log('内容:', body.trim());
        server.close();
        console.log('服务器关闭');
      });
    });
  }, 100);
});

// 运行结果:
// 静态文件服务器运行在 http://localhost:3003
// 静态目录: ...\http\public
// 测试文件已创建
// 请求: / -> ...\http\public\index.html
//
// 测试请求结果:
// 状态: 200
// 内容: <h1>Index</h1><p>Static server works!</p>
// 服务器关闭
