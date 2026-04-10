// OS - 系统基本信息

const os = require('os');

console.log('=== OS 系统信息 ===\n');

// 平台信息
console.log('平台:', os.platform());     // win32 / linux / darwin
console.log('架构:', os.arch());         // x64 / arm64
console.log('类型:', os.type());         // Windows_NT / Linux / Darwin
console.log('版本:', os.release());       // 10.0.19041 / 5.x.x / 21.x.x
console.log('主机名:', os.hostname());

// 用户信息
const userInfo = os.userInfo();
console.log('\n用户信息:');
console.log('  用户名:', userInfo.username);
console.log('  UID:', userInfo.uid);
console.log('  GID:', userInfo.gid);
console.log('  主目录:', userInfo.homedir);
console.log('  Shell:', userInfo.shell);

// 路径信息
console.log('\n路径信息:');
console.log('临时目录:', os.tmpdir());
console.log('EOL:', JSON.stringify(os.EOL)); // 换行符

// 运行时信息
console.log('\n运行时:');
console.log('CPU 核心数:', os.cpus().length);
console.log('总内存:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('空闲内存:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('当前负载:', os.loadavg()); // Unix only

// 运行结果（Windows）:
// === OS 系统信息 ===
//
// 平台: win32
// 架构: x64
// 类型: Windows_NT
// 版本: 10.0.19041
// 主机名: ...
//
// 用户信息:
//   用户名: ...
//   UID: -1
//   GID: -1
//   主目录: C:\Users\...
//   Shell: null
//
// 路径信息:
// 临时目录: C:\Users\...\AppData\Local\Temp
// EOL: "\r\n"
//
// 运行时:
// CPU 核心数: ...
// 总内存: ... GB
// 空闲内存: ... GB
// 当前负载: [0, 0, 0] (Windows 不支持 loadavg)
