// Net - 简单 TCP 聊天室

const net = require('net');

// 聊天室状态
const clients = new Map();
let clientIdCounter = 0;

function broadcast(message, excludeId = null) {
  for (const [id, socket] of clients) {
    if (id !== excludeId) {
      socket.write(message);
    }
  }
}

function getClientCount() {
  return clients.size;
}

// 创建服务器
const server = net.createServer((socket) => {
  const id = ++clientIdCounter;
  const remoteAddr = `${socket.remoteAddress}:${socket.remotePort}`;
  clients.set(id, socket);

  console.log(`[+] 客户端 ${id} 连接 (${remoteAddr}), 当前 ${getClientCount()} 人`);

  socket.setEncoding('utf8');
  socket.write(`欢迎来到聊天室! 你被分配了 ID: ${id}\n`);
  broadcast(`[系统] 客户端 ${id} 加入了聊天室，当前 ${getClientCount()} 人\n`, id);

  socket.on('data', (data) => {
    const msg = data.trim();
    if (!msg) return;

    console.log(`[客户端 ${id}]: ${msg}`);
    broadcast(`[客户端 ${id}]: ${msg}\n`);
  });

  socket.on('close', () => {
    clients.delete(id);
    console.log(`[-] 客户端 ${id} 断开, 当前 ${getClientCount()} 人`);
    broadcast(`[系统] 客户端 ${id} 离开了，当前 ${getClientCount()} 人\n`);
  });

  socket.on('error', (err) => {
    console.error(`[客户端 ${id}] 错误:`, err.message);
  });
});

server.listen(4002, () => {
  console.log('TCP 聊天室服务器运行在 0.0.0.0:4002');

  // 模拟多个客户端
  setTimeout(() => simulateChat(), 200);
});

function simulateChat() {
  const client1 = net.createConnection({ port: 4002 });
  const client2 = net.createConnection({ port: 4002 });

  client1.setEncoding('utf8');
  client2.setEncoding('utf8');

  let ready = 0;
  const onReady = () => {
    ready++;
    if (ready === 2) {
      // 开始聊天
      client1.write('你好，我是客户端1!\n');
      setTimeout(() => client2.write('你好，我是客户端2!\n'), 100);
      setTimeout(() => client1.write('我们开始聊天吧\n'), 200);
      setTimeout(() => {
        client1.end();
        client2.end();
        server.close();
      }, 400);
    }
  };

  client1.on('connect', onReady);
  client2.on('connect', onReady);

  client1.on('data', (d) => console.log('[C1]', d.trim()));
  client2.on('data', (d) => console.log('[C2]', d.trim()));
  client1.on('close', () => console.log('[C1 关闭]'));
  client2.on('close', () => console.log('[C2 关闭]'));
}

// 运行结果:
// TCP 聊天室服务器运行在 0.0.0.0:4002
// [+] 客户端 1 连接 (...), 当前 1 人
// [+] 客户端 2 连接 (...), 当前 2 人
// [客户端 1]: 你好，我是客户端1!
// [C2] [系统] 客户端 1 加入了聊天室... 或 [客户端 1]: 你好...
// ...
// [-] 客户端 1 断开, 当前 1 人
// [-] 客户端 2 断开, 当前 0 人
