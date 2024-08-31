---
title: Linux 文档（手册）在描述函数时，括号中的数字的含义
date: 2021-05-05 17:02:56
updated: 2021-05-27 23:12:36
tags:
- C
- Linux
categories:
- Linux
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222705.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222705.png
---

## 前言

在阅读《Linux C 一站式编程》时，发现书中提到函数时，会在括号中加上数字。第一次遇到，不解。遂谷歌之，记录一下。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210505170358.png)

## 具体解释

Linux 下的一些说明

1 用户命令，可由任何人启动的

2 系统调用，即由内核提供的函数

3 例程，即库函数

4 设备，即 /dev 目录下的特殊文件

5 文件格式描述，例如 /etc/passws

6 游戏，啊这

7 杂项，例如宏命令包、惯例等

8 系统管理员工具，只能由 root 启动

9 其他（Linux 特定的），用来存放内核例行程序的文档

n 新文档，可能要移到更合适的领域

o 老文档，可能会一段期限内保留 

l 本地文档，与本特定系统有关的

参考：[别人的博文](https://blog.csdn.net/wingSys/article/details/8592614?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control)