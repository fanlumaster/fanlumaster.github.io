---
title: 解决全程对最短路径问题的 Floyd-Warshall 算法(未竟)
date: 2021-06-01 16:25:05
tags:
- 未竟
- 《算法导论》
- 算法设计与分析
categories:
- 算法设计与分析
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601164944.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601164944.png
---

## 算法思路

### 递归式

$$
d_{ij}^{(k)} = 
\left\{
\begin{matrix}
\begin{align}
& \omega_{ij} && {if \quad k = 0} \\
& min(d_{ij}^{(k - 1)}, d_{ik}^{(k - 1)} + d_{kj}^{(i - 1)}) && {if \quad k \geqslant 1} \\
\end{align}
\end{matrix}
\right.
$$

### 伪码

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601164449.png)

### 一个例子

![图1](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601164657.png)

![根据图1计算出的矩阵序列](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601164538.png)

## Python 代码实现

```py
# -*- coding: utf-8 -*-
# @File  : floyd_warshall.py
# @Author: FanLu
# @Date  : 2021/5/18

# 利用 Floyd-Warshall 算法计算全成对最短路径
def floydWarshall(W:list):
    n = len(W)
    D_list = [[] for i in range(n + 1)] # 一共需要 n + 1 个 D
    D_list[0] = [[0 for i in range(n + 1)] for i in range(n + 1)]
    # 前驱矩阵 PI
    PI = [[] for i in range(n + 1)]
    PI[0] = [[0 for i in range(n + 1)] for i in range(n + 1)]
    # 初始化 D_list[0]
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            D_list[0][i][j] = W[i - 1][j - 1]
    # 初始化 PI[0]
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            if i == j or W[i - 1][j - 1] == float('inf'): # 这里的坐标注意取值
                PI[0][i][j] = None
            if i != j and W[i - 1][j - 1] < float('inf'):
                PI[0][i][j] = i
    # 开始迭代
    for k in range(1, n + 1):
        D_list[k] = [[0 for i in range(n + 1)] for i in range(n + 1)] # 索引为 0 的元素抛弃不用
        PI[k] = [[0 for i in range(n + 1)] for i in range(n + 1)] # 索引为 0 的元素抛弃不用
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                # 构造 D_list
                D_list[k][i][j] = min(D_list[k - 1][i][j], D_list[k - 1][i][k] + D_list[k - 1][k][j])
                # 构造 PI
                if D_list[k - 1][i][j] <= D_list[k - 1][i][k] + D_list[k - 1][k][j]:
                    PI[k][i][j] = PI[k - 1][i][j]
                else:
                    PI[k][i][j] = PI[k - 1][k][j]
    # return D_list
    return [D_list, PI]

# print all pairs shortest path
def printAPSP(PI: list, i: int, j: int):
    if i == j:
        print(i, end=' ')
    elif PI[i][j] == None:
        print('no path from "i" to "j" exits')
    else:
        printAPSP(PI, i, PI[i][j])
        print(j, end=' ')

def print_matrix(matrix:list):
    for each in matrix:
        each = each[1:]
        for one in each:
            one = one[1:]
            print(one)
        print('--------')

if __name__ == '__main__':
    W = [[0, 3, 8, float('inf'), -4],
         [float('inf'), 0, float('inf'), 1, 7],
         [float('inf'), 4, 0, float('inf'), float('inf')],
         [2, float('inf'), -5, 0, float('inf')],
         [float('inf'), float('inf'), float('inf'), 6, 0]]
    res = floydWarshall(W)
    for each in res[0]:
        each = each[1:]
        for one in each:
            one = one[1:]
            print(one)
        print('---------')
    print('===================================================')
    for each in res[1]:
        each = each[1:]
        for one in each:
            one = one[1:]
            print(one)
        print('---------')

    # 打印从 i 到 j 的路径
    for i in range(1, len(W) + 1):
        for j in range(1, len(W) + 1):
            print('节点' + i.__str__() + '到节点' + j.__str__() + '的最短路径为:  ', end='')
            printAPSP(res[1][len(res[1]) - 1], i, j)
            print()

```

运行结果

```
[0, 3, 8, inf, -4]
[inf, 0, inf, 1, 7]
[inf, 4, 0, inf, inf]
[2, inf, -5, 0, inf]
[inf, inf, inf, 6, 0]
---------
[0, 3, 8, inf, -4]
[inf, 0, inf, 1, 7]
[inf, 4, 0, inf, inf]
[2, 5, -5, 0, -2]
[inf, inf, inf, 6, 0]
---------
[0, 3, 8, 4, -4]
[inf, 0, inf, 1, 7]
[inf, 4, 0, 5, 11]
[2, 5, -5, 0, -2]
[inf, inf, inf, 6, 0]
---------
[0, 3, 8, 4, -4]
[inf, 0, inf, 1, 7]
[inf, 4, 0, 5, 11]
[2, -1, -5, 0, -2]
[inf, inf, inf, 6, 0]
---------
[0, 3, -1, 4, -4]
[3, 0, -4, 1, -1]
[7, 4, 0, 5, 3]
[2, -1, -5, 0, -2]
[8, 5, 1, 6, 0]
---------
[0, 1, -3, 2, -4]
[3, 0, -4, 1, -1]
[7, 4, 0, 5, 3]
[2, -1, -5, 0, -2]
[8, 5, 1, 6, 0]
---------
===================================================
[None, 1, 1, None, 1]
[None, None, None, 2, 2]
[None, 3, None, None, None]
[4, None, 4, None, None]
[None, None, None, 5, None]
---------
[None, 1, 1, None, 1]
[None, None, None, 2, 2]
[None, 3, None, None, None]
[4, 1, 4, None, 1]
[None, None, None, 5, None]
---------
[None, 1, 1, 2, 1]
[None, None, None, 2, 2]
[None, 3, None, 2, 2]
[4, 1, 4, None, 1]
[None, None, None, 5, None]
---------
[None, 1, 1, 2, 1]
[None, None, None, 2, 2]
[None, 3, None, 2, 2]
[4, 3, 4, None, 1]
[None, None, None, 5, None]
---------
[None, 1, 4, 2, 1]
[4, None, 4, 2, 1]
[4, 3, None, 2, 1]
[4, 3, 4, None, 1]
[4, 3, 4, 5, None]
---------
[None, 3, 4, 5, 1]
[4, None, 4, 2, 1]
[4, 3, None, 2, 1]
[4, 3, 4, None, 1]
[4, 3, 4, 5, None]
---------
节点1到节点1的最短路径为:  1 
节点1到节点2的最短路径为:  1 5 4 3 2 
节点1到节点3的最短路径为:  1 5 4 3 
节点1到节点4的最短路径为:  1 5 4 
节点1到节点5的最短路径为:  1 5 
节点2到节点1的最短路径为:  2 4 1 
节点2到节点2的最短路径为:  2 
节点2到节点3的最短路径为:  2 4 3 
节点2到节点4的最短路径为:  2 4 
节点2到节点5的最短路径为:  2 4 1 5 
节点3到节点1的最短路径为:  3 2 4 1 
节点3到节点2的最短路径为:  3 2 
节点3到节点3的最短路径为:  3 
节点3到节点4的最短路径为:  3 2 4 
节点3到节点5的最短路径为:  3 2 4 1 5 
节点4到节点1的最短路径为:  4 1 
节点4到节点2的最短路径为:  4 3 2 
节点4到节点3的最短路径为:  4 3 
节点4到节点4的最短路径为:  4 
节点4到节点5的最短路径为:  4 1 5 
节点5到节点1的最短路径为:  5 4 1 
节点5到节点2的最短路径为:  5 4 3 2 
节点5到节点3的最短路径为:  5 4 3 
节点5到节点4的最短路径为:  5 4 
节点5到节点5的最短路径为:  5 
```