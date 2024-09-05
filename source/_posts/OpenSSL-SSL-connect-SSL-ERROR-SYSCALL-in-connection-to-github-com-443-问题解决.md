---
title: 'OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 问题解决'
date: 2022-03-24 16:43:00
updated: 2022-03-24 16:54:22
tags:
- Bugs
categories:
- Bugs
index_img: https://i.imgur.com/PGUs33h.png
banner_img: https://i.imgur.com/PGUs33h.png
---

## 问题描述

```bash
OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

![](https://i.imgur.com/dQ5PQO0.png)

## 问题解决

我是参考的 stackoverflow，在命令行执行的如下命令：

```bash
git config --global http.sslBackend "openssl"
```

然后就可以了。