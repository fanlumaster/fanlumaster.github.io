---
title: LaTex 数学公式花括号右侧数学公式每行保持左对齐(及部分内容左对齐)
date: 2021-06-01 00:23:42
updated: 2021-06-01 15:49:10
tags:
- LaTex
categories:
- LaTex
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601002118.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601002118.png
description: '记录 LaTex 数学公式中多行公式保持左对齐的书写方法，方便用时备查。'
---

## 示例代码

### 示例 1

```latex
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
```

效果

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

### 示例 2

```latex
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
```

效果

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

### 示例 3

```latex
$$
c[i, j] = 
\left\{
\begin{matrix}
\begin{align}
& {0} && {if \quad i = 0 \; or \; j = 0,} \\
& {c[i - 1, j - 1] + 1} && {if \quad i, j > 0 \; and \; x_i = y_j,} \\
& {max(c[i, j - 1], c[i - 1, j])} && {if \quad i, j > 0 \; and \; x_i \neq y_j.} \\
\end{align}
\end{matrix}
\right.
$$
```

效果

$$
c[i, j] = 
\left\{
\begin{matrix}
\begin{align}
& {0} && {if \quad i = 0 \; or \; j = 0,} \\
& {c[i - 1, j - 1] + 1} && {if \quad i, j > 0 \; and \; x_i = y_j,} \\
& {max(c[i, j - 1], c[i - 1, j])} && {if \quad i, j > 0 \; and \; x_i \neq y_j.} \\
\end{align}
\end{matrix}
\right.
$$

## 注意点

这里的关键是要把需要对齐的行包裹在 `\begin{align}` 和 `\end{align}` 内，然后使用对齐符号 `&`。

注意上面的示例 3，后面使用了 `&&` 这样一个符号，来对第二部分的内容进行左对齐，这里解释一下这个符号的含义，第一个 `&` 表示分隔，第二个 `&` 表示对齐。