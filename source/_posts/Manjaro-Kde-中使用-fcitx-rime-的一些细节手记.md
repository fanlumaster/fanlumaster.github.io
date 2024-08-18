---
title: Manjaro Kde 中使用 fcitx-rime 的一些细节手记
date: 2023-05-02 23:34:41
tags:
- 输入法
- KDE
- Manjaro
categories:
index_img: https://i.imgur.com/ar1dcFY.png
banner_img: https://i.imgur.com/ar1dcFY.png
---

## 前言

对于如何去安装 fcitx-rime，这个我在这里不作赘述，虽然说，我当时装这个是出了点问题，但是呢，总归是使用那两个包管理器来安装好的，就用那个 pacman 和 yay 都尝试一下，如果直接安装 fcitx-rime 会有问题的话，那么，就再试一下带 git 后缀的，这个是直接把源码拉下来然后进行编译的。当然啦，也可能会出现网络的问题，这个就要科学上网啦。

还有，就是，在安装之前，我建议先执行一下 yay，即把整个系统先更新一下，否则可能有些包会不兼容的，而且，一些软件的包信息也不是最新的。

## 细节

首先，我使用的 rime 方案是这个仓库，

<https://github.com/functoreality/rime-flypy-zrmfast>

这是一个小鹤双拼加辅助码的方案。详细的信息可以在仓库的 readme 里面去查看，我这里主要是记录一下我对它作的一些微调。

### 微调一

输入法默认状态设置为英文。

小鹤双拼加辅助码的方案是在 `flypy_zrmfast.schema.yaml` 中进行配置。以下如无特殊说明也是在这个文件中进行配置。

这里我们把这个 reset 设置成 1 即可，

```yaml
switches:
  - name: ascii_mode
    reset: 1
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
  - name: simplification
    states: [ 漢字, 汉字 ]
  - name: ascii_punct
    states: [ 。，, ．， ]
```

![](https://i.imgur.com/UEuwxT5.png)

### 微调二

把中文调节成简体字。

这个方案默认的情况是繁体字，这个不需要我们改配置，我们使用快捷键 `Ctrl + \`` 进行修改方案即可，先选 1，再选 4，

![](https://i.imgur.com/Cgt4vMf.png)

![](https://i.imgur.com/HM6CujJ.png)


### 微调三

把候选框的 pageSize 改为 6。

```yaml
# 候选框得 pagesize 这个要在这个里面设置才可以
# 大概是这个文件在那个文件后面被引用，这个设置会覆盖掉那个 default 文件
menu:
  page_size: 6
```

### 微调四

把置顶的字词给注释掉，这个文件是 `custom_phrase.txt`，

```txt
## 置顶词与自定义词组在这个文件里指定
## 格式：文本-输入码-权重，其间用 Tab 符分隔。
## 如要添加新的，可以复制已有的行，然后在其基础上修改。
## 置顶字词
## 是	u	4
## 時	u	3
## 使	ui	2
## 試	ui	1
## 所	s	1
## 去	q	1
## 我	w	2
## 爲	w	1
## 有	y	2
## 又	y	1
## 哦	o	1
## 的	d	3
## 地	d	2
## 得	de	1
## 大	da	1
## 個	g	1
## 和	h	1
## 就	j	1
## 可	k	1
## 了	l	1
## 在	z	2
## 再	z	1
## 下	x	1
## 才	c	1
## 不	b	2
## 吧	b	1
## 把	ba	1
## 你	n	1
## 沒	m	1
## 這	v	2
## 只	v	1
## 涉及	uej	2
## 設計	uej	1
```

不然这个是很烦人的。

## 其它

放一张这个版本的辅助码的图片，

![](https://i.imgur.com/s2aZrMw.jpg)

