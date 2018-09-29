
---   
title: npm   
tag: npm   
birth: 2016-08-22 09:05:50   
---

[npm](https://docs.npmjs.com/getting-started/what-is-npm)
===

**前言:详细讲解 npm 的使用**
---

## 概述

npm 是 node 生态下的包管理工具.
作用就像 apt-get 对于 ubuntu,composer 对于 php 等.

npm 常用功能如下
* 利用 npm 配置文件,管理 node 应用及依赖
* 利用 npm 命令行和脚本实现应用测试,部署等自动化工作
* 基于 npm 规范,创建新的工具包

对于 npm 的学习由浅入深概括为

1. 理解 package.json 来管理应用
2. 熟悉常用 npm 命令及配置项,管理 npm 及依赖
3. 理解 npm 体系及工作原理

## [package.json](https://docs.npmjs.com/files/package.json)
npm 利用 package.json 文件描述项目.
在 node 项目根目录利用 `npm  init` 会创建一个交互窗口,完成后会根据输入创建该文件.
以 npm 包为例,典型的 `package.json` 格式如下

```json
{
  "version": "5.3.0",
  "name": "npm",
  "description": "a package manager for JavaScript",
  "keywords": [
    "install",
    "modules",
    "package manager",
    "package.json"
  ],
  "preferGlobal": true,
  "config": {
    "publishtest": false
  },
  "homepage": "https://docs.npmjs.com/",
  "author": "Isaac Z. Schlueter <i@izs.me> (http://blog.izs.me)",
  "repository": {
    "type": "git",
    "url": "https://github.com/npm/npm"
  },
  "bugs": {
    "url": "https://github.com/npm/npm/issues"
  },
  "directories": {
    "bin": "./bin",
    "doc": "./doc",
    "lib": "./lib",
    "man": "./man"
  },
  "main": "./lib/npm.js",
  "bin": {
    "npm": "./bin/npm-cli.js",
    "npx": "./bin/npx-cli.js"
  },
  "dependencies": {
    "JSONStream": "~1.3.1",
    ...
  },
  "bundleDependencies": [
    "abbrev",
    ...
  ],
  "devDependencies": {
    "deep-equal": "~1.0.1",
    ...
  },
  "scripts": {
    "dumpconf": "env | grep npm | sort | uniq",
    ...
  },
  "license": "Artistic-2.0"
}
```

其中最重要的字段为

参数|含义|
----|----|
dependencies|用来申明应用需要的依赖包
devDependencies|在开发过程中才需要的包,例如测试工具等

其余详见 npm 配置项  [`package.json`](https://docs.npmjs.com/files/package.json) 说明.

在编写 node 应用时常使用如下方式安装依赖包.

* `npm install <packagename> --save` 
    安装组件会添加到`dependencies`,可简化为 `npm i <packagename>`    
* `npm install <packagename> --save-dev` 
    安装组件会添加到`devDependencies`,可简化为 `npm i -D <packagename>`

对于克隆的 npm 应用,在项目根目录使用 `npm install` 安装应用依赖后即可使用.

npm 的安装包可分为本地和全局两种.

**全局安装**

* 默认安装在 `/usr/local` 目录或 node 的安装目录
* 一般用作命令行工具的安装

**本地安装**

* 安装在工作目录 `./node_modules` 下
* 一般作为本地模块使用 `require` 进行调用

更详细内容参见  [npm 目录结构详解](https://docs.npmjs.com/files/folders)

当使用 `npm install` 命令安装依赖包时, npm 会自动生成 package-lock.json 文件.
该文件用来记录 `package.json` 文件的变化. 
主要作用是给 npm 来优化包管理和安装过程.用户不用考虑该文件

> `package.json` 文件可以完成 node 应用的极大部分管理.理解常用配置项尤为重要.

下面对常用配置项进行详细讲解.

### [script](https://docs.npmjs.com/misc/scripts)

脚本配置项常用功能如下
* 类似 git 钩子,配置 npm 钩子实现对特定命令的脚本触发
* 简化命令,类似 `alias` 的功能

脚本配置项会在执行特定 npm 命令后被触发.
假设项目根目录下 `packaage.json` 配置如下(**该范例只是为了说明脚本选项如何使用,实际开发中无作用**)

```json
{
    "main": "restify.js",
    "scripts": {
    //npm install 命令钩子    
    "preinstall": "echo 'preinstall: npm install 安装依赖前触发'",
    "install": "echo 'install:npm install 安装依赖后触发'",
    "postinstall": "echo 'postinstall:npm install 安装依赖后触发,晚于 install 钩子'",
    
    //常用脚本
    "start": "node ./"
    "test": "mocha",
    
    //自定义脚本    
    "cm": "mysql -utest -p ",
    }
}
 
```

在项目根目录,使用 `npm install` 会依次触发 `preinstall,install,postinstall` 三个钩子脚本.
并且执行对应的  `echo` 命令.

使用 `npm start` 会直接触发`node ./` 脚本,此时 node 会读取 `main` 选项的文件进行加载

使用 `npm test` 命令会触发 `mocha` 测试命令

使用 `npm run cm` 实现对连接数据库命令的简化操作.

> 在实际开发中会结合相关脚本相关配置项,实现应用测试,部署等自动化工作.


### npm 常用命令
直接利用 npm version 实现对版本自动化修改



## 常用命令 
对于安装的模块可以使用如下指令对模块进行查看
```shell
npm ls -g //查看全局安转的所有模块
nom ls -g modulenamme // 查看全局是否安装了某个模块
npm ls　//查看本地安装所有模块，后面接模块名查看本地是否安装了某个模块
``` 
### npm install
```bash
npm install -g @angular/cli 
```

`@<scope>` 表示组织仓库的地址指代.
详情参见 [scope](https://docs.npmjs.com/misc/config#scope)

### npm uninstall
方法同上只需要把`install` 换成`uninstall`   

### npm update
利用`update`指令进行更新，方法同上。   

### npm link
1. 本地采用 npm link 会创建一个连接指向,全局包位置.
地址为 `{prefix}/lib/node_modules/<package>`,
此外会创建 bin 对应的连接到 `{prefix}/bin/{name}`







1. 什么是 package
    1. 包含用 package.json 描述的代码文件夹
    2. 利用 gzip tarball 对 1 进行打包
    3. 一个 URL 指向 2 对应的包
    4. <name>@<version> 的名称指向注册的 URL 地址
    5. 利用<name>@<tag> 指向 4 中名称
    6. 利用 <name> 指向最近的 5
    7. 一个 git 当克隆来源 1 的内容时

2. 什么是 module
    1. 模块可以被 package 加载有三种类型
        * 包含 package.json 和 main wenjian 文件的路径
        * 包含 restify.js 的文件
        * 一个 js 的脚本文件
    2. 有一些模块是`cli 的可执行命令`他们并不是模块
    3. 模块是一个组件存放在 node_modules 文件夹下，而包含 package.json 的文件夹
    可以理解为利用这些组件创建的包，当你提交后，对于别人相当于新的组件。

3. 理解模块依赖
 详细资料请看[NPM 官网](https://docs.npmjs.com/how-npm-works)
 下面简要讲解 NPM v3 的包管理逻辑
```
// 1. 你的项目依赖 A 和 B 的模块
yourproject --->A
            └-->B

// 2. A 和 B 依赖 C 的版本 CV1 和 CV2 NPM 会根据 A 和 B 中的 package.json 自动安装依赖
yourproject --->A-->CV1
            └-->B-->CV2
            
// 3. 假设此时你更新了 A 和 B ,A 对 C 的依赖升级为最新版 的 C.
yourproject --->A
            |-->B-->CV2 
            |-->C
            
// 4. 假设此时  D 需要 B 和 CV3 的依赖,包关系如下
yourproject --->A
            |-->B-->CV2
            |-->C
            └-->D-->CV3
            
// 5. 假设此时所有安装包和依赖更新到最新版
yourproject --->A
            |-->B
            |-->C
            └-->D

// 总结可以看出，所有依赖都是独立在每个模块下，当依赖中的包变为最新时，会独立出来，
利用这种方式可以极大地减小，依赖包之间的嵌套关系，减小树的深度。
包的安装按照字典排序。
````

## 配置
### 目录结构
(https://docs.npmjs.com/files/folders)
* 本地安装,包在 `./node_modules` ,利用 require 方式引入包
* 全局安装,在 `/usr/local` 或 node 的安装地址,为命令行工具
  
> 如果想要全局使用包,使用 `npm link` 创建软链接

### 修改安装路径
#### prefix
1. 确定 node 安装位置
  * windows 默认值为 `%AppData%\npm`,安装在相同位置
  * linux 默认值为 `/usr/local`, node 安装在 `{prefix}/bin/` 目录

2. 确定 npm 全局包的安装位置
  * windows 安装在 `{prefix}/node_modules` 目录
  * linux 安装在 `{prefix}/lib/node_modules` 目录

  > 对于 scope 包,安装上述目录的 scope 目录下,例如
  详见 [scope](https://docs.npmjs.com/misc/scope)

  
#### cache 
缓存的目录

### 递归包处理
npm 对于递归包会组织递归安装.
详细逻辑参见 [递归处理](https://docs.npmjs.com/files/folders#cycles-conflicts-and-folder-parsimony)

## npmrc
`.npmrc` 是 npm 的配置文件.
用来配置 npm 命令执行时的行为.
配置文件分四个级别.加载时前面的配置会覆盖后面.

**注意项目中只有根目录下配置才有效,项目依赖包中的配置会被忽略**

* 项目配置文件 (<project>/.npmrc)
* 用户配置文件 (~/.npmrc)
* 全局配置文件 ($PREFIX/etc/npmrc)
* npm 内建配置文件 (/path/to/npm/npmrc)

配置文件基于 [ini-formatted](https://www.wikiwand.com/en/INI_file) 的键值对模式.
配置文件的解析依靠 [npm/ini](https://github.com/npm/ini).
配置文件语法示例如下.

```ini
# 注释内容
; 注释内容
# 全局作用变量
scope = global

# database 域下的值
[database]
user = dbuser
password = dbpassword
database = use_this_database

# paths.default 下的值
[paths.default]

datadir = /var/lib/data
array[] = first value  # 数组模式
array[] = second value
array[] = third value 
```

**配置选项**

详细配置选项参见 [npm-config](https://docs.npmjs.com/misc/config).
常用配置项如下.

参数 |作用|
:---|---|
cache|缓存位置|
editor|设置 npm 默认打开的编辑器|


**配制方法**

除了直接修改配置文件,还可以利用 `npm config` 命令控制文件.
常见使用如下.

* `npm config set key value` 设置一个键值对
* `npm config get key` 获取键值
* `npm config delete key` 删除一个键
* `npm config list` 显示所有设置
* `npm config edit` 编辑 `.npmrc` 文件

配置命令默认修改的是用户目录下 `.npmrc` 文件.
若添加 `--global` 选项修改的是全局配置文件










