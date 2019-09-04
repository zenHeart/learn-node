## require.main
由于 require.main 指向主模块。
可以利用 `require.main === module` 判断模块是否直接运行。

## 范例
运行示例
```bash
# 输出 run by node,但是 mod1 模块并没输出
node index.js
# mod1 输出 run by node
node mod1.js
```

该示例说明 `require.main === module` 可以判断当前模块是否直接为 node 运行。

此外你可以以修改 mod1.js 中的函数为 

```js
function () {
  if (require.main === module) {
    console.log ('run by node');
  }
};
```

继续运行上述代码,此时 `node index.js` 不会输出此信息,因为此处形成了闭包。

> 利用 require.main.filename 查询应用的入口文件