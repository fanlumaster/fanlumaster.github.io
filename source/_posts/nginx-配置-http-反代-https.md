---
title: nginx 配置 http 反代 https
date: 2023-05-31 10:30:08
tags:
- nginx
categories:
index_img: https://i.imgur.com/j6BhYeU.png
banner_img: https://i.imgur.com/j6BhYeU.png
---

访问前端已经配置好了 ssl 证书，由于是前后端分离，而后端的接口不想去再麻烦地使用 https，所以，就利用 nginx 的反代来解决这个问题。之所以会有这个问题，是因为 https 网页中不支持 http 的请求。

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

这里，把 `ip_address` 换成实际的 ip 地址，把 `port` 换成实际的后端的端口号。

然后，前端的 base_url 我本来是有带上接口的，而经过 nginx 这么一转换，其实是不用了，

```
VITE_BASE_URL=https://fanyfull.xyz
```

这样一来，例如，我在请求 `https://fanyfull.xyz/api/tag/list` 的时候，最后实际请求的是 `http://ip_address:port/api/tag/list`，这样，后端就不用去配置证书，就使用原本的 http 协议就可以为前端所使用了。

下面附上 chatgpt 给我的回答，

要使用 Nginx 将前端访问后端接口的协议从 HTTPS 转为 HTTP，您可以使用 Nginx 的 `proxy_pass` 指令来实现。以下是一个示例配置，假设前端应用程序部署在 HTTPS 上的根目录，后端接口部署在HTTP上的 `/api` 路径下：

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/ssl_certificate.crt;
    ssl_certificate_key /path/to/ssl_certificate.key;

    # 配置 HTTPS 前端
    location / {
        root /path/to/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 配置 HTTP 后端接口
    location /api {
        proxy_pass http://backend_server_ip:backend_server_port;
    }
}
```

请注意替换以下内容：

- `example.com`：您的域名。
- `/path/to/ssl_certificate.crt` 和 `/path/to/ssl_certificate.key`：您的 SSL 证书和私钥的路径。
- `/path/to/frontend`：前端应用程序的根目录路径。
- `http://backend_server_ip:backend_server_port`：后端接口的地址和端口。

此配置中，Nginx 监听 443 端口，通过HTTPS将前端应用程序提供给用户。当用户访问根目录时，Nginx将提供前端应用程序的静态文件。当用户访问 `/api` 路径时，Nginx 将通过 `proxy_pass` 指令将请求代理到后端接口的 HTTP 地址。

确保在您的服务器上安装了 Nginx，并使用此配置文件进行相应的更改和调整。重启 Nginx 后，您的前端应用程序应该能够通过 HTTPS 访问，并通过 Nginx 代理将后端接口请求转发为 HTTP。

