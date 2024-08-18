---
title: fcitx5 如何设置数字和英文键后面不要自动跟上半角字符
date: 2022-09-14 13:12:38
tags:
- linux
categories:
index_img: https://i.imgur.com/RPOmynt.png
banner_img: https://i.imgur.com/RPOmynt.png
---

首先呢，我们要找到 fcitx5 的配置文件。在 `~/.config/ftitx5` 下面。

在 fcitx4 中，我们可以直接修改这个 config 文件，但是在这个 fcitx5 的 config 文件中，我们似乎无法直接在 config 文件中修改这个数字和英文后面自动跟上半角符号的设置。

所以，我们可以在 `~/.config/fcitx5/conf` 这个目录下找到 `punctuation.conf` 这个配置文件，修改：

```txt
# Half width punctuation after latin letter or number
HalfWidthPuncAfterLetterOrNumber=False
```

这个选项默认是 True 的，我们改一下就可以了。

注意，修改这个配置的时候必须先把 fcitx5 退出掉，否则这个配置会被运行中的 fcitx5 覆写为默认的情况。
