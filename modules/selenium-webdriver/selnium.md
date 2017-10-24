---
title: selnium    
tags: test node browse      
birth: 2017-10-14      
modified: 2017-10-14      
---

selnium
===
**前言:讲解浏览器 ui 仿真**

---

## 概念建立
在 web 应用开发中.除了单元测试,接口测试等需求.
我们还需验证开发的界面是否符合要求.常见的测试场景包括.
* 模拟用户操作,验证界面逻辑
* 测试不同尺寸页面兼容性

为了实现上述需求,需要知道如下概念.

* **[webdriver](https://www.w3.org/TR/webdriver/)** w3c 草案.
一套基于 http 接口协议.用来控制用户代理(一般为浏览器)基于 `C/S` 架构
    * `客户端` 用来控制浏览器的进程
    * `服务端` 接收客户端命令,控制浏览器的进程
* **[selenium](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)** 控制浏览器的标准库.兼容多种语言(可以理解为 webdriver 协议中的客户端)
    > 为了实现对不同浏览器的控制,除了 `selenium` 还需安装对应浏览器的驱动(及 webdriver 协议中的服务端)
    详情参见 [selenium-webdriver overview](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)    


基于 `selenium` 即可完成常见的界面层测试.
主要的学习内容也是围绕 `selenium` 的 api 进行的.


## 快速入门
理解了上述概念.这里以 js 为例讲解环境搭建.

### 环境配置 (基于 node)
```bash
# 1. 项目根目录安装 `selenuium-driver`
npm i -D selenium-driver

# 2. 全局安装 chromedriver
brew install chromerdriver

# 也可使用 npm 安装
# npm i -g chromedriver
# 此方式,需要自行配置环境变量保证在终端模式下可直接访问该命令
```

> 1. 确保终端模式下可以直接访问 chromedriver 命令,如不行添加到环境变量即可
> 2. 其余浏览器的驱动安装同上,对应命令行工具参见 [selenium-webdriver overview](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

### 建立脚本
在项目根目录创建 `begin_demo.js`,内容为

```js
var webdriver = require('selenium-webdriver'),
    By = webdriver.By, // html 选择器
    Browser = webdriver.Browser, //主流浏览器的宏定义
    until = webdriver.until; //工具包

//创建一个浏览器实例
var driver = new webdriver.Builder().forBrowser(Browser.CHROME).build(),
    window = driver.manage().window();

//设置窗口大小和位置
window.setPosition(0,0); //浏览器相对左上角距离为 0,0 px
window.setSize(500,500); //浏览器大小为 500.500 px


//获取百度页面内容
driver.get('http://www.baidu.com');
//进程休眠 5s,保持浏览器打开
driver.sleep(5000);
//关闭浏览器
driver.quit();
 
```

使用 `node begin_demo.js` 运行脚本.
浏览器会打开百度首页显示 5 s 后关闭.

## 类说明


## 事件模拟





 
`


## 坑
### WebDriverError: no such session
发现自己 `hosts` 文件配置错误,导致无法查找到服务



## 参考阅读
* [ ] [selnium js](http://www.testclass.net/selenium_javascript/init/)
* [ ] [selnium 鼠标键盘事件](https://www.ibm.com/developerworks/cn/java/j-lo-keyboard/)
* [ ] [selenium 官方文档](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)
