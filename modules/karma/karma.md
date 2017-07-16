---
title:karma    
tag:karma      
birth:2017-01-16      
modified:2017-01-16      
---

karma
===
**前言:讲解 karma 的使用**

---
# 概述
## karma 是什么
karma 是一个测试运行器 (test runner).
它是属于测试体系的一部分。决定了整个测试工作流。
测试的整体知识参见 [测试基本概念章节](待完成)。
利用 karma 实现了基于测试的代码构建流程。它具有如下特性。
1. 基于真实的浏览器，当浏览器访问 karma 测试服务时，karma 会将测试文件传给浏览器执行并在服务器端记录执行结果
2. 自动测试，karma 会在文件修改后，重新在捕获的浏览器上执行结果
3. 基于插件的生态，可选的测试框架，利用各种插件实现代码覆盖率、生成测试报告等需求
4. 调试，可以在在浏览器中直接进行对测试代码的调试


## 为什么需要 karma
在刀耕火种的年代，前端测试，我们需要在编辑器和浏览器之间进行切换。
通过反复的刷新页面或者利用控制台来查看输出结果。然而随着 node、webapp 的兴起。
前端的运行从桌面端扩展到了移动端。如何保证在多种环境下，代码的运行保持一致。
如何在复杂的前端需求中保证质量。手动测试已经变得极其昂贵和低效。
基于此 karma 将整个测试流程简化为如下过程。
1. 编写测试代码
2. 启动 karma 测试服务
3. 修改完代码后，karma 会重新运行测试
4. 开发者根据测试结果进行代码迭代

这样的基于 TDD 的工作流，使我们从繁复的手动核对中解脱出来。
将更多精力放在测试的代码的构建上，既提高了工作效能，又增强了代码的稳定性。

## karma 的工作原理
在讲解 karma 运行器时，主流的测试有如下几种。

类型|原理|特点
:---|---|---|
Mocha|基于 node 运行环境的测试运行器|不具备和浏览器的交互能力，只能单纯的测试 js|
JsTestDriver|开启测试服务,浏览器访问测试服务器，JsTD server 将测试文件传递给浏览器,并接受返回的测试结果|较理想的测试运行器
HTML Runner|类似 jasmine 或 Qunit 的测试框架，将测试文件加载到 HTML 文件中进行执行，需要手动刷新界面进行测试更新|半自动化

详细的比较参见此图

![](../../../../../Documents/gitbook/self_web/img/test-frame-compare.jpg).

整个 karma 的架构如下图:

![](../../../../../Documents/gitbook/self_web/img/karma-architecture.jpg)

1. 服务器端
    * manager
        利用 socket.io 实现和客户端的长连接
        1. 实现对连接的管理
        2. 管理测试通讯，例如接收测试结果，发送文件变化后重载测试的命令等
    * webserver
        向客户端提供静态资源，例如测试文件，html 资源等
    * reporter
        向开发这提供测试信息，例如测试结果，客户端连接状态等
    * Fs watcher
        检测文件的变化

2. 客户端
   *  Manager
   处理底层的长连接通讯，例如向服务器告知测试结果
   * Testing Framework
   第三方测试框架，用来加载和运行测试
   * Test code
   开发这边写的测试代码，运行在测试框架中
   
根据该结构

### 运行原理
1. karma 开启了一个测试服务
2. 当浏览器访问 karma 对应的测试端口时，执行配置文件中
对应的单元测试文件。
3. 每一个浏览器将文件的执行结果返回给 karma
4. 服务器将所有文件的执行结果处理后再传递给服务器
5. karma 可根据执行结果在服务器端保存相关的日志信息

通讯模块利用 `socket.io`


## karma 快速入门
准备工作   

* 安装了 node 环境
* 安装了 git 或 github

1. 安装 karma 及相关组件

```npm
   # 安装 karma
   npm install karma --save-dev 
   
   # 安装 jasmine 测试框架
   # 安装 chrome-launcher 启动器
   npm install karma-jasmine karma-chrome-launcher --save-dev
   
   # 全局安装命令行工具
   npm install -g karma-cli
          
```

2. 配置 karma 文件   
在项目根目录下新建`karma.sysConst.js`.
文件内容如下
```js
    
```

3. 撰写测试文件
4. 运行karma


# 配置详解
详细的配置说明如下参见 [karma 配置详解](http://karma-runner.github.io/0.12/config/configuration-file.html)

配置选项|取值|作用
:---|---|---|
frameworks|array|选择执行测试的框架|
plugins|array|需要加载的模块|
browsers|array|支持启动捕获的浏览器类型|
files|array|执行测试的文件列表|
exclude|array|排除的加载文件列表|
client.args|array|自定义的此时参数，在测试框架运行时该参数包含在 `karma.config.args`|
autoWatch|bool|是否开启对文件变化后重新自行测试的检测|
autoWatchBatchDelay|int,单位毫秒|确定检测问价变化后，多久重启测试，当  `autoWatch` 为真是才有效|
basePath|string|相对 `__dirname`的路径，|
browserDisconnectTimeout|number，单位毫秒|浏览器重连时间|
browserDisconnectTolerance|number，单位毫秒|断开连接的容忍数量|
browserNoActivityTimeout|number，单位毫秒|设置浏览器超时断开连接|
captureTimeout|number，单位毫秒|捕获浏览器重启时长|
colors|bool|使能 log 模式的颜色显示|
hostname|string|捕获浏览器对应的主机名|
logLevel|Constant|日志的输出等级|
loggers|array|日志模式|
port|int|服务器的监听端口，默认为 9876|
preprocessors|object|预处理器|
proxies|object|代理服务|
proxyValidateSSL|bool|代理服务验证|
reportSlowerThan|int，单位毫秒|报告速度慢于此基准的测试|
reporters|array|报告测试的执行时间等消息|
singleRun|bool|报告所有测试总体结果|
transports|array|选择传输方式|
client.useIframe|bool|选择测试的运行方式是在新窗口还是内联标签|
urlRoot|string,`/`|描述测试执行的根路径

## 重点参数讲解

**files**

该属性决定了，karma 加载那些文件到服务器进行测试。
加载流程如下。
1. 所有相对文件路径根据 `basePath` 变为绝对路径
2. 若`basePath`为相对路径，则**相对配置文件**路径转换为绝对路径
3. 根据 `glob`或`minimatch` 的文件描述加载文件
4. 加载时按照 files 中文件的顺序进行,涉及 `glob` 等描述的，按照字典排序顺序加载。
5. 相同的文件会按照上述顺序只加载一次。
6. 若配置了 `preprocessors` 会对文件做相应处理。
    * **注意**
    由于预处理命令是在 files 配置解析完后进行，所以在书写
    预处理器的解析路径时是相对解析完后的路径而言的。

files 中支持对文件的对象描述，配置属性如下:

属性|作用|
:---|---|
pattern|必填项，描述文件的模式支持 `glob` 和 `minimatch` 对文件的描述语法|
watched|bool，是否监听该文件变化，默认为真|
included|bool，是否自定加载该文件到浏览器，默认为真,为假时可使用 require.js 进行加载|
served|bool，默认为真|

> **文件模式**

使用 [minimatch](https://github.com/isaacs/minimatch) 实现文件模式匹配。
常用的匹配参数。

参数|作用|
:---|---|
`*`|匹配任意多的字符|
`**`|表示任意层的子目录|
`[]`|匹配括号中的出现的任意字符|
`()`|匹配组|
`!`|取反|
`┃`|逻辑或|

**范例:**

* `**/*.js` 匹配子目录下所有以 js 为后缀的文件
* `**/!(jquery).js` 匹配子目录下所有非 jquery.js，后缀为 js 的文件
* `**/(.test | _test).js` 匹配子目录下所有以 `_test.js` 或 `.test.js` 结尾的文件

  
files 配置范例

```
   files: [
   
     // 默认可只填写 pattern 模式，其他会由 karma 设置为默认值
     //karma 实际配置结果 {pattern: 'test/unit/*.spec.js', watched: true, served: true, included: true}
     'test/unit/*.spec.js',
   
     //取消对文件的自动监听
     {pattern: 'compiled/index.html', watched: false},
   
     //karma 只会监听该文件变化
     {pattern: 'app/index.html', included: false, served: false}
   ], 
```


**browsers**

该属性决定了 karma 服务器捕获那些浏览器进行测试。
若需要在运行 karma 时自动加载浏览器需要安装相关插件。
浏览器和相关插件如下。

浏览器|插件|说明
:---|---|---|
chrome,Chrome Canary|karma-chrome-launcher|自动启动 chrome 浏览器|
firefox|karma-firefox-launcher|自动启动 firefox|
Safari |karma-safari-launcher|自动启动 Safari|
Opera |karma-opera-launcher|自动启动 Opera|
IE |karma-ie-launcher|自动启动 IE|
PhantomJS|karma-phantomjs-launcher|phantom 是一个不带界面的浏览器内核|

在安装自启动插件前注意，一定要有对应的浏览器。
比如 `PhantomJS` ，使用前要保证已安装对应版本。其他浏览器同理。
拥有对应测试环境后步骤如下。
1. 在 `package.json` 中包含对应的插件
```json
{
  "devDependencies": {
      "karma-chrome-launcher": "^1.0.1",
      "karma-firefox-launcher": "^1.0.1"
    }
}
```
2. 在 karma 的配置文件中包含对应浏览器。
```js
   module.exports = function(config) {
     config.set({
       browsers : ['Chrome', 'Firefox']
     });
   }; 
```

若不配置该选项，可以在浏览器中输入 `http://<hostname>:<port>/` 进行测试。
默认端口为 `9876`，本地可以使用 `http://localhost:9876/`

对于多人项目，可以在远程开启 karma 服务。
大家利用 http://<hostname>:<port>/ 进行访问。

启动器也可拥有配置，具体对应插件。
启动器在启动浏览器时会查找对应的路径。
若无法正常启动浏览器可使用如下方式进行重设。

* linux
    ```bash
    # 改变 chrome 二进制文件位置
    $ export CHROME_BIN=/usr/local/bin/my-chrome-build
    
    # 改变 Chrome Canary binary
    $ export CHROME_CANARY_BIN=/usr/local/bin/my-chrome-build
    
    # 改变PhantomJs binary
    $ export PHANTOMJS_BIN=$HOME/local/bin/phantomjs
        
    ```

* Windows
    ```bash
      #  cmd.exe
      C:> SET IE_BIN=C:\Program Files\Internet Explorer\iexplore.exe
      
      # powershell
      $Env:FIREFOX_BIN = 'c:\Program Files (x86)\Mozilla Firefox 4.0 Beta 6\firefox.exe'
    ```

自定义浏览启动如下
```
   # // 在 karma 配置文件中添加启动位置
   browsers: ['/usr/local/bin/custom-browser.sh'],
   
   // 执行 karma 命令
   karma start --browsers /usr/local/bin/custom-browser.sh
    
```

**preprocessors**

当测试文件运行前，可以添加预处理命令对文件进行处理。
通过对文件的预处理可以实现对文件代码覆盖率等测试需求。

代码覆盖率测试如下。
1. 安装需要的覆盖率测试测试插件
```npm
npm install karma-coverage --save-dev    
```
2. 配置 karma 中的预处理选项
```js
    module.exports = function(config) {
      config.set({
        preprocessors: {
          '**/*.js': ['coverage'] //对子目录下所有 js 文件进行覆盖测试
        }
      });
    };
```

**Plugins**

karma 启动时会加载的模块插件。

首先需要依赖插件利用 npm 进行安装。
可以在 package.json 进行描述。
```json
   {
     "devDependencies": {
       "karma": "~0.10",
       "karma-mocha": "~0.0.1",
       "karma-growl-reporter": "~0.0.1",
       "karma-firefox-launcher": "~0.0.1"
     }
   } 
```
karma 会自动加载 `karma-*` 所对应的模块。
当然也可以配置该选项加载其他插件。

```json
   plugins: [
     // these plugins will be require() by Karma
     'karma-jasmine',
     'karma-chrome-launcher'
   
     // inelined plugins
     {'framework:xyz', ['factory', factoryFn]},
     require('./plugin-required-from-config')
   ] 
```


## 参考资料

[karma 官网 ](http://karma-runner.github.io/0.10/config/configuration-file.html)

[javascript test runner](https://dip.felk.cvut.cz/browse/pdfcache/jinavojt_2013dipl.pdf)