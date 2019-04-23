# [nps](https://www.npmjs.com/package/nps)

**优化 npm scripts 体验的工具**

---

## 快速入门
1. 全局安装 `nps`

    ```bash
    npm i -g nps
    ```
 
2. 初始化 `nps init`,该命令会在项目根目录创建 `package-scripts.js`
3. 参看 [示例](./examples/package-scripts) 配置,在生成文件的 `scripts` 键下添加脚本
4. 原型示例配置

    ```bash
    # 运行默认的 default 命令
    nps 
    # 运行 show 的 default 命令
    nps show
    nps show.custom # 运行 show 的 custom 命令
    nps show.customSecond # 运行 show 的 customSecond 命令 等同 nps show.custom-second


    # 显示帮助信息
    nps help show # 显示 show.default 命令帮助信息
    nps help # 显示 nps 和配置命令的帮助信息

    # npm 中使用 nps
    npm start # 运行 nps 的 default 命令
    npm t # 运行 nps test 的 default 命令

    # nps 的简写功能
    nps s # 等同于 nps show 的 default 命令

    # 采用简写串行运行多个命令
    nps s s # 串行运行两个 show
    ```

此外结合 [nps-utils](https://github.com/kentcdodds/nps-utils) 可实现进程的并行和串行控制