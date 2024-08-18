---
title: Hexo-NexT 首页和其他页面设置分页
date: 2021-03-22 20:46:39
tags: 博客
categories: 博客相关
index_img: https://i.imgur.com/RHYUSvN.png
banner_img: https://i.imgur.com/RHYUSvN.png
description: NexT 分页设置...
---

Hexo 分页的相关设置在站点目录下的 `_config.yml` 文件中，

首页文章数量分页设置

```yml
# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date
```

归档、标签、分类等页面分页设置

```yml
# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page
```

上面的 `per_page` 就是设置每隔多少页就进行分页的变量。