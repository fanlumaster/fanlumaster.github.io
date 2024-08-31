---
title: leetcode 0~10 值得记录的题目
date: 2022-09-27 23:58:12
updated: 2022-09-30 22:06:17
tags:
- leetcode
categories:
index_img: https://i.imgur.com/imAD83f.png
banner_img: https://i.imgur.com/imAD83f.png
---

## leet04

哎，灰飞烟灭。

说是困难题，这个二分其实是比较简单的。可能是边界条件比较难搞？嗯，好吧，可能是那一层转化是比较考验人的，怎么说呢，看到这个时间复杂度的限制，就应该想到二分法，但是具体的转换，能够把转换的细节处理好，这需要耗费一定的时间。嗯。

还是来这个草稿吧。

![](https://i.imgur.com/VQQWzSl.jpg)

然后是 Java 和 C++ 的代码，

```java
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;

        if ((m + n) % 2 == 1) {
            int k = (m + n + 1) / 2;
            return findKthSortedArrays(nums1, nums2, k);
        } else {
            int k = (m + n) / 2;
            return (findKthSortedArrays(nums1, nums2, k) + findKthSortedArrays(nums1, nums2, k + 1)) / 2.0;
        }
    }

    private int findKthSortedArrays(int[] nums1, int[] nums2, int k) {
        int m = nums1.length;
        int n = nums2.length;
        int index1 = 0;
        int index2 = 0;

        while (true) {
            // edge situation
            if (index1 == m) {
                return nums2[index2 + k - 1];
            }
            if (index2 == n) {
                return nums1[index1 + k - 1];
            }
            if (k == 1) {
                return Math.min(nums1[index1], nums2[index2]);
            }

            // normal situation
            int newIndex1 = Math.min(index1 + k / 2 - 1, m - 1);
            int newIndex2 = Math.min(index2 + k / 2 - 1, n - 1);
            if (nums1[newIndex1] < nums2[newIndex2]) {
                k = k - (newIndex1 - index1 + 1);
                index1 = newIndex1 + 1;
            } else if (nums1[newIndex1] > nums2[newIndex2]) {
                k = k - (newIndex2 - index2 + 1);
                index2 = newIndex2 + 1;
            } else {
                k = k - (newIndex1 - index1 + 1);
                index1 = newIndex1 + 1;
            }
        }
    }

    public static void main(String[] args) {
        var solu = new Solution();
        int[] nums1 = new int[]{1, 3};
        int[] nums2 = new int[]{2};

        nums1 = new int[]{1, 2};
        nums2 = new int[]{3, 4};
        var res = solu.findMedianSortedArrays(nums1, nums2);
        System.out.println(res);
    }
}
```

```cpp
// to make the time complexity equals to O(log(m+m))
// we need to dichotomy
#include <iostream>
#include <vector>

using namespace std;

class Solution
{
public:
    double findMedianSortedArrays(vector<int> &nums1, vector<int> &nums2)
    {
        int m = nums1.size();
        int n = nums2.size();
        if ((m + n) % 2 == 1)
        {
            return findKthSortedArrays(nums1, nums2, (m + n + 1) / 2);
        }
        else
        {
            int left = findKthSortedArrays(nums1, nums2, (m + n) / 2);
            int right = findKthSortedArrays(nums1, nums2, (m + n) / 2 + 1);
            return (left + right) / 2.0;
        }
    }

private:
    // this k starts from 1, not 0, notice here
    int findKthSortedArrays(vector<int> &nums1, vector<int> &nums2, int k)
    {
        int m = nums1.size();
        int n = nums2.size();
        int index1 = 0;
        int index2 = 0;

        while (true)
        {
            // edge situation
            // out of the bound
            if (index1 == m)
            {
                return nums2[index2 + k - 1];
            }
            if (index2 == n)
            {
                return nums1[index1 + k - 1];
            }
            // k == 1
            if (k == 1)
            {
                return min(nums1[index1], nums2[index2]);
            }

            // normal situation
            int newIndex1 = min(index1 + k / 2 - 1, m - 1);
            int newIndex2 = min(index2 + k / 2 - 1, n - 1);
            if (nums1[newIndex1] < nums2[newIndex2])
            {
                k = k - (newIndex1 - index1 + 1);
                index1 = newIndex1 + 1;
            }
            else if (nums1[newIndex1] > nums2[newIndex2])
            {
                k = k - (newIndex2 - index2 + 1);
                index2 = newIndex2 + 1;
            }
            else
            {
                k = k - (newIndex1 - index1 + 1);
                index1 = newIndex1 + 1;
            }
        }

        return -1;
    }
};

int main(int argc, char const *argv[])
{
    Solution solu;
    vector<int> nums1{1, 3};
    vector<int> nums2{2};
    double res = solu.findMedianSortedArrays(nums1, nums2);
    cout << res << endl;

    nums1 = vector<int>{1, 2};
    nums2 = vector<int>{3, 4};
    res = solu.findMedianSortedArrays(nums1, nums2);
    cout << res << endl;
    return 0;
}
```

## leet05

思路呢，就用草稿上的吧。一看就懂。主要是自己一看就懂。

![](https://i.imgur.com/Hblj2Th.jpg)

![](https://i.imgur.com/td50ZcT.jpg)

代码就放在 GitHub 的仓库里面。Java。

## leet06

思路，

![](https://i.imgur.com/9NYAQNx.jpg)

代码见仓库。

## leet10

思路，

![](https://i.imgur.com/3f6NRJV.jpg)

![](https://i.imgur.com/KWLPAhn.jpg)

代码见仓库。
