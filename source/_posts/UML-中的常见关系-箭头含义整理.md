---
title: UML 中的常见关系(箭头含义整理)
date: 2021-06-07 12:24:19
tags:
- UML
- 面向对象
categories:
- UML
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607142649.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607142649.png
---

## 前言

最近在读《人人都懂设计模式》（罗伟富）这本书，发现这里面的讲解 UML 常见的几种关系非常形象，在这里就做一个笔记，加强印象。

## UML 常见关系

### 1. 泛化（Generalization）

泛化（Generalization）是一种继承关系，表示一般与特殊的关系，它指定了子类如何特化父类的所有特征和行为。

如：哺乳动物具有恒温、胎生、哺乳等生理特征，猫和牛都是哺乳动物，也都具有这些特征，但除此之外，猫会捉老鼠，牛会耕地，如下图所示

![泛化（Generaliaztion）](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607124920.png)

### 2. 实现（Realization）

实现（Realization）是一种类与接口的关系，表示类是接口所有特征和行为的实现。

如：蝙蝠也是哺乳动物，它除具有哺乳动物的一般特征之外，还会飞，我们可以定义一个 IFlyable 的接口，表示飞行的动作，而蝙蝠需要实现这个接口，如下图所示

![实现（Realization）](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607130417.png)

注：在 Java 中实现的英文是 Implementation。

### 3. 组合

组合（Composition）也表示整体与部分的关系，但部分离开整体后无法单独存在，因此，组合与聚合相比是一种更强的关系。

如：我们的电脑由 CPU、主板、硬盘、内存组成，电脑与 CPU、主板、硬盘、内存是整体与部分的关系，但如果让 CPU、主板等组件单独存在，就无法工作，因此没有意义，如下图所示

![组合（Composition）](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607131330.png)

### 4. 聚合（Aggregation）

聚合（Aggregation）是整体与部分的关系，部分可以离开整体而单独存在。

如：一个公司会有多个员工，但员工可以离开公司单独存在，离职了依然可以好好地活着，如下图所示

![聚合（Aggregation）](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607131733.png)

### 5. 关联（Association）

关联（Association）是一种拥有关系，它使一个类知道另一个类的属性和方法。关联可以是双向的，也可以是单向的。

如：一本书会有多个读者，一个读者也可能会有多本书，书和读者是一种双向的关系（也就是多对多的关系）；但一本书通常只会有一个作者，是一种单向的关系（就是一对一的关系，也可能是一对多的关系，因为一个作者可能会写多本书），如下图所示

![关联（Association）](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607141029.png)

### 6. 依赖（Dependency）

依赖（Dependency）是一种使用的关系，即一个类的实现需要另一个类的协助，所以尽量不要使用双向的互相依赖。

如：所有的动物都要吃东西才能活着，动物与食物就是一种依赖关系，动物依赖食物而生存，如下图所示

![依赖（Dependency）](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210607141757.png)

## 以前整理的不太好的 UML 常见关系

下面是我以前整理的 UML 关系，不太好理解，一点都不形象，贴在这里，引以为戒。

### 1、泛化（Generalization），在Java里表现为继承（Inheritance）（“is-a”）

![](https://gitee.com/fanlumaster/blog-pics-bed/raw/master/imgs/20200907170311.png)

### 2、实现（Interface implementation）

![](https://gitee.com/fanlumaster/blog-pics-bed/raw/master/imgs/20200907170552.png)

### 3、依赖（Dependency）（“uses-a”）

概念：一种使用的关系，即一个类的实现需要另一个类的协助，Java中，如果一个类的方法操纵另一个类的对象，我们就说一个类依赖于另一个类。

![](https://gitee.com/fanlumaster/blog-pics-bed/raw/master/imgs/20200907171334.png)

这里是类A依赖于类B。

### 4、 聚合（Aggregation）（“has-a”）

概念：聚合关系意味着类A的对象包含类B的对象。

![](https://gitee.com/fanlumaster/blog-pics-bed/raw/master/imgs/20200907172200.png)

老师和学生是“has-a”的关系，这里是Teacher指向Student，但是连线的尾部是一个空心的菱形。

### 5、关联（Association）

概念：表示类与类之间的联接,它使一个类知道另一个类的属性和方法，这种关系比依赖更强、不存在依赖关系的偶然性、关系也不是临时性的，一般是长期性的。Java中一个类的全局变量引用了另一个类，就表示关联了这个类。

![](https://gitee.com/fanlumaster/blog-pics-bed/raw/master/imgs/20200907172818.png)

解释：在Teacher类中引用Course这个类。

### 6、组合（Combination）

概念：组合也是关联关系的一种特例。组合是一种整体与部分的关系，即contains-a的关系，比聚合更强。部分与整体的生命周期一致，整体的生命周期结束也就意味着部分的生命周期结束，组合关系不能共享。程序中组合和关联关系是一致的，只能从语义级别来区分。

表示方法：尾部为实心菱形的实现箭头（也可以没箭头），类A指向类B。

![](https://gitee.com/fanlumaster/blog-pics-bed/raw/master/imgs/20200907173457.png)

---

好的参考：

1、《人人都懂设计模式》（罗伟富）

不好的参考：
1、<https://www.cnblogs.com/ylq1990/p/8473041.html> 
2、《Java核心技术》（第10版）