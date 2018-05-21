express
===
---

## 路由

### 路由路径
[测试路由的网址](http://forbeslindesay.github.io/express-route-tester/?_ga=1.150002550.111570145.1472432629)
1. 基本匹配带字符串即可
```regexp
   /command //匹配此路由
   /^\/command(?:\/(?=$))?$/i //实际路由规则
   
```
2. `?、+、*、()`这几个符号和实际相符，但是`-、.`就是实际字符没有转义
3. 直接支持正则表达式
4. 字符串路由的用法
    1. 利用`:`获取路由参数
    ```
    Route path: /users/:userId/books/:bookId
    Request URL: http://localhost:3000/users/34/books/8989
    req.params: { "userId": "34", "bookId": "8989" }    
    ```
    2. 利用`-`拆分内容
    ```
       Route path: /flights/:from-:to
       Request URL: http://localhost:3000/flights/LAX-SFO
       req.params: { "from": "LAX", "to": "SFO" } 
    ```
    3. 利用`.`也可以实现类似`-`的方法
    ```
       Route path: /plantae/:genus.:species
       Request URL: http://localhost:3000/plantae/Prunus.persica
       req.params: { "genus": "Prunus", "species": "persica" } 
    ```

### 路由方法回调的层叠使用
[route handle_client](http://expressjs.com/en/guide/routing.html)、


## 常用场景
### 建立 RestFul DEVICE_API 的服务器

### 建立静态资源文件服务器
> 快速入门
1.  在 app 路径下新建 `static` 文件，存放`test.txt`文件，
文件中存入`hello world`
2. 在 app 路径下新建 `restify.js` 输入如下代码
```js
   const SERVER_PORT = 14213;
   const STATIC_PATH = 'static';
   
   var express = require('express');
       app    =  express();
   //
   app.use(express.static(STATIC_PATH));
   
   app.get('/', function (req, res) {
       res.send('Hello World!');
   });
   app.listen(SERVER_PORT); 
```
3. 访问`localhost://14213/test.txt`即可查看到静态资源

> 实例讲解

上面的实例中，主要利用`app,use(express.static())`设置静态资源路径。

### 建立动态模板服务器

> 快速入门

1. 定义模板引擎
新建`restify.js`写入如下内容
```js
    const SERVER_PORT = 14213;
    
    var express= require('express');
         app = express();
         fs = require('fs');
    
    app.engine('ntl', function (filePath, options, callback) { // define the template engine
        fs.readFile(filePath, function (err, content) {
            if (err) return callback(new Error(err));
            // this is an extremely simple template engine
            var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
                .replace('#message#', '<h1>'+ options.message +'</h1>');
            return callback(null, rendered);
        });
    });
    app.set('views', './views'); // specify the views directory
    app.set('view engine', 'ntl'); // register the template engine
    
    
    app.get('/tmp', function (req, res) {
        res.render('index', { title: 'Hey', message: 'Hello there!'});
    });
    
    app.listen(SERVER_PORT);
```
2. 新建 `views` 文件夹，在文件中写入如下内容
  
    
    #title#
    #message#

3. 运行`restify.js`文件，访问`localhost://14213/tmp`。

> 模板讲解

利用**app.engine**生成模板。
模板生成后利用**app.set**来设置模板的路径和扩展名。
响应时利用`res.render`函数渲染模板片段，返回 HTML 片段。
### 混合服务器



