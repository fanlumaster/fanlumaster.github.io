---
title: PowerShell Tricks Track
date: 2022-02-20 19:41:39
updated: 2024-03-25 23:12:10
tags:
- PowerShell
- Windows
categories:
- PowerShell
index_img: https://i.imgur.com/UhlKK23.png
banner_img: https://i.imgur.com/UhlKK23.png
---

## PowerShell 如何显示隐藏文件

方法：在相应的命令后面加上 `-Force` 选项。

如：

```powershell
dir -Force
```

```powershell
ls -Force
```

## PowerShell 如何返回上一次的目录

```powershell
cd -
```

注意，这个命令其实是可以多次执行的，比如，第一次执行 `cd -` 后，来到了上一回的历史目录，然后再执行一次，就会来到上一回的上一回。

## 如何给 PowerShell 定制一些函数

举几个例子，

```powershell
function cdnvim()
{
  Set-Location $env:LOCALAPPDATA/nvim
}

function cdnvimdata()
{
  Set-Location $env:LOCALAPPDATA/nvim-data
}

function gitcm($msg)
{
  git commit -m "$msg"
}
```

前两个函数好理解，其实就是相当于 alias，第三个可以从命令行接收一个参数，其实就是简化了 `git commit -m` 的使用，举例，

```powershell
gitcm "add one commit"
```

等价于，

```powershell
git commit -m "add one commit"
```

----------

参考：

1、<https://thesmashy.medium.com/helpful-functions-for-your-powershell-profile-9fece679f4d6>
