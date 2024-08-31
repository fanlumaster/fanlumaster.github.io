---
title: 矩阵链乘法问题的 Python 实现（《算法导论》）
description: '对《算法导论》中的使用动态规划解决的矩阵链乘法的 Python 实现.'
date: 2021-05-03 22:51:56
updated: 2024-06-12 23:01:51
tags:
- 《算法导论》
- 算法
- 动态规划
categories:
- 算法设计与分析
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222908.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222908.png
---

### 思路

#### 递归公式

$$
m[i, j] = 
\left\{
\begin{matrix}
\begin{align}
& 0 & if \quad i = j \\
& min\{m[i, k] + m[k + 1, j] + p_{i - 1} p_k p_j\} & if \quad i < j \\
\end{align}
\end{matrix}
\right.
$$

#### 伪码

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601000955.png)

关于伪码的说明。

m[i, j] 表示计算矩阵 `$A_{i..j}$` 的所需标量乘法次数的最小值。而 `$A_{i..j}(i \leqslant) j$` 表示的是 `$A_iA_{i + 1} \cdots A_j$` 乘积的结果矩阵。s[i, j] 表示记录最优值 m[i, j] 对应的分割点 k，我们可以依赖最终的 s 表来构造最优解。

还有一个注意点，即 `$A_i = p_{i - 1} \times p_i$`。

### Python 代码

```py
# -*- coding: utf-8 -*-
# @File  : matrix_chain_order.py
# @Author: FanLu
# @Date  : 2021/5/3

def matrix_chain_order(p:list):
    '''
    计算矩阵链乘法最优代价
    :param p: 由矩阵乘法式转化成的序列，注意，这里的 p 序列的长度比矩阵链乘数的长度要多一
    :return: m 和 s 表
    '''
    n = len(p) - 1 # 获取乘数的个数 n
    m = [[0 for i in range(n)] for i in range(n)]
    s = [[0 for i in range(n - 1)] for i in range(n - 1)]
    for cl in range(2, n + 1): # cl is the chain length
        for i in range(0, n - cl + 1): # i 是每个 cl 片段的起点位置，n - cl + 1 是最后一个 cl 片段的终点位置
            j = i + cl - 1 # j 是每一个 cl 片段的终点索引
            m[i][j] = float('inf')
            for k in range(i, j): # 尝试每一个切割位置，循环找出最优解
                q = m[i][k] + m[k + 1][j] + p[i] * p[k + 1] * p[j + 1] # p[i] 和书中的 p[i - 1] 对应
                if q < m[i][j]:
                    m[i][j] = q
                    s[i][j - 1] = k # 注意这里的二维索引
    return [m, s]

def print_optimal_parents(s:list, i:int, j:int):
    '''
    打印最优化括号方案
    :param s: 记录最有分割点的列表
    :param i: 矩阵链的起点位置
    :param j: 矩阵链的终点位置
    :return: None
    '''
    if i == j:
        print('A_' + str(i), end='')
    else:
        print('(', end='')
        print_optimal_parents(s, i, s[i][j - 1])
        print_optimal_parents(s, s[i][j - 1] + 1, j)
        print(')', end='')

if __name__ == '__main__':
    p = [30, 35, 15, 5, 10, 20, 25]
    res = matrix_chain_order(p)
    print(res)
    m = res[0]
    s = res[1]
    for each in res:
        for ea in each:
            print(ea)
        print('--------')
    print(m[1][4])
    print_optimal_parents(s, 0, 5)
```

测试的输出：

```
[[[0, 15750, 7875, 9375, 11875, 15125], [0, 0, 2625, 4375, 7125, 10500], [0, 0, 0, 750, 2500, 5375], [0, 0, 0, 0, 1000, 3500], [0, 0, 0, 0, 0, 5000], [0, 0, 0, 0, 0, 0]], [[0, 0, 2, 2, 2], [0, 1, 2, 2, 2], [0, 0, 2, 2, 2], [0, 0, 0, 3, 4], [0, 0, 0, 0, 4]]]
[0, 15750, 7875, 9375, 11875, 15125]
[0, 0, 2625, 4375, 7125, 10500]
[0, 0, 0, 750, 2500, 5375]
[0, 0, 0, 0, 1000, 3500]
[0, 0, 0, 0, 0, 5000]
[0, 0, 0, 0, 0, 0]
--------
[0, 0, 2, 2, 2]
[0, 1, 2, 2, 2]
[0, 0, 2, 2, 2]
[0, 0, 0, 3, 4]
[0, 0, 0, 0, 4]
--------
7125
((A_0(A_1A_2))((A_3A_4)A_5))
```

### 说明

这个算法初看时不容易理解，但是跟着书上的思路，仔细地走上一遍，最终理解这个算法的思想是不困难的。

但是，在实现代码的过程中，也没有想象中那样顺利。主要原因是数组索引的问题。书中的数组索引有的是以 1 作为起始索引，有的是以 0 作为起始索引，而我在使用 Python 实现的过程中，全部是以 0 作为起始索引（这样主要是为了不浪费空间）。这样一来，就很可能产生一些索引的对应问题。遂，将索引对应的关系记录如下

1. `m[i][j]`：对应书中的 `m[i + 1, j + 1]`，表示计算矩阵 `$A_{i + 1..j + 1}$` 所需标量乘法次数的最小值。关于定义，书中是 `m[1..n, 1..n]`，而代码中是 `m[0..n - 1][0..n - 1]`。
2. `s[i][j]`：对应书中的 `s[i + 1, j + 2]`，表示最优值 `m[i + 1][j + 2]` 对应的分割点 k。关于定义，书中是 `s[1..n - 1, 2..n]`，而代码中是 `s[0..n - 1][0..n - 1]`，**因此**，这也导致了在代码中，与 `m[i][j]` 对应的最优分割点是 `s[i][j - 1]`。
