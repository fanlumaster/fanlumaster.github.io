---
title: Ubuntu 下编译新的 Linux 内核
description: '记录一次 Ubuntu 编译 Linux 内核的过程。'
date: 2021-04-07 13:30:09
tags:
- Linux
categories:
- Linux
index_img: https://i.imgur.com/JztWwKL.png
banner_img: https://i.imgur.com/JztWwKL.png
---

### 前言

这是一次操作系统布置的作业。本来第一次是布置的课后作业，只是说让编译一个新的 Linux 内核，然后我就按照本文的步骤编译并启用了新的内核。后来做实验时布置的任务又说是 “裁剪内核并编译”，真是有点懵逼。实验之前，一直在纠结裁减内核，究竟怎么裁剪嘛！因为在编译内核的过程中，有一个步骤是 `$ sudo make menuconfig`，这个里面可以选择或者去掉内核的模块，其实这里就是相当于裁剪内核了，而且我们就是在不知道裁剪内核这个概念的情况下一路走下去，最后安装的内核也是裁剪之后的内核。

最后老师在实验之前，讲了，裁剪内核这个实验我们之前做过。好吧，果然，在他眼里，裁剪内核和编译一个新的内核没有什么本质的区别。

### 下载内核

首先，到官网（<https://www.kernel.org/>）下载内核。

![20210407133515](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407133515.png)

下载好之后，因为我这个 Ubuntu 是 Windows 下的虚拟机，所以，直接将文件拖入虚拟机的任意一个文件夹即可。

![20210407134031](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407134031.png)

![20210407134159](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407134159.png)

### 解压 tar.xz 包

进入刚刚放置内核文件的目录，右键解压，或者在命令行解压

```bash
$ tar -Jxvf linux-5.11.11.tar.xz
```

注意，`tar -Jxvf` 的 `J` 要大写。

### 安装依赖

安装之前，先执行以下命令

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
```

一般来说，安装下面的 9 个依赖就好了

```bash
$ sudo apt-get install libncurses5-dev openssl libssl-dev
$ sudo apt-get install build-essential openssl
$ sudo apt-get install pkg-config
$ sudo apt-get install libc6-dev
$ sudo apt-get install bison
$ sudo apt-get install flex
$ sudo apt-get install libelf-dev
$ sudo apt-get install zlibc minizip
$ sudo apt-get install libidn11-dev libidn11
```

### 开始编译新的内核

#### 进入解压出来的目录

```bash
$ cd linux-5.11.11/
```

![20210407164541](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407164541.png)

这里可以给虚拟机拍一个快照。这是为了后续出错时，可以回到这个点。（如果不知道快照，可以自行搜索引擎搜索，这个真的很方便）

#### 使用现存内核的配置文件

```bash
$ sudo cp /boot/config-5.11.7 .config
```

#### 应用现存配置文件

```bash
$ sudo make oldconfig
```

这个命令的作用是，读取现有的 `.config`（注意，这个是隐藏文件，使用 `ls` 命令无法查看）文件，并提示用户输入当前内核源中在文件中找不到的选项。 当采用现有配置并将其移至新内核时，这很有用。

遇到需要选择的选项直接选 `y` 或者回车即可。

#### 仅安装已有 module

```bash
$ sudo make localmodconfig
```

#### 配置其他编译选项

```bash
$ sudo make menuconfig
```

这个命令执行完之后会出现一个图形界面，如果需要裁剪内核，那么，我们需要对这里的选项进行一些配置。这里我们直接使用右方向键，跳到 `Exit` 选项，然会回车退出即可。

![20210407202347](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407202347.png)

#### 开始编译

输入以下命令开始编译

```bash
$ sudo make -j4
```

这里的 `-j` 选项后面的数字表示使用多进程并发编译的意思，我这里选择 4，也可以选择 2 或者不要 `-j4` 这个选项。我这里因为使用了 4 个进程，所以编译基本在两分钟以内就完成了。

![20210407171823](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407171823.png)

以上表示 make 好了。

### 安装 Linux 内核

#### 返回上一级目录，然后将文件夹移动到 src 目录

```bash
$ cd ..
$ sudo mv linux-5.11.11/ /usr/src/
```

#### 进入新目录，然后安装 modules

```bash
$ cd /usr/src/linux-5.11.11/
```

```bash
$ sudo make modules_install
```

![20210407172434](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407172434.png)

以上表示 modules 安装完成。

#### 安装内核

```bash
$ sudo make install
```

![20210407172707](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407172707.png)

以上表示新内核安装完成。

### 检验安装成果

执行以下命令检查内核版本

```bash
$ uname -r
```

之前是 `5.11.7`

![20210407172819](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407172819.png)

重启 Ubuntu 18.04.5 系统并检查内核版本，结果如下

![20210407173212](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407173212.png)

发现内核版本变成了 `5.11.11`，表明安装内核成功。