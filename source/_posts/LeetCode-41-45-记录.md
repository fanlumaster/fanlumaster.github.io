---
title: LeetCode 41-45 记录
date: 2022-03-02 09:18:02
tags:
- LeetCode
- 算法
- Python
categories:
- LeetCode
index_img: https://i.imgur.com/cRo4kRn.png
banner_img: https://i.imgur.com/cRo4kRn.png
description: '记录 LeetCode 41-45 的解题经过'
---

# 41

<https://leetcode-cn.com/problems/first-missing-positive/>

![](https://i.imgur.com/GTw85J6.png)

```py
from typing import List


class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        if not nums:
            return 1

        for i in range(len(nums)):
            if nums[i] <= 0:
                nums[i] = len(nums) + 1

        for i in range(len(nums)):
            num = abs(nums[i])
            if num > 0 and num <= len(nums):
                nums[num - 1] = -abs(nums[num - 1])

        for i in range(len(nums)):
            if nums[i] > 0:
                return i + 1

        return len(nums) + 1


if __name__ == '__main__':
    s = Solution()
    print(s.firstMissingPositive([1, 2, 0]))
    print(s.firstMissingPositive([3, 4, -1, 1]))
    print(s.firstMissingPositive([7, 8, 9, 11, 12]))
    print(s.firstMissingPositive([1, 2, 0]))
    print(s.firstMissingPositive([1, 2, 3]))
    print(s.firstMissingPositive([1, 2, 3, 4]))
    print(s.firstMissingPositive([1, 2, 3, 4, 5]))

```

这道题的主要思路是对数字进行标记。专业一点的说法，是哈希表。因此，最后的时间复杂度为 $O(N)$，空间复杂度为 $O(1)$。

要注意在第二趟标记的时候，后面的数在被访问到之前可能会被修改为负数，因此，我们要加一点处理，即：

```py
for i in range(len(nums)):
    num = abs(nums[i])
    if num > 0 and num <= len(nums):
        nums[num - 1] = -abs(nums[num - 1])
```

# 42

<https://leetcode-cn.com/problems/trapping-rain-water/>

![](https://i.imgur.com/Dm8hrdS.png)

```py
from typing import List


class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0
        n = len(height)
        left = [0] * n
        right = [0] * n
        left[0] = height[0]
        right[n-1] = height[n-1]
        for i in range(1, n):
            left[i] = max(left[i-1], height[i])
        for i in range(n-2, -1, -1):
            right[i] = max(right[i+1], height[i])
        res = 0
        for i in range(n):
            res += min(left[i], right[i]) - height[i]
        return res


if __name__ == '__main__':
    s = Solution()
    print(s.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))

```

主要是理解这张图：

![](https://i.imgur.com/kOEIqcC.png)

以中间的最高的柱子为基准，然后左右开弓。结合代码和图形，解题是不算太难的。

# 43

