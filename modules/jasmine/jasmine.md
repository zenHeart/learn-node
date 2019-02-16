# jasmine

**前言:讲解 jasmine 的使用**

---

## 概述
jasmine 是一个测试框架，用来进行单元测试。


## 快速入门
1. 下载  [jasmine_demo]() 文件
2. 直接运行

## 基本概念说明
1. `describe` 代表一个测试组件。
    * 测试套件可以嵌套
    * 测试套件中必须包含一个测试单元
    * 测试单元中必须包含一个匹配器
2. `it`代表一个测试单元。
3. `expect`表示一个匹配器
4. 一个测试单元中必须包含一个或多个匹配器，只有
执行结果正确时，该测试单元才算执行成功。

可以利用 `pending` 实现测试驱动的开发。

`double function` 测试替身
会在每个测试单元之前添加，结束后移除。


## 支持桩，刺探的用法

## 函数说明

### describe 

> **作用**

描述测试套件的函数

> **说明**

* 语法
    
    `decribe(suiteDesp,suiteFun)`

* 参数
    * suiteDesp string 测试套件的描述
    * suiteFunc Function 测试套件的函数

* 返回值
    * Suite 对象
    
> **举例**
    
```js
    //返回 Suite 对象实例
    console.log(describe("suiteTest",function(){return true;}));
```

### it 

> **作用**

描述测试套件的函数

> **说明**

* 语法
    
    `it(unitDesp,unitFun)`

* 参数
    * unitDesp string 单元测试描述
    * suiteFunc Function 单元测试函数

* 返回值
    * Specs 对象
    
> **举例**
    
```js
    //返回 Specs 对象实例
    console.log(it("unitTest",function(){return true;}));
```

### beforeEach,afterEach,beforeAll,afterAll
1. `beforeEach` 和  `afterEach`
* 在每个单元测试后会执行，复位该测试用例

2. `beforeAll` 和  `afterAll`
* 不会再每次测试用例执行后复原代码


## 在浏览器中使用 jasmine


## node 中使用
```bash
# 安装 jasmine
npm install jasmine
# 本地初始化测试
npx jasmine init
# 创建一个 jasmine 测试
npx jasmine examples
# 运行测试
npx jasmine
```

## spy


## 参考资料
* [ ] [jasmine](https://jasmine.github.io/tutorials/your_first_suite.html)