---
title: 早晨从午夜开始
date: 2025-03-01 01:11:38
tags:
  - 生活
  - 读书
  - 随笔
categories:
index_img: https://i.postimg.cc/L6jdH5hZ/image.png
banner_img: https://i.postimg.cc/L6jdH5hZ/image.png
---

作息再次回转，转回了北美的时钟。所以，现在一睁眼就差不多是八九点了。当然，还要在床上/地上起身看会儿书。这全因我把床给搬到地上了。搬到了书房。这要归功于小区最近的下水道整改，非常吵，书房是我最安静的一个空间，也就搬回来了。由于不想再用折叠床，就买了一块大油布打底，然后放上无印良品的乳胶垫，再铺一层家里自己打的棉花被，最后覆一层绒绒的薄毯子，睡眠环境就布置好了。这番折腾下来，发现很适合看书，毕竟是书房，太安静了，在晚上尤其如此，而且，离我的两只真力咫尺之遥，就把王菲开着，然后捧着 iPad 看上两个小时，肚子饿了之后，起床水浴加热牛奶，吃点饼干，这之后就可以掀开键盘的防尘罩了。

![](https://i.postimg.cc/XvpQY1xD/IMG-20250228-235404.jpg)

![](https://i.postimg.cc/rp3g0GPy/IMG-20250228-235351.jpg)

最近看的几本书，也有一点新的感想。首先是 Pro JS 这本书，以前也看过其他的，这本书捡起来是因为这两天还在处理开发环境周边的问题，即，自己动手写一个 Youtube Music 的插件，在 GitHub 上发现已经有一个比较成熟的插件了，美中不足是对王菲的支持太差，所以，只好参考它这个蓝本，然后到 Youtube 上找了一个 ts 写插件的入门视频，之后就开始动手了，目前的话，硬编码的王菲的藉口已经可以勉强使用了，界面当然是丑丑的，没办法，初版嘛，css 和动画什么的，后面慢慢加。正因如此，不得不再看这本书。以前看的一些其他的 js 的书，这本书多多少少也翻过，只是以前理解得很浅，有些东西甚至理解不了，原因也很简单，当时储备的只是太少了，知识的广度远远不够，举个例子，Symbol 这种东西，在 Python 中不就是类似魔术方法嘛，还有 with 这个 scope 相关的语法，在 Python 也有很好的映射，还有一些其他的 C++ 中也有的相关的联系，再就是类型系统相关的，这个倒也发现另外一本书，这个也是在微信读书上看，叫，类型与编程系统，是以 ts 为范本，c++ 也大差不差，什么静态类型啦，自动推断了，等等。还有 async 这个东西，也就是多线程相关的东西，这个我以前接触不多，现在也接触不多，类似什么多进程、多线程、协程这些东西，我一直理解不多，以前在读 js 这本书的时候，更是挠头半天，不知道内在究竟是干了什么东西，现在是好多了，即使依然不是很熟悉，好在知道的周边的东西变多了，触类旁通还是做得到的，现在再看异步这些东西，以前第一次看 async, await 这些东西完全不止所云，现在思索个一两分钟就很容易转过弯来。还有什么迭代器、生成器这些东西，其他语言里面的经验很有用，语言的设计有很多共同之处，而且，毕竟都是 c 家族的嘛。Python 里面有元编程，松本行弘在代码的未来中也提过，Python 最初看到是在 fluent python 中，当时很不理解，直到去年有一次在做饭的时候，听南大的 why 讲 c 语言，提了一嘴宏定义和元编程，恍然大悟，答案就在问题中嘛，而且，大家都提了很多次了，所谓元编程，就是使用编程去实现编程，什么意思？简单的一种想象就是，利用一种编程语言去实现另一种编程语言，我认为大概是可以这么理解的，总之就是去更加 flexible 地扩展一门编程语言。你想，原生的 c 语言在大多数的编程 noob 眼中是多么孱弱和受限呀，我们再来看看 cpython 呢？例子其实举得不太合适，大家理解就好。

然后是 C++ 相关的书，也是前几天，打算做一个 Python 教程来着，想着要照顾大多数的普通人，就打算在 Windows 上录制，就写了一个按键映射在屏幕上的程序。想着以后肯定是要不断迭代的，再就是，一些杂事处理完之后，肯定是要回归到主线的，主线当然还是极度以来 cpp，所以就找找 c++ 多线程方面的书，也是因为前几天给本科的室友 mock interview，发现自己也很需要加强基础的夯实，就找到了 c++ 并发编程实战这本书，另一本黑山的一个作者写的好像不太行。总之，基础必须狠狠加强。同学问的另外一个关于虚继承、虚指针、虚表的问题，在探索这个问题的时候，发现网上的材料其实挺少的。好在最后总算是找到了可以讲清这个问题的一些材料。过程中，发现最初的讲清这个问题的一个 doctor 似乎已经 pass away 了，生命实在短暂。阿门。

不需要虚拟机去执行指令的编程语言，比如 c++ 这种，来到汇编这个层面的话，很多语法、语法糖，还有一些特性，比如，多线程啦这种，就不难理解了。作为一个程序员，汇编应该归为必要的职业素养，嗯，程序员的自我修养。我在论坛中回复别人，编程没有捷径，看似愚蠢的付出也是有迹可循，可以派上用场的，正如，灵山没有捷径。不过，抵达灵山并不困难，积累到了之后，往往不经意间的一个契机就可以拨开过往的云雾。

在研究 Ctrl D 这个 unix 系统中的 EOF 模拟的时候，也发现一本书，叫 unix 环境高级编程，老经典了，捡起来。大部分的本科生、研究生读完之后，系统的 io 是如何运转的，很可能都是一概不知，也有可能用得也不顺畅。想要获得的东西是不同的，正如真正的游戏玩家其实很少，这需要一定的纯粹，外在的阻碍并不一定是当事人的精神境界，外在的物质条件也是一个必要的考量点，所以，不少人在玩游戏的过程中，玩着玩着就不快乐了。快乐常在并不复杂，这个时候，想到抵达那份纯粹，又回过头来，需要和思想思考挂钩了。

VSCode 权威指南，我没想到这踏马也能出一本书，翻开看看，哦，作者名的拼音有点熟悉呀，Jun Han，哦，原来是很多插件的作者，再继续翻，哦，还能了解到一些微软和 VSCode 的相关周边，比如，VSCode 的首席架构师原来是设计模式的四人帮之一，好，再翻开设计模式，前言里面讲，在写书的时候，作者也并没有对设计模式理解得很好，写的过程中，写完后，理解得越来越透彻，这倒像是一则禅偈，映射到我们写软件的过程中，也天然契合。

白天的时候去街上逛游，恰逢落雨，周边过来摆摊的农民、渔民纷纷收摊，路上的男女老少很丑，饱经风霜，粗粝面孔，孩子也似营养不是很好，父母的血统不是很好，似乎是把父母的营养不良的缺点也给继承过去了，农村的老妪脸上沟壑纵横，有点钱但是不多，不过愿意花一点在脸上的，恰如家乡的比喻，驴屎蛋下霜，更令人作呕。人人忙碌。联想到昨晚的流量顶峰，隔壁地方仙桃的雷军是何等地意气风发，一部车造得是何等地好呀，配件、配料用得是何等地优秀啊，卖价是何等地亲民呀，只要五十来万呀。

前段时间我也听到家里人说，我隐居的这边到浙江温州那边机械厂子打工的农民、没有学历的中青年，他们认为五千块钱的工资是不错的了，珍惜呀，互相抢夺呀，为了一丁点的利益，恨不得咬别人一口呀。拼死拼活，你就是涨到六千块，不吃不喝多少年可以买得起雷军的亲民车？

广华街道的店铺在刚过年这会儿似乎有了点新意，不像平时那般风尘仆仆。视线从一楼的商铺向上移，生锈的防盗窗铁栏杆，褪色了不知多少年的建筑外皮，视线再往远处移，路边的废弃建筑一栋一栋。

互联网上的三十岁、四十岁科技少女们似乎依然很美。

美得令人实在呕吐。
