---
title: IDEA vim 打通系统剪贴板
date: 2022-08-28 12:05:38
tags:
- IDEA
categories:
index_img: https://i.imgur.com/owuCj3H.jpg
banner_img: https://i.imgur.com/owuCj3H.jpg
---

直接在 IDEA 里面创建 .ideavimrc 就可以了。这个配置文件也是默认放在 home 目录下的。

然后，其实这个配置文件我们就可以像在我们自己的 vim 中一样来进行配置了。这里我们只需要设置一下剪贴板，

```bash
set clipboard=unnamed
set clipboard+=ideaput
```

![](https://i.imgur.com/o1IE8Ml.png)

![](https://i.imgur.com/ei6uHES.png)

![](https://i.imgur.com/eQ98JgD.png)
