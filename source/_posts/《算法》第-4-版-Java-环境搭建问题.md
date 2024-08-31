---
title: 《算法》第 4 版 Java 环境搭建问题
date: 2021-03-25 22:56:37
updated: 2023-06-11 01:58:18
tags:
- 《算法4》
- Java
- Bugs
- IDEA
categories:
- Java
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222424.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222437.png
---

在阅读《算法》第 4 版时，由于程序的运行需要依赖书中提供的程序库，遂到官网下载之。

第一次下载的是 `stdlib.jar`，然后导入这个 jar 包到 IDEA 中后，发现无法在程序中 `import`，尝试了三种导入 jar 包的方法，都没有奏效。

最后解决的办法是，重新下载了全书所有的依赖整合成的依赖集 `algs4.jar`，然后重新导入到 IDEA，这下就解决了。这里说明一下，`stdlib.jar` 中的内容是 `algs4.jar` 的一部分。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210325230522.png)

附注：IDEA 导入 `jar` 包的一种方法

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210325230821.png)

然后将 `algs4.jar` 文件复制到 lib 文件中，

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210325231159.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210325231223.png)

发现 IDEA 可以智能提示了，说明已经导入成功了。
