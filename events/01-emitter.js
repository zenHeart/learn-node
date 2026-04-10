// Events - 创建和使用 EventEmitter

const { EventEmitter } = require('events');

// 创建事件发射器
const emitter = new EventEmitter();

// 监听 'data' 事件
emitter.on('data', (data) => {
  console.log('监听器1收到数据:', data);
});

// 添加第二个监听器
emitter.on('data', (data) => {
  console.log('监听器2收到数据:', data);
});

// 监听 'open' 事件，接收多个参数
emitter.on('open', (host, port) => {
  console.log(`连接打开: ${host}:${port}`);
});

// 触发事件
console.log('--- 触发 data 事件 ---');
emitter.emit('data', 'Hello World');

console.log('\n--- 触发 open 事件 ---');
emitter.emit('open', '127.0.0.1', 8080);

// 查看事件监听器数量
console.log('\ndata 监听器数量:', emitter.listenerCount('data'));
console.log('open 监听器数量:', emitter.listenerCount('open'));

// 移除特定监听器
const listener3 = (data) => console.log('监听器3（将被移除）:', data);
emitter.on('temp', listener3);
emitter.emit('temp', 'test');
emitter.removeListener('temp', listener3);
emitter.emit('temp', 'test2'); // 不会输出

// 运行结果:
// --- 触发 data 事件 ---
// 监听器1收到数据: Hello World
// 监听器2收到数据: Hello World
//
// --- 触发 open 事件 ---
// 连接打开: 127.0.0.1:8080
//
// data 监听器数量: 2
// open 监听器数量: 1
// 监听器3（将被移除）: test
