---
title: 如何让 Vimium C 在本地的 html 文件中也可以正常运行
date: 2023-05-04 20:35:38
tags:
- Vim
- 软件
categories:
index_img: https://i.imgur.com/0KcRsId.png
banner_img: https://i.imgur.com/0KcRsId.png
---

遇到这个问题的由头是，我最近需要在浏览器中阅读 epub 文件。

我们知道，epub 文件本质上就是一个压缩包，里面放的多是 html 或者是 xhtml 的一些网页文件，我们把这个 epub 文件解压之后，那么，我们就可以很轻易地在网页中去打开并阅读。

这个时候，我想摆脱鼠标的限制，那么，就想着能不能在这种本地文件的网页中也使用 Vimium C 插件，结果，经过尝试发现，FireFox 默认就是可以的，而 Chrome 则需要设置一下。

需要改的地方也比较简单，

![](https://i.imgur.com/bykVQ3A.png)

![](https://i.imgur.com/uI0bs8q.png)

**补充:** 如果我们想在一些 chrome 自己的标签页中也可以使用 Vimium C 插件，那么，可以在这里设置，

![](https://i.imgur.com/d59TLpc.png)

![](https://i.imgur.com/SVKzLni.png)

然后，可以按照它的指示在 chrome 的 flags 设置里面打开相应的开关即可。
