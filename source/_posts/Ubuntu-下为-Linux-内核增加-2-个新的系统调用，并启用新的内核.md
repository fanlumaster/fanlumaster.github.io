---
title: Ubuntu 下为 Linux 内核增加 2 个新的系统调用，并启用新的内核
description: '记录一次给 Linux 内核增加系统调用的实验过程'
date: 2021-04-07 19:33:59
tags:
- Linux
- Ubuntu
- 操作系统作业
categories:
- Linux
index_img: https://i.imgur.com/wObaT97.png
banner_img: https://i.imgur.com/wObaT97.png
---

### 下载内核

首先，到官网（<https://www.kernel.org/>）下载内核。

![20210407193656](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407193656.png)

因为之前编译过一次内核，所以这次没有选择最新的 `5.11.11` 版本。

下载完之后，直接拖进虚拟机的任意一个目录即可。

### 解压内核压缩包

进入刚刚放置内核文件的目录，右键解压，或者在命令行解压

```bash
$ tar -Jxvf linux-5.11.11.tar.xz
```

注意，`tar -Jxvf` 的 `J` 要大写。

然后，将解压好的文件从当前目录移动到 `/usr/src/` 目录下

```bash
$ sudo mv linux-5.10.27/ /usr/src/
```

### 安装相关依赖

安装前，先执行以下命令

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
```

然后，依次安装下面的依赖

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

如果以前有安装过这些依赖，则跳过这一步。

### 添加自定义的系统调用

进入相关目录

```bash
$ cd /usr/src/linux-5.10.27/
```

打开可以向其中添加自定义系统调用号的文件

```bash
$ sudo gedit arch/x86/entry/syscalls/syscall_64.tbl 
```

如图所示，442 和 443 是自己添加的系统调用的调用号

![20210408222421](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408222421.png)

保存后关闭窗口。

需要注意的一点是，这里的第三列的内容是和后面的 `sys_` 后面的内容是一致的，千万不要把它们搞错了！我就是因为这个问题导致后面内核编译到最后一步时，报了一个找不到我自己定义的函数的引用。

还有，这里使用 `sudo gedit` 会报一些 warning，这个不要理会，这个是 gedit 本身的问题，它在命令行调用就会出现这样的警告。

然后输入命令

```bash
$ sudo gedit include/linux/syscalls.h 
```

编辑文件，添加函数声明，这里的函数声明应该与上一步定义的系统调用中的函数一致

![20210408222944](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408222944.png)

添加系统调用的函数定义

```bash
$ sudo gedit kernel/sys.c
```

```c
/* My own system calls */
SYSCALL_DEFINE0(first)
{
        printk("My first system call\n");
        return 0;
}
SYSCALL_DEFINE1(second, int, number)
{
        printk("My second system call\n");
        printk("The number you enter is %d\n", number);
        return number;
}
```

![20210408223101](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408223101.png)

这里的两个函数就是自己增加的系统调用。

使用虚拟机的朋友，建议在这里拍一个快照。

### 编译内核

首先，输入以下命令并执行

```bash
sudo make mrproper
sudo make clean
```

注意，这里因为执行了 `clean`，所以下面的编译时间会有点长，大概五十分钟到一个小时不等。

然后执行以下命令，进入图形配置界面

```bash
$ make menuconfig
```

![20210407202347](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407202347.png)

这里我们直接 Save，然后退出即可，然后开始编译

```bash
$ sudo make -j4
```

`-j4` 表示将编译工作分成 4 个 jobs，每一个 job 分别在单独的核上运行。当然，前提是我们的机器得是多核的才行。比如，我的机器是 4 核的，这里就用 `-j4`。

![20210407171823](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407171823.png)

以上表示编译好了（只要最后不报错，就是编译成功了）。

```bash
$ sudo make modules_install
```

![20210407172434](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407172434.png)

以上表示模块安装成功。

```bash
$ sudo make install
```

![20210407172707](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210407172707.png)

![20210408223657](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408223657.png)

最后执行 `reboot`（即重启），然后开机检查内核版本，发现变成了我们安装的 `5.11.11`。

```bash
$ uname -r
```

![20210408223858](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408223858.png)

### 检验添加的系统调用

```bash
$ sudo gedit test.c
```

然后写入以下内容

```c
#include<linux/kernel.h>
#include<sys/syscall.h>
#include<unistd.h>
#include<stdio.h>

int main()
{
    // 442 long sys_first(void)
    printf("System call sys_first return %ld\n", syscall(442));

    //443 long sys_second(int)
    long temp;
    temp = syscall(443, 2);
    printf("System call sys_second return %ld\n", temp);

    return 0;
}
```

![20210408224750](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408224750.png)

```bash
$ sudo gcc -o test test.c
$ sudo ./test
```

运行结果如下

![20210408225000](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408225000.png)

再输入命令

```bash
$ sudo dmesg
```

查看系统进程，可以看到系统调用的输出

![20210408225140](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210408225140.png)

可以发现，这里打印了我们之前 `printk` 中的语句。

到这里，就大功告成了。

参考：[操作系统作业：Ubuntu编译一个新内核以及添加系统调用](https://blog.csdn.net/weixin_44224230/article/details/89945899?utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&dist_request_id=1329187.422.16177947900639469&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)