---
title: Client 1 quit with exit code 1 and signal 0 jdtls 问题
date: 2023-11-04 21:42:48
updated: 2024-04-11 00:33:00
tags:
- Neovim
- lsp
categories:
index_img: https://i.imgur.com/j0z1kls.png
banner_img: https://i.imgur.com/j0z1kls.png
---

这个问题之前其实就出现过，我在公司的 pc 上使用 mason 安装 jdtls 之后，然后打开一个 maven 管理的 java 项目，也是这个错误。

公司的 pc 现在想来倒是容易理解，因为公司的环境是 jdk1.8，但是家里的 pc 呢？我的印象里家里的这个 pc 安装的 jdk 应该一直都是 jdk17 才对，所以就一直没往 jdk 的版本上去想，没想到呀，最后还就是 jdk 的版本出了问题。不知为何，我的 pc 上的 jdk 不知什么时候被我换成了古老的 1.8，真是逆天，亏我一开始还去排查 nodejs 的版本问题，给 nodejs 升级到最新版之后，问题依旧存在，妈的。

后面一看 `java -version`，他妈的，是 1.8，然后，还是使用 scoop 来重新 set 一下，

```shell
scoop reset openjdk17
```

嗯，切换到 jdk17 就可以正常运行这个 lsp 了。

本来还以为可能需要手动安装另一个插件 nvim-jdtls 的，现在当然是不必了。


----------

参考：<https://github.com/neovim/nvim-lspconfig/issues/1837>


