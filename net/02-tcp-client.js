// Net - TCP 客户端

const net = require('net');

// 创建多个连接到服务器
function createClient(id) {
  return new Promise((resolve, reject) => {
    const client = net.createConnection({ port: 4001 }, () => {
      console.log(`[客户端 ${id}] 已连接`);
      resolve(client);
    });

    client.setEncoding('utf8');
    client.id = id;

    client.on('data', (data) => {
      console.log(`[客户端 ${id}] 收到:`, data.trim());
    });

    client.on('close', () => {
      console.log(`[客户端 ${id}] 连接关闭`);
    });

    client.on('error', (err) => {
      console.error(`[客户端 ${id}] 错误:`, err.message);
    });
  });
}

// 首先确保服务器在运行
const server = net.createServer((socket) => {
  socket.setEncoding('utf8');
  socket.on('data', (data) => {
    console.log('[服务器] 收到:', data.trim());
    socket.write(`Pong: ${data.trim()}\n`);
  });
});

server.listen(4001, async () => {
  console.log('TCP 服务器运行在 4001\n');

  // 连接多个客户端
  const clients = [];
  for (let i = 1; i <= 3; i++) {
    const client = await createClient(i);
    clients.push(client);
  }

  // 发送消息
  clients.forEach((client, i) => {
    setTimeout(() => {
      client.write(`消息 from 客户端 ${client.id}`);
    }, i * 100);
  });

  // 关闭所有连接
  setTimeout(() => {
    console.log('\n--- 关闭所有客户端 ---');
    clients.forEach(c => c.end());
    server.close();
  }, 500);
});

// 运行结果:
// TCP 服务器运行在 4001
//
// [客户端 1] 已连接
// [客户端 2] 已连接
// [客户端 3] 已连接
// [服务器] 收到: 消息 from 客户端 1
// [服务器] 收到: 消息 from 客户端 2
// [服务器] 收到: 消息 from 客户端 3
// [客户端 1] 收到: Pong: 消息 from 客户端 1
// [客户端 2] 收到: Pong: 消息 from 客户端 2
// [客户端 3] 收到: Pong: 消息 from 客户端 3
//
// --- 关闭所有客户端 ---
// [客户端 1] 连接关闭
// [客户端 2] 连接关闭
// [客户端 3] 连接关闭
