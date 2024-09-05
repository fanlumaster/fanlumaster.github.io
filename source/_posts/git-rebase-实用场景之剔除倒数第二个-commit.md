---
title: git rebase 实用场景之剔除倒数第二个 commit
date: 2023-10-17 22:27:43
updated: 2023-10-17 23:30:24
tags:
- Git
categories:
index_img: https://i.imgur.com/4tBUBUB.png
banner_img: https://i.imgur.com/4tBUBUB.png
---

只有实践才能帮助我们更好地理解概念。再一次体会到这个感觉。

这里说是剔除倒数第二个 commit，实际上，无论剔除倒数第一个都是可以的(也不完全绝对哈，看官自己细品)。

首先，我们来创建一个空目录，然后，`git init` 初始化此目录，创建一个 readme 的 txt 文件，然后，依次作三次修改，如下，

![](https://i.imgur.com/kte3whA.png)

![](https://i.imgur.com/TtzPSC1.png)

![](https://i.imgur.com/BwIuVQM.png)

现在，我想把第二次的提交给剔除掉，同时，保留第三次提交的内容，那么，让我们执行，

```shell
git rebase -i HEAD~2
```

然后，进入编辑界面，我们把第二次的 commit 这一行给删掉，

![](https://i.imgur.com/wILHVu5.png)

然后出现冲突，

![](https://i.imgur.com/wFHCtVF.png)

然后，我们手动解决冲突，我们这里把第二次提交的内容给手动剔除掉，然后，提交，

可以看到，现在的提交的 log 只剩两个了，但是为什么命令行还是提示说 `REBASING 1/1` 呢？

![](https://i.imgur.com/5dcwRtG.png)

其实，可以从这里的 `git branch` 的输出看出一点端倪，因此，我们还需要执行下面的命令，继续之前因为冲突而被中止的 rebase，

```shell
git rebase --continue
```

这样一来，我们看，刚刚那个临时分支就归化到 master 分支上了，因为我们本来就是在 master 分支上操作的嘛，在哪个分支上操作最终的结果就归化到哪个分支上，

![](https://i.imgur.com/MQsCbQl.png)

这下清爽多了。我们开头所提的需求也就搞定了。

git rebase 当然有很多其他的用处，然而，因为最近没有需求，所以，暂时就先记录理解这一个好了。


