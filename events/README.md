# Events 模块

Node.js 事件驱动模型的核心，几乎所有异步操作都基于事件。

## 主要功能

- EventEmitter 类
- on() / once() 监听事件
- emit() 触发事件
- removeListener() / removeAllListeners() 移除监听
- 错误处理与 newListener 事件

## 示例列表

| 文件 | 说明 |
|------|------|
| 01-emitter.js | 创建和使用 EventEmitter |
| 02-once.js | 只触发一次的事件 |
| 03-error.js | 错误处理机制 |
| 04-inherit.js | 继承 EventEmitter |
| 05-real-world.js | 实战：事件总线 |
