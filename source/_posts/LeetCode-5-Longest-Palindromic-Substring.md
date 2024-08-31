---
title: LeetCode 5 Longest Palindromic Substring
date: 2021-07-11 13:59:36
updated: 2023-11-02 22:51:58
tags:
- LeetCode
- Python
categories:
- LeetCode
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210711141030.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210711141030.png
---

## 一、题目链接

<https://leetcode.com/problems/longest-palindromic-substring/>

## 二、解答

这一题的思路很清晰，把回文看成中间部分是一个字符
- 如果中间只有一个不重复的字符，显然成立；
- 如果中间有很多重复的字符，比如 `abcccba` 中间有三个重复的字符 `c`，那么，把它们看作是一个字符 `c`。

然后在满足回文条件的情况下，分别向两边扩展。

整体的过程就是遍历原数组的每一个索引，并以该索引为 pivot，然后扩展，最后取整个流程中最长的回文子串即可。

代码如下

```py
class Solution:
    def longestPalindrome(self, s: str) -> str:
        def find_longest(s: str, low: int, range_list: List[int]) -> int:
            high = low
            while high < len(s) - 1 and s[high + 1] == s[low]:
                high += 1
            # 定位中间部分的最后一个字符
            ans = high
            # 从中间向左右两边扩散
            while low > 0 and high < len(s) - 1 and s[low - 1] == s[high + 1]:
                low -= 1
                high += 1
            if high - low > range_list[1] - range_list[0]:
                range_list[0] = low
                range_list[1] = high
            return ans
        if s == None and len(s) == 0:
            return ''
        # 保存起止位置
        range_list = [0] * 2
        for i in range(0, len(s)):
            i = find_longest(s, i, range_list)
            continue
        return s[range_list[0]:range_list[1] + 1]
```

时间复杂度：`$O(N^2)$`。
空间复杂度：`$O(1)$`。

### 三、完整代码

```py
# -*- coding: utf-8 -*-
# @File  : leet_05.py
# @Author: FanLu
# @Date  : 2021/7/11

from typing import List

class Solution:
    def longestPalindrome(self, s: str) -> str:
        def find_longest(s: str, low: int, range_list: List[int]) -> int:
            high = low
            while high < len(s) - 1 and s[high + 1] == s[low]:
                high += 1
            # 定位中间部分的最后一个字符
            ans = high
            # 从中间向左右两边扩散
            while low > 0 and high < len(s) - 1 and s[low - 1] == s[high + 1]:
                low -= 1
                high += 1
            if high - low > range_list[1] - range_list[0]:
                range_list[0] = low
                range_list[1] = high
            return ans
        if s == None and len(s) == 0:
            return ''
        # 保存起止位置
        range_list = [0] * 2
        for i in range(0, len(s)):
            i = find_longest(s, i, range_list)
            continue
        return s[range_list[0]:range_list[1] + 1]

if __name__ == '__main__':
    solution = Solution()
    s = 'abcdcbaa'
    ans = solution.longestPalindrome(s)
    print(ans)

```