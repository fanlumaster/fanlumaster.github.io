---
title: 提升幸福感的一些 PowerShell 小命令
date: 2022-09-29 18:04:22
tags:
- PowerShell
- Windows
categories:
index_img: https://i.imgur.com/A0GRLO6.jpg
banner_img: https://i.imgur.com/A0GRLO6.jpg
---

好吧，本来是想利用那个 GitHub Gist 来记录一下这个零碎的知识点的，因为这些知识点就是纯粹的肌肉记忆罢了，但是，那个 Gist 它做得不好呀。检索很不方便。

额，其实也是我没有看过它是否有自己的 api 提供。这个之后再说吧，先解决当下的问题。

## 第一个命令，从 Windows Terminal 中打开回收站

```ps1
start shell:RecycleBinFolder
```

这个 `start` 的作用和 `explorer.exe` 的作用是类似的。

## 第二个命令，列出当前目录下的所有文件，包括隐藏文件

简单列出文件，不考虑隐藏文件的话，使用以下命令，

```pwsh
ls
```

如果需要把隐藏文件也一起列出，那么，

```pwsh
ls -force
```

`ls` 可以使用 `dir` 来替换，以及，这两个命令都是 `Get-ChildItem` 的简写。

如果，我只想列出隐藏文件，

```pwsh
Get-ChildItem -Hidden
```

如果，我想把以 `.` 开头的文件给列出来，

```pwsh
Get-ChildItem -Filter ".*"
```

但是，这个并不会把隐藏的文件给一起列出来，所以，如果我们在过滤的时候，想把隐藏的文件也滤出来的话，那么，还是得加上 `-Force` 选项。

