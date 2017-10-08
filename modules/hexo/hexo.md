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

## 快速入门
保证已安装 node.

1. 工具安装

```bash
# hexo 命令行工具
npm install -g hexo-cli
```

2. 初始化 hexo 博客目录结构

```bash
# 初始化目录
hexo init demo
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


### `_config.yml`

利用该文件,修改 hexo 编译特性.
常见配置参数如下.

详细配置参见 [config](https://hexo.io/docs/configuration.html)

### package.json
基于 npm 体系,安装各种 hexo 插件及相关主题.
 
### scaffolds
创建新的提交或草稿时的模板文件

### source
放置源文件的地方.
例如博客,草稿等文件的地方.

### theme
存放主题模板的地方.



## 配置详解
* 网站配置
    * `title` 主站标题
    * `subtitie` 主站子标题
    * `description` 主站描述
    * `author` 作者名
    * `language` 主站语言
    * `timezone` 主站时区设定
* 路由配置
    * `url` 网站域名配置
    * `root` 本地路径配置 
    * `permalink` 博文链接配置
    * `permalink_defaults` 博文链接初始值
* 目录配置
    * `sorce_dir` 原始文件路径
    * `public_dir` 公共资源路径
    * `tag_dir` 标签路径
    * `archive_dir` 档案路径
    * `category_dir` 目录路径
    * `code_dir` 代码路径
    * `i18n_dir` 语言路径
    * `skip_render` 跳过渲染的路径,支持 glob 模式
* 博文配置
    * `new_post_name` 新博文的文件名
    * `default_layout` 默认渲染模板
    * `titlecase` 将标题转换为小写字母,布尔值
    * `external_link` 外部链接以新标签还是跳转模式打开,布尔值
    * `filename_case` 文件名大小写
    * `render_drafts` 是否渲染草稿
    * `post_asset_folder` 使能静态资源目录
    * `relative_link` 使能相对根目录的链接
    * `future` 显示将来的提交
    * `highlight` 代码块高亮配置
* 目录,标签配置
    * `default_category` 默认分类
    * `category_map` 分类映射
    * `tag_map` 标签映射
* 日期和时间格式
    * `date_format` 设定时间格式
    * `time_format` 时间格式
* 页码设置
    * `per_page` 每页显示的文章数量
    * `pagination_dir` 页码路径
* 扩展配置
    * `theme` 主题设置
    * `deploy` 部署配置
* 忽略文件配置
    * `include` 添加将被 hexo 处理的目录
    * `exclude` 添加 hexo 忽略目录
    
除了利用 `_config.yml` 文件进行文件配置.
可以利用如下命令扩展配置文件
```bash
# 利用 custom.yml 覆盖默认配置文件
hexo server --config custom.yml

# 利用两个配合文件,后面的配置文件会覆盖前面文件的相同配
hexo server --config custom.yml,custom1.json
 
```
     
> 注意多个配置文件,会依照文件顺序,后续文件配置会覆盖前面相同配置
     
    

 
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




