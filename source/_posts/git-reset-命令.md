---
title: git reset 命令
date: 2022-02-21 20:33:08
tags:
- Git
categories:
- Git
index_img: https://i.imgur.com/ZX2QHHo.png
banner_img: https://i.imgur.com/ZX2QHHo.png
---

git reset 命令用于回退版本，可以指定退回某一次提交的版本。

git reset 命令语法格式如下：

```bash
git reset [--soft | --mixed | --hard] [HEAD]
```

`--mixed` 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。

```bash
git reset  [HEAD] 
```

实例：

```bash
$ git reset HEAD^            # 回退所有内容到上一个版本  
$ git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本  
$ git  reset  052e           # 回退到指定版本
```




---

参考：

1、<https://www.runoob.com/git/git-reset.html>  
2、<https://zhuanlan.zhihu.com/p/346993796>  
3、<https://zhuanlan.zhihu.com/p/346723062>