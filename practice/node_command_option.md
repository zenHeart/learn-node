---
title: node_command_option    
tags: node_command_option      
birth: 2017-06-17      
modified: 2017-06-17      
---

node_command_option
===
**前言:讲解 node 命令行选项**

---

# node 命令行基础
## 语法结构
调用 node 命令行的常见格式如下

* `node [options] [v8 options] [script.js | -e "script" | -] [--] [arguments]`
   常用来运行脚本
   
* `node debug [script.js | -e "script.js" | <host>:<port>] ...`
   常用来进行调试

* `node --v8-options` 用来配置 node 引擎

* `node` 没有参数会开启 ,repl 模式

## 命令行选项

命令行选项汇聚如下表

选项|作用|
:---|---|
`-v,--version`|版本号|
`-h,--help`|帮助信息|
`-e,--eval "script"`|执行 js |
`-p,--print "script"`|类似`-e`,但会返回执行结果,也可以利用它直接打印全局变量|
`-c,--check`|对脚本进行语法检查,不执行脚本|
`-i,--interactive`|打开 RPEL 模式|

# 调试模式

`--inspect[=[host:]port]`|激活 inspector,默认接口为 127.0.0.1:9229|

## 环境变量

设置环境变量打印模块的调试信息.