---
title: spring-boot-maven-plugin 报红问题的解决
date: 2022-03-02 18:41:57
updated: 2022-03-05 12:09:20
tags:
- Bugs
- Spring
- Spring Boot
categories:
- Spring
index_img: https://i.imgur.com/Ow3UPSq.png
banner_img: https://i.imgur.com/Ow3UPSq.png
---

问题描述：

在 `pom.xml` 中的

```xml
<artifactId>spring-boot-maven-plugin</artifactId>
```

会报红。

解决：

根据 IDEA 的提示，发现应该是没有声明版本号的原因，因此，在下面声明版本号即可：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>2.6.4</version>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

