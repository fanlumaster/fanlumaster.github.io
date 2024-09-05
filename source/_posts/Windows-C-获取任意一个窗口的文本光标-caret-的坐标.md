---
title: Windows C++ 获取任意一个窗口的文本光标 caret 的坐标
date: 2023-04-12 18:44:50
updated: 2023-04-12 23:20:30
tags:
- Windows
- 输入法
categories:
index_img: https://i.imgur.com/H2vQUGO.png
banner_img: https://i.imgur.com/H2vQUGO.png
---

国家不幸诗家幸，乒乓不好程序好。

嗯，昨天话还没写完，夜里就把问题给解决了。夜里 12 点钟爬上床，心里还是放不下，手机上不太想用 chatgpt，就用传统的 Google，搜索一二，一二再变三四，好，点开一个 stackoverflow 的页面，

> How to use CHILDID_SELF?

<https://stackoverflow.com/questions/73911444/how-to-use-childid-self>

这个小子，把我想问的问题给问出来了，问得还挺认真的，他提到的那篇微软的帖子，我也看过，

> How to get caret position in ANY application from C#?

<https://learn.microsoft.com/en-us/answers/questions/818647/how-to-get-caret-position-in-any-application-from>

C# 和 C++ 不分家的，而且，最后，人家给的是一个完整的 C/C++ 程序，我运行了一下，发现是可以直接跑通的。于是，夜里十二点半，我告诉赵桑，能不能给我五分钟，下床，测试，测试成功，五分钟后，上床，我对赵桑说，赵桑，我的毕业设计结束了，就两行代码，解决了我的问题！激动地辗转反侧，书也不读了，看比赛，乒乓球比赛。

```cpp
#include <iostream>
#include <Windows.h>
#include <oleacc.h>

#pragma comment(lib, "Oleacc.lib")

typedef struct {
    long x;
    long y;
    long w;
    long h;
} Rect;

int main(int argc, char* argv[]) {
    HWND hwnd;
    DWORD pid;
    DWORD tid;

    CoInitialize(nullptr); // <-- add this

    while (true) {
        system("cls");

        GUITHREADINFO info;
        info.cbSize = sizeof(GUITHREADINFO);

        hwnd = GetForegroundWindow();
        tid = GetWindowThreadProcessId(hwnd, &pid);

        GetGUIThreadInfo(tid, &info);

        IAccessible* object = nullptr;
        if (SUCCEEDED(AccessibleObjectFromWindow(info.hwndFocus, OBJID_CARET, IID_IAccessible, (void**)&object))) {
            Rect rect;

            VARIANT varCaret;
            varCaret.vt = VT_I4;
            varCaret.lVal = CHILDID_SELF;

            if (SUCCEEDED(object->accLocation(&rect.x, &rect.y, &rect.w, &rect.h, varCaret))) {
                std::cout << rect.x << std::endl;
            }

            object->Release();
        }

        Sleep(10);
    }

    CoUninitialize(); // <-- add this

    return 0;
} 
```

魔法的两行是：

```cpp
CoInitialize(nullptr); // <-- add this
CoUninitialize(); // <-- add this
```

都说 Windows 里面有很多黑魔法，Windows 外面也不少嘛，该死！你就在一个 `GetCaretPos` 函数里面把所有的东西都给我封装好，不可以吗？

马龙输掉了，输给了林昀儒，我觉得可以接受，林的反手很好，其为人更是讨人喜欢，带有一点腼腆，英语好，有礼貌。

第二天上午，在钩子程序中测试，发现是不可以在钩子程序中使用，程序如下，

```cpp
#include <Windows.h>
#include <oleacc.h>

#include <iostream>

#pragma comment(lib, "Oleacc.lib")

HHOOK g_hook = NULL;  // 全局钩子句柄

void getCaret() {
    typedef struct {
        long x;
        long y;
        long w;
        long h;
    } Rect;

    HWND hwnd;
    DWORD pid;
    DWORD tid;

    CoInitialize(nullptr);  // <-- add this

    // system("cls");

    GUITHREADINFO info;
    info.cbSize = sizeof(GUITHREADINFO);

    hwnd = GetForegroundWindow();
    std::cout << "hwnd test => " << hwnd << '\n';
    tid = GetWindowThreadProcessId(hwnd, &pid);
    std::cout << "tid test => " << tid << '\n';

    GetGUIThreadInfo(tid, &info);

    IAccessible *object = nullptr;
    if (SUCCEEDED(AccessibleObjectFromWindow(info.hwndFocus, OBJID_CARET, IID_IAccessible, (void **)&object))) {
        Rect rect;

        VARIANT varCaret;
        varCaret.vt = VT_I4;
        varCaret.lVal = CHILDID_SELF;
        if (SUCCEEDED(object->accLocation(&rect.x, &rect.y, &rect.w, &rect.h, varCaret))) {
            std::cout << rect.x << ", " << rect.y << std::endl;
        }

        object->Release();
    }

    // Sleep(500);

    CoUninitialize();  // <-- add this
}

LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam) {
    // 取出钩子
    KBDLLHOOKSTRUCT *s = reinterpret_cast<KBDLLHOOKSTRUCT *>(lParam);
    if (nCode >= 0 && wParam == WM_KEYDOWN) {
        if ((GetAsyncKeyState(VK_CONTROL) & 0x8000) && (s->vkCode == VK_SPACE)) {
            getCaret();
        }
    }

    return CallNextHookEx(g_hook, nCode, wParam, lParam);
}

int main() {
    g_hook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, NULL, 0);  // 安装钩子

    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    UnhookWindowsHookEx(g_hook);  // 卸载钩子

    return 0;
}
```

经过研究，发现这是钩子程序本身的问题，它的线程不一样，具体是怎么样一种道理我暂时还没搞明白，折腾了两三个小时之后，我决定直接把这个模块给上到我的输入法程序中，因为在我的输入法程序中，这个获取 caret 的模块是跑在主函数中的，线程一致，所以，试验了一下，果然可以！

我的输入法仓库如下，

<https://github.com/fanlumaster/FullIME>

大体上，上面就是我解决这个问题的心路历程，这个博客更多还是写给将来的我来回忆的吧。我在昨天白天也研究出了另一种方法，那个方法如我前一篇博客所说，只能解决像 word、notepad、文件管理器这种使用 wpf、winform 技术的经典应用程序中的获取 caret 的问题。

下面，总结一下我目前的两种方法吧，

```cpp
#include <Windows.h>
#include <oleacc.h>

#include <utility>

#pragma comment(lib, "oleacc.lib")

std::pair<int, int> getCaretPosByGUIThreadInfo() {
    std::pair<int, int> caretPos;
    HWND target_window = GetForegroundWindow();
    GUITHREADINFO info;
    info.cbSize = sizeof(GUITHREADINFO);
    BOOL result = GetGUIThreadInfo(GetWindowThreadProcessId(target_window, NULL), &info) && info.hwndCaret;
    if (!result) {
        // TODO: error log
    }
    POINT pt;
    pt.x = info.rcCaret.left;
    pt.y = info.rcCaret.top;
    ClientToScreen(info.hwndCaret, &pt);  // 转化成以整个屏幕为坐标系的坐标
    if (pt.x == 0 && pt.y == 0) {
        caretPos.first = 20;
        caretPos.second = 10;
        return caretPos;
    }
    caretPos.first = static_cast<int>(pt.x);
    caretPos.second = static_cast<int>(pt.y + 30);
    return caretPos;
}

std::pair<int, int> getCaretPosByAcc() {
    std::pair<int, int> pos = std::make_pair(100, 100);
    typedef struct {
        long x;
        long y;
        long w;
        long h;
    } Rect;

    HWND hwnd;
    DWORD pid;
    DWORD tid;

    CoInitialize(nullptr);  // <-- add this to init COM

    GUITHREADINFO info;
    info.cbSize = sizeof(GUITHREADINFO);

    hwnd = GetForegroundWindow();
    tid = GetWindowThreadProcessId(hwnd, &pid);

    GetGUIThreadInfo(tid, &info);

    IAccessible *object = nullptr;
    if (SUCCEEDED(AccessibleObjectFromWindow(info.hwndFocus, OBJID_CARET, IID_IAccessible, (void **)&object))) {
        Rect rect;

        VARIANT varCaret;
        // varCaret.n1.n2.vt = VT_I4;
        // varCaret.n1.n2.n3.lVal = CHILDID_SELF;
        /*
            这里代码提示会报错，但是其实这个代码是正确且可以正常编译运行的
        */
        varCaret.vt = VT_I4;
        varCaret.lVal = CHILDID_SELF;
        if (SUCCEEDED(object->accLocation(&rect.x, &rect.y, &rect.w, &rect.h, varCaret))) {
            /*
                加上这个 8 主要是为了解决 VSCode 的光标捕捉在使用 vim 插件的情况下有时会不准确的问题
            */
            pos.first = rect.x + 8;
            pos.second = rect.y + rect.h;
        }

        object->Release();
    }

    CoUninitialize();  // <-- add this to release COM
    return pos;
}
```

关于那两行魔法代码，即初始化和释放 COM 的代码，可以放在 main 函数中，这样就不用每次都初始化和释放了。

附一点点生活的小事儿，今天重看了异邦人·无皇刃潭，最后那段打斗及配乐依旧令我震撼。

![](https://i.imgur.com/Wq6rGTK.png)

------

参考：

1、<https://stackoverflow.com/questions/73911444/how-to-use-childid-self>  
2、<https://learn.microsoft.com/en-us/answers/questions/818647/how-to-get-caret-position-in-any-application-from>  
3、<https://baohaojun.github.io/blog/2013/10/04/0-Win32-IME-Programming.html>  
4、<https://lindexi.gitee.io/post/WPF-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E6%9C%AC%E6%A1%86%E8%BE%93%E5%85%A5%E6%B3%95-IME-%E8%B7%9F%E9%9A%8F%E5%85%89%E6%A0%87.html>  
5、ChatGPT
