---
title: 记一次 manjaro 更新后开机界面卡死的事故
date: 2023-11-06 12:50:12
tags:
- Manjaro
- Linux
categories:
index_img: https://i.imgur.com/in2yofR.png
banner_img: https://i.imgur.com/in2yofR.png
---

前天周六晚上使用 manjaro 自带的图形软件更新的，它自动把我的 linux 内核给更新到了 6.4.9.1，并且设置成了默认的内核。

然后，我在重启 manjaro 应用更新的时候，发现系统进不去了，一直卡在了`/dev/nvme` 然后又是什么 `clean ... files, blocks` 这里。我重试了几次强制关机开机。不行。

于是 `Ctrl+AltF3` 进入命令行，登录 root 用户，之后，

```shell
sudo vi /etc/default/grub
```

这里，我是把下面的值从 hidden 改成 menu，

```shell
GRUB_TIMEOUT_STYLE = menu
```

保存退出，然后，执行，

```shell
sudo update-grub
```

之后再 `reboot` 即可。

![](https://i.imgur.com/xF4kZwy.png)

后面就可以进入开机的一个 manjaro 提供的菜单界面了，我们可以在这里选择高级启动选项，然后，指定一个低版本的内核来启动就可以了。

后面可以进入系统之后，我们就可以把之前的那个高版本的内核给去掉了，

![](https://i.imgur.com/FzpTqPY.png)

话说回来，不支持的内核竟然也可以被更新，这应该算是一个 bug 了。

----------

参考：<https://nihil.cc/posts/problem_with_grub>


