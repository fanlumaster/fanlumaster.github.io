---
title: LeetCode 二叉树算法题专项整理
date: 2022-03-10 16:41:56
tags:
- 算法
- 面试
categories:
- 算法
index_img: https://i.imgur.com/ALSsDG6.png
banner_img: https://i.imgur.com/ALSsDG6.png
description: '主要是整理 LeetCode 上面关于二叉树的算法题。'
---

参考：<https://labuladong.github.io/algo/1/7/>

### 104. 二叉树的最大深度

利用二叉树的递归遍历：

```py
from typing import Optional

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        self.depth = 0
        self.res = 0

        def traverse(root: Optional[TreeNode]):
            if not root:
                return
            self.depth += 1
            self.res = max(self.res, self.depth)
            traverse(root.left)
            traverse(root.right)
            self.depth -= 1

        traverse(root)
        return self.res


if __name__ == '__main__':
    solu = Solution()
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    print(solu.maxDepth(root))

```

利用分解的方法，就是朴素的递归思想：

```py
from typing import Optional

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1

```

```py
from typing import Optional

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        left = self.maxDepth(root.left)
        right = self.maxDepth(root.right)
        res = max(left, right) + 1
        return res

```

### 543. 二叉树的直径

绷不住啦，这题的 AC 必须得记录一下。调试了好多下。

一定要注意题目中的 `这条路径可能穿过也可能不穿过根结点。` 真的是有点坑的。

![](https://i.imgur.com/yEfuP1h.png)

```py
from typing import List

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        if not root or (not root.left and not root.right):
            return 0

        self.diameter = 0

        def dfs(root: TreeNode):
            if not root:
                return 0
            left = dfs(root.left)
            right = dfs(root.right)
            res = max(left, right) + 1
            self.diameter = max(self.diameter, left + right)
            return res

        dfs(root)
        return self.diameter


if __name__ == '__main__':
    solu = Solution()
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right = TreeNode(3)
    print(solu.diameterOfBinaryTree(root))

    # treeNodeList = [1, 2, 3, 4, 5]
    # tree = createBTree(treeNodeList, 0)
    # levelTraverse(tree)

```