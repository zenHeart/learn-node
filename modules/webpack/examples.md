---
title: examples    
tags: webpack node      
birth: 2017-11-16      
modified: 2017-11-16      
---

examples
===
**前言:webpack 测试案例**

---





## 范例
整套流程完全参照[官方入门指南](https://webpack.js.org/guides/getting-started/)
实现如下:
参看 [demo](demo) 目录.

1. 参看 `package.json` 创建项目
2. 创建配置文件 `webpack.config.js`
3. `npm run build` 会在目录 `dist` 目录生成 `bundle.js` 文件
`index.html` 引入该文件即可.

配置文件为 [webpack.config.js](demo/webpack.config.js) 含义如下.

* `entry` 使用 `restify.js` 文件作为入口 
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
        app : './src/restify.js',
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

编译会导致无法定位错误,利用 `source map` 可以解决此问题.
只需在配置中加入 `devtool: 'inline-source-map'` 即可
此时执行的错误会定向到源文件.

为了避免文件修改后手动编译.使用 `watch` 模式实现自动编译.
在 `package.json` scripts 添加开发检测模式.
```json
{
"scripts": {
  "dev":"webpack --watch"
  }
}
``` 

运行 `npm run dev` 此时会自动检查文件变化重新编译文件.

为了避免手动打开浏览器观察文件变化.使用 `webpack-dev-server` 工具实现对文件的自动监测.
安装工具 `npm i -D webpack-dev-server`,在配置中加入服务配置.
添加 npm 脚本实现启动.

```
"start": "webpack-dev-server --open",
```

利用 `npm start` 打开服务该服务实现
* 自动打开浏览器加载内容
* 自动监听文件重新编译并刷新浏览器

更详细的配置参见 [devserver](https://webpack.js.org/configuration/dev-server/)

可以结合 `express` 等工具实现后端的完全模拟.


## 典型配置
结合 webpack 开发文档记录各典型配置

### [基础配置](typical_config/basic)
* 安装工具
    * `clean-webpack-plugin` 清空输出目录无用的编译文件
    * `css-loader` 解析 css 文件 loader
    * `file-loader` 解析文件 loader
    * `html-webpack-plugin` 自动生成 index.html,并插入依赖脚本的 plugins
    * `json-loader` 解析 json 的 loader
    * `style-loader` 解析 style 的loader
    * `webpack-dev-server` 开发模式自动打开浏览器并检测文件变化的工具
* 核心配置项
    * entry 只有 restify.js 为入口文件
    * `devtool: 'inline-source-map'` 启动源码映射的功能,方便调试
### [热加载](https://webpack.js.org/guides/hot-module-replacement/)
普通模式下.页面资源的变化会导致整个内容重新刷新.
最好的方式是指加载变化的内容.这样的机制称为热加载.
目前没有用到这个技术!!!

## 坑
###  Cannot find module 'webpack/lib/node/NodeTemplatePlugin'
全局安装 `webpack` 时会出现此错误.利用 `npm i -D webpack` 本地安装解决此问题


* [代码分离](https://doc.webpack-china.org/guides/code-splitting)


## cli 
测试 `env` 注入.
webpack 目录下运行

```bash
webpack --env.test --config demo/testEnv.js
```

更详细的配置参见 [cli](https://webpack.js.org/api/cli/)

env 回传入 exports 导出函数的首个参数.参见 `testEnv.js`




# 参考资料
[webpack 使用经验](https://zhuanlan.zhihu.com/p/29161762?utm_source=wechat_session&amp;utm_medium=social)
[webpack 官方文档](https://webpack.js.org/guides/getting-started/)


