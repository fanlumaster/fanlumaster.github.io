---
title: 解决 Windows 命令行：'cl' 不是内部或外部命令
description: ' '
date: 2021-04-25 14:29:41
tags:
- Bugs
- Windows
- C 语言
categories:
- Bugs
index_img: https://i.imgur.com/S0WTaWQ.png
banner_img: https://i.imgur.com/S0WTaWQ.png
---

因为要在 Windows 上做操作系统原理的 C 语言实验，同时不愿意开一个笨重的 VS2019 来写一个简单的程序，遂决定在像 Linux 一样，在命令编译运行 C 语言程序，无奈根据微软官方文档的指示，命令行敲入 `cl` 后出现了 "'cl' 不是内部或外部命令" 的信息，不过这种情况的解决方案一般就是找到相关的 `exe` 文件所在的文件路径，然后将其添加到系统高级环境变量的 PATH 中即可。

下面是我的 `cl.exe` 文件所在的路径，根据你安装 VS2019 时选择的路径，路径会稍微不同，不过大同小异就是了

    D:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Tools\MSVC\14.28.29333\bin\Hostx64\x64

![20210425143545](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210425143545.png)

将这个路径添加到系统高级环境变量中的 Path 中之后，再次在命令行敲入 `cl`，成功输出正常的提示信息

![20210425143751](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210425143751.png)