---
title: Jetpack Compose 入门
date: 2021-12-30 15:31:18
updated: 2022-02-21 20:03:58
tags:
- Android
- Jetpack Compose
categories:
- Android
index_img: https://i.imgur.com/vVzAjgk.png
banner_img: https://i.imgur.com/vVzAjgk.png
---

跟着[官方教程](https://developer.android.com/codelabs/jetpack-compose-basics#0)在做，最后的效果就是这个样子的：

![](https://i.imgur.com/0UlBzWs.gif)

这个效果图是从安卓官网上搬过来的，实际上跟着这个 codelab 在学习就是相当于做一次实验了。最后做出来的效果和教程中的是吻合的。

我终于体验到了声明式 UI 的魅力。制作 UI 很方便，做出来的 UI 也好看。尤其是渲染列表的时候，本来是要用那个 XML，又要用适配器之类的，那样做是很繁琐的。现在只需要写一个遍历语句即可。

说明，这个所有的代码基本上都是在 `MainActivity.kt` 文件里面。

其实，要我写究竟学到了什么，我想，最多学到的是 `by remember` 这个语法的用法？

然后就是对这个动画效果有了一点认识。

代码是完全照着教程来写的，这里将其上传到 GitHub 上留作纪念。

现阶段还是有点迷茫，一个小小的想法是，先尽量地多写代码，能总结的，就先总结着，总之不断往前走就是。