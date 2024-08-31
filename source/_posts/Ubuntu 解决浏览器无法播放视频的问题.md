---
title: Ubuntu 解决浏览器无法播放视频的问题
date: 2021-10-22 20:25:42
updated: 2021-10-23 12:50:32
tags:
- Ubuntu
categories:
- Ubuntu
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20211022144047.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20211022144047.png
---

今天装这个 Ubuntu20 系统，又遇到了一个问题，就是浏览器中无法播放视频。以前遇到过两次，所以我隐隐约约记得是安装什么 ffmpg 之类的东西，但是因为之前没有记录，所以还是得去谷歌，然后搜到了一堆安装 flash 这个不好的东西的，但是凭着印象，还是找到了一篇安装 ffmpg 的，这一次，就要把它给记录下来了。

简单一点，就几个命令：

```shell
sudo apt update
```

```shell
sudo apt install ffmpeg
```

安装好之后可以使用以下命令查看一下是否安装成功：

```shell
ffmpeg -version
```

---

参考：

1、<https://www.myfreax.com/how-to-install-ffmpeg-on-ubuntu-18-04/>