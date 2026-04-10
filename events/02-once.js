// Events - once() 只触发一次的事件

const { EventEmitter } = require('events');

const emitter = new EventEmitter();

// 使用 once() 监听，只触发一次
emitter.once('init', () => {
  console.log('初始化完成（只触发一次）');
});

emitter.once('connect', (host) => {
  console.log(`已连接: ${host}（只触发一次）`);
});

// 使用 on() 监听，持续触发
emitter.on('tick', () => {
  console.log('Tick 事件触发');
});

// 触发
console.log('--- 第一次触发 init ---');
emitter.emit('init');

console.log('\n--- 第二次触发 init ---');
emitter.emit('init'); // 不生效

console.log('\n--- 触发 connect ---');
emitter.emit('connect', 'localhost');
emitter.emit('connect', 'remote.com'); // 不生效

console.log('\n--- 触发 tick 三次 ---');
emitter.emit('tick');
emitter.emit('tick');
emitter.emit('tick');

// 实战：模拟一次性配置加载
function loadConfig() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const config = { port: 3000, env: 'development' };
      resolve(config);
    }, 100);
  });
}

const configEmitter = new EventEmitter();
loadConfig().then((config) => {
  configEmitter.emit('loaded', config);
});

configEmitter.once('loaded', (config) => {
  console.log('\n配置加载成功:', config);
});

// 运行结果:
// --- 第一次触发 init ---
// 初始化完成（只触发一次）
//
// --- 第二次触发 init ---
//
// --- 触发 connect ---
// 已连接: localhost（只触发一次）
//
// --- 触发 tick 三次 ---
// Tick 事件触发
// Tick 事件触发
// Tick 事件触发
//
// 配置加载成功: { port: 3000, env: 'development' }
