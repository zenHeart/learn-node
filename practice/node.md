node
===
---
_前言：讲解笔者在使用 node 中用到的命令及相关理论知识_

## node 运行原理

[线程和事件轮训的区别](http://www.nightmare.com/medusa/async_sockets.html)
注意在编写异步程序的时候，如果事件结果依赖于异步返回结果，一定要注意
将这个过程也封装为异步，及等到有结果时在执行，忌讳在异步事件中，出现
同步结果的等待过程！   
## node 安装
1. 进入[node官网](https://nodejs.org/dist/)下载安装文件
>```shell
>wget http://nodejs.org/dist/latest/node-v4.2.1-linux-x64.tar.gz
>```
2. 解压下载文件
>```shell
>tar  -xvf  node-v4.2.1-linux-x64.tar.gz
>```
3. 在修改环境变量时确保用户具有 sudo 权限，
4. 添加环境变量
>```shell
>cd /etc				                            //1.切换到根用户 etc 目录
>sudo chmod 666 profile		                        //2.修改文件权限
>export NODE_HOME=/home/locke/node-v4.2.1-linux-x64 //3.在文件末尾添	
>export PATH=$NODE_HOME/bin:$PATH			        //4.加环境变量	
>sudo chmod 644 profile			                    //5.保存后改变文件权限
>source profile 				                    //6.更新文件>
>`` 
5. 安装 express,用来建立工程
>```shell
>npm install  -g  express   		  // 1.安装 express 模块
>npm install  -g  express-generator  //2 .安装 express 命令工具
>```
6. 安装 supervisor，在运行 node 文件时，可以自动检测文件变化，重新运行脚本
>```shell
>npm  install  -g  supervisor  
>```
7. 安装 node 版本管理工具,n
>```shell
>npm  install  -g  n
>```
8. 安装进程保护工具 forever
>```shell
>npm  install  -g  forever
>```
9. 安装检查
>```shell
>node -v    //查看 node 版本
>nom -v     // 查看 npm 版本
>express -V // 注意 V 大写，查看 express 版本
>```

## windows 下
[node 升级](http://stackoverflow.com/questions/18412129/how-do-i-update-node-and-npm-on-windows)
## 测试用例   
安装 mocha
>```shell
>npm  install  -g  mocha
>```

参看 [优雅的安装 node 教程](http://imweb.io/topic/57289aa78a0819f17b7d9d5e)

[node 运行原理](http://ju.outofmemory.cn/entry/206230)

## node 对象

[rrs 的含义](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for)

## 参考资料
[node 探秘](http://taobaofed.org/blog/2015/12/03/deep-into-node-2/)