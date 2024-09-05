---
title: python 虚拟环境的另一种创建方法
date: 2022-09-14 23:10:28
updated: 2022-09-14 23:24:39
tags:
categories:
index_img: https://i.imgur.com/Iz7e2OO.png
banner_img: https://i.imgur.com/Iz7e2OO.png
---

以前写过用 python 自带的 venv 模块创建虚拟环境的[博客](https://fanyfull.github.io/2021/06/02/Python-3-8-%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83%E7%9B%B8%E5%85%B3(Windows10))，然后就是个人其实更加偏爱另一种方式，那个是在 youtube 的一个 django 的教程中看到的，用的是 virtualenv 模块，需要我们自己安装，

```py
pip install virtualenv
```

然后我们想创建虚拟环境的化，就使用如下命令：

```shell
virtualenv env_name
```

`env_name` 就是我们自己取的名字，随便取。

之后就可以愉快地开发了。

需要注意的是，激活虚拟环境：

```shell
env_name/Scripts/activate
```

退出虚拟环境：

```shell
deactivate
```

然后是在虚拟环境下安装包的命令必须得使用下面的格式：

```shell
python -m pip install package_name
```
