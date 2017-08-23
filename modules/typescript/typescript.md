---
title: typescript    
tags:  typescript js     
birth: 2017-08-22      
modified: 2017-08-22      
---

typescript
===
**前言:讲解 typescript 的使用**

---

## 概述
typescript 是 js 的超集.
优点.
* 强类型限定避免了动态语言类型检查的坑
* 更好的面向对象编程方法
## 快速入门
1. 安装编译工具

```bash
npm install -g typescript 
```

## 语法学习
### 类型申明
* `<variable>: <type>` 

```typescript
function hello(name:string) {
    console.log(name);
}

hello('tom');
```

具体支持如下类型

* `boolean` bool 类型
* `number` 整形,支持如下模式
    * `0b01` 2 进制
    * `0o01` 8 进制,**注意这里是字母 o,表示 `octal` 缩写**
    * `0101` 16 进制
    * `6` 10 进制
* `string` 字符串,单双引号均可
* `Array<elemType> 或 elementType[]` 数组类型及元素类型
    * `let list: number[] = [1,2,3]`限定为数字数组
    * `let list: Array<number>`限定为数字数组
*  `tuple` 混合元素定义,只限于数组,类似于 matlab 的元胞数组
    * `let x:[string,number] = ["hello",12]` 必须保证类型和顺序都一样.
* `enum` 支持枚举
    
    ```typescript
    //支持默认赋值
    enum Color {Red,Green = 2,Blue} 
    let c:Color = Color.Green;
    ```
* `any`  支持所有类型,但是不会对对象方法进行检查
    ```typescript
    let notSure: any = 4; 
    
    //不会对未存在的方法显示编译错误
    notSure.toFixed()
    ```
* `Object` 对象支持
* `void` 只支持 undefined,null 类型
* `null` 只支持 null 类型
* `undefined` 只支持 undefined 类型
* `never` 没看懂

typescript 数据断言,判断数据类型是否符合预期

```typescript
// 使用括号模式转换类型
let someValue: any = 'string';
let strLength: number = (<string> someValue).length;

//使用 as 模式转换
let someValue: any = 'string';
let strLength: number = (someValue as string).length;
```

> 在转换 any 时发现字符串数据无法转换为整形

重点总结
* 数据类型   
* 数据断言   

### 接口
* `interface` 定义一个接口

```typescript
interface Person {
    firstName : string,
    lastName:string
}

function greeter(person: Person) {
    return `hello ${person.firstName} ${person.lastName}`;
}

var user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```


### class
*  `class` 利用 class 申明类

```typescript
class Student {
    fullName : string;
    constructor(public firstName,public middleInitial,public lastName) {
        this.fullName = `${this.fullName} ${this.middleInitial} ${this.lastName} `
    }
} 
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person : Person) {
    return `hello ${person.firstName} ${person.lastName}`
}

var user = new Student("Jane","M","User");

document.body.innerHTML = greeter(user);
``` 


## 核心功能
### 类型检查
* 支持原始类型断言
* 支持引用类型的对象断言
    * 属性断言
    * 类型断言
        * `readonly` 只读类型
    * [interface](http://www.typescriptlang.org/docs/handbook/interfaces.html) 限定复杂类型
    

### module
[module](http://www.typescriptlang.org/docs/handbook/modules.html)

js 支持更复杂的模块加载,可以向 php 一样支持动态加载.

## typescript 配置

[配置 typescript 的编译风格](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

## 项目规范
[文件申明](http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html)