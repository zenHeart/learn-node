## 概述
sequelize 为数据库 ORM 库.

## 使用
### seed
参考 [seed](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-seed)

> **info**
> 1. bulkDelete 的写法直接写 where 条件,详见 [bulkDelete](https://stackoverflow.com/questions/48232490/sequelize-where-is-an-example-of-using-bulkdelete-with-criteria) 
> 2. 使用 `sequelize db:seed:undo:all` 才可删除记录,不要忘了 `:all` 的选项

### 数据库名
默认定义模型时,sequelize 回将表名变为复数形式,
修改配置解决此问题. [固定表名](https://stackoverflow.com/questions/21114499/how-to-make-sequelize-use-singular-table-names)

 
