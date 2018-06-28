## 概述
参考官方 [documnent](https://webpack.js.org/concepts/) 总结资料.

## [concept](https://webpack.js.org/concepts/#mode)
* [entry](https://webpack.js.org/concepts/#entry) 入口文件.默认为 `./src/index.js` 
* [output](https://webpack.js.org/concepts/#output) 输入文件,默认为 `./dist/main.js`
* [loaders](https://webpack.js.org/concepts/#loaders)实现解析不同类型文件功能
核心属性.在 `module` 中配置
    * `test` 选择特定的文件类型
    * `use` 选择该类型文件的解析插件
* [plugins](https://webpack.js.org/concepts/#plugins)  执行特定的任务,例如压缩,混淆等 
核心属性.
* [mode](https://webpack.js.org/concepts/#mode)
模式,编译为不同的版本,例如 test,production 等 

> **info**    
> 注意 webpack 的浏览器兼容性为 ES5,详细参见 [borwser compatibiliry](https://webpack.js.org/concepts/#browser-compatibility)

### [entry](https://webpack.js.org/concepts/#browser-compatibility)
设置主文件,主要分为两种
*  [单页面模式](https://webpack.js.org/concepts/entry-points/)
* [多页面模式](https://webpack.js.org/concepts/entry-points/)

### [output](https://webpack.js.org/concepts/output/)
输出设定,核心配置包括.
* `filename` 设定输出文件名
* `path` 设定输出路径

常用的内部变量.
* `[naem]` 指代 `entry` 的文件名
* `[hash]` 指代文件通过 md5 计算的哈希值


###  [mode](https://webpack.js.org/concepts/mode/)
利用 mode 来改变编译特性.
实现对不同环境的条件编译.
注意 webpack 只支持三个模式
* `developmemnt` 开发模式
* `production` 生产模式
* `none` 默认模式

### [loaders](https://webpack.js.org/concepts/loaders/)
利用 loaders 配置不同类型文件的解析器.
核心参数包括.
* `test` 查找匹配的文件模式
* `use` 选择,对应的 loaders,一个类型的文件可以配置多个 loaders

loaders 支持三种加载方式
* [配置项模式](https://webpack.js.org/concepts/loaders/#configuration)
* [内联引入模式](https://webpack.js.org/concepts/loaders/#inline)
* [命令行传入](https://webpack.js.org/concepts/loaders/#cli)

### [插件](https://webpack.js.org/concepts/plugins/)
插件的目的是为了实现 `loader` 无法完成的功能.
实际上 `webpack` 本身就是一个基于插件的系统.

loader 是一个类,暴露 apply 方法,
再次方法内,利用暴露的 `compiler` 对象实现插件的个性化编译.

由于插件是一个类,插件的配置项即为传入的 `options` 对象.
设置该类的实例化特性.

### [configuration](https://webpack.js.org/concepts/configuration/)
基于配置文件修改 webpack 特性.

### [modules](https://webpack.js.org/concepts/modules/)
webpack 支持一系列的模块方式调用.

### [模块解析](https://webpack.js.org/concepts/module-resolution/)
webpack 的模块解析,同样包含缓存文件.

### [Dependency Graph](https://webpack.js.org/concepts/dependency-graph/)

### [mainfest](https://webpack.js.org/concepts/manifest/)
webpack 基于依赖图,实现对模块的引入.
webpack 负责管理浏览器的模块的加载.

### [目标](https://webpack.js.org/concepts/targets/)
webpack 支持将代码打包到不同的运行环境.
通过配置 `target` 
* `node` 打包为 node 环境
* `web` 打包为 web 环境


### [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)
webpack 支持热更新


## [configuration](https://webpack.js.org/configuration)
配置项,详细讲解 webpack 的配置功能.

### [entry and context](https://webpack.js.org/configuration/)
入口配置,决定 webpack 如何编译查找资源.
* `context`设定主文件的基础路径
* `entry` 解析的主文件,支持传入多个文件


## API 
### [introduction](https://webpack.js.org/api/)
* [cli](https://webpack.js.org/api/#cli) 命令行工具
* [module](https://webpack.js.org/api/#module) 模块
* [node](https://webpack.js.org/api/#module) 采用 node 模式调用 webpack
* [loaders](https://webpack.js.org/api/#loaders) 转换资源
* [plugins](https://webpack.js.org/api/#plugins) 在编译过程中挂载任务

### [cli](https://webpack.js.org/api/cli/)
为了简化配置,所有命令行选项,可以利用 `webpack.config.js` 文件进行配置.
有两个命令行工具.
* [webpack-cli](https://github.com/webpack/webpack-cli) 完全的命令行工具
* [webpack-command](https://github.com/webpack/webpack-command) 完全的命令行工具

可以采用配置文件,或命令行模式,运行 webpack
```bash
# 指定配置文件的模式
# 默认webpack 会查找 根目录下的 webpack.config.js 的文件
webpack [--config webpack.config.js] 

# 配置项模式
webpack <entry> [entry] -o <output>
```

> **info**
> 命令行传参比配置文件拥有更高的优先级.
相同配置会被命令行的值覆盖

###  [common-options](https://webpack.js.org/api/cli/#common-options)
可以利用分析工具,解析 webpack 编译结果.
1. `webpack --json` 将编译结果转换为 json 文件
2. 导入如下工具查看效果
    * [analyse tool](https://webpack.github.io/analyse/)
    * [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/)
    * [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

### [environment options](https://webpack.js.org/api/cli/#environment-options)
可以利用 env 配置环境变量.
```bash
webpack --env prod # 等效 "prod" 
webpack --env.prod # 等效 {prod:true} 
webpack --env.prod=1 # 等效 {prod:1}
webpack --env.prod=1 --env min # 等效 {prod:1,"min"}
```

### [config options](https://webpack.js.org/api/cli/#config-options)
配置文件的设定

#### [output options](https://webpack.js.org/api/cli/#output-options)
输出选项设定

#### [debug options](https://webpack.js.org/api/cli/#debug-options)
提示选项设定


#### [module options](https://webpack.js.org/api/cli/#module-options)
模块选项设定

#### [watch options](https://webpack.js.org/api/cli/#watch-options)
监测文件变化设定

#### [optimize options](https://webpack.js.org/api/cli/#optimize-options)
优化设定

#### [resolve options](https://webpack.js.org/api/cli/#resolve-options)
解析设定

...

## [sats data](https://webpack.js.org/api/stats/)
详细描述采用 `webpack --json` 输出的对象含义.

## [node.js api](https://webpack.js.org/api/node/)
处理使用 `webpack` 命令行工具编译文件.
可以使用 webpack 对象完成编译流程.核心步骤如下
1. `npm i -D webpack`
2. 引用 webpack 并实例化
```js
const webpack = require('webpack'); 
const compiler = webpack({
    //配置文件
})
```
3. 调用方式有如下几种
    1. 在实例化时,第二个参数传入回调
    
    ```js
    webpack({
        //传入配置参数
    },(err,status) => {
        //回调模式获取结果
    }) 
    ```

    2. 调用返回的 compiler.run 方法
    
    ```js
    compiler = webpack({
        //传入配置参数
    });
    compiler.run((err,status) => {
                     //回调模式获取结果
    });
    ```

    3. 采用监听模式运行编译
    
    ```js
    compiler = webpack({
        //传入配置参数
    });
    compiler.watch({
       //传入监听配置
    },(err,status) => {
                     //回调模式获取结果
    });
    ```

核心的 [status 对象](https://webpack.js.org/api/node/#stats-object)
详见官网.

### [热更新](https://webpack.js.org/api/hot-module-replacement/)
详见文档,提供的热更新接口

### [loader api ](https://webpack.js.org/api/loaders/)
loader 是一个 npm 模块,将输入处理后产生新的输出.
可以等同为 linux 管道的效果.

第一个 loader 接收一个文件资源,最后一个loader输出字符串或者 `buffer` 对象.
loader 尽量写成异步.





## contribute
### 编写 loader
loader 是一个函数模块.用于将文件内容进行转换.
函数的执行环境,可以调用 [loader api](https://webpack.js.org/api/loaders/).




