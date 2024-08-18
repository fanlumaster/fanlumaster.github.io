---
title: LaTex 数学公式对齐样例整理
date: 2021-09-15 18:38:28
tags:
- LaTex
categories:
- LaTex
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210916125012.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210916125012.png
---

### 样例一

让花括号中第二列中第一行的小于等于号和下一行的小于号对齐。

代码：

```latex
$$
[X]_{原} = 
\left\{
    \begin{matrix}
    \begin{align*}
&X & 0 & \leqslant X < 2^n \\ 
&2^n - X & -2^n & < X \leqslant 0
    \end{align*}
    \end{matrix}
\right.
$$
```

效果

$$
[X]_{原} = 
\left\{
    \begin{matrix}
    \begin{align*}
&X & 0 & \leqslant X < 2^n \\ 
&2^n - X & -2^n & < X \leqslant 0
    \end{align*}
    \end{matrix}
\right.
$$

参考：[stackexchange](https://tex.stackexchange.com/questions/145657/align-equation-left)，这里主要是参考了回答中的 `\begin{align*}` 的用法。

### 样例二

写两行等式，然后让这两行等式保持左对齐。

代码

```latex
$$
\begin{aligned}
& [X_1]_{原} = 0.1011 \\
& [X_2]_{原} = 1 - （-0.1011） = 1.1011
\end{aligned}
$$
```

效果

$$
\begin{aligned}
& [X_1]_{原} = 0.1011 \\
& [X_2]_{原} = 1 - （-0.1011） = 1.1011
\end{aligned}
$$

注：如果不加 `\begin{aligned} \end{aligned}`，那么默认的公式是保持居中显示。

---

参考：[stackoverflow](https://stackoverflow.com/questions/11296415/how-to-left-align-mathjax-elements)，这里主要是参考了 `\begin{aligned}` 的用法。

### 样例三

代码

```latex
$$
\begin{equation}
\begin{split}
[X_1]_{原} &= 01011\\
[X_2]_{原} &=2^4 - (-1011) \\
&=10000 + 1101 \\
&=11101
\end{split}
\end{equation}
$$
```

效果

$$
\begin{equation}
\begin{split}
[X_1]_{原} &= 01011\\
[X_2]_{原} &=2^4 - (-1011) \\
&=10000 + 1101 \\
&=11101
\end{split}
\end{equation}
$$

完整这个效果需要脑袋转一个弯，在这里只需要将等号全部对齐就行了。