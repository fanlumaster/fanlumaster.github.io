---
title: 开始一个基本的 SpringBoot 项目
date: 2021-07-13 02:53:27
updated: 2021-07-13 03:46:56
tags:
- SpringBoot
- Spring
- Java
categories:
- SpringBoot
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713031154.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713031154.png
description: '从 Spring 官网的 Quick Start 学习的初始项目，打算从头开始，仔细学习 SpringBoot 的相关知识'
---

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713025530.png)

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713025612.png)

这里我没有连阿里云的镜像，因为挂了梯子，所以速度虽然比阿里云慢一些，但是速度也还行，而且可以保证纯度。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713025830.png)

总共下载了 4 分钟左右，时间可以接受。

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713030246.png)

添加代码

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713030712.png)

```java
package com.fan.springbootdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SpringbootdemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootdemoApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

}

```

然后，运行项目，这清爽的控制台真是赏心悦目

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713031002.png)

在浏览器中访问 `localhost:8080/hello`，效果如下

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713030614.png)