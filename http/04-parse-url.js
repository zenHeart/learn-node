// HTTP - URL 解析

const http = require('http');
const { URL, URLSearchParams } = require('url');

console.log('=== URL 解析 ===\n');

// 完整 URL
const url1 = new URL('https://alice:secret@example.com:8080/path/name?foo=bar&baz=qux#section');
console.log('URL:', url1.href);
console.log('protocol:', url1.protocol);   // https:
console.log('hostname:', url1.hostname);   // example.com
console.log('port:', url1.port);           // 8080
console.log('pathname:', url1.pathname);   // /path/name
console.log('search:', url1.search);      // ?foo=bar&baz=qux
console.log('hash:', url1.hash);          // #section
console.log('username:', url1.username); // alice
console.log('password:', url1.password);   // secret

// Query String 解析
console.log('\n=== Query String ===');
const params = new URLSearchParams(url1.search);
console.log('params.get("foo"):', params.get('foo'));
console.log('params.getAll("baz"):', params.getAll('baz'));
params.forEach((value, key) => console.log(`  ${key}: ${value}`));

// 构建 Query String
console.log('\n=== 构建 Query String ===');
const params2 = new URLSearchParams();
params2.set('name', 'Alice');
params2.set('age', '25');
params2.append('hobby', 'reading');
params2.append('hobby', 'coding');
console.log('params2.toString():', params2.toString());

// HTTP 请求的 URL 解析
console.log('\n=== HTTP 请求 URL 解析 ===');
const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  console.log('pathname:', parsed.pathname);
  console.log('searchParams:', [...parsed.searchParams.entries()]);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

server.listen(3002, () => {
  console.log('\n发起测试请求...');
  
  const http = require('http');
  http.get('http://localhost:3002/path/to/resource?a=1&b=2&b=3', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      server.close();
      console.log('\n服务器关闭');
    });
  });
});

// 运行结果:
// === URL 解析 ===
//
// URL: https://alice:secret@example.com:8080/path/name?foo=bar&baz=qux#section
// protocol: https:
// hostname: example.com
// port: 8080
// pathname: /path/name
// search: ?foo=bar&baz=qux
// hash: #section
// username: alice
// password: secret
//
// === Query String ===
// params.get("foo"): bar
// params.getAll("baz"): [ 'qux' ]
//   foo: bar
//   baz: qux
//
// === 构建 Query String ===
// params2.toString(): name=Alice&age=25&hobby=reading&hobby=coding
//
// === HTTP 请求 URL 解析 ===
// pathname: /path/to/resource
// searchParams: [ [ 'a', '1' ], [ 'b', '2' ], [ 'b', '3' ] ]
