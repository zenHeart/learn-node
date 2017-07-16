---
title:mosca_mqtt    
tag:mosca_mqtt      
birth:2016-12-19      
modified:2016-12-19      
---

mosca_mqtt
===
**前言:讲解如何使用 mosca 搭建 mqtt 服务器**

---

# mosca 概述
## 功能
mosca 用来搭建 mqtt brocker。
运行环境是 node,支持结合数据库进行消息的持久保存。

## 环境配置
在安装好 NODE 的情况下，直接使用 npm 进行安装管理

```shell
    # 本地安装内嵌工具，需要自己编写 borcker 相关功能
    npm install --save mosca
    
    # 全局安装 mosca 命令行工具，直接使用命令开启服务
    npm install mosca pino -g
```

## 基本使用
1. 创建 mqtt borcker

```js

    /*该配置未采用数据库进行消息保存，所以通讯品质为 0*/
    const SERVER_CONFIG = {
        PORT:1883 // 配置 mqtt 服务器的监听端口
    };
    var mosca = require('mosca');
    var mqttServer = new mosca.Server(SERVER_CONFIG);
    mqttServer.on('ready',function() {
        console.log('start mqtt brocker,listen on port %d',SERVER_CONFIG.PORT);
    });
    
    //监听客户端的连接
    mqttServer.on('clientConnected', function(client) {
        console.log('client connected', client.id);
    });
    
    //监听客户端发布消息
    mqttServer.on('published', function(packet) {
        console.log('Published', packet.payload.toString());
    
    });
```
2. 创建 mqtt 客户端
为了直观，采用 node-red，先安装 node-red.
```npm
    npm install -g node-red
```

启动 node-red
```npm
    node-red
```

在 input 中选择 `inject、mqtt` ,在 output 中选择 `debug、mqtt`.

    ![](../img/node-red-mqtt.gif)

连接图形，并配置节点名称及 mqtt 的连接参数。

    ![](../img/node-red-mqtt1.gif)

3. 启动调试

在 node 下运行 mqtt 服务器脚本。
在 node-red 中点击，Deploy 的按钮。
点击 hello 右边的按钮会在 debug 中显示发布的信息。

        ![](../img/node-red-mqtt2.gif)


