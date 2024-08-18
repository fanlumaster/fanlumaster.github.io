---
title: Java 中的 '\u0000'
date: 2021-03-31 00:40:15
tags:
- Java
categories:
- Java
index_img: https://i.imgur.com/Bx2wBnu.png
banner_img: https://i.imgur.com/Bx2wBnu.png
description: Java 小知识点
---

Java 中的 char 类型初始值是 `\u0000`，这个表示 Unicode 码中的 `0000` 号字符，但是这个是非打印字符，所以哦我们通过 Java 打印这个字符一般只能看到一个字符。这个在 Java 中一般表示 null char。

Unicode 表部分如下

![20210331004349](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331004349.png)