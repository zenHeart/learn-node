# MongoDB 测试数据管理

> 如何高效创建、管理和使用 MongoDB 测试数据：insert / factory / seeding 完整指南。

## 1. 测试数据创建方法

### 1.1 手动插入

```javascript
// 单条插入
await db.collection('users').insertOne({
  name: '张三',
  email: 'zhangsan@example.com',
  age: 25,
  createdAt: new Date()
});

// 批量插入
await db.collection('users').insertMany([
  { name: '李四', email: 'lisi@example.com', age: 30 },
  { name: '王五', email: 'wangwu@example.com', age: 28 },
  { name: '赵六', email: 'zhaoliu@example.com', age: 35 }
]);
```

### 1.2 bulkWrite 批量操作

```javascript
// 高效批量写入
await db.collection('orders').bulkWrite([
  {
    insertOne: {
      document: { userId: 1, product: 'iPhone', amount: 6999 }
    }
  },
  {
    insertOne: {
      document: { userId: 2, product: 'MacBook', amount: 12999 }
    }
  },
  {
    updateOne: {
      filter: { userId: 1 },
      update: { $inc: { orderCount: 1 } }
    }
  }
]);
```

---

## 2. 测试数据 fixtures

### 2.1 fixtures 模式

将测试数据预先准备好，使用时直接加载：

```javascript
// tests/fixtures/users.js
module.exports = {
  validUser: {
    name: '测试用户',
    email: 'test@example.com',
    age: 25,
    roles: ['user']
  },
  adminUser: {
    name: '管理员',
    email: 'admin@example.com',
    age: 35,
    roles: ['user', 'admin']
  },
  users: [
    { name: '用户1', email: 'user1@example.com' },
    { name: '用户2', email: 'user2@example.com' }
  ]
};

// tests/setup.js
const { validUser, adminUser } = require('./fixtures/users');

async function setupTestData() {
  const db = await connectToTestDB();
  
  // 插入测试用户
  await db.collection('users').insertMany([validUser, adminUser]);
  
  return { db, validUser, adminUser };
}

async function cleanupTestData() {
  const db = await connectToTestDB();
  await db.collection('users').deleteMany({});
}
```

### 2.2 seeder 模式

```javascript
// scripts/seed.js
const mongoose = require('mongoose');
const User = require('../models/User');

const seedData = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    password: await hashPassword('password123'),
    age: 28
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    password: await hashPassword('password123'),
    age: 32
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // 清空现有数据
  await User.deleteMany({});
  
  // 插入种子数据
  await User.insertMany(seedData);
  
  console.log('种子数据已插入');
  await mongoose.disconnect();
}

seed().catch(console.error);
```

---

## 3. Factory 模式生成测试数据

### 3.1 简单 Factory

```javascript
// tests/factories/user.factory.js
const faker = require('faker');

function createUser(overrides = {}) {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    age: faker.random.number({ min: 18, max: 80 }),
    address: {
      city: faker.address.city(),
      country: faker.address.country()
    },
    ...overrides  // 允许覆盖默认字段
  };
}

// 使用
const user = createUser();                    // 随机用户
const userWithSpecificAge = createUser({ age: 25 });  // 指定年龄
const adminUser = createUser({ roles: ['admin'] });   // 管理员角色
```

### 3.2 支持异步的 Factory

```javascript
// tests/factories/user.factory.js
const faker = require('faker');
const crypto = require('crypto');

async function createUser(overrides = {}) {
  // 异步生成数据（如密码哈希）
  const hashedPassword = await hashPassword(faker.internet.password());
  
  return {
    id: crypto.randomUUID(),
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: hashedPassword,
    age: faker.random.number({ min: 18, max: 80 }),
    createdAt: faker.date.past(),
    ...overrides
  };
}

// 生成多个用户
async function createUsers(count, overrides = {}) {
  return Promise.all(
    Array.from({ length: count }, () => createUser(overrides))
  );
}

// 使用
const user = await createUser();
const users = await createUsers(10, { age: 25 }); // 10个25岁的用户
```

### 3.3 关联数据的 Factory

```javascript
async function createOrderWithUser(overrides = {}) {
  const user = await createUser();
  const order = {
    orderId: crypto.randomUUID(),
    userId: user.id,
    items: createOrderItems(faker.random.number({ min: 1, max: 5 })),
    total: faker.random.number({ min: 100, max: 10000 }),
    createdAt: new Date(),
    ...overrides
  };
  
  // 存入数据库
  await db.collection('users').insertOne(user);
  await db.collection('orders').insertOne(order);
  
  return { user, order };
}
```

---

## 4. Jest + MongoDB 集成测试

### 4.1 @shelf/jest-mongodb

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb'
};

// tests/users.test.js
const { MongoClient } = require('mongodb');

describe('User CRUD', () => {
  let db;
  let client;

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL);
    db = client.db();
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  test('创建用户', async () => {
    const user = { name: 'Test', email: 'test@example.com' };
    await db.collection('users').insertOne(user);
    
    const found = await db.collection('users').findOne({ email: 'test@example.com' });
    expect(found.name).toBe('Test');
  });
});
```

### 4.2 测试数据清理策略

```javascript
describe('User API', () => {
  let db;
  
  beforeEach(async () => {
    db = await connectToTestDB();
    // 每个测试前清理并插入基线数据
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(baselineUsers);
  });

  afterEach(async () => {
    // 测试后彻底清理
    await db.collection('users').deleteMany({});
    await db.collection('orders').deleteMany({});
  });
});
```

---

## 5. 最佳实践

### 5.1 使用独立测试数据库

```javascript
// 不要在生产/开发数据库上运行测试
const TEST_DB_NAME = 'test_app_db';
const TEST_DB_URL = `mongodb://localhost:27017/${TEST_DB_NAME}`;

// 每个测试文件使用独立的 collection 或数据库
beforeAll(async () => {
  client = await MongoClient.connect(TEST_DB_URL);
  db = client.db();
});

afterEach(async () => {
  // 清理当前测试使用的数据
  const collections = await db.listCollections().toArray();
  await Promise.all(
    collections.map(col => db.collection(col.name).deleteMany({}))
  );
});
```

### 5.2 测试数据隔离

```javascript
// 方案一：每个测试使用唯一前缀
test('用户创建', async () => {
  const testUser = { 
    ...createUser(),
    email: `test_${Date.now()}@example.com`  // 唯一邮箱
  };
});

// 方案二：使用事务（MongoDB 4.0+）
test('批量操作', async () => {
  const session = client.startSession();
  session.startTransaction();
  
  try {
    await db.collection('users').insertOne(user, { session });
    await db.collection('orders').insertOne(order, { session });
    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});
```

### 5.3 性能优化

```javascript
// 使用索引加速测试查询
beforeAll(async () => {
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
});

// 批量插入优化
async function bulkInsertUsers(count) {
  const users = await createUsers(count);
  // 分批插入，避免单次插入过大
  const BATCH_SIZE = 1000;
  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    const batch = users.slice(i, i + BATCH_SIZE);
    await db.collection('users').insertMany(batch, { ordered: false });
  }
}
```

---

## 6. 常用工具对比

| 工具 | 用途 | 特点 |
|------|------|------|
| **mongo-seeding** | JSON/JS 文件播种 | 简单易用，支持关系数据 |
| **mongofill** | Faker 风格的测试数据生成 | 链式 API，灵活 |
| **@shelf/jest-mongodb** | Jest MongoDB preset | 开箱即用，适合单元测试 |
| **mongodb-memory-server** | 内存中的 MongoDB | 无需真实数据库，CI 友好 |

### 6.1 mongo-seeding 示例

```javascript
// seed.config.js
const Seeder = require('mongo-seeding');
const config = {
  database: process.env.MONGODB_URI,
  dropDatabase: true
};

const seeder = new Seeder(config);

// seed/users.json
[
  {
    collection: 'users',
    documents: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ]
  }
];

// 执行
seeder.import(data).then(() => console.log('Done'));
```

### 6.2 mongodb-memory-server 示例

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js']
};

// tests/setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
});

afterAll(async () => {
  await mongoServer.stop();
});
```

---

## 7. 参考资源

- [@shelf/jest-mongodb](https://github.com/shelfio/jest-mongodb)
- [mongo-seeding](https://github.com/pkoson/mongo-seeding)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Faker.js](https://fakerjs.dev/)

---

## 8. 相关文档

- [Node.js 测试指南](../test.md)
- [Node.js 数据库连接](../database/mongodb-connection.md)
