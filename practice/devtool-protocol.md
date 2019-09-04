# chrome
chrome 提供了一套 dev-protocol 方便 js 脚本的断点调试。
详细的协议规范参见 [chrome devtools protocol](https://chromedevtools.github.io/devtools-protocol/)
基于此协议实现了 chrome 强大的调试功能!

## 理解运行原理
1. 运行一个 nodejs 调试文件采用 `node inspect index.js`
2. `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
 --remote-debugging-port=9229` 监听此端口数据
3. 采用 [simple websocket](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?utm_source=chrome-ntp-icon) 插件连接 `nodejs` 启动的 websocket server
4. 此时访问调试界面,可以在 `network` 中看到 ws 的传输内容。
5. 采用 `simple websocket` 连接 node 启动的 `ws://...` 服务端通道
6. 在 `simple websocket` 传入如下命令,会触发所有

	```json
	{"id":30,"method":"Debugger.stepInto","params":{"breakOnAsyncCall":true}}
	```

通过上述示例可以理解
1. ws 控制 dev-protocol 原理

> 验证发现 dev protocol ws 会广播结果,所有 client 会同步所有消息