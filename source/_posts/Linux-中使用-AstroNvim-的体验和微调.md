---
title: Linux 中使用 AstroNvim 的体验和微调
date: 2023-05-02 23:27:11
updated: 2023-11-04 21:22:11
tags:
- Linux
- Neovim
categories:
index_img: https://i.imgur.com/ZHDAtnW.png
banner_img: https://i.imgur.com/ZHDAtnW.png
---

又重头使用这个玩具了。在我的观念里，这个 neovim 大概可以称为玩具，VSCode 也可以说是玩具，因为我不太玩游戏，而它们又有一定的可玩性，就刚好可以弥补我在游戏这一块的缺失。

这一次把原来的 lunarvim 类似的配置给换掉了，就是现在的这个 AstroNvim，然后还换过一次 LazyVim，也是一个开箱即用的配置，经过一番尝试，还是换了回来。

对于默认的键位映射，我们参考官方的文档即可，

<https://astronvim.com/Basic%20Usage/mappings>

对于如何去安装我们自定义的插件，可以看这里，

<https://astronvim.com/Recipes/custom_plugins>

不过呢，这个得配合这个视频一起来使用，它这个用户自定义的接口设计得有点巧妙，

<https://www.youtube.com/watch?v=GEHPiZ10gOk&t=457s&ab_channel=Cretezy>

我暂时只需要安装一个插件，那就是 `leap.nvim` 这个插件，

![](https://i.imgur.com/ILOP2IT.png)

至于其它的插件或者说键位的自定义配置，我们看一下视频就很容易去操作或配置的。

**注意：** AstroNvim 中目前有一个小遗憾，那就是 Neo-Tree 这个插件的 fuzzy find 或者说模糊搜索的功能做得不好，还比较慢。暂时呢，我们只有接受这个不完美啦，先用 Telescope 的全局搜索来代替一下。

--- 

## 自定义的一些小配置

```lua
preselect = cmp.PreselectMode.select_next_item,
```

说明：把 lsp 自动补全的默认的选项设置成第一个选项，默认这个是 `None`。

## 键位

更新一些默认的和我自己后来修改的快捷键的映射。

这里主要是我目前会经常用到的一些键位。

### 默认

- leader + ud: 开关 diagnostic(诊断程序)，多按几次有不同的粒度的效果。  
- leader + ld: 展示当前行的语法问题。  
- leader + w: `:w` 的一个映射，保存当前的文件。  
- leader + lD: 展示所有的 diagnostics 问题，并且允许我们去搜索。  
- leader + lr: rename 当前的标识符。  
- leader + uf: toggle buffer 中的"在保存时自动格式化"。  
- leader + uF: toggle 全局的"在保存时自动格式化"。

### 个人自定义

- leader + ru: 在 terminal 中执行 ruby 脚本。  
- leader + py: 在 terminal 中执行 python 脚本。

