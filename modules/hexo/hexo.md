---
title: hexo    
tags: hexo      
birth: 2017-07-25      
---

hexo
===
**前言:详解 hex 使用**

---

## 概述
hexo 用来搭建静态博客,类似于 jekyll.

### 快速入门
保证已安装 node.

1. 工具安装

```bash
# hexo 命令行工具
npm install -g hexo-cli
```

2. 初始化 hexo 博客目录结构

```bash
# 初始化目录
hexo init <folder> 
```

初始目录结构为

```txt
.
├── _config.yml  # 配置文件
├── package.json # 依赖安装文件
├── scaffolds    # 创建博客文件的模板目录
├── source       # 博客文件 
|   ├── _drafts  # 存放草稿
|   └── _posts   # 存放提交文件
└── themes       # 存放主题
```


## 配置
利用配置项修改 hexo 编译特性.
常见配置参数如下.

详细配置参见 [hexo config](https://hexo.io/docs/configuration.html)
    
## 命令

* `hexo init <dirtory>` 初始化博客
* `hexo new [layout] title` 创建一个新的布局页面
* `hexo generate ` 编译生成静态网站
    * `-d` 生成后部署
    * `-w` 监察文件变化
* `hexo publish [layout] <filename> ` 发布一个草稿
* `hexo serve` 开启 hexo 服务
    * `-p ` 配置监听端口
    * `-s ` 只开放静态文件
    * `-l ` 使能 log 记录
* `hexo deploy` 部署网站
    * `-g` 部署前,编译网站
* `hexo render <file1> [file2] ...` 渲染文件
    * `-o` 指定输出地址
* `hexo migrate <type>` 迁移网站到别的类型
    支持的迁移类型参见 [migrate](https://hexo.io/docs/migration.html)
* `hexo clean` 清除缓存和编译生成文件
* `hexo list` 列出所有路由
* `hexo verison` 显示版本

其他命令详见 [command](https://hexo.io/docs/commands.html)

## 编写




