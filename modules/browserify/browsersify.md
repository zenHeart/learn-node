---
title: browsersify    
tags: js tool browserify      
birth: 2017-08-30      
modified: 2017-08-30      
---

browsersify
===
**前言:讲解包管理工具 browserify 的使用**

---

## 范例
学习 browerify 的范例

### hello_world
1. 类似 node 编写代码.
2. 编译生成导入文件
```bash
browserify main.js > bundule.js
``` 
3.  html 中引入该文件即可.

> browserify 会根据 require 搜索所有的引用文件,生成一个单一文件
原理详见 [how browserify work](https://github.com/browserify/browserify-handbook#how-browserify-works)

若要引入框架,首先利用 npm 安装对应框架 

```bash
npm install jquery
```
安装后利用 `require` 语法引入进行使用.
```js
const $ = require('jqurey'); 

$('h1').text('hello world!');
```

重新编译即可.

在调试时,上述代码无法定向到源文件,利用 `source map` 进行映射调试

```bash
# 安装 exorcist 
npm install -g exorcist

# 重新编译源文件
browserify main.js --debug | exorcist bundle.js.map > bundle.js
```

采用此方法编译后.浏览器会根据映射加载源文件.
方便代码的调试.具体使用参见 [exorcist](https://github.com/thlorenz/exorcist)

为了避免反复的编译文件使用 [watchify](https://github.com/browserify/watchify)
对文件夹进行观察.首先安装 `watchify`

```bash
npm install -g watchify
```

然后结合 npm 的 package.json 实现运行脚本

```json 
{
  "build": "browserify js/main.js -o bundle.js",
  "watch": "watchify js/main.js -o bundle.js --debug --verbose",  
}
```

结合该工具即可实现对文件的自动编译.

此外为了实现本地的服务.可以利用
[beefy](http://didact.us/beefy/) 模拟服务
直接使用 `beefy main.js` 即可运行文件

> beefy 只能用来测试 js 脚本,可以利用它实现自动编译
感觉很鸡肋!

总体来说 `browserify` 功能如下
* 前端 js 打包工具
* 实现了 node 端 api 给前端调用
* 简化了前端 js 框架的引用

## browserify-shim
browserify 必须的引用必须符合 `commonjs` 风格.
导致,需要在前端模块中加载非 commonjs 风格模块时出现困难.
此外 browserify 编译后的模块,在前端被限制在模块作用域.无法全局使用.
利用 [browserify-shim](https://github.com/thlorenz/browserify-shim)
克服了上述问题.该扩展模块支持对非 commonjs 风格的模块引用.同时可以利用配置实现模块的全局暴露.




## 参考资料
[browserify doc](https://github.com/browserify/browserify-handbook#how-browserify-works)