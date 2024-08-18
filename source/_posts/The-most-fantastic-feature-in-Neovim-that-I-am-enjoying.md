---
title: Neovim 中最迷人的功能
date: 2023-11-24 22:48:43
tags:
- Neovim
categories:
index_img: https://i.imgur.com/tbVEsrZ.png
banner_img: https://i.imgur.com/tbVEsrZ.png
---

加一个前提。对我来说。然后，在 neovide 的动画效果的加持下，其对用户的吸引力又可以提升一个台阶。

虽然它是借助插件来实现的。这个插件的名字叫作 hop.nvim，仓库地址是 ，

<https://github.com/phaazon/hop.nvim>

但是，这里更推荐它的一个 fork 版本，修复了一些比较烦人的小问题，

<https://github.com/smoka7/hop.nvim>

其实也有很多类似的插件，关于光标跳转的，比如，

- leap.nvim
- flash.nvim

这两个插件对我来说，其局限性是不太符合我之前使用的 VSCode 的 vim 插件的 easymotion 的使用习惯。

所以这里我就选择了比较符合我之前的使用习惯的这样一个插件。虽然，它有一些小缺点，但是，基本上都可以通过一些 tricks，或者说 workaround 来解决，所以，最终的话，我使用的就是这样一个插件了。

- `<leader><leader>w`: 往后跳，可以跳转到后面的任意一个单词(标识符)的开头位置。
- `<leader><leader>e`: 往后跳，可以跳转到后面的任意一个单词(标识符)的末尾位置。
- `<leader><leader>b`: 往前跳，可以跳转到前面的任意一个单词(标识符)的开头位置。
- `<leader><leader>v`: 往前跳，可以跳转到前面的任意一个单词(标识符)的末尾位置。
- `<leader><leader>a`: 在整个屏幕进行跳转，可以跳转到整个屏幕当中的任意一个字符的位置。
- `<leader><leader>j`: 往下跳，可以跳转到下面的任意一行的开头位置。
- `<leader><leader>k`: 往上跳，可以跳转到上面的任意一行的开头位置。

hop.nvim 插件相比于 VSCode 中的 vim 插件，多出来的一个特性是可以识别中文。


