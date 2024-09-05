---
title: scoop 的安装与使用
date: 2022-08-20 15:58:10
updated: 2022-08-20 16:11:22
tags:
- Windows
categories:
index_img: https://i.imgur.com/ie2Qa6Y.png
banner_img: https://i.imgur.com/ie2Qa6Y.png
---

又是新的 Windows 的环境。

这次是 Win11，不知为何，这一次使用过的 powershell 竟然不需要配置代理就能够正常下载外网的内容了，难道是 pwsh 更新之后，或者说 windows terminal 更新之后可以正确读取系统的代理配置了？不太清楚。

这篇博客，记录 scoop 的使用是次要的，scoop 的使用现在应该不是很多。而且，使用起来也很简单(对于正常接受大学计算机教育的人来说)。主要是新电脑的第一篇博客，测试一下。

下面是 scoop 的使用指南，这次以安装 pandoc 为例，这个是写 hexo 博客必备的一个渲染软件。

来到[官网](https://scoop.sh/)，执行下面两条语句：

![](https://i.imgur.com/8YeDB0H.png)

然后安装 pandoc 和 latex，

```shell
scoop install pandoc
scoop install latex
```

![](https://i.imgur.com/Jxqr6Ot.png)

很简单的。以前还需要给 pwsh 配置代理，现在竟然不需要了。不知道为什么。当然，也不排除深圳这边的网络可能有点“问题”。
