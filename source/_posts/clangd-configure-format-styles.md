---
title: clangd 配置格式化的格式
date: 2024-04-05 00:19:35
tags:
- clangd
- Cpp
categories:
index_img: https://i.imgur.com/YaVZflJ.png
banner_img: https://i.imgur.com/YaVZflJ.png
---

依然是在 neovim 中的 clangd 的配置。配置是当前目录下的 `.clang-format` 文件。有一些场景，比如，在缩进的长度、换行的长度限制等，最好还是形成自己的一套规则，放在 GitHub 的 dotfiles 仓库即可。这里则是作一些过程性的记录，虽然这些配置相比于 clangd 本身的一些命令行选项还是很容易找到的。

配置格式化时，自动换行的列长度的限制，

```yaml
---
BasedOnStyle: llvm
IndentWidth: 4

# 不要给头文件排序
SortIncludes: false
# 列的最大长度是 260
ColumnLimit: 260
```

----------

参考：

1、<https://clang.llvm.org/docs/ClangFormatStyleOptions.html>  
2、<https://stackoverflow.com/questions/33656800/clang-format-line-breaks>


