---
title: VSCode 的 black-formatter 插件吊诡的错误
date: 2023-04-25 16:47:33
tags:
- VSCode
- Python
categories:
index_img: https://i.imgur.com/BB5hPPK.png
banner_img: https://i.imgur.com/BB5hPPK.png
---

问题的描述：在 VSCode 中想要给 python 格式化代码，如果使用微软提供的这个 `Black Formatter` 插件，那么，我们大概率会得到一个报错，导致不能够正常地把代码给格式化，而我，是不需要使用 VSCode 里面的这个 black 格式化插件的，我直接调用 Python 的库——black，就可以了。

那么，该如何解决这个问题呢？那就是看一下有没有在什么巧合的情况下触发了 `Black Formatter` 的安装，然后，我们把这个插件给卸载就好啦！他奶奶的，坏我心情。

![](https://i.imgur.com/kkECPD4.png)
