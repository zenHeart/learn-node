// Path - join vs resolve 的区别

const path = require('path');

console.log('=== join vs resolve ===\n');

// join: 只是拼接，不会检查是否是绝对路径
console.log('join 拼接:');
console.log('path.join("/a", "/b"):', path.join('/a', '/b'));   // /a/b
console.log('path.join("a", "b"):', path.join('a', 'b'));       // a/b
console.log('path.join("a", "../b"):', path.join('a', '../b')); // b
console.log('path.join("a", "", "b"):', path.join('a', '', 'b')); // a/b

// resolve: 解析为绝对路径，以 / 或盘符开头
console.log('\nresolve 解析:');
console.log('path.resolve("/a", "/b"):', path.resolve('/a', '/b')); // /b (绝对路径覆盖)
console.log('path.resolve("a", "b"):', path.resolve('a', 'b'));     // 当前目录/绝对路径/a/b
console.log('path.resolve("a", "../b"):', path.resolve('a', '../b')); // 当前目录的父目录/b

// 实际应用场景
console.log('\n=== 实际应用 ===');

const projectRoot = '/Users/alice/project';
const srcDir = path.join(projectRoot, 'src');       // 拼接路径
const distDir = path.resolve(projectRoot, 'dist'); // 解析为绝对路径

console.log('项目根目录:', projectRoot);
console.log('源码目录 (join):', srcDir);  // /Users/alice/project/src
console.log('输出目录 (resolve):', distDir); // /Users/alice/project/dist

// 构建文件路径
const filename = 'bundle.js';
const outputPath = path.join(distDir, filename);
console.log('输出文件:', outputPath);

// 获取当前执行目录
console.log('\n当前目录:');
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());
console.log('resolve("."):', path.resolve('.'));

// 运行结果（取决于你的系统）:
// === join vs resolve ===
//
// join 拼接:
// path.join("/a", "/b"): \a\b  (Windows) 或 /a/b (Unix)
// path.join("a", "b"): a\b 或 a/b
// path.join("a", "../b"): b 或 ../b
// path.join("a", "", "b"): a\b 或 a/b
//
// resolve 解析:
// path.resolve("/a", "/b"): \b 或 /b (绝对路径覆盖)
// path.resolve("a", "b"): ...\当前目录\a\b
// path.resolve("a", "../b"): ...\当前目录的父\b
//
// === 实际应用 ===
// 项目根目录: /Users/alice/project
// 源码目录 (join): /Users/alice/project/src
// 输出目录 (resolve): /Users/alice/project/dist
// 输出文件: /Users/alice/project/dist/bundle.js
//
// 当前目录:
// __dirname: ...\learn-node\path
// process.cwd(): ...\learn-node
// resolve("."): ...\learn-node
