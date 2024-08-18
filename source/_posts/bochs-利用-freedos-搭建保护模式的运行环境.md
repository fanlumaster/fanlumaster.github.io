---
title: bochs 利用 freedos 搭建保护模式的运行环境
date: 2021-06-13 17:24:05
tags:
- 操作系统
- Linux
- 一个操作系统的实现
categories:
- 操作系统
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613175650.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613175650.png
---

## 前言

这里是对《一个操作系统的实现》第 3 章的“保护模式的运行环境”这一节的实操的记录。因为有一点点小的注意点，所以在这里记录一下。

## 操作步骤

1、下载

第一种方法，直接在命令行获取文件

```shell
$ wget http://bochs.sourceforge.net/guestos/freedos-img.tar.gz
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613172921.png)

也可以到 bochs 官网下载 freedos 软盘映像文件，这里不作赘述。

2、然后把这个文件移动到别的文件夹里面进行解压，我这里是移动到了 `~/Downloads/freedos/` 下面，然后解压

```shell
$ tar -xzf freedos-img.tar.gz
```

解压之后是一个文件夹

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613173424.png)

然后我们把 a.img 改成 freedos.img 并复制到我们的工作目录中。

3、然后使用 bximage 生成一个软盘映像，起名为 pm.img。

4、修改我们的 bochsrc，确保其中有以下三行：

```
floppya:1_44=freedos.img, status=inserted
floppyb:1_44=pm.img, status=inserted
boot: a
```

5、启动 Bochs，待 FreeDos 启动完毕后格式化 B: 盘，如下图所示

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613174335.png)

注意，这里用的命令如下

```
format.exe b:
```

书上的没有 .exe 后缀，那是不对的。

6、然后将代码 3.1(见原书) 的第 8 行中的 07c00h 改为 0100h，并重新编译：

```shell
$ nasm pmtest1.asm -o pmtest1.com
```

7、将 pmtest1.com 复制到虚拟软盘 pm.img 上：

如果是首次复制，则先要创建一个目录

```shell
$ sudo mkdir /mnt/floppy
```

执行以下命令

```shell
$ sudo mount -o loop pm.img /mnt/floppy
$ sudo cp pmtest1.com /mnt/floppy/
$ sudo umount /mnt/floppy
```

书上省略了 `mkdir /mnt/floppy` 这一步，要注意。

8、到 FreeDos 中执行如下命令

```
B:\pmtest1.com
```

这样 pmtest1.com 就运行起来了，如下图所示

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613175153.png)

---

参考：《一个操作系统的实现》