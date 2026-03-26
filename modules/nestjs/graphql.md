# GraphQL 集成

> NestJS 提供了 `@nestjs/graphql` 和 `@nestjs/apollo` 模块，深度集成 GraphQL 和 Apollo Client，支持 Code-First 和 Schema-First 两种开发模式。

## 安装

```bash
npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

## 快速开始

### Code-First (推荐)

```typescript
// src/cats/cats.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,  // 自动生成 schema.gql
      sortSchema: true,
    }),
  ],
  providers: [CatsResolver, CatsService],
})
export class CatsModule {}
```

### 定义 Object Type

```typescript
// src/cats/cat.entity.ts
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  breed?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
```

### Resolver

```typescript
// src/cats/cats.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat], { name: 'cats' })
  findAll() {
    return this.catsService.findAll();
  }

  @Query(() => Cat, { name: 'cat', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.catsService.findOne(id);
  }

  @Mutation(() => Cat)
  createCat(@Args('input') createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Mutation(() => Cat)
  updateCat(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Mutation(() => Boolean)
  removeCat(@Args('id', { type: () => ID }) id: string) {
    return this.catsService.remove(id);
  }
}
```

## Input 和 Args

### 定义 Input

```typescript
// src/cats/dto/create-cat.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  breed?: string;
}
```

### 带参数的查询

```typescript
@Query(() => [Cat])
findByBreed(
  @Args('breed') breed: string,
  @Args('limit', { type: () => Int, nullable: true }) limit?: number,
) {
  return this.catsService.findByBreed(breed, limit);
}
```

## 关系映射

### 一对多

```typescript
// src/owner/owner.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cat } from './cat.entity';

@ObjectType()
@Entity()
export class Owner {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Cat, (cat) => cat.owner)
  @Field(() => [Cat])
  cats: Cat[];
}
```

### 使用 DataLoader 优化 N+1

```typescript
// cats-loader.ts
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { OwnersService } from '../owners/owners.service';

@Injectable()
export class CatsLoader {
  constructor(private ownersService: OwnersService) {}

  createLoader(): DataLoader<string, Owner> {
    return new DataLoader((ids) => this.ownersService.findByIds(ids));
  }
}
```

## 鉴权

### 使用 Guard

```typescript
// graphql.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphQLGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    // 鉴权逻辑
    return req.user && req.user.isAuthenticated;
  }
}
```

```typescript
@Resolver(() => Cat)
@UseGuards(GraphQLGuard)
export class CatsResolver {
  @Query(() => [Cat])
  @UseGuards(GraphQLGuard)  // Query 级别守卫
  findAll() {
    return this.catsService.findAll();
  }
}
```

## 上下文

```typescript
// main.ts
GraphQLModule.forRoot({
  context: ({ req }) => ({ req }),
}),
```

```typescript
// resolver 中访问
@Resolver()
export class CatsResolver {
  constructor() {}

  @Query(() => String)
  me(@Context() context: any) {
    return context.req.user;
  }
}
```

## Schema-First 模式

### 定义 schema

```graphql
# src/schema.gql
type Query {
  cats: [Cat]
  cat(id: ID!): Cat
}

type Mutation {
  createCat(input: CreateCatInput!): Cat
}

type Cat {
  id: ID!
  name: String!
  age: Int!
  breed: String
}

input CreateCatInput {
  name: String!
  age: Int!
  breed: String
}
```

### 实现

```typescript
// cats.types.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  breed?: string;
}
```

## 常用装饰器

| 装饰器 | 作用 |
|--------|------|
| `@Resolver(() => Type)` | 标记为 Resolver 类 |
| `@Query(() => Type)` | 定义查询 |
| `@Mutation(() => Type)` | 定义变更 |
| `@Subscription(() => Type)` | 定义订阅 |
| `@Field(() => Type)` | 字段定义 |
| `@Args('name')` | 参数提取 |
| `@Context` | 上下文 |
| `@Info` | GraphQL 执行信息 |

## 订阅 (Subscriptions)

```typescript
// main.ts
GraphQLModule.forRoot({
  subscriptions: {
    'graphql-ws': true,  // WebSocket 订阅
  },
}),
```

```typescript
@Resolver(() => Cat)
export class CatsResolver {
  private cats: Cat[] = [];

  @Subscription(() => Cat)
  catAdded() {
    return pubSub.asyncIterator('catAdded');
  }

  @Mutation(() => Cat)
  async createCat(@Args('input') input: CreateCatInput) {
    const cat = this.catsService.create(input);
    pubSub.publish('catAdded', { catAdded: cat });
    return cat;
  }
}
```

## 最佳实践

1. **使用 Code-First** - 类型安全，IDE 支持好
2. **DTO/Input 分离** - 请求和响应使用不同的类型
3. **DataLoader** - 解决 N+1 查询问题
4. **验证** - 使用 class-validator 验证输入
5. **分页** - 使用 Relay-style 游标分页

---

_Next: [数据库集成](./database.md)_
