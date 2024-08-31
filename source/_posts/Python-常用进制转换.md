---
title: Python 整数常用进制转换
date: 2021-05-04 20:16:07
updated: 2021-06-12 16:10:02
tags:
- Python
categories:
- Python
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210612160852.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210612160852.png
description: 'Python 进制转换知识点整理。'
---

### 其他进制转十进制

这里使用 Python 内置的 `int()` 函数。

**语法**

```py
int(x, base=10)
```

**参数**

- x -- 字符串或数字
- base -- 进制数，十进制

**返回值**

返回 base 进制的的 x 值转换成十进制之后的值。

**使用实例**

```py
print(int(12))
# 二进制转十进制
print(int('11', 2))
print(int('0b11', 2))
# 8 进制转十进制
print(int('12', 8))
print(int('012', 8))
# 16 进制转十进制
print(int('12', 16))
print(int('0x12', 16))
```

输出

    12
    3
    3
    10
    10
    18
    18

### 十进制转其他进制

#### 十进制转二进制

使用 `bin()` 函数

```bash
>>>bin(12)
'0b1100'
```

#### 十进制转八进制

使用 `oct()` 函数

```bash
>>>oct(12)
'0o14'
```

#### 十进制转十六进制

使用 `hex()` 函数

```bash
>>> hex(12)
'0xc'
```

### 其他非十进制之间的互转

一个简单的方法是，可以利用十进制作中转。

另一个方法是，我们给相应进制的数加上代表它们的前缀，然后使用诸如 `hex()` 函数即可。

例如，我们将十六进制 `0x12` 数转成八进制数

```bash
>>>oct(int('0x12', 16))
'0o22'
>>>oct(0x12)
'0o22'
```

### 补充

这里补充各个常用的进制的前缀和后缀。

- 二进制：前缀 `0b/0B`，后缀 `b/B`
- 八进制：前缀 `0o/0O`，后缀 `o/O`，有的资料说，八进制的前缀也可以使用单独一个数字 `0`，但是，这在 Python 中是行不通的
- 十进制：前缀 `无`，后缀 `d/D`
- 十六进制：前缀 `0x/0X`，后缀 `h/H`