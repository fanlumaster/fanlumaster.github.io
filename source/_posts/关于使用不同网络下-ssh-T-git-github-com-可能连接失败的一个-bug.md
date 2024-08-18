---
title: 关于使用不同网络下 ssh -T git@github.com 可能连接失败的一个 bug
description: '是日，遇一奇葩错误，遂记录之。'
date: 2021-04-02 23:30:18
tags:
- bugs
categories:
- bugs
index_img: https://i.imgur.com/6aQJaIX.png
banner_img: https://i.imgur.com/6aQJaIX.png
---

今天遇到一个奇怪的错误。

今天在同学租的房子里，使用房东的 WiFi，然后在执行

```bash
ssh -T git@github.com
```

时出现连接超时的情况。真是日了狗了。

因为这个错误，我无法使用 `hexo d` 命令，导致我以为是今天使用 WebStorm 打开博客根目录然后 WebStorm 给文件根目录加了一个 `.idea` 文件的缘故，然后我又重新配置了 GitHub 的 SSH 相关内容，因为我在同一台电脑上搭建了两个 Hexo 博客，工作量可想而知，真是日了狗了！！！

然后重新配置好了 SSH 之后，测试刚刚那个命令结果还是超时，我日，然后，我将网络换成手机的热点，日了狗了，好了，可以连上了！干你娘！竟然是网络的问题，亏我还给 Git 配置了代理。哔了狗了。