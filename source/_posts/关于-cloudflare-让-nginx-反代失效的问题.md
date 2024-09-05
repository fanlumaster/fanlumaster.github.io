---
title: 关于 cloudflare 让 nginx 反代失效的问题
date: 2023-06-02 00:58:03
updated: 2023-09-23 14:36:38
tags:
- nginx
categories:
index_img: https://i.imgur.com/uKD02ed.png
banner_img: https://i.imgur.com/uKD02ed.png
---

下午换了一个域名，首先是换了一个域名供应商。之前的域名出了一点问题。这一次选择的是 namesilo，但是选择这个域名的话，那么，会相应地出现一个问题，那就是这个域名供应商自己默认锁提供的域名解析服务器是不好用的，速度很慢，解析经常出问题。

关于这个问题，已经有成熟的解决方案，那就是把域名解析服务交给 cloudflare。

我在使用了 cf 的服务之后，域名是可以正常解析了，但是，在实际访问网站的过程中，我把 https 映射到 http 的 nginx 配置失效了，排查了半天，原以为是 nginx 的配置出了问题。后来终于排查到 cf，是 cf 的 dns 服务的代理状态出了问题。它默认的状态似乎是全权代理，我们这里需要把它修改成**仅 DNS**，

![](https://i.imgur.com/wToMdQv.png)

这样，cf 就只作 dns 解析的服务，而对其它的 https 不作处理，也就是会交给 nginx 来处理，这样一来，问题就解决了。

