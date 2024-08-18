---
title: VMware 在 Ubuntu18 环境下升级 VMware Tools
date: 2021-07-13 15:51:53
tags:
- VMware
categories:
- VMware
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713161609.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713161609.png
---

好吧，经过几番折腾之后，我决定执行下面的命令直接梭哈

```bash
$ sudo apt-get autoremove open-vm-tools
$ sudo apt-get install open-vm-tools
$ sudo apt-get install open-vm-tools-desktop
```

警告：升级之后 VMware Tools 似乎失效了。阅读此博客时还请慎重。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713155303.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713155344.png)

同时，我们发现下面有一个指引，

> 在客户机中装载虚拟机 CD 驱动器，启动终端，使用 tar 解压缩安装程序，然后执行 vmware-install.pl 安装 VMware Tools。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713155543.png)

在当前目录下打开终端，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713155629.png)

执行命令

```bash
$ cp VMwareTools-10.3.23-17030940.tar.gz ~/Downloads/
```

然后进入 `~/Downloads/` 目录下，执行解压命令

```bash
$ tar -xvf VMwareTools-10.3.23-17030940.tar.gz
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713155905.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713160146.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713160443.png)

进入解压后的文件夹目录，

```bash
$ cd ./vmware-tools-distrib/
$ ls
$ sudo ./vmware-install.pl
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713160904.png)

然后在安装的过程中，我们一路 yes、回车即可，安装好的界面如下

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713161127.png)

到此，就安装完成了。

最后，我们可以点击下面的按钮，把挂载的 VMware Tool 映像给去掉

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713161247.png)