---   
title:validate   
tag:validate   
birth:2016-9-26 10:49:14   
modified:2016-9-27 10:27:46   
---
validate
===
----
**前言:检验类，用来检测消息的输入是否合法，利用该方式实现，对消息的自动管理和非法消息的屏蔽**

## 过滤器基本格式
```
   {
     <attribute> : {
        <validator name> : <validator options>
     }
   } 
```
将错误消息定义在，每个校验值属性中，可以非常方便的查询，输入数据的错误原因。
消息也可以是函数。由上可知，该类库的设计在于，每个对象的苏醒，是一系列的校验熟悉组成，
对于设计者只需要清楚，对于每一个对象属性采用，需要哪一些校验属性，例如对象属性是否非空、
是否包含正则等。然后在验证时返回，对象对应的校验对象即可。在定义一些校验值是，可以吧常用的校验
剥离出来。例如对于 mail ,url 等校验不需要反复书写，单独使用即可。异步模式利用 promise 实现。

## 基本使用
1. 检测部分属性

## 资料
[php sanitizing](http://stackoverflow.com/questions/3126072/what-are-the-best-php-input-sanitizing-functions)
