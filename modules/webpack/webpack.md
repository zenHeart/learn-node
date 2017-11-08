webpack
===
**前言:讲解 webpack 的使用**

---

## 概述
webpack 是一个集成依赖打包工具.
不同于 browserify 只管理 js 的文件依赖.
webpack 可以管理所有的依赖关系.图片,css,js 等.
webpack 基于配置文件.读取源文件执行一系列打包和编译任务.
学习 webpack 的重点为:
* 理解 webapck 的工作模式及配置方法
* 学习各种基于 webpack 体系衍生的插件

配置 webpack 文件的核心概念如下

* `entry`  配置入口文件,webpack 基于入口文件解析整个文件的依赖关系并进行编译(可以想象成 c 语言中读取 main 文件进行编译的过程)
* `output` 控制文件的输出位置
* `loaders` 处理文件的编译任务例如 scss 编译为 css,typescript 转义等
* `plugins` 处理文件合并,压缩,混淆等


## 范例
整套流程完全参照[官方入门指南](https://webpack.js.org/guides/getting-started/)
实现如下:


参看 [demo](demo) 目录.

1. 参看 `package.json` 创建项目
2. 创建配置文件 `webpack.config.js`
3. `npm run build` 会在目录 `dist` 目录生成 `bundle.js` 文件
`index.html` 引入该文件即可.

配置文件为 [webpack.config.js](demo/webpack.config.js) 含义如下.

* `entry` 使用 `index.js` 文件作为入口 
* `output` 设定输出文件名及输出路径
 
目前 webpack 只能识别和打包 js 文件.
为了实现`css,img` 等不同资源的打包.
需要结合 `loader` 来实现此功能.

使用 `npm install --save css-loader style-loader` 下载 loader
在 entry 中加入引导文件.添加配置项.

* module 申明依赖
    * rules 解析文件后缀类型
    * use 使用的 loader 模块
    
载入图片安装 `file-loader`
```bash
npm i -D file-loader 
```

类似 css.添加查找规则及使用的 `loader` 重新编译即可.
还可利用其他类型的 `loader` 加载不同类型的文件.

加载 `xml` 和 `json` 文件为例
安装对应加载器.
```bash
npm i -D xml-loader json-loader 
```

配置 `webpack.config.js` 解析上述文件.
重新编译运行即可.

> 重点是理解 loader 决定了对引入文件的解析规则.
假设利用 file-loader 解析 test.json 则内容就会被解析为文件.

为了避免手动在 `index.html` 中引入依赖.
利用 [htmlwebpackplugin](https://webpack.js.org/plugins/html-webpack-plugin/) 解决此问题
该插件会自动生成 `index.html` 文件并引入依赖.
注意配置文件中 plugins 的变化

```js
module.exports = {
    entry: {
        app : './src/index.js',
        print : './src/print.js',
    },plugins:[
        new HtmlWebpackPlugin({
            title:'测试 plugins'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

为了清空 `dist` 多次编译后无用的旧文件.采用
[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
整理输出文件,在配置文件加入此插件.重新编译输出目录只会留下最新的编译结果.

> 重点是理解插件用来处理 webpack 的输出



## 坑
###  Cannot find module 'webpack/lib/node/NodeTemplatePlugin'
全局安装 `webpack` 时会出现此错误.利用 `npm i -D webpack` 本地安装解决此问题


* [代码分离](https://doc.webpack-china.org/guides/code-splitting)

# 参考资料
[webpack 使用经验](https://zhuanlan.zhihu.com/p/29161762?utm_source=wechat_session&amp;utm_medium=social)
[webpack 官方文档](https://webpack.js.org/guides/getting-started/)