# 模块化架构

> NestJS 的核心设计理念：一切皆模块。应用程序由一个个松耦合的模块组成，每个模块封装了相关的 Controller 和 Provider。

## 核心概念

### 三驾马车：Controller / Provider / Module

```
┌─────────────────────────────────────────────────────────┐
│                        Module                             │
│                                                         │
│   ┌─────────────────┐          ┌─────────────────┐       │
│   │   Controller    │          │    Provider    │       │
│   │  (路由/HTTP)     │          │   (业务逻辑)     │       │
│   └─────────────────┘          └─────────────────┘       │
│          │                            │                 │
│          └────────────────────────────┘                 │
│                      依赖注入                             │
└─────────────────────────────────────────────────────────┘
```

## Controller

负责处理**请求**和**响应**，不包含业务逻辑。

```typescript
import { Controller, Get, Post, Body, Query, Param, Headers } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return `Cats page ${page}, limit ${limit}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') auth: string) {
    return `Cat ${id}`;
  }

  @Post()
  create(@Body() createCatDto: any) {
    return createCatDto;
  }
}
```

### 常用装饰器

| 装饰器 | 作用 | 参数来源 |
|--------|------|----------|
| `@Get()` | GET 请求 | `@Query`, `@Param` |
| `@Post()` | POST 请求 | `@Body` |
| `@Put()` | PUT 请求 | `@Body` |
| `@Delete()` | DELETE 请求 | `@Param` |
| `@Patch()` | PATCH 请求 | `@Body` |
| `@Headers(name?)` | 请求头 | Header |

## Provider (Service)

封装**业务逻辑**，通过依赖注入被 Controller 使用。

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = [];

  findAll() {
    return this.cats;
  }

  create(cat: any) {
    this.cats.push(cat);
    return cat;
  }
}
```

### @Injectable() 装饰器

标记一个类为可注入的 Provider，NestJS IoC 容器会自动管理其生命周期。

```typescript
@Injectable({ scope: Scope.DEFAULT })      // 默认单例
@Injectable({ scope: Scope.REQUEST })       // 每个请求一个新实例
@Injectable({ scope: Scope.TRANSIENT })     // 每次注入新实例
```

## Module

将相关的 Controller 和 Provider 组织在一起。

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],  // 导出给其他模块使用
})
export class CatsModule {}
```

### 根模块

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
})
export class AppModule {}
```

### 功能模块示例

```
src/
├── app.module.ts           # 根模块
├── cats/
│   ├── cats.module.ts      # Cats 功能模块
│   ├── cats.controller.ts  # HTTP 入口
│   ├── cats.service.ts     # 业务逻辑
│   └── dto/
│       └── create-cat.dto.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
└── common/
    └── decorators/         # 共享装饰器
```

## 常用模块类型

| 类型 | 说明 |
|------|------|
| 功能模块 | 按业务域划分，如 UsersModule, OrdersModule |
| 全局模块 | `@Global()` 装饰，整个应用可直接注入，如 ConfigModule |
| 共享模块 | 被多个模块导入使用 |

```typescript
// 全局模块示例
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```

## 生命周期

```
应用启动 ──▶ 模块初始化 ──▶ Controller 实例化 ──▶ 请求处理
               │
               ▼
           Provider 实例化 (依赖解析)
```

1. **OnModuleInit** - 模块初始化时调用
2. **OnApplicationShutdown** - 应用关闭时调用

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class CatsService implements OnModuleInit {
  onModuleInit() {
    console.log('CatsService initialized');
  }
}
```

---

_Next: [依赖注入详解](./dependency-injection.md)_
