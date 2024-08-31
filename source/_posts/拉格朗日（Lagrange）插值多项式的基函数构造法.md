---
title: 拉格朗日（Lagrange）插值多项式的基函数构造法(详细推导)
description: '拉格朗日插值多项式的推导.'
date: 2021-05-20 15:13:15
updated: 2022-08-31 23:08:49
tags:
- 计算方法
- 插值法
- 数值积分
categories:
- 计算方法
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222616.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222616.png
---

先从最简单的一次插值(n = 1) 开始, 求作一次式 $L_{1}(x)$, 使之满足条件

$$L_{1}(x_{0}) = y_0, \quad L_1(x_1) = y_1.$$

从几何上看, $y = L_1(x)$ 即是过点 $(x_0, y_0)$ 和 $(x_1, y_1)$ 的直线, 由解析几何知道, 这条直线可用点斜式表示为

$$L_1(x) = y_0 + \frac{y_1 - y_0}{x_1 - x_0}(x - x_0). \qquad (1)$$

线性插值公式 $(1)$ 亦可表为下列两点式

$$L_1(x) = \frac{x - x_1}{x_0 - x_0}y_0 + \frac{x - x_0}{x_1 - x_0}y_1. \qquad (2)$$

若记

$$l_0(x) = \frac{x - x_1}{x_0 - x_1}, \quad l_1(x) = \frac{x - x_0}{x_1 - x_0},$$

则式 $(2)$ 还可写为

$$L_1(x) = y_0l_0(x) + y_1l_1(x) = \sum_{i = 0}^{1}y_il_i(x),$$

其中, $l_i(x)$ 称为插值基函数, 它们的图形见下图, 

![](https://i.imgur.com/zEdjQYn.png)

且有如下特点:

$$
\left\{
\begin{matrix}
\begin{align}
& l_0(x) + l_1(x) = 1, \\
& l_0(x_0) = 1, \: l_0(x_1) = 0, \\
& l_1(x_0) = 0, \: l_1(x_1) = 1, \\
\end{align}
\end{matrix}
\right. \qquad (3)
$$

即

$$
l_i(x_j) = \delta_{ij} = 
\left\{\begin{matrix}
1, \quad i = j, \\
0, \quad i \neq j, \\
\end{matrix}\right.
\quad i, j = 0, 1.
$$

由上可见, $\displaystyle l_0(x) = \frac{x - x_1}{x_0 - x_1}$ 与 $\displaystyle l_1(x) = \frac{x - x_0}{x_1 - x_0}$ 满足条件 $(3)$ 且都是线性函数,反过来,如果一次函数 $l_0(x)$ 与 $l_1(x)$ 满足条件 $(3)$, 那么可以证明, 它们只能是 $\displaystyle \frac{x - x_1}{x_0 - x_1}$ 与 $\displaystyle \frac{x - x_0}{x_1 - x_0}$.

事实上, 由代数多项式的性质值, 如果 $x_0$ 是一个 $n$ 次多项式 $L_n(x)$ 的零点, 则多项式 $L_n{x}$ 就一定含有一因子 $(x - x_0)$, 这时

$$L_n(x) = (x - x_0) L_{n - 1}(x), $$

其中, $L_{n - 1}(x)$ 为 $n - 1$ 次多项式.

因此, 对于一次函数 $l_0(x)$, 性质 $l_1(x_1) = 0$ 说明 $x_1$ 是 $l_0(x)$ 的零点, 这时 $l_0(x)$ 含有因子 $(x - x_1)$; 由于 $l_0(x)$ 是一次多项式, 所以

$$l_0(x)= c(x - x_1), \qquad (4)$$

其中, c 是常数. 又由 $l_0(x_0) = 1$, 将其代入式 $(4)$, 得 $\displaystyle \frac{1}{x_0 - x_1}$, 于是得

$$l_0(x)= \frac{x - x_0}{x_0 - x_1}.$$

同理可得

$$l_1(x) = \frac{x - x_0}{x_1 - x_0}.$$

函数 $l_0(x), l_1(x)$ 也常称一次 $Lagrange$ 基函数.

**一般情形:**

求作 $n$ 次式 $L_n(x)$, 使之满足

$$L_n(x_i) = y_i = f(x_i), \quad i = 0, 1, ..., n. \qquad (5)$$

从几何上看, 就是求作 $n$ 次曲线 $y = L_n(x)$, 使之通过 $(n + 1)$ 个点 $(x_0, y_0), (x_1, y_1), ..., (x_n, y_n)$. 设

$$L_n(x) = \sum_{i = 0}^{n} y_i l_i(x),$$

也就是仍从构造所谓插值基函数 $l_i(x)$ 入手, 由插值条件 $(5)$ 知 $l_i(x)$ 应满足条件 $l_i(x) = \delta_{ij}, \: i, j = 0, 1, ..., n$, 即 $n$ 次多项式 $l_i(x), \: i = 0, 1, ..., n$ 满足条件

$$
\left\{
\begin{matrix}
\begin{align}
& l_0(x_0) = 1, l_0(x_1) = 0, ..., l_0(x_n) = 0, \\
& l_1(x_0) = 0, l_1(x_1) = 1, ..., l_1(x_n) = 0, \\
& \cdots \cdots \\
& l_n(x_0) = 0, l_n(x_1) = 0, ..., l_n(x_n) = 1. \\
\end{align}
\end{matrix}
\right. \qquad (6)
$$

由条件 $(6)$ 知, $n$ 次多项式 $l_0(x)$ 有 $n$ 个零点, 它们为 $x_1, x_2, ..., x_n$, 所以

$$l_0(x)= c_0(x - x_1)(x - x_2) \cdots (x - x_n), \qquad (7)$$

其中, $c_0$ 为待定常数; 把 $x = x_0$ 代入式 $(7)$, 并注意到 $l_0(x_0) = 1$, 可推得

$$l_i(x) = \frac{(x - x_0) \cdots (x - x_{i - 1}) (x - x_{i + 1}) \cdots (x - x_n)}{(x_i - x_0) \cdots (x_i - x_{i - 1})(x_i - x_{i + 1}) \cdots (x_i - x_n)} = \prod_{j = 0 \\ i \neq j}^{n} \frac{x - x_j}{x_i - x_j}. \qquad (8)$$

于是 $y = f(x)$ 的 $n$ 次插值多项式可写为

$$L_n(x) = \sum_{i = 0}^{n} y_il_i(x) = \sum_{i = 0}^{n} (\prod_{j = 0 \\ j \neq i}^{n} \frac{x - x_j}{x_i - x_j})y_i. \qquad (9)$$

易验证有 $\displaystyle L_n(x_i) = \sum\limits_{i = 0}^{n} y_i l_i(x_i) = y_i$, 即 $L_n(x)$ 满足插值条件 $(5)$. 形如式 $(9)$ 的插值多项式称为 $Lagrange$ 插值多项式, 由式 $(8)$ 所表示的 $n$ 次代数多项式 $l_i(x)(i = 0, 1, ..., n)$ 称为以 $x_i(i = 0, 1, ..., n)$ 为节点的 $Lagrange$ 插值基函数. 上述构造插值多项式的方法叫做基函数法.

特别地, 一点零次插值多项式为

$$L_0(x) = y_0,$$

两点一次插值(线性插值)多项式为

$$L_1(x) = \frac{x - x_1}{x_0 - x_1}y_0 + \frac{x - x_0}{x_1 - x_0}y_1,$$

三点二次插值(抛物插值)多项式为

$$
\begin{equation}
{L_2(x) = \frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)} y_0 + \frac{(x - x_0)(x - x_2)}{(x_1 - x_0)(x_1 - x_2)} y_1 + \frac{(x - x_0)(x - _1)}{(x_2 - x_0)(x_2 - x_1)} y_2. \qquad (10) }
\end{equation}
$$

按: 本博客内容摘自《数值分析》(李红).
