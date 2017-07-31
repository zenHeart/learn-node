mocha
===
---
_前言：讲解 node 中 mocha 的使用_

## 概述
mocha 是一个测试运行器.
用来实现测试流程自动化.

### 快速入门
1. 项目根目录安装 mocha 框架
```bash
npm i  -D mocha
```

2. 创建 test 测试文件
```bash
mkdir test 
```

3. 在 test 目录下创建 `assert.js` 测试文件

```js
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```

4. 运行测试用例
```bash
npm test 
```

常见测试需求如下
* 单元测试,最小粒度的测试,例如函数和方法级别
* e2e 端到端测试,实现应用接口测试
* UI 层测试,实现界面布局等视图逻辑的测试

对于简单的测试使用 node 自带的断言库即可完成.
但是当断言逻辑复杂可以借助 `chai` 完成语义化的测试用例.

5. chai

项目根目录安装 chai 断言.
```bash
npm i -D chai
 
```

在 test 目录下创建 `chai.test.js`
添加如下内容:

```js
var {assert,expect,should} = require('chai');
should();

describe('assert style',function() {
    it('test typeof',function() {
        assert.typeOf('str', 'string', 'VALUE IS STRING');
    })
});

describe('expect style',function() {
    it('test typeof',function() {
        expect('str').to.be.a('string');
    })
})

describe('should style',function() {
    it('test typeof',function() {
        'str'.should.be.a('string');
    })
})
```

通过上例可知 chai 支持三种风格的断言测试.
详见 chai 文档的说明.
* [assert](http://chaijs.com/guide/styles/#assert) 
* [expect](http://chaijs.com/guide/styles/#expect) 
* [should](http://chaijs.com/guide/styles/#should) 


## mocha 详细讲解
除了使用 describe,it 进行简单的单元测试.
mocha 支持利用 done 进行异步测试i.

```js
var {expect} = require('chai');

function asyncAdd(a,b,cb) {
    setTimeout(function () {
        if(typeof a === 'number' && typeof b === 'number') {
            cb(null,a+b);
        } else {
            cb(new Error('input must number!'));
        }
    },100);
}
describe('test done',function () {
   it('test done function',function (done) {
       asyncAdd(1,2,function (e,result) {
           if(e) {
               done(e);
           }
           expect(result).to.be.equal(3);
           done();
       });
   });
   it('test done error',function (done) {
       asyncAdd(1,'2',function (e,result) {
           if(e) {
               done(e);
           }
           expect(result).to.be.equal(3);
           done();
       });
   })
}); 
```

除了以上方式可以直接将 `done` 作为回调传递.
若只是单纯的验证异步是否执行成功.可以直接将 `done` 最为异步回调传入

```js
it('test async run not error',function(done) {
   //当只是验证异步没有执行错误时
   //可以直接传递 done 即可
  asyncFunc(done);
}) 
```

## mocha 配置
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

## 使用问题
* 无法循环进行单元测试
    理想情况下,希望只输入测试数据,然让单元测试循环执行.
    结果无法显示单元测试.
    [mocha 使用](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)