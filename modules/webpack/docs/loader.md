loader
====

**前言:如何编写一个 loader **
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

2. 
