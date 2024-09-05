---
title: IDEA 配置自己的 maven
date: 2022-03-02 18:00:15
updated: 2022-03-05 12:07:50
tags:
- Java
- Spring
- Maven
categories:
- Java
index_img: https://i.imgur.com/D13FnnC.png
banner_img: https://i.imgur.com/D13FnnC.png
---

开始复习 Java。

# 下载

首先，去 maven [官网](https://maven.apache.org/download.cgi) 下载 maven 的压缩包，

![](https://i.imgur.com/pMaexBu.png)

下载好之后解压缩，然后将 `bin` 目录添加到环境变量：

![](https://i.imgur.com/woCHqyQ.png)

然后在命令行测试一下：

```powershell
mvn -v
```

![](https://i.imgur.com/MghlN1x.png)

如果正常输出版本号，则初步配置成功。

# 配置镜像

打开 `conf` 目录下的 `settings.py`

![](https://i.imgur.com/clQYnDi.png)

![](https://i.imgur.com/UL7kdeo.png)

修改镜像配置：

```xml
<mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
</mirror>
```

![](https://i.imgur.com/3obRfRa.png)

添加本地仓库地址：

```xml
<localRepository>C:\FDisk\maven\repository</localRepository>
```

![](https://i.imgur.com/gupN8nL.png)

到这里，基本配置就完成了。

# 在 IDEA 中的配置

先配置 `New Projects Setup`，

![](https://i.imgur.com/sJeofSf.png)

![](https://i.imgur.com/CIQDjSU.png)

然后再在普通的设置里面再配置一次就可以了。

---

参考：

1、<https://zhuanlan.zhihu.com/p/122429605>