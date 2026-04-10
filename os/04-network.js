// OS - 网络接口信息

const os = require('os');

console.log('=== 网络接口 ===\n');

// 获取所有网络接口
const interfaces = os.networkInterfaces();

for (const [name, addrs] of Object.entries(interfaces)) {
  console.log(`接口 ${name}:`);
  for (const addr of addrs) {
    console.log(`  ${addr.family} - ${addr.address}`);
    console.log(`    MAC: ${addr.mac}`);
    console.log(`    内网: ${addr.internal}`);
    if (addr.netmask) console.log(`    子网掩码: ${addr.netmask}`);
    if (addr.cidr) console.log(`    CIDR: ${addr.cidr}`);
  }
}

// 快速获取 IPv4 地址
console.log('\n=== 常用网络信息 ===');
console.log('主机名:', os.hostname());

// 获取第一个非内部 IPv4
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const [name, addrs] of Object.entries(interfaces)) {
    for (const addr of addrs) {
      if (addr.family === 'IPv4' && !addr.internal) {
        return addr.address;
      }
    }
  }
  return null;
}
console.log('本机 IP:', getLocalIP() || '未找到');

// OS 内置常量
console.log('\n=== OS 常量 ===');
console.log('信号量 (SIGINT):', os.constants.signals.SIGINT);
console.log('错误码 (ENOENT):', os.constants.errno.ENOENT);
console.log('平台标识 (UV_UDP_REUSEADDR):', os.constants.UV_UDP_REUSEADDR);

// 运行结果（取决于你的网络）:
// === 网络接口 ===
//
// 接口 Ethernet:
//   IPv4 - 192.168.1.100
//     MAC: aa:bb:cc:dd:ee:ff
//     内网: true
//     子网掩码: 255.255.255.0
//     CIDR: 192.168.1.100/24
//   IPv6 - fe80::...
//     MAC: ...
//     内网: true
//
// === 常用网络信息 ===
// 主机名: ...
// 本机 IP: ...
//
// === OS 常量 ===
// 信号量 (SIGINT): 2
// 错误码 (ENOENT): -2
// 平台标识 (UV_UDP_REUSEADDR): ...
