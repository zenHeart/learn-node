// Events - 实战：事件总线（Event Bus）

const { EventEmitter } = require('events');

// 事件总线单例
class EventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100); // 允许更多监听器
  }
}

const globalBus = new EventBus();

// 模块 A：用户模块
class UserService extends EventEmitter {
  constructor(bus) {
    super();
    this.bus = bus;
  }

  createUser(name, email) {
    console.log(`创建用户: ${name} <${email}>`);
    const user = { id: Date.now(), name, email };
    this.bus.emit('user:created', user);
    return user;
  }
}

// 模块 B：通知模块
class NotificationService extends EventEmitter {
  constructor(bus) {
    super();
    this.bus = bus;
  }

  init() {
    // 监听用户创建事件，发送欢迎邮件
    this.bus.on('user:created', (user) => {
      console.log(`[通知] 发送欢迎邮件给 ${user.email}`);
    });
  }
}

// 模块 C：日志模块
class AuditLog extends EventEmitter {
  constructor(bus) {
    super();
    this.bus = bus;
  }

  init() {
    this.bus.on('user:created', (user) => {
      console.log(`[审计] 用户注册: id=${user.id}, name=${user.name}`);
    });
  }
}

// 模块 D：分析模块
class Analytics extends EventEmitter {
  constructor(bus) {
    super();
    this.bus = bus;
  }

  init() {
    this.bus.on('user:created', () => {
      console.log('[分析] 用户数 +1');
    });
  }
}

// 组装
const userService = new UserService(globalBus);
const notifications = new NotificationService(globalBus);
const audit = new AuditLog(globalBus);
const analytics = new Analytics(globalBus);

notifications.init();
audit.init();
analytics.init();

// 触发用户创建
console.log('--- 创建第一个用户 ---');
userService.createUser('Alice', 'alice@example.com');

console.log('\n--- 创建第二个用户 ---');
userService.createUser('Bob', 'bob@example.com');

// 运行结果:
// --- 创建第一个用户 ---
// 创建用户: Alice <alice@example.com>
// [通知] 发送欢迎邮件给 alice@example.com
// [审计] 用户注册: id=..., name=Alice
// [分析] 用户数 +1
//
// --- 创建第二个用户 ---
// 创建用户: Bob <bob@example.com>
// [通知] 发送欢迎邮件给 bob@example.com
// [审计] 用户注册: id=..., name=Bob
// [分析] 用户数 +1
