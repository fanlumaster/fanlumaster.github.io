---
title: Java 流式编程的一些小 Snippets
date: 2022-08-23 00:38:46
tags:
- Java
categories:
index_img: https://i.imgur.com/0wTVmS7.jpg
banner_img: https://i.imgur.com/0wTVmS7.jpg
---

关于 Java 的流式编程，学起来容易理解，但是用起来的话，还是得多用，一天不用就很容易忘掉。

整理一下常用的 snippets，以免隔一段时间就要去 stackoverflow 去重新看一遍。

将 String 类型的 List 转成 String 类型的数组。

```java
List<String> list = Arrays.asList("hello", "test", "what");
System.out.println(list);
String[] strings = list.toArray(String[]::new);
System.out.println(Arrays.toString(strings));
```

将 Integer 类型的 List 转成 String 类型的数组。

```java
List<Integer> integerList = Arrays.asList(1, 2, 3, 4);
System.out.println(integerList);
String[] intStrings = integerList.stream().map(a -> a.toString()).toArray(String[]::new);
System.out.println(Arrays.toString(intStrings));
```

将 `List<Integer>` 转为 `List<String>`。

```java
List<Integer> integerList = Arrays.asList(1, 2, 3, 4);
List<String> stringList = integerList.stream().map(a -> a.toString()).collect(Collectors.toList());
```

将 `int[]` 转换为 `List<Integer>`。

```java
int[] ints = {1, 2, 3};
List<Integer> list = Arrays.stream(ints).boxed().collect(Collectors.toList());
```

使用流式编程声明数组。

```java
int [] myIntArray = IntStream.range(0, 100).toArray(); // From 0 to 99
int [] myIntArray = IntStream.rangeClosed(0, 100).toArray(); // From 0 to 100
int [] myIntArray = IntStream.of(12, 25, 36, 85, 28, 96, 47).toArray(); // The order is preserved.
int [] myIntArray = IntStream.of(12, 25, 36, 85, 28, 96, 47).sorted().toArray(); // Sort 
```
