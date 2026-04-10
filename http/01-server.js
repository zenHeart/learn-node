// HTTP - 基础 HTTP 服务器

const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Powered-By': 'Node.js',
  });

  // 响应内容
  let html = `<!DOCTYPE html>
<html>
<head><title>Node.js HTTP Server</title></head>
<body>
  <h1>Hello from Node.js!</h1>
  <p>Method: ${req.method}</p>
  <p>URL: ${req.url}</p>
  <p>Headers: ${JSON.stringify(req.headers, null, 2)}</p>
</body>
</html>`;

  res.end(html);
});

server.listen(3000, () => {
  console.log('HTTP 服务器运行在 http://localhost:3000');

  // 测试请求
  setTimeout(() => {
    const http = require('http');

    http.get('http://localhost:3000/', (res) => {
      console.log('\n--- 收到响应 ---');
      console.log('状态码:', res.statusCode);
      console.log('响应头:', JSON.stringify(res.headers, null, 2));

      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log('\n响应内容 (前200字符):');
        console.log(body.substring(0, 200) + '...');

        server.close();
        console.log('服务器已关闭');
      });
    });
  }, 100);
});

// 运行结果:
// HTTP 服务器运行在 http://localhost:3000
// 2026-... - GET /
//
// --- 收到响应 ---
// 状态码: 200
// 响应头: { content-type: 'text/html; charset=utf-8', x-powered-by: 'Node.js', ... }
//
// 响应内容 (前200字符):
// <!DOCTYPE html>...
