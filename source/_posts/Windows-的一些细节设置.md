---
title: Windows 的一些细节设置
date: 2023-11-21 12:50:05
updated: 2024-06-14 00:07:29
tags:
- Windows
- 未竟
categories:
index_img: https://i.imgur.com/l87eCBH.png
banner_img: https://i.imgur.com/l87eCBH.png
---

首先从具体的问题着手。本文包括但不限于 Windows11 的一些细节设置、使用技巧等。

## 一些可能会遇到的问题的处理

### 如何处理一些 Qt 写的软件出现数字乱码的情况

切换一下系统的区域，然后重启即可。如果切换到英语国家对使用没有影响的话，那么，切换这么一次就可以了。而如果还是想要中文，那么，再重复一次切换、重启的操作即可。

![](https://i.imgur.com/uAyk7fc.png)

![此时是修复好的状态](https://i.imgur.com/QUynXWJ.png)

### 如何去掉 23H2 的桌面切换动画

<https://www.reddit.com/r/Windows11/comments/16tx25r/any_way_to_remove_virtual_desktop_switching/>

最简单的方法就是使用 ViVeTool 这个工具。把这个特性给关掉即可。

他妈的，后面微软更新之后，这个**不生效**了。现在(2024.05.31)我也不知道该怎么办了。

下面的分割线以下是一些基础或者概览性的内容。

### 一些常用的 keymap(hotkey)

这里只记录我常用的、我掌握的。

- `Win + D`: 在"所有窗口都最小化"与原来的状态之间进行切换。

## 一些软件的食用指南

### Microsoft Edge

无奈，因为 Google account 超出了 3 个，所以，不得不启用这个 Edge 候选项。因为一个 Chrome 正式版、Chrome Beta 版、和一个 Firefox 正式版已经被耗尽了。

----------

### 一些必备软件的安装

- Windows Terminal
- PowerShell7
- Neovim
- Neovide
- Potplayer
- everything
- VSCode
- VSCode Insiders
- 自制输入法(基于 d2d 和 windows hook，详见我的 GitHub 仓库)
- Notepad++
- Obsidian
- Okular
- Telegram
- IDEA
- DataGrip
- Chrome
- Chrome Beta
- Firefox
- qBittorrent
- clash verge
- snipaste
- powertoys
- MobaXterm
- GoldenDict
- MusicBee
- StarShip
- [LazyVim](https://github.com/LazyVim/LazyVim)
- [WinMemoryCleaner](https://github.com/IgorMundstein/WinMemoryCleaner)
- Fastfetch(Neofetch 的现代版)


