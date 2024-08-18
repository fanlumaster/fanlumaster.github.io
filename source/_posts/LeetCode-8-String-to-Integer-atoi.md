---
title: LeetCode 8 String to Integer (atoi)
date: 2021-07-12 18:38:53
tags:
- LeetCode
- Python
categories:
- LeetCode
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712184410.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210712184410.png
---

## 一、题目链接

<https://leetcode.com/problems/string-to-integer-atoi/>

## 二、解答

思路比较清晰，首先找到第一个不是空格的字符，然后判断是否是正负号，然后再判断是否是数字，然后逐个处理即可。这里要注意一下 Integer 的范围，超过范围就要按照题目给定的规则截断。

代码

```py
class Solution:
    def myAtoi(self, s: str) -> int:
        if len(s) == 0:
            return 0
        i = 0 # 索引
        ans = 0 # 结果
        pos_or_neg = 1 # 正还是负
        while i < len(s) and s[i] == ' ':
            i += 1 # 找到第一个非空格的字符
        if i == len(s):
            return 0
        # 确定正负
        if s[i] == '+':
            i += 1
        elif s[i] == '-':
            pos_or_neg = -1
            i += 1
        # 当前 i 索引位置上的字符必须是数字才能触发这个 while 循环
        while i < len(s) and s[i] >= '0' and s[i] <= '9':
            ans = ans * 10 + int(s[i])
            i += 1
            if ans > 2 ** 31 - 1:
                if pos_or_neg == 1:
                    return 2 ** 31 - 1
                else:
                    return -2 ** 31
        return ans * pos_or_neg
```

时间复杂度：`O(N)`。
空间复杂度：`O(1)`。

## 三、完整代码

```py
# -*- coding: utf-8 -*-
# @File  : leet_08.py
# @Author: FanLu
# @Date  : 2021/7/12

class Solution:
    def myAtoi(self, s: str) -> int:
        if len(s) == 0:
            return 0
        i = 0 # 索引
        ans = 0 # 结果
        pos_or_neg = 1 # 正还是负
        while i < len(s) and s[i] == ' ':
            i += 1 # 找到第一个非空格的字符
        if i == len(s):
            return 0
        # 确定正负
        if s[i] == '+':
            i += 1
        elif s[i] == '-':
            pos_or_neg = -1
            i += 1
        # 当前 i 索引位置上的字符必须是数字才能触发这个 while 循环
        while i < len(s) and s[i] >= '0' and s[i] <= '9':
            ans = ans * 10 + int(s[i])
            i += 1
            if ans > 2 ** 31 - 1:
                if pos_or_neg == 1:
                    return 2 ** 31 - 1
                else:
                    return -2 ** 31
        return ans * pos_or_neg

if __name__ == '__main__':
    solution = Solution()
    s = '   -42'
    s = '4193 with words'
    s = 'words and 987'
    ans = solution.myAtoi(s)
    print(ans)

```