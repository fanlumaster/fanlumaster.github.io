---
title: VSCode 的 PicGo 插件配置
date: 2021-05-17 22:54:08
updated: 2021-06-02 16:55:30
tags:
- VSCode
- PicGo
categories:
- VSCode
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222627.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222627.png
---

## 上传配置

因为要在另一台设备上继续使用我原来在 Github 上面搭建的图床，遂在这里记录一下安装 PicGo 插件之后需要做的配置，由于我之前配置过，所以我只需要将之前的配置参数给直接 copy 过去即可。结果发现果然如此哈哈。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210517225511.png)

然后就可以在另一台设备上面继续愉快地使用原来的图床了。

## 文件名设置

这是原来的设置，它会在 `[]` 内默认填充文件名，即 PicGo 自动给文件赋予的名称。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210602164427.png)

下面是修改后的，这里是直接将 `[]` 中填充的内容给删去，那么，之后 `[]` 中的内容就会默认为空。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210602164457.png)

其实，这里修改的原因是我目前这个 Hexo 主题(Fluid) 对图片的渲染会将 `![]()` 中 `[]` 中的内容给渲染到图片的下方(如果 `[]` 中内容不为空的话，如果为空，则只渲染图片本身)。