---
title: sass    
tags: sass css tool      
birth: 2017-08-12      
modified: 2017-08-12      
---

sass
===
**前言:讲解 sass 的基本使用**

---

## 概述

配置 sass 支持利用 chrome 修改 sass.

```bash
sass --watch input.scss:output.css 
```

映射好文件后即可逐步优化.

## sass 语法详解
* 嵌套变为父子关系
* `&` 指代编译后生成的父级选择器
* 某些属性也支持嵌套,例如 `font` 下的子属性,`font-family` 等
    ```sass
     .funky {
       font: {
         family: fantasy;
         size: 30em;
         weight: bold;
       }
     }
    ```
    
    被翻译成
    
    ```css
    .funky {
        font-family: fantasy;
        font-size: 30em;
        font-weight: bold; 
      } 
    ```
    
* `$variable: value` 语法定义变脸,利用 `$varibale` 引用

    > 在注释中使用  `#{$varible}` 也可引用
    
    支持变量类型为
    * `numbers` `1.2, 12,10px`
    * `string` `"foo",'bar',bar`
    * `colots` `#dfddd,rgba(1,1,32,0.1)`
    *  `booleans`  true,false
    * `nulls` null
    * `list` 多个属性值的组合,例如  `1.5rem 1em arial,sans-serif` 可以利用空格或 `,` 分隔
    * `key-value` {key1: value,key2:value2}
    * `function refrences` 函数引用

        > `$vriable` 编译为 css 会将引号替换为 双引号
        > `#{$varibale}` 模板编译后,会取消最外层的引号,该语法在注释中也可用
        
* `!default` 限定变量的默认值,组织变量覆盖
* `@import` 导入外部 sass 文件

## 坑
### `@import` 文件时,编码方式必须是 `utf-8`
在编译时制定编码方式

```bash
# 制定编码方式为 uft-8
sass -E utf-8 
```



## 参考文章
[sass 映射](https://robots.thoughtbot.com/sass-source-maps-chrome-magic)
[sass 架构设计](http://thesassway.com/beginner/how-to-structure-a-sass-project) 
