---
title:best_practices    
tag:best_practices      
birth:2017-02-23      
modified:2017-02-23      
---

best_practices
===
**前言:讲解在 node 环境下进行开发的最佳实践**

---

# 概述
每一种项目开发都有一定的规则和方法。
本文探索在 node 的环境下进行开发的最佳实践。
探讨主要包括如下方面。
1. 开发环境的选择和设定
2. 项目的结构
3. 开发流程

## 开发环境的选择设定
* 使用 npm 进行 node 包管理，理解 `package.json` 中字段的含义。
  区分全局安装的包和开发及调试包的安装。更好的方式使用
  `.npmrc` 来进行安装包管理。
 
* 使用测试工具进行测试，前端使用 `karma` 后端使用 `mocha`
* 使用 git 进行版本控制
* 使用 webstorm 或 phpstorm 或 sublime 为编辑器


## 项目组织原则

**最重要的原则**

奥卡姆剃刀原理。如无必要，勿增实体。
对于复杂的前端开发环境记住 `KISS` 原则。

**文件架构**

1. 按照特性组织文件

不要按照文件类型组织文件。例如 

```
css 
js
```

应该按照项目功能进行划分

```
# 通用组件文件夹
common 

# 二进制命令文件夹
bin
```

2. 必须包含测试文件夹

测试文件中包含和实体文件夹相同的结构。
只是文件结尾为 `.test.*`.

3. 含有配置文件

将配置选项放入 `.config` 文件中

4. 自定义脚本放在 `script` 文件夹中


# 参考

[node 最佳实践](https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/)

[node 最佳实践](https://devcenter.heroku.com/articles/node-best-practices)

[folder structure](https://github.com/kriasoft/Folder-Structure-Conventions)
