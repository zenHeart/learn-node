# json server

**详解 json server 的使用**

---

## 快速入门
1. 安装 json-server
	```shell
	npm i -g json-server
	```
2. 在项目根目录拷贝 `db.json` 文件
3. 运行服务
	```shell
	json-server --watch db.json
	```
4. 数据增删改查,运行 scripts 脚本理解用法



## 基本原理
1. 使用 express 作为 底层 server
2. 数据存储用的 [lowdb](https://github.com/typicode/lowdb)

## 问题
1. 批量删除需研究