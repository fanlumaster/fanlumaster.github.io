---
title: vim 如何设置撤销的粒度
date: 2022-08-29 17:27:14
updated: 2022-08-29 18:39:59
tags:
- vim
categories:
index_img: https://i.imgur.com/GtR7fsV.png
banner_img: https://i.imgur.com/GtR7fsV.png
---

我们知道，vim 的撤销是分块的，每一次撤销，就撤销掉一个块，而这个块是什么呢？简单来讲，就是两次 `Esc` 之间的修改，也就是说，vim 撤销的序列是以 `Esc` 这个操作为分割的，至少，在 insert 模式下是这个样子。

然后，我们会发现，我们在使用 `u` 进行撤销的时候，很多时候会直接撤销掉一整行，或者好几行，而在 VSCode 这样的 IDE 中，一般我们一次撤销只会撤销掉一个单词。当然，中文的撤销其实还是不是那么智能，但是对于我们写代码来讲，做到这种程度已经足够了。

所以，我们如何将 vim 的撤销的粒度给修改成为类似于一个单词一个单词的撤销呢？

很简单，只需要在 vim 的配置文件中添加一个映射即可，

```vimrc
:inoremap <Space> <Space><C-g>u
```

当然，也可以选择一个字符一个字符的撤销，但是那样就和 `x` 的功能重复了。所以我的方案就暂且是这个样子。

---

参考：

1、<https://stackoverflow.com/questions/2895551/how-do-i-get-fine-grained-undo-in-vim>
