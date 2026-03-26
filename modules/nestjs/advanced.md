# 中间件 / 拦截器 / 守卫 / 异常过滤器

> NestJS 请求生命周期中四个重要的扩展点，分别在不同阶段介入，实现日志、认证、授权、异常处理等功能。

## 请求生命周期

```
请求 ──▶ Middleware ──▶ Guard ──▶ Interceptor(pre) ──▶ Pipe ──▶ Controller ──▶ Service
         │             │           │                      │
         ▼             ▼           ▼                      ▼
      路由匹配      权限校验      响应转换              数据验证
                                                              │
         ◀──────────────────────────────────────────────────
         │
         ▼
    Interceptor(post) ──▶ Exception Filter ──▶ 响应
```

## 1. 中间件 (Middleware)

类似于 Express 中间件，用于处理**路由匹配前**的逻辑。

```typescript
// 函数式中间件
import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  }
}
```

```typescript
// 类中间件 (可注入依赖)
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (!this.authService.validate(req.headers.authorization)) {
      return res.status(401).send('Unauthorized');
    }
    next();
  }
}
```

### 注册中间件

```typescript
// app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module()
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthMiddleware)
      .forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.ALL });
  }
}
```

### 排除路由

```typescript
consumer
  .apply(LoggerMiddleware)
  .exclude('cats/(.*)', 'users/(.*)')
  .forRoutes('*');
```

## 2. 守卫 (Guard)

在**路由处理之前**执行，用于**权限校验**。可以访问 `ExecutionContext`。

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // 返回 true 表示允许访问
    // 返回 false 或抛出异常表示拒绝
    return user && user.isAuthenticated;
  }
}
```

### 带角色检查的守卫

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.roles.includes(user.role);
  }
}
```

### 使用守卫

```typescript
// 单独使用
@Get('profile')
@UseGuards(AuthGuard)
getProfile() {}

// 多个守卫
@Get('admin')
@UseGuards(AuthGuard, RolesGuard)
adminPanel() {}

// 全局守卫
// main.ts
app.useGlobalGuards(new AuthGuard());
```

## 3. 拦截器 (Interceptor)

在**请求处理前后**执行，可修改请求/响应，处理日志、缓存、响应转换等。

### 生命周期

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    console.log(`[${request.method}] ${request.url} started`);

    return next.handle().pipe(
      tap(() => {
        console.log(`[${request.method}] ${request.url} completed in ${Date.now() - now}ms`);
      }),
    );
  }
}
```

### 响应转换

```typescript
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

### 全局拦截器

```typescript
// main.ts
app.useGlobalInterceptors(new TransformInterceptor());
```

## 4. 异常过滤器 (Exception Filter)

捕获处理过程中的异常，统一格式化错误响应。

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
```

### 内置 HTTP 异常

```typescript
throw new NotFoundException('Cat not found');           // 404
throw new BadRequestException('Invalid input');         // 400
throw new UnauthorizedException();                       // 401
throw new ForbiddenException();                          // 403
throw new ConflictException('Already exists');          // 409
```

### 自定义异常

```typescript
// forbidden.exception.ts
export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message,
        error: 'Forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
```

## 综合示例

```typescript
// cats.controller.ts
@Controller('cats')
@UseInterceptors(LoggingInterceptor)    // 拦截器：日志
@UseGuards(AuthGuard)                     // 守卫：认证
export class CatsController {
  @Get()
  @UseGuards(RolesGuard.bind(null, ['admin']))  // 额外守卫
  findAll() {
    throw new NotFoundException('No cats found');  // 异常
  }
}
```

## 对比总结

| 组件 | 执行时机 | 典型用途 |
|------|----------|----------|
| Middleware | 路由匹配前 | 日志、CORS、请求体解析 |
| Guard | Controller 之前 | 认证、授权、角色检查 |
| Interceptor (pre) | Controller 之前 | 参数转换、缓存 |
| Pipe | 参数验证/转换 | 类型转换、验证 |
| Interceptor (post) | Response 之前 | 响应格式化、日志 |
| Exception Filter | 异常抛出时 | 统一错误处理 |

---

_Next: [装饰器模式](./decorators.md)_
