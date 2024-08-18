---
title: LeetCode 排列，组合，子集问题相关算法题专项整理
date: 2022-03-13 17:47:55
tags:
- 算法
- 面试
categories:
- 算法
index_img: https://i.imgur.com/YbNkdMK.png
banner_img: https://i.imgur.com/YbNkdMK.png
description: '主要是整理 LeetCode 上面关于排列、组合和子集问题相关的算法题。'
---

# 78. 子集

回溯法套路。

```py
from typing import List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        self.res = []

        def backtrack(curRes: List, startIndex: int):
            self.res.append(curRes.copy())
            for i in range(startIndex, len(nums)):
                curRes += [nums[i]]
                backtrack(curRes, i + 1)
                curRes.pop()
        backtrack([], 0)
        return self.res


if __name__ == '__main__':
    solu = Solution()
    print(solu.subsets([1, 2, 3]))

```

另一种思路是和递归思路比较像，很巧妙。也可以说是动态规划。

```py
from typing import List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = [[]]
        for num in nums:
            res += [item + [num] for item in res]
        return res


if __name__ == '__main__':
    solu = Solution()
    print(solu.subsets([1, 2, 3]))

```

# 77. 组合

依然是回溯。只不过，根据条件剪去了一些情况。

```py
from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        self.res = []
        self.curRes = []

        def backtrack(start: int, n: int, k: int):
            if (len(self.curRes) == k):
                self.res.append(self.curRes.copy())
                return
            for i in range(start, n + 1):
                self.curRes.append(i)
                backtrack(i + 1, n, k)
                self.curRes.pop()

        backtrack(1, n, k)
        return self.res


if __name__ == '__main__':
    solu = Solution()
    print(solu.combine(4, 2))

```

# 46. 全排列

使用回溯，这里使用了备忘录，即 `self.used`，用来记录是否使用过某一个元素。所以我们在回溯之后要恢复两个东西，一个是备忘录，另一个是 `curRes`。

```py
from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        self.res = []
        self.curRes = []
        self.used = [False] * len(nums)

        def backtrack(nums: List[int]):
            if len(self.curRes) == len(nums):
                self.res.append(self.curRes.copy())
            for i in range(len(nums)):
                if self.used[i]:
                    continue
                self.curRes.append(nums[i])
                self.used[i] = True
                backtrack(nums)
                self.used[i] = False
                self.curRes.pop()

        backtrack(nums)
        return self.res


if __name__ == '__main__':
    s = Solution()
    print(s.permute([1, 2, 3]))

```

另一种，递归，有一点巧妙：

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

# 90. 子集 II

调试花了一点时间。因为一开始 `backtrack(i + 1, nums)` 里面的 `i` 搞成了 `start`。

```py
from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        self.res = []
        self.curRes = []
        nums.sort()

        def backtrack(start: int, nums: List[int]):
            self.res.append(self.curRes.copy())

            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                self.curRes.append(nums[i])
                backtrack(i + 1, nums)
                self.curRes.pop()

        backtrack(0, nums)
        return self.res


if __name__ == "__main__":
    s = Solution()
    print(s.subsetsWithDup([1, 2, 2]))

```

# 40. 组合总和 II

使用回溯方法解决：

```py
from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        self.curRes = []
        self.res = []
        self.trackSum = 0
        candidates.sort()

        def backtrack(start: int, candidates: List[int], target):
            if self.trackSum == target:
                self.res.append(self.curRes.copy())
                return
            if self.trackSum > target:
                return

            for i in range(start, len(candidates)):
                # 除去重复元素的情况
                if i > start and candidates[i] == candidates[i - 1]:
                    continue
                self.curRes.append(candidates[i])
                self.trackSum += candidates[i]
                backtrack(i + 1, candidates, target)
                self.trackSum -= candidates[i]
                self.curRes.pop()

        backtrack(0, candidates, target)
        return self.res


if __name__ == "__main__":
    s = Solution()
    print(s.combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))
    # print(s.combinationSum2([2, 5, 2, 1, 2], 5))
    # print(s.combinationSum2([2, 5, 2, 1, 2], 6))

```

之前使用 `dfs` 解决，其实也是回溯：

```py
from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        def dfs(candidates: List[int], target: int, path: List[int], res: List[List[int]]) -> None:
            if target == 0:
                res.append(path)
                return
            for i in range(len(candidates)):
                if target - candidates[i] < 0:
                    break
                if i > 0 and candidates[i] == candidates[i - 1]:
                    continue
                dfs(candidates[i + 1:], target - candidates[i],
                    path + [candidates[i]], res)

        res = []
        candidates.sort()
        dfs(candidates, target, [], res)
        return res


if __name__ == '__main__':
    s = Solution()
    print(s.combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))
    print(s.combinationSum2([2, 5, 2, 1, 2], 5))
    print(s.combinationSum2([2, 5, 2, 1, 2], 6))

```

# 47. 全排列 II

回溯加上剪枝。这里的剪枝有一定的技巧性。

对于剪枝的判断：重复元素，前面的元素一定要在当前元素之前使用。

还有，一定要先给数组排序！

```py
from typing import List


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        self.curRes = []
        self.res = []
        self.used = [False] * len(nums)
        nums.sort()

        def backtrack(nums: List[int]):
            if len(self.curRes) == len(nums):
                self.res.append(self.curRes.copy())

            for i in range(len(nums)):
                if self.used[i]:
                    continue
                if i > 0 and nums[i] == nums[i - 1] and not self.used[i - 1]:
                    continue
                self.curRes.append(nums[i])
                self.used[i] = True
                backtrack(nums)
                self.used[i] = False
                self.curRes.pop()

        backtrack(nums)
        return self.res


if __name__ == "__main__":
    s = Solution()
    # print(s.permuteUnique([1, 1, 2]))
    print(s.permuteUnique([3, 3, 0, 3]))

```

# 39. 组合总和

回溯的时候，`start` 变了。

```py
from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        self.curRes = []
        self.res = []
        self.trackSum = 0
        candidates.sort()

        def backtrack(start: int, nums: List[int], target: int):
            if self.trackSum == target:
                self.res.append(self.curRes.copy())
            if self.trackSum > target:
                return

            for i in range(start, len(nums)):
                self.curRes.append(nums[i])
                self.trackSum += nums[i]
                backtrack(i, nums, target)
                self.trackSum -= nums[i]
                self.curRes.pop()

        backtrack(0, candidates, target)
        return self.res


if __name__ == '__main__':
    s = Solution()
    print(s.combinationSum([2, 7, 6, 3, 5, 1], 9))

```

之前的做法，类似：

```py
from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        def dfs(candidates: List[int], target: int, path: List[int], res: List[List[int]]) -> None:
            if target == 0:
                res.append(path)
                return
            for i in range(len(candidates)):
                if target - candidates[i] < 0:
                    break
                dfs(candidates[i:], target - candidates[i],
                    path + [candidates[i]], res)

        res = []
        candidates.sort()
        dfs(candidates, target, [], res)
        return res


if __name__ == '__main__':
    s = Solution()
    print(s.combinationSum([2, 7, 6, 3, 5, 1], 9))

```

# 216. 组合总和 III

依然是回溯加上简单的剪枝。

```py
from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        self.curRes = []
        self.res = []
        self.trackSum = 0
        self.trackCount = 0

        def backtrack(start: int, k: int, n: int):
            if self.trackSum == n and self.trackCount == k:
                self.res.append(self.curRes.copy())

            if self.trackSum > n or self.trackCount > k:
                return

            for i in range(start, 10):
                self.curRes.append(i)
                self.trackSum += i
                self.trackCount += 1
                backtrack(i + 1, k, n)
                self.trackCount -= 1
                self.trackSum -= i
                self.curRes.pop()

        backtrack(1, k, n)
        return self.res


if __name__ == "__main__":
    solu = Solution()
    print(solu.combinationSum3(3, 7))
    print(solu.combinationSum3(3, 9))

```