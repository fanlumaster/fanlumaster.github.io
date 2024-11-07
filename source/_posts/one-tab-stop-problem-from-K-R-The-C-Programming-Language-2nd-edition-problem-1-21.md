---
title: 一个 tab stop 的问题(来自 K and R The C Programming Language 2nd edition 习题 1-21)
date: 2024-11-08 05:20:24
tags:
- 思维的乐趣
- C
- 计算机常识
categories:
index_img: https://i.postimg.cc/xCzjyRqJ/image.png
banner_img: https://i.postimg.cc/xCzjyRqJ/image.png
---

这是一道看似简单的 C 练习题。涉及到的编程技巧不难，难的是如何“理解”题目，更准确地说，是如何理解 tab stop 和习题解答的某一个有趣的点。而一旦你想通了这一点，就不难体会到思维的乐趣[^1]。

原题录之如下，

> 练习 1-21 编写程序 entab，将空格串替换为最少数量的制表符和空格，但要保持单词之间的间隔不变。假设制表符终止位的位置与练习 1-20 的 detab 程序的情况相同。当使用一个制表符或者一个空格都可以到达下一个制表符终止位时，选用哪一种替换字符比较好？

习题解答上讲，最后的问题应该是选用 `\t` 比较好。这个问题值得思考。

先来讲如何思考。

首先，要理解什么是制表符，什么又是制表位。制表符好理解，就是一个 `\t` 字符嘛，那么，制表位呢？英文名字叫作 tab stop，我们去搜索百科、网页，无论是中文还是英文，大家都讲不好，而且，搜索结果容易被 word 文本编辑器给污染。那么，该怎么办？答案是，借助 VSCode 来进行理解。我们在 VSCode 中把 tabSize 设置成 8 这个经典的 size，然后，我们每按下一次 tab，那么，就相当于是让光标来到了下一个制表位，那么，这样以来，多按几次，就可以理解了。

然后是选用 `\t` 的问题。看代码，

```cpp
#include <stdio.h>

#define TABINC 8 /* tab increment size */

/* replace strings of blanks with tabs and blanks */
int main() {
    int c, nb, nt, pos;

    nb = 0; /* number of blanks necessary */
    nt = 0; /* number of tabs necessary */
    for (pos = 1; (c = getchar()) != EOF; ++pos)
        if (c == ' ') {
            if (pos % TABINC != 0)
                ++nb; /* increment number of blanks */
            else {
                nb = 0; /* reset number of blanks */
                ++nt;   /* one more tab */
            }
        } else {
            for (; nt > 0; --nt)
                putchar('\t'); /* output tab(s) */
            if (c == '\t')     /* forget the blank(s) */
                nb = 0;
            else /* output blank(s) */
                for (; nb > 0; --nb)
                    putchar(' ');
            putchar(c);
            if (c == '\n')
                pos = 0;
            else if (c == '\t')
                pos = pos + (TABINC - (pos - 1) % TABINC) - 1;
        }

    return 0;
}
```

关键在于这里，

```cpp
if (c == '\t')     /* forget the blank(s) */
    nb = 0;
```

对，如果我们不偏向于 `\t`，我们只需要想一个特殊的例子即可，比如，这个空格后面立马接了一个 `\t`，那么，前面的那一个空格会被吞掉！这就是问题的关键。因此，我们只好偏向于 `\t`。当然，这里的这个选择也是基于上面的这个处理逻辑的代码来给出的，如果你有别的思路对应的代码，可能答案会有不同，不过，我是没有时间继续去想别的方案了，那么，这次理解到了这里，就到此为止吧。

<div style="display: flex; justify-content: space-around;">
    <img src="https://i.postimg.cc/D01ZFgTk/IMG-20241108-055032-2.jpg" alt="" width=300 />
</div>

----------

[^1]: 此议题只有王小波一人得其真味，其余皆犬吠。


