# 装饰器模式

> NestJS 大量借鉴 Angular 的装饰器模式，通过 TypeScript 装饰器实现声明式编程。装饰器本质是语法糖，在编译时转换为实际的方法调用。

## TypeScript 装饰器基础

### 装饰器类型

| 类型 | 语法 | 执行时机 |
|------|------|----------|
| 类装饰器 | `@sealed` | 构造函数定义前 |
| 方法装饰器 | `@autobind` | 方法定义前 |
| 访问器装饰器 | `@readonly` | 访问器定义前 |
| 属性装饰器 | `@inject` | 属性定义前 |
| 参数装饰器 | `@param` | 参数声明前 |

### 启用装饰器

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## NestJS 核心装饰器

### HTTP 方法装饰器

```typescript
@Get(path?: string)
@Post(path?: string)
@Put(path?: string)
@Delete(path?: string)
@Patch(path?: string)
@Options(path?: string)
@Head(path?: string)
@All(path?: string)  // 处理所有 HTTP 方法
```

### 参数装饰器

```typescript
// 请求对象
@Req() req: Request           // 原始请求
@Res() res: Response           // 原始响应
@Next() next: NextFunction     // 下一个中间件

// 参数提取
@Body(key?: string)            // 请求体
@Query(key?: string)           // 查询参数
@Param(key?: string)           // URL 参数
@Headers(key?: string)         // 请求头
@Cookies(key?: string)         // Cookie
@Ip()                          // IP 地址
@Host()                        // Host

// 自定义上下文
@Context()                     // ExecutionContext
```

### 模块装饰器

```typescript
@Module(metadata: ModuleMetadata)
@Global()                      // 全局模块
```

### Provider 装饰器

```typescript
@Injectable()
@Scope(scope: Scope)           // 生命周期作用域
```

### 其他重要装饰器

```typescript
// 认证授权
@UseGuards(...guards)
@UsePipes(...pipes)
@UseInterceptors(...interceptors)
@UseFilters(...filters)

// 响应处理
@HttpCode(code: number)
@Header(name: string, value: string)

// 依赖注入
@Inject(token?: any)

// 可选注入
@Optional()

// 转发引用
@Inject(forwardRef(() => SomeClass))
```

## 自定义装饰器

### 创建自定义装饰器

```typescript
// decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// 使用
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}
```

### 带参数的自定义装饰器

```typescript
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // 如果传入参数，返回特定字段
    return data ? user?.[data] : user;
  },
);

// 使用
@Get('profile')
getProfile(@CurrentUser('name') userName: string) {  // 只返回 name
  return userName;
}
```

### 组合装饰器 (Decorator Factory)

```typescript
// 角色装饰器
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// 使用
@Get('admin')
@Roles('admin', 'superuser')
adminPanel() {}
```

```typescript
// 组合多个装饰器
import { applyDecorators } from '@nestjs/common';

export function Auth(options?: { roles?: string[] }) {
  return applyDecorators(
    UseGuards(AuthGuard),
    SetMetadata('roles', options?.roles || []),
    HttpCode(200),
  );
}

// 使用
@Auth({ roles: ['admin'] })
```

## 装饰器执行顺序

```typescript
@Controller('cats')           // 1. 类装饰器 (从下到上 → 从上到下)
@UseGuards(Guard1)            // 2. 方法装饰器
@UseGuards(Guard2)
export class CatsController {
  @Get(':id')                 // 3. 方法装饰器
  @UsePipes(Pipe1)            // 4. 参数装饰器
  @UsePipes(Pipe2)
  findOne(
    @Param('id') id: string,  // 5. 参数装饰器
    @Body() body: any,
  ) {}
}
```

**执行顺序：** 类装饰器从上到下执行，方法装饰器从上到下执行，参数装饰器从右到左执行。

## 元数据反射

```typescript
import 'reflect-metadata';

const CHILDREN_METADATA = 'custom:children';
const OWNER_METADATA = 'custom:owner';

@Reflect.metadata(CHILDREN_METADATA, 'child-value')
@Reflect.metadata(OWNER_METADATA, 'owner-value')
class Test {}

// 读取
console.log(Reflect.getMetadata(CHILDREN_METADATA, Test)); // 'child-value'
console.log(Reflect.getMetadata(OWNER_METADATA, Test));    // 'owner-value'
```

### 使用场景

- 在守卫中读取控制器元数据（如角色信息）
- 在模块中读取 Provider 元数据
- 实现自定义依赖注入

## 常见模式

### 1. Mixin 模式

```typescript
function Timestamped<T extends Constructor>(Base: T) {
  return class extends Base {
    createdAt = new Date();
    updatedAt = new Date();
  };
}

@Timestamped
class Cat {
  name: string;
}
```

### 2. 代理装饰器

```typescript
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };

  return descriptor;
}

class MyService {
  @Log
  doSomething(arg: string) {
    return `Done: ${arg}`;
  }
}
```

## 最佳实践

1. **使用 `createParamDecorator`** - 创建参数装饰器的标准方式
2. **使用 `applyDecorators`** - 组合多个装饰器
3. **保持装饰器纯净** - 装饰器应只添加元数据，不做复杂逻辑
4. **利用反射元数据** - 结合 `emitDecoratorMetadata` 使用

---

_Next: [NestJS vs Express/Angular](./vs-express-angular.md)_
