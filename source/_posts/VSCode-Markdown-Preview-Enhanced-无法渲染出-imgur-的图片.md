---
title: VSCode Markdown Preview Enhanced 无法渲染出 imgur 的图片
date: 2022-03-03 14:17:09
updated: 2022-03-05 12:10:52
tags:
- Bugs
- 工具
categories:
- 工具
index_img: https://i.imgur.com/VnWjnSW.png
banner_img: https://i.imgur.com/VnWjnSW.png
---

最近一段时间，发现 VSCode 写 Markdown 无法预览我的 imgur 图床的图片了，但是使用 Hexo 渲染好，到浏览器中访问却是正常的，然后去 imgur 的设置中看，也没有发现什么端倪。然后测试内网的图片链接能否正常显示，发现是可以的。

之后想到了应该是代理的原因，在 `settings.json` 中设置代理如下：

```json
"http.proxy": "http://127.0.0.1:7890",
"http.proxyStrictSSL": false,
"https.proxy": "http://127.0.0.1:7890",
```

然后刷新一下，问题解决。

这个问题出现的原因，我猜测应该是 VSCode 更新的缘故。这个 `1.64.2` 版本的 VSCode 应该有一些 Bug，这个代理，在以往的版本中都是直接继承系统代理的。到这个版本突然就给我整了个失效，然后回退到之前的版本中竟然都没有解决。另外一个光标显示的 Bug，即光标的顶部闪烁的时候显示有残影，如果回退到之前的版本，倒是解决了。