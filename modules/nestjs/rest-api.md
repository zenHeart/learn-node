# RESTful API 开发

> NestJS 提供了强大的装饰器来简化 HTTP 请求处理，配合 class-validator 和 class-transformer 可以快速构建类型安全的 RESTful API。

## 请求装饰器

### 常用参数装饰器

```typescript
import {
  @Param(key?: string)        // URL 参数 /cats/:id
  @Query(key?: string)        // 查询参数 /cats?page=1
  @Body(key?: string)         // 请求体
  @Headers(key?: string)      // 请求头
  @Cookies(key?: string)      // Cookie
  @Ip()                        // IP 地址
  @Host()                      // Host 头
  @Req()                       // 原始 Express Request
  @Res()                       // 原始 Express Response
} from '@nestjs/common';
```

### 示例

```typescript
@Controller('cats')
export class CatsController {
  // GET /cats?page=1&limit=10
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return { page, limit };
  }

  // GET /cats/123
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') auth: string) {
    return { id, hasAuth: !!auth };
  }

  // POST /cats
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return createCatDto;
  }

  // PUT /cats/123
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return { id, ...updateCatDto };
  }

  // DELETE /cats/123
  @Delete(':id')
  remove(@Param('id') id: string) {
    return { deleted: id };
  }
}
```

## DTO 与数据验证

### 定义 DTO

```typescript
// create-cat.dto.ts
import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
```

### 全局验证管道

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // 移除未声明字段
    forbidNonWhitelisted: true, // 拒绝未声明字段
    transform: true,        // 自动类型转换
    transformOptions: { enableImplicitConversion: true },
  }));

  await app.listen(3000);
}
```

## 响应处理

### 状态码

```typescript
@Post()
@HttpCode(201)  // 自定义状态码，默认 201 Created
create(@Body() dto: CreateCatDto) {
  return dto;
}

@Delete(':id')
@HttpCode(204)  // 无返回内容
remove(@Param('id') id: string) {
  return null;
}
```

### 响应头

```typescript
@Post()
@Header('Cache-Control', 'none')  // 自定义响应头
create(@Body() dto: CreateCatDto) {
  return dto;
}
```

### 统一响应格式

```typescript
// 使用拦截器统一响应格式
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}

// main.ts
app.useGlobalInterceptors(new TransformInterceptor());
```

## 路由通配符

```typescript
@Get('ab*cd')     // /abXXXcd
findWildcard() {}

// GET /cats/123
// GET /cats/custom-id
@Get(':id')
findById(@Param('id') id: string) {}
```

## 路由前缀

```typescript
@Controller('cats')  // 所有路由自动添加 /cats 前缀
export class CatsController {
  @Get('breeds')     // GET /cats/breeds
  findBreeds() {}
}
```

## 异步处理

```typescript
@Get()
async findAll(): Promise<Cat[]> {
  return this.catsService.findAll();
}

// RxJS Observable
@Get()
findAllStream(): Observable<Cat[]> {
  return this.catsService.findAll$;
}
```

## 文件上传

```typescript
import { FileInterceptor } from '@nestjs/platform-express';

@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return { filename: file.filename };
}

// 多文件上传
@Post('upload-multiple')
@UseInterceptors(FilesInterceptor('files', 5))
uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {}
```

## 完整 CRUD 示例

```typescript
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.catsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createDto: CreateCatDto) {
    return this.catsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCatDto) {
    return this.catsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
```

---

_Next: [中间件/拦截器/守卫/异常过滤器](./advanced.md)_
