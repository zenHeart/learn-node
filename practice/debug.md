node 调试
===

**前言：讲解 node 的调试技巧**

---

# 调试概述
调试常见场景如下
* 验证代码细节
* 解决 bug
* 分析源码

相比测试,调试可以剖析代码内部执行逻辑.
对程序运行有更加深刻的认识.

在 node 中笔者常用的调试手段如下.

* 使用 IDE(例如 phpstorm) 内置调试器
* 使用 node 内建 debugger 进行调试
* 使用 inspect 进行调试

# node inspect
1. 安装 chrome `NIM` 插件,当调试 node 时会自动打开调试界面.
2. 利用 `node --inspect-brk <script_name>` 启动脚本
3. 此时可以直接在 chrome 中调试代码.

若无法自动启动,在启动调试后,把控制台输出的 url 粘贴到 chrome 浏览器即可开启调试.

**使用 phpstorm 调试**

在需要调试的界面,点击 `run->debug` 即可.
 

## 远程调试
1. 远程服务器开启调试
```bash
node --inspcet=0.0.0.0:9229 index.js 
```

2. 本地打开 [chrome-inpect](chrome://inspect)
点击 `config` 输入远程调试地址 `ip:9229`

3. 点击 `Open dedicated DevTools for Node` 打开调试界面即可远程调试

* [远程调试资料](https://stackoverflow.com/questions/12440169/how-do-you-debug-a-node-js-server-running-with-chrome-webkit-as-the-remote-debug)


## 使用内置调试器

node 内部自带一个 Debugger 的调试器。
假设有如下的测试文件 `add.test.js`.

```js
function testAdd(a,b) {
    return a + b;

}

var b = testAdd(2,4);
console.log(b);
```

1. 使用 `node inspect add.test.js` 启动文件 (注意 node 7.7.0 以前版本为 `node debug add.test.js` 启动调试)

此时在终端下会显示如下内容.

```
⇒  node inspect test.js
< Debugger listening on port 9229.
< Warning: This is an experimental feature and could change at any time.
< To start debugging, open the following URL in Chrome:
<     chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/ac57ca9f-0c59-47e1-833e-25bfc42a5421
< Debugger attached.
break in test.js:11
  9 }
 10 
>11 var b = testAdd(2,4);
 12 console.log(b);
 13 
debug> 
 
```

**控制代码执行**

此时代码会停留在脚本首行.
在 debug 模式下输入 `help` 可以查看
所有支持的命令.常用的命令如下.

命令|作用|
:---|---|
r(run,restart)|运行或重启命令|
c(continue)|继续运行|
n(next)|单步运行|
s(step in)|进入函数内部|
o(step out)|跳出函数内部|


**设置断点**

如果需要在代码中设置断点直接使用 `debugger` .

```js
function testAdd(a,b) {
    debugger;
    return a + b;

}

var b = testAdd(2,4);
console.log(b); 
```

此外可以利用如下命令控制断点

命令|作用|
:---|---|
sb(setBreakpoint)|sb(9) 在当前脚本第 9 行设置断点|
cb(clearBreakpoint)|cb(9) 清除当前脚本第 9 行断点|
breakpoints|显示所有断点位置|



**查看调试信息**

重新启动脚本,使用 **c** 直接运行到断点位置.
若想在调试中观察变量有两种方法.

1. 在 debug 命令下进入 repl 直接输入变量名进行查看
2. 使用 `watch` 函数添加变量名称

例如 `watche('b')` **注意填入的是变量名字符串**.
使用 `watchers` 即可查看变量.代码执行时也会打印出观察的变量信息.
命令使用如下.

命令名|作用|
:---|---|
watch()|添加待观察的变量 watch('b') 添加变量 b|
unwatch|删除观察的变量 unwatch('b') 删除变量 b|
watchers|查看所有添加变量|
bt|查看函数的调用栈|
list|list(1) 显示当前断点位置前后 1 行代码|
scripts|显示当前脚本及跳转脚本|

其他命令参见 `help`.
有价值的资料包括.

* [node dubugger 官方文档](https://nodejs.org/api/debugger.html)
* [v8-inspector Debugger 对象说明](https://chromedevtools.github.io/debugger-protocol-viewer/v8/Debugger/)







## 使用 node-inspector
1. 全局安装 node-inspector
```node
npm install -g node-inspector
node-inspector -v //查看版本，证明安装成功
```
2. 连接 node 和内置的默认浏览器
```node
   node-inspector & 
```
3. 以 debug 模式运行代码
```node
   node --debug yourjsfile 
```
4. 打开`http://127.0.0.1:8080/debug?port=5858`进行调试
除了上述方法安装完成后直接使用 node-debug filename 也可以调试该文件

5. 可能出现的问题
    1. 使用的是 node 最新版 V6.4
    [NM[0] 的解决办法](https://github.com/node-inspector/node-inspector/issues/905)
    
    使用 `node --inspect --debug <your file>` 的方式启动调试。
    
    2. 不要出现中文路径

## inspect

使用 `node inscpect <script_name>` 会启动对应用的 websocket 监听.
协议基于 [inspector protocol](https://chromedevtools.github.io/debugger-protocol-viewer/v8/).
v8 会生成唯一的 [uuid](https://tools.ietf.org/html/rfc4122).
在chrome中输入 `ws://127.0.0.1:9229/<uuid>`' 即可调试界面.





## 参考资料
[node 官方调试说明](https://nodejs.org/api/debugger.html)

[node inspect](https://nodejs.org/en/docs/guides/debugging_getting_started/ ) 

[远程调试 node](http://www.cnblogs.com/chyingp/p/node-debug.html)

[node 远程端口限制](https://github.com/nodejs/node-v0.x-archive/issues/9012)

[调试 node app](https://rollbar.com/blog/Debugging-Node.js-Apps-in-Production-with-PyCharm/)