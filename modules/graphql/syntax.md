# graphql 查询语法

## 快速入门
* [在线查询工具](https://graphiql-test.netlify.com/)

## 工作原理
1. 根据字段查询类型系统
2. 若为类型则继续解析,若为标量则返回结果

定义的解析器格式如下

```js
Query: {
  human(obj, args, context, info) {
    return context.db.loadHumanByID(args.id).then(
      userData => new Human(userData)
    )
  }
}
```

* `obj` 上一级对象
* `args` 传入参数
* `context` 上下文信息
* `info` 一个保存当前查询的相关字段特定信息以及 schema 详细信息的值


## Schema 和 类型
由于底层数据存储系统的差异,
为了便于查询语言检索相关字段,graphql server 抽象了一系列概念来表征底层的存储类型。

参考下例
```graphql
type Character {
	name:String!
	appearsIn:[Episode!]
}
```
* `type` 用于定义类型
* `Character` 一个 GraphQL 对象类型
* `name,appearsIn` 类型对应的键
* `String!` 基础类型无法在递归检索,`!` 表示值不能为空
* `[Episode!]` Episode 类型数组
  
### 参数
对象类型的每一个字段都可能有 0 各或多个参数。
```graphql
type Starship {
	id:ID!
	name:String!
	length(unit: LengthUnit = METER):Float
}
```

* `length` 包含 `unit` 参数

### 查询和变更类型
除了普通对象类型存在
* `Query` 查询
* `Mutation` 变更

两种特殊类型,通过定义 `Query`,`Mutation` 实现查询,变更机制

### 标量类型
映射具体值,无法在查找深层次属性。默认标量包括

* `Int` 有符号 32 位整数
* `Float` 有符号双精度浮点数
* `String`  UTF-8 字符序列
* `Boolean`  true 或 false
* `ID` 唯一标识

此外支持如下语法自定义标量
* `scalar Date` 自定义标量
* `enum 标量名  {}` 定义枚举类型

### 列表和非空
* `[]` 申明返回一个列表
* `类型!` 用于强调类型值为非空

注意如下区别
* `[类型!]` 表示数组内值不能为空,但数组可以为空
* `[]!` 表示类表不能为空
* `[类型!]!` 表示列表和值均不能为空

### 接口
利用接口申请数据结构必须包含的最少字段集合。
1. 利用 `interface 接口类型` 定义接口
2. 利用 `type 类型 implements 接口类型 ` 实现接口

为了避免传入参数可能属于不同类型导致查询失败,采用 `... on 类型` 内联片段指明查询范围

详见 [接口](https://graphql.cn/learn/schema/#interfaces)

### 输入类型
采用 `input` 定义输入类型

### 内省
如何或者系统所包含的信息
采用 [内省语法](https://graphql.cn/learn/introspection/)

## 语法要素

### fields 
fields 映射对象的示例和对应的键名。

```graphql
{
	hero {
		id,
		name
	}
}
```

### 参数
采用 `(键名:值)` 的方式过滤参数

```graphql
{
	hero(id:"1000") {
		name
		id
	}
}
```

### 别名
采用 `别名:键名` 的方式组合多次查询的值。

```graphql
{
	h1:hero(id:"1"),
	h2:hero(id:"2")
}
```

### 片段
实现复杂查询的复用
1. 采用 `fragment 片段名 on filed` 的方式申明片段 
2. 采用 `...片段名` 利用片段
```graphql
# 定义片段
fragment comparisonFields on Character {
	name
	friends {
		name
	}
}
# 使用片段
{
	h1:hero(id:"1") {
		...comparisonFields
	}
	h2:hero(id:"2") {
		...comparisonFields
	}
}
```

片段传参允许传参,使用方式如下
1. 采用 `(fields:$变量名)` 定义参数
2. 使用 `query HeroComparison($变量名:类型 = 值)` 的方式搜索

可以使用 `... on 类型 {}` 定义内联片段

### 具名操作符
采用默认 `{}` 方式无法清晰表达查询意图利用 `query 操作名 {}` 的结构可以清晰说明查询内容。

### 查询变量
查询支持动态传参,使用如下
1. 利用 `$变量名:type` 申明变量
2. 利用 `字段:$变量名` 标注查询位置
3. 采用 `变量名:值` 结合查询语句,进行查询

> 可以采用 `$变量名:type = 默认值` 赋默认值

### 指令
变量只能动态控制查询内容,为了动态生成查询指令,可采用如下方式
1. 定义查询变量
2. 采用 `@include(if:$变量名) {...}` 的方式可以动态生成查询语句

典型的语句如下:

* `@include(if:Boolean) {}` 控制后续查询字段为真时否出现
* `@skip(if: Boolean)` 控制后续查询字段为真时跳过

### 交互
除了查询还需要可以修改服务端数据。方式如下
1. `mutation 操作名($变量:类型,变量:输入类型) {}` 定义修改
2. 传入值进行修改

### 原信息
除了指定字段名,你可以查询服务中的内置原始信息,例如

* `__typename` 返回字段所属类型

## 服务使用
* [http 提供服务](https://graphql.cn/learn/serving-over-http/)
* [授权](https://graphql.cn/learn/authorization/)
* [分页](https://graphql.cn/learn/pagination/)
* [缓存](https://graphql.cn/learn/caching/)
  
## 最佳实践
* [graphql 思考](https://graphql.cn/learn/thinking-in-graphs/)

* `schema` 映射领域模型和实体资源,形成通用的业务术语
* 