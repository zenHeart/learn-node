# 依赖注入 (Dependency Injection)

> NestJS 的核心特性之一。IoC (Inversion of Control) 容器自动管理 Provider 的实例化和依赖解析，开发者只需声明依赖关系，无需手动 `new` 对象。

## 核心概念

### IoC 容器工作流程

```
1. 声明阶段
   └─▶ 在 Module 中声明 Provider (providers: [CatsService])

2. 解析阶段
   └─▶ IoC 容器分析 Provider 的构造函数依赖

3. 实例化阶段
   └─▶ 按依赖顺序创建实例，单例模式复用

4. 注入阶段
   └─▶ 自动将依赖注入到 Consumer 的构造函数
```

## 基本用法

### 构造函数注入 (最常用)

```typescript
@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}
}
```

### 手动注入 (token 方式)

```typescript
// 当依赖不是类时（如配置对象），使用 @Inject() 装饰器
import { Inject } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(
    @Inject('CONFIG_OPTIONS') private options: ConfigOptions,
  ) {}
}
```

## Provider 多种注册方式

### 1. 类作为 Token (最推荐)

```typescript
providers: [CatsService]  // 类本身作为 token
```

### 2. 字符串 Token

```typescript
providers: [
  { provide: 'CATS_SERVICE', useClass: CatsService },
  { provide: 'API_KEY', useValue: 'secret-123' },
]
```

### 3. useFactory (动态创建)

```typescript
providers: [
  {
    provide: 'DB_CONNECTION',
    useFactory: async () => {
      const db = await createConnection();
      return db;
    },
    inject: [ConfigService],  // 依赖的其他 Provider
  },
]
```

### 4. useExisting (别名)

```typescript
providers: [
  { provide: 'CACHE_KEY', useValue: new Cache() },
  { provide: 'CACHE_ALIAS', useExisting: 'CACHE_KEY' },
]
```

## 可选依赖

```typescript
import { Optional } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor(
    @Optional() @Inject('LOGGER') private logger: Logger,
  ) {
    this.logger = this.logger || console;
  }
}
```

## 属性注入 (不推荐)

除了构造函数注入，NestJS 也支持属性注入，但**不推荐**：

```typescript
@Injectable()
export class CatsService {
  @Inject(CatsRepository)
  private readonly catsRepository: CatsRepository;  // 属性注入
}
```

**为什么不推荐？**
- 无法使用 `inject` 选项
- 难以测试
- 违反依赖反转原则

## 作用域 (Scope)

| 作用域 | 说明 | 适用场景 |
|--------|------|----------|
| `DEFAULT` (默认) | 单例，全应用共享 | 大多数 Provider |
| `REQUEST` | 每个请求一个新实例 | 需要请求上下文 |
| `TRANSIENT` | 每次注入新实例 | 完全独立的实例 |

```typescript
@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  constructor() {
    this.id = Math.random(); // 每个请求不同
  }
}
```

## 循环依赖处理

当 A 依赖 B，B 也依赖 A 时：

```typescript
// 方式1: 使用 forwardRef
@Injectable()
export class CatsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
}
```

```typescript
// 方式2: 模块层面声明
@Module({
  providers: [
    { provide: UsersService, useClass: UsersService },
  ],
  exports: [UsersService],
})
export class UsersModule {}
```

## 自定义 Provider 示例

```typescript
// 带配置选项的 Provider
{
  provide: 'CACHE_TTL',
  useFactory: (config: ConfigService) => config.cacheTtl,
  inject: [ConfigService],
}

// 多实例 Provider
{
  provide: 'MULTI_TOKEN',
  useFactory: () => ['instance1', 'instance2'],
}
```

## 测试中的依赖注入

```typescript
// cats.service.spec.ts
import { Test } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: CatsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });
});
```

## 最佳实践

1. **优先使用构造函数注入** - TypeScript 友好，IDE 支持好
2. **使用类作为 Token** - 类型安全
3. **避免循环依赖** - 通过模块重新设计解决
4. **单例优先** - 默认使用单例，提高性能
5. **合理使用 Scope** - REQUEST scope 有性能开销，谨慎使用

---

_Next: [RESTful API 开发](./rest-api.md)_
