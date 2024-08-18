---
title: NexT 主题更改页脚内容的颜色（由 ... 强力驱动）
date: 2021-04-02 16:10:55
tags:
- Hexo
- Next
- 博客
categories:
- 博客
index_img: https://i.imgur.com/IJUxwaT.png
banner_img: https://i.imgur.com/IJUxwaT.png
description: ' '
---

### 问题描述

我们需要修改页面底部的颜色信息，如下

![20210402161712](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210402161712.png)

### 解决方案

首先，找到在站点目录下的 `themes/next/source/css/_common/outline/footer` 的文件夹，然后，打开 `footer.styl` 文件。

![20210402161200](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210402161200.png)

我们需要更改两个地方。

第一处

![20210402161534](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210402161534.png)

这里将 color 换成我们需要的颜色的十六进制码即可。

这里的效果是更改页脚的文字的颜色（不包括链接）。

第二处

在文件尾部添加一段代码

```css
// 后加的改变页脚颜色的文件
.theme-link {
    color: #71ffe5;
}
```

![20210402161847](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210402161847.png)

这里的颜色随便设定，效果是将页脚的链接的颜色更改为我们设定的值。