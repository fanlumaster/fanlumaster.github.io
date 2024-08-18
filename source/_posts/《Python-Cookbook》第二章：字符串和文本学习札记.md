---
title: 《Python Cookbook》第二章：字符串和文本学习札记
date: 2021-10-23 14:33:10
tags:
- Python
categories:
- Python
index_img: https://i.imgur.com/QZWattV.png
banner_img: https://i.imgur.com/QZWattV.png
---

首先要说一下 Python 的 r 前缀：

> Python 的 r 前缀表示原始字符串（raw string），就是字面意义上的字符串，`\` 这个符号并不表示转义。比如 `r'\n'` 表示的是一个反斜杠和一个字母 n。如果不加 `r` 即 `'\n'`，那么 `\` 就表示转义，`\n` 表示一个换行符。可以把 `r'\n'` 理解为 `'\\n'`。

然后，开始阅读。

# 1、使用多个界定符分割字符串

> 将一个字符串分割成多个字段，但是分隔符（还有周围的空格）并不是固定的。

```shell
>>> line = 'asdf fjdk; afed, fjek, asdf, foo'
>>> import re
>>> re.split(r'[;,\s]\s*', line)
['asdf', 'fjdk', 'afed', 'fjek', 'asdf', 'foo']
```

这段代码中的正则表达的含义是：分隔符可以是逗号、分号或者是空格，并且后面紧跟着任意个空格。

我们稍微改动一下，再测试一下：

```shell
>>> line = 'asdf fjdk;; afed;, fjek, asdf, foo'
>>> re.split(r'[;,\s]\s*', line)
['asdf', 'fjdk', '', 'afed', '', 'fjek', 'asdf', 'foo']
```

```shell
>>> line = 'asdf fjdk;; afed;, fjek, asdf, foo'
>>> re.split(r'[;,\s]+\s*', line)
['asdf', 'fjdk', 'afed', 'fjek', 'asdf', 'foo']
```

```shell
>>> re.split(r'[;,\s]*\s*', line)
['', 'a', 's', 'd', 'f', '', 'f', 'j', 'd', 'k', '', 'a', 'f', 'e', 'd', '', 'f', 'j', 'e', 'k', '', 'a', 's', 'd', 'f', '', 'f', 'o', 'o', '']
```

按：解释一下 `re.split(r'[;,\s]*\s*', line)` 中正则的含义：

"asdf fjdk" 从第一个 f 开始，先匹配一个空字符，然后匹配后面的空格符，这样就是两个分隔符，这两个分隔符中间会有一个空字符被加入到结果列表中；同理，"fjdk;; afde" 中间被正则匹配到的分隔符是一个空字符 '' 和 ";; "。

```shell
>>> line = 'asdf fjdk;; afed;, fjek, asdf, foo'
>>> fields = re.split(r'(;|,|\s)\s*', line)
>>> fields
['asdf', ' ', 'fjdk', ';', 'afed', ',', 'fjek', ',', 'asdf', ',', 'foo']
```

