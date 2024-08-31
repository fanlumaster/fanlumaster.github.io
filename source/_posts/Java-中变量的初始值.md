---
title: Java 中变量的初始值
date: 2021-03-30 23:25:27
updated: 2023-06-01 03:02:18
tags:
- Java
categories:
- Java
index_img: https://i.imgur.com/v7dK7BY.png
banner_img: https://i.imgur.com/v7dK7BY.png
description: java 变量初始值问题，即在只定义了该变量，而并没有初始化该变量（给该变量赋初值）的情况下，这些变量是否有初始值，如果有，是什么。
---

程序中的每一个变量在使用前都应该有一个值。

每一个 `类变量（class variable）`、`实例变量（instance variable）` 或 `数组变量（array component）` 在被创建（声明）时都会被初始化一个默认值。各个类型的默认值如下。

- byte: 0，即 `(byte)0`

- short: 0，即 `(short)0`

- int: 0

- long: 0，即 `0L`

- float: 0，即 `0.0f`

- double: 0，即 `0.0d`

- char: null，即 `\u0000`

- boolean: false

- 所有的引用类型：null

附注一：Java 中数字常量默认为 int 类型，所以给 long 类型的数据赋值时数字结尾要加 `L` 或 `l`，给取值范围小于 int 的 byte 和 short 类型赋值时，一般直接赋值即可，或者可以进行显式的类型转换。而小数常量默认为 double 类型，所以一般可以将不加后缀的小数常量赋给 double 类型的变量，而给 float 数据赋值时必须要加 `F` 或 `f` 后缀。

参考：[Java 文档](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.12.5)