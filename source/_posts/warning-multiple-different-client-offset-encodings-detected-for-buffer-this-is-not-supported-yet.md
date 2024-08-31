---
title: >-
  warning: multiple different client offset_encodings detected for buffer, this
  is not supported yet
date: 2023-11-24 22:08:54
updated: 2023-11-25 20:19:57
tags:
- Neovim
- 问题
categories:
index_img: https://i.imgur.com/LuMYCVl.png
banner_img: https://i.imgur.com/LuMYCVl.png
---

应该是升级了 neovim 之后产生的问题？

解决这个问题其实也比较简单，那就是给 clangd 的配置中再上一个配置选项好了。

```lua
cmd = {
  "clangd",
  "--offset-encoding=utf-16",
},
```

----------

参考： <https://www.reddit.com/r/neovim/comments/12qbcua/multiple_different_client_offset_encodings/>

