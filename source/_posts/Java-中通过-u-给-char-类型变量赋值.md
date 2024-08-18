---
title: Java 中通过 '\u' 给 char 类型变量赋值
date: 2021-03-31 00:44:39
tags:
- Java
categories:
- Java
index_img: https://i.imgur.com/ab4YR5a.png
banner_img: https://i.imgur.com/ab4YR5a.png
description: Java 小知识点
---

在 Java 中，可以使用 `\u0031` 这样形式的值给 char 类型变量赋值，其中，`\u` 表示 Unicode 码，后面的四位数字即具体的 Unicode 码。

部分 Unicode 码如下

![20210331004349](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331004349.png)

下面是 Java 中打印通过 Unicode 码赋值的 char 类型变量

```java
public static void main(String[] args) {
    char a = '\u0000';
    char b = '\u0040';
    char c = '\u0041';
    System.out.println(a);
    System.out.println(b);
    System.out.println(c);
}
```

输出为

![20210331005101](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331005101.png)