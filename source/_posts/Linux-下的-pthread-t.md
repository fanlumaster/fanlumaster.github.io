---
title: Linux 下的 pthread_t
date: 2021-05-05 17:20:02
updated: 2021-05-27 23:11:28
tags:
- C
- Linux
categories:
- Linux
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222649.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222649.png
---

先由 pthread.h 文件推断一下 pthread_t 的位置，

然后 locate 一下位置

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210505172222.png)

最后使用 VSCode 查看一下

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210505172415.png)

发现，Linux 下的 pthread_t 其实是一个 unsigned long int 类型。