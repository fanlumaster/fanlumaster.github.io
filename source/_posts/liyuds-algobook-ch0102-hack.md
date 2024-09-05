---
title: 李煜东算法竞赛进阶指南CH0102方法二-hack
date: 2023-08-13 15:12:30
updated: 2023-12-28 22:05:09
tags:
- 算法
- 读书笔记
categories:
index_img: https://i.imgur.com/NdhPz5E.png
banner_img: https://i.imgur.com/NdhPz5E.png
---

所谓的 hack，就是找到用例，使其代码不通过。

先讲一下这道题的缘由。之前忘了什么时候翻开过这本算法竞赛进阶指南，然后看到这里卡住了。然后，现在重新来思考这道题的方法二。书里面给的描述如下，

![](https://i.imgur.com/2cN9jpq.png)

![](https://i.imgur.com/s0darJy.png)

然后，我就对照着理解，以前无法对其进行彻底的分析，现在随着知识面扩宽了，所以，对一些细节的东西就可以去分析了，在这里就体现为对数据类型的具体的范围会更加地清晰。比如，这里的说的 long double 在十进制下的有效数字有 18~19 位，实际上，在微软的 msvc 编译器这样一种实现中，它只有 15~16 位，之所以会有 15~16 位，是因为精度不足的时候会进行舍和入，具体的舍和入的规则需要去看 IEEE754 文档和各个平台的编译器的具体实现，而如果刚好需要舍去的那一位是 0，那么，就不影响实际的精度。这个可以看下微软的[文档](https://learn.microsoft.com/en-us/cpp/cpp/data-type-ranges?view=msvc-170)，

![](https://i.imgur.com/kudK6PK.png)

然后，经过实际的测试，发现 gcc13 编译器实现的 long double 的有效数字位是 18~19 位。

对于作者自己在 github [仓库](https://github.com/lydrainbowcat/tedukuri/blob/master/%E9%85%8D%E5%A5%97%E5%85%89%E7%9B%98/%E4%BE%8B%E9%A2%98/0x00%20%E5%9F%BA%E6%9C%AC%E7%AE%97%E6%B3%95/0x01%20%E4%BD%8D%E8%BF%90%E7%AE%97/64%E4%BD%8D%E6%95%B4%E6%95%B0%E4%B9%98%E6%B3%95/CH0102%2064%E4%BD%8D%E6%95%B4%E6%95%B0%E4%B9%98%E6%B3%95%20%E6%96%B9%E6%B3%95%E4%BA%8C.cpp)里面放置的几个测试用例，我运行了一下，并且使用 Python 验证了一下，发现都是正确的。

![](https://i.imgur.com/LJw5cnw.png)

按：这里为什么使用 Python 来验证呢？是因为 Python 默认就是支持大整数运算的，不存在什么位数限制的问题。这个我想接触过 Python 的同志都是知道的。

然后呢，我就在默认他这个算法是正确的前提下，尝试去理解它的细节上的原理，其实说来说去就是在浮点数的舍入过程中出了问题，下面是我在思考的过程中打的草稿，

![](https://i.imgur.com/iyT1s3p.jpg)

![](https://i.imgur.com/yr1OIi5.jpg)

核心的要义在于，long double(msvc 编译器) 在舍入的时候会产生 $1 \sim 5 \times 10^{17}$ 的误差，这个误差当然是会影响最终的结果的，如果发现没有影响到最终的结果，那也只是凑巧。

接下来，就来测试一下我们的使其不通过的数据，

```
a = 8765432112345678
b = 8765432112953417
p = 87654321123456788
```

这个数据下，$a \times b \; \% \; p$ 的正确结果是 $54345679096057018$，而运行作者给出的程序给出的结果是 $15009041312430882$。显然相异。

测试代码如下，

```cpp
#define _CRT_SECURE_NO_WARNINGS
/*
    计算 a * b % p
*/
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
long long a, b, p;

typedef unsigned long long ull;
ull mul(ull a, ull b, ull p) {
    a %= p, b %= p;  // 当a,b一定在0~p之间时，此行不必要
    ull c = (long double)a * b / p;
    ull x = a * b, y = c * p;
    long long ans = (long long)(x % p) - (long long)(y % p);
    if (ans < 0) ans += p;
    return ans;
}

int main() {
    /*
        a: 8765432112345678
        b: 8765432112953417
        p: 87654321123456788
    */
    // freopen("./liyuds_cases/mul4.in", "r", stdin);
    a = 8765432112345678;
    b = 8765432112953417;
    p = 87654321123456788;
    // cin >> a >> b >> p;
    cout << mul(a, b, p) << endl;  // correct answer is 54345679096057018, while here output is 15009041312430882
}
```

说明一下，这个代码是经过作者自己修改的，我取的是目前的 github 上的最新版，早期的书上的原版的代码，其不通过的用例更好找。

这里再简单讲下我是怎么去找错误用例的，其实就是通过下面的程序去发现，

```cpp
#include <algorithm>
#include <bitset>
#include <cstdio>
#include <cstring>
#include <iomanip>
#include <iostream>
#include <limits>

#define ll long long


typedef unsigned long long ull;

using namespace std;

long long a, b, p;

ull mul(ull a, ull b, ull p) {
    a %= p, b %= p;  // 当a,b一定在0~p之间时，此行不必要
    ull c = (long double)a * b / p;
    ull x = a * b;
    ull y = c * p;
    long long ans = (long long)(x % p) - (long long)(y % p);
    if (ans < 0) ans += p;
    return ans;
}

ll mul_v2(ll a, ll b, ll p) {
    ll ans = 0;
    while (b) {
        if (b & 1) ans = (ans + a) % p;
        a = a * 2 % p;
        b >>= 1;
    }
    return ans;
}

int main() {
    ll p = (ll)87654321123456788;
    for (ll a = 8765432112345678; a < 87654321123456788; a++) {
        for (ll b = 8765432112345678; b < 87654321123456788; b++) {
            if (mul_v2(a, b, p) != mul(a, b, p)) {
                cout << "a => " << a << ", b => " << b << endl;
                cout << mul_v2(a, b, p) << ", " << mul(a, b, p) << endl;
            }
        }
    }
}
```

这里我一开始还打算遍历所有的测试用例，直接来一个三层循环，每一层是 $10^{18}$，写完发现似乎花费的时间过于多了。还是想一下技巧吧，就把范围限制在了上面的程序中的这个区间，这个程序也不需要等它全部运行完，只要有我们想要的结果跑出来就可以了。

说一下我对这本书的感受吧。最近几天也在带着看刘汝佳的那本紫书，那一本书给的示例代码可能稍微好一点，毕竟都是 uva 的题目嘛，其质量和测试用例都可以得到保证，尤其是有一个 udebug 的网站，所以，其代码理解起来就稍微轻松一点。我当初看李煜东的这本书的时候就在这里被卡住了，那时我似乎隐约找出了当初那个版本的不通过的测试用例，但那时并没有很多的信心。就没有继续往下看了。啊对，那时我对补码的理解依旧是不完善，所以，读这个第一章就很磕磕绊绊。如果有喜欢钻牛角尖的同志，大概可以理解我的想法。现在，可以说是对[补码](https://fanyfull.notion.site/4accf9bc959546e6bad571fb8c8d45a7)这些基础概念理解得比较透彻了，还有什么 IEEE754 也都可以理解得很清楚了。

不过，也回头感慨一句，时光荏苒。

