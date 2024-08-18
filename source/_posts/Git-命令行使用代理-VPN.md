---
title: Git 命令行使用代理 VPN
date: 2021-03-23 16:41:10
tags:
- Git
- 小技巧
categories: Git
description: Git 使用 VPN 代理来提速
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608002813.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608002813.png
---

首先查看我们使用的 “相关” 软件的端口设置：

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210223012913.png)

然后在 Git Bash 中敲入设置全局代理的命令：

```bash
git config --global http.proxy 'socks5://127.0.0.1:4781'
git config --global https.proxy 'socks5://127.0.0.1:4781'
```

上面的命令，一个是设置 http，另一个是设置 https。

设置完之后 git clone 一个仓库进行测试，发现速度飙到了 5.5 mb/s，而原来的速度是只有十几 kb/s 的。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210223012957.png)

记录遇到的坑：

一开始我是使用的命令是：

```bash
git config --global http.proxy 'http://127.0.0.1:4780'
git config --global https.proxy 'https://127.0.0.1:4780'
```

这里的端口就对应上面的 http(s) 端口，然而，几经测试，发现都是没有效果，最后换成了 socks5，问题才得到解决。

---

参考：

1、<https://www.yixuju.cn/other/talking-about-proxy/>
2、<http://www.beiliangshizi.com/?p=532>