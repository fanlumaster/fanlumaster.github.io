---
title: LaTex 数学公式将下标放在正下方（上标放在正上方）
date: 2021-06-01 00:17:34
updated: 2021-10-19 16:11:14
tags:
- LaTex
categories:
- LaTex
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601002015.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210601002015.png
---


使用 LaTex 的语法，关于把数学公式的下表放在正下方的方法，分两种情况。如下。

## 1、本身是数学符号

比如，`$\sum$`，行内数学公式默认的格式是 

```latex
$\sum_{i = 0}^{n}$
```

效果是：$\sum_{i = 0}^{n}$

而如果我们要想将下标放在正下方，则需要使用 `\limits` 语法，书写格式如下

```latex
$\sum\limits_{i = 0}^{n}$
```

效果是：$\sum\limits_{i = 0}^{n}$

**注意**，如果使用段数学公式，即用双美元符号包裹的 LaTex 代码，那么，下标是默认放置在正下方的。格式如下

```latex
$$\sum_{i = 0}^{n}$$
```

效果如下

$$\sum_{i = 0}^{n}$$

## 2、本身不是数学符号

比如，如果我们想将 `max` 的右下角的下标放置在正下方，就像这样 `$\mathop{max}\limits_{1 \leqslant i \leqslant n}$`，那么我们需要先使用 `\mathop` 将 `max` 转为数学符号，然后再使用 `\limits`，格式如下

```latex
$\mathop{max}\limits_{1 \leqslant i \leqslant n} |x_i|$
```

效果是：$\mathop{max}\limits_{1 \leqslant i \leqslant n} |x_i|$

**注意**，如果使用段数学公式，那么，相应的代码和效果如下

代码 2.1

```latex
$$\mathop{max}_{1 \leqslant i \leqslant n} |x_i|$$
```

效果 2.1

$${max}_{1 \leqslant i \leqslant n} |x_i|$$

代码 2.2

```latex
$$\mathop{max}_{1 \leqslant i \leqslant n} |x_i|$$
```

效果 2.2

$$\mathop{max}_{1 \leqslant i \leqslant n} |x_i|$$

代码 2.3

```latex
$$\mathop{max}\limits_{1 \leqslant i \leqslant n} |x_i|$$
```

效果 2.3

$$\mathop{max}\limits_{1 \leqslant i \leqslant n} |x_i|$$

还有一个值得**注意**的点是，只有数学符号可以使用 `\limits` 语法，这一点一定要切记。

## 3、其他方法

代码：

```latex
$$\stackrel{+}{\Rightarrow}$$
```

显示效果：

$$
\stackrel{+}{\Rightarrow}
$$