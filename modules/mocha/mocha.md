mocha
===
---
_前言：讲解 node 中 mocha 的使用_

## 环境配置
在安装了 node 的情况下，全局安装`mocha`
```shell
npm install -g mocha
```   
安装完成后可以利用`mocha -h`来查看是否安装成功,该命令会显示
所有`mocha`命令的帮助。   

本地安装`chai`     
```shell
npm install chai
```


## 快速入门
1. 创建 `add_test.js`的测试文件，写入如下代码   
```js
var expect = require('chai').expect;

function add(a,b) {
    return a + b;
}

describe('加法函数的测试',function() {
    it('1 加 1 应该等于 2', function() {
        expect(add(1, 1)).to.be.equal(2);
    });
    it('只输入一个参数 1', function() {
        expect(add(1)).to.be.equal(1);
    });
});
```
2. 在`node`下运行`mocha add_test.js`   
经过上面的步骤就完成了一个，用来检测单一函数的测试用例。
下面对该用例进行讲解。

## 概念建立
引入的模块`chai`是为了编写断言，断言是指判断源代码实际输出和预期结果是否一致。

`describe` 函数称为 `test suite`,又叫测试套件，`it`叫做`test case`又叫
测试用例。你可以这样理解它们的关系，假设你要测试一个函数，你会编写多个测试输入，来检测该函数的是否会出现异常。   
这是每一个测试输入都对应一个`测试用例`，而这一组`测试用例`就对应了一个`测试套件`。   
所以在上面的代码中，你会看到`describe`函数中，包含了多个`it`函数。   

`to.be.equal`在断言中表示函数结果希望等于给定值，你也可以使用别的断言库来进行测试。

**`chai` 断言**  
下面对`chai`的断言格式进行讲解
1. assert   
```js
var assert = require('chai').assert;

try {
    assert.typeOf(23, 'string', 'VALUE IS STRING');
} catch (err) {
    console.log(err);
}
```
当输入类型和预期结果不符合时，代码会报错，同时断言内容，会传入 err 函数。
若结果相符，则程序继续运行。具体的断言方法请参看[assert](http://devdocs.io/chai-assert/)   

2. `expect` 和 `should`
这两种断言只是 BDD 断言风格的不同表现形式   
* expect 风格   
    ```js
    var expect = require('chai').expect
      , foo = 'bar'
      , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
    
 
    try {
            expect(foo).to.be.a('string');
            expect(foo).to.equal('bar');
            expect(foo).to.have.length(3);
            expect(beverages,'output your define error message').to.have.property('te').with.length(3);
            } catch (err) {
        console.log(err);
    }
    ```
运行上述代码，当出现错误时，`chai`会产生一个断言格式，来说明错误的具体内容其中可以在 `expect` 中第二项
输入自定义的错误输出！

* should 风格      
    ```js
    var should = require('chai').should() //actually call the function
      , foo = 'bar'
      , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
    
    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.length(3);
    beverages.should.have.property('tea').with.length(3);
    ```
通过以上实例可以看出，`expect`将需要断言的内容作为参数传入其中，调用需要的断言进行处理。   
`should`添加了对象的原型方法来处理断言

## 使用案例
1. 测试多个文件
如果只需要测试某个独立的函数，利用快速入门中的字就可以了。但是在实际开发中，会经常需要大规模测试。   
这时一般会专门建立以`test`为名字的文件夹存放测试代码，文件夹中存放需要测试的模块，文件名规则为：
`模块名_test.js` 例如将快速入门中的例子改写如下   
* add.js 文件
    ```js
    function add(x, y) {
      return x + y;
    }
    module.exports = add;
    ```
* test 文件夹下的 add_test.js 文件
    ```js
    var expect = require('chai').expect;
    var add = require('add.js');
  
    describe('add 模块测试',function () {
      it('测试用例1:正常输入',function() {
        expect(add(1,2)).equal(3);
    });
  });
    ```
执行 `mocha add_test.js` 验证测试，你可以利用`mocha`一次实现多个测试用例的编写  
    
```shell
mocha filename1 filename2 ... // 运行表示文件
mocha                         //运行当前文件夹下 test 文件中的内容
```   
注意`mocha`命令，它会在当前文件夹下查找`test`文件夹，执行里面的所有脚本，所以在使用时注意，不要
切换到`test`文件夹中执行该指令。此外此命令只会执行`test`文件夹下一层的内容若要嵌套执行，
先使用`mocha --recursive`表示递归执行`test`文件夹中内容。

你也可以使用通配符来指定执行文件   
```shell
mocha spec{name1,name2}.js ... // 执行 name1.js 和  name2.js
mocha  test/add/*.js          // 执行test/add/ 路径下所有 js 文件
mocha 'test/**/*.@(js|jsx)'   //node 通配符
``` 

# 使用问题
1. 无法循环进行单元测试

理想情况下,希望只输入测试数据,然让单元测试循环执行.
结果无法显示单元测试.

[mocha 使用](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)