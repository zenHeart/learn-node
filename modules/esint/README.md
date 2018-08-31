eslint
===

eslint 用来代码格式检查工具

----


## 概述
eslint 代码省察工具,用于在团队中规范代码格式,
强制成员遵守一致的代码书写规范.

## 快速入门
> 这里只讲解本地安装,全局安装参见 [global install](https://eslint.org/docs/user-guide/getting-started#global-installation-and-usage)

1. 项目根目录安装 eslint
    ```bash
    npm i -D eslint 
    ```

2. 初始化配置文件 
    ```bash
    npx eslint --init 
    ```
    
    > 此处可以选择一个标准,这里采用 [standard](https://github.com/standard/standard) 标准
    
3. 参看 [package.json](./package.json) ,执行如下脚本,检查 lib 目录下文件
    ```bash
    # 检查并修复错误
    npm run lint 
    ```

## 典型配置

## 参考资料
