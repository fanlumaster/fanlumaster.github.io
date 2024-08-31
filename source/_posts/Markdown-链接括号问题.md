---
title: Markdown 链接括号问题
date: 2021-06-13 20:24:06
updated: 2021-06-13 20:32:56
tags:
- Markdown
categories:
- Markdown
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613203227.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613203227.png
---

关于 Markdown，它的链接格式是这样的

```md
[title](link)
```

其中，方括号中的填写的是链接的名称，而括弧里面的内容是链接的 url。

但是，今天遇到了一个问题，就是如果 url 中含有括号，就像下面这样

```
https://en.wikipedia.org/wiki/P6_(microarchitecture)
```

那么，渲染成 html 页面之后可能出现下面的问题，比如书写的 Markdown 是这样的

```md
[维基百科](https://en.wikipedia.org/wiki/P6_(microarchitecture))
```

那么渲染之后可能是这样的

![图中多了一个右括弧](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210613202844.png)

**解决方法**

使用 `%28` 代替 url 中的 `(`，使用 `%29` 代替 `)`。

这样做的原理是使用 url 符号码取代替 ascii 的符号。

---

参考：<http://gohom.win/2015/12/24/MD-bracket/>