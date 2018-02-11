---
title: README.MD    
tags: config node tool      
birth: 2018-01-29      
modified: 2018-01-29      
---

README.MD
===
**前言:讲解 node config 配置工具的使用**

---


## 快速入门
1. 安装 config
```bash
npm i --save config    
```
2. 在项目根目录下建立 `config` 文件夹
添加如下文件
* `default.json` 默认配置文件, config 默认加载的配置
* `development.json` 默认配置文件, config 默认加载的配置


## 错误
### 结合 pm2 使用 config 出现无法查找到配置文件的错误
[pm2 config error](https://github.com/Unitech/pm2/issues/2045)
[pm2 和 node-config 使用问题](http://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables)

