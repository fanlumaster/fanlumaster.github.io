---
title: jdk 中的 keytool 的使用，以及提取 jks 文件中的公钥和私钥
date: 2023-08-28 23:20:37
updated: 2023-09-02 23:13:35
tags:
- java
- openssl
categories:
index_img: https://i.imgur.com/NRd9Kim.png
banner_img: https://i.imgur.com/NRd9Kim.png
---

这里暂时只需要知道如何使用就可以了。

需要注意的一点是，这里是使用 jdk17 中带有的 keytool 生成的。所以，会出现以下的问题，这就导致了无法使用 java 来进行提取其中的公钥和私钥，

```shell
警告: PKCS12 密钥库不支持其他存储和密钥口令。正在忽略用户指定的-keypass值。
```

![](https://i.imgur.com/qkJdJi4.png)

这里更多的信息可以看这篇博客，

<https://www.cnblogs.com/simon-xie/p/17004614.html>

首先是生成一个密钥，

```shell
keytool -genkeypair -alias fanyfull -keypass ffkp123456 -validity 365 -storepass ffsp123456 -keystore fanyfull.jks -keyalg RSA
```

解释一下这里的选项，

- -alias 密钥对的名称
- -keypass 密钥密码
- -validity 有效期，这里是以天为单位
- -storepass 存储库的密码
- -keystore 指定生成的密钥文件存放的位置，这里的 `fanyfull.jks` 表示的是当前目录下的 `fanyfull.jks`，如果没有，就生成这个文件
- -keyalg 指定这个密钥对生成的算法，这里用的是 RSA 算法

![](https://i.imgur.com/VTrCi70.png)

如果想查看生成的 jks 文件的详细信息，可以使用以下命令，

```shell
keytool -list -v -alias fanyfull -storepass ffsp123456 -keystore .\fanyfull.jks
```

![](https://i.imgur.com/1o4lQ2y.png)

然后是**提取私钥**，

```shell
keytool -importkeystore -srckeystore .\fanyfull.jks -destkeystore fanyfull.p12 -deststoretype PKCS12 -srcalias fanyfull -deststorepass ffsp123456 -destkeypass ffkp123456
```

然后根据提示输入 storepass 即可，

![](https://i.imgur.com/Bxf0Nqs.png)

然后，可以使用 openssl 工具来提取其中的私钥，

```shell
openssl pkcs12 -nodes -in .\fanyfull.p12 -out private.pem
```

我们可以查看一下这里的私钥，

![](https://i.imgur.com/iHmEnD6.png)

这里的 `BEGIN PRIVATE KEY` 和 `END PRIVATE KEY` 之间的内容就是我们的私钥。

然后是**提取公钥**，

```shell
openssl pkey -in .\private.pem -pubout -out public.pem
```

我们可以查看一下这里的公钥，

![](https://i.imgur.com/b8aO9q3.png)

这里的 `BEGIN PUBLIC KEY` 和 `END PUBLIC KEY` 之间的内容就是我们的私钥。

而，如果我们单纯地只是想提取证书的话，那么，可以使用以下的命令，

```shell
keytool -export -alias fanyfull -keystore .\fanyfull.jks -file public.cert -rfc
```

![](https://i.imgur.com/Suy4j2A.png)

![](https://i.imgur.com/HcGr7m8.png)

至于这里的 openssl 工具，我这里是 windows 环境，使用 scoop 安装一下即可。当然，你也可以选择使用其他的方式来安装，比如，直接从网上下载二进制包来安装。

