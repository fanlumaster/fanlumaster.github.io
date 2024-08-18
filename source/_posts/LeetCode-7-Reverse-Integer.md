---
title: LeetCode 7 Reverse Integer
date: 2021-07-12 17:58:12
tags:
- LeetCode
- Python
categories:
- LeetCode
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712184357.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712184357.png
---

## 一、题目链接

<https://leetcode.com/problems/reverse-integer/>

## 二、解答

这是一道简单题，思路的确不难想，要注意的就是一点小的细节，题目中给了一个 Integer 的范围：`$[-2^{31}, 2^{31} - 1]$`，超过了这个范围，应当返回 0。

还有一个是 Python 的注意点，它的对负数的整除和取模和 C 语言中的是不一样的。举个例子，

- C 语言中，$-123 \ \% \ 10 = -3$；
- Python 中，$-123 \ \% \ 10 = 7$。

### 2.1 解法一

```py
class Solution:
    def reverse(self, x: int) -> int:
        ans = 0
        flag = 0 if x > 0 else 1
        x = abs(x)
        while x != 0:
            ans = ans * 10 + x % 10
            x = x // 10
        if flag:
            ans = -ans

        if x < -2 ** 31 or x > 2 ** 31 - 1 or ans < -2 ** 31 or ans > 2 ** 31 - 1:
            return 0
        return ans
```

时间复杂度：`$O(log(x))$`。
空间复杂度：`$O(1)$`。

### 2.2 解法二

```py
# 这个方法要快一点，有时候会快很多（看 LeetCode 心情）
class Solution2:
    def reverse(self, x: int) -> int:
        if x >= 2 ** 31 - 1 or x <= -2 ** 31:
            return 0
        else:
            strg = str(x)
            if x >= 0:
                ans = strg[::-1]
            else:
                temp = strg[1:]
                temp2 = temp[::-1]
                ans = "-" + temp2
            if int(ans) >= 2 ** 31 - 1 or int(ans) <= -2 ** 31:
                return 0
            else:
                return int(ans)
```

让我没想到的是，这个利用了字符串的方法竟然会比我直接计算来得要快，不过想想，逆转字符串的操作代价是很小的，所以也就在情理之中了。

时间复杂度：`$O(1)$`。大概。因为不知道反转字符串所需要的时间。
空间复杂度：`$O(1)$`。

## 三、完整代码

```py
# -*- coding: utf-8 -*-
# @File  : leet_07.py
# @Author: FanLu
# @Date  : 2021/7/12

class Solution:
    def reverse(self, x: int) -> int:
        ans = 0
        flag = 0 if x > 0 else 1
        x = abs(x)
        while x != 0:
            ans = ans * 10 + x % 10
            x = x // 10
        if flag:
            ans = -ans

        if x < -2 ** 31 or x > 2 ** 31 - 1 or ans < -2 ** 31 or ans > 2 ** 31 - 1:
            return 0
        return ans

# 这个方法要快一点，有时候会快很多（看 LeetCode 心情）
class Solution2:
    def reverse(self, x: int) -> int:
        if x >= 2 ** 31 - 1 or x <= -2 ** 31:
            return 0
        else:
            strg = str(x)
            if x >= 0:
                ans = strg[::-1]
            else:
                temp = strg[1:]
                temp2 = temp[::-1]
                ans = "-" + temp2
            if int(ans) >= 2 ** 31 - 1 or int(ans) <= -2 ** 31:
                return 0
            else:
                return int(ans)


if __name__ == '__main__':
    solution = Solution()
    x = 1534236469
    ans = solution.reverse(x)
    print(ans)
    print(-123 % 10)

```