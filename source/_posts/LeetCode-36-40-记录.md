---
title: LeetCode 36-40 记录
date: 2022-02-22 18:43:46
tags:
- LeetCode
- 算法
- Python
categories:
- LeetCode
index_img: https://i.imgur.com/tMGLfqd.png
banner_img: https://i.imgur.com/tMGLfqd.png
description: '记录 LeetCode 36-40 的解题经过'
---

# 36

<https://leetcode-cn.com/problems/valid-sudoku/>

![](https://i.imgur.com/jfBTH0T.png)

```py
from typing import List


class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        help = 10  # 辅助将 "." 转化成不重复的数字
        for i in range(9):
            row = set()
            col = set()
            box = set()
            for j in range(9):
                row.add(board[i][j] if board[i][j] != '.' else help)
                help += 1
                col.add(board[j][i] if board[j][i] != '.' else help)
                help += 1
                box.add(board[i // 3 * 3 + j // 3][i % 3 * 3 + j % 3]
                        if board[i // 3 * 3 + j // 3][i % 3 * 3 + j % 3] != '.' else help)
                help += 1

            if len(row) != 9 or len(col) != 9 or len(box) != 9:
                return False
        return True


if __name__ == '__main__':
    solu = Solution()
    board = [["5", "3", ".", ".", "7", ".", ".", ".", "."],
             ["6", ".", ".", "1", "9", "5", ".", ".", "."],
             [".", "9", "8", ".", ".", ".", ".", "6", "."],
             ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
             ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
             ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
             [".", "6", ".", ".", ".", ".", "2", "8", "."],
             [".", ".", ".", "4", "1", "9", ".", ".", "5"],
             [".", ".", ".", ".", "8", ".", ".", "7", "9"]]
    board = [["8", "3", ".", ".", "7", ".", ".", ".", "."],
             ["6", ".", ".", "1", "9", "5", ".", ".", "."],
             [".", "9", "8", ".", ".", ".", ".", "6", "."],
             ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
             ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
             ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
             [".", "6", ".", ".", ".", ".", "2", "8", "."],
             [".", ".", ".", "4", "1", "9", ".", ".", "5"],
             [".", ".", ".", ".", "8", ".", ".", "7", "9"]]

    res = solu.isValidSudoku(board)
    print(res)

```

这里最直观的想法肯定是使用不重复的 set 集合来处理这个问题。因此代码实现起来还是相对容易的，主要是那个 `box` 的坐标确认要注意一下。

# 37

<https://leetcode-cn.com/problems/sudoku-solver/>

![](https://i.imgur.com/Svp3SkU.png)

```py
from typing import List, Optional


class Solution:
    def findNext(self, board: List[List[str]]) -> Optional[int]:
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    return i, j
        return -1, -1

    def isValid(self, board: List[List[str]], i: int, j: int, num: str) -> bool:
        for row in range(9):
            if board[row][j] == num:
                return False
        for col in range(9):
            if board[i][col] == num:
                return False
        for row in range(i // 3 * 3, i // 3 * 3 + 3):
            for col in range(j // 3 * 3, j // 3 * 3 + 3):
                if board[row][col] == num:
                    return False
        return True

    def solveSudokuHelper(self, board, i=0, j=0):
        i, j = self.findNext(board)
        if i == -1:
            return True
        for num in range(1, 10):
            if self.isValid(board, i, j, str(num)):
                board[i][j] = str(num)
                if self.solveSudokuHelper(board, i, j):
                    return True
                board[i][j] = '.'
        return False

    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        self.solveSudokuHelper(board)
        return


board = [["5", "3", ".", ".", "7", ".", ".", ".", "."],
         ["6", ".", ".", "1", "9", "5", ".", ".", "."],
         [".", "9", "8", ".", ".", ".", ".", "6", "."],
         ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
         ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
         ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
         [".", "6", ".", ".", ".", ".", "2", "8", "."],
         [".", ".", ".", "4", "1", "9", ".", ".", "5"],
         [".", ".", ".", ".", "8", ".", ".", "7", "9"]]

Solution().solveSudoku(board)

print(board)

```

![](https://i.imgur.com/nz58VE2.png)

注：这里对于每一个小的 3 x 3 的部分，也是按照上面的图中的坐标轴来分析的。

再次写这道题，感觉还是 Python 写代码更加容易让人理解呀。回溯算法，清晰明了。

参考：

<https://stackoverflow.com/questions/1697334/algorithm-for-solving-sudoku>

# 38

<https://leetcode-cn.com/problems/count-and-say/>

![](https://i.imgur.com/RHOT2QQ.png)

```py
class Solution:
    def countAndSay(self, n: int) -> str:
        if n == 1:
            return '1'
        else:
            s = self.countAndSay(n-1)
            res = ''
            count = 1
            for i in range(0, len(s)):
                if i == len(s) - 1 or s[i] != s[i+1]:
                    res += str(count) + s[i]
                    count = 1
                else:
                    count += 1
            return res


if __name__ == '__main__':
    sol = Solution()
    print(sol.countAndSay(1))
    print(sol.countAndSay(2))
    print(sol.countAndSay(3))
    print(sol.countAndSay(4))
    print(sol.countAndSay(5))

```

理解题目的意思之后，这道题其实就是一个简单的递归。如果对递归比较熟悉的话，这道题很快就能写出来。

# 39

<https://leetcode-cn.com/problems/combination-sum/>

![](https://i.imgur.com/9NLLM42.png)

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

看到这题，应该立马能想到 dfs。注意一点，就是在进行深度优先搜索的时候，要先对待选数组 `candidates` 进行排序。不然，搜索的结果可能会不全。

# 40

<https://leetcode-cn.com/problems/combination-sum-ii/>

![](https://i.imgur.com/9JplEZh.png)

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

依然是 dfs，不过，要注意，这个不能够重复使用列表中的元素。