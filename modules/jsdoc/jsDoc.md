jsDoc
===
---
_前言：讲解 jsdoc 的使用及相关工具_

## 简介
JSDoc 是一个根据 javascript 文件中的注释信息，生成程序说明文档的工具。
你可以利用它生成代码的 API 说明文档等。

## 使用原理
平常我们写注释的格式只是简单地利用`\\` 或`/*`。
但是按照 JSDoc 提供的注释语法编写注释你就可以生成美观的代码说明文档。
下面是一个快速入门的实例。

## 快速入门
1. 利用 npm 下载 JSDoc ,建议全局安装
```shell
   npm install -g jsdoc 
   jsdoc -v //验证全局安装成功
```

2. 新建一个文件夹，命名为 add.js 添加如下代码及注释   
温馨提示:如果你用的 PHPSTORM 输入`/**` 按回车 jsdoc 的注释会自动生成。 
```js
/**
 *
 * @param x
 * @param y
 * @returns {*}
 */
function add(x, y) {
    return x + y;
}
```

3. 编译该文件
```shell
   jsdoc add.js 
```
4. 编译成功后，会在当前目录下生成`out`文件夹，其中会生成`add.js.html` 的文件
打开后你就会看到生成的文档。

5. 上面的`param` 代表的就是函数的输入参数，当然你也可以添加其他的参数，后面
我们会详细讲解。

##　官方的例子
1. 修改 `add.js` 中的文件为如下内容
```js
   /** Class representing a point. */
   class Point {
       /**
        * Create a point.
        * @param {number} x - The x value.
        * @param {number} y - The y value.
        */
       constructor(x, y) {
           // ...
       }
   
       /**
        * Get the x value.
        * @return {number} The x value.
        */
       getX() {
           // ...
       }
   
       /**
        * Get the y value.
        * @return {number} The y value.
        */
       getY() {
           // ...
       }
   
       /**
        * Convert a string containing two comma-separated numbers into a point.
        * @param {string} str - The string containing two comma-separated numbers.
        * @return {Point} A Point object.
        */
       static fromString(str) {
           // ...
       }
   } 
   
```
2. 再次利用`jsdoc add.js`进行编译，编译后打开`add.js.html` 看一下文档说明

## 基本概念

   
## 在 phpstorm 中使用 jsdoc
1. 在需要注释的代码上方添加`/**`按回车会出现JSDOC的注释。
如果是函数 PHPSTORM 会自动生成函数的JSDOC，示例如下。

```js
/**
* @param a
* @param b
*/
    function add(a,b)
    {
        return a + b;
    }  
```
2. 假设在使用时函数参数发生变化，而注释内容没有修改， PHPSTORM 会将错误地方显示出来。
可以利用`ctrl + f1` 查看详细的报错信息，可以利用如下方法修改注释。
   1. `ctrl + shift + a`
   2. 输入`fix doc comment`
   3. 这是文档的注释便会自动修复   
    ![](https://www.jetbrains.com/help/img/idea/fix_doc_comment_js.png)

