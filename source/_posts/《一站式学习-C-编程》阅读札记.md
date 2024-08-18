---
title: 《一站式学习 C 编程》阅读札记
date: 2021-11-01 22:16:54
tags:
- C 语言
- 基础
categories:
- C 语言
index_img: https://i.imgur.com/UsVe1zq.png
banner_img: https://i.imgur.com/UsVe1zq.png
---

# 第 1 章 程序的基本概念

> 编写程序可以说就是这样一个过程：把复杂的任务分解成子任务，把子任务再分解成更简单的任务，层层分解，直到最后简单得可以用以上指令来完成。

按：这里所谓的指令是指如下的几种指令：

- 输入（Input）
- 输出（Output）
- 基本运算
- 测试和分支
- 循环

> 一个语句的三种表示，该如何理解？

![](https://i.imgur.com/4teiZhM.png)

对于汇编指令转换到机器指令，这个过程由来汇编器来完成，例如，在第一条指令中，把 mov ?, %eax 这种格式的指令替换成机器码 a1 ?`，?` 表示一个地址，在汇编指令中是 `0x804a01c`，转换成机器码之后是 `1c a0 04 08`（这是指令中十六进制数的小端表示）。

```shell
#! /bin/sh
VAR=1
VAR=$(($VAR+1))
echo $VAR
```

```shell
$ /bin/sh script.sh
2
```

```shell
$ VAR=1
$ VAR=$(($VAR+1))
$ echo $VAR
2
```

> 还有很多编程语言采用编译和解释相结合的方式执行，这种方式相当流行，Java、Python、Perl 等编程语言都采用这种方式。以 Python 为例，程序员写的源代码 .py 文件首先被编译成 .pyc 文件，称为字节码（Byte Code），然后字节码被 Python 虚拟机解释执行。

> 如何理解某个语言是第某代语言？

以上介绍的机器语言称为第一代语言（1GL，1st Generation Programming Language），汇编语言称为第二代语言（2GL，2nd Generation ProgrammingLanguage），C、C++、Java、Python 等可以称为第三代语言（3GL，3rd Generation Programming Language）。目前已经有了 4GL（4th Generation Programming Language）和 5GL（5th Generation Programming Language）的概念。3GL 的编程语言虽然是用语句编程而不直接用指令编程，但语句也分为输入、输出、基本运算、测试分支和循环等几种，和指令有直接的对应关系。而 4GL 以后的编程语言更多是描述要做什么（Declarative）而不描述具体每一步怎么做（Imperative），具体步骤完全由编译器或解释器决定，例如 SQL（SQL，Structured Query Language，结构化查询语言）就是这样的例子。

> 如何理解符号（Token）？

语法规则是由符号（Token）和结构（Structure）的规则所组成的。Token 的概念相当于自然语言中的单词和标点、数学式中的数和运算符、化学分子式中的元素名和数字。

> 如何区分词法规则和语法规则？

关于 Token 的规则称为词法（Lexical）规则，而关于结构的规则称为语法（Grammar）规则。

按：这个在编译原理里面有学习过。

> 阅读程序的建议？

首先请记住形式语言远比自然语言紧凑，所以要多花点时间来读。其次，结构很重要，从上到下从左到右读往往不是一个好办法，而应该学会在大脑里解析：识别 Token，分解结构。

> 关于 Bug 的典故？

早期的计算机体积都很大，有一次一台计算机不能正常工作，工程师们找了半天原因最后发现是一只虫子（Bug）钻进计算机中造成的。从此以后，程序中的错误被叫做 Bug，而找到这些 Bug 并加以纠正的过程就叫做调试（Debug）。

> 几种常见的错误类型？

- 编译时错误
- 运行时错误
- 逻辑错误和语义错误

> 关于 Linux 的一个有趣的东西？

“Linus 的早期工程之一是编写一个交替打印 AAAA 和 BBBB 的程序，这玩意儿后来进化成了 Linux。”

> Linux 下编写 C 语言代码需要安装的一些包？

- gcc: The GNU C compiler
- libc6-dev: GNU C Library: Development Librariesand Header Files
- manpages-dev: Manual pages about usingGNU/Linux for development
- binutils:The GNU assembler,linker and binaryutilities
- gdb: The GNU Debugger
- make: The GNU version of the "make" utility

```c
// filename: main.c
#include <stdio.h>
/* main: generate some simple ouput */

int main(void)
{
    printf("Hello, world.\n");
    return 0;
}
```

```shell
$ gcc main.c
$ ./main
Hello, world.
```

> 如何理解 Linux 下 C 语言程序编译后生成的 a.out 文件？

a.out 是 Assembler Output 的缩写，实际上一个 C 程序要先被编译器翻译成汇编程序，再被汇编器翻译成机器指令，最后还要经过链接器的处理才能成为可执行文件。

```shell
$ gcc main.c -o main
$ ./main
Hello, world.
```

按：这个 `-o` 参数是用来指定文件名的。

> C 程序中的 main 有什么特殊？

C 程序总是从 main 里面的第一条语句开始执行的。

> {} 的英文怎么说？

Brace 或 Curly Brace。

> 一个好的习惯是打开 gcc 的 -Wall 选项，让 gcc 提示所有的警告信息，不管是严重的还是不严重的，然后把这些问题从代码中全部消灭。

按：`-Wall` 大概是 Warning all 的意思。

# 第 2 章 常量、变量和表达式

```c
#include <stdio.h>
/*
* comment1
* main: generate some simple output
*/
int main(void)
{
printf(/* comment2 */"Hello, world.\n"); /* comment3 */
return 0;
}
```

按：注释可以跨行，也可以穿插在程序之中

> `*`，这个星号的英文是啥？

Asterisk.

> 关于 `\* *\` 注释和 `//` 注释的渊源？

似乎，`\* *\` 是比较正统的注释，而 `//`，这个我们通常称为行注释的注释，是从 C++ 中借鉴的语法，在 C99 中被标准化。

> 像 `"Hello, world.\n"` 这种由双引号（Double Quote）引起来的一串字符称为字符串字面值（String Literal），或者简称字符串。

> C 标准规定的转义字符有哪些？

![](https://i.imgur.com/KHq6a9j.png)

> 转义序列有哪两个作用？

一是把普通字符转义成特殊字符，例如把字母 n 转义成换行符；二是把特殊字符转义成普通字符，例如 `\` 和 `"` 是特殊字符，转义后取它的字面值。

> 对 Line Feed 和 Carriage Return 的理解？

Line Feed是跳到下一行（进纸，喂纸，有个喂的动作所以是 feed），Carriage Return 是回到本行开头（Carriage 是卷着纸的轴，随着打字慢慢左移，打完一行就一下子移回最右边，如果你看过欧美的老电影应该能想起来这是什么）。用老式打字机打完一行之后需要这么两个动作，\r\n，所以现在 Windows 平台的文本文件用 \r\n 做换行符，许多应用层网络协议（如 HTTP）也用 \r\n 做换行符，而 Linux 和各种 UNIX 平台的文本文件只用 \n 做换行符。

```c
int main(void)
{
printf("Hello, world.\n");
return 0;
}
```

按：空格和 Tab 一般是无关紧要的。

```c
#include <stdio.h>
int main(void) {printf("Hello, world.\n");return 0;}
```

按：没有换行也可以。

> 好的代码风格？

好的代码风格要求缩进整齐，每个语句一行，适当留空行。

> 常量有哪些？

- 字符（Character）常量
- 整数（Integer）常量
- 浮点数（Floating Point）常量
- 枚举常量

```c
#include <stdio.h>

int main(void)
{
    printf("character: %c\ninteger: %d\nfloating point: %f\n",'}', 34, 3.14);
    return 0;
}
```

> 字符常量有什么注意点？

- 字符常量要用单引号括起来，如 `'}'`，注意单引号只能括一个字符而不能像双引号那样括一串字符；
- 字符常量也可以是一个转义序列，如 `'\n'`，这时虽然单引号括了两个字符，但实际上只表示一个字符；
- 如果在字符常量中要表示双引号 `"` 和问号 `?`，既可以使用转义序列 `\"` 和 `\?`，也可以直接使用字符 `"` 和 `?`，而表示 `'` 和 `\` 则必须使用转义序列。

> 何为格式化字符串（Format String）？

例如：

```c
printf("character: %c\ninteger: %d\nfloating point: %f\n",'}', 34, 3.14);
```

printf 中的第一个字符串称为格式化字符串（Format String），它规定了后面几个常量以何种格式插入到这个字符串中。

> 何为占位符（Placeholder）？

在格式化字符串中，`%` 号（Percent Sign）后面加上字母 c、d、f 分别表示字符型、整型和浮点型的转换说明（Conversion Specification），转换说明只在格式化字符串中占个位置，并不出现在最终的打印结果中，这种用法通常叫做占位符（Placeholder）。

> 转义序列和转换说明有什么区别？

转义序列是在编译时处理的，而转换说明是在运行时调用 printf 函数处理的。

> 在 printf 格式化字符串中怎么表示一个 `%` 字符？

只需要输入两个百分号 `%` 即可，即 `%%`。

> 在 C 语言中如何规定变量的名字和类型？

在 C 语言中用声明（Declaration）来规定变量的名字和类型。

```c
char fred;
int bob;
float jimmy;
double tom;
```

> C 语言的声明有几种？

三种：

- 变量声明
- 函数声明
- 类型声明

> 如何理解声明分为“是定义（Definition）的声明”和“不是定义的声明”？

简单地说，分配存储空间的声明同时也是定义，不分配存储空间的声明不是定义。

> 如何判断变量声明、函数声明、类型声明是否同时是定义？

- 如果一个变量声明要求编译器为它分配存储空间，那么这个声明同时也是变量的定义。
    ```c
    /* 下面这些声明同时也是定义 */
    char fred;
    int bob;
    float jimmy;
    double tom;
    ```
- 如果一个函数声明带有函数体，要求编译器为它生成指令（当然也需要分配存储空间来保存这些指令），那么这个声明同时也是函数的定义。不带函数体的申明不是函数定义。
- 类型声明总是不分配存储空间，所以严格来说只有类型声明而没有类型定义，我们通常所说的“定义了某种类型”其实是“声明了某种类型”。

> 声明和语句的区别？

语句只能出现在函数体中，而声明既可以出现在函数体中也可以出现在所有函数中。

> 浮点型有几种？

三种：

- float 是单精度浮点型；
- double 是双精度浮点型；
- long double 精度更高的浮点型。

> `printf` 的 `%f` 是哪一种浮点？

double。要特别注意，不是 `float`。

```c
char firstletter;
char lastletter;
int hour, minute;
```

按：取名字要注意其意义。

> C 语言给变量起名的限制？

C 语言规定，变量名必须以字母或下划线 `_`（Underscore）开头，后面可以跟若干个字母、数字、下划线，但不能有其他字符。

合法变量名举例：`Abc`、`__abc__`、`_123`。  
不合法变量名举例：`3abc`、`ab$`。

> 何为标识符？

变量名、函数名、宏定义、结构体成员名等，在 C 语言中统称为标识符。

> C99 规定的关键字有哪些？

    auto  break  case  char  const  continue  default  do  double 
    else  enum  extern  float  for  goto  if  inline  int  long 
    register  restrict  return  short  signed  sizeof  static 
    struct  switch  typedef  union  unsigned  void  volatile 
    while  _Bool  _Complex  _Imaginary

> 为何一般要避免使用以下划线开头的标识符？

因为以下划线开头的标识符一般被编译器用作一些功能扩展，所以有时候可能会和 C 标准库中的命名造成冲突。

> What is Best Practice?

就是一般推荐的做法啦。有的书中翻译成最佳实践。

```c
char firstletter;
int hour, minute;
firstletter = 'a'   /* give firstletter the value 'a' */
hour = 11;          /* assign the value 11 to hour */
minute = 59;        /* set minute to 59 */
```

> 如何理解定义变量和给变量赋值？

定义一个变量，就是分配一块存储空间并给它命名；给一个变量赋值，就是把一个值保存到这块存储空间中。

```c
char firstletter = 'a';
int hour = 11, minute = 59;
```

按：变量的定义和赋值可以一步完成，称为变量的初始化（Initialization）。等号右边的值叫做 Initializer。

```c
hour * 60 + minute;
```

按：合法，但是没有意义。

```c
int total_minute;
total_minute = hour * 60 + minute;
```

```c
int total_minute, total;
total = total_minute = hour * 60 + minute;
```

```c
printf("%d:%d is %d minutes after 00:00\n", hour, minute, hour * 60 + minute);
```

按：更复杂的 printf 语句。

```c
printf("%d:%d is %d minutes after 00:00\n", hour, minute, total_minute = hour * 60 + minute);
```

```c
printf("%d hours and %d percent of an hour\n", hour, minute * 100 / 60);
prinf("%d and %f hours\n", hour, minute / 60.0);
```

```c
printf("%c\n", 'a' + 1);
```

按：输出为 `b`。

> char 型本质上就是整数，只不过取值范围比 int 型小。所以我们把 char 型和 int 型统称为整数类型（Integer Type）或简称整型。

> 字符如何用 ASCII 码转义序列表示？

由 `\` 加上 1~3 个八进制数字组成，或者由 `\x` 加上 1~2 个十六进制数字组成，可以用在字符常量或字符串字面值中。

> ASCII 的全写是什么？

American Standard Code for Information Interchange.

例如：`'\0'` 表示 NUL 符（Null Character），`'\11'` 或 `'\x9'` 表示 Tab 字符。注意 `'\0'` 和 `'0'` 的区别。

# 第 3 章 简单函数

```c
#include <math.h>
#include <stdio.h>
int main(void)
{
	double pi = 3.1416;
	printf("sin(pi/2)=%f\nln1=%f\n", sin(pi/2), log(1.0));
	return 0;
}
```

```shell
$ gcc main.c -lm
```

按：使用数学库后面要加 `-lm` 选项。`math.h` 中声明的数学函数位于 `libm.so` 库文件中。`-lm` 选项告诉编译器，我们程序中用到的数学函数要到这个库文件找。大部分库函数（例如：printf）位于 `libc.so` 库文件中，使用 `libc.so` 中的库函数在编译时不需要加 `-lc` 选项，当然加了也不算错，因为这个选项是 gcc 的默认选项。

> printf 的返回值？

返回值为实际打印的字符数。

> 头文件一般在哪里？

头文件一般在 `/usr/include` 目录下。

> 在 Linux 平台上最广泛使用的 C 函数库是 glibc，其中包括 C 标准库的实现。

> C 标准有哪两部分组成？

- 描述 C 的语法的一部分；
- 描述 C 标准库的另一部分。

按：此书中说 libc 时专指 `libc.so` 这个库文件，而说 glibc 时指的是 glibc 提供的所有库文件。

```c
int main(void)
{
    int hour = 11;
    int minute = 59;
    printf("%d and %d hours\n", hour, minute / 60);
}
```

> 如何理解 main 函数？

main 函数的特殊之处在于执行程序时它自动被操作系统调用，操作系统就认准了 main 这个名字，除了名字特殊之外，main 函数和别的函数没有区别。

> 我们将 main 函数中的 return 语句改为 `return 4` 会发生什么？

```shell
$ ./a.out
11 and 0 hours
$ echo $?
4
```

> 如何理解 `$?`？

`$?` 是 Shell 中的一个特殊变量，表示上一条命令的退出状态。

> 关于 main 函数有哪些需要注意的地方？

- 将 main 函数写成 `main(){...}` 的形式，这是 Old Style C 的风格，Old Style C 规定不写返回值就表示返回 int 型，不写参数列表就表示参数类型和个数没有明确指出。然而现在绝对不推荐这种写法。
- main 函数最标准的写法是 `int main(int argc, char *argv[])`，C 标准也允许 `int main(void)` 这种写法，如果不使用系统传进来的两个参数也可以写成这种形式。

```c
#include<stdio.h>
void newline(void)
{
    printf("\n");
}
int main(void)
{
    printf("First Line.\n");
    newline();
    printf("Second Line.\n");
    newline();
    return 0;
}
```

执行结果：

    First Line.

    Second Line.

```c
int main(void)
{
    printf("First Line.\n");
    newline();
    newline();
    newline();
    printf("Second Line.\n");
    return 0;
}
```

按： 插入多个空行。

```c
#include<stdio.h>
void newline(void)
{
    printf("\n");
}
void threeline(void)
{
    newline();
    newline();
    newline();
}
int main(void)
{
    printf("Three lines:\n");
    threelines();
    printf("Another three lines.\n");
    threelines();
    return 0;
}
```

> 何为函数原型（Prototype）？

比如 `void threeline(void)` 这一行，声明了一个函数的名字、参数类型和个数、返回值类型，这称为函数原型。

> 何为函数声明？

比如：

```c
void threelines(void);
```

按：加了分号。

> 何为函数定义？

有函数体的的函数声明叫做函数定义。

> 如果使用不带函数体的声明，可以改变函数的定义顺序，例如：

```c
#include<stdio.h>
void newline(void);
void threelines(void);
int main(void)
{
    printf("Three lines:\n");
    threelines();
    printf("Another three lines.\n");
    threelines();
    return 0;
}
void newline(void)
{
    printf("\n");
}
void threelines(void)
{
    newline();
    newline();
    newline();
}
```

按：如果不使用不带函数体的声明的话，就只能按先 newline 再 threelines 再 main 的顺序定义。

> 由于有 Old Style C 语法的存在，并非所有函数声明都包含完整的函数原型。例如 `void threelines();` 这个声明并没有明确指出参数类型和个数，所以不算函数原型。

> 如果在调用函数之前没有声明会怎样？

```c
#include<stdio.h>
int main(void)
{
    printf("Three lines:\n");
    threelines();
    printf("Another three lines.\n");
    threelines();
    return 0;
}
void newline(void)
{
    printf("\n");
}
void threelines(void)
{
    newline();
    newline();
    newline();
}
```

![](https://i.imgur.com/orCvHQF.png)

按：这里编译能通过，运行结果也是对的。这里涉及的语法规则称为函数的隐式声明。由于在 main 函数中调用 `threeline()` 之前没有声明它，编译器只能根据函数调用来猜测它的原型。但是猜得不对时，遇到下面的定义时，就会报 conflict 警告。

> 两个注意点？

- 如果调用函数时参数列表为空，并且缺少函数原型，则编译器根据隐式声明规则认为参数类型是 void。隐式声明规则会认为默认的返回值为 int。
- 如果声明函数时参数列表为空，则这个声明属于 Old Style C 语法，不算函数原型，编译器认为参数类型和个数没有明确指出。

```c
#include<stdio.h>
void print_time(int hour, int minute)
{
	printf("%d:%d\n", hour, minute);
}
int main(void)
{
	print_time(23, 59);
	return 0;
}
```

按：带参数的自定义函数。

```c
void print_time(int, int);
```

按：如果写一个非定义的函数声明，可以只写参数类型而不写参数名。

> 定义变量和参数的区别？

定义（声明）变量时可以把相同类型的变量列在一起，如

```c
int hour, minute;
```

但是，定义参数是不行的。

> 什么叫最少例外原则？

Rule of Least Surprise.

容易被用户接受。

> Old Style 中如何声明参数？

```c
void foo(x, y, z)
int x;
char z;
{
    ...
}
```

按：不写类型的参数 y 默认是 int 类型。

> 形参和实参的英文？

形参：Parameter

实参：Argument

> 如何理解形参？

形参相当于函数中定义的变量，调用函数传递参数的过程相当于定义形参变量并且用实参的值来初始化。

> Call by Value.

> 有时候我们把函数叫做接口（Interface），调用函数就是使用这个接口，使用接口的前提是必须和接口保持一致。