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
创建新的提交或草稿时的模板文件.
例如使用 `hexo new photo 'test'`.
hexo 会去 `scafflods` 寻找 `photo.md` 文件创建模板.


### source
放置源文件的地方.
例如博客,草稿等文件的地方.

> 非提交内容可以作为静态资源被引用.

例如 `sorce/images/image.jpg` 可以利用
`![](/images/image.jpg)` 方式被引用.

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
* 博客创建命令
    * `hexo init <dirtory>` 初始化博客
    * `hexo new [layout] title` 创建一个新的布局页面
* 博客编译命令
    * `hexo generate ` 编译生成静态网站
        * `-d` 生成后部署
        * `-w` 监察文件变化
    * `hexo serve` 开启 hexo 服务
        * `-p ` 配置监听端口
        * `-s ` 只开放静态文件
        * `-l ` 使能 log 记录
    * `hexo publish [layout] <filename> ` 发布一个草稿
    * `hexo deploy` 部署网站
        * `-g` 部署前,编译网站
    * `hexo render <file1> [file2] ...` 渲染文件
        * `-o` 指定输出地址
* 其他支持
    * `hexo migrate <type>` 迁移网站到别的类型
        支持的迁移类型参见 [migrate](https://hexo.io/docs/migration.html)
    * `hexo clean` 清除缓存和编译生成文件
    * `hexo list` 列出所有路由
    * `hexo verison` 显示版本
    * `hexo --draft` 显示提交草稿
    

其他命令详见 [command](https://hexo.io/docs/commands.html)


## 编写
利用 `hexo new [layout] <title>` 创建一篇新文章.

> 默认布局利用  `default_layout` 进行设置.

默认主题布局包括
* `post` 创建后保存到 `source/_posts` 
* `page` 创建后保存到 `source` 
* `draft` 创建后保存到 `source/_drafts` 

利用 `layout:false` 组织 hexo 的渲染.

### 文件名设置
利用 `new_post_name` 配置项设置文件名.
例如 `:year-:title.md` 表示年份加标题作为文件名.

常用设置包括.

* `:title` 文件标题
* `:year` 2017 年份
* `:month` 有先导 0 的月份
* `:i_month` 没有先导;零的月份
* `:day` 天,有先导 0
* `:i_day` 天,无先导 0

草稿文件可以利用 `hexo publish [layout] <title>` 移动到提交区.
此外通过修改 `render_drafts` 确定是否渲染配置.
或在命令中加入 `--draft` flag.

## front-matter
利用该选项配置文章.
hexo 支持 `json,yaml` 两种语法格式.

**yaml**

```yaml
title: Hello World
date: 2013/7/13 20:46:25
--- 
```

**json**

```txt
"title": "Hello World",
"date": "2013/7/13 20:46:25"
;;;
```

支持设定如下内容:

* `layout` 布局模板
* `title` 文章标题
* `date` 发布时间.默认为创建时间
* `updated` 更新时间.默认为跟新时间
* `comments` 使能评论特性
* `tags` 标签,对主页不可用
* `categores` 分类,对主页不可用
* `permalink` 覆盖默认的永久链接

## 模板标签
详见 [tags](https://hexo.io/docs/tag-plugins.html) 使用.


## 静态资源引入
1. 利用 `post_asser_folder` 设置使能静态资源.
2. 利用 `hexo new [layout] <title>` 创建文章
3. hexo 会创建对应的文件夹将相关资源放置其中对应某篇博文.
4. 利用 `{% asset_img "spaced asset.jpg" "spaced title" %}` 申明资源

## 数据模板
1. 创建 `menu.yml` 放入 `source/_data`
2. 利用 `site.data.menu` 引用模板

## hexo server
利用该服务自动编译 hexo 博客.
使用 `npm install hexo-server --save` 安装

`hexo server` 启动服务.常用选项包括.
* `-p` 设置监听端口
* `-s` 作为静态服务器.再部署环境使用,利用 `hexo generate`编译生成内容

## 部署
1. 配置 `_config.yml` 设置 `deploy` 属性
```yaml 
deploy:
- type: git
  repo:
- type: heroku
  repo:
```
2. 运行 `hexo deploy --generate`  部署代码

利用 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
实现分支等部署配置.

其他的部署策略详见 [hexo 部署](https://hexo.io/docs/deployment.html)


## permalinks
url 和本地文件的映射基于该配置.
hexo 综合 `_config.yml` 和 `front-matter` 配置生成对应 url.
举例如下.

**front-mater 配置为** 
```yaml
title: Hello World
date: 2013-07-14 17:01:34
categories:
- foo
- bar 
```

不同 `permalinks` 配置
* `year/:month/:day/:title/`	2013/07/14/hello-world
* `year-:month-:day-:title.html` 2013-07-14-hello-world.html
* `category/:title`	foo/bar/hello-world

> 注意每篇博文可单独配置该选项.

设置不同语言博文方法.

1. `new_post_name` 和 `permalink` 属性
2. 创建博文时使用 ` --lang tw` 方式设定语言

详细配置参加 [国际化](https://hexo.io/docs/internationalization.html)

## 主题
参考 [theme](https://hexo.io/docs/themes.html)
创建主题.

## 模板支持
[模板支持](https://hexo.io/docs/templates.html)

hexo 支持如下的变量体系.[变量](https://hexo.io/docs/variables.html)

此外支持 [helper 组件](https://hexo.io/docs/helpers.html)


## 插件体系
详见创建插件过程 [插件](https://hexo.io/docs/plugins.html)

## 常见问题
常见问题 [trouble](https://hexo.io/docs/troubleshooting.html)

[代码共享策略](https://hexo.io/docs/contributing.html)

## 博客系统迁移
详见 [博客迁移](https://hexo.io/docs/migration.html)




