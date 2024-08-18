---
title: Git 问题记录
date: 2022-02-22 12:10:11
tags:
- Git
categories:
- Git
index_img: https://i.imgur.com/63thh11.png
banner_img: https://i.imgur.com/63thh11.png
---

# .gitignore 对某个文件(夹)无法生效

如果编写的规则没有错误的话，那么问题就很有可能出在了 `.gitignore` 文件中的规则所作用的文件之前已经被添加到了 Git 的仓库中。

我们可以执行以下命令来解决这个问题：

```bash
git rm -rf --cached .
git add .
```