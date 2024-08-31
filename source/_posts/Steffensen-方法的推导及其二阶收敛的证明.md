---
title: Steffensen 方法的推导及其二阶收敛的证明
date: 2021-03-23 18:33:52
updated: 2024-08-19 18:33:03
tags:
- 数学
- 证明
categories: 计算方法
index_img: https://i.imgur.com/DRIV55b.png
banner_img: https://i.imgur.com/DRIV55b.png
description: Steffensen 方法的推导以及证明其至少是二阶收敛的
mathjax: true
---

### Steffensen 方法的推导

由于 Steffensen 方法是由弦截法改造来的，所以，这里先给出弦截法的迭代公式

$$ x_{k + 1} = x_k - \frac{x_k - x_{k - 1}}{f(x_k) - f(x_{k - 1})} f(x_k), \quad k = 1, 2,... \ .$$

弦截法的定义及推导比较简单，这里不再赘述，然后我们来看如何将弦截法改造成 Steffensen 方法：若弦截法产生的迭代序列 $\{ x_k \}$ 充分接近于精确解 $x^*$，则 $x_k - x_{k - 1}$ 与 $f(x_k)$ 均充分接近于零。因此，我们可以近似地置 $x_k - x_{k - 1} \approx f(x_k)$，然后将弦截法迭代公式中的 $x_{k - 1}$ 给代换掉，就得到了 **Steffensen** 方法

$$x_{k + 1} = x_k - \frac{f^2(x_k)}{f(x_k) - f(x_k - f(x_k))}, \quad k = 1, 2,... \ .$$

### 证明 Steffensen 方法的二阶收敛性

**给定条件**：设 $f(x) = 0$ 有根 $x_*$，其中 $f(x)$ 在 $x^*$ 的某邻域 $S(x^*, \delta)$ 内二阶连续可微，且 $f^{'} (x) \neq 0$.

**证明：**

由 Steffensen 迭代公式，有

$$\varphi(x) = x - \frac{f(x)}{f(x) - f(x - f(x))}$$

对 $f(x - f(x))$ 进行泰勒展开，得

$$\displaystyle f(x - f(x)) = f(x) - f^{'}(x)f(x) + \frac{1}{2}f^{''}(\xi)f^{2}(x) ，$$

其中，$\xi$ 是 $x$ 和 $x - f(x)$ 之间的一个值。

于是，有

$$g(x) = \frac{f(x) - f(x - f(x))}{f(x)} = \frac{f^{'}(x)f(x) - \frac{1}{2}f^{''}f^{2}(x)}{f(x)} = f^{'}(x) - \frac{1}{2} f^{''}(\xi) f(x) .$$

进而，

$$\varphi (x) = x - \frac{f^{2} (x)}{f(x) - f(x - f(x))} = x - \frac{f(x)}{f^{'} (x) - \frac{1}{2} f^{''} (\xi) f(x)}.$$

因此，

$$\frac{\varphi(x) - \varphi(x^*)}{x - x^*} = \frac{x - \frac{f(x)}{f^{'} (x) - \frac{1}{2} f^{''} (\xi) f(x)} - x^*}{x - x^*} = \frac{x - x^* - \frac{f(x)}{f^{'} (x) - \frac{1}{2} f^{''} (\xi) f(x)}}{x - x^*} = 1 - \frac{f(x) - f(x^*)}{x - x^*} \frac{1}{f^{'} (x) - \frac{1}{2} f^{''} (\xi) f(x)}$$

所以，

$$\varphi^{'} (x^*) = \lim_{x \to x^*} \frac{\varphi(x) - \varphi(x^*)}{x - x^*} = 1 - f^{'} (x^*) \frac{1}{f^{'} (x^*)} = 0.$$

因为 $f^{'}(x^*) \neq 0$，所以，Steffensen 方法至少是二阶收敛的。

注意，Steffensen 方法是严格二阶收敛的，但是，证明这个所需的知识不在学习范围内，暂时不作证明。

按：本文给出的 Steffensen 方法是华科的计算方法课本上的。网上还有其他的形式，在符号上略有区别，但是证明方法相同，而且，英文的证明在网上比较多。
