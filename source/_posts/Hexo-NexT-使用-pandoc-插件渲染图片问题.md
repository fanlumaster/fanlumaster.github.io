---
title: Hexo NexT 使用 pandoc 插件渲染图片问题
date: 2021-03-22 23:22:32
updated: 2023-06-01 03:01:41
tags: 
- pandoc
- Markdown
categories: 博客
index_img: https://i.imgur.com/H8n3IUn.png
banner_img: https://i.imgur.com/H8n3IUn.png
description: 解决 Hexo Next 使用 pandoc 插件渲染图片导致图片下方出现多余的文字
---

### 问题复现

![20210322232830](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210322232830.png)

这个图片的原来的 `Markdown` 文本为

```md
![20210321222711](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321222711.png)
```

显然，`pandoc` 是将 `[]` 中的内容给渲染到图片的下方了。

### 问题解决

找到站点目录下的 `_configure.yml` 文件，并在末尾添加如下代码

```yml
pandoc:
  extensions:
    - '-implicit_figures'
```

然后执行

```bash
hexo clean
hexo g
hexo s
```

检验成效

![20210322233357](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210322233357.png)

发现多余的文字已经消失了。

参考：<https://wylu.me/posts/7bd83fc5/>