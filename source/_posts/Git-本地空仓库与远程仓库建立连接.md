---
title: Git 本地空仓库与远程仓库建立连接
date: 2022-09-14 12:56:37
updated: 2022-09-14 16:10:35
tags:
- git
- github
categories:
index_img: https://i.imgur.com/PdMIPsw.png
banner_img: https://i.imgur.com/PdMIPsw.png
---

今天遇到了一个需求，我的其中一个博客需要在两个电脑之间进行同步，由于用的是 Hexo，所以想利用 GitHub 进行同步，这样我在两台设备之间就可以进行同步了。

如果一台电脑的话，无非是创建一个私有仓库，然后把本地的仓库和远程仓库建立连接，然后 push 一下就可以了。

![](https://i.imgur.com/Khvu75Z.png)

但是这里涉及到另一台电脑，步骤基本还是一样的，我是先把这台电脑的文件夹下的内容给清空，然后再执行以下操作，

```shell
git init
```

```shell
git remote add origin + // 远程仓库地址
```

```shell
git pull origin master --allow-unrelated-histories
```

```shell
git branch --set-upstream-to=origin/master
```

之后我们就可以执行 `git pull` 命令把这个当前的空仓库给填充满了。

今天还发现了另外一个有趣的事情，两台电脑，一个是 Win11，另一个是 Manjaro Linux，如果把 Windows 上的 git 仓库复制到 Linux 中，在 ssh 相同的情况下，可以直接 push 到 GitHub 上面。
