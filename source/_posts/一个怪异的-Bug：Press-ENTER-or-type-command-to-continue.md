---
title: 一个怪异的 Bug：Press ENTER or type command to continue
description: '在使用 vim 过程中遇到的一个奇怪的问题'
date: 2021-04-05 23:44:50
updated: 2023-06-01 03:09:12
tags:
- Bugs
- Vim
- Linux
categories:
- Bugs
index_img: https://i.imgur.com/affgJbP.png
banner_img: https://i.imgur.com/affgJbP.png
---

![20210405234503](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405234503.png)

问题就是，我进入了这个 vim 的配置文件之后，敲了几下键盘，然后就陷入了出不来的死循环之中。

然而，最后，根据 vim 的命令行的提示，是使用了如下的命令

```bash
:qa!
```

才成功退出来。