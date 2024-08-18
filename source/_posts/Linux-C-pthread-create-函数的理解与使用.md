---
title: Linux C pthread_create() 函数的理解与使用
description: 'Linux C 创建线程.'
date: 2021-05-05 16:35:55
tags:
- C
- 多线程
- 《Linux C 一站式编程》
categories:
- C
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222716.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222716.png
---

## 前言

主要是记录一下 Linux 下创建线程的相关知识。

## 函数原型

```c
#include<pthread.h>

int pthread_create(pthread_t *restrict thread, const pthread_attr_t *restrict attr, void *(*start_routine)(void *), void *restrict arg);
```

## 返回值

- 成功返回 0
- 失败返回错误号

以前学过的系统函数都是成功返回 0， 失败返回 -1，而错误号保存在全局变量 errno 中，而 pthread 库的函数都是通过返回值返回错误号，虽然每个线程也都有一个 errno，但这是为了兼容其他函数接口而提供的，pthread 库本身并不使用它，通过返回值返回错误码更加清晰。

## 参数解释

首先说明一下，`restrict` 是一个关键字，这个关键字主要作用在于告诉编译器可以放心对这个函数做优化，程序员自己会保证这些指针所指的内存区间互不重叠。具体参见：[C99 的 restrict 关键字](https://fanlumaster.github.io/2021/05/05/C99-%E7%9A%84-restrict-%E5%85%B3%E9%94%AE%E5%AD%97/)

### thread

pthread_create 成功返回后，新创建的线程的 id 被填写到 thread 参数所指向的内存单元。

我们知道 **进程 id** 的类型是 pid_t，每个进程的 id 在整个系统中是唯一的，调用 `getpid(2)` （2 表示是系统调用，即由内核提供的函数）可以获得当前进程的 id，是一个正整数值。

**线程 id** 的类型是 thread_t，它只在当前进程中保证是唯一的，在不同的系统中 thread_t 有不同的实现（在 Linux 下，经查看源码文件，发现其是一个 unsigned long int 类型），它可能是一个整数值，也可能是一个结构体，也可能是一个地址，所以不能简单地当成整数用 printf 打印。调用 `pthread_self(3)` （3 表示是例程，即库函数）可以获得当前线程的 id。

### attr

attr 参数表示线程属性，这里不深入讨论线程属性，我们在代码中一律传 NULL 给 attr 参数，表示线程属性取缺省值。

### start_routine

start_routine 实际是一个函数指针，在实际使用过程中，我们需要传递一个函数给这个参数。在这里，新的线程所执行的代码就是由我们传递给 `pthread_create()` 的函数指针 start_routine 决定。start_routine 函数接收一个参数，是通过 `pthread_create()` 的 arg 参数传递给它的。，该参数的类型是 void *，这个指针按什么类型解释由调用者自己定义。start_routine 的返回值也是 void *，这个指针的含义同样由调用者自己定义。

start_routine 返回时，这个线程就退出了。其它线程可以调用 `pthread_join()` 得到 start_routine 的返回值。相当于父进程调用 `wait()` 得到子进程的退出状态。

### arg

这个参数的作用是将自身传递给上面的 start_routine 函数。

## 一个实例

```c
// threadfirst.c
#include<stdio.h>
#include<string.h> // strerror()
#include<stdlib.h> // exit()
#include<pthread.h>
#include<unistd.h>

pthread_t ntid;

void printids(const char *s)
{
    pid_t pid;
    pthread_t tid;

    pid = getpid(); // get process id
    tid = pthread_self(); // get self's thread id
    // printf("ceshi: %u\n", (unsigned)ntid); // 这行代码也是可以正常打印线程号的
    printf("%s pid %u tid %u (0x%x)\n", s, (unsigned int)pid, (unsigned int)tid, (unsigned int)tid);
}

void *thr_fn(void *arg) // thread function
{
    printids(arg);
    return NULL;
}

int main(void)
{
    int err;

    err = pthread_create(&ntid, NULL, thr_fn, "new thread: ");
    if (err != 0)
    {
        fprintf(stderr, "can't create thread: %s\n", strerror(err)); // strerror() 函数的作用是把错误码转换成错误信息再打印
        exit(1); // exit() 函数会终止整个进程，也就意味着会终止所有的线程
    }
    printids("main thread:");
    sleep(1); // 这里延时 1 秒是为了防止新创建的线程还没有得到执行就终止（这只是权宜之计）

    return 0;
}
```

命令行执行结果

```bash
$ gcc threadfirst.c -lpthread
$ ./a.out
main thread: pid 4394 tid 1650427712 (0x625f8740)
new thread:  pid 4394 tid 1641907968 (0x61dd8700)
```