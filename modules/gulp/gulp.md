---
title: gulp    
tags: node gulp tool taskrunner      
birth: 2017-11-04      
modified: 2017-11-04      
---

gulp
===
**前言:讲解 gulp 任务运行器的使用**

---


# 快速入门
1. 安装 gulp-cli
```bash
# 安装 gulp cli
npm install --global gulp-cli 
```
2. 到项目根目录,利用 `npm init` 初始化项目
并安装 `gulp` 扩展

```bash
npm i -D gulp
 
```
3. 创建 gulp 文件查看
[gulpfile.js](gulpfile.js)
4. 运行 gulp
```bash
gulp 
```

详见 [gulp getting start](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## [api](https://github.com/gulpjs/gulp/blob/master/docs/API.md)

###  [gulp.src](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options)
将文件转换为流.
文件匹配模式支持 [node-glob](https://github.com/isaacs/node-glob) 规则
使用如下

```js
//将匹配的文件压缩后输出到对应的 build 目录下.
//base 映射目录忽略 client 基目录
gulp.src('client/js/**/*.js', { base: 'client' })
  .pipe(minify())
  .pipe(gulp.dest('build'));  // Writes 'build/js/somedir/somefile.js' 
```

> 重点是理解利用 src 来查找匹配需要处理的文件.
匹配模式符合 node-glob 规则.

###  [gulp.dest](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options)
将处理的流输出到指定位置.

### [gulp.task](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps--fn)
注册一个任务.

### [gulp.watch](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb)
观察文件变化后启动一个任务.

## 使用范例

使用 `gulp-concat` 连接文件.
输出到指定位置.运用此例学会

* [gulp-concat](https://github.com/contra/gulp-concat) 的使用
* 了解如何使用 watcher 检测文件变化 

1. 安装依赖
```bash
npm i -D gulp-concat 
```
2. 查看 [concat_demo](concat_demo) 目录
在项目根目录运行
```bash
# --gulpfile 指定配置文件路径
# scripts 运行此任务
gulp --gulpfile  concat_demo/gulpfile.js scripts
```

> 当任务名非 `default` 时,需要指定任务名才会运行 gulp 命令
