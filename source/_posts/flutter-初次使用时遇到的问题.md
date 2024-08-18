---
title: flutter 初次使用时遇到的问题
date: 2022-02-26 21:18:41
tags:
- flutter
categories:
- flutter
index_img: https://i.imgur.com/nflgL7X.png
banner_img: https://i.imgur.com/nflgL7X.png
---

首先说明一下，我的 flutter 遇到的问题是在配置安卓开发环境时候遇到的。因此，如果是 web 开发或者 ios 或者是其他，解决办法可能不一样。

# flutter doctor Proxy Configuration ! NO_PROXY is not set

这个问题其实是花费我最长时间的一个。

一开始我按照网上的解决办法去设置 `NO_PROXY`，都是说要设置成 `localhost,127.0.0.1` 的。但是，如果这样设置，flutter doctor 又会报如下的错误：

```powershell
[!] Proxy Configuration
    ! NO_PROXY does not contain ::1
```

![](https://i.imgur.com/BzyhQvR.png)

然后看这个报错信息，我把 `NO_PROXY` 设置成了 `localhost,127.0.0.1,::1`，

![](https://i.imgur.com/pjNZag8.png)

# D/skia    ( 4980): Shader compilation error

这个问题的解决方法我是在 Youtube 上遇到的。链接：<https://www.youtube.com/watch?v=OLD0ISim8iQ&ab_channel=BhutanIO>

具体的解决步骤如下：

![](https://i.imgur.com/iv1DGf9.png)

![](https://i.imgur.com/N284rnr.png)

将上图 3 处的选项改成图中所示即可。