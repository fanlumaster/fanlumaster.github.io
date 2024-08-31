---
title: 如何理解/阅读 git diff 输出的信息
date: 2022-02-20 22:32:52
updated: 2022-02-21 20:55:42
tags:
- 翻译
- Git
categories:
- Git
index_img: https://i.imgur.com/qdmiezz.png
banner_img: https://i.imgur.com/qdmiezz.png
---

当我学会如何阅读 `git diff/patch` 时，我觉得我对 git 内部机制的理解有所提高。这里有一个示例来阐释不同的部分：

```bash
diff --git a/bootstrap.sh b/bootstrap.sh
index e98ae1c..9073c4d 100644
--- a/bootstrap.sh
+++ b/bootstrap.sh
@@ -1,6 +1,6 @@
 #!/usr/bin/env bash
 
-apt-get update
+sudo apt-get update
 
 wget -qO- https://raw.githubusercontent.com/...  
 
@@ -9,3 +9,4 @@ echo "source /home/vagrant/.nvm/...  
 source /home/vagrant/.profile  
 
 nvm install node  
+nvm alias default node
```

第 1 行到第 4 行有一些关于 `diff` 的信息——包括了原始文件和修改(新增)后的文件的名称。

在第 5 行，`@@` 表示一个新的**块(hunk)**(注释一)的开始。

- 第 5 行，`-1,6` 表示：在这个 `diff` 被应用之前，原始的文件起始于第 1 行，一共有 6 行。
- 第 5 行，`+1,6` 表示：在这个 `diff` 被应用之后，修改(新增)后的文件起始于第 1 行，一共有 6 行。
- 第 6 行，`#1/usr/bin/env bash` 是原始文件的一部分，而且保持不变，因为该行开始于一个空格。
- 第 7 行是一个保持不变的空行。
- 第 8 行， 由于以 `-` 开始，`apt-get update` 被移除。
- 第 9 行，`sudo apt-get update` 是被添加的部分，以 `+` 开始。

因为这个块有 1 行被移除，有 1 行属于后添加的，在这个 `diff` 被应用之前和之后，总行数保持不变。第 5 行 `@ -1,6 +1,6 @@` 的意思就显然了。

现在，让我们看一下位于第 13 到 17 行的第 2 块。

- 第 13 行，`-9,3 +9,4` 表示以下信息显示：原始文件从第 9 行开始，有 3 行代码，修改后(新增)的文件，从第 9 行开始，有 4 行代码。
- 第 14-16 行，全部以空格开头(表示没有变化)。
- 第 17 行，` nvm alias default node` 前面有一个 `+`，所以这是一个新增的内容。

**Q&A:**

问：第 5 行和第 13 行最后 `@@` 后面为什么前一个是空白，而后一个有内容？

答：如果是从第一行开始，似乎 `@@` 后面就会留白，而如果从下面的某一行开始(一般这种情况内容都会比较多)，那么内容的开始部分就会直接显示在 `@@` 后面。我们只需要记住，`@@` 后面出现的内容也是文件的内容就可以了。

**补充**

- 尚未缓存的改动：`git diff`，即显示当前工作区与暂存区之间的差异。
- 查看已缓存的改动：`git diff --cached`，即，显示暂存区与上一次提交(commit)之间的差异。
- 查看已缓存的与未缓存的所有改动：`git diff HEAD`
- 显示摘要而非整个 diff：`git diff --stat`
- 如果要显示某一个具体文件的改动，可以在后面加上文件名，如：`git diff [filename]`。

---

注释一：块(hunk)是 Git 中的一个特有的概念。这里不必细究。只需要知道，Git 处理文件是一块一块地处理的。

原文地址：<https://therobinkim.com/blog/how-to-read-a-git-diff>