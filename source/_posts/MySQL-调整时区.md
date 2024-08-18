---
title: MySQL 调整时区
date: 2023-05-31 10:53:12
tags:
- MySQL
categories:
index_img: https://i.imgur.com/cAWgIsX.png
banner_img: https://i.imgur.com/cAWgIsX.png
---

在 Ubuntu 20.04 中，使用 MySQL 的时间出了问题。

先是在终端的 mysql 中使用 `select now();` 看一下时间，好像是慢了 7 个小时，这个服务器物理位置是在纽约，用的是 BST，英国夏令时。而我在 spring boot 里面的时区配置写的是 `Asia/Shanghai`，我就想在 `/etc/mysql/my.cnf` 中也把时区换成上海，换了之后，可能是格式的问题，后面连 mysql 都无法重启，这个也让我排查了半天。真是的。

后面索性就硬编码吧，把时间的差值计算一下，然后，直接在 `/etc/mysql/my.cnf` 中把时区的设置写死，

```
[mysqld]
default-time-zone='+08:00'
```

这一下，在时间这一块是不出什么问题了。

