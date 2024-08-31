---
title: Python字符串前面的r的含义
date: 2021-05-20 23:43:21
updated: 2021-05-27 22:54:36
tags:
- Python
- 小知识
categories:
- Python
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222525.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222525.png
---

r 代表 raw 的意思. 表示要将字符串中所有字符当成原始字符来看待. 比如 `\n` 在普通字符串里表示换行的意思, 而在带有 r 标识的字符串中, 它就是两个字符的组合.

示例代码

```py
str = r'hello \n'
str2 = 'hello \n hello'
print(str)
print(str2)
```

输出

```
hello \n
hello 
 hello

```
