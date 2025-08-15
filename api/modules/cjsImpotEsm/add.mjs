/**
 * 
注意 cjs 只允许加载没有顶层 await 的 esm 模块，否则会报错
*/

await Promise.resolve();
export function add(a, b) {
   return a + b;
}

process.nextTick(() => {
   console.log('nextTick'); // 3
});
Promise.resolve().then(() => {
   console.log('Promise.resolve'); // 3
});
