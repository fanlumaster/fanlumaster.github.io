---
title: Python 快速教程
date: 2025-02-18 15:04:33
tags:
  - Python
  - Tutorials
categories:
index_img: https://i.postimg.cc/HWK4SQtk/image.png
banner_img: https://i.postimg.cc/HWK4SQtk/image.png
description: "从 Python 开始学编程。谨以此文祭奠我的编程老师 Vamei 前辈。"
sticky: 100
---

## 前言

这是对 vamei 前辈的教程的一次翻新。原教程链接如下，

<https://www.cnblogs.com/vamei/archive/2012/09/13/2682778.html>

vamei 在原教程中写道，

> 怎么能快速地掌握 Python？这是和朋友闲聊时谈起的问题。
> Python 包含的内容很多，加上各种标准库、拓展库，乱花渐欲迷人眼。我一直希望写一个快速的、容易上手的 Python 教程，而且言语简洁，循序渐进，让没有背景的读者也可以从基础开始学习。我将在每一篇中专注于一个小的概念，希望在闲暇时可以很快读完。

事实上，我读完这个系列之后，确实打开了 Python 编程的大门，更重要的是，也踏入了整个编程的世界。希望这个系列的教程对你也有用。无论出于何种目的来学习编程，我都衷心地希望你能够体会到编程的乐趣。

本教程也配备了相应的视频，可以移步 [bilibili](https://space.bilibili.com/3493138859559908) 观看。

**小提醒**

1. 教程基于 Python3.13，测试环境为 Windows。
2. 标准库的一些包不适用于 Windows 平台。如果文中的程序无法在你的平台上运行，欢迎讨论。
3. 我将专注于 Python 的主干，以便读者(观众)能以最快时间对 Python 形成概念。
4. Linux 命令行将以$开始，比如 `ls`, `python`。
5. Python 命令行将以 `>>>` 开始，比如 `>>>print 'Hello World!'`。
6. 注释会以#开始。

**建议**

- 将教程中的命令敲到 Python 中看看效果。
- 看过教程之后，可以进行一些练习。
- 参与文章(视频)评论区的讨论，可以更好的积累经验。

## Python 基础

### Python 基础 01 Hello World!

简单的 `Hello World!`。

#### Python 命令行

假设你已经安装好了 Python, 那么在 Powershell 命令行输入：

```powershell
$ python
```

将直接进入 python。然后在命令行提示符 `>>>` 后面输入：

> > > print('Hello World!')

可以看到，随后在屏幕上输出:

Hello World!

`print` 是一个常用函数，其功能就是输出括号中的字符串。

#### 写一段小程序

另一个使用 Python 的方法，是写一个 Python 程序。用文本编辑器写一个 `.py` 结尾的文件，比如说 `hello.py`。

在 `hello.py` 中写入如下，并保存：

```py
print('Hello World!')
```

退出文本编辑器，然后在命令行输入：

```powershell
$ python ./hello.py
```

来运行 hello.py。可以看到 Python 随后输出，

```py
Hello World!
```

#### 总结

`print`

命令行模式: 运行 Python，在命令行输入命令并执行。

程序模式: 写一段 Python 程序并运行。

### python 基础 02 基本数据类型

简单的数据类型以及赋值。
