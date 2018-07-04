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

### 本地测试
```bash
# 将本地包变为全局
npm link  

# 更新包
# 重新使用 npm link
npm rebuild -g


# 本地安装
# 在项目根目录
npm install . -g
# 实现连接
npm link
# 查找本地宝
npm ls -g
# 在其他地方安装该包
npm install <包的相对位置>
# 利用 require 模式使用该包
```





## 参考资料
* [module best practice](https://github.com/mattdesl/module-best-practices#module-basics)

