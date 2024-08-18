---
title: LeetCode 9 and 10
date: 2021-07-13 22:17:48
tags:
- LeetCode
- Python
- 未竟
categories:
- LeetCode
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713231433.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210713231433.png
---

## 一、LeetCode 9 Palindrome Number

### 1.1 题目链接

<https://leetcode.com/problems/palindrome-number/>

### 1.2 解答

此题比较简单，直接放代码

```py
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        ans = str(x)
        ans_reverse = ans[::-1]
        if ans_reverse == ans:
            return True
        return False
```

### 1.3 完整代码

```py
# -*- coding: utf-8 -*-
# @File  : leet_09.py
# @Author: FanLu
# @Date  : 2021/7/13

class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        ans = str(x)
        ans_reverse = ans[::-1]
        if ans_reverse == ans:
            return True
        return False

if __name__ == '__main__':
    solution = Solution()
    input = 121
    input = -121
    output = solution.isPalindrome(input)
    print(output)

```

## 二、LeetCode 10 Regular Expression Matching

### 2.1 题目链接

<https://leetcode.com/problems/regular-expression-matching/>

### 2.2 解答

#### 2.2.1 解法一

这是一道困难题，怎么说呢，需要悟，这个递归是需要想的。

```py
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        def is_match(s: str, p: str) -> bool:
            if p == '':
                return s == ''

            # 判断 s 和 p 的首字母是否匹配，注意要先判断 s 不为空
            head_matched = not (s == '') and (s[0] == p[0] or p[0] == '.')
            if len(p) >= 2 and p[1] == '*':
                return is_match(s, p[2:]) or (head_matched and is_match(s[1:], p))
            elif head_matched:
                return is_match(s[1:], p[1:])
            else:
                return False

        return is_match(s, p)
```

时间复杂度：

- 这里只给出关系式，因为计算最后的结果有点复杂，对于目前阶段的我没有什么意义。
- 关系式为：`$T(M, N) = T(M, N - 2) + T(M - 1, N)$`（这个式子有点问题，先按下不表）。
- 最坏的情况可能是 p 的形式为 `".*.*.*.*..."`。

空间复杂度：有点复杂，按下不表。

#### 2.2.2 解法二

使用动态规划（待完善）。

### 2.3 完整代码

```py
# -*- coding: utf-8 -*-
# @File  : leet_10.py
# @Author: FanLu
# @Date  : 2021/7/13

class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        def is_match(s: str, p: str) -> bool:
            if p == '':
                return s == ''

            # 判断 s 和 p 的首字母是否匹配，注意要先判断 s 不为空
            head_matched = not (s == '') and (s[0] == p[0] or p[0] == '.')
            if len(p) >= 2 and p[1] == '*':
                return is_match(s, p[2:]) or (head_matched and is_match(s[1:], p))
            elif head_matched:
                return is_match(s[1:], p[1:])
            else:
                return False

        return is_match(s, p)

if __name__ == '__main__':
    solution = Solution()
    s = 'a'
    p = '.*'
    output = solution.isMatch(s, p)
    print(output)

```

### 2.3 完整代码

解法一完整代码

```py
# -*- coding: utf-8 -*-
# @File  : leet_10.py
# @Author: FanLu
# @Date  : 2021/7/13

class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        def is_match(s: str, p: str) -> bool:
            if p == '':
                return s == ''

            # 判断 s 和 p 的首字母是否匹配，注意要先判断 s 不为空
            head_matched = not (s == '') and (s[0] == p[0] or p[0] == '.')
            if len(p) >= 2 and p[1] == '*':
                return is_match(s, p[2:]) or (head_matched and is_match(s[1:], p))
            elif head_matched:
                return is_match(s[1:], p[1:])
            else:
                return False

        return is_match(s, p)

if __name__ == '__main__':
    solution = Solution()
    s = 'a'
    p = '.*'
    output = solution.isMatch(s, p)
    print(output)

```