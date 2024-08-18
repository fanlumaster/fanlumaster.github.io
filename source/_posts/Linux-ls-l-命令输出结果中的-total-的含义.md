---
title: Linux ls -l 命令输出结果中的 total 的含义
description: '关于 Linux 下 ls -l 命令输出结果中 total 的解释'
date: 2021-04-05 22:26:10
tags:
- Linux 命令
- Linux
categories:
- Linux
index_img: https://i.imgur.com/qINUXE0.png
banner_img: https://i.imgur.com/qINUXE0.png
mathjax: true
---

![20210405224205](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405224205.png)

我们观察这个 total 的值，显然，如果我们简单地把下面的所有文件的第五列的文件字节大小给加起来，得到的结果和这个 total 是不能画等号的。

那么，问题就来了，这个 total 究竟指的是什么呢？

我们使用 `ls -lh` 命令来查看文件的具体大小

![20210405224059](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405224059.png)

注意，这个命令列出来的文件大小的单位是 `K`，即 `KB`（不满 1.0 KB 的还是以字节为单位，并显示其以字节为单位应该显示的数字），但是，我们再重新加一下，发现其结果还是和 `total` 不相等。原因什么呢？

这是因为，Linux 中有一个概念，叫做 `Block`，我们可以把这个 `Block` 想象成一个容器，这个容器的容量是固定的，假设是 `unit_size`，那么，`total` 的算法是这样的，它会对每一个文件进行计算，根据文件的大小计算其需要多少个这样的容器，对于不满 `unit_size` 的我们要向上取整。注意，这里是每一个文件计算一次。

下面，举一个具体的例子。

我们首先执行一个命令，查看当前系统的 `Block Size`

```bash
stat -fc %s .
```

![20210405225101](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210405225101.png)

这里发现我的系统的 `Block Size` 为 4096，单位是字节，转换成 `KB` 也就是 `4KB`，那么，我们分别来计算上面列出来的文件各自需要多少个这样的 `Block Size`。

- 首先是 `_config.lanscape.yml`，文件大小为 0，故需要 0 个 `Block`
- 对于 `_config.yml`，文件大小为 2.5K，故需要 1 个 `Block`，这里因为不满 4K 要取整，故最后需要 1 个 `Block`，下同
- 对于 `db.json`，文件大小为 22K，故需要 6 个 `Block`
- ......
- 对于 `test.c`，注意这里的文件大小是 78B，也就是 78 个字节，向上取整，故需要 1 个 `Block`
- 对于 `themes`，文件大小为 4.0K，故需要 1 个 `Block`

我们把所有的 `Block` 列式相加，再乘以每个 `Block` 的大小，得 

$$(0 + 1 + 6 + 1 + 1 + 15 + 1 + 1 + 1 + 1 + 1 + 1) \times 4 = 120K$$

这样，结果就对得上了。

参考：[StackOverflow 相关](https://stackoverflow.com/questions/7401704/why-doesnt-total-from-ls-l-add-up-to-total-file-sizes-listed#comment117527984_7401744)