# 微服务 (Microservices)

> NestJS 提供了一套完整的微服务开发能力，支持多种传输层（TCP、Redis、gRPC、MQTT 等），让构建分布式系统变得简单。

## 架构概览

```
                              ┌─────────────────┐
                              │   API Gateway   │
                              │   (NestJS)      │
                              └────────┬────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
              ▼                        ▼                        ▼
     ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
     │  Auth       │          │  Orders     │          │  Users      │
     │  Service     │          │  Service     │          │  Service    │
     │  (NestJS)    │          │  (NestJS)    │          │  (NestJS)   │
     └─────────────┘          └─────────────┘          └─────────────┘
              │                        │                        │
              └────────────────────────┴────────────────────────┘
                                       │
                              ┌────────▼────────┐
                              │     Redis       │
                              │  (Pub/Sub)      │
                              └─────────────────┘
```

## 传输层对比

| 传输层 | 协议 | 适用场景 |
|--------|------|----------|
| TCP | TCP | 高性能，同步通信 |
| Redis | Redis Pub/Sub | 发布订阅，事件驱动 |
| gRPC | HTTP/2 | 高性能，强类型 API |
| MQTT | MQTT | IoT，低带宽 |
| NATS | NATS | 高性能消息队列 |
| Kafka | Kafka | 大数据，日志处理 |

## 快速开始

### 安装

```bash
npm install @nestjs/microservices
```

### 创建微服务

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });

  await app.listen();
  console.log('Microservice is listening...');
}

bootstrap();
```

### 消息处理

```typescript
// orders.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  @MessagePattern('orders.create')  // 监听 'orders.create' 消息
  createOrder(@Payload() data: any) {
    return { orderId: '123', ...data };
  }

  @MessagePattern('orders.findAll')
  findAllOrders(@Payload() filters: any) {
    return [];
  }
}
```

## 事件驱动

### 事件发射

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersPublisher {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { port: 3001 },
    });
  }

  createOrder(order: any) {
    // 发送消息并等待响应
    return this.client.send('orders.create', order);
  }

  publishOrderCreated(order: any) {
    // 发布事件（不需要等待响应）
    this.client.emit('order.created', order);
  }
}
```

### 事件监听

```typescript
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  @EventPattern('order.created')  // 监听事件
  handleOrderCreated(@Payload() order: any) {
    console.log('Order created:', order);
    // 发送通知邮件等
  }
}
```

## gRPC 微服务

### 定义 .proto 文件

```protobuf
// proto/orders.proto
syntax = "proto3";

package orders;

service OrdersService {
  rpc CreateOrder(CreateOrderRequest) returns (CreateOrderResponse);
  rpc GetOrder(GetOrderRequest) returns (Order);
}

message CreateOrderRequest {
  string product_id = 1;
  int32 quantity = 2;
}

message CreateOrderResponse {
  string order_id = 1;
  string status = 2;
}

message GetOrderRequest {
  string order_id = 1;
}

message Order {
  string id = 1;
  string product_id = 2;
  int32 quantity = 3;
  string status = 4;
}
```

### 使用 gRPC

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'orders',
          protoPath: join(__dirname, 'proto/orders.proto'),
        },
      },
    ]),
  ],
})
export class AppModule {}
```

```typescript
// orders.controller.ts
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  @GrpcMethod('OrdersService', 'CreateOrder')
  createOrder(data: any) {
    return { orderId: '123', status: 'pending' };
  }
}
```

## Redis 消息队列

```typescript
// 发射端
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
  },
});

// 监听端
this.client.send('pattern', data).subscribe();
this.client.emit('event', data);  // 异步，不等待响应
```

## 请求-响应模式

```typescript
// 客户端
@Injectable()
export class CatsService {
  constructor(@Inject('ORDERS_SERVICE') private client: ClientProxy) {}

  findAll() {
    const pattern = { cmd: 'findAll' };  // 消息模式
    return this.client.send<any>(pattern, {});  // 返回 Observable
  }
}
```

```typescript
// 服务端
@Controller()
export class CatsController {
  @MessagePattern({ cmd: 'findAll' })
  findAll() {
    return [];
  }
}
```

## 混合应用 (HTTP + 微服务)

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 创建 HTTP 应用
  const app = await NestFactory.create(AppModule);

  // 连接微服务
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 3001 },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
```

## 异常处理

```typescript
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    return exception.getError();
  }
}

// 使用
@UseFilters(new RpcExceptionFilter())
```

## 最佳实践

1. **使用 DTO 和验证** - 通过 Pipe 验证微服务消息
2. **错误处理** - 实现统一的异常过滤器
3. **健康检查** - 添加 /health 端点监控服务状态
4. **超时处理** - 设置合理的请求超时时间
5. **重试机制** - 使用 `@Client()` 的 `retryAttempts` 配置

---

_Next: [GraphQL 集成](./graphql.md)_
