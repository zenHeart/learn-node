# 子进程

**详解子进程模块的使用**

----


## 介绍
* **spawn** 
* **fork** 
* **exec** 
* **execFile** 


## 异步进程创建
### child_process.exec(command[, options][, callback]) 
1. 创建子 shell 
2. 执行传入命令

### execFile
直接在当前 shell 执行子命令

> 注意创建一个子 shell,如何验证此特性???

### fork
创建一个新的 node 进程,采用 IPC 模式进行通讯

### spawn
创建异步子进程

## 同步进程创建
### execFileSync

### execSync

### spawnSync

## ChildProcess (进程类)
### 事件
* **close** 进程关闭
* **disconnect** ???
* **exit** 进程退出
* **error** 进程错误
* **message** 进程消息

