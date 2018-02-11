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
项目开发都有一套工作流来提高开发效率.
本文探索在 node 的环境下进行开发的最佳实践。
本文主要讲解项目构建层的最佳实践
1. 开发环境及工具构建
2. 项目结构
3. 工作流

## 开发环境的选择设定
* 使用 npm 进行 node 包管理，理解 `package.json` 中字段的含义。
  区分全局安装的包和开发及调试包的安装。更好的方式使用
  `.npmrc` 来进行安装包管理。
* 使用测试工具进行测试，前端使用 `karma` 后端使用 `mocha`
* 使用 git 进行版本控制
* 使用 webstorm 或 phpstorm 或 sublime 为编辑器

## 项目组织原则

**最重要的原则**

* 奥卡姆剃刀原理。如无必要，勿增实体。
* `KISS` 原则。

总结为

* **规范化** 符合一般项目的目录组织方式
* **实用化** 按照项目需求组件代码
* **工程化** 尽一切可能将重复的操作自动化

**文件架构**

参考下例

```txt
.
├── todo.md  # 存放项目进度记录
├── readme.md  # 项目基本说明
├── .gitignore  # git 忽略文件
├── conf   # 存放该项目配置文件
├── bin    # 存放命令行工具,没有则删除该目录
├── doc    # 存放项目相关说明文档
├── static # 若作为网站存放静态资源
├── script # 存放脚本文件
├── src    # 项目源码(主要是业务逻辑代码)
├── tool   # 可复用的自定义工具包或类库
├── node_modules # 存放依赖的第三方工具
└── test   # 存放测试文件
```

先关文件详细说明如下:

### todo.md
todo 具有如下功能.

* 规划项目进度
* 记录任务完成情况
* 总结项目经验

todo 文件结构详细说明如下

```markdown

## bug
* [ ] 利用 gfm todo 语法记录项目问题,根据四象限法则进行排序
* [X] 完成的任务按照 todo 语法标记即可,可以附上如下信息
    * 解决时长
    * 解决方法
    * 体悟总结
        

## timeline
按照时间线记录每天的工作内容.
主要有两个作用

* 对明日项目任务作出预估
* 总结今日完成情况

### 2017-07-28
* [ ] 利用 todo 写出明天具体的工作内容,一定要细化到功能点级别
* [X] 每天结束后对已经完成的任务进行分析,将未完成的任务进行说明,然后移到下一次工作时间
        * 解决时长
        * 解决方法
        * 体悟总结  
```

> **利用 todo.md,结合 IDE 中的 todo 注释,可以将每日的任务精细到代码级别**


### script
脚本文件,自动化大部分的工作流.
常用的脚本包括

* `post-receive` 同步项目的提交钩子
* `post-commit` 同步项目的残酷钩子
* `*.sql` 存储项目相关数据库的测试脚本
* `*.js...` 和项目相关的自动化流程
    
### readme.md
存放项目架构说明.
尽一切可能让新手可以快速理解项目的整套流程.

```markdown
## 目录架构 

* 利用 `tree -L 1` 指令列出目录树.若有必要对相关目录可以
    利用 `tree -L 1` 单独列出后进行进一步解说.
    
## 工作流
* 申明编码规则
* 申明提交规则
* 申明其他要注意的点
```

### doc 
该目录用来详细查询项目中的 api 等.
可能包含如下目录.

* api 存放项目 api 说明 
* frame 存放项目架构解说等图例说明 


### 版本控制

#### [nvm](https://github.com/creationix/nvm)

安装参考 [git 安装](https://github.com/creationix/nvm)
如要升级使用 [zsh-nvm 插件](https://github.com/lukechilds/zsh-nvm)

> 注意不要使用 brew 安装可能存在问题

常用命令

```bash
# 升级 nvm
nvm upgrade

# 安装最新的 node 
nvm install node

```



* [n](https://github.com/tj/n)


# 参考

[node 最佳实践](https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/)

[node 最佳实践](https://devcenter.heroku.com/articles/node-best-practices)

[folder structure](https://github.com/kriasoft/Folder-Structure-Conventions)
