---
title: 绕个路解决 Ubuntu terminal 在从全屏或最大化切换到原来窗口时窗口尺寸缩小的问题
date: 2021-11-03 17:13:54
updated: 2021-11-06 16:09:06
tags:
- Ubuntu
categories:
- Ubuntu
index_img: https://i.imgur.com/bHZSzte.png
banner_img: https://i.imgur.com/bHZSzte.png
---

Ubuntu 的 terminal 有一个严重的问题，那就是在最大化 terminal 或者全屏化窗口之后再恢复到原来的窗口时，这个窗口的尺寸会缩小一行和一列。

这个问题七年前就存在，今天在谷歌找了半天，最终也没有找出一个像样的解决方案，具体的讨论可以看看这些：

- [讨论一](https://bugs.launchpad.net/ubuntu/+source/gnome-terminal/+bug/1706008)
- [讨论二](https://bugs.launchpad.net/ubuntu/+source/gnome-terminal/+bug/1288655)

循着这两个讨论，发现网上的讨论还有很多，但是最终都没有完美的解决方案，gnome 官方到现在似乎也没有解决，Ubuntu 官方也不解决，无奈呀。

大家不响，我也不响。

不响半天，算了，给自己设置一个快捷命令吧。

于是，

```shell
$ vi ~/.bashsrc
```

然后，来到文件末尾，加上如下代码

```shell
# resize the window to 80x24 shortcut
alias rss='resize -s 24 80 >/dev/null'
```

然后，激活脚本：

```shell
$ source ~/.bashrc
```

然后我们就可以在命令行中使用 `rss` 命令来快速让窗口恢复到 `80 x 24` 的尺寸了。

解释一下这行脚本的含义：

`resize -s 24 80` 是将窗口重新设置成 `80 x 24` 的尺寸。如果是直接执行这个命令，那么终端会输出一些信息，

![](https://i.imgur.com/DqqyvcY.png)

所以，我们使用 `>/dev/null` 将输出进行重定向，`/dev/null` 可以理解为 Linux 下的回收站。

如此一来，我们在切换全屏或者最大化与正常窗口之间的状态时，执行一下这个我们自定义的命令就可以得到想要的效果了。

按：`resize` 这个快捷键是 xterm 中带有的，所以事前要先安装 xterm。