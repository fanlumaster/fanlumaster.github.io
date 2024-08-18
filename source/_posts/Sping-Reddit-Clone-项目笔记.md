---
title: Sping-Reddit-Clone 项目笔记
date: 2022-03-02 18:58:50
tags:
- Spring
categories:
- Spring
index_img: https://i.imgur.com/FZaPee7.png
banner_img: https://i.imgur.com/FZaPee7.png
hide: true
---

### Build 注解

lombok 注解在 java 进行编译时进行代码的构建，对于 java 对象的创建工作它可以更优雅，不需要写多余的重复的代码，这对于 java 开发人员是很重要的，在出现 lombok 之后，对象的创建工作更提供 `Builder` 方法，它提供在设计数据实体时，对外保持 `private setter`，而对属性的赋值采用 `Builder` 的方式，这种方式最优雅，也更符合封装的原则，不对外公开属性的写操作！

`@Builder` 声明实体，表示可以进行 `Builder` 方式初始化，`@Value` 注解，表示只公开 `getter`，对所有属性的  `setter` 都封闭，即 `private` 修饰，所以它不能和 `@Builder` 一起用。

参考：<https://www.cnblogs.com/MrYuChen-Blog/p/13993196.html>