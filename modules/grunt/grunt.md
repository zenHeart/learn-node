---
title: grunt    
tags: node grunt      
birth: 2017-09-26      
modified: 2017-09-26      
---

grunt
===
**前言:讲解 grunt 的使用**

---

## 快速入门
1. 安装 grunt
```bash
npm install -g grunt-cli
```
2. 进入 [demo](demo) 文件

3. 修改 `Gruntfile_concat` 文件名为 `Gruntfile`

4. 运行 `grunt` 及执行任务.

* 保证 `package.json` 中包含 `grunt` 和 `grunt-contrib-concat` 压缩
* 确保项目根目录包含 `Gruntfile` 文件
* 配置 `Gruntfile` 文件配置正确
    * `initConfig` 配置 Grunt 特性和各插件特性
    * `loadNpmTasks` 包含插件模块
    * `registerTask` 绑定插件的执行触发条件

> 重点在于理解 grunt 是基于插件体系的任务管理器.
学习围绕 grunt 各插件的功能和配置项展开.

## grunt 概念
grunt 是一个任务管理器.基于各种插件.完成例如文档合并,混淆.
代码检查,测试等工作.使用流程如下.
1. 基于项目需求,查找你需要的 grunt 插件
2. 在包中申明插件并安装
3. 在项目根目录添加 `Gruntfile` 文件
4. 配置此文件,运行相关任务,完成项目需求

### Gruntfile
运行 `grunt` 命令时加载该文件.
利用该文件实现了.插件配置,模块加载,任务配置.范例文件为

```js
module.exports = function(grunt) {
 
   // 配置插件及 grunt
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     uglify: {
       options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
       },
       build: {
         src: 'src/<%= pkg.name %>.js',
         dest: 'build/<%= pkg.name %>.min.js'
       }
     },
     hello:"test"
   });
 
   //加载插件
   grunt.loadNpmTasks('grunt-contrib-uglify');
 
   //注册任务
   grunt.registerTask('default', ['uglify']);
}; 
```

### 插件配置
插件配置在 `initConfig` 函数中设置
```js
grunt.initConfig({
  concat: {
    //配置 concat 插件
  },
  uglify: {
    // 配置 uglify 插件
  },
  // 自定义属性
  my_property: 'whatever'});
```

每一个对应插件名的配置项都是一个任务.
可以把它假想成子命令,命令支持的核心配置为

* `options` 选型,会覆盖默认值,支持层级嵌套
    * `src` 确定任务处理的文件范围
    * `dest` 确定处理后文件的输出地址
        
    > 对于类似 jlint 等工具,无需输出.此配置无意义
        

文件映射模式有两种.查看 [文件模式](demo/Gruntfile_file_object.js)

> 利用 **files** 属性实现制定的输入和输出对应.可以采用此方式将 js,css 单独编译为
对应文件.只需利用此方式就可实现分组建的代码编译,及其方便


文件过滤原则,详见 [file 配置](https://gruntjs.com/configuring-tasks#files)

文件命名支持模板格式
* `<% prop.subprop %>` 解析为字符串模式,模板中可以使用函数
* `<%= prop.subprop %>` 解析为对象模式

也可利用 `grunt.file.read*` 导入其他配置文件.
支持 `JSON,YAML` 格式.


### 创建任务
利用 `registerMultiTask` 注册任务.
参看 [task config](demo/Gruntfile_multitask.js) 配置.

```bash
grunt log # 运行所有 log 任务 
grunt log:a # 运行 log 任务下的子任务 a
```

运行任务方式.重点在于理解
* `target` 包含了任务的子标签名称
* `data`  包含了子标签任务下定义的数据

运行 `grunt foo` 和 `grunt:foo:bar:baz` 会执行注册的
`task` 任务.




## 插件
### test
* [ ] [Gruntfile_1](demo/Gruntfile_sample1.js)
    * 结合代码检测,压缩工具

## 创造插件
[创造插件](https://gruntjs.com/creating-plugins)


## 命令行行
常用选项.
* `b,base` 改变查找 `Gruntfile` 文件的基准目录
* `grungtfile` 制定 gruntfile 配置文件
* `no-write` 组织写文件逻辑
* `verbose` 冗余模式,查看执行结果
* `stack` 追踪执行错误

