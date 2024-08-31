---
title: 计算机网络实验一 wireshark 抓包工具的使用
date: 2022-05-28 21:27:28
updated: 2022-06-20 22:35:54
tags:
- 计网
categories:
index_img: https://i.imgur.com/mNNSA1J.png
banner_img: https://i.imgur.com/mNNSA1J.png
---

# 实验一 wireshark 抓包工具使用

- 班级：软工 1902 班
- 姓名：
- 学号：

## 一、实验目的

- 学习wireshark抓包工具的使用
- 了解wireshark抓包工具的功能，明确抓包软件的功能。
- 通过学习，进一步理解协议及网络体系结构思想

## 二、实验原理

Wireshark 是网络包分析工具。网络包分析工具的主要作用是尝试捕获网络包，并尝试显示包的尽可能详细的情况。

主要应用：

- 网络管理员用来解决网络问题
- 网络安全工程师用来检测安全隐患
- 开发人员用来测试协议执行情况
- 用来学习网络协议

## 三、实验内容

下载 WIRESHARK，学习工具的使用和功能。

## 四、实验过程

### 1、wireshark 的下载、安装与配置

访问 wireshark 官网：<https://www.wireshark.org/>

![](https://i.imgur.com/ve6TkUX.png)

下载并安装 Windows Installer (64-bit) 版本。

### 2、初识 wireshark

Wireshark 的工作原理是捕获某一网卡的数据包，当配置多块网卡时，需要选择一块网卡进行抓包，此处选择 WLAN，然后双击即可。

![](https://i.imgur.com/LvgXfbw.png)

![](https://i.imgur.com/u2k1vbm.png)

### 3、查看网络环境

控制面板-网络和Internet-网络和共享中心-更改适配器设置-WLAN-状态-详细信息，得到了以下关键信息：

|   名称    |     地址      |
| :-------: | :-----------: |
| IPv4 地址 | 10.19.128.57  |
| 子网掩码  | 255.255.248.0 |
| 默认网关  | 10.19.135.254 |

![](https://i.imgur.com/A412zBu.png)

### 4、启动抓包

截图显示的是 wireshark 抓到的部分数据包，有 TCP、UDP、ARP、MDNS、ICMPv6 等多种协议的数据包。

![](https://i.imgur.com/u2k1vbm.png)

|             名称              |  对应层次  |
| :---------------------------: | :--------: |
|             Frame             |   物理层   |
|          Ethernet Ⅱ           | 数据链路层 |
|  Internet Protocol Version 4  |   网络层   |
| Transmission Control Protocol |   传输层   |
|  Hypertext Transfer Protocol  |   应用层   |

### 5、追踪打开一个网页时，TCP 的三次握手

以访问百度为例，首先，打开浏览器的一个无痕窗口，并确保电脑上的代理处于关闭状态，然后过滤出 DNS 我们可以发现解析百度的包，找到解析后的真实 ip，

![](https://i.imgur.com/5AnWH28.png)

然后设置过滤规则：

```
ip.src == 182.61.200.7 or ip.dst == 182.61.200.7
```

将过滤出来的包按时间排序，开头的三个包是TCP 的三次握手，

![](https://i.imgur.com/kzNoE38.png)

- 第一次握手：客户机(10.19.128.57)主动打开一条TCP连接，从客户机(10.19.128.57)发送报文段至服务器(182.61.200.7)：SYN=1，Seq=0，不携带数据，等待服务器确认。
- 第二次握手：服务器(182.61.200.7)返回确认报文至客户机(10.0.0.108)：SYN=1，ACK=1，Seq=0，不携带数据。
- 第三次握手：从客户机(10.19.128.57)发送报文段至服务器(182.61.200.7)：ACK=1，Seq=1，不携带数据，TCP连接正式建立。

下图为第二次握手的报文段的详细分析：

![](https://i.imgur.com/B7JxqjE.png)