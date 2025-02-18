---
title: 给本科室友模拟的一次 C++ Mock Interview
date: 2025-02-16 15:20:36
tags:
  - Cpp
  - Mock Interview
categories:
index_img: https://i.postimg.cc/FHYmScKX/image.png
banner_img: https://i.postimg.cc/FHYmScKX/image.png
---

## 语言基础

前置，热身。

1、列举一下你知道的 C++ 的编译器。各个平台的主流的编译器分别是什么？Visual Studio 和 MSVC 之间是什么关系？

可能有些人没有用过 cl.exe 这个命令行工具，这个要和 MSVC 区分开。

<https://stackoverflow.com/questions/53833210/terminology-is-cl-identical-to-the-msvc-compiler>

### 通用基础

1、为什么说引用是指针的一个语法糖？谈谈引用和指针之间的区别和联系。

语法糖这个说法是本雅明说的，

<https://www.reddit.com/r/cpp/comments/18186it/i_am_absolutely_confused_on_the_topic_of/>

2、什么叫做 C++ 的一个编译单元？

<https://stackoverflow.com/questions/70106777/c-compilation-vs-translation-unit>

3、谈一谈 static 关键字。

4、谈一谈 extern 关键字。

按：我在 C 语言中经常拿这个来在多个源文件中使用全局变量。

<https://stackoverflow.com/questions/1433204/how-do-i-use-extern-to-share-variables-between-source-files>

5、谈一谈你对 C++ 的 RAII 的理解。(Resource Acquisition Is Initialization，资源获取即初始化)

- <https://en.cppreference.com/w/cpp/language/raii>
- <https://stackoverflow.com/questions/2321511/what-is-meant-by-resource-acquisition-is-initialization-raii>

6、谈一谈 new 和 malloc 的区别。

7、谈一谈 C++ 的内存分区，并解释一下它们分别是用来存储哪些内容的？

8、C++ 的数组就是指针，对吗？

- <https://www.zhihu.com/question/41805285>
- <https://www.reddit.com/r/cpp_questions/comments/1564oav/question_what_does_an_array_decaying_mean/>

### Modern Cpp

1、C++17 之后我们可以如何更方便地声明、定义和使用全局变量的？

inline 语法。

<https://stackoverflow.com/questions/38043442/how-do-inline-variables-work>

按：谈一谈 inline 函数？

2、谈一谈你对 move 的理解。即移动对象而非拷贝对象。这样做有什么好处？

### 标准库

1、谈谈 map 和 unordered_map 的区别。

2、vector 是如何扩容的？

## 数据结构

1、列举一下你了解的排序相关的算法，以及它们分别的时空复杂度。

## 操作系统

1、快速列举出 10 个你平时常用的终端命令。

2、聊聊进程和线程的区别？

3、聊聊线程和协程的区别？

4、并发和并行的区别？

5、进程间通信的方式都有哪些？

6、什么是死锁？

7、Linux 如何查看进程？结束进程的命令是什么？

## 项目经历

1、谈谈你做过的项目，哪一个最令你印象深刻？

2、最让你难忘的一次项目难点是什么，最后是怎么解决的？

## 算法题

1、手写一下快速排序。并提供基本的测试。

一个用来检测的 OJ：

<https://www.codewars.com/kata/6641778ddab67c48a794387d>

2、最大连续子数组和。(Maximum Subarray, LeetCode53)

定义 $dp[i]$ 为以第 i 个元素结尾的最大连续子数组和。

$$
dp[i] = max(dp[i - 1] + nums[i], nums[i])
$$

---

参考：

1、<https://stackoverflow.com/questions/53833210/terminology-is-cl-identical-to-the-msvc-compiler>

总按：游戏引擎开发(偏渲染方向)不需要掌握计算机网络，所以本文不涉及。但是需要掌握渲染相关的知识，这个本人只会用，不会原理，故也没有包含。
