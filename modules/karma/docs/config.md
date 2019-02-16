# 配置详解

**前言: 详细说明 karma 配置**

---

## 概述

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
