---
title: acme.sh 给域名配置 ssl 证书
date: 2023-05-31 11:02:31
updated: 2023-05-31 11:28:44
tags:
- 网站
categories:
index_img: https://i.imgur.com/zMm6QM2.png
banner_img: https://i.imgur.com/zMm6QM2.png
---

我是按照官方的指南来操作的，

<https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E>

我自己再作一层通俗的我自己下次做可以节省时间的转换。

第一步，安装，

```sh
curl https://get.acme.sh | sh -s email=my@example.com
```

这里要把 email 换成自己的邮箱。有用。

第二步，激活一下 `.bashrc` 或者 `.zshrc`，这里以 `.bashrc` 为例，

```sh
source ~/.bashrc
```

第三步，生成证书，

```sh
acme.sh --issue -d mydomain.com --nginx
```

这里把域名换成自己的就可以，我这里因为是使用的 nginx，所以对其它的方式就不去赘述。

第四步，copy/安装证书，其实就是执行以下的命令，我这里给出我自己实际使用的命令作为例子，

```sh
acme.sh --install-cert -d fanyfull.xyz \
--key-file       /etc/nginx/ssl/fanyfull.xyz/fanyfull.xyz.key \
--fullchain-file /etc/nginx/ssl/fanyfull.xyz/fullchain.cer \
--reloadcmd     "service nginx force-reload"
```

其实就是把相应的文件复制到 `/etc/nginx/ssl/fanyfull.xyz/` 这个位置。

之后在 nginx 的配置文件中配置(`/etc/nginx/nginx.conf`)即可，

```
server {
    listen 443 ssl;
    server_name fanyfull.xyz;

    ssl_certificate /etc/nginx/ssl/fanyfull.xyz/fullchain.cer;
    ssl_certificate_key /etc/nginx/ssl/fanyfull.xyz/fanyfull.xyz.key;

    # 配置 HTTPS 前端
    location / {
    root /usr/share/nginx/frontend/;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 配置 HTTP 后端接口
    location /api {
        proxy_pass http://ip_address:port;
    }
}
```

主要是以下的部分，

```
listen 443 ssl;
server_name fanyfull.xyz;

ssl_certificate /etc/nginx/ssl/fanyfull.xyz/fullchain.cer;
ssl_certificate_key /etc/nginx/ssl/fanyfull.xyz/fanyfull.xyz.key;
```

这是单独的另一个 server 配置。

在配置好之后，我们使用 https 来访问网页，

<https://fanyfull.xyz>

![](https://i.imgur.com/jNJJXU5.png)

由于这里并没有强制把 http 转发成 https，所以，http 其实在这个时候也还是可以访问的，

![](https://i.imgur.com/k8ORTpt.png)

这里地址栏就没有安全的小锁了，还会报不安全，真·是·丑陋！

如果是未登录的状态，就是下面这个样子，

![](https://i.imgur.com/ZOjstO5.png)

