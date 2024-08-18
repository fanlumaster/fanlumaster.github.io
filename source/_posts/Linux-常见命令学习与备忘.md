---
title: Linux 常见命令学习与备忘
date: 2021-04-05 15:23:02
tags:
- Linux
- Linux 命令
categories:
- Linux
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613153202.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613153202.png
description: 'Linux 的一些中间命令的学习记录。'
---

### 基础命令

#### cat 命令

`cat`，即 concatenate，中文是连接的意思。因此，如果有多个文件的话，它会把这些文件的内容拼接起来显示。

使用格式

```bash
$ cat file1 file2...
```

使用范例

```bash
$ cat _config.yml
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405185854.png)

#### ls 命令

`ls`，即 list，作用是显示指定目录的内容，默认参数为当前目录。

选项参数说明

- `-l`：list with long format，`l` 表示 long 的意思，作用是显示详细的列表
- `-F`：add one char of "*/=>@|" to entries，即在列出的文件名称后加一个符号，显示文件类型信息，例如可执行文档加 `*`，目录则加 `/`
- `-lh`：list long format with readable file size，即列出带有具有可读性的文件大小数据的信息

使用范例

```bash
$ ls -l
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405193525.png)

上面列出的文件中，第一列表示文件模式和权限，第二列表示链接数（即 link count，不过，这里的 link 是 hard link），第三列是文件的所有者，第四列是用户组，第五列是文件大小，后面是文件最后更改的日期、时间以及文件名。

#### cp 命令

`cp`，即 copy，用来复制文件。

选项参数说明

- `-r`：copy directories recursively。递归地复制文件夹。

使用格式

将文件 `file1` 复制到文件 `file2`，如果 `file2` 不存在，则会自动创建:

```bash
$ cp file1 file2
```

将多个文件（`file1 ... fileN`）复制到目录 `dir`：

```bash
$ cp file1 ... fileN dir
```

使用范例

将 `a.txt` 复制到 `b.txt` 中，`b.txt` 本来并不存在

```bash
$ cp a.txt b.txt
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210406130519.png)

将 `a.txt` 和 `b.txt` 复制到 `new` 这个新目录中，`new` 目录必须存在，因为 `cp` 命令不会自动创建它（如果它本来不存在的话）。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210406130728.png)

附：使用 `cp a.txt b.txt` 命令时，如果 `b.txt` 中原来有内容，那么，复制完之后，`b.txt` 中原来的内容将会被 `a.txt` 中的内容覆盖掉。

#### mv 命令

`mv`，即 move。`mv` 主要用来将一个或多个文件或者目录从一个地方移动到另一个地方。它有两个不同的功能：

- (i) 重命名一个文件或者文件夹
- (ii) 移动一组文件到另一个不同的文件夹中

使用格式

将文件名从 `file1` 重命名为 `file2`：

```bash
$ mv file1 file2
```

将多个文件（`file1 ... fileN`）移动到目录 `dir`：

```bash
$ mv file1 ... fileN dir
```

使用范例

将 `a.txt` 重命名为 `c.txt`：

```bash
$ mv a.txt c.txt
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210406132001.png)

将 `a.txt` 和 `c.txt` 移动到 `new` 目录中：

```bash
$ mv a.txt c.txt new
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210406132402.png)

#### touch 命令

`touch`，并不是缩写。`touch` 命令用来创建文件。如果文件已经存在，则该命令会更新文件的时间戳。

使用格式

创建一个新的文件，内容为空：

```bash
$ touch file
```

#### rm 命令

`rm`，即 remove here。`rm` 命令用来删除文件，文件一旦被删除通常无法恢复（也就是说，通过某种手段，是可以恢复的）。

默认情况下，它不会删除目录。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210406133409.png)

使用格式

```bash
$ rm file
```

选项参数说明

- `-f`：force deletion。强制删除。
- `-r`：recursive deletion。递归删除。当使用这个选项时，`rm` 可以删除目录。

使用范例

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210406133915.png)

这里 `*` 表示通配符，表示匹配当前目录下的任意文件或者文件夹。

#### echo 命令

`echo` 命令将它的参数显示到标准输出。

使用范例

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210406133206.png)

#### cd 命令

`cd`，即 change directory。`cd` 命令用来设置当前工作目录。当前工作目录是指我们的进程和 shell 当前所在的目录。

使用格式

进入目录 `dir`：

```bash
$ cd dir
```

如果不带 `dir` 参数，`cd` 命令会返回我们的个人主目录，即我们登录系统后进入的目录。

#### mkdir 命令

`mkdir`，即 make directory。`mkdir` 命令用来创建新目录。

使用格式

创建目录 `dir`：

```bash
$ mkdir dir
```

#### rmdir 命令

`rmdir`，即 remove directory。`rmdir` 命令用来删除目录（空目录）。如果要删除的目录里面有内容（文件和其他目录），命令会执行失败。我们可以使用 `rm -rf` 来删除一个目录以及其中的所有内容。

使用格式

删除目录 `dir`：

```bash
$ rmdir dir
```

### 中级命令

#### grep 命令

`grep`，即 global regular expression print 的缩写。

使用范例

显示文件 `/etc/passwd` 中包含文本 root 的所有行：

```bash
$ grep root /etc/passwd
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405153031.png)

查看目录 `/etc` 中所有包含 root 的文件：

```bash
$ grep root /etc/*
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405153146.png)

`grep` 有几个重要的选项：

- `-i`：不区分大小写
- `-v`：反转匹配，即匹配所有不匹配的行
- `-r`：递归查找，意思是在当前目录下递归搜索某个内容
- `-n`：在结果里显示行号

我具体使用过的案例是在某一个文件夹下需要递归查找 `footer` 这个字符串，并且需要显示行号，所用命令如下

```bash
grep footer ./themes/ -n -r
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405154002.png)

#### less 命令

`less` 命令可以将内容分屏显示，按 `空格键` 可查看下一屏，`B` 键查看上一屏幕，`Q` 键退出。

我们可以在 `less` 命令的输出结果中进行搜索。

- 使用 `/word` 从当前位置向前（这里的向前，代表的是向下的意思）搜索 `word` 这个词
- 使用 `?word` 从当前位置向后（这里的向后，代表的是向上的意思）搜索。当找到一个匹配时，按 `N` 键跳到下一个匹配，按 `B` 键跳到上一个匹配

使用范例

使用 `less` 查看输出结果

```bash
$ grep ie /usr/share/dict/words | less
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405160912.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405160831.png)

#### pwd 命令

`pwd`，即 Print Working Directory 的缩写。

功能是打印当前的工作目录名。

使用范例

```bash
$ pwd
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405161309.png)

#### diff 命令

`diff` 命令用来查看两个文件之间的不同。

使用范例

```bash
$ diff _config.yml _config.landscape.yml
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405161628.png)

#### file 命令

`file` 命令用来查看一个文件的格式信息。

使用范例

查看文件 `_config.yml` 的格式信息

```bash
$ file _config.yml
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405162651.png)

#### find 和 locate 命令

`find` 命令用来在目录中寻找文件。

使用格式

```bash
$ find dir -name filename -print
```

关于参数的说明

- `-name filename`：表示查找名为 `filename` 的文件
- `-print`：表示显示文件的路径名。注意，这个选项是默认存在的，也就是说，上面的命令其实是等价于 `find dir -name filename` 的

使用范例

查找当前目录下的 `_config.yml` 文件

```bash
find . -name _config.yml -print
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405170544.png)

这里的 `.` 和 `./` 等价，表示在当前目录下查找。注意，这个 `find` 命令是递归查找所有文件的。

`locate` 命令是另外一个用来查找的命令。只是，它是在系统创建的文件索引中查找文件（因此速度更快）。有时候可能查找不到新文件，因为系统还没有将新文件加入到索引中。

#### head 和 tail 命令

`head` 命令显示文件前 10 行内容。

`tail` 命令显示文件最后 10 行内容。

使用范例

```bash
$ head /etc/passwd
```

```bash
$ tail /etc/passwd
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405171404.png)

#### sort 命令

`sort` 命令将文件内所有行按照字典序快速排序。

选项参数说明

- `-n`：按照数字顺序排序哪些以数字开头的行
- `-r`：反向排序

使用范例

```bash
sort _config.yml
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405172428.png)

### 进阶命令

#### tar 命令

`tar`，即 tape archive。`tar` 用来解压文件。

选项参数说明

- `-f`：确定要解压的文件名，即后面要有将被解压的文件的名称
- `-v`：输出命令执行过程中的详细信息
- `-x`：extract files from an archive file。提取一个压缩文件
- `-J`：Use archive through `xz`

使用范例

解压 Linux 内核文件到当前文件夹：

```bash
$ tar -Jxvf linux-5.11.11.tar.xz
```

下面是各种类型文件的解压示例，这里用 file 表示文件名。

解压 tar 文件：

```shell
$ tar -xvf file.tar
```

解压 tar.gz 文件：

```shell
$ tar -xzf file.tar.gz
```

### 其他命令

#### apt 命令相关

`apt`，即 advanced package tool。

命令格式

```bash
$ sudo apt update
$ sudo apt upgrade
```

也可以使用 `apt-get`

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
```

官方现在建议是使用 `apt`。

### 常用命令示例

#### locate 命令

用于定位某一个文件的位置，如，寻找 `sys/types.h` 这个文件

```bash
$ locate sys/types.h
```

#### whereis 命令

寻找 stdio.h 的位置

```bash
$ whereis stdio.h
```

但是这个命令没有 `locate` 命令好用。