---
title: 证明严格对角占优矩阵经一步 Gauss 消元后仍为严格对角矩阵
date: 2021-03-28 16:17:14
updated: 2023-06-01 03:16:24
tags:
- 数学
- 线性代数
- 计算方法
categories: 计算方法
index_img: https://i.imgur.com/qlbIaGJ.png
banner_img: https://i.imgur.com/qlbIaGJ.png
description: 一道矩阵数学证明题
mathjax: true
---

### 问题

设矩阵 $\mathbf{A} = (a_{ij}) \in \mathbf{R}^{n \times n}$ 满足 $a_{11} \neq 0$，且其经一步 Gauss 消元后成为

$$
\begin{pmatrix}
a_{11} & \pmb{a}_{1}^{T} \\
\pmb{0} & \pmb{A}_2 \\
\end{pmatrix}
$$

证明：若 $\pmb{A}$ 为严格对角占优矩阵，则经一次 Gauss 消元之后的 $\pmb{A}^{(1)}$ 也是严格对角矩阵.

### 解答

注意到矩阵 $\pmb{A}^{(1)}$ 的 $i$ 行 $j$ 列元素为

$$a_{ij}^{(1)} = a_{ij} - a_{i1} \frac{a_{1j}}{a_{11}}, \quad i, j = 2, 3, ..., n.$$

要证严格对角占优矩阵 $\mathbf{A}$ 经过一步 Gauss 消元后的矩阵 $\mathbf{A}^{(1)}$ 仍是严格对角占优矩阵，即证

$$\left| a_{ii} - a_{i1} \frac{a_{1i}}{a_{11}} \right| > \sum_{j = 2, \\ j \neq i}^{n} \left| a_{ij} - a_{i1} \frac{a_{1j}}{a_{11}} \right|$$

然后，对不等式进行放缩，把左边缩小为

$$\left| a_{ii} \right| - \left| a_{ii} \right| \frac{\left| a_{1i} \right|}{\left| a_{11} \right|}$$

右边放大为

$$\sum_{j = 2, \\ j \neq i}^{n} \left( \left| a_{ij} \right| + \frac{\left| a_{1j} \right|}{\left| a_{11} \right|} \left| a_{i1} \right| \right)$$

放缩后的左边减去右边得

$$
\begin{equation}\begin{split}
& \left| a_{ii} \right| - \left| a_{ii} \right| \frac{\left| a_{1i} \right|}{\left| a_{11} \right|} - \sum_{j = 2, \\ j \neq i}^{n} \left| a_{ij} \right| - \sum_{j = 2, \\ j \neq i}^{n} \frac{\left| a_{1j} \right|}{\left| a_{11} \right|} \left| a_{i1} \right| \\ 
& = \left| a_{ii} \right| - \sum_{j = 2, \\ j \neq i}^{n} \left| a_{ij} \right| - \sum_{j = 2}^{n} \frac{\left| a_{1j} \right|}{\left| a_{11} \right|} \left| a_{i1} \right| \nonumber \\ 
& > \left| a_{i1} \right| - \left| a_{i1} \right| \sum_{j = 2}^{n} \frac{\left| a_{1j} \right|}{\left| a_{11} \right|} \\ 
& > 0 
\end{split}\end{equation}$$

所以，$\mathbf{A}^{(1)}$ 仍是严格对角占优矩阵。