---
title: 也来搭建一个 Misskey 实例
date: 2023-08-12 22:39:54
updated: 2023-12-28 22:05:03
tags:
- 网站
- Linux
categories:
index_img: https://i.imgur.com/NDsqGhN.png
banner_img: https://i.imgur.com/NDsqGhN.png
---

## 主体

先看一下成果：

![](https://i.imgur.com/KGO0gzc.png)

其实一直以来都有这个想法，想要自己搭建一个联邦宇宙的实例，创建一颗属于自己的联邦宇宙中的星球，这个星球最好只有自己一个人，体验一下小王子那本书中的梦幻感。以及，由于联邦宇宙的特性，我可以选择是否与别的星球建立外交。

之前是因为事情比较多和比较少，就都不想做。最近工作开始有些累了，只好借助这类在以前的我看来是比较新鲜的事情来对冲一下心中的郁闷，这郁闷呢，除了工作，还有我回头看也暂时还想不明白的算法题。

郁闷！

只好来搭网站。

依然是买服务器，买域名。买的香港的一个 2核4G 的服务器。域名依然选择 NameSilo 供应商，之前买的那个 `fanyfull.monster` 域名使用了好几个月了，发现还是比较稳定的，比那个 godaddy 好太多。于是，这一次采购的是 `fanyfull.top`，说起这个域名，原来在腾讯买过，过期之后又流转到市场，最终还是回到我的手里了。所用花费不到 2 美金。

这里购买的服务器的配置是这个，香港的野草云，最大的优点是便宜，

```
HK-SSD-2C4G ￥188.00 元(一年)
操作系統: Ubuntu-20.04.1-x64
IPv4數量: 1個
```

之后是换域名解析，把域名解析牵引至 cloudflare 那里。比默认的稳定很多。大概是 1 和 100 的分别。

之后就是对照 misskey 的官网的文档进行构建。我这里没有选择 docker 来进行构建，一方面是对 docker 还不是很熟悉，另一方面，我觉得 docker 屏蔽了很多细节，对于喜欢了解细节的同志来说，可能会感到缺了点什么。

这里不去讲具体的每一个小步骤，就稍微讲一下我在搭建的过程中遇到的一些关键的可能会出问题的节点，以及我个人的解决方案。

首先看 Install dependencies，

![](https://i.imgur.com/xEVhvKg.png)

这里服务器的系统最好选择 Ubuntu22.04，我试过 arch，最后在编译的过程中会出问题，而且这个文档默认我们是使用 Ubuntu 或者 Debian 的，所以，就只好选择这个系统了，反正是用作服务器，我们平时不会真正在上面工作的，就不必担心其手感问题，

然后是 Nodejs 和 PostgreSQL 的安装，这个需要去网络上搜索一下，安装最新的版本。至于 Redis 和 FFmeg 安装 apt 仓库中的默认的最新版就可以了。安装 Redis 最好是看官网的[文档](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)。

然后，在执行文档中给出的那个添加用户的命令的时候，使用下面的这个命令，

```bash
adduser --disabled-password --disabled-login misskey
```

是不好的，因为后面在执行一些命令的时候是需要使用到 misskey 用户的密码的，当然啦，这个也是可以后期弥补的，

对于图片所在的目录，也就是项目根目录下的 `files`，我们不需要对其作什么修改权限的操作，如果后面出现了无法加载图片的情况，再去修改 files 目录的读写权限。

这个 nginx 会自动把 http 的请求重定向到相应的 https 请求。

申请 ssl 证书依然是使用 acme。

其他的也没什么了。多试几次也就解决了。

## 一些问题

在我搞定了 ssl 证书的时候，发现通过 https 无法访问到网站，吊诡。实际呢，原来是没有使用 ufw 开放 443 这个端口。

关于设置防火墙之后，可以 ping 通 ip 但是无法使用 ssh 连接的问题，其实也是启用防火墙的时候没有把 22 这个端口给加进去。

## 其他

### nginx 相关

nginx 默认配置存放的位置，

```
/etc/nginx/nginx.conf
```

nginx 的一些周边命令，

```bash
sudo systemctl restart nginx
```

```bash
sudo systemctl start nginx
```

```bash
sudo systemctl stop nginx
```

查看配置是否有问题的命令，

```bash
sudo nginx -t
```

### 切换用户

```bash
sudo -iu misskey
```

```bash
sudo -iu root
```

### 防火墙 ufw 的相关命令

开启防火墙，

```bash
sudo ufw enable
```

关闭防火墙，

```bash
sudo ufw disable
```

重启防火墙，

```bash
sudo ufw reload
```

### redis 相关

启动 redis，

```bash
sudo systemctl start redis
```

关掉 redis，

```bash
sudo systemctl stop redis
```

重启 redis，

```bash
sudo systemctl restart redis
```

遇到的一个 redis 无法启动服务的问题，

```bash
Failed to restart redis-server.service: Unit redis-server.service not found
```

这个可以执行下面的命令解决，

```bash
sudo systemctl enable redis-server
```

参考：<https://stackoverflow.com/questions/39179525/failed-to-restart-redis-server-service-unit-redis-server-service-not-found>

## 使用经验

### 如何更改 storage 的限制

既然是我们自己的服务器，那么，其实不用那么抠嘛，默认的是一个用户可以使用 100MB 的空间，也就是说，上传个不到 100 张的图片就差不多把空间给耗尽了。

修改的入口是在这个地方。我这里就暂时把这个值修改成 1000MB 了，应该够我用一段时间了。

![](https://i.imgur.com/tl1CSdy.png)

---

参考：

1、<https://misskey-hub.net/en/docs/admin/nginx.html>  
2、<https://misskey-hub.net/en/docs/install/manual.html>  
3、<https://computingforgeeks.com/how-to-install-node-js-20-on-ubuntu/?expand_article=1>  
4、<https://techviewleo.com/how-to-install-postgresql-15-on-ubuntu/?expand_article=1>

### 服务器宕机该如何处理

对于这种单服务的情况，直接重启吧。重启的时候，需要注意几个地方，

- ufw 重启
- nginx 重启
- redis 重启
- misskey 服务重启

这些命令上面都有讲。重启是在 misskey 用户下进行的。以及，也可以试一下直接从命令行运行官网那个 pnpm 指令，看看能不能正常运行。

如果是服务器本身的问题，那么及时给服务器的供应商提个单。


