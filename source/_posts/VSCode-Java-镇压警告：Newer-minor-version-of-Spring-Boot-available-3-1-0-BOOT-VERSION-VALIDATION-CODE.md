---
title: >-
  VSCode Java 镇压警告：Newer minor version of Spring Boot available:
  3.1.0(BOOT_VERSION_VALIDATION_CODE)
date: 2023-05-21 14:58:28
updated: 2023-05-21 15:14:00
tags:
- VSCode
- Java
- SpringBoot
categories:
index_img: https://i.imgur.com/HD1jBIM.png
banner_img: https://i.imgur.com/HD1jBIM.png
---

很久没使用 Java 和 SpringBoot 了，从 GitHub 上面 clone 了一个项目，遇到了这样一个错误，提示我去升级版本，暂时不想升，就想着能不能把这两个错误先镇压掉，

```
Newer minor version of Spring Boot available: 3.1.0(BOOT_VERSION_VALIDATION_CODE)
Newer patch version of Spring Boot available: 3.0.7(BOOT_VERSION_VALIDATION_CODE)
```

![](https://i.imgur.com/FjATEqb.png)

一开始以为是 redhat 的 xml 插件的问题，想着能不能去把 diagnostics 给关掉，结果找半天没找到这个插件有这个配置，后面不得已才去往 springboot 插件上找问题，结果，还真是这个插件的问题，于是，继续按关键词尝试，最后，试出了这个配置，

```json
"spring-boot.ls.problem.version-validation.UPDATE_LATEST_MINOR_VERSION": "IGNORE",
"spring-boot.ls.problem.version-validation.UPDATE_LATEST_PATCH_VERSION": "IGNORE",
```

其实，还有几个其它的同一层级的配置，我是直接试到最后才试出来结果，索性就一起镇压了罢，

```json
"spring-boot.ls.problem.version-validation.UPDATE_LATEST_MAJOR_VERSION": "IGNORE",
"spring-boot.ls.problem.version-validation.SUPPORTED_COMMERCIAL_VERSION": "IGNORE",
"spring-boot.ls.problem.version-validation.UNSUPPORTED_COMMERCIAL_VERSION": "IGNORE",
"spring-boot.ls.problem.version-validation.SUPPORTED_OSS_VERSION": "IGNORE",
"spring-boot.ls.problem.version-validation.UNSUPPORTED_OSS_VERSION": "IGNORE",
"spring-boot.ls.problem.version-validation.UPDATE_LATEST_MINOR_VERSION": "IGNORE",
"spring-boot.ls.problem.version-validation.UPDATE_LATEST_PATCH_VERSION": "IGNORE",
```

按：今天发现 VSCode 中的 Spring 相关的插件的作者变成了 VMWare？这是什么情况？原来似乎是 Pivot，是 Spring 还是 eclipse 的官方组织，怎么突然变成了 VMWare？
