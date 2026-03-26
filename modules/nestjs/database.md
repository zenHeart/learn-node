# 数据库集成 (TypeORM / Prisma)

> NestJS 支持多种 ORM，其中 TypeORM 和 Prisma 是最流行的两个选择。

## TypeORM

### 安装

```bash
npm install @nestjs/typeorm typeorm pg
```

### 配置

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'mydb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // 开发环境，生产关闭
    }),
  ],
})
export class AppModule {}
```

### 定义 Entity

```typescript
// cats/cat.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Cat {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column('int')
  age: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  breed?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Repository 模式

```typescript
// cats/cats.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectRepository(Cat)
    private readonly repo: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<Cat | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<Cat>): Cat {
    return this.repo.create(data);
  }

  async save(cat: Cat): Promise<Cat> {
    return this.repo.save(cat);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
```

## Prisma

### 安装

```bash
npm install prisma @prisma/client
npx prisma init
```

### 定义 Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Cat {
  id        String   @id @default(uuid())
  name      String
  age       Int
  breed     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  ownerId   String?
  owner     Owner?   @relation(fields: [ownerId], references: [id])
}

model Owner {
  id    String @id @default(uuid())
  name  String
  cats  Cat[]
}
```

### 生成客户端

```bash
npx prisma generate
```

### Prisma Service

```typescript
// prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### 使用

```typescript
// cats.service.ts
@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cat.findMany();
  }

  async findOne(id: string) {
    return this.prisma.cat.findUnique({ where: { id } });
  }

  async create(data: { name: string; age: number; breed?: string }) {
    return this.prisma.cat.create({ data });
  }
}
```

## TypeORM vs Prisma

| 维度 | TypeORM | Prisma |
|------|---------|--------|
| 学习曲线 | 中等 | 低 |
| 类型安全 | 好 | **极好** (生成的类型) |
| 迁移 | 手动/Synchronize | **声明式 schema** |
| 查询构建器 | Repository/ActiveRecord | **链式 API** |
| 性能 | 好 | 好 |
| 生态 | 成熟 | 快速发展 |
| N+1 问题 | DataLoader | 内置 select include |

## 最佳实践

1. **使用事务** - 复杂操作使用 `@Transaction`
2. **索引** - 给高频查询字段添加 `@Index()`
3. **分页** - 使用 `take`/`skip` 或 Cursor
4. **验证** - DTO + class-validator
5. **N+1** - 使用 DataLoader 或 Prisma 的 `include`

---

_文档完成_
