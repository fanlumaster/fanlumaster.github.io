---
title: TSF 输入法学习与开发笔记
date: 2023-10-15 23:29:55
updated: 2023-10-15 23:51:54
tags:
- 输入法
- C++
- 未竟
categories:
index_img: https://i.imgur.com/PTi19vc.png
banner_img: https://i.imgur.com/PTi19vc.png
---

由于 TSF 输入法的本质是提供两个 dll 文件，所以，我们这里的研究就是围绕着如何写好这个 dll 动态链接库来展开的。

并且，本次的研究主体是微软提供的 Sample TSF 代码。当然，过程中不排除会包括我自己新添加的代码、特性和优化以及修复等等。

注意，这个代码是可以正常编译和运行的。

如果有同样对输入法十分感兴趣的同志有遇到的什么问题，欢迎找到我的联系方式和我进行这方面的交流。

## DllMain

`DllMain` 函数在 dll 被加载和卸载时被调用，它通常用于执行初始化和清理工作。

```cpp
#include "Private.h"
#include "Globals.h"

//+---------------------------------------------------------------------------
//
// DllMain
//
//----------------------------------------------------------------------------

BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID pvReserved)
{
    pvReserved; // 空操作，用于消除某些编译器的警告

    switch (dwReason)
    {
    case DLL_PROCESS_ATTACH: // dll 被加载时执行

        Global::dllInstanceHandle = hInstance; // 将 dll 实例句柄存储在全局变量中

        // 初始化一个临界区，用于多线程同步
        if (!InitializeCriticalSectionAndSpinCount(&Global::CS, 0))
        {
            return FALSE;
        }

        // 注册一个窗口类
        if (!Global::RegisterWindowClass())
        {
            return FALSE;
        }

        break;

    case DLL_PROCESS_DETACH: // dll 被卸载时执行，这里主要就是 dll 附着的窗口被关闭时需要执行这里的操作

        DeleteCriticalSection(&Global::CS); // 删除之前的临界区

        break;

    case DLL_THREAD_ATTACH: // 新线程被创建时执行

        break;

    case DLL_THREAD_DETACH: // 线程退出时执行

        break;
    }

    return TRUE; // dll 加载成功
}
```


