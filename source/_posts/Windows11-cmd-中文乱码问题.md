---
title: Windows11 cmd 中文乱码问题
date: 2023-05-06 15:23:06
updated: 2023-05-06 16:04:35
tags:
- Windows
- Cpp
categories:
index_img: https://i.imgur.com/6ivLhnU.jpg
banner_img: https://i.imgur.com/6ivLhnU.jpg
---

梦回遥远的 Noob 时代。

最初的最初，那时还是 Win10 系统，使用 C/C++ 在 Windows 的 cmd(不是 powershell) 中打印一些字符串，如果遇到中文，那么，这个问题真是有够令人扶额的——乱码。

我想，很多人都忘不了大一时候被"狷"和"烫"支配的恐惧吧。

说回正事，今天遇到这个问题的由头是给我的一个 C++ Win32 GUI 程序配备一个 Console 来辅助调试代码，默认使用的是 cmd，所以，这个乱码的问题就来了。如何解决呢？现在也方便了，

- 先 `Win + r`，
- 然后输入 `intl.cpl`，回车，
- 然后，把 Unicode 的选项给勾选上即可。

![](https://i.imgur.com/mVrT55k.png)

![](https://i.imgur.com/y2HoCQj.png)

附：当然，很多人一开始会想到 `chcp 65001` 这个方法来 change code page 为 unicode，但是这个只是一次性的，当然，这个也可以通过其他方法来解决，对我来说，目前最简单的方法当然还是把这个 Unicode 的系统选项给勾选上啦。

---

参考：

1、<https://stackoverflow.com/questions/57131654/using-utf-8-encoding-chcp-65001-in-command-prompt-windows-powershell-window>

