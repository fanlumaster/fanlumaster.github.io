---
title: ‘编写高质量代码：改善Python代码程序的91个建议读书笔记’
date: 2021-05-20 23:11:54
updated: 2021-05-27 22:57:10
tags:
- 读书笔记
categories:
- 读书笔记
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222401.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222401.png
description: '记录我读《编写高质量代码：改善 Python 代码程序的 91 个建议》的相关笔记，或许可以供日后回顾。'
---

### 建议一

这里主要是对书中一些有意思的代码进行尝试. 比如快速排序, 差不多 10 行就可以搞定, 很方便的写法.

代码

```py
# -*- coding: utf-8 -*-
# @File  : draft02.py
# @Author: FanLu
# @Date  : 2021/5/20

# 快速排序
def quicksort(array:list):
    less = []; greater = []
    if len(array) <= 1:
        return array
    pivot = array.pop() # 默认是弹出最后一个元素
    for x in array:
        if x <= pivot:
            less.append(x)
        else:
            greater.append(x)
    return quicksort(less) + [pivot] + quicksort(greater)

# 交换两个变量的值
a = 2
b = 3
a, b = b, a

# 逆转列表
list_a = [1, 2, 3, 4]

if __name__ == '__main__':
    array = [9, 8, 4, 5, 32, 64, 2, 1, 1, 0, 10, 19, 27]
    array = quicksort(array)
    print(array)
    print('--------')
    print(a, b)
    print('------')
    print(list(reversed(list_a)))
```

输出

```
[0, 1, 1, 2, 4, 5, 8, 9, 10, 19, 27, 32, 64]
--------
3 2
------
[4, 3, 2, 1]
```

### 建议三

1、三元操作符 "?:" 在 Python 中的替代品

code

```py
X = 0
Y = -2
print(X if X < Y else Y)
```

output

```
-2
```

2、switch...case 在 Python 中的一种简单替代

code

```py
def f(x):
    return {
        0: "You typed zero.\n",
        1: "You are in top.\n",
        2: "n is an even number.\n"
    }.get(x, "Only single_digit numbers are allowed\n")

print(f(3), end='')
```

output

```
n is an even number.

```

注意，这里原书的代码有问题，函数签名里的用的是 `x`，但是原书在函数体中的 `get()` 中用的却是 `n`。

### 建议八 利用 assert 语句来发现问题

基本语法

```py
assert expression1 [, expression2] # expression2 是可选的, 用来传递具体的异常信息
```

使用范例

```py
>>> x = 1
>>> y = 2
>>> assert x == y, 'not euqals'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AssertionError: not euqals
>>> assert x != y # 这个语句敲下回车不会发生任何问题
>>>
```

在执行过程中它实际相当于如下代码

```py
>>> x = 1
>>> y = 2
>>> if __debug__ and not x == y:
...     raise AssertionError("not equals")
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
AssertionError: not equals
>>>
```

附：`__debug__` 的值默认设置为 True，而且是只读的。

我个人感觉一般尽量还是少用这个 `assert` 为好。在 Python 中这个是对性能有影响的。