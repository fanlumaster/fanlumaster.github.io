---
title: LeetCode 链表算法题专项整理
date: 2022-03-11 20:29:41
updated: 2022-03-12 15:59:54
tags:
- 算法
- 面试
categories:
- 算法
index_img: https://i.imgur.com/skvLuGR.png
banner_img: https://i.imgur.com/skvLuGR.png
description: '主要是整理 LeetCode 上面关于链表的算法题。'
---

参考：<https://labuladong.github.io/algo/1/8/>

# 21. 合并两个有序链表

简单的遍历链表即可，没什么技巧。数据结构课程经典例题。

```py
from typing import Optional

# Definition for singly-linked list.


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        l1 = list1
        l2 = list2
        res = dummy
        while l1 and l2:
            if l1.val < l2.val:
                dummy.next = l1
                l1 = l1.next
            else:
                dummy.next = l2
                l2 = l2.next
            dummy = dummy.next
        if l1:
            dummy.next = l1
        if l2:
            dummy.next = l2
        return res.next

```

# 23. 合并K个升序链表

经典的优先队列问题。

利用优先队列来处理，但是这里的实现不怎么好，因为这里是一次性把所有的节点全部都加入到优先队列中去，然后再一个一个弹出来。其实我的想法是单独给 ListNode 类配置一个比较函数，这样，我们可以每次把每一条链表的头节点加进去即可。

```py
from typing import List, Optional
from queue import PriorityQueue

# Definition for singly-linked list.


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        pq = PriorityQueue()
        dummy = ListNode(-1)
        res = dummy
        for i in range(len(lists)):
            curNode = lists[i]
            while curNode:
                pq.put(curNode.val)
                curNode = curNode.next
        while not pq.empty():
            dummy.next = ListNode(pq.get())
            dummy = dummy.next

        return res.next


if __name__ == '__main__':
    solu = Solution()
    # lists = [ListNode(1), ListNode(4), ListNode(5)]
    # lists = [ListNode(1), ListNode(3), ListNode(4)]
    lists = [ListNode(1), ListNode(2), ListNode(3)]
    res = solu.mergeKLists(lists)
    while res:
        print(res.val)
        res = res.next

```

# 19. 删除链表的倒数第 N 个结点

一趟遍历，利用一个小技巧，先走 n 步数，然后再来一个指针，同时走，第一个指针走到最后一个节点的时候，刚好第二个指针走到了倒数第 n 个节点的前一个节点。

注意一下删除倒数 n 个节点的情况，即删除第一个节点的情况。

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        res = head
        headCopy = head
        for _ in range(n):
            headCopy = headCopy.next
        # 如果删除第倒数 size 个节点
        if not headCopy:
            return res.next
        while headCopy.next:
            head = head.next
            headCopy = headCopy.next
        
        head.next = head.next.next
        return res

```

# 876. 链表的中间结点

简单的快慢指针技巧。

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def middleNode(self, head: ListNode) -> ListNode:
        slowP = head
        fastP = head
        while fastP and fastP.next:
            fastP = fastP.next.next
            slowP = slowP.next

        return slowP

```

# 141. 环形链表

依然是快满指针技巧。

这里还要证明一个点，就是一定能相遇吗？

答：能。假设慢指针走了 $k$ 步，则快指针走了 $2k$ 步，用 $m$ 表示环的节点数。我们只要找到一个 $a$，使得下面式子成立即可：

$$
2k - k = am
$$

因为 $k$ 为任意正整数，所以 $a = \displaystyle\frac{k}{m}$ 一定可以取到。证毕。

```py
from typing import Optional

# Definition for singly-linked list.


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False
        slowP = head
        fastP = head
        while fastP and fastP.next:
            slowP = slowP.next
            fastP = fastP.next.next
            if slowP == fastP:
                return True
        return False

```

# 142. 环形链表 II

![](https://i.imgur.com/bqzYCD0.png)

这道题第一次是觉得很难的。当时好像看了题解也想得不是很明白。当时用的还是 C 语言。

现在想来，不过是一道小学的追及问题。

![](https://i.imgur.com/WKtEhU9.png)

利用快慢指针。有一个困惑我的点，就是真的不会出现快指针先跨越了慢指针，然后在之后的路程中再和慢指针相遇吗？答案当然是不可能的。我们可以把每一次要走的距离用单位 1 来考虑，如果快指针想要跨越慢指针，那么一定是建立在快慢指针已经相遇的情况下。

然后问题就好解决了。我们把慢指针进入环之前走过的距离设为 $x$，把进入环之后直到相遇点之间的距离设为 $y$，然后，我们把慢指针重设为 `head`，然后让快慢指针同时以每次步进 1 的速率往后面走，那么，它们在环的起点一定会相遇。

因为第一次相遇的时候，慢指针走了 $x + y$ 步，快指针走了 $2(x + y)$ 步，然后快指针是比慢指针多走了一圈环的，那么，快指针如果想要再次走到环的起点，需要走 $x$ 步，而我们慢指针重设后，要走到环的起点，也是要走 $x$ 步。思路就显而易见了。

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        slowP = head
        fastP = head
        while fastP and fastP.next:
            slowP = slowP.next
            fastP = fastP.next.next
            if slowP == fastP:
                slowP = head
                while not fastP == slowP:
                    slowP = slowP.next
                    fastP = fastP.next
                return fastP

        return None

```

# 160. 相交链表

这题的思路是拼接。 

![](https://i.imgur.com/bjAcxJ8.png)

假设 A 由 a 和 c 组成，B 由 b 和 c 组成，那么，把 B 拼到 A 的后面，就变成了 a + c + b + c，把 A 拼到 B 的后面，就是 b + c + a + c，前面的 `a + c + b` 和 `b + c + a` 长度是相同的，那么找到相交节点就比较容易了。

还有一种思路，就是利用环形链表找入口的方法。也比较容易理解。也容易想。

写法一：

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        p1 = headA
        p2 = headB
        while p1 != p2:
            if not p1:
                p1 = headB
            else:
                p1 = p1.next
            if not p2:
                p2 = headA
            else:
                p2 = p2.next

        return p1


if __name__ == '__main__':
    solu = Solution()
    headA = ListNode(1)
    headA.next = ListNode(9)
    headA.next.next = ListNode(1)
    headB = ListNode(3)
    headC = ListNode(2)
    headC.next = ListNode(4)
    headA.next.next.next = headC
    headB.next = headC
    print(solu.getIntersectionNode(headA, headB).val)

```

写法二：

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        p1 = headA
        p2 = headB
        flag = 1
        while p1 and p2:
            if p1 == p2:
                return p1
            if not p1.next and flag:
                p1 = headB
                flag = 0
            else:
                p1 = p1.next
            if not p2.next:
                p2 = headA
            else:
                p2 = p2.next

        return p1


if __name__ == '__main__':
    solu = Solution()
    headA = ListNode(1)
    headA.next = ListNode(9)
    headA.next.next = ListNode(1)
    headB = ListNode(3)
    headC = ListNode(2)
    headC.next = ListNode(4)
    headA.next.next.next = headC
    headB.next = headC
    print(solu.getIntersectionNode(headA, headB).val)

```

这个写法二让我调试了好长时间。虽然思路简单，但是实际跑的时候还得注意细节。