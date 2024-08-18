---
title: StringBuilder 和 StringBuffer 之间的区别
date: 2022-09-08 14:23:36
tags:
- Java
categories:
index_img: https://i.imgur.com/m4uWhqd.png
banner_img: https://i.imgur.com/m4uWhqd.png
---

其实，主要了解哪一个是多线程安全的就可以了。

StringBuffer 是多线程安全的。

这两个字符串类所拥有的 api 都是类似的。

性能的话，肯定是线程不安全的 StringBuilder 更加安全。

就用别人的代码测试一下：

```java
public class Main {
    public static void main(String[] args) {
        int N = 77777777;
        long t;

        {
            StringBuffer sb = new StringBuffer();
            t = System.currentTimeMillis();
            for (int i = N; i-- > 0;) {
                sb.append("");
            }
            System.out.println(System.currentTimeMillis() - t);
        }

        {
            StringBuilder sb = new StringBuilder();
            t = System.currentTimeMillis();
            for (int i = N; i > 0; i--) {
                sb.append("");
            }
            System.out.println(System.currentTimeMillis() - t);
        }
    }
}
```

output:

![](https://i.imgur.com/AgZGx04.png)

这么一看，这个性能的差距还是有点明显的。看来写 leetcode 的时候可以多用一下这个 StringBuild，反正是单线程。

--- 

参考：

<https://stackoverflow.com/questions/355089/difference-between-stringbuilder-and-stringbuffer>
