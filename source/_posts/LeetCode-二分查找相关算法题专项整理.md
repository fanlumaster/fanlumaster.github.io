---
title: LeetCode 二分查找相关算法题专项整理
date: 2022-03-14 00:52:00
updated: 2022-03-14 23:23:54
tags:
- 算法
- 面试
categories:
- 算法
index_img: https://i.imgur.com/sFIN6mi.png
banner_img: https://i.imgur.com/sFIN6mi.png
description: '主要是整理 LeetCode 上面关于二分查找的算法题。'
---

# 704. 二分查找

标标准准的二分查找。

注意，`while` 条件是 `<=`。

```py
from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            elif nums[mid] > target:
                right = mid - 1
        return -1

```

# 34. 在排序数组中查找元素的第一个和最后一个位置

以后遇到二分查找，`while` 条件只用 `<=`。

寻找左边界，返回的是 `left`，而 `left` 的取值范围是 $[0, len(nums)]$，闭区间，也就是可能在右边越界。

寻找右边界，返回的是 `right`，而 `right` 的取值范围是 $[-1, len(nums) - 1]$，闭区间，可能在左边越界。

```py
from typing import List


class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        res = [-1, -1]
        if not nums:
            return res
        if len(nums) == 1:
            return [0, 0] if nums[0] == target else res

        left = 0
        right = len(nums) - 1
        # 寻找左边界
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                right = mid - 1
            elif nums[mid] < target:
                left = mid + 1
            elif nums[mid] > target:
                right = mid - 1
        if left < len(nums) and nums[left] == target:
            res[0] = left

        # 寻找右边界
        left = 0
        right = len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            elif nums[mid] > target:
                right = mid - 1
        if right > -1 and nums[right] == target:
            res[1] = right

        return res


if __name__ == "__main__":
    solu = Solution()
    print(solu.searchRange([5, 7, 7, 8, 8, 10], 8))
    # print(solu.searchRange([2, 2], 3))
    # print(solu.searchRange([2, 2], 2))
    # print(solu.searchRange([1, 3], 1))

```