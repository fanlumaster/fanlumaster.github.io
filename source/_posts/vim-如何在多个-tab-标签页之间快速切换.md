---
title: vim 如何在多个 tab 标签页之间快速切换
date: 2022-10-05 17:14:13
tags:
- vim
categories:
index_img: https://i.imgur.com/ifh7mgr.jpg
banner_img: https://i.imgur.com/ifh7mgr.jpg
---

如果只是会使用 `gt` 和 `gT` 的话，效率还是太低了。

在这两个命令的基础之上，我们可以使用 `ngt` 的方式来跳转到指定顺序的标签页，比如 `1gt` 就是跳转到第一个标签页，`5gt` 就是跳转到第五个标签页。

如果是 `ngT` 这种命令，就是往前跳转 `n` 个标签页。比如 `3gT` 是往前跳转 3 个标签页。

还有两个快捷命令，分别是跳转到所有标签页开头和结尾的：`:tabfirst` 和 `:tablast`，它们的缩写分别是 `:tabr` 和 `:tabm`。
