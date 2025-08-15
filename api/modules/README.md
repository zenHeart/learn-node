# modules

**前言:详解 node 的模块加载机制**

---

## API

详解模块暴露的 API

* **require(id)** 加载一个模块,详见 [模块机制](#模块机制)
  * **require.cache** 缓存对象,键为文件的全局路径,值为解析后的地址
  * **require.extensions** 不同扩展的处理函数
  * **require.main** 模块的入口脚本
  * **require.resolve(request,options)** 模块的入口脚本
     <!-- TODO: 验证 options paths 属性无效需查明原因 -->
  * **require.resolve.paths** 用于解析模块加载的文件路径

* **module** 模块实例对象,作用域为每个模块文件
  * **module.children** 该模块引入的子模块对象
  * **module.exports** 模块导出的对象
  * **module.filename** 解析的模块文件名
  * **module.id** 模块 id
  > 实际上可以利用模块 id 和 filename 不相等来判断启动文件,因为启动文件默认 id 为 `.`
  * **module.loaded** 模块是否加载的标志
  * **module.parent** 引用该模块的父模块
  * **module.paths** 索引该模块的路径集合
  * **module.require** module 的原型方法

* **Module** 模块构造器,可以利用 `require('module')` 或 `module.constructor` 的方式引入
  * 利用 `require('module').builtinModules` 查看内置模块
  * **module.createRequire(filename)** 创建模块请求
 <!-- TODO: 需找出适用场景 -->

## 模块机制

### 模块查找

加载机制详见 [模块加载机制](https://nodejs.org/api/modules.html#modules_addenda_the_mjs_extension)

重点如下:

* node 会先加载不带任何后缀的文件作为 js 文件解析,随后按照  `js,json,node` 的后缀加载文件
  * js 采用 compileFunction 编译
  * json 采用 json.parse 解析
  * node 作为二进制扩展解析调用 `process.dlopen()`,参看示例 [](./module-order) 验证模块记载机制,模块名区分大小写
* 若文件无法查找到,按照同名文件夹会读取 `package.json` **main** 字段,不存在会查找 `index` 文件按照 `js,json,node` 扩展顺序进行加载

 > 注意此处不会加载没有扩展名文件,若文件夹下 index 无扩展名会直接抛出错误

* 对于不包含路径的模块,会先去加载内部模块若失败,会按照`module.paths` 的一系列目录按照

对于循环加载,当检测到模块已加载后会返回加载一半的模块参看示例 [循环加载](./cycle-load)

此外可以通过 `NODE_PATH` 来增加解析路径。利用 `:` 分隔多个目录。windows 为 `;`
除此之外 node 会加载如下路径:

* `$HOME/.node_modules`
* `$HOME/.node_libraries`
* `$PREFIX/lib/node` 该变量由 `node_prefix` 配置

 > 参看此示例 <https://github.com/nodejs/node/issues/18024>
 <!-- TODO: 此处需验证是否合理 -->

### 模块缓存

每个模块会生成一个 `module` 对象,依赖模块会在 `module.cache` 中持有对该模块的引用
当多次引用同一模块时会优先去 `module.cache` 加载。若清除该缓存,重新加载模块会触发模块热重载。

参考范例 [缓存](./module-cache) 该示例说明 index.js 会重载 a.js 但是模块 b 不会。

### 模块封装
>
> node 中不加任何前缀的变量会附着在全局环境

nodejs 利用闭包实现模块化!!!
