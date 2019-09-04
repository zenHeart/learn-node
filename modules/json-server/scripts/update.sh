#!/usr/bin/env bash

#######################################
# 更新数据
#######################################
curl --header "Content-Type: application/json" \
	--request PUT \
	--data '{"username":"xyz","password":"xyz"}' \
	http://localhost:3000/posts/2
