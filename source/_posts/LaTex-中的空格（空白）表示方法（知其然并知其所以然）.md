---
title: LaTex 中的空格（空白）表示方法（知其然并知其所以然）
date: 2021-03-28 23:38:04
tags:
- LaTex
- MathJax
categories:
- LaTex
index_img: https://i.imgur.com/YgKjhdF.png
banner_img: https://i.imgur.com/YgKjhdF.png
description: 关于 LaTex 的显示空格的方式，这个并没有参考中文的一些网上资料，因为感觉稍微有些迷惑，而且有很多都是雷同的，并没有讲清楚（并没有说其他的中文资料不好的意思，只针对这一个知识点），然后在外网找到了比较详细的关于这个小知识点的详细的解释，遂记录并分享之。
mathjax: true
---

### LaTex 中的单位

首先我们来了解一下之后我们在使用空格时需要用到的 LaTex 中的单位。

- `cm`：1 厘米
- `em`：大致等于一个当前字体的 `M` 的宽度
- `mu`：等于 1/18 `em` 的数学单位

### LaTex 显示空格

#### 语法格式

- `\hspace{1cm}`：插入 1cm 的水平空白，这里也可以使用其他的 LaTex 单位。如 `pt、mm、cm、in、ex、em、mu`。这个指令是可以很精确地控制显示多少空白的。
- `\quad`：大致和当前字体的 `M` 等宽的空白（= 18 mu = 1 em）
- `\,`：等于 3/18 个 `\quad`（= 3 mu）
- `\:`：等于 4/18 个 `\quad`（= 4 mu）
- `\;`：等于 5/18 个 `\quad`（= 5 mu）
- `\!`：等于 -3/18 个 `quad`（= -3 mu）
- `\ `(在反斜杠后面跟一个空格)：等于正常文本中的一个空格
- `\qquad`：两倍的 `quad`（= 36 mu）

#### 使用范例

LaTex 代码

```latex
$$\begin{align}
& 0->a \hspace{2cm}bcd \\
& 0->a \hspace{1em}bcd \\
& 0->a \hspace{18mu}bcd \\
& 1->a \quad bcd \\
& 2->a \, bcd \\
& 3->a \: bcd \\
& 4->a \; bcd \\
& 5->a \! bcd \\
& 6->a \  bcd \\
& 7->a \qquad bcd \\
& 8->abcd
\end{align}$$
```

效果

$$\begin{align}
& 0->a \hspace{2cm}bcd \\
& 0->a \hspace{1em}bcd \\
& 0->a \hspace{18mu}bcd \\
& 1->a \quad bcd \\
& 2->a \, bcd \\
& 3->a \: bcd \\
& 4->a \; bcd \\
& 5->a \! bcd \\
& 6->a \  bcd \\
& 7->a \qquad bcd \\
& 8->abcd
\end{align}$$

参考：[hspace 相关]()， [quad 相关](https://www.overleaf.com/learn/latex/Spacing_in_math_mode#Reference_guide)，[LaTex 单位](https://www.overleaf.com/learn/latex/Lengths_in_LaTeX)


附注一：关于 quad 的解释

> The word “quad” is a traditional term in typography. It comes from Italian “quadratone” (big square). In old fashioned metal typography it meant a square piece of metal lower than type height that could be inserted between types for spacing them. In Italian typography it's still called “spazio quadratone”.
> It's commonly as wide and high as an uppercase “M”, since this is usually the widest letter in a font and occupies a square area.
> The command \quad takes its name from this traditional name; \qquad just means ”two quads”. However in TeX the \quad has no height, but only width.(来自：[stackexchange](https://tex.stackexchange.com/questions/119068/meaning-of-quad#:~:text=In%20the%20Not%20so%20Short,is%20the%20space%20of%20MM%20.))

附注二：这里使用的 LaTex 解析器是 mathjax。