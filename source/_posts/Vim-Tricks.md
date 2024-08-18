---
title: Vim/Nvim Tricks
date: 2023-05-02 23:37:53
tags:
- Neovim
- 未竟
categories:
index_img: https://i.imgur.com/CYehdRd.png
banner_img: https://i.imgur.com/CYehdRd.png
description: 'Vim/Neovim tricks recorded along with time'
---

Yet another blog about vim/neovim tricks. Not only about pure vim/nvim itself, maybe will also include notes about some ecosystem around vim/nvim, for example, nvim plugins tricks, neovide etc.

## vim如何获取当前的文件的名称

首先，把模式切换到 insert 这一状态，然后，按下 `Ctrl + R`，然后，我们再输入 `%`，这样，就可以把当前 buffer 中的文件的全路径给上屏了。

## 如何打开一个超大的文件

比如说，超过 100MB 的纯文本文件。

这时，我们不应带上配置，而是使用 clean 选项的 neovim 来打开这个文本文件，

```bash
nvim --clean largefile.txt
```

不然的话，性能会极其堪忧。而使用原生的不带配置的 neovim 打开大文件的话，性能极其优越。

默认是没有行号的，此时，我们可以执行一下这个，

```bash
:set number
```

如果是使用 neovide 的话，那么，使用如下的命令，

```bash
neovide -- --clean largefile.txt
```

## update treesitter

In Windows, each time when we update treesitter, we may always be anxious and nervous, cause we cannot ensure that all the parsers that need to be updated will end in being updated successfully. So in this case, I will give some suggestinos, that is, we could make use of windows task manager to search `nvim.exe` process, then, end them all. After finishing that, start a new nvim process, then, perform the task of update.

![](https://i.imgur.com/KYHZhtd.png)


