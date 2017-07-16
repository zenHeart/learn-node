---
title: workshopper     
tags: workshopper       
birth: 2017-06-18      
modified: 2017-06-18      
---

workshopper 
===
**前言:讲解利用 workshopper 创建教程的步骤**

---

# workshopper
## 工作原理如下

1. 运行 verify 会将解答和提交文件创建为两个进程.比较这两个进程的输出结果.

## 测试的原理


# 基本
1. 参考 learnyounode 添加 package.json
2. main file 中添加菜单,使用 menu 去创建对应的文件结构
创建的文件结构如下:

* exercise_name
    * solution
        * solution.js
    * exercise.js
    * problem.md

3. 运行主文件即可

## 课程设计的建议
1. 确定你要解决什么问题

# workshopper-adventure
## 构造函数

* 形参 options 
    * appDir 应用路径
    * name app-名称,注意必须和 bin 名称一致
    * languages 语言
    * defaultLang 默认语言 en
    * defaultOutputType 默认输出格式 md 
    * pkg 获取 package.json 文件
    * appRepo 获取包地址
    * version 包版本
    * globalStorage 全局存储
    * menuFactory 菜单工厂方法
    * menu 菜单设置
        * width
        * x
        * y
    * requireSubmission 需要提交
    * commands 命令名
    * modifiers 修改命令名
    
* 实例化 workshopper-advent ure 属性
    * cli 利用 commandcio 创建命令行工具


# 参考资料
[how workshopper work](https://github.com/linclark/lin-clark.com/blob/master/content/blog/2014/07/01/authoring-nodejs-workshopper-lessons.md)

[demo workshopper git](https://github.com/linclark/demo-workshopper.git)

[workshopper goal](http://gwmccull.github.io/2015/05/25/beginning-nodeschool-workshopper/)

[nodeschool](https://nodeschool.io/zh-cn/building-workshops.html)

[adventure](https://www.npmjs.com/package/adventure)