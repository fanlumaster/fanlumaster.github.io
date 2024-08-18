---
title: 标准 C 语言头文件
date: 2021-04-25 00:36:13
tags:
- C 语言
- Linux
categories:
- C 语言
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222502.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210527222502.png
---

## ISO C 标准定义的头文件（24 项）

1. `<assert.h>` 验证程序断言

2. `<complex.h>` 支持复数算术运算

3. `<ctype.h>` 字符类型

4. `<errno.h>` 出错码

5. `<fenv.h>` 浮点环境

6. `<float.h>` 浮点常量

7. `<inttypes.h>` 整型格式转换

8. `<iso646.h>` 替代关系操作符宏

9. `<limits.h>` 实现常量

10. `<locale.h>` 局部类别

11. `<math.h>` 数学常量

12. `<setjmp.h>` 非局部goto

13. `<signal.h>` 信号

14. `<stdarg.h>` 可变参数表

15. `<stdbool.h>` 布尔类型和值

16. `<stddef.h>` 标准定义

17. `<stdint.h>` 整型

18. `<stdio.h>` 标准I/O库

19. `<stdlib.h>` 实用程序库函数

20. `<string.h>` 字符串操作

21. `<tgmath.h>` 通用类型数学宏

22. `<time.h>` 日期和时间

23. `<wchar.h>` 宽字符支持

24. `<wctype.h>` 宽字符分类和映射支持

## POSIX 标准规定的必须的头文件（26 项）

1. `<dirent.h>` 目录项

2. `<fcntl.h>` 文件控制

3. `<fnmatch.h>` 文件名匹配类型

4. `<glob.h>` 路径名模式匹配类型

5. `<grp.h>` 组文件

6. `<netdb.h>` 网络数据库操作

7. `<pwd.h>` 口令文件

8. `<regex.h>` 正则表达式

9. `<tar.h>` tar归档值

10. `<termios.h>` 终端I/O

11. `<unistd.h>` 符号常量

12. `<utime.h>` 文件时间

13. `<wordexp.h>` 字扩展类型

14. `<arpa/inet.h>` Internet定义

15. `<net/if.h>` 套接字本地接口

16. `<netinet/in.h>` Internet地址族

17. `<netinet/tcp.h>` 传输控制协议定义

18. `<sys/mman.h>` 内存管理声明

19. `<sys/select.h>` select函数

20. `<sys/socket.h>` 套接字接口

21. `<sys/stat.h>` 文件状态

22. `<sys/times.h>` 进程时间

23. `<sys/types.h>` 基本系统数据类型

24. `<sys/un.h>` UNIX域套接字定义

25. `<sys/utsname.h>` 系统名

26. `<sys/wait.h>` 进程控制

## POSIX 标准定义的 XSI 扩展头文件（26 项）

1. `<cpio.h>` cpio归档值

2. `<dlfcn.h>` 动态链接

3. `<fmtmsg.h>` 消息显示结构

4. `<ftw.h>` 文件树漫游

5. `<iconv.h>` 代码集转换实用程序

6. `<langinfo.h>` 语言信息常量

7. `<libgen.h>` 模式匹配函数定义

8. `<monetary.h>` 货币类型

9. `<ndbm.h>` 数据库操作

10. `<nl_types.h>` 消息类别

11. `<poll.h>` 轮询函数

12. `<search.h>` 搜索表

13. `<strings.h>` 字符串操作

14. `<syslog.h>` 系统出错日志记录

15. `<ucontext.h>` 用户上下文

16. `<ulimit.h>` 用户限制

17. `<utmpx.h>` 用户帐户数据库

18. `<sys/ipc.h>` IPC

19. `<sys/msg.h>` 消息队列

20. `<sys/resource.h>` 资源操作

21. `<sys/sem.h>` 信号量

22. `<sys/shm.h>` 共享存储

23. `<sys/statvfs.h>` 文件系统信息

24. `<sys/time.h>` 时间类型

25. `<sys/timeb.h>` 附加的日期和时间定义

26. `<sys/uio.h>` 矢量I/O操作

## POSIX 标准定义的可选头文件（8 项）

1. `<aio.h>` 异步I/O

2. `<mqueue.h>` 消息队列

3. `<pthread.h>` 线程

4. `<sched.h>` 执行调度

5. `<semaphore.h>` 信号量

6. `<spawn.h>` 实时spawn接口

7. `<stropts.h>` XSI STREAMS接口

8. `<trace.h>` 时间跟踪

注：POSIX 的全称是 Portable Operating System Interface，意思是**可移植操作系统接口**，不过，这里的移植，主要是针对各种 Unix 系统来说的，而 X 则表明其对 Unix API 的传承。