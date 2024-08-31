---
title: 隐藏（去掉）Hexo 命令行执行 hexo d 时出现的 warning LF will be replaced by CRLF 警告信息
date: 2021-04-21 22:14:13
updated: 2023-11-30 13:06:10
tags:
- Hexo
- Git
categories:
- Git
index_img: https://i.imgur.com/cLf1KZ8.jpg
banner_img: https://i.imgur.com/cLf1KZ8.jpg
---


### 问题描述

Hexo 在部署到 Github 上时，即执行 `hexo d` 命令时，命令行出现这样的警告

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210421221511.png)

这个警告表示 Git 会把 `LF` 替换为 `CRLF`，这个警告并没有什么不好的影响，所以我决定把它给隐藏掉。

### 解决方法

Git 命令行输入以下命令

```bash
$ git config --global core.autocrlf false
```


