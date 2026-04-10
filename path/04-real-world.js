// Path - 实战应用

const path = require('path');

console.log('=== Path 实战应用 ===\n');

// 1. 获取文件扩展名（带点）
function getExt(filename) {
  return path.extname(filename);
}
console.log('getExt("app.js"):', getExt('app.js'));           // .js
console.log('getExt("app.min.js"):', getExt('app.min.js')); // .js
console.log('getExt("app"):', getExt('app'));               // ''

// 2. 替换扩展名
function replaceExt(filepath, newExt) {
  const base = filepath.slice(0, filepath.lastIndexOf('.'));
  return base + (newExt.startsWith('.') ? newExt : '.' + newExt);
}
console.log('\nreplaceExt("app.js", ".ts"):', replaceExt('app.js', '.ts'));
console.log('replaceExt("app.min.js", "css"):', replaceExt('app.min.js', 'css'));

// 3. 路径是否存在
const fs = require('fs');
function pathExists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}
console.log('\npathExists(__dirname):', pathExists(__dirname));
console.log('pathExists(__filename):', pathExists(__filename));

// 4. 获取项目根目录
function getProjectRoot() {
  // 向上查找 package.json
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return null;
}
console.log('\n项目根目录:', getProjectRoot());

// 5. 生成相对路径（用于日志）
function relativePath(from, to) {
  return path.relative(from, to);
}
console.log('relativePath(__dirname, "/a/b"):', relativePath(__dirname, '/a/b'));

// 6. 安全拼接用户输入的路径
function safeJoin(base, userInput) {
  // 移除 .. 等危险字符
  const safe = path.normalize(userInput).replace(/^(\.\.[\\/])+/, '');
  return path.join(base, safe);
}
console.log('\nsafeJoin("/data", "uploads"):', safeJoin('/data', 'uploads'));
console.log('safeJoin("/data", "../../etc/passwd"):', safeJoin('/data', '../../etc/passwd'));

// 运行结果:
// === Path 实战应用 ===
//
// getExt("app.js"): .js
// getExt("app.min.js"): .js
// getExt("app"): 
//
// replaceExt("app.js", ".ts"): app.ts
// replaceExt("app.min.js", "css"): app.min.css
//
// pathExists(__dirname): true
// pathExists(__filename): true
//
// 项目根目录: ...\learn-node
// relativePath(__dirname, "/a/b"): ...\a\b
//
// safeJoin("/data", "uploads"): \data\uploads
// safeJoin("/data", "../../etc/passwd"): \data\etc\passwd
