# babel


## 概述

对于不支持 es6 特性的浏览器.
采用 es6 编写后,利用 babel 转译成兼容版本.
详见 [babel](https://babeljs.io/)

## 快速入门

1. 全局安装 babel 命令行工具
```bash
npm install --global babel-cli
```

2. 项目根目录添加,`.babelrc` 配置文件
参考 [demo 配置](demo/.babelrc)

在项目根目录安装对应插件.

```bash
npm install --save-dev babel-preset-latest

# react 转码规则
npm install --save-dev babel-preset-react

# 不同阶段语法提案的转码规则（共有4个阶段），选装一个
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-preset-stage-1
npm install --save-dev babel-preset-stage-2
npm install --save-dev babel-preset-stage-3 
```
3. 在 demo 项目根目录,编译文件
```bash
# 编译结果输出到终端
babel babel_test.js 

# 编译结果转存为 compile.js 文件
babel babel_test.js -o compile.js
```

> 利用 `babel-node` 可以模拟支持 es6 的 repl 模式 node 终端.


## 参考资料
* [estree](https://github.com/estree/estree)
* [babel](https://www.jianshu.com/p/e9b94b2d52e2)
* [tiny compiler](https://github.com/zenHeart/the-super-tiny-compiler)