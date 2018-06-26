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
