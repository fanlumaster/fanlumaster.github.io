---
title: 修改 Hexo-NexT 的 mathjax 配置，配置公式不要自动渲染编号
date: 2021-03-28 21:03:30
updated: 2023-06-01 03:11:17
tags:
- Hexo
- NexT
- MathJax
categories: 博客相关
index_img: https://i.imgur.com/GI7NrcJ.png
banner_img: https://i.imgur.com/GI7NrcJ.png
description: MathJax 去掉编号
---

修改 Hexo-NexT 的 mathjax 配置，配置公式不要自动渲染编号，具体操作如下

找到相关配置文件，如图所示

![20210328210344](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210328210344.png)

这里将 `tags: 'ams'` 这一行删掉即可。