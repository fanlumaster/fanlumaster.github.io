---
title: vim 设置 tab 为 4 个空格
date: 2022-08-30 23:19:35
updated: 2022-08-30 23:27:20
tags:
- vim
categories:
index_img: https://i.imgur.com/sExUUWU.png
banner_img: https://i.imgur.com/sExUUWU.png
---

这是一个老生常谈的问题，也设置过不止一次，但是就是没有记录过！该死。

还是记录一下吧。这是比较简单的配置，配置项的具体理解也比较简单，对照着文档来看的话是不难理解的。所以这里就直接记录一下我的设置，方便以后再次配置这个的时候能够快速在自己的笔记里面找到这个内容，

```vimrc
:set tabstop=4
:set softtabstop=4
:set shiftwidth=4
:set expandtab
```

其实还有一个选项可以配置，

```vimrc
:set autoindent
```

但是，我不太想设置这个自动缩进，因为它其实是不太智能的。
