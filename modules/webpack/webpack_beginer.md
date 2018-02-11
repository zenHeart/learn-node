webpack 入门
===
**前言:讲解 webpack 的使用**

---

## 重温基础概念
### entry 
定义文件编译的入口.
```js
//多页面应用,定义多个入口
const config1 = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
}; 
```

### output
定义编译后的内容写入位置.

```js
//单入口输出设定
const config = {
output: {
 filename: 'bundle.js', //输出文件名
 path: '/home/proj/public/assets' //输出位置
}
};

/**
* 多入口文件设定
* name 指代入口设定的键名
*/
const multiConfig = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
```

webpack 除了支持 name 等字段.其余编译生成的字段名详见
[输出替代](https://webpack.js.org/configuration/output/#output-filename)

### loaders
用来解析不同类型的文件.使用的步骤为
1. 安装对应的 loaders
    ```shell
    npm install --save-dev css-loader 
    ```
2. 添加对该文件的解析规则
    ```js
    module.exports = {
           module: {
             rules: [
               { test: /\.css$/, use: 'css-loader' },
             ]
           }
         };
    ```

配置 loaders 的方式有三种
* 在配置文件中申明 loaders,更精细的配置如下
    ```js
        module.exports = {
      module: {
         rules: [
           {
             test: /\.css$/,
             use: [
               { loader: 'style-loader' },
               {
                 loader: 'css-loader',
                 options: {
                   modules: true
                 }
               }
             ]
           }
         ]
       }
     }
    ```
    > 在 user 字段中细化使用方式
* 内联模式,不用理解详情参见 [inline](https://webpack.js.org/concepts/loaders/#inline)
* cli 模式,详见 [cli](https://webpack.js.org/concepts/loaders/#cli)

> 只使用配置模式定义,便于项目的维护

官方文档中 loaders 资料
* [详细的 loaders 清单](https://webpack.js.org/loaders/)
* [如何编写 loaders](https://webpack.js.org/contribute/writing-a-loader/)


### 插件
用来定义一系列的钩子任务进行执行.
详细说明参见 [plugins](https://webpack.js.org/concepts/plugins/)

其他和概念说明如下
### 配置
wepack 的配置文件通常命名为 `webpack.conf.js` 

由于是 js 文件.可以当普通文件处理.使用依赖,执行函数等.
但是作为配置文件. webpack 要求导出一个配置规则的对象给来解析规则.
一个典型的配置文件格式如下: 
```js
var path = require('path');

module.exports = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

跟详细的配置说明参见 [configuration](https://webpack.js.org/configuration/)


### 模块体系
webpack 编译基于模块的思想.将整个前端的开发
转变为基于模块的开发体系.首先需要熟悉模块的运作机制.
其次需要熟悉常用的各种基于模块的封装语言.
内容详见 [模块](https://webpack.js.org/concepts/modules/)

webpack 解析模块的规则详见 [模块解析](https://webpack.js.org/concepts/module-resolution/)

### 目标
为了实现不同环境的编译.例如区分服务端或浏览器端.
使用 `target` 属性定义.详见  [target](https://webpack.js.org/concepts/targets/)


### mainfest
[mainfest](https://webpack.js.org/concepts/manifest/)

完全没理解想要表达什么???

### 热加载
[热加载](https://webpack.js.org/concepts/hot-module-replacement/)

这个需要升入理解热加载机制的原理及使用方式???

## 配置
参见官方示例文件,配置文件的一般格式为:
```js
module.exports = {
    entry:"..",
    keys:"..."
} 
```
通过导出一个对象给 webpack 进行读取.
对象的核心配置字段如下.详情参见 [config](https://webpack.js.org/configuration/).
简述如下:
* `entry` 定义解析入口
* `output` 定义编译结果的输出位置
    * `path` 输出路径
    * `filename` 输出文件名
* `module` 定义加载的模块
    * `rules` 配置各模块的规则
        * `test` 设置文件的匹配模式
        * `inlcude` 匹配包含的目录
        * `exlcude` 匹配排出的目录
        * `loader` 需要使用的加载器
        * `use` 用来将上述配置整合在一个选项中,方便复用
    > rules 为数组可以定义多个模块的解析规则
* `resolve` 定义模块的解析规则.
...


webpack 使用 `typescript` 等其他语言配置项目.
详见 [配置语言](https://webpack.js.org/configuration/configuration-languages/)

当存在多个环境时,无法利用导出对象的方式完成先关设定的切换,此时可以利用函数模式导出
结构如下:
```js
module.exports = function(env,argv) {
    return {
        devtool: env.production ? 'source-maps':'eval',
    }
} 
```

> 此时 webpack 会利用传入的环境变量选择性加载配置文件.

更详细的说明参见 [配置类型](https://webpack.js.org/configuration/configuration-types/)

下面对核心字段进行详细解析.

### entry
定义文件的入口.配置之前.
建议定义项目的根目录,否则默认为当前目录来解析相对文件位置.
利用 `context` 配置基准目录.
`context:path.resolve(__dirname,"app")` 解析当前路径下的 app 作为参考目录.

入口文件的配置原则如下:
* 每个 html 页面一个入口文件
* SPA 当入口文件
* MPA 多入口文件

入口文件支持如下方式
* 对象模式
    ```js
    entry: {
      home: "./home.js",
      about: "./about.js",
      contact: "./contact.js"
    }
    ```
* 函数绑定
```js
entry:() => './demo' 
```

更详细的配置参见 [entry](https://webpack.js.org/configuration/entry-context/)

### output
详见输出配置 [output](https://webpack.js.org/configuration/output/)

###
