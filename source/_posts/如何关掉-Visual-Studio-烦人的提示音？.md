---
title: 如何关掉 Visual Studio 烦人的提示音？
date: 2022-08-25 00:31:02
updated: 2024-08-31 03:40:14
tags:
- Visual Studio
categories:
index_img: https://i.imgur.com/aposgwl.jpg
banner_img: https://i.imgur.com/aposgwl.jpg
---

2024.08.31 更新

先看一下下面的命令的执行结果：

```txt
:set vimrcpaths?
```

![](https://i.postimg.cc/2r9CyV1t/image.png)

然后，在 home 目录下新建一个文件，根据上面的路径，我的是在 `C:\Users\fanyfull` 目录下新建，

```txt
New-Item .gvimrc
```

为什么是 gvimrc 呢？因为 vsvim 用的就是 gvim，

![](https://i.postimg.cc/MqNggRMz/image.png)

然后，往 .gvimrc 中加入如下两行即可，

```txt
set noerrorbells
set vb t_vb=
```

之后，重启 Visual Studio 即可。

参考：

- <https://stackoverflow.com/questions/18589352/how-to-disable-vim-bells-sounds>
- <https://stackoverflow.com/questions/73160623/vim-setup-with-visual-studio>

----------

以下是原文。

问题主要是，我在使用 vim 插件的时候，光标移动到最右边的时候，如果再按 `l` 往右移动的话，那么，系统就会给我发出蜂鸣声，实在不能忍受，于是想把它给关掉。

这个好像似乎没有办法在 VS 里面直接设置。所以我就直接把整个系统的这个蜂鸣的声音给关掉了，

![](https://i.imgur.com/YVamHmD.png)

![](https://i.imgur.com/X8IVKuD.png)

好像选得有点不对，反正设置的入口就在这里。找一下，设置一下就可以了。


