---
title: test    
tags: test      
birth: 2017-06-30      
modified: 2017-06-30      
---

test
===
**前言:讲解 node 的测试**

---

# 文件组织

所有 test 文件均放在 `test` 文件夹下
目录树结构如下:

* lib
    * 放置所有库测试和数据结构测试
* *.js 放置所有应用层测试文件

按照类型组织

* e2e 端到端测试
* unit 单元测试
* benchmarks 负载和压力测试