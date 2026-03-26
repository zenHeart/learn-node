# NestJS vs Express vs Angular

> NestJS 站在两个巨人的肩膀上：Express 的简洁与 Angular 的架构思想。理解三者的差异，有助于更好地把握 NestJS 的设计哲学。

## 横向对比

| 维度 | Express | NestJS | Angular |
|------|---------|--------|---------|
| **定位** | 轻量 Web 框架 | 企业级后端框架 | 前端 SPA 框架 |
| **语言** | JavaScript/TypeScript | TypeScript | TypeScript |
| **架构** | 中间件链式 | 模块化 (IoC) | 模块化 (NgModule) |
| **依赖注入** | ❌ 无 | ✅ 完整支持 | ✅ 完整支持 |
| **装饰器** | ❌ 无原生支持 | ✅ 全面使用 | ✅ 全面使用 |
| **数据库** | 无内置 | TypeORM/Prisma | 无内置 |
| **学习曲线** | 低 | 中 | 高 |
| **适用场景** | 微 API、原型 | 企业后端 | Web 应用 |

## NestJS vs Express

### 相同点

```
┌─────────────────────────────────────────────────────┐
│                     Express                         │
│  • 基于 Node.js HTTP 框架                           │
│  • 中间件机制                                       │
│  • 路由处理                                         │
│  • 可与 NestJS 完全共存                             │
└─────────────────────────────────────────────────────┘
```

### NestJS 新增

```
┌─────────────────────────────────────────────────────┐
│                     NestJS                         │
│  • 模块化架构 (Application Structure)               │
│  • 依赖注入 (Dependency Injection)                 │
│  • 装饰器模式 (Decorator-based API)                │
│  • 统一错误处理 (Exception Filters)                │
│  • 守卫/拦截器/管道 (Guards/Interceptors/Pipes)    │
│  • 微服务支持 (Microservices)                      │
│  • GraphQL 支持                                    │
│  • WebSocket 支持                                   │
└─────────────────────────────────────────────────────┘
```

### 代码对比

#### Express 风格

```typescript
// Express: 路由分散，逻辑内聚
const express = require('express');
const app = express();

app.get('/cats', (req, res) => {
  const { page, limit } = req.query;
  res.json({ cats: [], page, limit });
});

app.post('/cats', (req, res) => {
  const cat = req.body;
  res.status(201).json(cat);
});

app.listen(3000);
```

#### NestJS 风格

```typescript
// NestJS: 模块化，职责分离
@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.catsService.findAll(pagination);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateCatDto) {
    return this.catsService.create(dto);
  }
}

@Injectable()
export class CatsService {
  findAll(pagination: PaginationDto) { /* 业务逻辑 */ }
  create(dto: CreateCatDto) { /* 业务逻辑 */ }
}
```

### 关键差异

| 场景 | Express | NestJS |
|------|---------|--------|
| 组织代码 | 按文件/路由组织 | 按模块 (Module) 组织 |
| 依赖管理 | 手动 require | 自动依赖注入 |
| 路由定义 | 散落在各处 | 集中在 Controller |
| 业务逻辑 | 可能在路由处理器中 | 在独立的 Service 中 |
| 类型安全 | 较弱 | 强 (TypeScript) |
| 测试 | 需 mock | 依赖注入，易测试 |

## NestJS vs Angular

### 相同点

```
┌─────────────────────────────────────────────────────┐
│          Angular ← ─────────── → NestJS            │
│  • 装饰器驱动 (@Controller, @Injectable)            │
│  • 模块化架构 (NgModule vs Module)                  │
│  • 依赖注入 (Injectable)                            │
│  • 守卫/管道/拦截器概念相似                          │
│  • RxJS 响应式编程                                  │
└─────────────────────────────────────────────────────┘
```

### 代码对比

#### Angular 前端

```typescript
// Angular: Component + Service
@Component({
  selector: 'app-cat-list',
  template: `<div *ngFor="let cat of cats">{{cat.name}}</div>`,
})
export class CatListComponent {
  constructor(private catsService: CatsService) {}
}

@Injectable({ providedIn: 'root' })
export class CatsService {
  constructor(private http: HttpClient) {}

  getCats() {
    return this.http.get('/api/cats');
  }
}
```

#### NestJS 后端

```typescript
// NestJS: Controller + Service
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}

@Injectable()
export class CatsService {
  constructor(private catsRepository: CatsRepository) {}

  findAll() {
    return this.catsRepository.find();
  }
}
```

### 架构对比

| 概念 | Angular | NestJS |
|------|---------|--------|
| 模块 | `NgModule` | `Module` |
| 组件 | `@Component` | `@Controller` |
| 服务 | `@Injectable` | `@Injectable` |
| 依赖注入 | `constructor(inj: Service)` | `constructor(inj: Service)` |
| 路由 | `RouterModule` | `@Controller` + `@Get` 等 |
| 守卫 | `CanActivate` | `CanActivate` |
| 管道 | `Pipe` | `Pipe` |
| 拦截器 | `Interceptor` | `Interceptor` |

## NestJS 的独特价值

### 为什么选择 NestJS？

```
1. 企业级架构
   └─▶ 模块化 → 代码组织清晰，易维护

2. 强类型安全
   └─▶ TypeScript + 装饰器 → 编译时检查

3. 可测试性
   └─▶ 依赖注入 → 轻松 mock，单元测试简单

4. 生态完整
   └─▶ 微服务、GraphQL、WebSocket、ORM 全部支持

5. 团队协作
   └─▶ 统一规范 → 新成员容易上手
```

### 为什么不用 NestJS？

```
1. 简单脚本/工具
   └─▶ Express/Fastify 更轻量

2. 学习成本
   └─▶ 团队不熟悉 TypeScript/Angular

3. 极致性能
   └─▶ Fastify 比 NestJS (Express) 更快

4. 小型项目
   └─▶ 过度设计不值得
```

## 最佳组合

```
┌──────────────────────────────────────────────────────────┐
│                    现代 Node.js 架构                      │
│                                                          │
│   前端 (Angular/React/Vue)                               │
│          │                                               │
│          ▼                                               │
│   API Gateway (Kong/Nginx)                               │
│          │                                               │
│          ▼                                               │
│   ┌─────────────────────────────────────────────────┐   │
│   │           NestJS 微服务集群                     │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│   │  │ Auth Svc  │  │ Users Svc │  │ Orders Svc│      │   │
│   │  └──────────┘  └──────────┘  └──────────┘      │   │
│   └─────────────────────────────────────────────────┘   │
│          │                                               │
│          ▼                                               │
│   PostgreSQL / MongoDB / Redis                           │
└──────────────────────────────────────────────────────────┘
```

## 总结

| 场景 | 推荐 |
|------|------|
| 简单 API / 工具脚本 | Express / Fastify |
| 企业级后端服务 | **NestJS** |
| 需要快速开发 | NestJS (Code First) |
| 已有 Angular 前端团队 | **NestJS** (统一心智模型) |
| 高性能需求 | Fastify + 自定义架构 |
| GraphQL 后端 | **NestJS** |
| 微服务架构 | **NestJS** |

---

_文档完成_
