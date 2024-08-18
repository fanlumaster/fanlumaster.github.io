---
title: >-
  django.template.exceptions.TemplateSyntaxError: staticfiles is not a
  registered tag library. 问题解决
description: ' '
date: 2021-04-14 13:16:06
tags:
- Bugs
categories:
- Bugs
index_img: https://i.imgur.com/AmOsHWa.png
banner_img: https://i.imgur.com/AmOsHWa.png
---

### 问题描述

Django 在加载静态文件时报了一个错误

    django.template.exceptions.TemplateSyntaxError: staticfiles is not a registered tag library.

导致加载不出来 html 页面

### 问题解决

把模板文件（即 html 文件）中的

```html
{% load staticfiles %}
{% load static from staticfiles %}
{% load admin_static %}
```

改成

```html
{% load static %}
```

按：出现这样原因其实是版本的问题，现在用的是 Django 3.0 版本，而之前则是 Django 2.0。