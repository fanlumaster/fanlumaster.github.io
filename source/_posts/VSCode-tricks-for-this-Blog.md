---
title: VSCode tricks for this Blog
date: 2022-03-08 17:34:11
tags:
- 工具
- VSCode
categories:
- 工具
index_img: https://i.imgur.com/g9Mo3fB.png
banner_img: https://i.imgur.com/g9Mo3fB.png
---

另一个博客上也有类似的文章，用来记录 VSCode 使用过程中的 tips。故取这个题目。

### VSCode 设置某一个特定编程语言的缩进

比如设置 vue 文件的缩进：

![](https://i.imgur.com/1fxmybl.png)

然后，我按 `Alt + Shift + F` 会让我配置默认的代码格式化的工具，我选择的就是 vue 官方的语言支持插件：Volar.

![](https://i.imgur.com/gLbPa1r.png)

### 去掉 Java 的 main 函数上面的 `run | debug`

在设置里面搜索 `debug`，然后找到 `Java Debugger` 中的 `Java>Debug>Settings: Enable Run Debug Code Lens`，然后取消下面的勾选：

![](https://i.imgur.com/IJyFP8d.png)

### VSCode 的 quick fix(快速修复)快捷键不生效

原因：与微软输入法的切换中英文标点的快捷键冲突。

解决方法：

找到微软输入法的设置，然后取消 `Ctrl + .` 的快捷键即可。

![](https://i.imgur.com/Fw0Kfu8.png)

### VSCode 中解决 maven 的 pom.xml 依赖问题

要么在命令行执行：

```powershell
mvn dependency:sources
```

要么，用 maven 进行 build 一下：

![](https://i.imgur.com/6ClXPDn.png)

### VSCode 如何改变整体的 scale

`view->appearence->zoom in/out`。

![]([Imgur](https://i.imgur.com/6RSZJMq.png))

或者使用快捷键 `Ctrl +` 或者 `Ctrl -`。
