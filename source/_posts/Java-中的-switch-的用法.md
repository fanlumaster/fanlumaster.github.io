---
title: Java 中的 switch 的用法
date: 2021-10-04 16:52:31
updated: 2021-10-04 17:12:24
tags:
- Java
- Java 语言基础
categories:
- Java
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20211004171202.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20211004171202.png
---

今天适逢学弟问这个问题，这里就记录一下。说实话，关于 `switch`，我之前也是有点犯迷糊的，今天翻阅《On Java 8》，发现写得没有 Oracle 的官方教程好。所以，就把官方教程中的例子给拿出来咀嚼一下。

# Switch 语句

最常用的也是最简单的示例：

```java
public class SwitchDemo {
    public static void main(String[] args) {

        int month = 8;
        String monthString;
        switch (month) {
            case 1:  monthString = "January";
                     break;
            case 2:  monthString = "February";
                     break;
            case 3:  monthString = "March";
                     break;
            case 4:  monthString = "April";
                     break;
            case 5:  monthString = "May";
                     break;
            case 6:  monthString = "June";
                     break;
            case 7:  monthString = "July";
                     break;
            case 8:  monthString = "August";
                     break;
            case 9:  monthString = "September";
                     break;
            case 10: monthString = "October";
                     break;
            case 11: monthString = "November";
                     break;
            case 12: monthString = "December";
                     break;
            default: monthString = "Invalid month";
                     break;
        }
        System.out.println(monthString);
    }
}
```

输出：

```
August
```

下面是关于 `break` 的用法的解释

> Another point of interest is the break statement. Each break statement terminates the enclosing switch statement. Control flow continues with the first statement following the switch block. The break statements are necessary because without them, statements in switch blocks fall through: All statements after the matching case label are executed in sequence, regardless of the expression of subsequent case labels, until a break statement is encountered. The program SwitchDemoFallThrough shows statements in a switch block that fall through.

如果没有 `break` 的话，那么，当程序匹配到一个 `case` 时，下面的语句块（statement）将都会得到执行（不管下面的 `case` 是什么情况，其中包含的语句块都会被执行），直至遇到 `break` 为止。

举个例子：

```java
public class SwitchDemoFallThrough {

    public static void main(String[] args) {
        java.util.ArrayList<String> futureMonths =
            new java.util.ArrayList<String>();

        int month = 8;

        switch (month) {
            case 1:  futureMonths.add("January");
            case 2:  futureMonths.add("February");
            case 3:  futureMonths.add("March");
            case 4:  futureMonths.add("April");
            case 5:  futureMonths.add("May");
            case 6:  futureMonths.add("June");
            case 7:  futureMonths.add("July");
            case 8:  futureMonths.add("August");
            case 9:  futureMonths.add("September");
            case 10: futureMonths.add("October");
            case 11: futureMonths.add("November");
            case 12: futureMonths.add("December");
                     break;
            default: break;
        }

        if (futureMonths.isEmpty()) {
            System.out.println("Invalid month number");
        } else {
            for (String monthName : futureMonths) {
               System.out.println(monthName);
            }
        }
    }
}
```

输出：

```
August
September
October
November
December
```

一个语句块可以有多个 `case` 标签，这些个 `case` 之间是“或”的关系。

举例：

```java
class SwitchDemo2 {
    public static void main(String[] args) {

        int month = 2;
        int year = 2000;
        int numDays = 0;

        switch (month) {
            case 1: case 3: case 5:
            case 7: case 8: case 10:
            case 12:
                numDays = 31;
                break;
            case 4: case 6:
            case 9: case 11:
                numDays = 30;
                break;
            case 2:
                if (((year % 4 == 0) && 
                     !(year % 100 == 0))
                     || (year % 400 == 0))
                    numDays = 29;
                else
                    numDays = 28;
                break;
            default:
                System.out.println("Invalid month.");
                break;
        }
        System.out.println("Number of Days = "
                           + numDays);
    }
}
```

输出：

```
Number of Days = 29
```

---

参考：

1、<https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html>