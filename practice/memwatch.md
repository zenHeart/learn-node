---
title:memcache    
tag:memcache      
birth:2017-03-08      
modified:2017-03-08      
---

memcache
===
**前言:检测 node 的内存使用**

---

# 利用 `memwatch` 模块检测 node 的内存使用

## 安装
```bash
npm install memwatch 
```

在 windows 下发现如下问题

1. 无法使用 node-gyp 进行编译，python 版本过高。

解决步骤:
1. 安装 python 2.7
2. 环境变量中添加对应版本
3. 利用 `npm install memwatch --python=python2.7` 设定编译使用的版本

2. 缺少 .net 组件包，去 ms 官网下载 [.net 组件包](https://www.microsoft.com/zh-cn/download/details.aspx?id=15354)

## 使用

```js
var memwatch= require('memwatch');

//检测内存泄漏
memwatch.on('leak',function() {});

//监听 gc 回收事件
/*
{
  "num_full_gc": 17,
  "num_inc_gc": 8,
  "heap_compactions": 8,
  "estimated_base": 2592568,
  "current_base": 2592568,
  "min": 2499912,
  "max": 2592568,
  "usage_trend": 0
}
*/
memwatch.on('stats',function(status) {});
//强制运行垃圾回收器
memwatch.gc();

//检测内存回收情况
//生成输出内存快照
var hd = new memwatch.HeapDiff();
//..。 代码块
//和快照比较结果
/*
{
  "before": { "nodes": 11625, "size_bytes": 1869904, "size": "1.78 mb" },
  "after":  { "nodes": 21435, "size_bytes": 2119136, "size": "2.02 mb" },
  "change": { "size_bytes": 249232, "size": "243.39 kb", "freed_nodes": 197,
    "allocated_nodes": 10007,
    "details": [
      { "what": "String",
        "size_bytes": -2120,  "size": "-2.07 kb",  "+": 3,    "-": 62
      },
      { "what": "Array",
        "size_bytes": 66687,  "size": "65.13 kb",  "+": 4,    "-": 78
      },
      { "what": "LeakingClass",
        "size_bytes": 239952, "size": "234.33 kb", "+": 9998, "-": 0
      }
    ]
  }
*/

var diff = hd.end();


```

其他工具

[v8-profiler](https://github.com/node-inspector/v8-profiler)


## heapdump 进行内存检测
 
[heapdump](https://github.com/bnoordhuis/node-heapdump) 

[内存检测好文章](https://cnodejs.org/topic/58eb5d378cda07442731569f)

## 文献
[理解 node 垃圾回收](https://www.dynatrace.com/blog/understanding-garbage-collection-and-hunting-memory-leaks-in-node-js/)

[node 内存追踪](https://hacks.mozilla.org/2012/11/tracking-down-memory-leaks-in-node-js-a-node-js-holiday-season/)

[node 性能检测](https://nodejs.org/en/docs/guides/simple-profiling/)

