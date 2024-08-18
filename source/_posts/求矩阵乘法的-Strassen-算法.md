---
title: 求矩阵乘法的 Strassen 算法之 Python 实现（《算法导论》）
description: '算法设计与分析实验二'
date: 2021-04-27 21:36:29
tags:
- 《算法导论》
- 算法
categories:
- 算法设计与分析
index_img: https://i.imgur.com/hLXkEew.png
banner_img: https://i.imgur.com/hLXkEew.png
---

### 代码实现

```py
# -*- coding: utf-8 -*-
# @File  : strassen.py
# @Author: FanLu
# @Date  : 2021/4/27

'''
矩阵乘法的 Strassen 算法
'''

def matrix_add(matrix_a:list, matrix_b:list) -> list:
    '''
    矩阵加法
    :param matrix_a: 加数
    :param matrix_b: 加数
    :return: 相加后的结果矩阵 matrix_c
    '''
    rows = len(matrix_a) # 矩阵行数
    columns = len(matrix_a[0]) # 矩阵列数
    matrix_c = [list() for i in range(rows)] # 结果矩阵
    for i in range(rows):
        for j in range(columns):
            tmp = matrix_a[i][j] + matrix_b[i][j]
            matrix_c[i].append(tmp)
    return matrix_c

def matrix_minus(matrix_a:list, matrix_b:list) -> list:
    '''
    矩阵减法
    :param matrix_a: 被减数
    :param matrix_b: 减数
    :return: 相减后的结果矩阵 matrix_c
    '''
    rows = len(matrix_a) # 矩阵行数
    columns = len(matrix_a[0]) # 矩阵列数
    matrix_c = [list() for i in range(rows)] # 结果矩阵
    for i in range(rows):
        for j in range(columns):
            tmp = matrix_a[i][j] - matrix_b[i][j]
            matrix_c[i].append(tmp)
    return matrix_c

def matrix_divide(matrix:list, row:int, column:int) -> list:
    '''
    分离一个子矩阵（四分之一）出来，注意，切割出来的子矩阵的边长是父矩阵的边长的一半
    :param matrix: 父矩阵
    :param row: 行的开始索引，row 的可能取值为 {1, 2}
    :param column: 列的开始索引，column 的可能取值为 {1, 2}
    :return: 切割好的矩阵
    '''
    rows = len(matrix) # 矩阵的边长
    matrix_sub = [list() for i in range(rows // 2)]
    k = 0
    for i in range((row - 1) * rows // 2, row * rows // 2):
        for j in range((column - 1) * rows // 2, column * rows // 2):
            tmp = matrix[i][j]
            matrix_sub[k].append(tmp)
        k += 1
    return matrix_sub

def matrix_merge(matrix_11:list, matrix_12:list, matrix_21:list, matrix_22:list) -> list:
    '''
    合并四个子矩阵
    :param matrix_11: 左上角的子矩阵
    :param matrix_12: 右上角的子矩阵
    :param matrix_21: 左下角的子矩阵
    :param matrix_22: 右下角的子矩阵
    :return: 合并之后的矩阵
    '''
    rows = len(matrix_11) # 矩阵的边长
    matrix_all = [list() for i in range(rows * 2)] # 合并之后的矩阵
    for i in range(rows):
        matrix_all[i] = matrix_11[i] + matrix_12[i] # 直接利用 Python 列表的加法
    for j in range(rows):
        matrix_all[rows + j] = matrix_21[j] + matrix_22[j]
    return matrix_all

def strassen(matrix_a:list, matrix_b:list) -> list:
    '''
    Strassen 算法计算矩阵的乘法
    :param matrix_a: 待乘矩阵
    :param matrix_b: 待乘矩阵
    :return: 结果矩阵
    '''
    rows = len(matrix_a) # 矩阵的边长
    if rows == 1:
        matrix_all = [list() for i in range(rows)]
        matrix_all[0].append(matrix_a[0][0] * matrix_b[0][0])
    else:
        # 创建 10 个矩阵
        s1 = matrix_minus(matrix_divide(matrix_b, 1, 2), matrix_divide(matrix_b, 2, 2))
        s2 = matrix_add(matrix_divide(matrix_a, 1, 1), matrix_divide(matrix_a, 1, 2))
        s3 = matrix_add(matrix_divide(matrix_a, 2, 1), matrix_divide(matrix_a, 2, 2))
        s4 = matrix_minus(matrix_divide(matrix_b, 2, 1), matrix_divide(matrix_b, 1, 1))
        s5 = matrix_add(matrix_divide(matrix_a, 1, 1), matrix_divide(matrix_a, 2, 2))
        s6 = matrix_add(matrix_divide(matrix_b, 1, 1), matrix_divide(matrix_b, 2, 2))
        s7 = matrix_minus(matrix_divide(matrix_a, 1, 2), matrix_divide(matrix_a, 2, 2))
        s8 = matrix_add(matrix_divide(matrix_b, 2, 1), matrix_divide(matrix_b, 2, 2))
        s9 = matrix_minus(matrix_divide(matrix_a, 1, 1), matrix_divide(matrix_a, 2, 1))
        s10 = matrix_add(matrix_divide(matrix_b, 1, 1), matrix_divide(matrix_b, 1, 2))
        # 7 个乘法
        p1 = strassen(matrix_divide(matrix_a, 1, 1), s1)
        p2 = strassen(s2, matrix_divide(matrix_b, 2, 2))
        p3 = strassen(s3, matrix_divide(matrix_b, 1, 1))
        p4 = strassen(matrix_divide(matrix_a, 2, 2), s4)
        p5 = strassen(s5, s6)
        p6 = strassen(s7, s8)
        p7 = strassen(s9, s10)
        # 求出四个子矩阵
        c11 = matrix_add(matrix_add(p5, p4), matrix_minus(p6, p2))
        c12 = matrix_add(p1, p2)
        c21 = matrix_add(p3, p4)
        c22 = matrix_add(matrix_minus(p5, p3), matrix_minus(p1, p7))
        # 合并矩阵
        matrix_all = matrix_merge(c11, c12, c21, c22)
        # 实验需要打印的 p1...p7，这里仅仅是为了应付实验的需要
        # print(p1)
        # print(p2)
        # print(p3)
        # print(p4)
        # print(p5)
        # print(p6)
        # print(p7)
    return matrix_all

import numpy
if __name__ == '__main__':
    a = [[1 for i in range(16)] for j in range(16)]
    b = [[1 for i in range(16)] for j in range(16)]
    c = strassen(a, b)
    print('打印结果矩阵')
    print(c)
    for i in c:
        print(i)
    # 使用 numpy 的矩阵乘法来验证
    n_a = numpy.array(a)
    n_b = numpy.array(b)
    print(n_a)
    print(n_b)
    print(n_a.dot(b))
```

说明：本算法严格参照《算法导论》的描述来实现。具体思路可以参照《算法导论》相关章节。