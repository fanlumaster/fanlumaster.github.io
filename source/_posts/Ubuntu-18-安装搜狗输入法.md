---
title: Ubuntu 18 安装搜狗输入法
date: 2021-03-31 22:39:49
tags:
- Linux
- Ubuntu
- 安装软件
categories:
- Linux
index_img: https://i.imgur.com/xBdSzPQ.png
banner_img: https://i.imgur.com/xBdSzPQ.png
description: 记录一次在 Linux(Ubuntu) 安装搜狗输入法的过程
---

![20210331224044](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224044.png)

![20210331224133](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224133.png)

把中文（简体）勾选上

![20210331224223](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224223.png)

![20210331224315](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224315.png)

这里选择 `fcitx`

![20210331224356](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224356.png)

如果在键盘输入法系统中，没有 “fcitx” 选项时，建议先打开终端手动安装 `fcitx`：

```bash
sudo apt-get install fcitx
```

等安装成功之后再执行上述步骤。

然后到搜狗拼音官网下载安装包

![20210331224618](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224618.png)

我这里是下载在了 Downloads 目录下

![20210331224737](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224737.png)

然后在命令行执行安装命令

```bash
sudo dpkg -i sogoupinyin_2.4.0.3469_amd64.deb
```

![20210331224911](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224911.png)

但是我这里出现了一些问题，就是缺少一些依赖包

![20210331224944](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331224944.png)

此时，我们可以执行下面的命令

```bash
sudo apt -f install
```

![20210331225145](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331225145.png)

此时，发现已经安装成功

![20210331225238](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331225238.png)

![20210331225636](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331225636.png)

![20210331225819](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331225819.png)

![20210331225843](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331225843.png)

![20210331225926](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331225926.png)

然后，测试一下

![20210331230017](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210331230017.png)

大功告成。

参考：[搜狗官方教程](https://pinyin.sogou.com/linux/help.php>) [知乎辅助排坑](https://zhuanlan.zhihu.com/p/34270907)

**注**：安装过程中遇到需要确认的选项，我这里一律选择 `y`。