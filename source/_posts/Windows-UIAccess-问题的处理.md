---
title: Windows UIAccess 问题的处理
date: 2023-05-13 15:17:32
updated: 2023-05-15 23:22:27
tags:
- Win32
- Cpp
categories:
index_img: https://imgur.com/0ZTBx5G.png
banner_img: https://imgur.com/0ZTBx5G.png
---

最近是遇到了这样的问题，一直没有时间去具体地解决，在我自己的输入法上面遇到的这个问题，因为其他问题的优先级更高，所以拖到了今天才去解决它。好在，花费了大概一天的时间，总算是把这个问题解决，如果说，后面可能还有一点残余的工作，那也只是一些细枝末节性的事情。

我遇到的问题是，举一个具体的例子，在使用 Win32 的 `SetWindowPos` 的时候，我们使用 `HWND_TOPMOST` 这个参数，那么，实际上，我们的窗口并不可以一直做到一直处于整个桌面的最前面，

```cpp
SetWindowPos(gHwnd, HWND_TOPMOST, 0, 0, 0, 0, SWP_SHOWWINDOW | SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER | SWP_NOACTIVATE);
```

那么，经过查阅相关的资料，发现，这个有不少人遇到过这个问题，最近的一次 [stackoverflow](https://stackoverflow.com/questions/71767438/keep-window-on-top-of-taskbar-on-windows-11) 上面也有人问，但是没有人去回答，好吧，那我只好帮帮他了。

首先，因为我现在使用的输入法：Yzime，它有一个选项，UIAccess，然后看它的 ahk 源码，发现，它是通过 dllcall 来调用系统的 UIAccess 相关的函数的，那么，既然它可以用，那么，我的这个纯粹的 C++ 项目为什么不可以呢，于是去找 manifest 的配置写法，发现似乎有点问题，然后又看到 GitHub 上的这个仓库：<https://github.com/killtimer0/uiaccess>，把其中的头文件往项目中引入一下，然后把最终编译好的 exe 文件使用管理员权限来运行，果然是可以的。这下算是把问题解决了。

另，为了不让程序每次运行都弹出一个确认的弹窗，我把系统的 UIA 设置调到了最低，这里注意并且记录一下，

![](https://i.imgur.com/sQPTwBC.png)

