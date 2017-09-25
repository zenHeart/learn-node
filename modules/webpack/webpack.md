webpack
===
**前言:讲解 webpack 的使用**

---

## 概述
webpack 源于前端日益复杂的功能需求.
复杂的导致对代码进行更精细的拆分.
webpack 基于此痛点应运而生.

## 核心概念

### entry
入口点可以理解为初始加载位置.
类似静态语言的 main 文件.
或者树的根节点.决定这个加载入口.

在 webpack 中为 `entry` 属性配置

### output
告诉 webpack 文件打包和集成的出口

使用 `output` 属性控制

### Loaders
webpack 只识别 js.
对于不同类型文件的加载和归并
依靠 Loaders 来说明不同文件的依赖关系.

使用 `module` 来说明 loader 的处理

### Plugins
使用 `plugins` 属性来自定义编译行为.


# webpack-demo
直接运行 `webpack src/index.js dist/bundle.js` 即可.

webpack 根据 `import` 在 node_modules 查找加载模块.
将 `index.js` 和模块文件合并到 `dist/bundle.js` 文件中.

注意命令中相对路径是相对执行路径而言的**
所以需要需要确保在项目根目录执行.

也可在项目根目录使用 `webpack --config webpack.config.js` 编译项目

配置参数说明:

* entry 预编译的输入文件
* output 配置
    * filename 输出文件名
    * path 输出路径
    
也可仅使用 `webpack` 编译文件.
它会在项目根目录搜索 `webpack.config.js` .
使用 `--config` 来指定配置文件.

进一步简化,在 npm 脚本中添加 `build` 选项即可

```json
{
  "script":{
    "build":"webpack"
  }
} 
```
使用 `npm run build` 执行此命令.

webpack 只能识别和打包 js 文件.
为了实现`css,img` 等不同资源的打包.
需要结合 `loader` 来实现此功能.

使用 `npm install --save css-loader style-loader` 下载 loader
在 entry 中加入引导文件.添加配置项.

* module 申明依赖
    * rules 解析文件后缀类型
    * use 使用的 loader 模块




# 参考资料
[webpack 使用经验](https://zhuanlan.zhihu.com/p/29161762?utm_source=wechat_session&amp;utm_medium=social)
[webpack 官方文档](https://webpack.js.org/guides/getting-started/)