---
title: Hexo-NexT-文章页面去掉页首的描述（description）
date: 2021-03-29 00:07:28
tags:
- Hexo
- NexT
categories:
- 博客相关
index_img: https://i.imgur.com/3VH5WOn.png
banner_img: https://i.imgur.com/3VH5WOn.png
description: ' '
---

### 需求描述

如下图，我们想去掉页首显示的这个 description，因为这个 description 只在首页显示就够了。

![20210329001641](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210329001641.png)

### 解决方法

在 `..\themes\next\layout\_macro\post.swig` 文件中搜索 `description`，找到下面这段代码，删去即可。

```css
{%- if post.description and (not theme.excerpt_description or not is_index) %}
    <div class="post-description">{{ post.description }}</div>
{%- endif %}
```

![20210329001034](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210329001034.png)

效果

![20210329001856](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210329001856.png)