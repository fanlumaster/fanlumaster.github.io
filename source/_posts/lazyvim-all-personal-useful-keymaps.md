---
title: Vim/Nvim/Lazyvim 个人配置之所有常用的操作
date: 2024-04-11 00:35:11
updated: 2024-04-11 22:08:26
tags:
- Neovim
categories:
index_img: https://i.imgur.com/aNMNdM1.png
banner_img: https://i.imgur.com/aNMNdM1.png
---

且用且记录。

仅仅作查漏补缺用。作为一个 vim/nvim 用户，我想，很多模式化、规范化的操作或者是 keymap 都是烂熟于心的，毕竟是每天都要用很多次的。

## 一些快捷键式的操作

- `Ctrl+\, Ctrl+n`: 在 toggleterm 或者 term 中或者其他的一些无法使用 Esc 回退到 normal 的情况下，从 insert 模式来到 normal 模式。
- `Esc+Esc`: 在 toggleterm 或者 term 中从 insert 模式下回退到 normal 模式。
- search symbols in current file: `leader + s + s`，这个要求当前有一个 lsp client 已经 attach 到当前的 buffer 了。

## 一些类似于 vim 进阶的操作

### 如何使用 nvim 来为每一行自动编号

比如，我现在第 2 行到第 12 行是空行，然后，我想给这几行的开头分别从 1 自动开始递增编号，那么，可以怎么做呢？

这里讲一个方法，首先，使用列编辑，给第 2 行到第 12 行的开头都整上一个 0，然后，使用行 visual 模式把这些行都选中，然后执行一下 `g<c-a>` 即可。这里的 `<c-a>` 是表示每行都会增量地 add 一下的意思。如果是增量递减该怎么做呢？答案是 `<c-s>`。

本部分参考：

- <https://www.zhihu.com/question/20240867>


