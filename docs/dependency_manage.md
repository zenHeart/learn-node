---
title: dependency_manage    
tags: tool node bower browserify grunt webpack      
birth: 2017-10-08      
modified: 2017-10-08      
---

dependency_manage
===
**前言:讲解依赖管理的需求产生及工作原理**

---

## 概述
讲解依赖管理的需求产生和工作流程.

### 手动引入
jquery 时代.
利用 `loadsh,_underscore` 等库来编写代码


### 模块加载器
利用 require 等工具解决.
安装包的依赖和异步加载问题.

### bower 时代
利用 bower 管理包的安装.
只负责下载包,还是需要手动引入文件.
配合模块加载器进行加载

### browserify
利用 node 模块引入模式加载模块.
通过编译压缩文件大小.

问题 :
* 非 commonjs 风格模块无法加载.
* 需要利用 `browserify-shim` 工具来引入非模块式的包
* 混淆了前后端依赖,容易造成紊乱

### grunt + bower + browserify
利用 bower 安装前端模块.
利用 browserify 引入模块.
利用 gunrt 对引入资源进行压缩混淆

### webpack
抛弃了复杂的只针对 js 的包管理.
对所有资源均可实现模块的依赖导入.
极大地集成了以来管理的功能.

更现代化的依赖管理工具.

