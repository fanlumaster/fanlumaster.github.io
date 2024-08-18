---
title: windows11 安装配置 maven
date: 2023-08-19 16:34:24
tags:
- 工具
- 环境
categories:
index_img: https://i.imgur.com/KW8sjaB.png
banner_img: https://i.imgur.com/KW8sjaB.png
---

本来是想使用 scoop 来安装配置 maven 的，但是现在有点搞不清 scoop 中的一点小配置，就还是手动安装。

之前也写过一篇 IDEA 配置 maven 的博客，那时候 maven 还是 3.8.x 版本。虽然现在 IDEA 内置的 maven 的版本也还是 3.8.x 版本，但是我是比较喜欢追新的，所以能用最新版就尽量用最新版。

下载，

![](https://i.imgur.com/KTCy6QN.png)

解压，同时新建一个 repo 目录，后面用来作为本地仓库，

![](https://i.imgur.com/RCNPOQu.png)

然后配置系统的环境变量，

![](https://i.imgur.com/jBhF2G8.png)

![](https://i.imgur.com/v0S35vm.png)

上面的那个变量最终其实也是被替换成下面的实际的地址，

![](https://i.imgur.com/pRxsR1N.png)

然后，到 pwsh 中测试一下，

```shell
mvn -v
```

![](https://i.imgur.com/jdrjcNx.png)

然后是配置**代理**和本地仓库路径，找到相应的位置，全文搜索一下即可，然后在那个位置添加如下内容，

我这里是使用 clash for windows，所以配置如下，

```xml
<proxy>
    <id>httpproxy</id>
    <active>true</active>
    <protocol>http</protocol>
    <host>127.0.0.1</host>
    <port>7890</port>
</proxy>
<proxy>
    <id>httpsproxy</id>
    <active>true</active>
    <protocol>https</protocol>
    <host>127.0.0.1</host>
    <port>7890</port>
</proxy>
```

这里的本地仓库的路径就是我们刚才新建的那个 repo 的路径，

```xml
<localRepository>C:/FDisk/Maven/maven-3.9.4-repo</localRepository>
```

然后是 IDEA 的配置，这里主要是对新建项目时候的配置，省得每一次都要去手动再去改，

![](https://i.imgur.com/rm69DeC.png)

![](https://i.imgur.com/8xc22JS.png)

在这里有一个小技巧看这个 maven 的代理是否真的设置成功了，那就是，我们在 IDEA 中点击那个同步的按钮的时候，可以去 clash for windows 中看一下日志，

![](https://i.imgur.com/QQgslNn.png)

可以看到，我们在下载 maven 中包的时候，流量走的是正是我们的代理。

然后是 VSCode 的配置，只需要在 `settings.json` 中去改一下即可，

```json
"maven.executable.path": "C:\\FDisk\\Maven\\apache-maven-3.9.4\\bin\\mvn",
"java.configuration.maven.globalSettings": "C:\\FDisk\\Maven\\apache-maven-3.9.4\\conf\\settings.xml",
```

之前之所以要在配置文件里面声明本地的 maven 仓库的位置，也是为了在这里省事儿，不然，这里就读取到的本地的 maven 仓库就是 `${user.home}/.m2/repository`。

