---
title:supervisor    
tag:supervisor      
birth:2017-04-03      
modified:2017-04-03      
---

supervisor
===
**前言:讲解 supervisor 模块的使用**

---

# 概述

[supervisor](https://github.com/petruisfan/node-supervisor) 用来监听 node 文件的变化。
启动 supervisor 执行 js 文件。
避免了反复手动保存和启动的过程。

# 快速入门。

1. 启动脚本

```bash
supervisor <js_file> 
```

2. 利用 -i 忽略对某些文件的监听

```bash
# 执行 restify.js 文件，同时忽略对 node_modules,log 文件夹的监听
supervisor -i  node_modules,log restify.js
```

注意该模式支持 `glob` 的文件筛选。

```bash
# 执行 restify.js 文件，同时忽略对 .log 为后缀的文件监听。
supervisor -i *.log restify.js 
```

再利用 supervisor 启动脚本时。
可以根据启动信息判断设置是否成功。

例如：

```

Running node-supervisor with
  program 'charger_new.js'
  --watch '.'
  --ignore 'ota,*.log'
  --extensions 'node,js'
  --exec 'node'

Starting child process with 'node charger_new.js'
Ignoring directory 'D:\work_software\wamp\www\node_lab\charger\ota'.
Ignoring directory 'D:\work_software\wamp\www\node_lab\charger\*.log'.
Watching directory 'D:\work_software\wamp\www\node_lab\charger' for changes.
Press rs for restarting the process. 
```

前面为提示信息。
后面说明了 supervisor 的监测和忽略信息。
