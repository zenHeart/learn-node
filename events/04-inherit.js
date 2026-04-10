// Events - 继承 EventEmitter

const { EventEmitter } = require('events');

// 继承 EventEmitter
class Database extends EventEmitter {
  constructor(url) {
    super();
    this.url = url;
    this.connected = false;
  }

  connect() {
    console.log(`连接数据库: ${this.url}`);
    setTimeout(() => {
      this.connected = true;
      this.emit('connected', this.url);
    }, 100);
  }

  query(sql, callback) {
    if (!this.connected) {
      this.emit('error', new Error('未连接数据库'));
      return;
    }
    setTimeout(() => {
      const result = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      this.emit('query', sql, result);
      callback(null, result);
    }, 50);
  }

  disconnect() {
    console.log('断开数据库连接');
    this.connected = false;
    this.emit('disconnected');
  }
}

// 使用
const db = new Database('mongodb://localhost:27017/myapp');

db.on('connected', (url) => {
  console.log(`✅ ${url}`);
});

db.on('query', (sql, result) => {
  console.log(`查询 "${sql}" 结果:`, result);
});

db.on('disconnected', () => {
  console.log('❌ 连接已断开');
});

db.on('error', (err) => {
  console.error('数据库错误:', err.message);
});

db.connect();
db.query('SELECT * FROM users', (err, data) => {
  if (!err) console.log('查询完成，共', data.length, '条记录');
});
db.disconnect();

// 运行结果:
// 连接数据库: mongodb://localhost:27017/myapp
// ✅ mongodb://localhost:27017/myapp
// 查询 "SELECT * FROM users" 结果: [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' } ]
// 查询完成，共 2 条记录
// 断开数据库连接
// ❌ 连接已断开
