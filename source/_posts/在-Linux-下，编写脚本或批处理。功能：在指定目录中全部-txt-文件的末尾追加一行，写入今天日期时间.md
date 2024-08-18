---
title: 在 Linux 下，编写脚本或批处理。功能：在指定目录中全部 txt 文件的末尾追加一行，写入今天日期时间
description: '一道操作系统实验题'
date: 2021-04-09 00:29:29
tags:
- Linux
- Shell
categories:
- Linux
index_img: https://i.imgur.com/6KuVlGY.png
banner_img: https://i.imgur.com/6KuVlGY.png
---

脚本如下

```sh
#!/bin/bash
filenames=$(ls "$1"*.txt)
echo "$1"
echo $filenames
for file in $filenames
do
        regular=$(tail -n 1 $1$file)
        if [[ "$regular" =~ [0-9]{4}-[0-9]{2}-[0-9]{2}* ]];then
                sed -i '$d' $1$file
                echo `date +"%Y-%m-%d %H:%M:%S"` >> $1$file
        else
                echo `date +"%Y-%m-%d %H:%M:%S"` >> $1$file
        fi
done
```