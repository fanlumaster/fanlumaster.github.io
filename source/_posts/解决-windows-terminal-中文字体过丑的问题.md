---
title: 解决 windows terminal 中文字体过丑的问题
date: 2022-08-20 21:25:04
tags:
- Windows
categories:
index_img: https://i.imgur.com/Usb6okz.jpg
banner_img: https://i.imgur.com/Usb6okz.jpg
---

使用了一点时间之后来更新：

这个字体一旦用过一点时间，习惯起来还是很容易的。主要整体的协调性是不差的。但是原来的没有设置过的中文字体确实是不敢恭维。

原文：

这个 win11 怎么说呢，之前还记得怎么修改系统的语言设置来使得这个 windows terminal 的中文显示是可以保持为微软雅黑的，现在已经忘掉了。

然后在 v2ex 上看到有人提议去修改系统注册表中的 fontlink，我试了一下，发现改完之后在 wt 里面根本不生效，但是 powershell 窗口里面却可以正常运作。

这微软的开发人员很有问题啊，这个问题单已经存了好久了呀，到现在还不解决，真是有够怠惰的。

我的一个暂时捏住鼻子的做法呢，是设置 windows terminal 的字体为"更纱"字体，还能有什么办法呢？只有捏着鼻子认了，这个字体的汉字风格是日系的。好在总算是解决了整体的协调性。真正在代码编辑器里面，肯定还是用其他的字体的。

我目前用的字体是这个：

![](https://i.imgur.com/dXLUWtW.png)

Sarasa Mono Slab HC.(这个字体相对来说没那么日系)
