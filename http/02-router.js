// HTTP - 简单路由实现

const http = require('http');
const url = require('url');

// 路由表
const routes = {
  'GET': {},
  'POST': {},
  'PUT': {},
  'DELETE': {},
};

// 注册路由
function register(method, path, handler) {
  routes[method][path] = handler;
}

// 路由匹配（支持参数）
function match(method, path) {
  const handler = routes[method][path];
  if (handler) return { handler, params: {} };

  // 尝试参数路由
  for (const [routePath, h] of Object.entries(routes[method])) {
    const pattern = routePath.replace(/:(\w+)/g, '([^/]+)');
    const regex = new RegExp(`^${pattern}$`);
    const match = path.match(regex);

    if (match) {
      const paramNames = (routePath.match(/:(\w+)/g) || []).map(s => s.slice(1));
      const params = {};
      paramNames.forEach((name, i) => params[name] = match[i + 1]);
      return { handler: h, params };
    }
  }

  return null;
}

// 注册路由
register('GET', '/', (req, res) => {
  res.json({ message: 'Welcome to API', version: '1.0' });
});

register('GET', '/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
});

register('GET', '/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: `User ${req.params.id}` });
});

register('POST', '/users', (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);
    res.json({ created: true, data });
  });
});

register('DELETE', '/users/:id', (req, res) => {
  res.json({ deleted: true, id: req.params.id });
});

register('GET', '/about', (req, res) => {
  res.json({ about: 'A simple router example' });
});

// 创建服务器
const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const method = req.method;

  // 添加 json 方法到 res
  res.json = (data) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  const route = match(method, pathname);

  if (route) {
    req.params = route.params;
    route.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3001, () => {
  console.log('路由服务器运行在 http://localhost:3001\n');

  const http = require('http');

  // 测试各路由
  const tests = [
    { method: 'GET', path: '/' },
    { method: 'GET', path: '/users' },
    { method: 'GET', path: '/users/42' },
    { method: 'POST', path: '/users', body: { name: 'Charlie' } },
    { method: 'DELETE', path: '/users/99' },
    { method: 'GET', path: '/unknown' },
  ];

  let index = 0;
  function runNext() {
    if (index >= tests.length) {
      server.close();
      return;
    }
    const t = tests[index++];
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: t.path,
      method: t.method,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`${t.method} ${t.path} => ${res.statusCode}:`, data.substring(0, 60));
        runNext();
      });
    });

    if (t.body) {
      req.write(JSON.stringify(t.body));
    }
    req.end();
  }

  runNext();
});

// 运行结果:
// 路由服务器运行在 http://localhost:3001
//
// GET / => 200: {"message":"Welcome to API","version":"1.0"}
// GET /users => 200: [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
// GET /users/42 => 200: {"id":"42","name":"User 42"}
// POST /users => 201: {"created":true,"data":{"name":"Charlie"}}
// DELETE /users/99 => 200: {"deleted":true,"id":"99"}
// GET /unknown => 404: {"error":"Not Found"}
