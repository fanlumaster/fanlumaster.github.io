---
title: 利用 Python 和 sympy 库来求逻辑函数的真值表
date: 2021-03-22 23:53:48
tags:
- Python
- Sympy
categories: 数字逻辑
index_img: https://i.imgur.com/JzQaLqm.png
banner_img: https://i.imgur.com/JzQaLqm.png
description: 使用 Python 来求逻辑函数的真值表...
---

一份可以作为模板的代码：

```py
# -*- coding: utf-8 -*-
# @File  : simply_purefile.py
# @Author: FanLu
# @Date  : 2021/3/21

from sympy import *
A, B, C, D, F, F2 = symbols('A, B, C, D, F, F2')
print('N   A  B  C  D  |  F')

# 将 1 到 16 的二进制计算出来，然后转化成 bool 类型的值
bool_list = []
for i in range(16):
    tmp_list = []
    str = '{0:0>4b}'.format(i)
    # print(str, end='')
    # print('  ', end='')
    for j in range(4):
        num = int(str[j])
        tmp_list.append(num)
    bool_list.append(tmp_list)
# print(bool_list)
num = 0
for eachone in bool_list:
    print('{0:<4}'.format(num), end='')
    num += 1
    for j in eachone:
        print('{0:<3}'.format(j), end='') # 0 表示索引，< 表示左对齐，3 表示占 3 个格子
    F = (A | B | (C & D)).subs({A:eachone[0], B:eachone[1], C:eachone[2], D:eachone[3]})
    each_res = 1 if F == True else 0
    print('{0:<3}'.format('|'), end='')
    print('{0:<3}'.format(each_res), end='')
    print()
```

输出是：

```
N   A  B  C  D  |  F
0   0  0  0  0  |  0  
1   0  0  0  1  |  0  
2   0  0  1  0  |  0  
3   0  0  1  1  |  1  
4   0  1  0  0  |  1  
5   0  1  0  1  |  1  
6   0  1  1  0  |  1  
7   0  1  1  1  |  1  
8   1  0  0  0  |  1  
9   1  0  0  1  |  1  
10  1  0  1  0  |  1  
11  1  0  1  1  |  1  
12  1  1  0  0  |  1  
13  1  1  0  1  |  1  
14  1  1  1  0  |  1  
15  1  1  1  1  |  1  
```

对于四元逻辑函数，我们在求不同函数的真值表时，只需要更换下面这一行代码即可

```py
F = (A | B | (C & D)).subs({A:eachone[0], B:eachone[1], C:eachone[2], D:eachone[3]})
```