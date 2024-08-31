---
title: 解决 hexo 的 ERROR Database load failed. Deleting database.
date: 2022-08-21 00:10:50
updated: 2022-08-21 00:22:58
tags:
- Hexo
categories:
index_img: https://i.imgur.com/ubtDpwb.jpg
banner_img: https://i.imgur.com/ubtDpwb.jpg
---

相信很多人最近都出现了这个问题。

最新版本的 nodejs `18.6.0`，每次一来一回——每两次 `hexo g -d` 必然有一次要报一个这样的错，然后下一次执行这个 `hexo g -d` 命令时就会变得巨慢。

那么，如何解决这个问题呢？

GitHub 上有这个 [issue](https://github.com/hexojs/hexo/issues/5022)，其状态已经是 `closed` 了。

我提炼出来的方法是这个，

![](https://i.imgur.com/Ys2LakE.png)

然后我试完了之后发现不行，去查看 `warehouse` 的版本，发现没变，升级完 hexo 也不行。

经过试验，发现需要修改博客根目录下的 `package.json` 中的 hexo 版本，

![](https://i.imgur.com/S9U85zJ.png)

我之前没动过，一直是 `5.0.0`，然后修改完之后，再把这个根目录下的 `node_modules` 和 `package-lock.json` 给删掉，再执行一下 `npm install`，之后发现问题得到解决。

再去到 `package-lock.json` 中看 warehouse 的版本，发现变成 `^4.0.1` 了，但是也可以看到，这个文件里面使用 `warehouse-4.0.2` 版本的身影的。
