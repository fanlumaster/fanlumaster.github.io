---
title: Ubuntu 18 用 NASM 编写 MBR 引导程序，在 BOCHS 虚拟机中测试
date: 2021-06-06 21:58:57
tags:
- 操作系统
- Linux
- bochs
categories:
- 操作系统
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210606232013.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210606232013.png
---

## 前言

这是一次 OS 实验的记录。

实验的要求是，编写 MBR 引导程序，在屏幕显示 "Hello OS world!"，然后原地停下。

由于实验的过程稍微有些曲折，这个任务难度不大，就是过程中的坑比较多。遂记录这一次实验过程，供个人以后复习及后来人参考。

本次实验的环境是

- Ubuntu 18.04
- Bochs-2.6.11

## 安装 Bochs

### 安装依赖

为了运行 Bochs，首先，我们需要安装一些必要的依赖，所有的安装命令如下

```bash
$ sudo apt-get install build-essential 
$ sudo apt-get install xorg-dev 
$ sudo apt-get install bison 
```

### 下载并解压安装包，并安装

这里没有直接使用 `sudo apt-get install bochs` 的原因是我们还需要安装 Bochs 的调试功能。

1、首先，下载 Bochs-2.6.11.tar.gz([下载链接](https://sourceforge.net/projects/bochs/files/bochs/2.6.11/))

2、然后，我们在压缩包放置的目录中进行解压操作

```bash
$ tar zxvf bochs-2.6.11.tar.gz
```

3、进入解压后的目录，然后执行命令

```bash
$ cd bochs-2.6.11
$ ./configure --enable-debugger --enable-disasm
$ make
$ sudo make install
```

注意，"./coufigure" 之后的参数便是打开调试功能的开关。

直到这里，我是没有遇到问题的。

### 错误解决

然后，我们测试是否安装成功，我们在终端输入

```bash
$ bochs
```

这里我是遇到了两个错误，如下

1、`cpu directive malformed` 问题

解决办法：

    1. bochs -help cpu
    这个命令将显示出所有支持的 CPU 类型
    2. 修改 .bochsrc 文件中的 cpu:model=core2+penryn+t9600 为 cup:model=上一条查到的所支持的 CPU 类型之一

2、`.bochsrc:926: Bochs is not compiled with lowlevel sound support.`

解决办法：

    在 .bochsrc 文件中删除 sound 配置即可

解决了问题之后，再重新输入 `bochs` 命令，发现已经安装成功了

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210419134701.png)

## 配置 bochs

安装好 bochs 后，接下来需要对 bochs 进行配置了。如果我们不自己写配置文件的话，执行 bochs 命令时 bochs 会自己在当前目录下顺序寻找以下文件作为配置文件

    .bochssrc
    bochsrc
    bochsrc.txt
    bochsrc.bxrc(仅对 Windows 有效)

我们可以通过 `ls -a` 命令来看一下 bochs 安装目录下的所有文件：

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607000942.png)

在这里，我们选择在自己的目录下新建一个 bochsrc 配置文件，如下

```bash
$ cd FirstOS
$ touch bochsrc
$ gedit bochsrc
```

bochsrc 中的文件内容如下

```
#################################################################
# Configuration file for Bochs
#################################################################

# how much memory the emulated machine will have
megs: 32

# filenameof ROM images
romimage:file=/usr/local/share/bochs/BIOS-bochs-latest
vgaromimage:file=/usr/local/share/bochs/VGABIOS-lgpl-latest

# which disk image will be used 这个是启动软盘，我们虚拟出来的那个a.img
floppya:1_44=a.img, status=inserted

# choose the boot disk 确定启动方式
boot: floppy

# where do we send log messages?
log: bochsout.txt

# disable the mouse
mouse: enabled=0

# enable key mapping ,using US layout as default
keyboard:keymap=/usr/local/share/bochs/keymaps/x11-pc-us.map
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607183851.png)

## 编写 MBR 引导程序，在 bochs 虚拟机中测试

### 编写 MBR 引导程序

1、编写汇编代码 boot.asm

```nasm
    org    07c00h                   ; 告诉编译器程序加载到 7c00 处
    mov    ax, cs
    mov    ds, ax
    mov    es, ax
    call   DispStr                  ; 调用显示字符串例程
    jmp    $                        ; 无限循环
DispStr:
    mov    ax, BootMessage
    mov    bp, ax                   ; ES:BP = 串地址
    mov    cx, 16                   ; CX = 串长度
    mov    ax, 01301h               ; AH = 13, AL = 01h
    mov    bx, 000ch                ; 页号为 0(BH = 0) 黑底红字(BL = 0Ch, 高亮)
    mov    dl, 0
    int    10h                      ; 10h 号中断
    ret
BootMessage:    db    "Hello, OS world!"
times    510-($-$$)    db    0      ; 填充剩下的空间, 使生成的二进制代码恰好为 512 字节
dw       0xaa55                     ; 结束标志
```

2、使用 nasm 编译这段代码

```bash
$ nasm boot.asm -o boot.bin
```

然后在相应的目录下我们可以看到多了一个 512 字节的 boot.bin 文件，如下

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607184811.png)

这个文件就要被我们写入到软盘里面。这里当然可以写入到一个真实的空白软盘上，但是我们这里选择使用 bochs 来虚拟出我们所需要的软盘。

### 代码解释

我们刚刚完成的代码并不是一个完整的操作系统，而仅仅是一个最简单的引导扇区（Boot Sector）。但它是直接在裸机上运行的，不依赖于任何其他软件，所以虽然它不是操作系统，但已经具备了操作系统的一个特性。

我们知道，当计算机电源被打开时，它会先进行加电自检（POST, Power-On Self-Test），然后寻找启动盘，如果是选择从软盘（*注一*）启动，计算机就会检查硬盘的 0 面 0 磁道 1 扇区，如果发现它以 0xAA55 结束，则 BIOS 认为它是一个引导扇区。当然，一个正确的引导扇区除了以 0xAA55 结束之外，还应该包含一段少于 512 字节的执行码。

一旦 BIOS 发现了引导扇区，就会将这 512 字节的内容装载到内存地址 `$0000:7c00$` 处，然后跳转到 `$0000:7c00$` 处将控制权彻底交给这段引导代码。到此为止，计算机不再由 BIOS 中固有的程序来控制，而变成由操作系统的一部分来控制。

所以，第一行代码 `org 07c00` 就是告诉编译器，将来我们的这段程序要被加载到内存偏移地址 `$0x7c00$` 处。



### 使用 bochs 制作软盘

执行如下命令

```bash
$ bximage
```

然后在问到要创建 hd(硬盘) 还是 fd(软盘) 时，输入 fd，之后一直默认回车即可

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607185713.png)

### 将引导扇区写入软盘

执行如下命令

```bash
$ dd if=boot.bin of=a.img bs=512 count=1 conv=notrunc
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607190246.png)

这里简单介绍一下 dd 命令。

Linux dd 命令用于读取、转换并输出数据。

dd 可从标准输入或文件中读取数据，根据指定的格式来转换数据，再输出到文件、设备或者标准输出。这里使用 dd 命令来进行绝对扇区读写操作。

参数说明：

- if=文件名：输入文件名，默认为标准输入。即指定源文件。
- of=文件名：输出文件名，默认为标准输出。即指定目的文件。
- bs=bytes：同时设置读入/输出的块大小为 bytes 个字节。
- count=blocks：仅拷贝 blocks 个块，块大小等于 bs 指定的字节数。
- conv=<关键字>：这里的关键字是 notrunc，表示不截断输出文件。

### 启动 bochs

进入 boot.bin 所在目录，然后输入如下命令

```bash
$ bochs -f bochsrc
```

注意，如果这里输入命令后出现的是一个什么都没有的一片黑色的界面的话，那是因为我们这里是带调试模式的 bochs，那么，还需要再 bochs 提示符之后输入 "c"，然后回车，即可看到我们想要的效果了。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607190703.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607190628.png)

注：关于这个 `-f` 后面的这个 bochsrc 配置文件，因为这里我是把它与 boot.bin 一起放在同一个目录下，所以这里直接就输入了 bochsrc，如果是放在其他目录下，则需要使用 bochsrc 的绝对路径。而且，前面也说了，其实我们这里不需要 `-f` 及后面的内容，因为我们在执行 `bochs` 命令时它会自己找到当前目录下的配置文件。

### 退出 bochs

在上面的基础上输入 `Ctrl + C`，然后输入 `exit`，回车，即可退出 bochs 虚拟机。

---

参考：

1、《一个操作系统的实现》
2、<https://blog.csdn.net/bychen623/article/details/53619084>

注释：

注一：软盘是可移动的一种存储盘，就功能上来讲和现在的 U 盘类似，只是外形、存储原理不一样，容量也很小，速度很慢，目前已经被淘汰。