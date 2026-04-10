// Stream - HTTP 流式响应

const http = require('http');
const { Readable } = require('stream');

// 创建一个大数据源（流式产生数据）
class DataStream extends Readable {
  constructor(count) {
    super();
    this.count = count;
    this.current = 0;
  }

  _read() {
    if (this.current >= this.count) {
      this.push(null);
      return;
    }

    this.current++;
    const data = JSON.stringify({ id: this.current, time: Date.now() }) + '\n';

    setTimeout(() => {
      this.push(data);
    }, 50); // 模拟延迟
  }
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  console.log('请求:', req.method, req.url);

  if (req.url === '/stream') {
    // 流式响应
    res.writeHead(200, {
      'Content-Type': 'application/x-ndjson',
      'Transfer-Encoding': 'chunked',
      'X-Content-Type-Options': 'nosniff',
    });

    const stream = new DataStream(10);

    stream.pipe(res);

    stream.on('end', () => {
      console.log('流式响应完成');
    });
  } else if (req.url === '/normal') {
    // 普通响应（先收集再发送）
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const chunks = [];
    const stream = new DataStream(10);

    stream.on('data', (chunk) => chunks.push(chunk));

    stream.on('end', () => {
      res.end('[' + chunks.join(',') + ']');
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Try /stream or /normal');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('访问 /stream 查看流式响应');
  console.log('访问 /normal 查看普通响应\n');

  // 模拟客户端请求
  setTimeout(() => {
    const http = require('http');

    console.log('--- 客户端请求 /stream ---');
    http.get(`http://localhost:${PORT}/stream`, (res) => {
      res.on('data', (chunk) => {
        process.stdout.write('收到: ' + chunk.toString().trim() + '\n');
      });
      res.on('end', () => {
        console.log('请求结束\n');

        // 关闭服务器
        server.close(() => {
          console.log('服务器关闭');
        });
      });
    });
  }, 500);
});

// 运行结果:
// 服务器运行在 http://localhost:3000
// 访问 /stream 查看流式响应
// 访问 /normal 查看普通响应
//
// --- 客户端请求 /stream ---
// 请求: GET /stream
// 收到: {"id":1,"time":...}
// 收到: {"id":2,"time":...}
// ...
// 流式响应完成
// 请求结束
// 服务器关闭
