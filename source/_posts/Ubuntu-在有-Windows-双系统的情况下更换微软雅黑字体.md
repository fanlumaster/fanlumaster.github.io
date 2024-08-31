---
title: Ubuntu 在有 Windows 双系统的情况下更换微软雅黑字体
date: 2021-10-30 14:57:58
updated: 2021-11-06 15:55:52
tags:
- Ubuntu
- Linux
categories:
- Ubuntu
index_img: https://i.imgur.com/y3ds1Ha.png
banner_img: https://i.imgur.com/y3ds1Ha.png
---

此次操作的 Ubuntu 版本是 Ubuntu20.04。

# 安装

首先，找到 Windows 安装的磁盘分区：

![](https://i.imgur.com/pZGliv6.png)

![](https://i.imgur.com/j1pUc1X.png)

然后，在 `C:\Windows` 目录下打开 Terminal，然后，将所有的 Windows 字体复制到 `/usr/share/fonts` 目录下，并使用命令安装字体：

```shell
sudo mkdir /usr/share/fonts/WindowsFonts
sudo cp Fonts/* /usr/share/fonts/WindowsFonts
sudo chmod 755 /usr/share/fonts/WindowsFonts/*
```

最后，使用命令重新生成 fontconfig 缓存：

```shell
sudo fc-cache
```

# 使用

在命令行打开 gnome-tweaks

```shell
gnome-tweaks
```

然后，在相关的选项里面进行修改字体即可：

![](https://i.imgur.com/VzUW5hh.png)