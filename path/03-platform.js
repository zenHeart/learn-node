// Path - 跨平台路径处理

const path = require('path');

console.log('=== 跨平台路径处理 ===\n');

// path.sep - 路径分隔符
console.log('path.sep:', path.sep); // Windows: \, Unix: /

const parts = '/a/b/c'.split(path.sep);
console.log('使用 sep 分割 "/a/b/c":', parts);

// path.delimiter - 环境变量分隔符
console.log('path.delimiter:', path.delimiter); // Windows: ;, Unix: :

// normalize 规范化路径
console.log('\n=== normalize ===');
console.log('normalize("/a/b/../c"):', path.normalize('/a/b/../c'));     // /a/c
console.log('normalize("/a/b//c"):', path.normalize('/a/b//c'));       // /a/b/c
console.log('normalize("a/b/../../../c"):', path.normalize('a/b/../../../c')); // ../c
console.log('normalize("C:\\a\\b\\..\\c"):', path.normalize('C:\\a\\b\\..\\c')); // C:\a\c

// isAbsolute 判断绝对路径
console.log('\n=== isAbsolute ===');
console.log('isAbsolute("/a/b"):', path.isAbsolute('/a/b'));   // true (Unix)
console.log('isAbsolute("a/b"):', path.isAbsolute('a/b'));   // false
console.log('isAbsolute("C:\\a\\b"):', path.isAbsolute('C:\\a\\b')); // true (Windows)
console.log('isAbsolute("../a"):', path.isAbsolute('../a'));  // false

// relative 获取相对路径
console.log('\n=== relative ===');
console.log('relative("/a/b", "/a/b/c"):', path.relative('/a/b', '/a/b/c')); // c
console.log('relative("/a/b/c", "/a/b"):', path.relative('/a/b/c', '/a/b')); // ..

// 跨平台拼接技巧
function joinPath(...args) {
  return args.join(path.sep);
}
console.log('\njoinPath("a", "b", "c"):', joinPath('a', 'b', 'c'));

// 运行结果（Windows）:
// === 跨平台路径处理 ===
//
// path.sep: \
// 使用 sep 分割 "/a/b/c": [ '', 'a', 'b', 'c' ]
// path.delimiter: ;
//
// === normalize ===
// normalize("/a/b/../c"): \a\c
// normalize("/a/b//c"): \a\b\c
// normalize("a/b/../../../c"): ..\c
// normalize("C:\a\b\..\c"): C:\a\c
//
// === isAbsolute ===
// isAbsolute("/a/b"): false (Windows)
// isAbsolute("a/b"): false
// isAbsolute("C:\a\b"): true
// isAbsolute("../a"): false
//
// === relative ===
// relative("/a/b", "/a/b/c"): c
// relative("/a/b/c", "/a/b"): ..
//
