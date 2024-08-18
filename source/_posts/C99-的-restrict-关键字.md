---
title: C99 的 restrict 关键字
description: '关于 restrict 关键字的笔记'
date: 2021-05-05 15:49:41
tags:
- 《Linux C 一站式编程》
categories:
- C
index_img: https://i.imgur.com/vzhtAUF.png
banner_img: https://i.imgur.com/vzhtAUF.png
---

我们来看一个跟 `memcpy/memmove` 类似的问题。下面的函数将两个数组中对应的元素相加，结果保存在第三个数组中。

```c
void vector_add(float *x, float *y, float *result)
{
    int i;
    for (i = 0; i < 64; ++i)
        result[i] = x[i] + y[i];
}
```

如果这个函数要在多处理器的计算机上执行，编译器可以做这样的优化：把这一个循环拆成两个循环，一个处理器计算 i 值从 0 到 31 的循环，另一个处理器计算 i 值从 32 到 63 的循环，这样两个处理器可以同时工作，使计算时间缩短一半。但是这样的编译优化能保证得出正确结果吗？假如 result 和 x 所指的内存区间是重叠的，result[0] 其实是 x[1]，result[i] 其实是 x[i+1]，这两个处理器就不能各干各的事情了，因为第二个处理器的工作依赖于第一个处理器的最终计算结果，这种情况下编译优化的结果是错的。这样看来编译器是不敢随便做优化了，那么多处理器提供的并行性就无法利用，岂不可惜？为此，C99 引入 restrict 关键字，如果程序员把上面的函数声明为 `void vector_add(const double *restrict x, const double *restrict y, double *restrict result)`，就是告诉编译器可以放心地对这个函数做优化，程序员自己会保证这些指针所指的内存区间互不重叠。

由于 restrict 是 C99 引入的新关键字，目前 Linux 的 Man Page 还没有更新，所以都没有 restrict 关键字，本书的函数原型都取自 Man Page，所以也都没有 restrict 关键字。但在 C99 标准中库函数的原型都在必要的地方加了 restrict 关键字，在 C99 中 memcpy 的原型是 `void *memcpy(void * restrict s1, const void * restrict s2, size_t n);`，就是告诉调用者，这个函数的实现可能会做些优化，编译器也可能会做些优化，传进来的指针不允许指向重叠的内存区间，否则结果可能是错的，而 memmove 的原型是 `void *memmove(void *s1, const void *s2, size_t n);`，没有 restrict 关键字，说明传给这个函数的指针允许指向重叠的内存区间。在 restrict 关键字出现之前都是用自然语言描述哪些函数的参数不允许指向重叠的内存区间，例如在 C89 标准的库函数一章开头提到，本章描述的所有函数，除非特别说明，都不应该接收两个指针参数指向重叠的内存区间，例如调用 sprintf 时传进来的格式化字符串和结果字符串的首地址相同，诸如此类的调用都是非法的。本书也遵循这一惯例，除非像 memmove 这样特别说明之外，都表示“不允许”。

关于 restrict 关键字更详细的可以查看一些英文文档。