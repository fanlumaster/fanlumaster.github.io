---
title: Git 学习笔记
date: 2022-02-20 19:51:22
updated: 2024-06-19 10:15:47
tags:
- Git
categories:
- Git
index_img: https://i.imgur.com/ZKY6TVe.png
banner_img: https://i.imgur.com/ZKY6TVe.png
---

对于 Git 的使用，我们开始似乎不用纠结。不就是一个版本控制工具嘛，它的最主要的功能是版本控制。虽然经常可以听到，什么 Git 的功能很强大很强大啦，然后学起来很难很难啦。听上去真是让人泄气。

可是，我们很多人似乎没有搞懂自己的需求，一开始我们可以先学一点最核心的关于版本控制的命令嘛。这个学会了，估计对于当下也差不多了。人家陶渊明也说过“好读书不求甚解”，咱可以不用强制要求自己一下子就什么都学会，学会一点点也是很快乐的。

## Git 版本控制基础用法

这里主要是对 Git 的最重要的功能——版本控制相关命令进行记录和理解。

### 创建历史版本以供将来回溯，即创建读档点

```bash
git init
```

这是初始化 Git 仓库的命令。这个命令会在当前目录下生成一个 `.git` 目录，这个文件夹掌管着版本控制的奥秘。暂时可以不用理解。

```bash
git add filename
```

这个命令是将名为 `filename` 的文件添加到 Git 本地仓库中。如果想要将当前文件夹下的所有文件都添加到 Git 仓库中，则可以使用如下命令：

```bash
git add .
```

这个 `.` 是通配符。这个命令还是很常用的。一般来说可以和 `.gitignore` 文件配合使用。

关于这个 `git add` 命令，我们修改了哪个文件，那么，我们就要将那个文件 `add` 一下。这样，仓库才会记录那个变化。

```bash
git status
```

这个命令用来查看 Git 仓库的状态。

```bash
git commit --message "First Commit"
```

这个命令用来提交已经修改的变化，这个命令执行完，就表示一个“快照”被创建好了。将来就可以通过相关命令回到这个状态。

其中， `--message` 选项表示提交的信息。将来可以通过这些信息来推断这个版本的仓库作了哪些改变。

我们还可以直接使用：

```bash
git commit
```

这样我们就会跳到 Vim 模式来输入一段信息，然后 `wq` 保存。其实和 `--message` 功能相同。

```bash
git diff
```

这个命令用来查看当前工作区与暂存区之间的差异。具体可以看另一篇博客。

### 回退到某一个读档点

#### git reset

详见 [git reset 命令]()

回退版本。

语法：

```bash
git reset [--soft | --mixed | --hard] [HEAD]
```

`--mixed` 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。

实例：

```bash
$ git reset HEAD^            # 回退所有内容到上一个版本  
$ git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本  
$ git  reset  052e           # 回退到指定版本
```

`--soft` 参数用于回退到某个版本。

```bash
git reset --soft HEAD
```

实例：

```bash
$ git reset --soft HEAD~3 # 回退上上上一个版本
```

## Git 常用命令

### 1、查看配置列表

```bash
git config --list
```

### 2、设置或者更改用户名和邮箱

```bash
git config --global user.name "fanlumaster"
git config --global user.email "xxxxxxxxxx@qq.com"
```

## 我平时会用的一些命令

### 1、恢复一个文件到之前的一个的 commit 的状态，

```shell
git checkout 87718 .\flypy_zrmfast.dict.yaml
```

### 2、删除一个 branch

这里拿删除 "动态参数" 这个分支来举例，

```shell
git branch --delete "动态参数"
```

一般可能会提醒我们不能删除，因为这个分支还没有被合并进主分支中，这时，我们加一个参数即可，

```shell
git branch --delete "动态参数"
```

## Git 的一些常用的操作

### 如何查看本地的仓库与远程的仓库之间的差别？

两个主要的命令，

- `git status`
- `git diff origin/master`

---

参考：

1、菜鸟教程
2、ChatGPT


