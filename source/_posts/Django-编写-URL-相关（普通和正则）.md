---
title: Django 编写 URL 相关（普通和正则）
description: ' '
date: 2021-04-13 19:46:54
updated: 2023-06-01 03:01:01
tags:
- Python
- Django
categories:
- Python
index_img: https://i.imgur.com/694deko.png
banner_img: https://i.imgur.com/694deko.png
---

正规详细的参考资料可以参考官方文档：<https://docs.djangoproject.com/zh-hans/3.2/topics/http/urls/>

这里仅仅是记录一下几个我在学习过程中的例子和踩过的坑。

### 示例一：编写一个简单的 URL

首先，在站点目录的 `url.py` 中编写 URL 规则

![20210413195445](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210413195445.png)

这个是创建项目（使用 PyCharm）时自动生成的目录。

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('index.urls')), # 函数 include() 允许引用其它 URLconfs，URL 为空，代表网站的域名是 localhost(127.0.0.1:8000)，通常是网站的首页
]
```

说明

- `from django.urls import include` 这行代码对应 `path('', include('index.urls'))`，使用自己加的 APP 的文件下的 `urls.py` 必须要这样做

然后在 index 文件夹下编写 `urls.py`，上面引用的 `index.urls` 就是这个文件

![20210413200431](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210413200431.png)

```py
from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
]
```

说明

- 这里的 `from . import views` 表示引用当前文件夹下的 `views.py`

然后我们需要在 `views.py` 文件中编写 `index()` 函数

```py
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
def index(request):
    return HttpResponse("Hello World!")
```

注释下面的代码即后加的代码。

最后，我们可以运行项目，然后在浏览器中打开 `http://127.0.0.1:8000/` 测试一下了

![20210413200846](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210413200846.png)

因为我们之前的 `path()` 第一个参数设置的是空字符串，所以，我们在浏览器地址栏输入的地址后，就会最终执行 `index()` 函数，然后显示相关信息。

### 示例二，带变量的 URL

注意，下面的操作全部是在 `index` 文件夹下。

#### 普通写法

```py
from django.urls import path, re_path
from . import views
urlpatterns = [
    path('', views.index),
    # 添加带有字符类型、整型和 slug 的 URL
    path('<year>/<int:month>/<slug:day>', views.mydate), # 这里的 year 
]
```

然后编写 `mydate()` 函数

```py
def mydate(request, year, month, day):
    return HttpResponse(str(year) + '/' + str(month) + '/' + str(day))
```

接下来的操作没什么不同。

#### 正则表达式写法

这也是我踩坑的写法。

`urls.py` 文件

```Py
from django.urls import path, re_path
from . import views
urlpatterns = [
    path('', views.index),
    # 添加带有字符类型、整型和 slug 的 URL
    # path('<year>/<int:month>/<slug:day>', views.mydate), # 这里的 year 相当于 str:year
    re_path('(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2}).html$', views.mydate),
]
```

说明

- 这里正则表达式最好要以 `$` 结尾，不然，在 `.html` 后面输入无限长的字符串程序也能正常访问。

然后编写 `mydate()` 函数

```py
def mydate(request, year, month, day):
    return HttpResponse(str(year) + '/' + str(month) + '/' + str(day))
```

然后运行，

![20210413201701](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210413201701.png)

这里是正确的写法。我踩的坑其实是把正则表达式给写错了，具体就是多写了一个花括号 `}`，然后访问 URL 时就总是 404。

### 其他

在写上面的正则表达式时，我测试过这样一种写法

```py
re_path('(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})/$', views.mydate),
```

即，利用正则表达式的规则，强制 URL 必须以正斜杠结尾，但是，实际测试时，发现结尾不写正斜杠也能够正常访问。原因是 Django 中有这样一个配置 `APPEND_SLASH`，它的默认值是 `True`，作用是如果 URL 结尾没有正斜杠，那么 Django 会默认把它加在末尾。这个变量我们可以在 `django/conf/global_settings` 中找到。如果我们想要更改其为 `False`，只需要在项目的站点目录下的 `settings.py` 中写下如下代码即可

```py
APPEND_SLASH = False
```

`APPEND_SLASH` 在源码中的位置 ↓

![20210413202800](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210413202800.png)

![20210413202721](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210413202721.png)

参考：[stackoverflow](https://stackoverflow.com/questions/45784191/django-is-append-slash-set-to-true-even-if-not-in-settings-py) [文档](https://www.osgeo.cn/django/topics/http/urls.html) [官方文档](https://docs.djangoproject.com/zh-hans/3.2/topics/http/urls/) 《玩转 Django 2.0 - 黄永祥》