---
title: Java Exception 中的序列化问题
date: 2022-10-03 19:06:03
updated: 2022-10-05 15:18:34
tags:
- Java
categories:
index_img: https://i.imgur.com/OsrTCMO.png
banner_img: https://i.imgur.com/OsrTCMO.png
---

最近在看 GitHub 上的一个解析 epub 的库，然后再次遇到这个 `serialVersionUID`，是在自定义的异常类里面，每一个自定义的异常类里面都会有一个静态的 final 变量 `serialVersionUID`，这是用来标记类的版本的，方便在存储类的时候序列化和反序列化，方便向下兼容。

对于继承了 Exception 的来说，有这个变量并不奇怪，因为它的一层父类是实现了 Serializable 接口的。但是这里需要我们自己声明这个变量就感觉很奇怪，网上看到的博客也是说我们自定义的异常类要声明这个变量。

暂时就当这个是一个规范吧。我们自己需要定义这个变量的时机其实我还是没有搞懂。

然后还有一个问题，这个值我们应该怎么给呢？我们可以看到很多别人的代码中的这个变量都是很长的一串 long 类型的数字，这是他们自己想出来的吗？当然不是，这个是利用 IDE 生成的。我们可以在 IDEA 中进行设置，

首先把这个警告勾选上，

![](https://i.imgur.com/xLDRO0g.png)

然后我们就可以在警告的地方使用 IDEA 的自动建议来给我们自动生成这个变量了。
