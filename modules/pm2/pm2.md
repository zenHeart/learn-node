pm2
===
**前言:讲解 pm2 的使用**

---

# 概述
[pm2](http://pm2.keymetrics.io/)是一个进程管理工具.

# 快速入门
参看 [quick start](http://pm2.keymetrics.io/docs/usage/quick-start/)

# 使用

可以使用命令行模式
或者配置文件来控制进程.

当启动 pm2 后.会生成如下文件.

* `$HOME/.pm2` 包含所有 pm2 管理进程的信息
* `$HOME/.pm2/logs` 包含所有管理进程的日志
* `$HOME/.pm2/pids` 包含所有进程信息
* `$HOME/.pm2/pm2.log` 包含 pm2 管理进程的信息
* `$HOME/.pm2/pm2.pid` pm2 进程信息
* `$HOME/.pm2/rpc.sock` 远程 socket 文件
* `$HOME/.pm2/pub.sock` socket 文件用来发布事件
* `$HOME/.pm2/conf.js` pm2 配置文件

## 命令行模式
```bash
# 进程控制
# 控制单各进程
pm2 start app.js --name my-api
pm2 stop 0 # 停止进程 0
pm2 restart 0 # 停止进程 0
pm2 reload 0 # 重载环境变量
pm2 gracefulReload 0 # 优雅重载,显示退出信息

# 所有进程
pm2 stop all # 停止所有进程
pm2 restart all
pm2 reload all
# 删除 pm2 进程清单
pm2 delete 0
pm2 delete all

# 查看进程信息
pm2 list # 显示进程信息
pm2 jlist # 按照 json 格式显示进程信息
pm2 prettylist # 一可读的方式显示进程信息
pm2 monit # 可以查看各进程输出
pm2 describe <pm2_进程 id> # 显示某一进程详细信息
```

当使用 pm2 启动应用是时.
会根据文件后缀选择解析器.
默认为 node.支持文件后缀如下

* `.sh` bash
* `.py` python
* `.rb` ruby
* `.pl` perl
* `.php` php
* `.coffee` coffee
* `.js` node

命令行常用参数如下


可以使用  `pm2 update` 更新模块

## 文件模式
可以采用文件管理多个应用.
pm2 支持 js,json,yaml 三种格式.

以 json 文件举例讲解多个进程的管理配置.

1. 在 `~/.pm2` 目录下创建 `pm2.json` 文件
当然你也可以在每个工程的根目录创建管理该进程的 json 文件.
范例配置如下.
```json
{
  "apps" : [{
    "name"        : "charger-doc",
    "script"      : "gitbook",
    "args"        : "serve",
    "cwd"         : "/home/locke-remote/project/gitbook/",
    "watch"       :false
  },{
    "name"        : "release-server",
    "script"      : "charger.js",
    "cwd"         : "/home/locke-remote/project/release_charger/",
    "watch"       :false
  },{
    "name"        : "release-client",
    "script"      : "client.js",
    "cwd"         : "/home/locke-remote/project/release_charger/",
    "watch"       :false
  }
  ]
} 
```

* name 表示进程应用名
* script 表示需要执行的命令或脚本
* cwd 脚本的执行路径
* args 运行命令的附加参数
* watch 检测 cwd 目录变化后重启进程

更多参数参见  [pm2 配置文件参数](http://pm2.keymetrics.io/docs/usage/application-declaration/#attributes-available)

采用配置文件运行方式如下.

```bash
pm2 start ~/.pm2/pm2.json # 运行配置文件 
pm2 restart ~/.pm2/pm2.json # 重启配置文件
pm2 restart ~/.pm2/pm2.json  --only charger-doc # 只重启应用名为 charger-doc 的应用
```

