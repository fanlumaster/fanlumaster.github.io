---
title: Python 快速教程(Part1)
date: 2025-02-18 15:04:33
tags:
  - Python
  - Tutorials
categories:
index_img: https://i.postimg.cc/HWK4SQtk/image.png
banner_img: https://i.postimg.cc/HWK4SQtk/image.png
description: "从 Python 开始学编程。谨以此文祭奠我的编程老师 Vamei 前辈。"
---

## 前言

这是对 vamei 前辈的教程的一次翻新。原教程链接如下，

<https://www.cnblogs.com/vamei/archive/2012/09/13/2682778.html>

vamei 在原教程中写道，

> 怎么能快速地掌握 Python？这是和朋友闲聊时谈起的问题。
> Python 包含的内容很多，加上各种标准库、拓展库，乱花渐欲迷人眼。我一直希望写一个快速的、容易上手的 Python 教程，而且言语简洁，循序渐进，让没有背景的读者也可以从基础开始学习。我将在每一篇中专注于一个小的概念，希望在闲暇时可以很快读完。

事实上，我读完这个系列之后，确实打开了 Python 编程的大门，更重要的是，也踏入了整个编程的世界。希望这个系列的教程对你也有用。无论出于何种目的来学习编程，我都衷心地希望你能够体会到编程的乐趣。

本教程也配备了相应的视频，可以移步 [bilibili](https://space.bilibili.com/3493138859559908) 观看。

**小提醒**

1. 教程基于 Python3.13，测试环境为 Windows11。
2. 标准库的一些包不适用于 Windows 平台。如果文中的程序无法在你的平台上运行，欢迎讨论。
3. 我将专注于 Python 的主干，以便读者（观众）能以最快时间对 Python 形成概念。
4. 命令行将以 `$` 开始，比如 `ls`, `python`。
5. Python 命令行将以 `>>>` 开始，比如 `>>>print('Hello World!')`。
6. 注释会以 `#` 开始。

**建议**

- 将教程中的命令敲到 Python 中看看效果。
- 看过教程之后，可以进行一些练习。
- 参与文章（视频）评论区的讨论，可以更好的积累经验。

## Python 基础

### 一、Python 基础 01 Hello World!

简单的 `Hello World!`。

#### Python 命令行

假设你已经安装好了 Python, 那么在 Powershell 命令行输入：

```powershell
$ python
```

将直接进入 python。然后在命令行提示符 `>>>` 后面输入：

```powershell
>>> print('Hello World!')
```

可以看到，随后在屏幕上输出：

```
Hello World!
```

`print` 是一个常用函数，其功能就是输出括号中的字符串。

#### 写一段小程序

另一个使用 Python 的方法，是写一个 Python 程序。用文本编辑器写一个 `.py` 结尾的文件，比如说 `hello.py`。

在 `hello.py` 中写入如下，并保存：

```py
print('Hello World!')
```

退出文本编辑器，然后在命令行输入：

```powershell
$ python .\hello.py
```

来运行 hello.py。可以看到 Python 随后输出，

```py
Hello World!
```

#### 总结

`print`

命令行模式：运行 Python，在命令行输入命令并执行。

程序模式：写一段 Python 程序并运行。

---

### 二、python 基础 02 基本数据类型

简单的数据类型以及赋值。

#### 变量不需要声明

Python 的变量不需要声明，你可以直接输入：

```python
>>> a = 10
```

那么你的内存里就有了一个变量 a， 它的值是 10，它的类型是 integer （整数）。 在此之前你不需要做什么特别的声明，而数据类型是 Python 自动决定的。

```python
>>> print(a)
>>> print(type(a))
```

那么会有如下输出：

```
10
<class 'int'>
```

这里，我们学到一个内置函数 type(), 用以查询变量的类型。

#### 回收变量名

如果你想让 a 存储不同的数据，你不需要删除原有变量就可以直接赋值。

```python
>>> a = 1.3
>>> print(a, type(a))
```

会有如下输出

```
1.3 <class 'float'>
```

我们看到 <span style="color: pink">print 的另一个用法</span>，也就是 print 后跟多个输出，以逗号分隔。

#### 基本数据类型

```python
a=10 # int 整数

a=1.3 # float 浮点数

a=True # 真值 (True/False)

a='Hello!' # 字符串。字符串也可以用双引号。
```

以上是最常用的数据类型。此外还有分数，字符，复数等其他类型，有兴趣的可以学习一下。

#### 总结

变量不需要声明，不需要删除，可以直接回收使用。

`type()`: 查询数据类型

整数，浮点数，真值，字符串

---

### 三、Python 基础 03 序列

#### sequence 序列

sequence（序列）是一组<span style="color: pink">有顺序</span>的<span style="color: pink">元素</span>的<span style="color: pink">集合</span>

（严格的说，是对象的集合，但鉴于我们还没有引入“对象”概念，暂时说元素）

序列可以包含一个或多个 <span style="color: pink">元素</span> ，也可以没有任何元素。

我们之前所说的基本数据类型，都可以作为序列的元素。元素还可以是另一个序列，以及我们以后要介绍的其他对象。

序列有两种：tuple（ <span style="color: pink">定值表</span> ； 也有翻译为 <span style="color: pink">元组</span> ） 和 list (<span style="color: pink">表</span>)

```python
>>>s1 = (2, 1.3, 'love', 5.6, 9, 12, False)         # s1 是一个 tuple

>>>s2 = [True, 5, 'smile']                          # s2 是一个 list

>>>print(s1,type(s1))

>>>print(s2,type(s2))
```

tuple 和 list 的主要区别在于，一旦建立， <span style="color: pink">tuple 的各个元素不可再变更，而 list 的各个元素可以再变更</span> 。

一个序列作为另一个序列的元素

```python
>>>s3 = [1,[3,4,5]]
```

空序列

```python
>>>s4 = []
```

#### 元素的引用

序列元素的 <span style="color: pink">下标</span> 从 0 开始：

```python
>>>print(s1[0])

>>>print(s2[2])

>>>print(s3[1][2])
```

由于 list 的元素可变更，你可以对 list 的某个元素赋值：

```python
>>>s2[1] = 3.0

>>>print(s2)
```

如果你对 tuple 做这样的操作，会得到错误提示。

所以，可以看到，序列的引用通过 `s[<int>]` 实现， int 为下标

#### 其他引用方式

范围引用： 基本样式 `[下限：上限：步长]`

```python
>>>print(s1[:5])             # 从开始到下标 4 （下标 5 的元素 不包括在内）

>>>print(s1[2:])             # 从下标 2 到最后

>>>print(s1[0:5:2])          # 从下标 0 到下标 4 （下标 5 不包括在内），每隔 2 取一个元素 （下标为 0，2，4 的元素）

>>>print(s1[2:0:-1])         # 从下标 2 到下标 1
```

从上面可以看到，在范围引用的时候，如果写明上限，那么这个 <span style="color: pink">上限本身不包括在内</span> 。

尾部元素引用

```python
>>>print(s1[-1])             # 序列最后一个元素

>>>print(s1[-3])             # 序列倒数第三个元素
```

同样，如果 `s1[0:-1]`, 那么最后一个元素不会被引用 （再一次， <span style="color: pink">不包括上限元素本身</span> ）

#### 字符串是元组

字符串是一种特殊的元组，因此可以执行元组的相关操作。

```python
>>>str = 'abcdef'

>>>print(str[2:4])
```

#### 总结

tuple 元素不可变，list 元素可变

序列的引用 `s[2]`, `s[1:8:2]`

字符串是一种 tuple

---

### 四、Python 基础 04 运算

Python 的运算符和其他语言类似

（我们暂时只了解这些运算符的基本用法，方便我们展开后面的内容，高级应用暂时不介绍）

#### 数学运算

```python
print(1 + 9)        # 加法
print(1.3 - 4)      # 减法
print(3 * 5)        # 乘法
print(4.5 / 1.5)    # 除法
print(3 ** 2)       # 乘方
print(10 % 3)       # 求余数
```

#### 判断

判断是真还是假，返回 True/False

```python
print(5 == 6)               # ==, 相等
print(8.0 != 8.0)           # !=, 不等
print(3 < 3, 3 <= 3)        # <, 小于；<=, 小于等于
print(4 > 5, 4 >= 0)        # >, 大于；>=, 大于等于
print(5 in [1, 3, 5])       # 5 是否是 list [1,3,5] 的一个元素
```

（还有 `is`，`is not` 等，暂时不深入）

#### 逻辑运算

`True/False` 之间的运算

```python
print(True and True, True and False)  # and, “与”运算，两者都为真才是真
print(True or False)                  # or, "或"运算， 其中之一为真即为真
print(not True)                        # not, “非”运算， 取反
```

可以和上一部分结合做一些练习，比如：

```python
print(5 == 6 or 3 >= 3)
```

#### 总结

**数学运算**: `+`, `-`, `*`, `/`, `**`, `%`

**判断运算**: `==`, `!=`, `>`, `>=`, `<`, `<=`, `in`

**逻辑运算**: `and`, `or`, `not`

---

### 五、Python 基础 05 缩进和选择

#### 缩进

Python 最具特色的是用缩进来标明成块的代码。我下面以 if 选择结构来举例。if 后面跟随条件，如果条件成立，则执行归属于 if 的一个代码块。

先看 C 语言的表达方式（注意，<span style="color: pink">这是 C，不是 Python!</span> ）

```c
if ( i > 0 )
{
    x = 1;
    y = 2;
}
```

如果 i > 0 的话，我们将进行括号中所包括的两个赋值操作。括号中包含的就是块操作，它隶属于 if。

在 Python 中，同样的目的，这段话是这样的

```python
if i > 0:
    x = 1
    y = 2
```

在 Python 中， 去掉了 i > 0 周围的括号，去除了每个语句句尾的分号，表示块的花括号也消失了。

多出来了 if ...之后的:(<span style="color: pink">冒号</span>), 还有就是 x = 1 和 y =2 前面有四个空格的缩进。通过缩进，Python 识别出这两个语句是隶属于 if。

Python 这样设计的理由纯粹是为了程序好看。

#### if 语句

写一个完整的程序，命名为 `ifDemo.py`。这个程序用于实现 if 结构。

```python
i = 1
x = 1
if i > 0:
    x = x+1
print(x)
```

```powershell
$python ifDemo.py  # 运行
```

程序运行到 if 的时候，条件为 True，因此执行 `x = x+1`,。

`print(x)` 语句没有缩进，那么就是 if 之外。

如果将第一句改成 i = -1，那么 if 遇到假值 (False), x = x+1 隶属于 if, 这一句跳过。 print(x) 没有缩进，是 if 之外，不跳过，继续执行。

这种以四个空格的缩进来表示隶属关系的书写方式，以后还会看到。强制缩进增强了程序的可读性。

复杂一些的 if 选择：

```python
i = 1

if i > 0:
    print('positive i')
    i = i + 1
elif i == 0:
    print('i is 0')
    i = i * 10
else:
    print('negative i')
    i = i - 1

print('new i:',i)
```

这里有三个块，分别属于 <span style="color: pink">if, elif, else</span> 引领。

Python 检测条件，如果发现 if 的条件为假，那么跳过后面紧跟的块，检测下一个 elif 的条件； 如果还是假，那么执行 else 块。

通过上面的结构将程序分出三个分支。程序根据条件，只执行三个分支中的一个。

整个 if 可以放在另一个 if 语句中，也就是 if 结构的嵌套使用：

```python
i  = 5
if i > 1:
    print('i bigger than 1')
    print('good')
    if i > 2:
        print('i bigger than 2')
        print('even better')
```

if i > 2 后面的块相对于该 if 缩进了四个空格，以表明其隶属于该 if，而不是外层的 if。

#### 总结

if 语句之后的冒号

以四个空格的缩进来表示隶属关系, Python 中不能随意缩进

```python
if  <条件1>:
    statement
elif <条件2>:
    statement
elif <条件3>：
    statement
else:
    statement
```

---

### 六、Python 基础 06 循环

循环用于重复执行一些程序块。从上一讲的选择结构，我们已经看到了如何用缩进来表示程序块的隶属关系。循环也会用到类似的写法。

#### for 循环

for 循环需要预先设定好循环的次数(n)，然后执行隶属于 for 的语句 n 次。

基本构造是

```python
for 元素 in 序列:
    statement
```

举例来说，我们编辑一个叫 forDemo.py 的文件

```python
for a in [3,4.4,'life']:
    print(a)
```

这个循环就是每次从表 `[3,4.4,'life']` 中取出一个元素（回忆：表是一种序列），然后将这个元素赋值给 a，之后执行隶属于 for 的操作(print)。

介绍一个新的 Python 函数 <span style="color: pink">range()</span> ，来帮助你建立表。

```python
idx = range(5) # 这是一个迭代器
print(idx)
print(list(idx))
```

可以看到输出是：

```
range(0, 5)
[0, 1, 2, 3, 4]
```

这个函数的功能是新建一个表。这个表的元素都是整数，从 0 开始，下一个元素比前一个大 1， 直到函数中所写的上限 （不包括该上限本身）

举例

```python
for a in range(10):
    print(a**2)
```

#### while 循环

while 的用法是

```python
while 条件:
    statement
```

while 会不停地循环执行隶属于它的语句，<span style="color: pink">直到条件为假</span> (False)

举例

```python
i = 0
while i < 10:
    print(i)
    i = i + 1
```

#### 中断循环

```python
continue   # 在循环的某一次执行中，如果遇到continue, 那么跳过这一次执行，进行下一次的操作

break      # 停止执行整个循环
```

```python
for i in range(10):
    if i == 2:
        continue
    print(i)
```

当循环执行到 i = 2 的时候，if 条件成立，触发 continue, 跳过本次执行(不执行 print)，继续进行下一次执行(i = 3)。

```python
for i in range(10):
    if i == 2:
        break
    print(i)
```

当循环执行到 `i = 2` 的时候，if 条件成立，触发 break, 整个循环停止。

#### 总结

range()

for 元素 in 序列:

while 条件:

continue

break

---

### 七、Python 基础 07 函数

函数最重要的目的是方便我们重复使用相同的一段程序。

将一些操作隶属于一个函数，以后你想实现相同的操作的时候，只用调用函数名就可以，而不需要重复敲所有的语句。

#### 函数的定义

首先，我们要定义一个函数, 以说明这个函数的功能。

```python
def square_sum(a,b):
    c = a**2 + b**2
    return c
```

这个函数的功能是求两个数的平方和。

首先，def，这个关键字通知 python：我在定义一个函数。square_sum 是函数名。

括号中的 a, b 是函数的 <span style="color: pink">参数</span>，是对函数的 <span style="color: pink">输入</span>。参数可以有多个，也可以完全没有（但括号要保留）。

我们已经在循环和选择中见过 <span style="color: pink">冒号</span> 和 <span style="color: pink">缩进</span> 来表示的隶属关系。

```python
c = a**2 + b**2        # 这一句是函数内部进行的运算

return c               # 返回c的值，也就是输出的功能。Python的函数允许不返回值，也就是不用return。
```

return 可以 <span style="color: pink">返回多个值</span> ，以逗号分隔。相当于返回一个 tuple(定值表)。

```python
return a,b,c          # 相当于 return (a,b,c)
```

在 Python 中，当程序执行到 return 的时候，程序将 <span style="color: pink">停止执行函数内余下的语句</span> 。return 并不是必须的，当没有 return, 或者 return 后面没有返回值时，函数将自动返回 <span style="color: pink">None</span> 。None 是 Python 中的一个特别的数据类型，用来表示 <span style="color: pink">什么都没有</span> ，相当于 C 中的 NULL。None 多用于关键字参数传递的默认值。

#### 函数调用和参数传递

定义过函数后，就可以在后面程序中使用这一函数

```python
print(square_sum(3,4))
```

Python 通过 <span style="color: pink">位置</span> ，知道 3 对应的是函数定义中的第一个参数 a， 4 对应第二个参数 b，然后把 <span style="color: pink">参数传递</span> 给函数 square_sum。

（Python 有丰富的参数传递方式，还有关键字传递、表传递、字典传递等，基础教程将只涉及位置传递）

函数经过运算，返回值 25, 这个 25 被 print 打印出来。

我们再看下面两个例子

```python
a = 1

def change_integer(a):
    a = a + 1
    return a

print(change_integer(a))
print(a)

#===(Python中 "#" 后面跟的内容是注释，不执行 )

b = [1,2,3]

def change_list(b):
    b[0] = b[0] + 1
    return b

print(change_list(b))
print(b)
```

第一个例子，我们将一个 <span style="color: pink">整数变量传递给函数</span>，函数对它进行操作，但 <span style="color: pink">原整数变量 a 不发生变化</span>。

第二个例子，我们将一个 <span style="color: pink">表传递给函数</span>，函数进行操作，<span style="color: pink">原来的表 b 发生变化</span>。

对于基本数据类型的变量，变量传递给函数后，函数会在内存中复制一个新的变量，从而不影响原来的变量。（我们称此为 <span style="color: pink">值传递</span>）

但是对于表来说，表传递给函数的是一个指针，指针指向序列在内存中的位置，在函数中对表的操作将在原有内存中进行，从而影响原有变量。 （我们称此为 <span style="color: pink">指针传递</span>）

#### 总结

```python
def function_name(a,b,c):
    statement
    return something  # return不是必须的
```

函数的目的： 提高程序的重复可用性。

return None

通过位置，传递参数。

基本数据类型的参数：值传递

表作为参数：指针传递

练习:

写一个判断闰年的函数，参数为年、月、日。若是是闰年，返回 True

---

### 八、Python 基础 08 面向对象的基本概念

Python 使用类(class)和对象(object)，进行面向对象（object-oriented programming，简称 OOP）的编程。

面向对象的最主要目的是提高程序的重复使用性。我们这么早切入面向对象编程的原因是，Python 的整个概念是基于对象的。了解 OOP 是进一步学习 Python 的关键。

下面是对面向对象的一种理解，基于分类。

#### 相近对象，归为类

在人类认知中，会根据 <span style="color: pink">属性相近</span> 把东西 <span style="color: pink">归类</span>，并且给类别命名。比如说，鸟类的共同属性是有羽毛，通过产卵生育后代。任何一只特别的鸟都在鸟类的 <span style="color: pink">原型</span> 基础上的。

面向对象就是模拟了以上人类认知过程。在 Python 语言，为了听起来酷，我们把上面说的“东西”称为对象（object）。

先定义鸟类

```python
class Bird(object):
    have_feather = True
    way_of_reproduction  = 'egg'
```

我们定义了一个类别（class），就是鸟（Bird）。在隶属于这个类比的语句块中，我们定义了两个变量，一个是有羽毛（have_feather），一个是生殖方式（way_of_reproduction）,这两个变量对应我们刚才说的属性（attribute）。我们暂时先不说明括号以及其中的内容，记为 <span style="color: pink">问题 1</span>。

假设我养了一只小鸡，叫 summer。它是个对象，且属于鸟类。使用前面定义的类：

```python
summer = Bird()
print(summer.way_of_reproduction)
```

通过第一句创建对象，并说明 summer 是类别鸟中的一个对象，summer 就有了鸟的类属性，对属性的引用是通过 <span style="color: pink">对象.属性（object.attribute）</span> 的形式实现的。

可怜的 summer，你就是个有毛产的蛋货，好不精致。

#### 动作

日常认知中，我们在通过属性识别类别的时候，有时根据这个东西 <span style="color: pink">能做什么事情</span> 来区分类别。比如说，鸟会移动。这样，鸟就和房屋的类别区分开了。这些动作会带来一定的结果，比如移动导致位置的变化。

这样的一些“行为”属性为 <span style="color: pink">方法（method）</span>。Python 中通过在类的内部定义函数，来说明方法。

```python
class Bird(object):
    have_feather = True
    way_of_reproduction = 'egg'
    def move(self, dx, dy):
        position = [0,0]
        position[0] = position[0] + dx
        position[1] = position[1] + dy
        return position

summer = Bird()
print('after move:',summer.move(5,8))
```

我们重新定义了鸟这个类别。鸟新增一个方法属性，就是表示移动的方法 move。（我承认这个方法很傻，你可以在看过下一讲之后定义个有趣些的方法）

（它的参数中有一个 self，它是为了方便我们引用对象自身。 <span style="color: pink">方法的第一个参数必须是 self，无论是否用到。</span> 有关 self 的内容会在下一讲展开）

另外两个参数，dx, dy 表示在 x、y 两个方向移动的距离。move 方法会最终返回运算过的 position。

在最后调用 move 方法的时候，我们只传递了 dx 和 dy 两个参数，不需要传递 self 参数（因为 self 只是为了内部使用）。

我的 summer 可以跑了。

#### 子类

类别本身还可以进一步细分成子类

比如说，鸟类可以进一步分成鸡，大雁，黄鹂。

在 OOP 中，我们通过 <span style="color: pink">继承(inheritance)</span> 来表达上述概念。

```python
class Chicken(Bird):
    way_of_move = 'walk'
    possible_in_KFC = True

class Oriole(Bird):
    way_of_move = 'fly'
    possible_in_KFC = False

summer = Chicken()
print(summer.have_feather)
print(summer.move(5,8))
```

新定义的鸡（Chicken）类的，增加了两个属性：移动方式（way_of_move），可能在 KFC 找到（possible_in_KFC）

在类定义时，括号里为 Bird。这说明，Chicken 是属于鸟类（Bird）的一个 <span style="color: pink">子类</span>，即 Chicken 继承自 Bird。自然而然，Bird 就是 Chicken 的 <span style="color: pink">父类</span>。<span style="color: pink">Chicken 将享有 Bird 的所有属性</span>。尽管我只声明了 summer 是鸡类，它通过继承享有了父类的属性（无论是变量属性 have_feather 还是方法属性 move）

新定义的黄鹂(Oriole)类，同样继承自鸟类。在创建一个黄鹂对象时，该对象自动拥有鸟类的属性。

通过继承制度，我们可以减少程序中的重复信息和重复语句。如果我们分别定义两个类，而不继承自鸟类，就必须把鸟类的属性分别输入到鸡类和黄鹂类的定义中。整个过程会变得繁琐，因此，面向对象提高了程序的 <span style="color: pink">可重复使用性</span>。

（回到 <span style="color: pink">问题 1</span>, 括号中的 object，当括号中为 <span style="color: pink">object</span> 时，说明这个类没有父类（到头了），其实，object 是 Python 中所有类的父类，是最顶层的父类，如果这里不写 object，那么，也会默认隐式继承 object）

将各种各样的东西分类，从而了解世界，从人类祖先开始，我们就在练习了这个认知过程，面向对象是符合人类思维习惯的。所谓面向过程，也就是执行完一个语句再执行下一个，更多的是机器思维。通过面向对象的编程，我们可以更方便的表达思维中的复杂想法。

#### 总结

将东西根据属性归类 ( 将 object 归为 class )

方法是一种属性，表示动作

用继承来说明父类-子类关系。子类自动具有父类的所有属性。

self 代表了根据类定义而创建的对象。

建立对一个对象： 对象名 = 类名()

引用对象的属性： `object.attribute`

---

### 九、Python 基础 09 面向对象的进一步拓展

我们熟悉了对象和类的基本概念。我们将进一步拓展，以便能实际运用对象和类。

#### 调用类的其它信息

上一讲中提到，在定义方法时，必须有 self 这一参数。这个参数表示某个对象。对象拥有类的所有性质，那么我们可以通过 self，调用类属性。

```python
class Human(object):
    laugh = 'hahahaha'
    def show_laugh(self):
        print(self.laugh)
    def laugh_100th(self):
        for i in range(100):
            self.show_laugh()

li_lei = Human()
li_lei.laugh_100th()
```

这里有一个类属性 laugh。在方法 show_laugh()中，<span style="color: pink">通过 self.laugh，调用了该属性的值</span>。

还可以用相同的方式调用其它方法。方法 show_laugh()，在方法 laugh_100th 中()被调用。

通过对象可以修改类属性值。但这是危险的。类属性被所有同一类及其子类的对象共享。类属性值的改变会影响所有的对象。

#### `__init__()` 方法

`__init__()` 是一个特殊方法(special method)。Python 有一些特殊方法。Python 会特殊的对待它们。特殊方法的特点是名字前后有两个下划线。

如果你在类中定义了 `__init__()` 这个方法，创建对象时，Python 会自动调用这个方法。这个过程也叫初始化。

```python
class happyBird(Bird):
    def __init__(self,more_words):
        print('We are happy birds.',more_words)

summer = happyBird('Happy,Happy!')
```

这里继承了 Bird 类，它的定义见上一讲。

屏幕上打印：

```
We are happy birds. Happy,Happy!
```

我们看到，尽管我们只是创建了 summer 对象，但**init**()方法被自动调用了。最后一行的语句(summer = happyBird...)先创建了对象，然后执行：

```python
summer.__init__(more_words)
```

`'Happy,Happy!'` 被传递给了 `__init__()` 的参数 more_words

#### 对象的性质

我们讲到了许多属性，但这些属性是 <span style="color: pink">类的属性</span>。所有属于该类的对象会共享这些属性。比如说，鸟都有羽毛，鸡都不会飞。

在一些情况下，我们定义对象的性质，用于记录该对象的特别信息。比如说，人这个类。性别是某个人的一个性质，不是所有的人类都是男，或者都是女。这个 <span style="color: pink">性质的值随着对象的不同而不同</span>。李雷是人类的一个对象，性别是男；韩美美也是人类的一个对象，性别是女。

当定义类的方法时，必须要传递一个 self 的参数。这个参数指代的就是类的一个对象。我们可以通过操纵 self，来修改某个对象的性质。比如用类来新建一个对象，即下面例子中的 li_lei, 那么 li_lei 就被 self 表示。我们通过赋值给 <span style="color: pink">self.attribute</span>，给 li_lei 这一对象增加一些 <span style="color: pink">性质</span>，比如说性别的男女。self 会传递给各个方法。在方法内部，可以通过引用 self.attribute，查询或修改对象的性质。

这样，在 <span style="color: pink">类属性</span> 的之外，又给每个对象增添了 <span style="color: pink">各自特色的性质</span>，从而能描述多样的世界。

```python
class Human(object):
    def __init__(self, input_gender):
        self.gender = input_gender
    def printGender(self):
        print(self.gender)

li_lei = Human('male') # 这里，'male'作为参数传递给__init__()方法的input_gender变量。
print(li_lei.gender)
li_lei.printGender()
```

在初始化中，将参数 input_gender，赋值给对象的性质，即 self.gender。

li_lei 拥有了对象性质 gender。gender 不是一个类属性。Python 在建立了 li_lei 这一对象之后，使用 li_lei.gender 这一对象性质，专门储存属于对象 li_lei 的特有信息。

对象的性质也可以被其它方法调用，调用方法与类属性的调用相似，正如在 printGender()方法中的调用。

#### 总结

通过 self 调用类属性

`__init__()`: 在建立对象时自动执行

类属性和对象的性质的区别

---

### 十、Python 基础 10 反过头来看看

从最初的“Hello World”，走到面向对象。该回过头来看看，教程中是否遗漏了什么。

我们之前提到一句话，"Everything is Object". 那么我们就深入体验一下这句话。

需要先要介绍两个内置函数，`dir()` 和 `help()`

`dir()` 用来查询一个类或者对象所有属性。你可以尝试一下

```python
>>>print(dir(list))
```

`help()` 用来查询的说明文档。你可以尝试一下

```python
>>>print(help(list))
```

(list 是 Python 内置的一个类，对应于我们之前讲解过的列表)

#### list 是一个类

在上面以及看到，表是 Python 已经定义好的一个类。当我们新建一个表时，比如：

```python
>>>nl = [1,2,5,3,5]
```

实际上，nl 是类 list 的一个对象。

实验一些 list 的方法：

```python
>>>print(nl.count(5))       # 计数，看总共有多少个5

>>>print(nl.index(3))       # 查询 nl 的第一个3的下标

>>>nl.append(6)            # 在 nl 的最后增添一个新元素6

>>>nl.sort()               # 对nl的元素排序

>>>print(nl.pop())          # 从nl中去除最后一个元素，并将该元素返回。

>>>nl.remove(2)            # 从nl中去除第一个2

>>>nl.insert(0,9)          # 在下标为0的位置插入9
```

总之，list 是一个类。每个列表都属于该类。

Python 补充中有 list 常用方法的附录。

#### 运算符是特殊方法

使用 dir(list)的时候，能看到一个属性，是**add**()。从形式上看是 <span style="color: pink">特殊方法（下划线，下划线）</span>。它特殊在哪呢？

这个方法定义了"+"运算符对于 list 对象的意义，两个 list 的对象相加时，会进行的操作。

```python
>>>print([1,2,3] + [5,6,9])
```

<span style="color: pink">运算符</span>，比如+, -, >, <, 以及下标引用[start:end]等等，从根本上都是定义在类内部的 <span style="color: pink">方法</span>。

尝试一下

```python
>>>print([1,2,3] - [3,4])
```

会有错误信息，说明该运算符“-”没有定义。现在我们继承 list 类，添加对"-"的定义

```python
class superList(list):
    def __sub__(self, b):
        a = self[:]     # 这里，self是supeList的对象。由于superList继承于list，它可以利用和list[:]相同的引用方法来表示整个对象。
        b = b[:]
        while len(b) > 0:
            element_b = b.pop()
            if element_b in a:
                a.remove(element_b)
        return a

print(superList([1,2,3]) - superList([3,4]))
```

内置函数 `len()` 用来返回 list 所包含的元素的总数。内置函数**sub**()定义了“-”的操作：从第一个表中去掉第二个表中出现的元素。如果**sub**()已经在父类中定义，你又在子类中定义了，那么子类的对象会参考子类的定义，而不会载入父类的定义。任何其他的属性也是这样。

（教程最后也会给出一个 <span style="color: pink">特殊方法</span> 的清单）

定义运算符对于复杂的对象非常有用。举例来说，人类有多个属性，比如姓名，年龄和身高。我们可以把人类的比较（>, <, =）定义成只看年龄。这样就可以根据自己的目的，将原本不存在的运算增加在对象上了。

#### 下一步

希望你已经对 Python 有了一个基本了解。你可能跃跃欲试，要写一些程序练习一下。这会对你很有好处。

但是，Python 的强大很大一部分原因在于，它提供有很多 <span style="color: pink">已经写好的，可以现成用的对象</span>。我们已经看到了内置的比如说 list，还有 tuple 等等。它们用起来很方便。在 Python 的标准库里，还有大量可以用于操作系统互动，Internet 开发，多线程，文本处理的对象。而在所有的这些的这些的基础上，又有很多外部的库包，定义了更丰富的对象，比如 numpy, tkinter, django 等用于科学计算，GUI 开发，web 开发的库，定义了各种各样的对象。对于一般用户来说，使用这些库，要比自己去从头开始容易得多。我们要开始攀登巨人的肩膀了。

谢谢你的关注，

欢迎来到 Python 的世界。

#### 总结

`len() dir() help()`

数据结构 list(列表)是一个类。

运算符是方法
