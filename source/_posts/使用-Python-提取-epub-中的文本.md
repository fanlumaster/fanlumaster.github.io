---
title: 使用 Python 提取 epub 中的文本
date: 2021-07-08 12:12:07
updated: 2021-07-08 18:33:56
tags:
- Python
- bs4
categories:
- Python
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210708172236.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210708172236.png
---

## 前言

最近读了《繁花》这本书，就想着能不能使用 Python 把 epub 格式的小说中的文本给提取出来，然后进行文本分析。本来我以为 Python 的相关的库是很多的，然而在实际运用过程中却遇到了困难。网上能够找到的库基本上只有一个 ebooklib，这是让我很惊讶的。

无奈之下，只好去研究 epub 格式的文件的构造，经过研究，发现 epub 电子书格式其实是很多个 xhtml 文件的压缩格式，这一下子就好办了，这样我就可以直接用 BeautifulSoup 来解析它们了。（BeautifulSoup，写过爬虫的应该不会陌生）

## 正文

我把原 epub 文件解压后的文件夹 blossoms 放在项目的根目录下

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210708182839.png)

然后直接上代码

```py
# -*- coding: utf-8 -*-
# @File  : parse_book.py
# @Author: FanLu
# @Date  : 2021/7/7

from bs4 import BeautifulSoup

# xhtml_file = open('blossoms/OEBPS/Text/part0009.xhtml', 'r', encoding='utf-8')
# xhtml_handle = xhtml_file.read()
#
# soup = BeautifulSoup(xhtml_handle, 'lxml')
#
# title = soup.find_all("title")
# print(title)
#
# p_list = soup.find_all('p')
# for p in p_list:
#     print(p)

def exact_p_tag(path):
    xhtml_file = open(path, 'r', encoding='utf-8')
    xhtml_handle = xhtml_file.read()

    soup = BeautifulSoup(xhtml_handle, 'lxml')

    title = soup.find_all("title")
    # print(title)

    p_list = soup.find_all('p')
    for p in p_list:
        print(p.text)

# 批量处理文件
import os

rec_res = os.walk(r'blossoms/OEBPS/Text')
filename_list = []
for path, dir_list, file_list in rec_res:
    for file_name in file_list:
        filename_list.append(file_name)
# print(filename_list)
filename_list = filename_list[1:]
# print(filename_list)

BASE_PATH = 'blossoms/OEBPS/Text'
for filename in filename_list:
    path = BASE_PATH + '/' + filename
    exact_p_tag(path)
    # print(path)
```

因为经过我的研究，所有的文本都是放在 p 标签内部的，所以，我需要做的就只是遍历所有的 xhtml 文件，然后将其中的 p 标签中的文本全部提取出来即可。

上面的程序输出如下

    图书在版编目（CIP）数据
    繁花／金宇澄著．－上海：上海文艺出版社． 2013．3 ISBN 978-7-5321-4800-4 Ⅰ．①繁…　Ⅱ．①金…　Ⅲ．①长篇小说－中国－当代 Ⅳ．①1247.5 中国版本图书馆CIP数据核字（2013）第034242号
    上海市重大文艺创作项目　由上海文化发展基金会资助



     
    出场人物
    
    一、1960年代初
    二、文革时期至1980年代初
    三、1990年代初
    上帝不响，像一切全由我定……
     
     
    独上阁楼，最好是夜里。《阿飞正传》结尾，梁朝伟骑马觅马，英雄暗老，电灯下面数钞票，数清一沓，拿出一副扑克牌，捻开细看，再摸出一副。接下来梳头，三七分头，对镜子梳齐，全身笔挺，骨子里疏慢，最后，关灯。否极泰来，这半分钟，是上海味道。
    如果不相信，头伸出老虎窗，啊夜，层层叠叠屋顶，“本滩”的哭腔，霓虹养眼，骨碌碌转光珠，软红十丈，万花如海。六十年代广播，是纶音玉诏，奉命维谨，澹雅胜繁华，之后再现“光市”的上海夜，风里一丝丝苏州河潮气，咸菜大汤黄鱼味道，氤氲四缭，听到音乐里反复一句女声，和你一起去巴黎呀一起去巴黎呀去巴黎呀。对面有了新房客了，窗口挂的小衣裳，眼生的，黑瓦片上面，几支白翅膀飘动。
    八十年代，上海人聪明，新开小饭店，挖地三尺，店面多一层，阁楼延伸。这个阶段，乍浦路黄河路等等，常见这类两层结构，进贤路也是一样，进店不便抬头，栏杆里几条玉腿，或丰子恺所谓“肉腿”高悬，听得见楼上讲张，加上通风不良的油镬气，男人觉得莺声燕语，吃酒就无心思。
    古罗马诗人有言，不亵则不能使人欢笑。
     
    引　　子
    沪生经过静安寺菜场，听见有人招呼，沪生一看，是陶陶，前女朋友梅瑞的邻居。沪生说，陶陶卖大闸蟹了。陶陶说，长远不见，进来吃杯茶。沪生说，我有事体。陶陶说，进来嘛，进来看风景。沪生勉强走进摊位。陶陶的老婆芳妹，低鬟一笑说，沪生坐，我出去一趟。两个人坐进躺椅，看芳妹的背影，婷婷离开。沪生说，身材越来越好了。陶陶不响。沪生说，老婆是人家的好，一点不错。陶陶说，我是烦。沪生说，风凉话少讲。陶陶说，一到夜里，芳妹就烦。沪生说，啥。陶陶说，天天要学习，一天不学问题多，两天不学走下坡，我的身体，一直是走下坡，真吃不消。沪生说，我手里有一桩案子，是老公每夜学习社论，老婆吃不消。陶陶说，女人真不一样，有种女人，冷清到可以看夜报，结绒线，过两分钟就讲，好了吧，快点呀。沪生说，这也太吓人了，少有少见。陶陶说，湖心亭主人的书，看过吧。沪生说，啥。陶陶说，上下本《春兰秋蕊》，清朝人写的。沪生说，不晓得。陶陶说，雨夜夜，云朝朝，小桃红每夜上上下下，我根本不相信，讨了老婆，相信了。沪生看看手表说，我走了。陶陶说，比如昨天夜里，好容易太平了，半夜弄醒，又来了。沪生不响。陶陶说，这种夫妻关系，我哪能办。沪生不响。陶陶说，我一直想离婚，帮我想办法。沪生说，做老公，就要让老婆。陶陶冷笑说，要我像沪生一样，白萍出国几年了，也不离婚。沪生讪讪看一眼手表，准备告辞。陶陶说，此地风景多好，外面亮，棚里暗，躺椅比较低，以逸待劳，我有依靠，笃定。沪生说，几点钟开秤。陶陶说，靠五点钟，我跟老阿姨，小阿姐，谈谈斤头，讲讲笑笑，等于轧朋友。陶陶翻开一本簿子，让沪生看，上面誊有不少女人名字，地址电话。陶陶掸一掸裤子说，香港朋友送的，做生意，行头要挺，要经常送蟹上门，懂我意思吧，送进房间，吃一杯茶，讲讲人生。沪生不响。
    此刻，斜对面有一个女子，低眉而来，三十多岁，施施然，轻摇莲步。陶陶低声说，看，
    ......

总字数约 35 万字，所以这里只截取小部分。