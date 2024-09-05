---
title: 一种新的获取 Windows 窗口的文本光标的方式
date: 2024-02-18 22:06:40
updated: 2024-02-22 00:16:56
tags:
- Windows
- C++
categories:
index_img: https://i.imgur.com/VQ3Zutv.png
banner_img: https://i.imgur.com/VQ3Zutv.png
description: '一种新的获取 Windows 窗口的文本光标的方式(依旧不完善)'
---

之前在 GitHub 的 Windows Terminal 仓库中看到一个 disscution，

<https://github.com/microsoft/terminal/discussions/14664>

这个讨论中提到的方法是在以前的比较经典的三种方法之外的获取 Windows 的窗口中的 caret 的坐标的另一种方法，以前的三种方法，可以在我的这个仓库中看到，

<https://github.com/fanlumaster/FullIME>

对于接下来要提到的这种新的方式，是使用到了 Windows 提供的 `IUIAutomationTextPattern` 这个组件。以前的方法是可以在 Chrome 和一些经典的比如记事本这样的传统的 Windows 应用中获取文本光标，对于我们经常用到的另外一个软件——Windows Terminal 则是无能为力，这个新的方法所解决问题，基本上就是 Windows Terminal 这个软件的获取文本光标的问题，以及开始菜单，和一些其他基于 WinUI 框架的窗口软件，今天偶然在 ahk 的论坛发现有人给出了实现，这里就记录一下，

```cpp
#include <Windows.h>
#include <atlbase.h>
#include <atlsafe.h>
#include <UIAutomation.h>
#include <oleacc.h>
#include <iostream>

#pragma comment(lib, "Oleacc.lib")

HWND GetCaretPosEx(long *pX, long *pY, long *pW, long *pH);

int main()
{
    if (FAILED(CoInitialize(nullptr)))
    {
        return 0;
    }
    int count = 0;
    while (1)
    {
        long x = 0, y = 0, w = 0, h = 0;
        HWND hwnd = GetCaretPosEx(&x, &y, &w, &h);
        WCHAR className[255];
        if (hwnd != nullptr)
        {
            GetClassNameW(hwnd, className, sizeof(className) / sizeof(*className));
            std::wcout << count++ << "\t" << className << "\tx: " << x << "\ty: " << y << "\tw: " << w << "\th: " << h
                       << std::endl;
        }
        Sleep(1000);
    }
    CoUninitialize();
    return 0;
}

HWND GetCaretPosEx(long *pX, long *pY, long *pW, long *pH)
{
    CComPtr<IUIAutomation> uia;
    CComPtr<IUIAutomationElement> eleFocus;
    CComPtr<IUIAutomationValuePattern> valuePattern;
    if (S_OK != uia.CoCreateInstance(CLSID_CUIAutomation) || uia == nullptr)
    {
        return nullptr;
    }
    if (S_OK != uia->GetFocusedElement(&eleFocus) || eleFocus == nullptr)
    {
        goto useAccLocation;
    }
    if (S_OK == eleFocus->GetCurrentPatternAs(UIA_ValuePatternId, IID_PPV_ARGS(&valuePattern)) &&
        valuePattern != nullptr)
    {
        BOOL isReadOnly;
        if (S_OK == valuePattern->get_CurrentIsReadOnly(&isReadOnly) && isReadOnly)
        {
#ifdef DEBUG
            std::wcout << L"Read Only" << std::endl;
#endif // DEBUG
            return nullptr;
        }
    }
useAccLocation:
    // use IAccessible::accLocation
    GUITHREADINFO guiThreadInfo = {sizeof(guiThreadInfo)};
    HWND hwndFocus = GetForegroundWindow();
    GetGUIThreadInfo(GetWindowThreadProcessId(hwndFocus, nullptr), &guiThreadInfo);
    hwndFocus = guiThreadInfo.hwndFocus ? guiThreadInfo.hwndFocus : hwndFocus;
    CComPtr<IAccessible> accCaret;
    if (S_OK == AccessibleObjectFromWindow(hwndFocus, OBJID_CARET, IID_PPV_ARGS(&accCaret)) && accCaret != nullptr)
    {
        CComVariant varChild = CComVariant(0);
        if (S_OK == accCaret->accLocation(pX, pY, pW, pH, varChild))
        {
#ifdef DEBUG
            std::wcout << L"IAccessible::accLocation Succeeded" << std::endl;
#endif // DEBUG
            return hwndFocus;
        }
    }
    if (eleFocus == nullptr)
    {
        return nullptr;
    }
    // use IUIAutomationTextPattern2::GetCaretRange
    CComPtr<IUIAutomationTextPattern2> textPattern2;
    CComPtr<IUIAutomationTextRange> caretTextRange;
    CComSafeArray<double> rects;
    void *pVal = nullptr;
    BOOL IsActive = FALSE;
    if (S_OK != eleFocus->GetCurrentPatternAs(UIA_TextPattern2Id, IID_PPV_ARGS(&textPattern2)) ||
        textPattern2 == nullptr)
    {
        goto useGetSelection;
    }
    if (S_OK != textPattern2->GetCaretRange(&IsActive, &caretTextRange) || caretTextRange == nullptr || !IsActive)
    {
        goto useGetSelection;
    }
    if (S_OK == caretTextRange->GetBoundingRectangles(rects.GetSafeArrayPtr()) && rects != nullptr &&
        SUCCEEDED(SafeArrayLock(rects)) && rects.GetCount() >= 4)
    {
        *pX = long(rects[0]);
        *pY = long(rects[1]);
        *pW = long(rects[2]);
        *pH = long(rects[3]);
#ifdef DEBUG
        std::wcout << L"IUIAutomationTextPattern2::GetCaretRange Succeeded" << std::endl;
#endif // DEBUG
        return hwndFocus;
    }
useGetSelection:
    // use IUIAutomationTextPattern::GetSelection
    CComPtr<IUIAutomationTextPattern> textPattern;
    CComPtr<IUIAutomationTextRangeArray> selectionRangeArray;
    CComPtr<IUIAutomationTextRange> selectionRange;
    if (textPattern2 == nullptr)
    {
        if (S_OK != eleFocus->GetCurrentPatternAs(UIA_TextPatternId, IID_PPV_ARGS(&textPattern)) ||
            textPattern == nullptr)
        {
            return nullptr;
        }
    }
    else
    {
        textPattern = textPattern2;
    }
    if (S_OK != textPattern->GetSelection(&selectionRangeArray) || selectionRangeArray == nullptr)
    {
        return nullptr;
    }
    int length = 0;
    if (S_OK != selectionRangeArray->get_Length(&length) || length <= 0)
    {
        return nullptr;
    }
    if (S_OK != selectionRangeArray->GetElement(0, &selectionRange) || selectionRange == nullptr)
    {
        return nullptr;
    }
    if (S_OK != selectionRange->GetBoundingRectangles(rects.GetSafeArrayPtr()) || rects == nullptr ||
        FAILED(SafeArrayLock(rects)))
    {
        return nullptr;
    }
    if (rects.GetCount() < 4)
    {
        if (S_OK != selectionRange->ExpandToEnclosingUnit(TextUnit_Character))
        {
            return nullptr;
        }
        if (S_OK != selectionRange->GetBoundingRectangles(rects.GetSafeArrayPtr()) || rects == nullptr ||
            FAILED(SafeArrayLock(rects)) || rects.GetCount() < 4)
        {
            return nullptr;
        }
    }
    *pX = long(rects[0]);
    *pY = long(rects[1]);
    *pW = long(rects[2]);
    *pH = long(rects[3]);
#ifdef DEBUG
    std::wcout << L"IUIAutomationTextPattern::GetSelection Succeeded" << std::endl;
#endif // DEBUG
    return hwndFocus;
}
```

这是一个简单的单文件，直接编译运行即可验证，

![](https://i.imgur.com/NVppBZP.png)

当然，对于一些自绘文本光标的窗口，比如 neovide、IDEA 这类，这个方法依然是不奏效的，对于自绘的窗口，目前应该只能通过 TSF 的接口来获取，但是 TSF 的一些接口目前应该只能在输入法中进行调用。

所以，这里只是对于之前的方法的一次补充。

----------

参考：<https://www.autoahk.com/archives/44158>


