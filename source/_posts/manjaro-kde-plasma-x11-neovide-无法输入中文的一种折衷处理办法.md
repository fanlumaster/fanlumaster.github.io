---
title: manjaro kde plasma x11 neovide 无法输入中文的一种折衷处理办法
date: 2023-11-05 18:10:31
updated: 2023-11-05 18:57:03
tags:
- Manjaro
- 输入法
categories:
index_img: https://i.imgur.com/dhAripp.png
banner_img: https://i.imgur.com/dhAripp.png
---

Linux 上使用中文输入法一直一来都是一件很让人头疼的一件事情。近年来，由于 csslayer 同志对于 fcitx5 投入的大量开发工作，这才在现在的大部分发行版 linux 中可以比较舒适地使用这个中文输入法。

Neovide 是一个令人难以割舍的软件。它是利用了 winit 来实现的跨平台窗口，按理说 winit 已经可以支持输入法了，毕竟，以 winit 为基础的 alacritty 终端早就解决了这个问题，然而，Neovide 却迟迟没有跟进，毕竟人家开发者不是东亚人嘛。不过，这个问题在今年年初似乎是得到了解决，这是作者在 issues 里面所提到的。可是，从年初到现在已经迭代了很多个版本了，我的 manjaro 依旧不能使用 fcitx5。

究其原因，我是一直使用 zsh 从终端打开的 neovide，还没试过直接点击应用图标或者使用 krunner 来打开。今天因为采购了一台新的显示器，所以，之后使用 manjaro 的时机会变多，不得不重又回来审视这个问题。

之前是使用 yay 安装的 neovide，现尝试直接从 github 的 release 里面下载作者构建好的 appimage 文件，而 appimage 文件我们第一次打开肯定都是使用图形界面去点击嘛，没想到，输入法竟然可以使用了！使用 krunner 打开也是可以的。

后面把这个 appimage 文件搞个 alias 放入 `.zshrc` 文件中，再从命令行中去运行，果然还是不行。不管有没有按照官方的文档把 ime 的选项设置成 true，都是不可以的，而如果是从图形界面打开，则是不管 ime 的设置如何，都可以在其中使用 fcitx5。

但是，知道可以有方法用了，那么，能用，就得知足呀。软件世界的产品都是不停迭代的。哪能在某一个时间段就要求其完美呢？

所以，以后涉及到 neovide 的使用，可以使用一种折衷的方法，那就是，先使用 nvim 打开一遍。然后再使用 krunner 或者单击任务栏的图标打开 neovide 把之前的 session 给取出来就可以了。

----------

参考：

1、<https://github.com/neovide/neovide/issues/1006>


