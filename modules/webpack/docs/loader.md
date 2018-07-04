loader
====

**前言**: 如何编写一个 loader

-----


## 本地引用 loader
1. 使用 path.resolve 解析模块,
配置 `webpack.config.js` 如下
    ```js
     module.exports = {
       //...
       module: {
         rules: [
           {
             test: /\.js$/,
             use: [
               {
                 loader: path.resolve('path/to/loader.js'),
                 options: {/* ... */}
               }
             ]
           }
         ]
       }
     };
    ```

2. 为了测试多个 loader 可以配置 loader 的查找路径
```js
module.exports = {
    //...
    resolveLoader:{
        modules:[
            'node_modules',
            path.resolve(__dirname,'loaders')
        ]
    }
}
```

3. `loader` 是一个独立的仓库,可以使用 `npm link` 命令创建连接.
实际上还是需要采用上述方式引用插件.

## 简单应用
单一组件会在形参中注入 `source` 变量,
该变量为内容的字符串形式.

## 复杂应用
当某种格式的文件匹配多个 loader 时,
指向顺序为逆向,先申明的 loader 后执行.
文本流为从下到上.
