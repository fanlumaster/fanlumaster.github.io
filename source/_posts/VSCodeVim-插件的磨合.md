---
title: VSCodeVim 插件的磨合
date: 2023-11-04 21:24:05
updated: 2023-11-05 18:55:07
tags:
- VSCode
categories:
index_img: https://i.imgur.com/jPgImMg.png
banner_img: https://i.imgur.com/jPgImMg.png
---

VSCodeVim 这个插件总体上来说还是比较好用的，可是，它有一些细微的关节，肯定是需要我们微调来适应的。现在比较流行的 PDE 这个概念，其缘由大概就是开发环境其实也是一件相当私人化的物件，每个人的习惯是不同的，即使是惯用同一个工具的一类人，他们在细微处的习惯肯定也是不一样的。比如，有人喜欢用 `Ctrl+j` 和 `Ctrl+k` 来映射上下箭头，另一些人则喜欢使用 `Ctrl+n` 和 `Ctrl+p`，用 j 和 k 的人就说，这是保持和 vim 的 `hjkl` 一致，而使用 n 和 p 的人就说，英语里面是 next 和 previous。其实都可以的。

这里呢，就是记录一些我个人的一些习惯，以及随着 vscodevim 这个插件在不断地更新的过程中可能会引起的一些习惯冲突。

VSCodeVim 更新到 1.26.1 之后会出现它把 `Ctrl+p` 给接管的情况，而这个快捷键可是 VSCode 的命根子呀，你怎能将人家的命根子都给卸掉了呢？太不厚道了。

至于怎么去改，其实，我们只需在 settings.json 文件中 `vim.handleKeys` 里面加入一个键值对来进行排除就可以了，

```json
"vim.handleKeys": {
  "<C-a>": false,
  "<C-f>": false,
  "<C-p>": false
},
```


