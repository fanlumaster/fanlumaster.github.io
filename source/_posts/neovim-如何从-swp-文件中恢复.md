---
title: neovim 如何从 swp 文件中恢复
date: 2022-08-20 23:11:34
updated: 2024-04-11 00:31:48
tags:
- neovim
categories:
index_img: https://i.imgur.com/PwERaWZ.jpg
banner_img: https://i.imgur.com/PwERaWZ.jpg
---

今天遇到了一个这样的问题，电脑在重启的时候没有保存 nvim 当前的界面，然后，重启之后再用 nvim 打开这个文件的话，会报警告。

优雅的方法当然是得从其相应的 `.swp` 文件中进行恢复，因此，可以执行下面这个命令：

```shell
nvim -r filename
```

然后，还需要将提示的 `.swap` 给删除掉。然后再编辑就没有问题了。

如果想更加保险的话，可以在恢复界面出来的时候把里面的内容拷贝出来备份一下。

----------

还有另一种处理方法，如果是对最后修改的那一点点部分不太在意的话，那么，可以，在打开 Neovim 的初始页提示那里，我直接按下一个 `D` 选择 delete 也是可以的。当然，这个的前提其实是要在任务管理器中把所有的 nvim 进程都给删掉。好在，在 Windows11 22H2 之后，任务管理器是支持搜索和过滤的，所以，想要终止所有的 nvim 进程并不是一件困难的事情。


