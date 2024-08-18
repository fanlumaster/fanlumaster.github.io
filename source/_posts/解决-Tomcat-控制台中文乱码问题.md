---
title: 解决 Tomcat 控制台中文乱码问题
date: 2021-07-13 01:28:46
tags:
- Bugs
- Java
categories:
- Bugs
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013618.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013618.png
---

## 一、问题描述

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713012423.png)

## 二、问题解决

来到 `...\apache-tomcat-10.0.8\conf` 目录下，打开 logging.properties 文件，修改下面这一行，

修改前：

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013029.png)

修改后：

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013137.png)

测试效果，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013202.png)

此时，中文已经显示正常。