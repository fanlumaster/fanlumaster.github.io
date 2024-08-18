---
title: LeetCode 打家劫舍系列问题整理
date: 2022-03-20 20:45:54
tags:
- 动态规划
- LeetCode
categories:
- LeetCode
index_img: https://i.imgur.com/0OkaWaj.png
banner_img: https://i.imgur.com/0OkaWaj.png
description: '主要是整理 LeetCode 上面关于打家劫舍的算法题。主要是递归和动态规划。'
---

本文对文章 <https://labuladong.github.io/algo/1/14/> 多有参考。

# 198. 打家劫舍

主要的思想是动态规划。

纯粹的递归，效率很低。

```py
# 纯递归，会超时

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        self.nums = nums

        def dp(start: int):
            if start >= len(self.nums):
                return 0
            res = max(dp(start + 1), self.nums[start] + dp(start + 2))
            return res

        return dp(0)


solu = Solution()
nums = [1, 2, 3, 1]
nums = [183, 219, 57, 193, 94, 233, 202, 154, 65, 240, 97, 234, 100, 249, 186, 66, 90, 238,
        168, 128, 177, 235, 50, 81, 185, 165, 217, 207, 88, 80, 112, 78, 135, 62, 228, 247, 211]
res = solu.rob(nums)
print(res)

```

使用备忘录的递归。

```py
# 依然是自顶向下，使用备忘录

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        self.nums = nums
        self.memo = [-1] * len(self.nums)

        def dp(start: int):
            if start >= len(self.nums):
                return 0
            if self.memo[start] != -1:
                return self.memo[start]
            res = max(dp(start + 1), self.nums[start] + dp(start + 2))
            self.memo[start] = res
            return res

        return dp(0)


solu = Solution()
nums = [1, 2, 3, 1]
nums = [183, 219, 57, 193, 94, 233, 202, 154, 65, 240, 97, 234, 100, 249, 186, 66, 90, 238,
        168, 128, 177, 235, 50, 81, 185, 165, 217, 207, 88, 80, 112, 78, 135, 62, 228, 247, 211]
# 这个测试用例决定了备忘录中的默认值不能是 0
nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
res = solu.rob(nums)
print(res)

```

方法三：

```py
# 自底向上构建

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        res = [0] * (len(nums) + 2)
        for i in range(len(nums) - 1, -1, -1):
            res[i] = max(res[i + 1], nums[i] + res[i + 2])
        return res[0]


solu = Solution()
nums = [1, 2, 3, 1]
nums = [183, 219, 57, 193, 94, 233, 202, 154, 65, 240, 97, 234, 100, 249, 186, 66, 90, 238,
        168, 128, 177, 235, 50, 81, 185, 165, 217, 207, 88, 80, 112, 78, 135, 62, 228, 247, 211]
# 这个测试用例决定了备忘录中的默认值不能是 0
# nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
#         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
res = solu.rob(nums)
print(res)

```

优化方法三，得到方法四：

```py
# 自底向上构建，优化空间复杂度

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        res = 0
        oneStep = 0
        twoSteps = 0
        for i in range(len(nums) - 1, -1, -1):
            res = max(oneStep, nums[i] + twoSteps)
            oneStep, twoSteps = res, oneStep

        return res


solu = Solution()
nums = [1, 2, 3, 1]
# nums = [183, 219, 57, 193, 94, 233, 202, 154, 65, 240, 97, 234, 100, 249, 186, 66, 90, 238,
#         168, 128, 177, 235, 50, 81, 185, 165, 217, 207, 88, 80, 112, 78, 135, 62, 228, 247, 211]
# 这个测试用例决定了备忘录中的默认值不能是 0
# nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
#         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
res = solu.rob(nums)
print(res)

```

# 213. 打家劫舍 II

对于这种动态规划，还是不优化这个空间使用更加容易理解。

```py
'''
原来思路很简单。和简单版本的打家劫舍是一样的。
只需要考虑去头或者去尾的情况即可。
'''

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        dp1 = [0] * (len(nums) + 1)
        dp2 = [0] * (len(nums) + 1)
        numsExclueHead = nums[1:]
        numsExcludeTail = nums[:-1]

        for i in range(len(numsExclueHead) - 1, -1, -1):
            dp1[i] = max(dp1[i + 1], numsExclueHead[i] + dp1[i + 2])

        for i in range(len(numsExcludeTail) - 1, -1, -1):
            dp2[i] = max(dp2[i + 1], numsExcludeTail[i] + dp2[i + 2])

        return max(dp1[0], dp2[0])


solu = Solution()
nums = [2, 3, 2]
nums = [1, 2, 3, 1]
res = solu.rob(nums)
print(res)

```

# 337. 打家劫舍 III

一般的递归。思路很容易想。代码也比较容易写。只是，为了效率，要加备忘录。

```py
# 使用备忘录的递归，不然会超时

from typing import List
from queue import Queue

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, val):
        self.val = val
        self.right = None
        self.left = None

    def insert(self, val):
        if self.val == val:
            return
        elif self.val < val:
            if self.right is None:
                self.right = TreeNode(val)
            else:
                self.right.insert(val)
        else:  # self.val > val
            if self.left is None:
                self.left = TreeNode(val)
            else:
                self.left.insert(val)

    def display(self):
        lines, *_ = self._display_aux()
        for line in lines:
            print(line)

    def _display_aux(self):
        """Returns list of strings, width, height, and horizontal coordinate of the root."""
        # No child.
        if self.right is None and self.left is None:
            line = '%s' % self.val
            width = len(line)
            height = 1
            middle = width // 2
            return [line], width, height, middle

        # Only left child.
        if self.right is None:
            lines, n, p, x = self.left._display_aux()
            s = '%s' % self.val
            u = len(s)
            first_line = (x + 1) * ' ' + (n - x - 1) * '_' + s
            second_line = x * ' ' + '/' + (n - x - 1 + u) * ' '
            shifted_lines = [line + u * ' ' for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, n + u // 2

        # Only right child.
        if self.left is None:
            lines, n, p, x = self.right._display_aux()
            s = '%s' % self.val
            u = len(s)
            first_line = s + x * '_' + (n - x) * ' '
            second_line = (u + x) * ' ' + '\\' + (n - x - 1) * ' '
            shifted_lines = [u * ' ' + line for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, u // 2

        # Two children.
        left, n, p, x = self.left._display_aux()
        right, m, q, y = self.right._display_aux()
        s = '%s' % self.val
        u = len(s)
        first_line = (x + 1) * ' ' + (n - x - 1) * \
            '_' + s + y * '_' + (m - y) * ' '
        second_line = x * ' ' + '/' + \
            (n - x - 1 + u + y) * ' ' + '\\' + (m - y - 1) * ' '
        if p < q:
            left += [n * ' '] * (q - p)
        elif q < p:
            right += [m * ' '] * (p - q)
        zipped_lines = zip(left, right)
        lines = [first_line, second_line] + \
            [a + u * ' ' + b for a, b in zipped_lines]
        return lines, n + m + u, max(p, q) + 2, n + u // 2


def buildTree(data: List[int]):
    count = 0
    q = Queue()
    root = TreeNode(data[0])
    q.put(root)
    curNode = None

    for i in range(1, len(data)):
        node = TreeNode(data[i]) if data[i] != None else None
        if count == 0:
            curNode = q.get()
            count += 1
            curNode.left = node
        else:
            count = 0
            curNode.right = node
        if data[i] != None:
            q.put(node)

    return root


class Solution:
    def rob(self, root: TreeNode) -> int:
        self.memo = {}

        def rob(root: TreeNode):
            if root == None:
                return 0
            if root in self.memo:
                return self.memo[root]
            res0 = rob(root.left) + rob(root.right)
            res1 = root.val
            if root.left != None:
                res1 += rob(root.left.left) + rob(root.left.right)
            if root.right != None:
                res1 += rob(root.right.left) + rob(root.right.right)
            res = max(res0, res1)
            self.memo[root] = res
            return res

        return rob(root)


solu = Solution()
data = [3, 2, 3, None, 3, None, 1]
data = [3, 4, 5, 1, 3, None, 1]
data = [79, 99, 77, None, None, None, 69, None, 60, 53, None, 73, 11, None, None, None,
        62, 27, 62, None, None, 98, 50, None, None, 90, 48, 82, None, None, None, 55, 64,
        None, None, 73, 56, 6, 47, None, 93, None, None, 75, 44, 30, 82, None, None, None,
        None, None, None, 57, 36, 89, 42, None, None, 76, 10, None, None, None, None, None,
        32, 4, 18, None, None, 1, 7, None, None, 42, 64, None, None, 39, 76, None, None, 6, None,
        66, 8, 96, 91, 38, 38, None, None, None, None, 74, 42, None, None, None, 10, 40, 5, None,
        None, None, None, 28, 8, 24, 47, None, None, None, 17, 36, 50, 19, 63, 33, 89, None, None,
        None, None, None, None, None, None, 94, 72, None, None, 79, 25, None, None, 51, None, 70,
        84, 43, None, 64, 35, None, None, None, None, 40, 78, None, None, 35, 42, 98, 96, None, None,
        82, 26, None, None, None, None, 48, 91, None, None, 35, 93, 86, 42, None, None, None, None, 0,
        61, None, None, 67, None, 53, 48, None, None, 82, 30, None, 97, None, None, None, 1, None, None]
root = buildTree(data)
root.display()
res = solu.rob(root)
print(res)

```