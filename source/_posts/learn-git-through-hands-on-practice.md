---
title: 通过实际操作学习Git
date: 2025-01-08 11:59:02
tags:
- Git
- Bilibili
- 技术
categories:
index_img: https://i.postimg.cc/76V0YZyv/image.png
banner_img: https://i.postimg.cc/76V0YZyv/image.png
---

本篇博客摘自(整理、加批注)《GitHub入门与实践》的第 4 章。同时，也参考了《Pro Git》这本书。

我的理念是先学一点简单的用法，先在日常中用起来，尽可能多地用起来，然后再根据具体的需求去深入某些部分，这一点很重要。

## 前言

在本章中，我们将学习 Git 相关的基本知识与操作方法。已经将 Git 实际运用于开发的读者大可跳过本章。本章中将要解说的，是理解本书内容所必不可少的一些 Git 操作。请随着我们的解说，一边实际操作，一边学习并掌握 Git。

按：接下来的所有的操作都可以跟着亲手做一遍，也建议亲自至少做一遍。

## 1. 基本操作

### git init——初始化仓库

要使用 Git 进行版本管理，必须先初始化仓库。Git 是使用 git init 命令进行初始化的。请实际建立一个目录并初始化仓库。

```shell
$ mkdir git-tutorial
$ cd git-tutorial
$ git init
Initialized empty Git repository in /Users/sonnycalcr/EDisk/tutorials/git-basics/git-tutorial/.git/
```

如果初始化成功，执行了 git init 命令的目录下就会生成 .git 目录。这个 .git 目录里存储着管理当前目录内容所需的仓库数据。

在 Git 中，我们将这个目录的内容(指的是实际的当前的代码目录中的内容，可以简单理解为 .git 之外的部分)称为“附属于该仓库的工作树”。文件的编辑等操作在工作树中进行，然后记录到仓库(实际是记录在 .git 中)中，以此管理文件的历史快照。如果想将文件恢复到原先的状态，可以从仓库中调取之前的快照，在工作树中打开。开发者可以通过这种方式获取以往的文件。具体操作指令我们将在后面详细解说。

### git status——查看仓库的状态

git status 命令用于显示 Git 仓库的状态。这是一个十分常用的命令，请务必牢记。

工作树和仓库在被操作的过程中，状态会不断发生变化。在 Git 操作过程中时常用 git status命令查看当前状态，可谓基本中的基本。下面，就让我们来实际查看一下当前状态。

```shell
$ git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

结果显示了我们当前正处于 master 分支下。关于分支我们会在不久后讲到，现在不必深究。接着还显示了没有可提交的内容。所谓提交（Commit），是指“记录工作树中所有文件的当前状态”。

尚没有可提交的内容，就是说当前我们建立的这个仓库中还没有记录任何文件的任何状态。这里，我们建立 README.md 文件作为管理对象，为第一次提交做前期准备。

```shell
$ touch README.md
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    README.md

nothing added to commit but untracked files present (use "git add" to track)
```

可以看到在 Untracked files 中显示了 README.md 文件。类似地，只要对 Git 的工作树或仓库进行操作，git status 命令的显示结果就会发生变化。

### git add——向暂存区中添加文件

如果只是用 Git 仓库的工作树创建了文件，那么该文件并不会被记入 Git 仓库的版本管理对象当中。因此我们用 git status 命令查看 README.md 文件时，它会显示在 Untracked files 里。

要想让文件成为 Git 仓库的管理对象，就需要用 git add 命令将其加入暂存区（Stage 或者 Index）中。暂存区是提交之前的一个临时区域。

按：这里的 Stage 和 Index 指的是同一个概念，我们将其理解成暂存区即可，

> Stage（暂存区）：这是一个临时区域，用于存储我们准备提交的文件更改。我们可以将工作树中的文件更改添加到暂存区，然后一次性提交这些更改。
> Index（索引）：这是 Git 内部的一个数据结构，用于跟踪工作树中文件的当前状态。它本质上是一个文件的快照，记录了哪些文件被修改了、哪些文件被删除了、哪些文件是新添加的。当我们运行 git add 命令时，Git 会将文件的更改添加到索引中。
> 当我们运行 git commit 命令(接下来马上讲)时，Git 会将索引中的内容作为一个新的提交保存到仓库中。

```shell
$ git add README.md
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
    new file:   README.md
```

按：我们可以看一下这里的输出，它给我们列出了另一个命令，`git rm --cached <file>...`，也就是说，我们可以使用这个命令把某个文件从暂存区中移出去，比如，`git rm --cached README.md` 就可以把刚刚 add 到暂存区的 READMD.md 给移出暂存区了。

将 README.md 文件加入暂存区后，git status 命令的显示结果发生了变化。可以看到，README.md 文件显示在 Changes to be committed 中了。

### git commit——保存仓库的历史记录

git commit 命令可以将当前暂存区中的文件实际保存到仓库的历史记录中。通过这些记录，我们就可以在工作树中复原文件。

#### 记述一行提交信息

我们来实际运行一下 git commit 命令。

```shell
$ git commit -m "First commit"
[master (root-commit) 9f129ba] First commit
  1 file changed, 0 insertions(+), 0 deletions(-)
  create mode 100644 README.md
```


-m 参数后的 "First commit" 称作提交信息，是对这个提交的概述。

#### 记述详细提交信息

刚才我们只简洁地记述了一行提交信息，如果想要记述得更加详细，请不加 - m，直接执行 git commit 命令。执行后编辑器就会启动，并显示如下结果。

```shell
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch master
#
# Initial commit
#
# Changes to be committed:
#       new file:   README.md
#
```

按：git 默认会使用 vim/vi 编辑器。

在编辑器中记述提交信息的格式如下。

第一行：用一行文字简述提交的更改内容

第二行：空行

第三行以后：记述更改的原因和详细内容

只要按照上面的格式输入，今后便可以通过确认日志的命令或工具看到这些记录。

在以 #（井号）标为注释的 Changes to be committed（要提交的更改）栏中，可以查看本次提交中包含的文件。将提交信息按格式记述完毕后，请保存并关闭编辑器，以 #（井号）标为注释的行不必删除。随后，刚才记述的提交信息就会被提交。

比如，我们这里可以写，

```
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch master
#
# Initial commit
#
# Changes to be committed:
#       new file:   README.md
#
Add README.md

Just a demo.
```

按：这里在开头写或者在结尾写都可以，因为默认给我们的文本都是注释，忽略它们即可。

然后保存退出即可。

####  中止提交

如果在编辑器启动后想中止提交，请将提交信息留空并直接关闭编辑器，随后提交就会被中止。

#### 查看提交后的状态

执行完 git commit 命令后再来查看当前状态。

```shell
$ git status
On branch master
nothing to commit, working directory clean
```

当前工作树处于刚刚完成提交的最新状态，所以结果显示没有更改。

### git log——查看提交日志

git log命令可以查看以往仓库中提交的日志。包括可以查看什么人在什么时候进行了提交或合并，以及操作前后有怎样的差别。关于合并我们会在后面解说。

我们先来看看刚才的 git commit 命令是否被记录了。

```shell
$ git log
commit df0031bfdc76a15aa18a2490201439d92597b3d8 (HEAD -> master)
Author: fanlumaster <1730976608@qq.com>
Date:   Wed Jan 8 12:57:06 2025 +0800

    First commit
```

如上图所示，屏幕显示了刚刚的提交操作。commit 栏旁边显示的“df0031……”是指向这个提交的哈希值。Git 的其他命令中，在指向提交时会用到这个哈希值。

Author 栏中显示我们给 Git 设置的用户名和邮箱地址。Date 栏中显示提交执行的日期和时间。再往下就是该提交的提交信息。

#### 只显示提交信息的第一行

如果只想让程序显示第一行简述信息，可以在 git log 命令后加上 --pretty=short。这样一来开发人员就能够更轻松地把握多个提交。

```shell
$ git log --pretty=short
commit df0031bfdc76a15aa18a2490201439d92597b3d8 (HEAD -> master)
Author: fanlumaster <1730976608@qq.com>

    First commit
```

#### 只显示指定目录、文件的日志

只要在 git log 命令后加上目录名，便会只显示该目录下的日志。如果加的是文件名，就会只显示与该文件相关的日志。

```shell
$ git log README.md
```

#### 显示文件的改动

如果想查看提交所带来的改动，可以加上 -p 参数，文件的前后差别就会显示在提交信息之后。

```shell
$ git log -p
```

比如，执行下面的命令，就可以只查看 README.md 文件的提交日志以及提交前后的差别。

```shell
$ git log -p README.md
commit df0031bfdc76a15aa18a2490201439d92597b3d8 (HEAD -> master)
Author: fanlumaster <1730976608@qq.com>
Date:   Wed Jan 8 12:57:06 2025 +0800

    First commit

diff --git a/README.md b/README.md
new file mode 100644
index 0000000..e69de29
```

按：100644 是文件的权限模式，表示这是一个普通文件。a 和 b 仅仅是一种记号，其中，a 表示修改前的状态，b 表示修改后的状态。

关于这里的输出的解释，有兴趣可以看一下这里的解释(其实初学者这里没有必要深究)：

<https://stackoverflow.com/questions/22119607/git-log-explained>

如上所述，git log 命令可以利用多种参数帮助开发者把握以往提交的内容。不必勉强自己一次记下全部参数，每当有想查看的日志就积极去查，慢慢就能得心应手了。

### git diff——查看更改前后的差别

git diff 命令可以查看工作树、暂存区、最新提交之间的差别。单从字面上可能很难理解，各位不妨跟着笔者的解说亲手试一试。

我们在刚刚提交的 README.md 中写点东西。

```shell
# Git 教程
```

这里用 Markdown 语法写下了一行题目。

#### 查看工作树和暂存区的差别

执行 git diff 命令，查看当前工作树与暂存区的差别。

```shell
$ git diff
diff --git a/README.md b/README.md
index e69de29..ec80c56 100644
--- a/README.md
+++ b/README.md
@@ -0,0 +1 @@
+# Git 教程
```

由于我们尚未用 git add 命令向暂存区添加任何东西，所以程序只会显示工作树与最新提交状态之间的差别。

这里解释一下显示的内容。“+”号标出的是新添加的行，被删除的行则用“-”号标出。我们可以看到，这次只添加了一行。

用 git add 命令将 README.md 文件加入暂存区。

```shell
$ git add README.md
```

#### 查看工作树和最新提交的差别

如果现在执行 git diff 命令，由于**工作树和暂存区**的状态并无差别，结果什么都不会显示。要查看与**最新提交**的差别(当前工作树与最新一次提交)，请执行以下命令。

```shell
$ git diff HEAD
diff --git a/README.md b/README.md
index e69de29..ec80c56 100644
--- a/README.md
+++ b/README.md
@@ -0,0 +1 @@
+# Git 教程
```

不妨养成这样一个好习惯：在执行 git commit 命令之前先执行 git diff HEAD 命令，查看本次提交与上次提交之间有什么差别，等确认完毕后再进行提交。这里的 HEAD 是指向当前分支中最新一次提交的指针。

按：这里会显示所有未提交的修改，包括未暂存的和已暂存的，这二者一起列出，不会区分。如果要比较暂存区和最新一次提交之间的区别，可以用 `git diff --cached` 或者 `git diff --staged`。

由于我们刚刚确认过两个提交之间的差别，所以直接运行 git commit 命令。

```shell
$ git commit -m "Add index"
[master 7b01061] Add index
 1 file changed, 1 insertion(+)
```

保险起见，我们查看一下提交日志，确认提交是否成功。

```shell
$ git log
commit 7b010619fcd72df06dc6e91df26d20d435099e44 (HEAD -> master)
Author: fanlumaster <1730976608@qq.com>
Date:   Wed Jan 8 13:37:13 2025 +0800

    Add index

commit df0031bfdc76a15aa18a2490201439d92597b3d8
Author: fanlumaster <1730976608@qq.com>
Date:   Wed Jan 8 12:57:06 2025 +0800

    First commit
```


成功查到了第二个提交。


## 2. 分支的操作

在进行多个并行作业时，我们会用到分支。在这类并行开发的过程中，往往同时存在多个最新代码状态。如图 4.1 所示，从 master 分支创建 feature-A 分支和 fix-B 分支后，每个分支中都拥有自己的最新代码。master 分支是 Git 默认创建的分支，因此基本上所有开发都是以这个分支为中心进行的。

![图1 从 master 分支创建 feature-A 分支和 fix-B 分支](https://i.postimg.cc/HWzpNGS8/image.png)

不同分支中，可以同时进行完全不同的作业。等该分支的作业完成之后再与 master 分支合并。比如 feature-A 分支的作业结束后与 master 合并，如图 2 所示。

按：下面的分叉出去的那整个枝条都叫作 feature-A。

![图2 feature-A 分支作业结束后的状态](https://i.postimg.cc/ryfxBsJx/image.png)


通过灵活运用分支，可以让多人同时高效地进行并行开发。在这里，我们将带大家学习与分支相关的 Git 操作。

### git branch——显示分支一览表
git branch 命令可以将分支名列表显示，同时可以确认当前所在分支。让我们来实际运行 git branch 命令。

```shell
$ git branch
* master
```

可以看到 master 分支左侧标有“*”（星号），表示这是我们当前所在的分支。也就是说，我们正在 master 分支下进行开发。结果中没有显示其他分支名，表示本地仓库中只存在 master 一个分支。

### git checkout -b——创建、切换分支

按：指的是创建并且切换到新创建的那个分支。

如果想以当前的 master 分支为基础创建新的分支，我们需要用到 git checkout -b命令。

#### 切换到 feature-A 分支并进行提交

执行下面的命令，创建名为 feature-A 的分支。

```shell
$ git checkout -b feature-A
Switched to a new branch 'feature-A'
```

实际上，连续执行下面两条命令也能收到同样效果。

```shell
$ git branch feature-A
$ git checkout feature-A
```

创建 feature-A 分支，并将当前分支切换为 feature-A 分支。这时再来查看分支列表，会显示我们处于 feature-A 分支下。

```shell
$ git branch
* feature-A
  master
```


feature-A 分支左侧标有“*”，表示当前分支为 feature-A。在这个状态下像正常开发那样修改代码、执行 git add 命令并进行提交的话，代码就会提交至 feature-A 分支。像这样不断对一个分支（例如 feature-A）进行提交的操作，我们称为“培育分支”。

按：就像培育一株植物的分支一样。

下面来实际操作一下。在 README.md 文件中添加一行。

```md
# Git 教程
        　
- feature-A
```

这里我们添加了 feature-A 这样一行字母，然后进行提交。

```shell
$ git add README.md
$ git commit -m "Add feature-A"
[feature-A b6b12fd] Add feature-A
 1 file changed, 2 insertions(+)
```

于是，这一行就添加到 feature-A 分支中了。

#### 切换到 master 分支

现在我们再来看一看 master 分支有没有受到影响。首先切换至 master 分支。

```shell
$ git checkout master
Switched to branch 'master'
```

然后查看 README.md 文件，会发现 README.md 文件仍然保持原先的状态，并没有被添加文字。feature-A 分支的更改不会影响到 master 分支，这正是在开发中创建分支的优点。只要创建多个分支，就可以在不互相影响的情况下同时进行多个功能的开发。

#### 切换回上一个分支

现在，我们再切换回 feature-A 分支。

```shell
$ git checkout -
Switched to branch 'feature-A'
```

像上面这样用“-”（连字符）代替分支名，就可以切换至上一个分支。当然，将“-”替换成 feature-A 同样可以切换到 feature-A 分支。

### 特性分支

Git 与 Subversion（SVN）等集中型版本管理系统不同，创建分支时不需要连接中央仓库，所以能够相对轻松地创建分支。因此，当今大部分工作流程中都用到了特性（Topic）分支。

特性分支顾名思义，是集中实现单一特性（主题），除此之外不进行任何作业的分支。在日常开发中，往往会创建数个特性分支，同时在此之外再保留一个随时可以发布软件的稳定分支。稳定分支的角色通常由 master 分支担当（图3）。

![图3 特性分支的概念](https://i.postimg.cc/8CG7Jg4T/image.png)

之前我们创建了 feature-A 分支，这一分支主要实现 feature-A，除 feature-A 的实现之外不进行任何作业。即便在开发过程中发现了 BUG，也需要再创建新的分支，在新分支中进行修正。

按：指的是基于特性分支再创建新的分支，然后在这个新分支上修 Bug。

基于特定主题的作业在特性分支中进行，主题完成后再与 master 分支合并。只要保持这样一个开发流程，就能保证 master 分支可以随时供人查看。这样一来，其他开发者也可以放心大胆地从 master 分支创建新的特性分支。

### 主干分支

主干分支是刚才我们讲解的特性分支的原点，同时也是合并的终点。通常人们会用 master 分支作为主干分支。主干分支中并没有开发到一半的代码，可以随时供他人查看。

有时我们需要让这个主干分支总是配置在正式环境中，有时又需要用标签 Tag 等创建版本信息，同时管理多个版本发布。拥有多个版本发布时，主干分支也有多个。

### git merge——合并分支

接下来，我们假设 feature-A 已经实现完毕，想要将它合并到主干分支 master 中。首先切换到 master 分支。

```shell
$ git checkout master
Switched to branch 'master'
```

然后合并 feature-A 分支。为了在历史记录中明确记录下本次分支合并，我们需要创建合并提交。因此，在合并时加上 --no-ff 参数。

按：这里如果不使用 --no-ff 参数，git 将会直接快进到目标分支。我们下面在介绍 git log --graph 的时候，会举一个例子。

```shell
$ git merge --no-ff feature-A
```

随后编辑器会启动，用于录入合并提交的信息。

```shell
Merge branch 'feature-A'
# Please enter a commit message to explain why this merge is necessary,
# especially if it merges an updated upstream into a topic branch.
#
# Lines starting with '#' will be ignored, and an empty message aborts
# the commit.
```

默认信息中已经包含了是从 feature-A 分支合并过来的相关内容，所以可不必做任何更改。将编辑器中显示的内容保存，关闭编辑器，然后就会看到下面的结果。

```shell
Merge made by the 'ort' strategy.
 README.md | 2 ++
 1 file changed, 2 insertions(+)
```

这样一来，feature-A 分支的内容就合并到 master 分支中了。

### git log --graph——以图表形式查看分支

用 git log --graph 命令进行查看的话，能很清楚地看到特性分支（feature-A）提交的内容已被合并。除此以外，特性分支的创建以及合并也都清楚明了。

```shell
$ git log --graph
*   commit ae1fcc3cd7453f00818f62a6b1cbe3e139568cf0 (HEAD -> master)
|\  Merge: 7b01061 b6b12fd
| | Author: fanlumaster <1730976608@qq.com>
| | Date:   Wed Jan 8 14:08:32 2025 +0800
| | 
| |     Merge branch 'feature-A'
| | 
| * commit b6b12fd3a8a756daf0154927e6c93bd1588745e4 (feature-A)
|/  Author: fanlumaster <1730976608@qq.com>
|   Date:   Wed Jan 8 14:02:31 2025 +0800
|   
|       Add feature-A
| 
* commit 7b010619fcd72df06dc6e91df26d20d435099e44
| Author: fanlumaster <1730976608@qq.com>
| Date:   Wed Jan 8 13:37:13 2025 +0800
| 
|     Add index
| 
* commit df0031bfdc76a15aa18a2490201439d92597b3d8
  Author: fanlumaster <1730976608@qq.com>
  Date:   Wed Jan 8 12:57:06 2025 +0800
  
      First commit
```

按：如果之前我们没有使用 ——no-ff，那么，git log --graph 的输出是下面这样的，
然后，输出是，

```shell
$ git log --graph
* commit 755c89df251b7f277c53efe4a4b010d1294c39e3 (HEAD -> master, feature-A)
| Author: fanlumaster <1730976608@qq.com>
| Date:   Wed Jan 8 14:30:28 2025 +0800
| 
|     Add feature-A
| 
* commit 942824799649decfac9a0b0f1ec7398f426c871a
| Author: fanlumaster <1730976608@qq.com>
| Date:   Wed Jan 8 14:29:38 2025 +0800
| 
|     Add index
| 
* commit 3420049549fe811eb0e754367fce2d4a1289a5c1
  Author: fanlumaster <1730976608@qq.com>
  Date:   Wed Jan 8 14:28:05 2025 +0800
  
      First commit
```

为什么？因为 feature-A 有了新的提交，但是 master 在原地不动，所以，Git 默认就采取了快进合并(Fast-Forward Merge)。这里，Git 没有创建新的合并提交，因此，我们就不知道分支是什么时候被创建的，以及，是什么时候被合并的。(这里，我们通过 VSCode 的 git graph 插件来看一下会更加地清晰)

git log --graph 命令可以用图表形式输出提交日志，非常直观，请大家务必记住。

----------

附言：精读以及整理这些东西，特么的还挺费神的。


