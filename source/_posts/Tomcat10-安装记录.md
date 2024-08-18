---
title: Tomcat10 安装记录
date: 2021-07-13 01:14:57
tags:
- Java
- Web 开发
categories:
- Java
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013511.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713013511.png
---

首先，到官网(<https://tomcat.apache.org/download-10.cgi>)下载压缩包，我这里选择的是免安装版，一般都是选择这个，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713011606.png)

放到一个指定的位置，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713011828.png)

然后解压，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713011904.png)

然后就是配置环境变量了，

```
CATALINA_HOME
C:\DevEnvironment\JavaEnv\apache-tomcat-10.0.8
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713012026.png)

注意，这里不是 bin 目录，而是解压后的目录。

然后在 Path 新建如下内容

```
%CATALINA_HOME%\bin
```

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713012200.png)

确定之后，在命令行输入 `startup.bat` 检验一下，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713012331.png)

发现启动了一个新的窗口，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713012423.png)

访问一下 `localhost:8080`，发现如下内容，表明 Tomcat 启动成功。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713012459.png)

到此，Tomcat 就安装配置完成了。

最后，关闭 Tomcat 可以在命令行输入 `shutdown.bat`，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713012656.png)