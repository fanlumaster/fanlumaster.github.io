---
title: Flask Web 开发（第 2 版）阅读札记
date: 2021-11-05 13:08:16
tags:
- Flask
- Python
- 读书
categories:
- 读书
index_img: https://i.imgur.com/4boxa9j.png
banner_img: https://i.imgur.com/4boxa9j.png
---

本书实践环境为 Ubuntu20.04。

# 第 1 章 安装

> Flask 的 3 个主要依赖？

- 路由、调试和 Web 服务器网关接口（WSGI，Web server gateway interface）子系统由 Werkzeug 提供；
- 模板系统由 Jinja2 提供；
- 命令行集成由 Click 提供。

> Python 虚拟环境的好处？

虚拟环境是 Python 解释器的一个私有副本，在这个环境中你可以安装私有包，而且不会影响系统中安装的全局 Python 解释器。

虚拟环境非常有用，可以避免你安装的 Python 版本和包与系统预装的发生冲突。为每个项目单独创建虚拟环境，可以保证应用只能访问所在虚拟环境中的包，从而保持全局解释器的干净整洁，使其只作为创建更多虚拟环境的源。与直接使用系统全局的 Python 解释器相比，使用虚拟环境还有个好处，那就是不需要管理员权限。

> 如何使用 Ubuntu 系统预装的 Python3 来创建虚拟环境？

需要先安装 `python3-venv` 包：

```shell
$ sudo apt-get install python3-venv
```

然后创建：

```shell
$ python3 -m venv venv
```

按：最后一个 `venv` 是虚拟环境的名称，可以自由更改。

> 如何激活虚拟环境？

```shell
$ source venv/bin/activate
```

> 需要安装哪些包？

```shell
(venv) $ pip install flask
```

可以使用 `pip freeze` 命名查看安装了哪些包。

![](https://i.imgur.com/MPWSETu.png)

# 第 2 章 应用的基本结构

> WSGI 有什么用处？

Web 服务器使用一种名为 Web 服务器网关接口（WSGI，Web server gateway interface，读作“wiz-ghee”）的协议，把接收自客户端的所有请求都转交给这个对象处理。

> 何为 Flask 应用的应用实例？

所有 Flask 应用都必须创建一个应用实例。应用实例是 Flask 类的对象，通常由下述代码创建：

```py
from flask import Flask
app = Flask(__name__)
```

> 传给 Flask 应用构造函数的 `__name__` 参数有什么用？

Flask 用这个参数确定应用的位置，进而找到应用中其他文件的位置，例如图像和模板。

> 何为路由？

处理 URL 和函数之间的关系的程序称为路由。

> 在 Flask 应用中如何定义路由？

最简便的方式是使用应用实例提供的 `app.route` 装饰器。

```py
@app.route('/')
def index():
    return '<h1>Hello World!</h1>'
```

还有一种更传统的方式：使用 `app.add_url_rule()` 方法。这个方式最简单的形式接受 3 个参数：URL、端点名和视图函数。

```py
def index():
    return '<h1>Hello World!</h1>'

app.add_url_rule('/', 'index', index)
```

按：这个和前面使用装饰器的代码达到的效果相同。

