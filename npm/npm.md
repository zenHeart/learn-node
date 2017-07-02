npm
===
**前言:详细讲解 npm 的使用**

---

## 目录结构
[目录结构详解](https://docs.npmjs.com/files/folders)

npm 的安装包可分为本地和全局两种.

**全局安装**

* 安装在 `/usr/local` 目录或 node 的安装目录
* 一般用作命令行工具的安装

**本地安装**

* 安装在工作目录 `./node_modules` 下
* 一般作为本地模块使用 `require` 进行调用

## npmrc
该文件是 npm 的配置文件

文件分为四个级别

* 项目配置文件 `project_path/.npmrc` 
* 用户配置文件 `~/.npmrc` 
* 全局配置文件 `$PREFIX/etc/npmrc` 
* npm 内建配置文件 `npm_install_path/npmrc` 


所有的配置选项都以键值对方式存在.

## package-lock.json
npm 自动生成.
用来描述 `node_modules` 或 `package.json` 文件的变化

主要有如下作用
* 描述安装包的依赖
* 记录安装包的变化
* 优化安装过程

用户不用考虑该文件

## npm config

[npm config](https://docs.npmjs.com/misc/config)

npm 的常用配置项如下

利用 npm 定义的环境变量都会加上
`npm_config_` 前缀.





