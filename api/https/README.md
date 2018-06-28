---
title: todo    
tags: todo      
birth: 2017-08-09      
modified: 2017-08-09      
---

todo
===
**前言:介绍每日工作**

---

## https
证书生成指令流程

```bash
~ openssl genrsa -out privatekey.pem 1024
~ openssl req -new -key privatekey.pem -out certrequest.csr 
~ openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem 
```


### 2017-08-09

* [X] 完成基本的 https 服务器搭建






