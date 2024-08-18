---
title: Manjaro zsh 设置代理的问题
date: 2022-08-07 02:27:57
tags:
- Manjaro
- zsh
categories:
index_img: https://i.imgur.com/8WCFzsw.png
banner_img: https://i.imgur.com/8WCFzsw.png
---

Google Chrome 在 Linux 中真没有 Firefox 好用啊。连系统的暗色模式都识别不出来。呵呵。

今天在安装 yay 时，由于需要用到 curl，然后在我已经设置了代理的情况下，还给我疯狂报下面的错误，

```
curl: (35) OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to 127.0.0.1:7890
```

然后，可能是我设置得不对，所以就根据[这篇博客](https://zhuanlan.zhihu.com/p/518100454)修改了我的配置如下：

```zsh
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

![](https://i.imgur.com/GF1ZzTI.png)

修改完毕后，执行一下 `source ~/.zshrc` 激活一下新的配置即可。
