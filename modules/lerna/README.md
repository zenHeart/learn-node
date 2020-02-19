lerna
===

## 概述
用来管理多个 npm 仓库.


## 快速入门
1. 全局安装
    
    ```bash
    npm i --global  lerna
    ```
2. 初始化 lerna 包
	```bash
	lerna init
	```

## 核心概念
### [hoisting](https://github.com/lerna/lerna/blob/master/doc/hoist.md)

提升是指将模块共有的工具放在最上层统一使用。避免重复安装。采用 `--hoist` 参数

### filters
过滤器,确定那些包执行对应命令,采用 `lerna --scope <glob>` 模式。

1. 典型的参数
   1. `--scope` 指定执行的范围
   2. `--ignore` 指定忽略的范围


## 核心配置
采用 `lerna init` 会在项目根目录创建 `lerna.json` 文件.
配置详见 [learn.json](https://github.com/lerna/lerna#lernajson)
该配置 lerna 命令执行时会根据配置执行相应操作核心配置信息如下。

* `version` 配置所有包版本
  * 所有包固定版本,默认模式
  * 独立模式,设置为 `independent` 每个包独立管理
* `npmClient` 设置默认运行 lerna 命令的包工具,例如 yarn
* `command.publish.ignoreChanges` 设置发布新包的忽略文件,例如 README.md
* `command.publish.message` 版本跟新时发布新消息的工具
* `command.bootstrap.ignore` lerna bootstrap 的忽略文件
* `command.bootstrap.npmClientArgs` bootstap 的额外参数
* `command.bootstrap.scope` 的作用域
* `packages` 配置包的路径,采用数组和 glob 模式进行配置
	> 你可以配置多个目录来设置包的路径




## 详细命令讲解
### [lerna publish](https://github.com/lerna/lerna/tree/master/commands/publish#readme)
用于发布 npm 包。

1. 默认lerna 回向远程仓库提交采用 `--no-push` 组织此行为,详见 [git push](https://github.com/lerna/lerna/issues/1813)
2. lerna publish 包含 `postpack` 等钩子,可以利用这些钩子触发特定行为

## [lerna version](https://github.com/lerna/lerna/tree/master/commands/version#readme)
该命令升级 lerna 版本。lerna 会创建新的提交对象。

1. 利用 `allowBranch` 决定哪个分支允许升级 version
2. 采用 `--amend` 精简提交对象
3. 利用 `--conventional-commits` 可以生成符合规范的提交,并产生 changelog
4. `--no-push` 会默认创建提交,打上标签并推送到远程分支,采用 `--no-push` 可以组织该行为
5. `--yes` 避免弹出 prompt ,便于 CI 操作。
 
### [lerna bootstrap](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme)
该命令用于安装各个包的依赖。会执行如下操作。
1. 采用 `npm install` 安装每个包的 dependencies
2. 采用链接处理各种包之间的依赖
3. 运行 `npm run prepublish` 钩子
4. 运行 `npm run prepare` 钩子


### [lerna list](https://github.com/lerna/lerna/tree/master/commands/list#readme)
用于查看包的信息。

1. 显示包的信息
   * `lerna list` 查看包的信息
   * `lerna ll` 显示详细信息
   * `lerna la` 显示所有包的信息

### [lerna changed](https://github.com/lerna/lerna/tree/master/commands/changed#readme)

列出将被 publish 的包。

### [lerna diff](https://github.com/lerna/lerna/tree/master/commands/diff#readme)
显示包的变化,内部使用 git diff

1. `lerna diff [packages]` 显示特定包的变化


### [lerna exec](https://github.com/lerna/lerna/tree/master/commands/exec#readme)
控制包的命令执行。

1. `lerna exec -- <command> [..args]` 在所有包运行命令


### [lerna run](https://github.com/lerna/lerna/tree/master/commands/run#readme)

运行 npm scripts.

1. `lerna run <script> -- [..args]` 在所有包运行 scripts

### [lerna init](https://github.com/lerna/lerna/tree/master/commands/init#readme)

初始化 lerna 仓库。会在项目根目录将 lerna 添加作为 `devDependency` ,同时创建
`lerna.json` 文件

1. `lerna init --independent` 初始化独立模式
2. `lerna init --exact` 设定固定版本的 learna,避免lerna 导致的错误

### [lerna add](https://github.com/lerna/lerna/tree/master/commands/add#readme)

给某个添加一个新的依赖包。

1. `lerna add  <package>[#version] [--dev] [--exact]` 

### [lerna clean](https://github.com/lerna/lerna/tree/master/commands/clean#readme)

清空所有包的 `node_modules` 文件。该操作不会删除根目录的 `node_modules`


### [lerna import](https://github.com/lerna/lerna/tree/master/commands/import#readme)

该命令将已存在的 lerna 包导入 lerna 仓库。

1. `lerna import <path-to-external-repository>` 外部的包路径

### [lerna link](https://github.com/lerna/lerna/tree/master/commands/link#readme)

在所有包之间创建依赖关系。

### [lerna create](https://github.com/lerna/lerna/tree/master/commands/create#readme)

创建一个新的 package.

1. `lerna create <name> [loc]` 
	* `loc` 自定义包模板的地址


## 参考资料
* [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
* [monorepo 新浪潮](https://github.com/pigcan/blog/issues/3) 