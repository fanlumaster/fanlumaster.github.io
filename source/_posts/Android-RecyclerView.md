---
title: Android RecyclerView
date: 2021-12-22 17:18:47
tags:
- Android
categories:
- Android
index_img: https://i.imgur.com/51TShjk.png
banner_img: https://i.imgur.com/51TShjk.png
---

首先，添加依赖，

![](https://i.imgur.com/9uoMRK7.png)

```gradle
implementation "androidx.recyclerview:recyclerview:1.2.1"
```

另外，如果想要在 kotlin 文件中直接使用组件的 id 来调用类，那么，还需要加上这一行

![](https://i.imgur.com/wF5cKYc.png)

```gradle
id 'kotlin-android-extensions'
```