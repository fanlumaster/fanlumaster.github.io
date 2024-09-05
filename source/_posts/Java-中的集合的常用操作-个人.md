---
title: Java 中的集合的常用操作(个人)
date: 2022-08-23 01:17:33
updated: 2022-08-23 01:21:52
tags:
- Java
categories:
index_img: https://i.imgur.com/EClDDOP.jpg
banner_img: https://i.imgur.com/EClDDOP.jpg
description: '记录一些 Java 中的常用的操作，我来到，我看见，我学习，我记录，我掌握。嗯，大概是这个样子。'
---

反转一个 List，

```java
List<String> list = ...;
Collections.reverse(list);
```

这里是原地修改。

如果想整一个 `copy` 出来，由于 List 无法访问 `clone()` 方法，那么，我们可以这样做，

```java
List<?> shallowCopy = list.subList(0, list.size());
Collections.reverse(shallowCopy);
```
