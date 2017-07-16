---   
title:log   
tag:log   
birth:2016-9-6 20:58:37   
modified:2017-2-23 16:29:32   
---

log
===
**前言：讲解在生产环境如何进行调试及日志输出**  

----

# log 概述

log 可以理解为程序运行过程中的输出信息。
它可以帮助开发者进行程序调试，也可以记录系统运行状态。
log 本身包含如下概念。

**log level(日志级别)**

![](../../../../Documents/gitbook/self_web/img/log_levels.png)

根据上图，日志级别越高，则对应的输出信息越少。

常用的级别可以概括如下。

* **all** 输出所有日志信息
* **debug** 输出有助于开发者调试的信息
* **info** 显示系统运行的状态，事件等信息
* **warn** 有威胁的系统状态
* **error** 系统的错误信息

更具体的讨论可以参见 [如何使用不同级别 log](http://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels).
在开发过程中对于日志我们主要关注如下问题。

1. 是否可以定义日志输出级别
2. 是否支持文件保存

详细信息参见  [log4](https://logging.apache.org/log4j/2.x/manual/architecture.html)


## log 记录
### 原则
1. 方便调试，快速定位问题
2. 方便查看记录运行状态
3. 便于解析和再加工，尽量存原始值
### 记录内容

1. 访问信息

timestamp:deviceId:clientInfo:Operation:result:supplement

和服务器有通讯交互的信息包括
    * 时间戳
    * 客户 id (ip 等)
    * 客户信息 （额外补充描述）
    * 客户操作 （传送数据等）
    * 执行结果 （结果）
    * 补充描述  （性能状态等）
    
在 node 下如下日志输出框架

2. 服务器信息

timestamp:event:Operation:result:supplement
    * 时间戳
    * 服务端事件
    * 服务端操作
    * 服务端结果
    * 补充说明
    
报错的格式也是如此，只是会在补充说明中添加错误栈的结果。


[log format](http://help.globalscape.com/help/eft7-2/mergedprojects/eft/SpecifyingLogFormatTypeandLocation.htm)

[apache log format](https://httpd.apache.org/docs/1.3/logs.html)

按照关系型数据库的原则.可以抽象出数据库的核心字段如下.

核心字段|作用|
:---|---|
`log_id`|日志 id,唯一标识日志的记录|
`log_timestamp`|日志时间戳,记录日志发生时间|
`log_desc`|日志描述简要描述该条日志记录|
`log_type`|体制类型按照日志界别进行划分|
`log_event`|日志事件,按照应用逻辑进行划分|
`log_operation`|日志操作,记录对改事件的反应|
`log_result`|记录日志对于该事件的相应结果|
`log_info`|记录额外的日志信息,是 json 格式的对象,例如客户端信息等|

# node log

* debug
* winston
* bun-yun
* tarce
 
# debug 快速入门
1. 下载 debug
```shell
   npm install --save-dev debug // 将安装包放在 package.jonn 中的开发组件中
```
2. 设置命名空间
```js
   debug = debug('debug')('zenHeart'); 
   debug('hello world');
   
```
3. 定义环境变量
```shell
   set DEBUG=zenHeart // 不要加引号 
```
4. 执行文件

```bash
   node server.js 
```
5. 多个文件调试方法

```js
   //文件 demo1.js 添加如下代码
   debug = require('debug')('demo:1');
   debug('hello');
   //文件 demo2.js 
   debug= require('debug')('demo:2');
   //设置环境变量
   set DEBUG = demo:*; //注意可以利用简单正则来匹配 debug 命名空间
```

6. 可能遇到的问题
在 windows 环境下需要在引用文件下添加如下代码
```js
   process.env.DEBUG = "your_debug_name*"; // <--add this line 
```

## apache log 研究
apache log 包含两类
* 访问记录
    * 请求信息
    * 相应结果

* 错误记录
    * 请求信息
    * 错误原因
    
重点在于对 log 的格式化
简答描述:
* ip 服务端请求
* ip + port 设备端请求
* mac || deviceId 合法设备
* 没有则为服务端调试信息



# winston

winston 将输出日志的方式定义为 **transport**
通过不同的 transport 实现多样的输出模式。
winston 核心支持如下 transports.

* Console 输出到控制台
* File 输出到文件
* Http 输出为 http 请求

此外它还支持其他的日志处理方式

* Redis 输出到 redis 数据库
* Mail 输出到邮件地址
...


每一种输出都有相关的配置属性。例如定义日志的输出级别，显示格式等等。
详见 [transports](https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport)

这些 `transport` 都挂载在 `winston` 的 Logger(内部使用的是 Container 进行实例化,Logger 只是一个包装) 实例上。 
当调用 Logger 实例暴露的方法打印信息时，winston 会根据实例
所挂载的 `transport` 模式进行输出。  

winston 默认只启用了 `Console` 输出。
使用方法如下

```js
// 包含 winston 模块

var winston = require('winston');

winston.log('info', 'Hello distributed log files!');
winston.info('Hello again distributed logs');

```

打印 `winston` 对象的部分信息可以看出，Logger 实例上 
提供了丰富的输出方法。

```
{ 
  error: [Function],
  warn: [Function],
  info: [Function],
  verbose: [Function],
  debug: [Function],
  silly: [Function],
  log: [Function],
  query: [Function],
  stream: [Function],
  add: [Function],
  remove: [Function],
  clear: [Function],
  profile: [Function],
  startTimer: [Function],
  extend: [Function],
  cli: [Function],
  handleExceptions: [Function],
  unhandleExceptions: [Function],
  configure: [Function],
  setLevels: [Function] 
}
```

函数功能可分为如下几类


* 输出类
`error,warn,info,verbose,debug,silly` 用来输出各级别日志信息，
`log` 传入的第一个参数确定输出级别。

* 工具类
    * query 查询日志
    * stream 将 `transport` 内容导出到控制台
    * add 在日志实例上添加新的 `transport` 支持链式调用
    * remove 在日志实例上删除 `transport` 支持链式调用
    * clear 清空某个 `transport` 
    * profile 测试函数的执行时间
    * rewriters 修改日志输出的元数据内容
    * filters  修改日志的输出消息
    * cli 美化控制输出
    * handleExceptions 设定处理输异常的 transport
    * configure 重新配置日志对象的 transport
    * setLevels 设置日志级别

log 函数的语法如下 `function log (level, msg, [meta], callback)`

* level 日志输出级别
* message 支持 [util.format](https://nodejs.org/api/util.html#util_util_format_format_args) 语法
* meta 元数据，可以利用 [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options) 输出
* function log 函数的回调函数

其余的输出函数类似 log.只是省略了 `level` 参数。

```js
var winston = require('winston'); 
var util = require('util');


winston.log('info', 'test message %s', 'my string');
// info: test message my string 
 
winston.log('info', 'test message %d', 123);
// info: test message 123 
 
winston.log('info', 'test message %j', {number: 123}, {});
// info: test message {"number":123} 
// meta = {} 
 
winston.log('info', 'test message %s, %s', 'first', 'second', {number: 123});
// info: test message first, second 
// meta = {number: 123} 
 
winston.log('info', 'test message', 'first', 'second', {number: 123});
// info: test message first second 
// meta = {number: 123} 
 
winston.log('info', 'test message %s, %s', 'first', 'second', {number: 123}, function(){});
// info: test message first, second 
// meta = {number: 123} 
// callback = function(){} 
 
winston.log('info', 'test message', 'first', 'second', {number: 123}, function(){});
// info: test message first second 
// meta = {number: 123} 
// callback = function(){} 

winston.log('info','test',util.inspect(winston,{colors:true,depth:1}));
//利用 util.inspect 输出元数据
```

默认的控制台 `transport` 具有如下配置属性

例如控制台输出具有以下配置属性。

属性|作用|默认值|
:---|---|---|
level|字符串，规定`transport` 记录的输出级别|info
label|字符串，输出日志的标签|null
silent|布尔值，是否压缩输出|false
colorize|布尔值，是否输出颜色|false
timestamp|布尔值，是否输出时间戳,若为函数可以重新定义输出|false
json|布尔值，输出是否为 json 格式|false
stringify|布尔值，输出 json 是否需要字符串话，结合 json 配置使用|false
prettyPrint|打印元数据的时候是否使用 util.inspect 函数|false
depth |当 prettyPrint 开启后,该属性控制显示深度|false
handleExceptions |是否显示异常|false
humanReadableUnhandledException |布尔值，出现异常时输出为单行可读|false
showLevel |布尔值，输出信息是否显示日志级别|true
formatter |function,按照定义的函数输出结果|undefined
stderrLevels |数组，用来确定标注错误流包含哪些等级的日志|`['error', 'debug']`

常用的属性如下。
* level 用来屏蔽控制台输出的级别
* colorize 将输出颜色话
* timestamp 显示输出的时间戳

利用 config 语句配置 transports

```js
var winston = require('winston');

//使用 add 和 remove 方法重新配置的控制台。
//也可使用 config 重新配置或添加 transport
/*
winston.configure({
    transports: [
        new (winston.transports.Console)({
            level:'error',
            colorize:true,
            timestamp:true
        })
    ]
});
*/

winston
    .remove(winston.transports.Console)
    .add(winston.transports.Console,{
        level:'error', //只输出 error 级别的信息
        colorize:true,
        timestamp:true
    });


//该信息不会打印在控制台
winston.log('info','this log can\'t show in console');

//会输出
winston.log('error','show in console');

```

注意日志的默认输出为 UTC 格式通过将 `timestamp` 
设置为函数来设定时间输出格式。可以利用 [moment](http://momentjs.com/) 模块。 

```js
var winston = require('winston'); 
var moment = require('moment'); 


winston.configure({
    transports: [
        new (winston.transports.Console)({
             timestamp: function() {
                        return moment().format();
                    },
            colorize:true
        })
    ]
});

winston.log('info','local');
```

除了控制台输出模式，file 模式于此类似。
详细的属性参见  [file transport](https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport)
利用 add 在 Logger 实例上添加 `file` 模式的 `transport`.

```js
var winston = require('winston');
var moment = require('moment');


winston.add(
    winston.transports.File, {
        timestamp: function () {
            return moment().format();
        },
        filename:__dirname+'/test.log',
        colorize: true
    }
);

winston.log('info','output in console and test.log');
```

**注意`filename`字段若不加路径则保存在 node 的运行路径。**


除了使用 winston 默认创建的 Logger 实例，也可以自定以 Logger 对象。
方法如下

```js
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()]
});

// 使用自定义对象
logger.log('info', 'Hello distributed log files!');
logger.info('Hello again distributed logs');

logger
    .add(winston.transports.File,{filename:'test.log'})
    .remove(winston.transports.Console);

logger.log('info', 'Hello distributed log files!');
logger.info('Hello again distributed logs');

```


Logger 实例上暴露了 profile 用于性能测试可以输出代码执行时间。

```js
//
  // Start profile of 'test'
  // Remark: Consider using Date.now() with async operations
  //
  winston.profile('test');

  setTimeout(function () {
    //
    // Stop profile of 'test'. Logging will now take place:
    //   "17 Jan 21:00:00 - info: test duration=1000ms"
    //
    winston.profile('test');
  }, 1000); 
```



Logger 实例支持历史日志查找。规则参见 [loggly api](https://www.loggly.com/docs/api-retrieving-data/)

```js
var winston = require('winston');

winston.add(
    winston.transports.File, {
        timestamp: function () {
            return moment().format();
        },
        filename: __dirname+'/test.log',
        colorize: true
    }
);

winston.log('info','output in console and test.log');
winston.log('error','output in console and test.log');
winston.log('error','output in console and test.log');

var options = {
    from: new Date - 24 * 60 * 60 * 1000,
    until: new Date,
    limit: 10,
    start: 0,
    order: 'desc',
    fields: ['message']
};

//
// Find items logged between today and yesterday.
//
winston.query(options, function (err, results) {
    if (err) {
        throw err;
    }

    console.log(results);
});
```

Logger 实例支持对异常的捕获可以自定以输出位置，方法如下。

```js
var winston = require('winston');
//添加异常文件
//也可利用 add 添加
/*winston.add(winston.transports.File, {
    filename: __dirname + '/excep-logs.log',
    handleExceptions: true,
    humanReadableUnhandledException: true
});*/

// 支持数组形式，输出到多个 transport 
// winston.handleExceptions([transport1, transport2]);
winston.handleExceptions(new winston.transports.File({filename: __dirname + '/exceptions.log'}));

// 模拟一个引用异常
expect;
```
 
默认情况 winston 会在发生异常时退出。
可以将`exitOnError ` 设为 false.
  
在自定义的日志实例中，可以利用 `exceptionHandlers` 定义异常的 `transport`。

```js
  var logger = new (winston.Logger)({
    transports: [
      new winston.transports.File({ filename: 'path/to/all-logs.log' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'path/to/exceptions.log' })
    ],
    exitOnError: false //设置自定义 logger 在抛出异常时不退出进程
  }); 
```

**日志级别**

winston 默认为 npm 的 5 层级别设定。
数字越靠前级别越高。

```json
{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 } 
```

同时支持 [rfc5424](https://tools.ietf.org/html/rfc5424) 的7 级设定。

```json
{ emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
```

在讲解输出时已经说明，log 函数的第一个字段就为输出级别。
你也可以使用 `error,info` 等函数来输出各级别信息。

winston 支持对输出级别的动态修改。

```js
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'warn' }),
      new (winston.transports.File)({ filename: 'somefile.log', level: 'error' })
    ]
  });
  logger.debug("Will not be logged in either transport!");
  logger.transports.console.level = 'debug';
  logger.transports.file.level = 'verbose';
  logger.verbose("Will be logged in both transports!"); 
```

可以采用 Logger 实例暴露的 setLevels 方法将日志级别视为 7 层。
```js
winston.setLevels(winston.config.syslog.levels);
```

利用 Logger 实例上暴露的 `levels` 属性自定义日志级别。

```js
  var myCustomLevels = {
    levels: {
      foo: 0,
      bar: 1,
      baz: 2,
      foobar: 3
    },
    colors: {
      foo: 'blue',
      bar: 'green',
      baz: 'yellow',
      foobar: 'red'
    }
  };
 
  var customLevelLogger = new (winston.Logger)({ levels: myCustomLevels.levels });
  //添加该句让 winston 识别对应的颜色模式
  winston.addColors(myCustomLevels.colors);
  customLevelLogger.foobar('some foobar level-ed message'); 
  
```

在 Logger 实例上，暴露了日志事件。

```js
var winston = require('winston');

var logger = new (winston.Logger)({
    transports:[
        new winston.transports.Console({

        })
    ]
});


logger.on('logging', function (transport, level, msg, meta) {
   //注意这里没有使用 log 输出,避免回调形成闭环
   console.log('info','receive transport:%j level:%d,msg:%s,meta:%j',transport, level, msg, meta);
});


//可以使用  logger.emitErrs = false; 关闭 error 事件的触发
logger.on('error', function (err) { 
    winston.log('info','receive error! %j ',err);
});


logger.info('CHILL WINSTON!', { seriously: true }); 
```

对于简单的应用使用一个 logger 实例，利用 log 方法输出自定义信息即可。
但是在大规模的集成应用中，会定义多个 logger 对象实现不同级别的信息输出。
例如按照模块汇报日志，按照应用层级汇报日志等。

按照模块设定日志。

```js
var winston = require('winston');

//
// Configure the logger for `category1`
//
winston.loggers.add('category1', {
    console: {
        level: 'silly',
        colorize: true,
        label: 'module 1'
    }

});

//
// Configure the logger for `category2`
//
winston.loggers.add('category2', {
    console: {
        level: 'info',
        colorize: true,
        label: 'module 2'
    }
});

//通用模块
 winston.loggers.options.transports = [
    new winston.transports.Console({
        level: 'info',
        colorize: true,
        label: 'module 2'
    })
  ];

var category1 = winston.loggers.get('category1');
var category2 = winston.loggers.get('category2');

category1.info('logging from module 1');
category2.info('logging from module 2'); 
winston.log('info','df');
```

可以利用 logger 提供的 cli 方法实现对输出的美化。
利用 filters 和 writers 实现对日志输出的消息和元数据的改写。

```js
var winston = require('winston');
var util = require('util');
var logger = new winston.Logger({
    //重新定义 meta 的输出格式
    rewriters: [function (level, msg, meta) {
        return util.inspect(meta,{
            depth:1,
            colors:true

        });
    }],
    
    //重新定义 filters 的输出格式
    filters:   [function (level, msg, meta) {
        return 'new' + msg;
    }],
    transports:[
        new winston.transports.Console({
            colorize:true
        })
    ]
});

//美化输出
logger.cli();

logger.log('info','message',{test:{data:[1,2,3]}});
 
```

除了对 message 和 meta 的输出修改，
在 logger 实例的 console 中可以利用 `formatter` 属性格式化输出。

```js
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: function() {
                return Date.now();
            },
            formatter: function(options) {
                // Return string will be passed to logger.
                return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            }
        })
    ]
});
logger.info('Data to log.');
```

winston 还提供自定义 transport 的方法。

```js
var util = require('util'),
    winston = require('winston');

var CustomLogger = winston.transports.CustomLogger = function (options) {
    //
    // Name this logger
    //
    this.name = 'customLogger';

    //
    // Set the level from your options
    //
    this.level = options.level || 'info';

    //
    // Configure your storage backing as you see fit
    //
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(CustomLogger, winston.Transport);

CustomLogger.prototype.log = function (level, msg, meta, callback) {
    //
    // Store this message and metadata, maybe use some custom logic
    // then callback indicating success.
    //

    console.log('hello world');
    callback(null, true);
};

winston.add(
    winston.transports.CustomLogger,{
        label:'hello'
    });

winston.log('info','test customer transport');
```

总结一下。

winston 利用 logger 实例管控日志，logger 实例上可挂载多个 transport 对象实现不同模式输出
支持多个实例多个输出模式同时运行。

**winston** 提供的方法
'Loggers' 创建新的 logger 对象,默认按照数组索引
`loggers.add(id, options)` 创建新的 logger 实例按照 id 索引的实例
`loggers.get(id)` 获取按照 id 创建的实例

**logger** 实例提供的重要方法和属性有

`log (level, msg, [meta], callback)` 根据实例上挂载的不同 transport 分别打印输出
`profile(id, [msg, meta, callback])` 测试函数性能
` query (options, callback)` 根据实例上挂载的不同 transport 分别打印输出
`add (transport, [options])` 在 logger 上挂载 tranports 实例，一般一个 logger 实例只支持不同的 transports 文件除外
`filters` 格式化消息
`rewriters` 格式化 meta 数据

**tranports** 主要查看各 [transports 配置选项](https://github.com/winstonjs/winston/blob/master/docs/transports.md) 确认差异
    
* console 重要属性
    * level 确认日志级别
    * label 确认输出标签
* file 重要属性
    * filename 确定文件位置

# 状态码
结合使用 http 状态态码和 业务逻辑状态吗.

意义在于.单纯的利用 http 状态码无法清楚的获知业务逻辑失败的原因.
单纯的使用业务逻辑状态码对于标准的日志系统无法提供更多的分析信息.

总结 http 状态吗可以将请求进行粗略的分类,方便后续对日志做进一步处理.
分析常见的请求失败原因等.

 
## 参考资料
[打印 log 的技巧](http://tostring.it/2014/06/23/advanced-logging-with-nodejs/)

[如何打印 log](https://blog.risingstack.com/node-js-logging-tutorial/)

[loggly](https://www.loggly.com/blog/three-node-js-libraries-which-make-sophisticated-logging-simplers/)

[log 指引](https://www.loggly.com/ultimate-guide/node-logging-basics/)

[理解 log](https://garygregory.wordpress.com/2015/09/10/the-art-of-test-driven-development-understanding-logging/)

[通用 log 标准](https://www.wikiwand.com/en/Common_Log_Format#)