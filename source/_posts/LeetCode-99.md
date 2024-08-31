---
title: LeetCode 99
date: 2022-02-27 12:38:52
updated: 2022-03-01 16:17:32
tags:
- LeetCode
- 算法
- Python
categories:
- LeetCode
index_img: https://i.imgur.com/Ts87JKy.png
banner_img: https://i.imgur.com/Ts87JKy.png
description: '记录 LeetCode 99 的解题经过'
---

<https://leetcode-cn.com/problems/recover-binary-search-tree/>

![](https://i.imgur.com/DaJHl1s.png)

```py
from typing import Optional

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        nodes = []

        def dfs(node: Optional[TreeNode]) -> None:
            if not node:
                return
            dfs(node.left)
            nodes.append(node)
            dfs(node.right)
        dfs(root)
        x = None
        y = None
        for i in range(len(nodes) - 1):
            if nodes[i].val > nodes[i + 1].val:
                if not x:  # if x is None, then this is the first time we see a violation
                    x = nodes[i]
                y = nodes[i + 1]  # y is the second violation
        x.val, y.val = y.val, x.val


def dfs(node: Optional[TreeNode]) -> None:
    if not node:
        return
    dfs(node.left)
    print(node.val)
    dfs(node.right)


if __name__ == "__main__":
    root = TreeNode(7)
    root.left = TreeNode(2)
    root.right = TreeNode(6)
    root.left.left = TreeNode(1)
    root.left.right = TreeNode(3)
    root.right.left = TreeNode(5)
    root.right.right = TreeNode(4)
    Solution().recoverTree(root)
    dfs(root)

```

首先，我们理解题意，发现给定的二叉搜索树中只需要交换一次就能将树的性质恢复。所以，我们先对二叉搜索树进行先序遍历，然后找出两个不对劲的位置，交换这两个节点的值即可。