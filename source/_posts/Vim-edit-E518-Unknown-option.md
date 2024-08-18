---
title: 'Vim(edit):E518: Unknown option'
date: 2023-11-27 23:06:49
tags:
- Neovim
categories:
index_img: https://i.imgur.com/hTo833i.png
banner_img: https://i.imgur.com/hTo833i.png
description: '一个 neovim 的小问题。'
---

在打开这个 urls.py 文件的时候，会报一个奇怪的错误。

![](https://i.imgur.com/A5KiqQ3.png)

具体的错误如下，

```
[Neo-tree ERROR] Error opening file: vim/_editor.lua:341: nvim_exec2()..modelines, line 13: Vim(edit):E518: Unknown option: /polls/5/vote/
```

解决的方法如下，

```lua
opt.modelines = 0
```

----------

参考：<https://www.reddit.com/r/lunarvim/comments/15rzovk/error_opening_python_file_error_detected_while/>


