// Net - IPC 管道通信（Unix Domain Socket）

const net = require('net');
const path = require('path');
const fs = require('fs');

const SOCKET_PATH = path.join(__dirname, 'test-data', 'ipc.sock');

// 清理旧 socket 文件
const socketDir = path.dirname(SOCKET_PATH);
if (!fs.existsSync(socketDir)) {
  fs.mkdirSync(socketDir, { recursive: true });
}
if (fs.existsSync(SOCKET_PATH)) {
  fs.unlinkSync(SOCKET_PATH);
}

// 服务器
const server = net.createServer((socket) => {
  console.log('客户端连接了');

  socket.setEncoding('utf8');

  socket.on('data', (data) => {
    console.log('服务器收到:', data.trim());
    socket.write('服务器收到: ' + data.trim() + '\n');
  });

  socket.on('close', () => {
    console.log('客户端断开');
    server.close();
    fs.unlinkSync(SOCKET_PATH);
    console.log('Socket 文件已清理');
  });
});

server.listen(SOCKET_PATH, () => {
  console.log(`IPC 服务器运行在 ${SOCKET_PATH}`);

  // 客户端
  const client = net.createConnection(SOCKET_PATH);

  client.setEncoding('utf8');

  client.on('connect', () => {
    console.log('已连接到服务器');
    client.write('Hello via IPC!');
  });

  client.on('data', (data) => {
    console.log('客户端收到:', data.trim());
    client.end();
  });

  client.on('close', () => {
    console.log('客户端连接关闭');
  });
});

// 运行结果:
// IPC 服务器运行在 ...\test-data\ipc.sock
// 客户端连接了
// 已连接到服务器
// 服务器收到: Hello via IPC!
// 客户端收到: 服务器收到: Hello via IPC!
// 客户端断开
// Socket 文件已清理
