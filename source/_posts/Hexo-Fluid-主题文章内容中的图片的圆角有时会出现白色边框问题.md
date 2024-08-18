---
title: Hexo Fluid 主题文章内容中的图片的圆角有时会出现白色边框问题
date: 2021-06-08 12:37:19
tags:
- Hexo
- Fluid
categories:
- Hexo
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608124424.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608124424.png
---

### 前言

Fluid 主题的版本是 `hexo-theme-fluid@1.8.10`。

### 问题描述

如下图所示

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608105314.png)

左下角这里会出现一点点白色的边框。其实其他三个角也会出现，只是在这张图片上不太明显。

然后我刷新以下页面，或者点击一下图片然后再还原，这个白色的边框就会消失。如下图所示

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608105347.png)

而且，这个问题随着圆角的值越大会更明显，即白色边框更加明显(虽然还是需要仔细盯着看哈哈)，如下图所示

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608114447.png)

然后，正常的情况是下面这样的

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210608114512.png)

### 个人的暂时解决方法

经过分析，我认为可能是图片背景颜色的问题，所以添加了如下的自定义的 css 样式

```css
/* 解决图片在刚展示时可能会在圆角出出现白色边框的问题 */
.markdown-body img {
    background-color: transparent; /* 原来是 #fff */
}
```

即将图片的背景色由原来的白色改为现在的透明的颜色。

经过测试，发现这样似乎能够解决问题。
