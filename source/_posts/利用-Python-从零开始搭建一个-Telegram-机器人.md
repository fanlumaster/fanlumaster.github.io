---
title: 利用 Python 从零开始搭建一个 Telegram 机器人
date: 2021-11-02 18:49:17
tags:
- Python
- Ubuntu
categories:
- Python
index_img: https://i.imgur.com/ONAgbOJ.png
banner_img: https://i.imgur.com/ONAgbOJ.png
---

本人使用的操作系统是 Ubuntu 20.04，如果是 Windows 或者 MacOS，其操作过程应该类似，应该。

然后编程的语言是 Python，使用的 Web 框架是 Flask。

# 创建机器人

首先，注册一个 Telegram 账号，然后，执行相关操作，

![](https://i.imgur.com/nlClsIW.png)

我们的 bot 应该有两个属性：一个 name，另一个是 username。name 相当于昵称，而 username 则是在 bot 被提及或者被分享时会用到。

当选好了我们的 bot name 和 username（username 比如以 bot 结尾）之后，我们会收到一条带有 token 的信息，然后我们需要保存这个 token 以及前面的 username，我们之后会用到它们。

# 编写代码和相关逻辑

首先，让我们创建一个 Python 虚拟环境，这会帮助我们将项目中所需求的工具包等从全局的 Python 环境中隔离开来，

```shell
$ python3 -m venv botenv/
```

然后我们使用命令来激活虚拟环境，

```shell
$ source botenv/bin/activate
```

我们需要安装的包有：

- Flask：一个使用 Python 构建的微 web 框架
- Python-telegram-bot：一个使用 Python 给 Telegram 整的 API 封装
- Requests：一个流行的 Python http 库
- gunicorn：后面部署到 Heroku 时会用到

我们可以使用 pip 命令在虚拟环境中安装这些包：

```shell
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ pip install flask
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ pip install python-telegram-bot
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ pip install requests
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ pip install gunicorn
```

然后，我们还需要在当前目录下创建几个文件（夹）：

```shell
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ mkdir telebot
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ touch app.py
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ cd telebot/
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject/telebot$ touch credentials.py
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject/telebot$ touch __init__.py
```

然后，我们使用 VSCode 打开这个项目进行编辑：

```shell
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject/telebot$ cd ..
(botenv) lufan@lufan-ubuntu:~/Documents/PythonCodes/telebotproject$ code ./
```

```shell

```

