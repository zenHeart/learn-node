#!/usr/bin/env bash

#######################################
# 用于验证 json-server 数据创建
# 路由为资源路径,数据位保存记录
# 查找批量删除方法
#######################################
curl --header "Content-Type: application/json" \
	--request DELETE \
	http://localhost:3000/posts/3
