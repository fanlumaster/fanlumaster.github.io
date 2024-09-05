---
title: Python 中的 *args 和 **kwargs
date: 2022-09-09 17:06:59
updated: 2022-09-09 17:31:19
tags:
- Python
categories:
index_img: https://i.imgur.com/HYe9W17.png
banner_img: https://i.imgur.com/HYe9W17.png
---

惭愧呀，这个是新手问题。咳咳。好吧，当初看过然后忘掉了。

这个问题是很简单的，`*args` 是可变参数，`**kwargs` 是可变的键值对参数。

但是呢，我们在定义函数的时候，如果有固定的参数，那就严格遵守顺序喽。

`*args` 会收集多个参数，顺序的话，就按照正常的直觉来就可以，比如，如果固定参数在可变参数的后面的话，那么，固定参数传值就要使用键值对的形式。其他的就按照函数定义中的参数的顺序来。

然后就是，`**kwargs` 必须放在最后。
