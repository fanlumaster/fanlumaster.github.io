---
title: Visual Studio 2022 如何设置 vim 插件的系统剪贴板
date: 2022-08-27 02:13:07
updated: 2022-08-27 02:58:54
tags:
- VS
- IDE
categories:
index_img: https://i.imgur.com/VBSH9Wu.jpg
banner_img: https://i.imgur.com/VBSH9Wu.jpg
---

问题的起因是，在将 Java 版本的二叉树的工具类转移到 C# 中时，有些符号需要从 VSCode 中复制到 VS 中去，由于两个 IDE 我都使用了 vim 插件，所以打通系统剪贴板很有必要。

好吧，其实，对于每一个使用 vim 插件的 IDE 来说，开启 vim 的系统剪贴板都是有必要的。

我们打开 VS 的 vim 配置，看一下配置文件的规则，

![](https://i.imgur.com/wKN4b4F.png)

然后，我们再在 VS 中执行 `:set` 命令看一下 `.vimrc` 文件需要放在哪里，

![](https://i.imgur.com/rnNSY2J.png)

之后我们在相应的目录下创建 `.vimrc` 文件，然后加上下面的语句即可，

```bash
set clipboard=unnamed
```

注意，由于这个 VS 插件所支持的 vim 版本比较低，所以，不可以使用 `unnamedplus` 这个值。

顺带说一句，neovim 打通系统剪贴板是可以使用 `unnamedplus` 的，是有效的。
