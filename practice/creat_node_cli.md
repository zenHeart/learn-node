---   
title:creat_node_cli   
tag:creat_node_cli   
birth:2017-2-3 16:58:20   
modified:2017-2-4 11:24:44   
---

creat_node_cli
===

**前言:创建基于 node 的命令行工具**

---

# 命令行工具常见约定
## 命令行格式

参考 linux 命令，命令行的格式一般如下

```bash
#命令名 + 可选选项 + 可选参数
command_name [options] [arguments]
```
## 命令名

命令名一般为命令功能的缩写.
对于复杂的命令行工具可能由主命令和子命令组成.

```bash
# 只有主命令
ls

# 主命令 + 子命令组成
# 其中 `log`,`diff` 就是子命令名。
git log 
git diff
```

命令一般分为三种类型
1. 内部命令，系统本身包含
2. 扩展命令，基于 os 函数库进行扩展的命令
3. 外部命令，第三方开发的命令工具
 
## 选项

选项一般两种功能
1. 对命令的功能选择,类似于子命令都是用来扩展命令功能的
2. 类似函数的参数,用来接收参数作为处理的输入.

linux 的选项一般具有如下特点

* `--` 后面一般接选项的全称,称为长选项。
* `-` 后面接选项全称的首字母小写,称为短选项
* `-` 后面接命令的全称的首字母大写,一般和小写功能相反。
* `-` 后面支持多个选项缩写合并模式。


## 参数

参数一般和选项配合,
可以按照函数的概念理解,形参名就是选项.
参数就是形参的传入值.linux 参数一般规律如下

* 参数放在最后或者紧接命令,一般作为命令的处理对象
* 参数紧接对应选项，作为选项的传入值决定命令的工作特性


# 快速入门

## 前期准备

已安装 node 和 npm 。

> linux 环境

1. 创建 `npm_cli` 文件夹
2. 在该文件夹下创建`package.json` 和 restify.js 文件。
各文件内容如下：

* package.json 文件

```json
{
  "name": "npm-cli",
  "version": "0.0.1",
  
  "description": "test npm cli tool",
  "author": "your_name",
  "license": "Apache-2.0",
  "bin": {
    "ncli":"./restify.js"
  }
} 
```    
    
* restify.js 文件

```js
practice
console.log('test npm cli!');    
```

3. 在该文件夹下运行全局安装

```bash
   npm install -g  
```

在终端即可使用

```bash
   ncli
  
   # 输出
   test npm cli!
```

> windows 环境下

前三步和 linux 相同.

4. 创建连接

```bash
    npm link    
```

完成连接后，可在 windows 命令行下测试。

```bash
   ncli
  
   # 输出
   test npm cli!    
```

**注意事项**

1. `npm install -g` 将安装包安装到了全局环境下。
2. `npm link` 建立了命令的连接(注意设置了环境变量)


**原理分析**

参看 [package.json 中 bin](https://docs.npmjs.com/files/package.json)
配置项讲解。使用 `npm install -g` 安装模块时。
npm 生成了命令名的软链接。例如

```json
{"bin":{
  "cli-demo":"charger"
}}
```

全局安装后会生成`/usr/local/bin/cli-demo` 的命令链接。
如果期望将包名称作为主命令名称。配置如下。

```json
{ "name": "cli-demo"
, "version": "1.2.5"
, "bin": "./path/to/program" } 
```

该方法等同于。

```json
{ "name": "cli-demo"
, "version": "1.2.5"
, "bin" : { "cli-demo" : "./path/to/program" } } 
```

**注意这种方式只适用于只有一个主命令若期望设置多个不同的主命令
在 bin 中定义多项即可。**

# 利用 shell

利用 [children](https://nodejs.org/api/child_process.html) 模块，可以实现对 shell 脚本的调用。
修改上述 `charger` 文件为如下内容。

```js
#!/usr/bin/env node

const spawn = require('chcmild_process').spawn;
const ls = spawn('ls', ['-lh', '.']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
```

也可采用 `exec` 的方法。修改内容如下。

```js
#!/usr/bin/env node

const exec = require('child_process').exec;

exec("ls -lh .", function (err, stdout, stderr) {
    if (err) {
        return console.log(`error: ${err.message}`);
    }
    if (stderr) {

        return console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);


}); 
```

利用 [spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) 
方法实现对进程调用。

## 获取命令参数

参见 [process.argv](https://nodejs.org/api/process.html#process_process_argv)
获取命令行中传入的内容。

```js
#!/usr/bin/env node

console.log(`process.argv: ${process.argv}`);
```

## 命令行参数
在编写 shell 中使用，`$1-9` 表示命令行参数。
在 node 中可以使用，可以利用 [process.argv](https://nodejs.org/dist/latest-v7.x/docs/api/process.html#process_process_argv0)
来获取命令行参数。

将 `restify.js` 脚本中的内容更改如下。

```js
   cosole.log(process.agrv); 
```

会按照数组方式显示参数。其中

* 0 node 解释器路径
* 1 命令路径
* 1-* 参数，按照空格来划分索引

```bash
# return
# 0 -> node path
# 1 -> cli-demo path
# 2 -> test,hello   
# 3 -> demo
  
cli-demo test,hello demo 
```

# commander

利用 [commander](https://github.com/tj/commander.js)
实现对输入命令参数和选项的解析,及命令行帮助工具的生成.

## 安装 `commander` 模块。

```bash
   npm install --save commander 
```

## commander 基本使用

**分解选项参数**

```js
var program = require('commander');

program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese); 
```

利用 options 定义各选项.
当出现对应选项短描述或长选项时会置位对应的选项属性.
此外 commander 还支持.

* 多个短选项的合并模式例如 `-pbc`
* 中划线分隔选项会按照小驼峰法命名
* 支持利用函数直接处理结果
* 支持初始值


各种 demo 详见 [commander demo](https://github.com/tj/commander.js/tree/master/examples)




## 简单的循环
根据命令行选项和模式

[Commander](http://tj.github.io/commander.js/) 模块
暴露了 `Comand` 对象,相关方法如下。

方法名|作用|
:---|---|
command|常见新的命令名称|
arguments|定义顶层命令分隔参数的方式|
parseExpectedArgs|定义期望包含的参数|
action|定义命令的回调函数|
option|解析命令行选项|
allowUnknownOption|允许的未知选项数量|
parse|解析传入的参数，并调用创建的 command 进行解析|
parseOptions|返回某选项对应的值|
opts|返回对应选项的键值对|
description|设置选项或命令的描述信息|
alias |设置命令的别名|
usage |获取命令有用的字段|
name |获取命令的名称|
outputHelp|设置对应命令的帮助信息|
help|设置帮助信息，并退出命令|

## 重点对象讲解

**Option**

内部结构为

* flags 存储 option 字符串
* required 字段是否必须,利用 `<` 判断
* optional 字段是否可选,利用 `[` 判断
* bool 是否是反义,利用 `-no-` 判断
* short 存储指令简写
* long 存储指令长选项名称
* description 存储指令描述信息


## 常见使用问题
### 子命令添加选项

[how to use sub command with option](https://github.com/tj/commander.js/issues/521)



# 参考资料


[基于 node 的命令行工具搭建 ](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)

[创建 node 命令行工具](https://developer.atlassian.com/blog/2015/11/scripting-with-node/)

[windows 安装命令行工具](http://tstringer.github.io/npmjs/javascript/nodejs/2016/02/26/npm-global-packages.html)
    
[windows 下命令行工具创建](https://henriquedias.com/blog/how-to-create-a-node-js-command-line-application/)
    
[windows 下命令行工具创建](http://cruft.io/posts/node-command-line-utilities/)

[wiki cli](https://www.wikiwand.com/en/Command-line_interface)