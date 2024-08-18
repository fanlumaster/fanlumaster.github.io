---
title: 《flex 与 bison 中文版》阅读札记
date: 2021-11-01 15:36:26
tags:
- 编译原理
categories:
index_img: https://i.imgur.com/T1awFaD.png
banner_img: https://i.imgur.com/T1awFaD.png
---

在阅读本书的过程中，我使用的系统是 Ubuntu 20.04。

安装 flex 和 bison 在 Linux 系统中是一件很简单的事情，直接命令行安装即可。安装完可以检查一下版本来看看是否安装成功。

![](https://i.imgur.com/ZQX99q4.png)

# 第 1 章 Flex 和 Bison 简介

> flex 程序的组成？

flex 程序主要由一系列带有指令的正则表达式组成，这些指令确定了正则表达式匹配后相应的动作（action）。由 flex 生成的词法分析器可以读取输入，匹配输入与所有正则表达式并且执行每次匹配后适当的关联动作。

> 第一个程序如何理解？

```c
/* 正如 Unix 的 wc 程序 */
%{
int chars = 0;
int words = 0;
int lines = 0;
%}
%%
[a-zA-Z]+   { words++; chars += strlen(yytext); }
\n          { chars++; lines++; }
.           { chars++; }
%%

int main(int argc, char **argv)
{
    yylex();
    printf("%8d%8d%8d\n", lines, words, chars);
    return 0;
}
```

flex 程序包含三个部分，各部分之间通过仅有 `%%` 的行来分割。

- 第一个部分包含声明和选项设置；
- 第二个部分是一系列的模式（pattern）和动作；
- 第三部分是会被拷贝到生成的词法分析器里面的 C 代码，它们通常是一些与动作代码相关的例程。

在声明部分，`%{` 和 `%}` 之间的代码会被原样照抄到生成的 C 文件的开头部分。在这个例子里面，它只是用来设定了行数、单词数和字符数的变量。

在第二部分，

- `[a-zA-Z]+`，用来匹配一个单词，相关的动作是更新匹配过的单词和字符的个数。需要注意的是，变量 `yytext` 总是被设为指向本次匹配的输入文本。
- `\n`，用来匹配换行符。相关的动作更新行数和字符数。
- `.`，匹配任意一个字符。关联的动作更新字符数。

> 也许读者会问，如果 `.` 代表匹配所有的字符，难道它不会也匹配第一个模式所应该匹配的字母吗？答案是肯定的，但是 flex 棋高一着的地方是它总是选择更长的匹配，而且如果两个模式都匹配的，flex 会选择在程序里面首先出现的那个模式。

```shell
$ flex fb1-1.l
$ cc lex.yy.c -lfl
$ ./a.out
The boy stood on the burning deck
shelling peanuts by the peck
^D
2 12 63
```

![](https://i.imgur.com/BGAhqpZ.png)

注意几点：

- 1）`cc` 这里表示使用系统默认的 C 编译器进行编译，这里是 gcc；
- 2）`-lfl` 中两个都是字母 `l`；
- 3）`^D` 在 Ubuntu 中没有显示。

```c
[^ \t\n\r\f\v]+    { words++; chars += strlen(yytext); }
```

按：匹配没有空白字符的字符串。`^` 指匹配任意一个不在字符类里面的字符。

```c
/* 英式英语 -> 美式英语 */
%%
"colour" { printf("color"); }
"flavour" { printf("smart"); }
"smart" { printf("elegant"); }
"conservative" { printf("liberal"); }
··· 其他更多的单词 ···
. { printf("%s", yytext); }
%%
```

按：这个程序当然是不能直接跑起来的。

```c
/* 识别出用于计算器的记号并把它输出 */

%%
"+"     { printf("PLUS\n"); }
"-"     { printf("MINUS\n"); }
"*"     { printf("TIMES\n"); }
"/"     { printf("DIVIDE\n"); }
"|"     { printf("ABS\n"); }
[0-9]+  { printf("NUMBER %s\n", yytext); }
\n      { printf("NEWLINE\n"); }
[ \t]   { }
.       { printf("Mystery character %s\n", yytext); }
%%
%%
```

按：前 5 个模式就是操作符本身，用引号引起。引号告诉 flex 使用引号内文本的原义，而不是把它们解释成正则表达式。  
然后，对于这段程序，我们并没有第三段的 C 代码，但是 flex 库文件（`-lfl`）提供了一个极小的主程序来调用词法分析器。

![](https://i.imgur.com/9sJL97z.png)

> `^D` 是 Unix/Linux 的文件结束符。在 Windows 中，你可以输入 `^Z`。

> 每当程序需要一个记号时，它调用 `yylex()` 来读取一小部分输入然后返回相应的记号。当程序需要下一个记号时，`yylex()` 会被再次调用。

> 词法分析器以协同程序的方式来运行，也就是说，它会记住当前处理的位置，并从这个位置开始去处理下一次调用。

按：关于协同程序，《一站式学习 C 编程》中应该有讲。

```c
"+"     { return ADD; }
[0-9]+  { return NUMBER; }
[ \t]   { /* 忽略空白字符 */ }
```

按：如果有动作返回，词法分析会在下一次 `yylex()` 调用时继续，如果动作没有返回，词法分析程序将会继续进行。

> 当 bison 创建一个语法分析器时，bison 自动地从 258 起指派每个记号编号，并且创建一个包含这些编号定义的 `.h` 文件。

![](https://i.imgur.com/kgU2mAr.png)

> bison 起源？

bison 来源于 yacc，yacc 是 "yet another compiler compiler" 的缩写。

> lex 和 flex 的渊源？

lex 是 "Lexical Analyzer Generator"，flex 是 "Fast Lexical Analyzer Generator" 的缩写。

按：flex 和 bison 配对；lex 和 yacc 配对。

> 何为 BNF 语法？

BNF，即 BackusNaur Form，中文名 BackusNaur 范式，是书写上下文无关文法的标准格式。

```c
<exp> ::= <factor>
    | <exp> + <factor>
<factor> ::= NUMBER
    <factor> * NUMBER
```

按：

- 每一行就是一条规则，用来说明如何创建语法分析树的分支；
- `::=` 读作“是”或者“变成”；
- `|` 是“或者”，创建同类分支的一种方式；
- 规则左边的名称是语法符号（symbol）。

> 有效的 BNF 总是带有递归性的。

```c
/* 计算器的最简版本 */
%{
#include <stdio.h>
}%

/* declare tokens */
%token NUMBER
%token ADD SUB MUL DIV ABS
%token EOL

%%

calclist: /* 控规则 */
    | calclist exp EOL { printf("= %d\n", $2); }
    ;

exp: factor default $$ = $1
    | exp ADD factor { $$ = $1 + $3; }
    | exp SUB factor { $$ = $1 - $3; }
    ;

factor: term default $$ = $1
    | factor MUL term { $$ = $1 * $3; }
    | factor DIV term { $$ = $1 / $3; }
    ;

term: NUMBER default $$ = $1
    | ABS term { $$ = $2 >= 0? $2 : - $2; }
    ;
%%
int main(int argc, char **argv)
{
    yyparse();
}
yyerror(char *s)
{
    fprintf(stderr, "error: %s\n", s);
}
```

> bison 程序由哪几部分组成？

- 声明部分
- 规则部分
- C 代码部分

- 声明部分包含了会被原样拷贝到目标分析程序开头的 C 代码，同样也通过 `%{` 和 `}%` 来声明。随后是 `%token` 记号声明，以便于告诉 bison 在语法分析程序中记号的名称。通常来说，记号总是使用大写字母。任何没有声明为记号的语法符号必须出现在至少一条规则的左边。
- 第二部分包含了通过简单的 BNF 定义的规则。bison 使用单一的冒号而不是 `::=`，同时由于行间隔并不是那么明显，分号被用来表示规则的结束。同样，像 flex 那样，C 的动作代码在每条规则之后用花括号括起。
    - 目标符号（冒号左边的语法符号）的值在动作代码中用 `$$` 代替，右边语法符号的语义值依次为 `$1`、`$2`，直到这条规则的结束。当词法分析器返回记号时，记号值总是储存在 `yyval` 中。

```c
/* 计算器的最简版本 fb1-5.y */
%{
#include <stdio.h>
%}

/* declare tokens */
%token NUMBER
%token ADD SUB MUL DIV ABS
%token EOL

%%

calclist: /* 空规则 */
 | calclist exp EOL { printf("= %d\n", $2); }
 ;

exp: factor
 | exp ADD factor { $$ = $1 + $3; }
 | exp SUB factor { $$ = $1 - $3; }
 ;

factor: term
 | factor MUL term { $$ = $1 * $3; }
 | factor DIV term { $$ = $1 / $3; }
 ;

term: NUMBER
 | ABS term { $$ = $2 >= 0? $2 : - $2; }
 ;
%%
int main(int argc, char **argv)
{
    yyparse();
}
yyerror(char *s)
{
    fprintf(stderr, "error: %s\n", s);
}
```

```c
/* fb1-5.l */
%{
# include "fb1-5.tab.h"

int yylval;
%}
%%
"+"     { return ADD; }
"-"     { return SUB; }
"*"     { return MUL; }
"/"     { return DIV; }
"|"     { return ABS; }
[0-9]+  { yylval = atoi(yytext); return NUMBER; }
\n      { return EOL; }
[ \t]   { /* 忽略空白字符 */ }
.       { printf("Mystery character %c\n", *yytext); }
%%
```

