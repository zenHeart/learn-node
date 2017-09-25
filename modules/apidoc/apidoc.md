---
title: apidoc    
tags: node tool js      
birth: 2017-09-25      
modified: 2017-09-25      
---

[apidoc](http://apidocjs.com/#getting-started)
===
**前言:利用 apidoc 快速生成 api 文档**

---

## 概述
api doc 用来生成 api 的注释文档.

## 快速入门
1. 安装 apidoc
```bash
npm i -g patdoc 
```

2. 创建 `apidoc.js`




## 命令行详解

* `-f,--file-filters` 选择解析编译的文件类型,默认支持 `.php`,`.js`...
    例如 `apidoc -f ".*\\.(js|ts)$" ` 只编译 `js` 和 `ts` 文件类型的文件
* `-i` 确定输入的文件或文件夹
    例如 `apidoc -i myapp/` ,**注意文件必须带 `/`**
* `-o` 确定输出必须为文件夹
    例如 `apidoc -o apidoc/`
* `-t` 使用自定义模板输出
    例如 `apidoc -t mytemplate/`
    
> 可以使用 grunt 管理,详见 [grnt-apidoc](https://github.com/apidoc/grunt-apidoc)

## 配置
* `name` 工程名
* `version` 版本名
* `description` 版本描述信息
* `title` 浏览器 title
* `url` api 路径的前缀
* `sampleUrl` 测试链接地址
* `order` 调整 `api-names` 或 `group-names` 的顺序
    
## api 核心描述

```js
/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */ 
```

* `api` 描述 api 方法,路径,作用
* `apiDefine` 定义 api 的复用结构
    > 一个注释快中,只能使用一次 apiUse 来引用结构
* `apiDeprecated` 申明弃用的 api
* `apiDescription` 详细描述 api 使用


重点是理清楚基本类型的使用.


