---
title: vim 的复制粘贴
date: 2021-11-26 22:40:44
tags:
- vim
categories:
- vim
index_img: https://i.imgur.com/LeihSSz.png
banner_img: https://i.imgur.com/LeihSSz.png
---

本文内容转载自：<https://www.cnblogs.com/huahuayu/p/12235242.html>

# vim 内部复制、粘贴、剪切

## 选择文本

- v + 光标移动（按字符选择）高亮所要的文本，然后进行各种操作比如，
    - d 表示删除
    - c 表示更改选中的文字
        按：按 c 之后会将选中的内容删除，然后模式转为 INSERT 模式。
- V（按行选择）。
    按：V 不太好用。

## 复制 y(ank)

- `y`：用 v 命令选中文本后，用 y 进行复制
- `yy`：复制当前行，然后用 p 进行粘贴
- `5yy`：复制从当前行开始的 5 行
    按：如果文本短的话，直接就可以使用这个命令来复制全部文本
- `y_`：等同于 yy
- `Y`：等同于 yy
- `yw`：复制当前单词
- `y$`：从当前位置复制到行尾
- `y0`：从当前行复制到行首
- `y^`：从当前位置向左复制到第一个非空白字符  
    ![](https://i.imgur.com/Je6B8Jy.png)  
    按：这里是从 21 行的 t 字符使用这个命令，然后复制的结果是 24 行的内容。
- `yG`：从当前行复制到文件结束
- `y20G`：从当前行复制到第 20 行
- `y?bar`：复制至上一个出现 bar 的地方

## 粘贴 p(aste)

- `p`：小写，在光标位置之后粘贴，其实是粘贴在光标的下一行。
- `P`：大写，在光标位置之前粘贴，其实是粘贴在光标的上一行。

## 剪切

- `v` + 方向键(hjkl)选中内容 + `d` 剪切 + `p` 粘贴

# 剪贴板(寄存器)

## 默认剪贴板

vim has 26 named registers "a/A" to "z/Z". Vim fills or updates the content of these registers only when we tell it to do so. That is to say, we have 26 clipboards in Vim.

更多内容，参考 <https://www.baeldung.com/linux/vim-registers>

# 系统剪贴板

vim 支持系统剪贴板，需要打开 clipboard 功能。使用下面的命令，检查当前版本的 vim 是否支持 clipboard，

```shell
$ vim --version | grep "clipboard"
+clipboard         +keymap            +printer           +vertsplit
+emacs_tags        +mouse_gpm         -sun_workshop      +xterm_clipboard
```

`+clipboard` 代表支持，`-clipboard` 代表不支持。

如果不支持的话，需要重新安装别的版本的 vim，这个在网上也有相关的教程，暂时不再赘述。

## vim 复制到系统剪贴板

我们只需要设置 vim 默认使用系统剪贴板即可。在确定 vim 支持 `+clipboard` 之后，如果想 `y/p` 直接和系统剪贴板打通，可以在 `~/.vimrc` 中加上如下配置：

```
set clipboard^=unnamed,unnamedplus
```

还有其他的方法，这里暂时不去研究。用到的时候再说。
