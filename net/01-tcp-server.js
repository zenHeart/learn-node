// Net - TCP 服务器

const net = require('net');

// 创建 TCP 服务器
const server = net.createServer((socket) => {
  const remoteAddr = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`客户端连接: ${remoteAddr}`);

  // 设置编码
  socket.setEncoding('utf8');

  // 接收数据
  socket.on('data', (data) => {
    console.log(`收到 [${remoteAddr}]:`, data.trim());
    
    // 回显数据
    socket.write(`服务器收到: ${data.trim()}\n`);
  });

  // 对方关闭连接
  socket.on('close', () => {
    console.log(`连接关闭: ${remoteAddr}`);
  });

  // 错误处理
  socket.on('error', (err) => {
    console.error(`Socket 错误 [${remoteAddr}]:`, err.message);
  });

  // 发送欢迎消息
  socket.write('欢迎连接到 TCP 服务器!\n');
});

// 服务器事件
server.on('error', (err) => {
  console.error('服务器错误:', err.message);
});

server.on('close', () => {
  console.log('服务器关闭');
});

// 监听端口
const PORT = 4001;
server.listen(PORT, () => {
  console.log(`TCP 服务器运行在 0.0.0.0:${PORT}`);

  // 模拟客户端连接
  setTimeout(() => {
    const client = net.createConnection({ port: PORT }, () => {
      console.log('\n--- 模拟客户端已连接 ---');

      client.setEncoding('utf8');

      client.write('Hello Server!');
      client.write('第二条消息\n');

      client.on('data', (data) => {
        console.log('服务器响应:', data.trim());
      });

      client.on('close', () => {
        console.log('客户端连接关闭');
        server.close();
      });

      setTimeout(() => client.end(), 100);
    });

    client.on('error', (err) => {
      console.error('客户端错误:', err.message);
    });
  }, 100);
});

// 运行结果:
// TCP 服务器运行在 0.0.0.0:4001
// 客户端连接: 127.0.0.1:...
// 收到 [127.0.0.1:...]: Hello Server!第二条消息
// 服务器响应: 服务器收到: Hello Server!第二条消息
// 连接关闭: 127.0.0.1:...
// 客户端连接关闭
// 服务器关闭
