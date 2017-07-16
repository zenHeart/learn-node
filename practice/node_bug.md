---
title:node_bug    
tag:node_bug      
birth:2017-02-27      
modified:2017-02-27      
---

node_bug
===
**前言:记录在使用 node 中的障碍和解决手段**

---

# 异步事件的同步处理
习惯于流程编程和面向对象的方式编程。
如何将编程中涉及到异步的流程抽象为顺序流程。

1. 采用事件机制进行封装
2. 采用回调函数机制封装
3. 采用 promise 对象进行封装

# exports 导出顺序
```js

 module.exports = messageServer;
 var messageServer = {
     sequenceInput:sequenceInput,
     deviceInputCheck:deviceInputCheck,
     checkNumber:checkNumber
 };
 
```

若 exports 在 对象前面则对应方法无法识别。