---
title: Windows11 的 Chrome 在最大化和最小化之间切换会闪白的问题
date: 2022-09-12 15:32:03
tags:
- Windows
categories:
index_img: https://i.imgur.com/IgvIlEz.png
banner_img: https://i.imgur.com/IgvIlEz.png
---

这个问题在我使用 60Hz 的屏幕的时候就注意到了，我以为是我的硬件比较差的原因。好吧，那台机器的 1050ti 的显卡确实比较差。然后现在我换了 3080 的显卡，屏幕的刷新率可是 240Hz，依然是给我闪白。他娘的你又不是盘古之白，给我白个毛线。

怎么办呢？应该是系统的问题？macos 就没有这样的问题，linux 也没有，只有倒霉的 Windows11 会这个样子？

好在，最近在 v 站上瞎逛，逛到了一个帖子，然后一个兄弟给了我解决方案，就是把 Chrome 的图形后端调成 D3D9 就 ok 了，调成 OpenGL 也可以，毕竟 OpenGL 是用 nvidia 的显卡驱动的嘛。原来的默认的 D3D11 不行，看名称应该是 D3D9 的后续版本，越活越回去了？呵。

![](https://i.imgur.com/0QID1WX.png)
