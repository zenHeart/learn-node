// Path - 解析路径各部分

const path = require('path');

const filePath = '/Users/alice/projects/node/app.js';

console.log('路径:', filePath);
console.log('---');
console.log('basename:', path.basename(filePath));       // app.js
console.log('dirname:', path.dirname(filePath));         // /Users/alice/projects/node
console.log('extname:', path.extname(filePath));         // .js
console.log('');

// parse 分解路径
const parsed = path.parse(filePath);
console.log('parse 结果:');
console.log('  root:', parsed.root);     // /
console.log('  dir:', parsed.dir);       // /Users/alice/projects/node
console.log('  base:', parsed.base);     // app.js
console.log('  ext:', parsed.ext);       // .js
console.log('  name:', parsed.name);     // app

// format 重新组装
const assembled = path.format(parsed);
console.log('\nformat 重新组装:', assembled);

// Windows 路径
const winPath = 'D:\\projects\\myapp\\src\\index.js';
console.log('\nWindows 路径:', winPath);
console.log('basename:', path.basename(winPath));       // index.js
console.log('dirname:', path.dirname(winPath));         // D:\projects\myapp\src
console.log('extname:', path.extname(winPath));         // .js

const winParsed = path.parse(winPath);
console.log('parse root:', winParsed.root);  // D:\
console.log('parse dir:', winParsed.dir);   // D:\projects\myapp\src

// 运行结果:
// 路径: /Users/alice/projects/node/app.js
// ---
// basename: app.js
// dirname: /Users/alice/projects/node
// extname: .js
//
// parse 结果:
//   root: /
//   dir: /Users/alice/projects/node
//   base: app.js
//   ext: .js
//   name: app
//
// format 重新组装: /Users/alice/projects/node/app.js
//
// Windows 路径: D:\projects\myapp\src\index.js
// basename: index.js
// dirname: D:\projects\myapp\src
// extname: .js
// parse root: D:\
// parse dir: D:\projects\myapp\src
