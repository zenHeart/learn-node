// HTTP - HTTP 客户端请求

const http = require('http');
const https = require('https');
const { URL } = require('url');

// 封装请求函数
function request(urlStr, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const opts = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = client.request(opts, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body.toString(),
          bodyJson: tryParse(body.toString()),
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function tryParse(str) {
  try { return JSON.parse(str); } catch { return null; }
}

// 测试请求
async function main() {
  console.log('=== HTTP 客户端请求 ===\n');

  // 请求 httpbin.org（公开测试 API）
  try {
    // GET 请求
    console.log('1. GET 请求 httpbin.org/get');
    const getRes = await request('https://httpbin.org/get?foo=bar');
    console.log('状态:', getRes.status);
    console.log('响应:', getRes.body.substring(0, 100) + '...\n');

    // POST 请求
    console.log('2. POST 请求 httpbin.org/post');
    const postRes = await request('https://httpbin.org/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Alice', age: 25 },
    });
    console.log('状态:', postRes.status);
    console.log('响应:', postRes.body.substring(0, 100) + '...\n');

    // 请求 JSONPlaceholder
    console.log('3. GET 请求 jsonplaceholder.typicode.com/users/1');
    const userRes = await request('https://jsonplaceholder.typicode.com/users/1');
    console.log('状态:', userRes.status);
    console.log('用户:', userRes.bodyJson);
  } catch (err) {
    console.log('请求失败:', err.message);
  }
}

main();

// 运行结果:
// === HTTP 客户端请求 ===
//
// 1. GET 请求 httpbin.org/get
// 状态: 200
// 响应: {"args":{"foo":"bar"},...
// 2. POST 请求 httpbin.org/post
// 状态: 200
// 响应: {"data":"{\"name\":\"Alice\",\"age\":25}",...
// 3. GET 请求 jsonplaceholder.typicode.com/users/1
// 状态: 200
// 用户: {"id":1,"name":"Leanne Graham",...
