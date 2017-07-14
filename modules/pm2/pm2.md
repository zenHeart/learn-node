pm2
===
**前言:讲解 pm2 的使用**

---

# 概述
[pm2](http://pm2.keymetrics.io/)是一个进程管理工具.
它支持进程状态控制,进程运行监控,多进程管理,日志记录,代码部署等功能.

# 快速入门
1. 安装 `pm2`

```bash
# 安装 
npm install -g pm2

# 更新
pm2 update
```

2. 启动进程

进入项目根目录执行

```bash
# 启动 app.js
pm2 start app.js 
```

启动后 pm2 以表格信息显示进程信息.

    ┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────────┐
    │ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ watching │
    ├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────────┤
    │ app      │ 0  │ fork │ 42062 │ online │ 0       │ 0s     │ 2%  │ 15.2 MB   │ disabled │
    └──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────────┘

各字段含义为

* `App name` 应用名称,默认情况下 pm2 忽略后缀,利用文件名作为应用名称,也可可传入 `--name` 参数定义用户名
* `id` pm2 下的应用 id
* `mode`  进程启动模式
* `status`  进程状态
* `restart`  进程重启次数
* `uptime`  进程上线时间
* `cpu`  cpu 占用率
* `mem`  内存消耗
* `watching`  是否监听文件变化来重启进程

在全局安装 pm2 后会在家目录生成 `.pm2` 的文件夹
当启动 pm2 后,会在文件夹下包含如下内容.

* `$HOME/.pm2` 包含所有 pm2 管理进程的信息
* `$HOME/.pm2/logs` 包含所有管理进程的日志
* `$HOME/.pm2/pids` 包含所有进程信息
* `$HOME/.pm2/pm2.log` pm2 运行 log
* `$HOME/.pm2/pm2.pid` pm2 进程信息
* `$HOME/.pm2/rpc.sock` 远程 socket 文件
* `$HOME/.pm2/pub.sock` socket 文件用来发布事件
* `$HOME/.pm2/conf.js` pm2 配置文件


pm2 启动应用时.会根据文件后缀选择解析器.
默认为 node.支持文件后缀如下

* `.sh` bash
* `.py` python
* `.rb` ruby
* `.pl` perl
* `.php` php
* `.coffee` coffee
* `.js` node

3. 控制进程

pm2 提供多种方式控制进程

```bash
# 应用名称控制进程
pm2 restart app # 重启 app
pm2 stop 0 # 停止 pm2 下 id = 0 的进程
pm2 stop all # 停止所有进程  
```

你也可以利用正则来过滤要启动的应用名

```bash
# 正则类似 js 模式 
pm2 restart /app[1-2]/  # 只重启 app1 和 app2
```

其他常见的控制命令为

```bash
pm2 stop app # 停止应用 app
pm2 reload app # 重载应用 app 环境变量
pm2 gracefulReload app #优雅重载,显示退出信息 
```

详细命令参看 [pm2 官方](http://pm2.keymetrics.io/docs/usage/quick-start/#options)

4. 监控进程

使用 `pm2 monit` 命令可以实时查看进程输出.
利用上下左右和回车选择和确认输出信息.

也可使用如下命令查看进程状态

```bash
pm2 list # 显示所有进程状态
pm2 list 0 # 按照表格形式显示某一进程状态
pm2 jlist # 以 JSON 格式显示进程状态,该输出一般用来进行分析
pm2 prettylist # 以可视化的方式显示 json 输出
pm2 show 0 # 显示 id 为 0 的进程状态,也可使用应用名
pm2 describe 0 # 一样的效果
```

5. 配置文件

除了使用命令也可以采用文件管理多个应用.
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

当然进程启动后,也可对单一进程进行控制

```bash
pm2 restart /app-.*/ # 重启所有 app- 为前缀的应用 
```

对于开启的进程可以采用如下方式从 pm2 中清除

```bash
# 删除应用名为 app 的进程
pm2 delete app

# 删除所有进程
pm2 delete all
```

## 环境变量
在进程管理中,可能创建多个相同进程.
例如搭建部署环境,测试环境等.此时可以利用 pm2 创建环境变量.
来区分不同进程,根据环境变量来执行对应的初始化操作.

可以直接在配置文件中定义环境变量.

```json
{
  "env": {
    "NODE_ENV":"test"
  }
}
```

在`node`中可以利用 `process.env.NODE_ENV` 获取此环境变量的值.

此外可以在一个进程中定义多个环境变量

```json
{
    "env": {
            "PORT": 3000,
            "NODE_ENV": "development"
        },
    "env_production": {
        "PORT": 80,
        "NODE_ENV": "production"
    }
}
```

pm2 默认加载 env 定义的环境变量.
此时采用如下方式选择某种环境变量进行启动.

`pm2 start pm2.json --env production`  
载入 `env_production` 进行启动.

**注意配置项 env_ 的后缀作为 --env 的传入参数**

**在 pm2 重启后,环境变量不会重载**

可在命令行后追加 `--upate-env` 来重载环境变量.

```bash
# 重载所有进程环境变量
pm2 reload pm2.json --update-env

# 重载特定进程环境变量
pm2 reload pm2.json --update-env --onle myapp
```

若不使用配置文件,可在 pm2 命令前追加多个环境变量.

```bash
# 可以利用 process.env.test 和 process.env.NODE_ENV 访问这两各变量
test="hello" NODE_ENV='deploy' pm2 start charger.js 
```

此外 pm2 在启动进程时额外加载了一些环境变量.
例如 `process.env.NODE_APP_INSTANCE` 包含了进程在 PM2 下的 id 号.

可以使用如下配置来改写此配置作为判断某些进程的条件.

```json
{
    "instance_var": "INSTANCE_ID",
    "env": {
     "PORT": 3000,
     "NODE_ENV": "development"
    }
}
```

此处将 `NODE_APP_INSTANCE` 替换为 `INSTANCE_ID` 利用
`process.env.INSTANCE_ID` 即可访问到相同的值.

**注意该 id 值不能自定义是根据应用的启动顺序由 pm2 分配的**

建议利用 `process.env.name` 来判断应用.
实际上你在 [pm2 配置文件](http://pm2.keymetrics.io/docs/usage/application-declaration/#general)
中定义的选项大部分在 `process.env` 中都可见.

## 环境部署








# 参考资料
[pm2 官方文档](http://pm2.keymetrics.io/docs/usage/cluster-mode/)
