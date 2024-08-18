---
title: Neovim 自动重载当前文件在外部编辑器的修改
date: 2023-11-05 23:07:21
tags:
- Neovim
categories:
index_img: https://i.imgur.com/el9nTvA.png
banner_img: https://i.imgur.com/el9nTvA.png
---

Neovim 默认情况下自然是不支持同时在外部编辑器修改同一份文件的，如果我们这样做了，那么，在返回 Neovim 中时，会报一个编辑冲突，和文件已经改变的警告，但是，作为用户希望看到的行为肯定是编辑器可以自动给我们处理好这件事情。

在 Neovim 中实现这一点并不难，如果想手动处理上面的冲突的话，那么，直接来一个 `:e!` 应该就可以了。更方便的方法是写入配置的脚本中，

```lua
-- enable auto reload when file changed in other editors
vim.o.autoread = true
vim.api.nvim_create_autocmd({ "BufEnter", "CursorHold", "CursorHoldI", "FocusGained" }, {
  command = "if mode() != 'c' | checktime | endif",
  pattern = { "*" }
})
```

这样，从别的编辑器返回的时候，如果有需要更新的内容，就可以自动应用这些更新了。


