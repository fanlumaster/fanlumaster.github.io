---
title: IDEA 新配置一个 Thymeleaf Template 文件
date: 2021-07-14 14:30:45
updated: 2021-07-14 16:45:26
tags:
- IDEA
- Spring
categories:
- IDEA
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210714144249.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210714144249.png
---

找到 Editor->File and Code Templates，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210714143217.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210714143515.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210714164519.png)

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="https://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <title>#[[$Title$]]#</title>
</head>
<body>
#[[$END$]]#
</body>
</html>
```

添加完成后，我们来检查一下，发现添加成功

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210714144043.png)