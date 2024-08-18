---
title: 利用 Python 替换文本中的 NBSP
description: '一次简单的使用 Python 给生活带来遍历的记录.'
date: 2021-05-20 22:41:25
tags:
- Python
- 小玩意
categories:
- Python
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222542.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222542.png
---

今天在使用 MusicBee 听歌时, 发现它的歌词不能够自动换行, 然后将歌词粘贴到 P有Charm 中, 发现有很多这个 `NBSP`,

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210520224314.png)

根据以往的经验, 这和 html 中硬编码的空格 `&nbsp` 有点像, 然后就直接使用 Python 的 `replace()` 函数给替换掉之后, 发现歌词就可以正常换行了.

完整代码如下:

```py
# -*- coding: utf-8 -*-
# @File  : draft01.py
# @Author: FanLu
# @Date  : 2021/5/20

str = '''
[00:00.000] 作词 : Angergård
[00:01.000] 作曲 : Club 8
[00:08.660]it's saturday
[00:10.200]so you"re going out
[00:12.250]you"re going out without much in sight
[00:16.100]when all stand still
[00:18.500]you just can"t go home
[00:20.600]you"re staying out til the morning comes
[00:26.950]
[00:32.670]hey you
[00:34.390]what"s that you"re saying?
[00:36.210]it"s the club 8
[00:38.370]who"s gonna be playing here
[00:45.220]
[00:56.730]hey you
[00:58.370]stop that singing
[01:00.180]cause the club 8
[01:02.410]is all there needs to be
[01:14.110]
[01:16.780]it"s saturday
[01:18.500]so you"re going out
[01:20.460]you"re going out without much in sight
[01:24.0]when all stand still
[01:26.400]you just can"t go home
[01:28.400]you"re staying out til the morning comes
[01:34.340]
[01:44.910]hey you
[01:46.520]what"s that you"re saying?
[01:48.470]it"s the club 8
[01:50.509]who"s gonna be playing here
[02:00.810]
[02:08.880]hey you
[02:10.509]your sound"s a disaster
[02:12.240]won"t you please step
[02:14.460]out of the way for me
[02:21.900]
[02:28.650]it"s saturday
[02:30.150]so you"re going out
[02:32.610]you"re going out without much in sight
[02:36.140]when all stand still
[02:38.710]you just can"t go home
[02:40.570]you"re staying out til the morning comes
[02:47.500]
[02:52.950]take your time
[02:54.850]drink your wine
[02:56.850]i don"t care where you"re going
[03:00.890]if music"s fine
[03:03.200]i don"t mind
[03:05.110]if all those people are showing off
[03:12.940]it"s saturday
[03:14.390]so you"re going out
[03:16.590]you"re going out without much in sight
[03:20.220]when all stand still
[03:22.400]you just can"t go home
[03:28.670]it"s saturday
[03:30.400]so you"re going out
[03:32.670]you"re going out without much in sight
[03:36.350]when all stand still
[03:38.390]you just can"t go home
[03:40.700]you"re staying out til the morning comes
[03:50.700]
[04:00.240]
[04:05.240]
'''

res = str.split('\n')
res = str.replace(' ', ' ')
print(res)
```