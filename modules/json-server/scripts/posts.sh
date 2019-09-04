#!/usr/bin/env bash

#######################################
# 用于验证 json-server 数据创建
# 路由为资源路径,数据位保存记录
#######################################
curl --header "Content-Type: application/json" \
	--request POST \
	--data '{"username":"xyz","password":"xyz"}' \
	http://localhost:3000/posts/
