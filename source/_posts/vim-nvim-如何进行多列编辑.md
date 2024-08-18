---
title: vim(nvim) 如何进行多列编辑
date: 2022-09-06 15:09:06
tags:
- vim
categories:
index_img: https://i.imgur.com/FL8tx1R.png
banner_img: https://i.imgur.com/FL8tx1R.png
---

或者也可以说，列的多光标编辑？不过这样有点不严谨，因为得对齐。

这个操作还是比较简单的的。

首先，按住 `Ctrl + v` 进行列选择，然后按住 `Shift + i` 或 `Shift + a` 进入插入模式，这时光标会来到某一行进行修改，修改完毕之后，按 `Esc` 键退出到 Normal 模式，这时，刚才选中的那些列就集体得到了修改。
