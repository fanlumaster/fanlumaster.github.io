---
title: LaTex 数学公式左对齐写法
date: 2021-09-15 18:18:16
tags:
- LaTex
categories:
- LaTex
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210916124905.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210916124905.png
---

## 需求描述

写两行等式，然后让这两行等式保持左对齐。

## 实现

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

参考：

1、<https://stackoverflow.com/questions/11296415/how-to-left-align-mathjax-elements>