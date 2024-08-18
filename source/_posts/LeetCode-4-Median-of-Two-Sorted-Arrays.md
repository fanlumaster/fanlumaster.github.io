---
title: LeetCode 4 Median of Two Sorted Arrays
date: 2021-07-11 11:35:37
tags:
- LeetCode
- Python
categories:
- LeetCode
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210708172848.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210708172848.png
---

## 一、题目链接

<https://leetcode.com/problems/median-of-two-sorted-arrays/>

## 二、解答

由于这题要求时间复杂度为 `$O(log(m + n))$`，所以，根据经验，这题就用对半查找来解决。

```py
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # 寻找两个数组中的第 k 个元素
        def find_kth(nums1:List[int], i:int, nums2:List[int], j:int, k:int):
            if i >= len(nums1): # 这里更严格的写法是 i == len(nums1)，因为在此递归的父递归中，有 i - 1 + k // 2 < len(nums1) 的约束，下同
                return nums2[j + k - 1]
            if j >= len(nums2):
                return nums1[i + k - 1]
            if k == 1:
                return min(nums1[i], nums2[j])
            mid_val1 = nums1[i - 1 + k // 2] if i - 1 + k // 2 < len(nums1) else float('inf') # ①
            mid_val2 = nums2[j - 1 + k // 2] if j - 1 + k // 2 < len(nums2) else float('inf')
            if mid_val1 < mid_val2:
                return find_kth(nums1, i + k // 2, nums2, j, k - k // 2) # ②
            else:
                return find_kth(nums1, i, nums2, j + k // 2, k - k // 2)

        m = len(nums1)
        n = len(nums2)
        left = (m + n + 1) // 2 # ③
        right = (m + n + 2) // 2
        return (find_kth(nums1, 0, nums2, 0, left) + find_kth(nums1, 0, nums2, 0, right)) / 2
```

① 这里注意 `nums1[i - 1 + k // 2]` 的写法，我们先将 i 退一格，然后再向后加上 `k // 2` 个位置，这样看比较清晰。
② 这里的 `i + k // 2` 也很有讲究，这个写法保证了递归的合理性。
③ 这里要分两种情况，
- 第一种，m + n 为奇数，那么，left 和 right 是相等的，都等于正中间那个索引（这里索引从 1 开始）；
- 第二种，m + n 为偶数，那么，right = left + 1，left 和 right 正好是中间的两个数的索引。

这题的核心思想是利用 find_kth() 函数，即寻找出两个有序数组合并之后的正序数组中第 k 个元素（k 从 1 开始）。然后，关于 find_kth() 函数，其实现利用了递归和折半查找的思想。每一次递归都排除掉 `k // 2` 个元素，然后，递归下去。

时间复杂度：`$O(log(m + n))$`。
空间复杂度：`$O(log(m + n))$`，这个结果可由计算递归栈的数量所得。

## 三、完整代码

```py
# -*- coding: utf-8 -*-
# @File  : leet_04.py
# @Author: FanyFull
# @Date  : 2021/7/10

from typing import List

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # 寻找两个数组中的第 k 个元素
        def find_kth(nums1:List[int], i:int, nums2:List[int], j:int, k:int):
            if i >= len(nums1):
                return nums2[j + k - 1]
            if j >= len(nums2):
                return nums1[i + k - 1]
            if k == 1:
                return min(nums1[i], nums2[j])
            mid_val1 = nums1[i - 1 + k // 2] if i - 1 + k // 2 < len(nums1) else float('inf')
            mid_val2 = nums2[j - 1 + k // 2] if j - 1 + k // 2 < len(nums2) else float('inf')
            if mid_val1 < mid_val2:
                return find_kth(nums1, i + k // 2, nums2, j, k - k // 2)
            else:
                return find_kth(nums1, i, nums2, j + k // 2, k - k // 2)

        m = len(nums1)
        n = len(nums2)
        left = (m + n + 1) // 2
        right = (m + n + 2) // 2
        return (find_kth(nums1, 0, nums2, 0, left) + find_kth(nums1, 0, nums2, 0, right)) / 2

if __name__ == '__main__':
    solution = Solution()
    nums1 = [1, 2, 3] # 注意，这里的输入数组都是正序的
    nums2 = [2]
    ans = solution.findMedianSortedArrays(nums1, nums2)
    print(ans)

```