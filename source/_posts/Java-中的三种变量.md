---
title: Java 中的三种变量
date: 2021-03-30 23:33:17
updated: 2023-06-01 03:02:44
tags:
- Java
categories:
- Java
index_img: https://i.imgur.com/7ggLnpg.png
banner_img: https://i.imgur.com/7ggLnpg.png
description: 一个 Java 小知识点
---

Java 中一共有三种变量，分别是

- 类变量（Class Variables）：类变量也叫静态（static）变量。直接在类体中使用 `static` 关键字声明的变量。这中变量的特点是只会在程序第一次加载类时初始化一次，然后所有该类的实例化对象都会共享这一份变量。

- 实例变量（Instance Variables）：实例变量即类中的没有使用 `static` 关键字创建的变量。每实例化一个对象，该对象都会持有只属于它的一份实例变量。

- 本地变量（Local Variables）：在方法体中、构造器中、代码块（block）中声明的变量。也可以叫做局部变量。