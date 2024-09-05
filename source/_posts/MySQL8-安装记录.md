---
title: MySQL8 安装记录
date: 2021-07-12 23:37:51
updated: 2021-07-13 01:39:44
tags:
- MySQL
- 安装
- Windows
categories:
- MySQL
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013355.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013355.png
---

## 一、下载

首先，来到下载的网页 <https://dev.mysql.com/downloads/mysql/> 进行下载，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712234334.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712234412.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712234433.png)

这里写的 32-bit 不要担心，这个讲的是安装程序是 32 位的。

## 二、安装

下载好之后，双击安装，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712234619.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712234822.png)

然后，把左边需要安装的内容通过中间的箭头给移动到右边去，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712234959.png)

注意到右下角还有一个单选框，如果选中，那么，还可以对右边我们下载下来的组件进行进一步的配置，这里我们保持默认未选中，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712235447.png)

执行完毕，发现小圆框中会出现绿色的箭头。注意，此过程中可能会出现需要安装 VS 的一个内容，我们安装它即可，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712235522.png)

继续 execute，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712235644.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713000856.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713000913.png)

下面这里保持默认即可，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713000936.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001012.png)

设置密码(我这里就设置成 123456 啦，因为是学习阶段，好记就行)，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001042.png)

保持默认，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001113.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001148.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001209.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001223.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001241.png)

安装好之后会弹出两个窗口，一个是 Powershell，另一个是 Workbench，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001312.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001403.png)

我们直接关掉这两个窗口，如果没有其它的必要的话。

## 三、添加到系统环境变量

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001713.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001804.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001823.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001849.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001907.png)

然后把 MySQL Server 的 bin 目录路径粘贴上去，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713001956.png)

然后确定。

## 四、测试

输入 `mysql -uroot -p`，回车，输入密码，回车

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713002059.png)

测试一条语句

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713002149.png)

功能正常，整个安装过程到这里结束。