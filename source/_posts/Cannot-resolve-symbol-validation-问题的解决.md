---
title: Cannot resolve symbol 'validation' 问题的解决
date: 2022-03-02 18:47:03
updated: 2022-03-05 12:09:32
tags:
- Bugs
- Spring
categories:
- Spring
index_img: https://i.imgur.com/T4SulV5.png
banner_img: https://i.imgur.com/T4SulV5.png
---

问题描述：

![](https://i.imgur.com/nJ6uRTI.png)

问题解决：

直接到 maven repo 中找到相关的包，导入到 `pom.xml` 中即可：

```xml
<!-- https://mvnrepository.com/artifact/javax.validation/validation-api -->
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>
```
