# memory

## 知识点

1. debug
   1. 使用 `--trace_gc` 选项来跟踪垃圾回收
   2. 使用 `--prof` 收集性能日志`
      1. 通过 node 内置的 `linux-tick-processor` 工具来分析日志 通过 gc 运行的百分比来查看 gc 是否存在调用问题
2. memory
   1. process.memoryUsage() 获取内存使用情况, 包括 rss, heapTotal, heapUsed
   2. v8 只针对 heap 内存进行垃圾回收, 对于堆外内存不受垃圾回收影响，例如 buffer
   3. 内存bug
      1. 缓存没有采用 LRU 等淘汰算法导致内存泄漏，需要限制缓存数量
   4. 使用内存快照工具（如 Chrome DevTools）分析内存使用情况
