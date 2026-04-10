// Net - UDP 套接字

const dgram = require('dgram');

// 创建 UDP 服务器
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log(`收到 [${rinfo.address}:${rinfo.port}]:`, msg.toString());
  server.send(`Pong: ${msg}`, rinfo.port, rinfo.address);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP 服务器运行在 ${address.address}:${address.port}`);

  // 发送 UDP 消息（客户端）
  setTimeout(() => {
    const client = dgram.createSocket('udp4');

    client.on('message', (msg, rinfo) => {
      console.log(`[客户端] 收到服务器响应:`, msg.toString());
      client.close();
      server.close();
    });

    const message = Buffer.from('Ping!');
    client.send(message, 0, message.length, 4003, '127.0.0.1', (err) => {
      console.log('[客户端] 消息已发送');
    });
  }, 100);
});

server.bind(4003, '127.0.0.1');

// 运行结果:
// UDP 服务器运行在 0.0.0.0:4003
// 收到 [127.0.0.1:...]: Ping!
// [客户端] 收到服务器响应: Pong: Ping!
