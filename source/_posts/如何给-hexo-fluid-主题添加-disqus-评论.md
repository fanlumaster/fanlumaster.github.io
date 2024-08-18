---
title: 如何给 hexo-fluid 主题添加 disqus 评论
date: 2022-08-21 16:06:28
tags:
- Hexo
categories:
index_img: https://i.imgur.com/CM6bPzN.jpg
banner_img: https://i.imgur.com/CM6bPzN.jpg
---

其实在 Hexo 中设置这个 disqus 评论还有有点复杂的，也有可能是我使用过的 `fluid` 和 `butterfly` 这两个主题没有设置好配置项，然后呢，disqus 本身也没有给好配置的文档。倒不是英文的缘故，属实是文档写得不太行。

总体看来，如果有一篇好的文档来指导的话，配置起来是很容易的，也很方便。遗憾的是，我在搜索引擎中并没有搜索到。

所以的话，这件事情还是由我来亲自，亲自解决吧。

首先，来到下面这个 disqus 的 api 入口：

<https://disqus.com/api/applications/>

![](https://i.imgur.com/QGdTBv5.png)

然后来到下一步，

![](https://i.imgur.com/y0QMcrk.png)

![](https://i.imgur.com/U0RquOj.png)

![](https://i.imgur.com/NWG8lJU.png)

然后 save changes，这里有些东西不用填的，看我的截图自行选择，然后再点击一下这个 `Applications`，

![](https://i.imgur.com/kgjRYO0.png)

把 public key 整到这里，

![](https://i.imgur.com/2KIEXkT.png)

最后我们还需要把这个 shortname 给填上，看看下面我的操作，

![](https://i.imgur.com/gRSQmox.png)

![](https://i.imgur.com/jJL7Q4I.png)

![](https://i.imgur.com/PTAlGXw.png)

![](https://i.imgur.com/bc0x8ke.png)

到这里其实就 ok 了。

最后提一嘴，要把评论的开关给打开，这一点就可以参考 hexo 相应的主题的官方文档了。

以上。
