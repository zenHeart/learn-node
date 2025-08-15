# Node.js 内存使用分析示例

这个示例演示了Node.js中不同类型内存使用的区别，特别是堆内存与对外内存（如Buffer）的差异。

## 核心概念

### 堆内存 (Heap Memory)

- **定义**: V8引擎管理的JavaScript对象存储区域
- **特点**: 有大小限制，超出限制会导致进程崩溃
- **默认限制**: 约1.4GB (64位系统)
- **影响**: 主要影响 `heapUsed` 和 `heapTotal`

### 对外内存 (External Memory)

- **定义**: V8引擎外部分配的内存，如Buffer、ArrayBuffer
- **特点**: 不受V8堆限制约束，但会影响系统内存
- **影响**: 主要影响 `rss` 和 `external`

## 内存指标说明

- **RSS (Resident Set Size)**: 进程占用的物理内存总量
- **Heap Total**: V8分配的堆内存总量
- **Heap Used**: 实际使用的堆内存
- **External**: V8外部内存使用量
- **ArrayBuffers**: ArrayBuffer分配的内存

## 使用方法

### 基本用法

```bash
# 测试堆内存增长（可能导致崩溃）
node memoryUsage.js heap

# 测试Buffer内存增长（主要影响RSS）
node memoryUsage.js buffer

# 对比测试不同内存类型
node memoryUsage.js compare
```

### 高级用法

```bash
# 设置较小的堆内存限制来更快看到效果
node --max-old-space-size=512 memoryUsage.js heap

# 启用垃圾回收器暴露以便手动触发GC
node --expose-gc memoryUsage.js compare

# 组合参数使用
node --expose-gc --max-old-space-size=256 memoryUsage.js heap
```

## 测试场景

### 1. 堆内存测试 (`heap`)

- 创建大量JavaScript对象
- 观察堆内存快速增长
- 可能触发`Out of Memory`错误

**预期结果**:

- `heapUsed` 快速增长
- 达到限制时进程崩溃
- `rss` 相对稳定增长

### 2. Buffer内存测试 (`buffer`)

- 创建大型Buffer对象
- 观察RSS内存增长
- 不会轻易导致进程崩溃

**预期结果**:

- `rss` 快速增长
- `external` 显著增加
- `heapUsed` 相对稳定

### 3. 对比测试 (`compare`)

- 同时创建堆对象和Buffer
- 观察清理前后的内存变化
- 展示垃圾回收的效果

## 实际观察要点

### 堆内存增长时

```
=== 堆内存测试 - 第10次迭代 ===
RSS (物理内存):     156.23 MB  ← 缓慢增长
Heap Total (堆总量): 134.25 MB  ← 快速增长
Heap Used (堆使用):  128.45 MB  ← 快速增长
External (对外内存): 1.23 MB    ← 基本不变
```

### Buffer内存增长时

```
=== Buffer测试 - 第5次迭代 ===
RSS (物理内存):     567.89 MB  ← 快速增长
Heap Total (堆总量): 12.34 MB   ← 基本不变
Heap Used (堆使用):  8.56 MB    ← 基本不变
External (对外内存): 524.28 MB  ← 快速增长
```

## 常见Node.js参数

- `--max-old-space-size=<size>`: 设置V8老生代内存大小限制（MB）
- `--max-new-space-size=<size>`: 设置V8新生代内存大小限制（KB）
- `--expose-gc`: 暴露全局的gc()函数
- `--inspect`: 启用调试器
- `--trace-gc`: 显示垃圾回收信息

## 最佳实践

1. **监控内存使用**: 定期检查`process.memoryUsage()`
2. **合理使用Buffer**: 大数据处理时优先考虑Buffer
3. **避免内存泄漏**: 及时清理不需要的引用
4. **设置合理限制**: 根据实际需求调整内存限制
5. **使用流处理**: 处理大文件时使用流而非一次性加载

## 故障排查

### 内存不足错误

```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

**解决方案**:

- 增加堆内存限制: `--max-old-space-size=4096`
- 优化代码，减少内存使用
- 使用流处理替代大对象

### 系统内存不足

- 监控RSS使用情况
- 检查Buffer使用是否合理
- 考虑分批处理数据

## 相关资源

- [Node.js Memory Usage](https://nodejs.org/api/process.html#process_process_memoryusage)
- [V8 Memory Management](https://v8.dev/blog/memory)
- [Buffer Documentation](https://nodejs.org/api/buffer.html)
