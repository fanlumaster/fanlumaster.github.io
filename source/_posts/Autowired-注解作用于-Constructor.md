---
title: '@Autowired 注解作用于 Constructor'
date: 2021-08-09 06:03:01
updated: 2021-08-09 06:21:42
tags:
- Spring
- Java
- Spring Boot
categories:
- Java
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210809061657.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210809061657.png
---

对于 @Autowired 注解，一般情况下的使用是用其来注解一个变量，比如

```java
@Autowired
private UserDao userDao;
```

但是，这个用法有时候会导致问题，比如，下面的代码

```java
@Autowired
private User user;

private String school;

public UserAccountServiceImpl() {
    this.school = user.getSchool();
}
```

这里在执行时，程序的执行顺序是先执行构造方法，然后再对加了 @Autowired 注解的 user 变量进行自动装配（即注入），所以，这段代码在执行时是会报错的。

所以，官方建议不要使用这种变量注入的方法，在 IDEA 中，给变量加 @Autowired 注解会产生一个警告。官方建议使用的方法是**构造器(Constructor)注入**，代码如下

```java
private final User user;
private String school;

@Autowired
public UserAccountServiceImpl(User user) {
    this.user = user;
    this.school = user.getSchool();
}
```

这样一来，程序在执行构造器方法时，就会自动注入 user。

---

参考：

1、https://www.cnblogs.com/acm-bingzi/p/springAutowired.html
2、https://www.ramostear.com/blog/2020/03/23/9guzql5w.html