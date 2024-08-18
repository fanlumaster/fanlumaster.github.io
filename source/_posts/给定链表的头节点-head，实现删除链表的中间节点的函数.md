---
title: 给定链表的头节点 head，实现删除链表的中间节点的函数
date: 2021-03-29 08:41:10
tags:
- 链表
- 《程序员代码面试指南》
- 数据结构
categories:
- 数据结构与算法
index_img: https://i.imgur.com/au25VHY.png
banner_img: https://i.imgur.com/au25VHY.png
description: 《程序员代码面试指南第 2 版》2-3
---

#### 题目

给定链表的头节点 head，实现删除链表的中间节点的函数。

例如：

    1-＞2，删除节点1；
    1-＞2-＞3，删除节点2；
    1-＞2-＞3-＞4，删除节点2；
    1-＞2-＞3-＞4-＞5，删除节点3；

进阶：给定链表的头节点 head、整数 a 和 b，实现删除位于 a/b 处节点的函数。

例如：

    链表：1-＞2-＞3-＞4-＞5，假设a/b的值为r。
    如果r等于0，不删除任何节点；
    如果r在区间（0，1/5]上，删除节点1；
    如果r在区间（1/5，2/5]上，删除节点2；
    如果r在区间（2/5，3/5]上，删除节点3；
    如果r在区间（3/5，4/5]上，删除节点4；
    如果r在区间（4/5，1]上，删除节点5；如果r大于1，不删除任何节点。

#### 解题思路

**原问题**

整体思路是利用快慢指针。只是要注意一些细节问题。我们将小于等于 2 个节点的链表直接作硬编码处理。然后处理大于 2 个节点的情况。首先初始化快慢指针，快指针初始时指向第 3 个节点，慢指针初始时指向第 1 个节点。然后开始移动，每一次移动，快指针走两个节点，慢指针走一个节点。终止条件是快指针到达了倒数第一个或者倒数第二个节点。

至于为何快指针和慢指针走的规则是这样的，我们可以分两种情况来看。我们假定链表节点数为 $N, N \geqslant 3$。

- $N$ 是偶数。快指针最后是停在了倒数第二个节点的位置。则慢指针走了 $\frac{N - 3 - 1}{2}$ 步，即 $\frac{N}{2} - 1$ 步。很显然，最后慢指针的位置是在该删除节点的前一个位置。
- $N$ 是奇数。快指针最后是停在了倒数第一个位置。则慢指针走了 $\frac{N - 3}{2}$ 步，即 $\frac{N - 1}{2} - 1$，而慢指针从头节点开始走 $\frac{N - 1}{2}$ 步正好会走到中间的节点的地方。因此，最后慢指针的位置是中间节点的前一个位置。

代码

节点类

```java
public class Node {
    public int value;
    public Node next;

    public Node(int value) {
        this.value = value;
    }
}
```

函数

```java
// 删除链表的中间节点，很显然，利用的是快慢指针
public Node removeMidNode(Node head) {
    if (head == null || head.next == null) { // 如果是空链表或者是只有一个节点的链表
        return head;
    }
    if (head.next.next == null) { // 如果只有两个节点，那么，就删除第一个节点
        return head.next;
    }
    Node pre = head;
    Node cur = head.next.next;
    while (cur.next != null && cur.next.next != null) { // 如果快指针没有走到倒数第一个或者倒数第二个节点
        pre = pre.next; // 慢指针
        cur = cur.next.next; // 快指针
    }
    pre.next = pre.next.next; // 删除中间节点
    return head;
}
```

**进阶问题**

这个主要是要计算出待删除节点的序号，如下

```java
n = (int) Math.ceil((double) (n * a) / (double) b);
```

完整函数

```java
// 删除位于 a/b 处的节点
public Node removeByRatio(Node head, int a, int b) {
    if (a < 1 || a > b) {
        return head;
    }
    int n = 0;
    Node cur = head;
    while (cur != null) { // 计算出节点的个数
        n++;
        cur = cur.next;
    }
    n = (int) Math.ceil((double) (n * a) / (double) b); // 向上取整，之所以将计算出来的值仍用 n 存储，是为了节省空间
    if (n == 1) {
        head = head.next;
    }
    if (n > 1) {
        cur = head;
        while (--n != 1) { // 找到待删除节点的前一个节点
            cur = cur.next;
        }
        cur.next = cur.next.next;
    }
    return head;
}
```