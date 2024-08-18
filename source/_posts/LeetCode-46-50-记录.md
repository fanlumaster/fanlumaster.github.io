---
title: LeetCode 46-50 记录
date: 2022-03-05 11:59:18
tags:
- LeetCode
- 算法
- Python
categories:
- LeetCode
index_img: https://i.imgur.com/GJ0Yf2k.png
banner_img: https://i.imgur.com/GJ0Yf2k.png
description: '记录 LeetCode 46-50 的解题经过'
---

# 46

<https://leetcode-cn.com/problems/permutations/>

![](https://i.imgur.com/N43gvoL.png)

```py
from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        def permutation(nums):
            if len(nums) == 1:
                yield nums[0:1]
            else:
                for perm in permutation(nums[1:]):
                    for i in range(len(perm) + 1):
                        yield perm[:i] + nums[0:1] + perm[i:]
        return list(permutation(nums))


if __name__ == '__main__':
    s = Solution()
    print(s.permute([1, 2, 3]))

```

就是递归。想到了就是想到了。思路的话都好想，就是怎么转化成代码。