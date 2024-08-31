---
title: vim 使用 vimgrep 在当前文件夹下搜索所有文件
date: 2022-09-12 16:08:25
updated: 2022-09-12 16:23:54
tags:
- vim
categories:
index_img: https://i.imgur.com/29XatQc.png
banner_img: https://i.imgur.com/29XatQc.png
---

好吧，还没学会怎么使用 linux 中的 grep 命令，现在不得不学习 nvim 中的 vimgrep 命令了。这是没有办法的事情，今天是因为要修改一些博客的 tag 这个需求，以后这种需求肯定是会不少的，索性今天就记录一下吧。

首先，我们使用 `nvim .` 打开当前的目录，

然后，执行命令：

```vim
:vimgrep /博客园/g *
```

实际使用过程中把 `博客园` 换成想要搜索的字符串即可，

![](https://i.imgur.com/3x88HOk.png)

![](https://i.imgur.com/neQeRRT.png)

我们可以看到，底下出现了搜索到了 6 个结果，

然后我们可以再执行 `:cope` 命令，调出搜索出来的所有文件的分屏，

![](https://i.imgur.com/skf80pU.png)

然后这个分屏的操作就不用多说了，之后想怎么修改就修改去吧。

---

参考：

1、<https://zhuanlan.zhihu.com/p/148280898>
