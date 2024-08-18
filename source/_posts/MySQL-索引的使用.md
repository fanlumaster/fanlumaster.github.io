---
title: MySQL 索引的使用
date: 2022-09-02 17:40:14
tags:
- MySQL
- 翻译
categories:
index_img: https://i.imgur.com/uIze7bF.jpg
banner_img: https://i.imgur.com/uIze7bF.jpg
---

原文链接：<https://www.mysqltutorial.org/mysql-index/>

文中使用的示例的数据库也是来自于这个网站，可以到这个网站进行下载。

MySQL 使用索引来方便快速地查找具有特定的列属性值的行。没有索引的话，MySQL 必须扫描整张表去定位相关的行。表的规模越大，查找的速度越慢。

在这个章节，你将学习 MySQL 的索引相关，包括创建索引、移除索引、列出一张表的所有索引和其他 MySQL 中的索引的重要特性。

# 创建索引

导言：在这部分的教程，你将学习何为索引和如何使用 MySQL 的 `CREATE INDEX` 语句来向一张表添加索引。

## 电话簿的类比

假设你有一个包含了一个城市的所有的人的姓名和电话号码的电话簿。让我们假定一下你想查找 Bob Cat 的电话号码。已知，姓名是按字母表的顺序有序排列的，你首先查找 last name `Cat` 在哪，然后你查找 `Bob` 和他的电话号码。

现在，如果这个电话簿中的名字没有按照字母表的顺序来排列，你将需要浏览整个电话簿的所有页，浏览每个名字直到你找到 `Bob Cat`。这就是所谓的顺序查找(Sequential Searching)。你翻遍所有的条目知道你找到你需要查找的那个人的电话号码。

从电话簿联系到数据库中的表，如果你有一张名为 `phonebooks` 的表，然后你需要查找 `Bob Cat` 的电话号码，你将执行下面的查询：

```sql
SELECT
    phone_number
FROM 
    phonebooks
WHERE 
    first_name = 'Bob' AND 
    last_name = 'Cat';
```

这很简单。尽管这个查询很快，数据库查询的过程还是必须去扫描整张表直到它找到了那一行。如果数据表有几百万行，没有索引的话，这个取出数据的操作将会花费很长的时间来返回结果。

## 索引的介绍

索引是一种类似于 B 树的数据结构，它的作用是用于提到取出数据的速度，当然，它要花费额外的写操作以及内存空间来维持这个数据结构。

对于一个特定的查询来说，查询优化器可能会使用索引来快速定位数据，而不需要扫描整张表。

当你使用 `primary key` 或 `unique key` 创建一张表时，MySQL 会自动创建一个名为 `PRIMARY` 的索引。这个索引叫做聚簇索引(clustered index)。

这个 `PRIMARY` 索引是比较特别的，因为这个索引是和表中的数据存放在同一张表里面的。聚簇索引确保了表中的行的顺序。

其他的除了 `PRIMARY` 的索引被称为第二类索引，或者非聚簇索引。

## MySQL CREATE INDEX 语句

一般来说，你可以在创建表时创建索引。例如，下面的语句创建了一个带有索引的数据表，这个索引由列 `c2` 和 `c3` 组成。

```sql
CREATE TABLE t(
   c1 INT PRIMARY KEY,
   c2 INT NOT NULL,
   c3 INT NOT NULL,
   c4 VARCHAR(10),
   INDEX (c2,c3) 
);
```

要想给一列或者说几列的集合添加一个索引，你可以使用 `CREATE INDEX` 语句，如下：

```sql
CREATE INDEX index_name ON table_name (column_list)
```

要想为一列或者几列的集合创建一个索引，你需要指明索引的名称、索引所属的表的名称和列的集合。

例如，想要为列 c4 添加一个新的索引，你可以使用下面的语句：

```sql
CREATE INDEX idx_c4 ON t(c4);
```

默认情况下，MySQL 会创建 B 树索引，如果你不声明索引类型的话。下面展示了不同的存储引擎所允许的索引类型：

|  存储引擎   | 允许的索引类型 |
| :---------: | :------------: |
|   InnoDB    |      B 树      |
|   MyISAM    |      B 树      |
| MEMORY/HEAP |   HASH, B 树   |

注意，上面的 `CREATE INDEX` 语句是 MySQL 中的 `CREATE INDEX` 的简化版本。我们将会在接下来的教程中介绍更多的选项。

## MySQL CREATE INDEX 范例

下面的语句是用来查询 job title 为 `Sales Rep` 的员工：

```sql
SELECT employeeNumber,
       lastName,
       firstName
FROM employees
WHERE jobTitle = 'Sales Rep';
```

这里是输出：

![](https://i.imgur.com/FKNSYg8.png)

我们查找到了 17 行，表明有 17 个员工的 job title 为 Sales Rep。

想要了解 MySQL 的内部是如何执行这个查询的，你可以在 `SELECT` 语句的开头添加 `EXPLAIN` 子句，如下所示：

![](https://i.imgur.com/lL3IveZ.png)

正如你所看到的，MySQL 必须扫描包含了 23 行的整张表来查找 job title 为 `Sales Rep` 的员工。

现在，让我们使用 `CREATE INDEX` 语句为 `jobTitle` 这一列创建一个索引：

```sql
CREATE INDEX jobTitle ON employees (jobTitle);
```

然后，再次执行之前的语句：

```sql
EXPLAIN
SELECT employeeNumber,
       lastName,
       firstName
FROM employees
WHERE jobTitle = 'Sales Rep';
```

输出如下：

![](https://i.imgur.com/pjCPCRh.png)

如您所见，MySQL 只需按照 `key` 这一列中的指示从 jobTitle 索引中定位 17 行，而无需扫描整个表。

如果想要展示表中所有的索引，你可以使用 `SHOW INDEXES` 语句，例如：

```sql
SHOW INDEXES FROM employees;
```

这里是输出：

![](https://i.imgur.com/khHVgLK.png)

在这一节的教程中，你已经学习了 MySQL 以及如何为表中的一列创建索引。

# MySQL DROP INDEX

导言：在这一节的教程中，你将学习如何使用 `DROP INDEX` 语句来移除表中已经存在的索引。

## MySQL DROP INDEX 语句的语法

若要移除一个表中存在的索引，你可以使用 `DROP INDEX` 语句，如下：

```sql
DROP INDEX index_name ON table_name
[algorithm_option | lock_option];
```

在这个语法中：

- 首先，要在 `DROP INDEX` 关键字后面指明你想删除的索引的名字。
- 然后，指明索引所属的表的名称。

### Algorithm

这个 `algorithm_option` 允许你去指明一个特定的用于移除索引的算法。下面是 `algorithm_option` 从句的语法：

```sql
ALGORITHM [=] {DEFAULT|INPLACE|COPY}
```

对于移除索引的操作，下面是受支持的算法：

- `copy`：当前表会被一行一行地复制到新表，然后 `DROP INDEX` 是在原表的复制品中执行。并发的数据操作语句，比如 `INSERT` 和 `UPDATE` 是不被允许的。
- `INPLACE`：当前表会在原地被重新构建，而不是复制到新的表中。MySQL 在索引删除操作的准备和执行阶段对表发出独占元数据锁。这个算法允许并发的数据操作语句。

注意，`ALGORITHM` 子句是可选的。如果你跳过了它，MySQL 会默认使用 `INPLACE`。在 `INPLACE` 不受支持的情况下，MySQL 会使用 `COPY`。

使用 `DEFAULT` 的效果和省略 `ALGORITHM` 子句的效果是一样的。

### Lock

这个 `lock_option` 是用来控制索引被移除过程中的并发读写的级别。

下面是 `lock_option` 的语法：

```sql
LOCK [=] {DEFAULT|NONE|SHARED|EXCLUSIVE}
```

下面是受支持的锁的模式：

- `DEFAULT`：对于给定的 algorithm，这个选项允许你拥有最大的并发等级。首先，在允许的情况下，它允许并发的读写。否则，允许并发读。否则，只能强制独占。
- `NONE`：
