---
title: ThinkPad X13 AMD Gen1 安装 Ubuntu20.04 之后 F4 键的 LED 灯一直常亮的问题
date: 2021-05-07 23:27:29
tags:
- Linux
- Ubuntu20
- ThinkPad
categories:
- Linux
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222637.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222637.png
---

这个问题无法通过设置 BIOS 来解决，目测是 ThinkPad 的适配工作没有做好，目前可以做的是，手动关闭这个灯

```bash
$ echo 0 | sudo tee /sys/class/leds/platform\:\:micmute/brightness
```

开启的命令则是：

```bash
$ echo 1 | sudo tee /sys/class/leds/platform\:\:micmute/brightness
```

参考：[askubuntu](https://askubuntu.com/questions/1291918/ubuntu-20-10-on-thinkpad-t14-amd-microphone-mute-led-always-stays-on-how-can#new-answer?newreg=fcf137424b8b41a495efbe900da6c722)