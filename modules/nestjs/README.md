# NestJS 学习指南

> NestJS 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架，采用 TypeScript 构建，借鉴了 Angular 的模块化架构和 Spring Boot 的依赖注入理念。

## 📚 学习路径

```
1. 基础概念 ───────────────────────────────────────────────
   ├── 模块化架构 (Controller / Provider / Module)
   ├── 依赖注入 (IoC 容器、Provider 注入)
   ├── 装饰器模式 (@Body / @Query / @Param / @Headers)
   │
2. 核心功能 ───────────────────────────────────────────────
   ├── RESTful API 开发
   ├── 数据库集成 (TypeORM / Prisma)
   ├── GraphQL (@Resolver / @Query / @Mutation)
   ├── 微服务模式
   │
3. 进阶主题 ───────────────────────────────────────────────
   ├── 中间件 (Middleware)
   ├── 拦截器 (Interceptors)
   ├── 守卫 (Guards)
   ├── 异常过滤器 (Exception Filters)
   │
4. 实战与对比 ─────────────────────────────────────────────
   ├── NestJS vs Express
   └── NestJS vs Angular
```

## 🎯 核心概念速览

### 模块化架构

```
┌─────────────────────────────────────────────────────┐
│                      Module                          │
│  ┌─────────────┐    ┌─────────────┐                  │
│  │ Controller  │───▶│  Provider   │                  │
│  │ (@Get, etc) │    │ (Service)   │                  │
│  └─────────────┘    └─────────────┘                  │
│         │                  │                         │
│         └──────────────────┴── Dependency Injection   │
└─────────────────────────────────────────────────────┘
```

### 依赖注入流程

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Module     │───▶│  IoC Container│───▶│  Provider    │
│  (declare)   │    │  (resolve)   │    │  (instance)  │
└──────────────┘    └──────────────┘    └──────────────┘
```

## 📂 文档结构

| 文档 | 内容 |
|------|------|
| [architecture.md](./architecture.md) | 模块化架构详解 |
| [dependency-injection.md](./dependency-injection.md) | 依赖注入系统 |
| [rest-api.md](./rest-api.md) | RESTful API 开发 |
| [microservices.md](./microservices.md) | 微服务模式 |
| [graphql.md](./graphql.md) | GraphQL 集成 |
| [advanced.md](./advanced.md) | 中间件/拦截器/守卫/异常过滤器 |
| [decorators.md](./decorators.md) | 装饰器模式 |
| [vs-express-angular.md](./vs-express-angular.md) | 与 Express/Angular 对比 |

## 🚀 快速开始

### 安装

```bash
npm i -g @nestjs/cli
nest new my-app
cd my-app
npm run start:dev
```

### 最小示例

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

```typescript
// src/cats/cats.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'All cats';
  }
}
```

```typescript
// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getCats() {
    return [];
  }
}
```

## 🔗 演示示例

| 示例 | 文件 | 说明 |
|------|------|------|
| 模块架构演示 | [demo-architecture.html](../examples/nestjs/demo-architecture.html) | 交互式展示 Controller/Provider/Module 关系 |
| 依赖注入演示 | [demo-di.html](../examples/nestjs/demo-di.html) | 可视化 IoC 容器工作原理 |
| 装饰器演示 | [demo-decorators.html](../examples/nestjs/demo-decorators.html) | @Get/@Post/@Body 等装饰器实战 |

## 📖 学习资源

- [官方文档](https://docs.nestjs.com)
- [NestJS GitHub](https://github.com/nestjs/nest)
- [NestJS Discord](https://discord.gg/nestjs)

---

_本文档由 AI 辅助学习整理，如有疏漏欢迎指正。_
