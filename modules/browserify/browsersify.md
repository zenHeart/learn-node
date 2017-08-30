---
title: browsersify    
tags: js tool browserify      
birth: 2017-08-30      
modified: 2017-08-30      
---

browsersify
===
**前言:讲解包管理工具 browserify 的使用**

---

## 范例
学习 browerify 的范例

### hello_world
1. 类似 node 编写代码.
2. 编译生成导入文件
```bash
browserify main.js > bundule.js
``` 
3.  html 中引入该文件即可.

> browserify 会根据 require 搜索所有的引用文件,生成一个单一文件
原理详见 [how browserify work](https://github.com/browserify/browserify-handbook#how-browserify-works)

