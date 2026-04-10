// HTTP - 中间件模式

const http = require('http');

// 中间件函数签名: (req, res, next) => void
// next: () => void 调用下一个中间件

class App {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
    return this;
  }

  handle(req, res) {
    // 添加 next 函数
    let index = 0;
    const next = () => {
      if (index >= this.middlewares.length) return;
      const fn = this.middlewares[index++];
      fn(req, res, next);
    };

    // 添加便捷方法到 res
    res.json = (data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    res.send = (data, status = 200) => {
      res.writeHead(status, { 'Content-Type': 'text/plain' });
      res.end(data);
    };

    next();
  }

  listen(port, cb) {
    const server = http.createServer((req, res) => this.handle(req, res));
    return server.listen(port, cb);
  }
}

// 创建应用
const app = new App();

// 中间件1：日志
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`  完成: ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// 中间件2：解析 URL
app.use((req, res, next) => {
  const { URL } = require('url');
  req.parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  req.path = req.parsedUrl.pathname;
  req.query = Object.fromEntries(req.parsedUrl.searchParams);
  next();
});

// 中间件3：认证检查（模拟）
app.use((req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (req.path === '/public') {
    next();
    return;
  }
  if (!token) {
    res.send('Unauthorized', 401);
    return;
  }
  req.user = { id: 1, name: 'Alice' }; // 模拟已登录用户
  next();
});

// 中间件4：路由处理
app.use((req, res, next) => {
  if (req.path === '/' && req.method === 'GET') {
    res.json({ message: 'Hello, World!', user: req.user });
    return;
  }
  if (req.path === '/api/users' && req.method === 'GET') {
    res.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
    return;
  }
  if (req.path === '/public' && req.method === 'GET') {
    res.json({ message: 'Public endpoint, no auth needed' });
    return;
  }
  next();
});

// 404 处理
app.use((req, res) => {
  res.send('Not Found', 404);
});

// 启动
app.listen(3004, () => {
  console.log('中间件服务器运行在 http://localhost:3004\n');

  const http = require('http');
  const tests = [
    { path: '/', token: 'valid-token' },
    { path: '/api/users', token: 'valid-token' },
    { path: '/public' },
    { path: '/unknown', token: 'valid-token' },
  ];

  let i = 0;
  function run() {
    if (i >= tests.length) return;
    const t = tests[i++];
    const options = {
      hostname: 'localhost',
      port: 3004,
      path: t.path,
    };
    if (t.token) options.headers = { 'x-auth-token': t.token };

    http.get(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`GET ${t.path} (${t.token ? 'with' : 'without'} token) => ${res.statusCode}:`, body.substring(0, 50));
        run();
      });
    });
  }
  run();
});

// 运行结果:
// 中间件服务器运行在 http://localhost:3004
//
// [2026-...] GET /
//   完成: 200 (1ms)
// GET / (with token) => 200: {"message":"Hello, World!","user":{"id":1,"name":"Alice"}}
// [2026-...] GET /api/users
//   完成: 200 (1ms)
// GET /api/users (with token) => 200: [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
// [2026-...] GET /public
//   完成: 200 (1ms)
// GET /public (without token) => 200: {"message":"Public endpoint, no auth needed"}
// [2026-...] GET /unknown
//   完成: 404 (1ms)
// GET /unknown (with token) => 404: Not Found
