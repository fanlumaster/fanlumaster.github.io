---
title: 在 vps 中运行一个 Java 的 jar 包
date: 2023-05-30 22:25:34
updated: 2023-05-30 22:46:14
tags:
- Java
categories:
index_img: https://i.imgur.com/FBBP2ZF.png
banner_img: https://i.imgur.com/FBBP2ZF.png
---

今天算是把毕业设计的事情忙得差不多了。时间可以更多地分配给自己在意的事情上。

在服务器端部署一个 jar 包，其实就是一个后端项目。

如果是测试阶段，那么，我们直接使用 `java -jar` 命令就可以了，比如，

```shell
java -jar .\memo-0.0.1-SNAPSHOT.jar
```

但是这样有一个问题，因为是 ssh 连接到远程的服务器，所以，一旦我们长时间不去操作，那么，服务器会自动断开连接，然后，程序就会自动终止。

![](https://i.imgur.com/QIGlNW1.png)

所以，我们得让这个程序在后台执行，

这里使用 `nohup` 命令就可以了，

```shell
nohup java -jar .\memo-0.0.1-SNAPSHOT.jar &
```

`nohup` 就是 no hang up 的意思，不挂断。最后的 `&` 表示重定向。及，会将 `nohup` 和 `&` 之间的命令放入后台去执行，然后，命令的输入会重定向到 nohup.out 文件中。

然后，需要考虑一个问题，及，我们如何去关闭这样的后台应用呢？

答案是：根据服务端口查询进程号，

```shell
netstat -lnp | grep 33231
```

这里，`33231` 是 jar 运行占用的端口。

然后，我们再使用 `kill -9 33231` 杀掉进程即可。

