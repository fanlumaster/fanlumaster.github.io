---
title: 如何给 PowerShell 设置命令别名
date: 2022-08-21 13:56:11
tags:
- Neovim
categories:
index_img: https://i.imgur.com/6tQhiES.jpg
banner_img: https://i.imgur.com/6tQhiES.jpg
---

主要参考微软的[官方文档](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/set-alias?view=powershell-7.2)，然后还有涉及到其他的关于这个 alias 的操作，文档的底部也有相应的 Related Links:

![](https://i.imgur.com/aGIdvUv.png)

主要的需求是给 `nvim` 设置别名为 `vim`，所以直接执行执行以下命令即可：

```shell
New-Alias -Name "vim" nvim
```

之后就可以使用 vim 这个别名了。
