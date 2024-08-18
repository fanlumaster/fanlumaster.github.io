---
title: C 语言使用 typedef 声明函数指针
date: 2021-05-05 16:32:41
tags:
- C
- 博客园让人失望
categories:
- C
index_img: https://i.imgur.com/j6Caj7Q.png
banner_img: https://i.imgur.com/j6Caj7Q.png
description: '转自我之前的博客园'
---

## 用 typedef 声明函数的格式

```c
// 方式一 --> 表示一个返回值为 int 类型, 参数为两个 int 的函数
// 赋值时可以这样写: Func = 函数名
typedef int(Func)(int, int);

// 方式二 --> 表示一个返回值为 int 类型, 参数为两个 int 的函数
// 赋值时可以这样写: Func_P = 函数名
typedef int(*Func_P)(int, int);
```

关于上面的函数, 调用时的语法如下

```c
Func *func = 函数名1;
int res = func(1, 2); // 这里 1 和 2 可以换成其它 int 类型参数
int res2 = (*func)(1, 2); // 效果和上面相同

Func_P = 函数名2;
int res = func_p(1, 2); // 这里 1 和 2 可以换成其它 int 类型参数
int res2 = (*func_p)(1, 2); // 效果和上面相同
```

## 另外一种方式

```c
// 直接通过指针类型创建, 不需要使用 typedef 预定义, 使用时方法和上面相同
int(*Func)(int, int);
```
