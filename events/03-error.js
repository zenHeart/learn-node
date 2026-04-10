// Events - 错误处理机制

const { EventEmitter } = require('events');

const emitter = new EventEmitter();

// 监听 error 事件捕获异常
emitter.on('error', (err) => {
  console.error('捕获到错误:', err.message);
});

// 如果没有监听 error 事件，抛出时会直接崩溃
// emitter.emit('error', new Error('Oops!'));

// 推荐写法：确保 error 事件被监听
process.on('uncaughtException', (err) => {
  console.error('全局捕获未处理异常:', err.message);
});

// newListener 事件：监听器被添加时触发
emitter.on('newListener', (event, listener) => {
  console.log(`新监听器添加: ${event}`);
});

emitter.on('data', (x) => console.log('data:', x));

// 错误事件必须特殊处理，不能通过 emit 正常触发
// 下面演示自定义错误事件
emitter.on('file-error', (err) => {
  console.error('文件错误:', err.message);
});

function readFile(path) {
  const err = new Error(`无法读取文件: ${path}`);
  err.code = 'ENOENT';
  emitter.emit('file-error', err);
}

readFile('/nonexistent/file.txt');

// 运行结果:
// 新监听器添加: data
// 文件错误: 无法读取文件: /nonexistent/file.txt
