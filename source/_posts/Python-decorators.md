---
title: Python decorators
date: 2022-09-08 15:57:35
tags:
- Python
categories:
index_img: https://i.imgur.com/raQ49jH.png
banner_img: https://i.imgur.com/raQ49jH.png
---

最近要面试深信服了，所以准备一下这个 Python 相关的内容。这是一道上半年在面试的时候遇到的题目，让我手写一个装饰器。

当然啦，Python 手写装饰器还是比较简单的，但是当时我没有复习，就没有很流畅地写出来，只是把思想给讲了一遍。就是把函数当成参数嘛，我们需要环绕着给函数增加什么操作的话，可以利用装饰器来实现。

在我看来，装饰器就是一个语法糖，把函数当作一等公民传入另一个函数，然后再添加一些操作，然后调用函数，多几个括号也没什么。不过呢，用了装饰器肯定是会更加美观的嘛。

这个装饰器的话，只要看了代码，其实是很容易理解的。下面就让我用递进的顺序记录一下吧。

```py
def f1():
    print("Called f1")


def f2(f):
    f()


f2(f1)
```

```py
def f1(func):
    def wrapper():
        print("Started")
        func()
        print("Ended")

    return wrapper


def f():
    print("Hello")


f1(f)()
```

```py
def f1(func):
    def wrapper():
        print("Started")
        func()
        print("Ended")

    return wrapper


@f1
def f():
    print("Hello")


f()
```

```py
def f1(func):
    def wrapper(*args, **kwargs):
        print("Started")
        val = func(*args, **kwargs)
        print("Ended")
        return val

    return wrapper


@f1
def f(a, b=9):
    print(a, b)


@f1
def add(x, y):
    return x + y


print(add(4, 5))
```

下面是一些装饰器的使用场景，一些小的 example：

```py
import time


def before_after(func):
    def wrapper(*args):
        print("Before")
        func(*args)
        print("After")

    return wrapper


class Test:
    @before_after
    def decorated_method(self):
        print("run")


t = Test()
t.decorated_method()
```

output:

```
Before
run
After
```

```py
import time


def timer(func):
    def wrapper():
        before = time.time()
        func()
        print("Function took:", time.time() - before, "seconds")

    return wrapper


@timer
def run():
    time.sleep(2)


run()
```

output:

```
Function took: 2.002192258834839 seconds
```

```py
import datetime


def log(func):
    def wrapper(*args, **kwargs):
        with open("logs.txt", "a") as f:
            f.write("Called funciton with " +
                    " ".join([str(arg) for arg in args]) + " at " + str(datetime.datetime.now()) + "\n")
            val = func(*args, **kwargs)
            return val

    return wrapper


@log
def run(a, b, c=9):
    print(a + b + c)


run(1, 3, c=9)
```

output:

```
13
```

写到 `logs.txt` 中的内容是：

```
Called funciton with 1 3 at 2022-09-09 17:15:30.243346
```
