---
title: Python 备份或删除所有库的命令
date: 2021-03-29 23:31:32
tags:
- Python
- pip
- Python 命令行
categories: Python
index_img: https://i.imgur.com/CJJJdR0.png
banner_img: https://i.imgur.com/CJJJdR0.png
description: ' '
---

命令一

```shell
pip freeze 
```

作用：查看 Python 通过 `pip` 安装的所有包（不包括 `pip` 包本身）。

命令二

```shell
pip freeze > requirements.txt
```

作用：将当前的所有的库备份到当前目录下的 `requirements.txt`（如果没有则会自动新建一个）中。

下面是我备份的示例

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210329233624.png)

命令三

```shell
pip install -r requirements.txt
```

作用：安装 `requirements.txt` 文件中列出的包。

`-r`：与 `--requirements` 等价，表示安装 requirements 文件中列出的所有包，该选项可以重复添加，按照惯例，需求文件名为 requirements.txt。

命令四

```shell
pip uninstall -r requirements.txt -y
```

作用：删除 `requirements.txt` 文件中列出的包。

`-r <file>`：与 `--requirements <file>` 等价，删除 requirements 文件中列出的所有包，该选项可以重复添加多次。

`-y`：与 `--yes` 等价，在卸载遇到确认的情况时，一律选择 `yes`。