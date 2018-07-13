npm 包最佳实践
====

**讲解创建 npm 包的最佳实践**

------



## 创建属于你的 NPM 模块
1. 创建 NPM 用户
去 [NPM 官网注册](https://www.npmjs.com/)
或者利用`npm adduser` 创建用户。只需填入
用户名，密码，邮箱即可。

验证是否注册成功进 <https://npmjs.com/~>

2. 登录账户

`npm login` 输入用户名，密码，邮箱登录。
登陆后使用 `npm whoami` 验证用户.

3. 提交包

`npm publish` 提交后可以去 **https://npmjs.com/package/<package_name>** 查看。
 
利用 `.gitignore` 或 `.npmignore` 忽略文件。
主页忽略规则详见 [npm developers](https://docs.npmjs.com/misc/developers)

`readme` 将会显示在仓库的主页。

4. 更新

`npm version <update_type>` 类型参照语义化版本规则。

* patch 补丁
* minor 更新
* major 升级

该命令会自动更改，package.json 中的 version 字段。
更新完版本后重新提交即可。

npm 包开发说明。

### 配置忽略
减小包的容量,改进方法.

[npmignore](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package)

测试方法

```bash
# 本地压缩包
npm pack

# 本地查看压缩内容
tar -tf <压缩包名称>
```

### 本地调试
有的时候为了验证本地包是否可用.
期望建立本地包和项目的连接,只要本地包发生修改,变化可反映到项目中.

1. 建立本地包的全局连接
    **确保切换到本地包的根目录**
    ```bash
    npm link
    ```
    该命令会创建本地包,到全局 node_moudles 的系统软链接
    
2. 建立工程项目和本地包的连接
    **确保在项目目录下**
    ```bash
    npm link <仓库名|本地包地址> 
    ```
    该指令会在项目的 node_modules 常见到全局本地包的软链接

    通过上述方式就实现了,在项目中使用本地包,并且本地包的原理会实时反映到项目中.


该原理是应为创建了两个软连接.执行逻辑如下.

1. require 去 node_modules 中查找模块
2. node_modules 的模块指向全局软连接
3. 全局包软连接指向本地包位置.

除了上述模式,为了测试已经发布的包,可以采用如下方式.

1. 将本地包打包
    ```bash
    npm pack
    ```
2. 在项目中安装打包内容即可
    ```bash
    npm install <本地包打包地址>
    ```

具体实现参考
* [在项目中使用本地包](https://egghead.io/lessons/javascript-test-npm-packages-locally-in-another-project-using-npm-link)
* [如何测试 npm 包](https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be)


## 参考资料
* [module best practice](https://github.com/mattdesl/module-best-practices#module-basics)

