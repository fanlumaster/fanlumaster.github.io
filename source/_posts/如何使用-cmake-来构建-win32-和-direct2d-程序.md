---
title: 如何使用 cmake 来构建 win32 和 direct2d 程序
date: 2023-03-03 23:54:24
tags:
- VSCode
- C++
- cmake
categories:
index_img: https://i.imgur.com/ATp8Hdf.png
banner_img: https://i.imgur.com/ATp8Hdf.png
---

我还是舍不得离开 VSCode 的 vim 环境呀。本来，这个是可以直接使用 Visual Studio 的，但是 VS 这个 IDE 用起来实在是不顺手，然后，我们知道，本身在命令行编译和运行 win32 + direct2d 编写的程序是没有问题的，所以，使用 cmake 来构建当然是没有问题的，问题就在于能不能把 lib 文件给链接对，网上现有的资料还挺少的，所以我在这里记录一下。

主要在于这个 CMakeLists.txt 文件，

```
cmake_minimum_required(VERSION 3.0.0)
project(fullcpp VERSION 0.1.0)

add_compile_options("$<$<C_COMPILER_ID:MSVC>:/utf-8>")
add_compile_options("$<$<CXX_COMPILER_ID:MSVC>:/utf-8>")

# Use unicode versions of functions
# add_definitions(-DUNICODE=1 -D_UNICODE=1)

# Don't include unneccessary things in <Windows.h>
add_definitions(-DWIN32_LEAN_AND_MEAN)

include_directories(.)
# link_directories("C:/Program Files (x86)/Windows Kits/10/Lib/10.0.22621.0/um/x64")

# 开启了 dpi 感知的设定
add_executable(fullcpp WIN32 "main.cpp" "DeclareDPIAware.manifest")
# target_link_libraries(fullcpp "C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.22621.0\\um\\x64\\d2d1.lib")
# set(LIBS d2d1 d3d9 d3d11 d3dcompiler)
set(LIBS d2d1)
target_link_libraries(fullcpp ${LIBS})

```

主要注意这里，

```
# set(LIBS d2d1 d3d9 d3d11 d3dcompiler)
set(LIBS d2d1)
target_link_libraries(fullcpp ${LIBS})
```

这里的写法是这个样子的，如果是使用 d2d1 的 lib 文件的绝对路径，这里反而会出错。原因暂时不详。

这里把 DeclareDPIAware.manifest 文件也记录一下，

```
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0" xmlns:asmv3="urn:schemas-microsoft-com:asm.v3" >
  <asmv3:application>
    <asmv3:windowsSettings xmlns="http://schemas.microsoft.com/SMI/2005/WindowsSettings">
      <dpiAware>true</dpiAware>
    </asmv3:windowsSettings>
  </asmv3:application>
</assembly>
```

我的 main.cpp，

```
/*
    有 dpi 感知
*/
#ifndef UNICODE
#define UNICODE
#endif

#include <windows.h>
#include <d2d1.h>
// #include "main.h"

#define SAFE_RELEASE(P) \
    if (P)              \
    {                   \
        P->Release();   \
        P = NULL;       \
    }

// 这是资源的声明
ID2D1Factory *g_pD2DFactory = NULL;            // Direct2D factory
ID2D1HwndRenderTarget *g_pRenderTarget = NULL; // Render target
ID2D1SolidColorBrush *g_pBlackBrush = NULL;    // A black brush, reflect the line color
ID2D1SolidColorBrush *g_pRedBrush = NULL;    // A red brush, reflect the line color

VOID CreateD2DResource(HWND hWnd)
{
    if (!g_pRenderTarget)
    {
        HRESULT hr;

        hr = D2D1CreateFactory(D2D1_FACTORY_TYPE_SINGLE_THREADED, &g_pD2DFactory);
        if (FAILED(hr))
        {
            MessageBox(hWnd, L"Create D2D factory failed!", L"Error", 0);
            return;
        }

        // Obtain the size of the drawing area
        RECT rc; // Render area
        GetClientRect(hWnd, &rc);

        // Create a Direct2D render target
        hr = g_pD2DFactory->CreateHwndRenderTarget(
            D2D1::RenderTargetProperties(),
            D2D1::HwndRenderTargetProperties(
                hWnd,
                D2D1::SizeU(rc.right - rc.left, rc.bottom - rc.top)),
            &g_pRenderTarget);
        if (FAILED(hr))
        {
            MessageBox(hWnd, L"Create render target failed!", L"Error", 0);
            return;
        }

        // Create a black brush
        hr = g_pRenderTarget->CreateSolidColorBrush(D2D1::ColorF(D2D1::ColorF::Black), &g_pBlackBrush);
        // fany: Create a red brush
        g_pRenderTarget->CreateSolidColorBrush(D2D1::ColorF(D2D1::ColorF::Red), &g_pRedBrush);

        if (FAILED(hr))
        {
            MessageBox(hWnd, L"Create brush failed!", L"Error", 0);
            return;
        }
    }
}

VOID DrawRectangle(HWND hwnd)
{
    CreateD2DResource(hwnd);

    g_pRenderTarget->BeginDraw();

    // Clear background color to White
    g_pRenderTarget->Clear(D2D1::ColorF(D2D1::ColorF::White));

    // Draw Black Rectangle
    // g_pRenderTarget->DrawRectangle(D2D1::RectF(100.f, 100.f, 500.f, 500.f), g_pBlackBrush);
    // fany: Draw Red Rectangle
    g_pRenderTarget->DrawRectangle(D2D1::RectF(100.f, 100.f, 500.f, 500.f), g_pRedBrush);

    HRESULT hr = g_pRenderTarget->EndDraw();
    if (FAILED(hr))
    {
        MessageBox(NULL, L"Draw failed!", L"Error", 0);
        return;
    }
}

VOID Cleanup()
{
    SAFE_RELEASE(g_pRenderTarget);
    SAFE_RELEASE(g_pBlackBrush);
    SAFE_RELEASE(g_pD2DFactory);
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    switch (message)
    {
    case WM_PAINT:
        DrawRectangle(hwnd);
        return 0;

    case WM_KEYDOWN:
    {
        switch (wParam)
        {
        case VK_ESCAPE:
            SendMessage(hwnd, WM_CLOSE, 0, 0);
            break;
        default:
            break;
        }
    }
    break;

    case WM_DESTROY:
        Cleanup();
        PostQuitMessage(0);
        return 0;
    }

    return DefWindowProc(hwnd, message, wParam, lParam);
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PSTR szCmdLine, int iCmdShow)
{

    WNDCLASSEX winClass;

    winClass.lpszClassName = L"Direct2D";
    winClass.cbSize = sizeof(WNDCLASSEX);
    winClass.style = CS_HREDRAW | CS_VREDRAW;
    winClass.lpfnWndProc = WndProc;
    winClass.hInstance = hInstance;
    winClass.hIcon = NULL;
    winClass.hIconSm = NULL;
    winClass.hCursor = LoadCursor(NULL, IDC_ARROW);
    winClass.hbrBackground = NULL;
    winClass.lpszMenuName = NULL;
    winClass.cbClsExtra = 0;
    winClass.cbWndExtra = 0;

    if (!RegisterClassEx(&winClass))
    {
        MessageBox(NULL, TEXT("This program requires Windows NT!"), L"error", MB_ICONERROR);
        return 0;
    }

    HWND hwnd = CreateWindowEx(NULL,
                               L"Direct2D",         // window class name
                               L"Draw Rectangle",   // window caption
                               WS_OVERLAPPEDWINDOW, // window style
                               CW_USEDEFAULT,       // initial x position
                               CW_USEDEFAULT,       // initial y position
                               938,                 // initial x size
                               1000,                // initial y size
                               NULL,                // parent window handle
                               NULL,                // window menu handle
                               hInstance,           // program instance handle
                               NULL);               // creation parameters

    ShowWindow(hwnd, iCmdShow);
    UpdateWindow(hwnd);

    MSG msg;
    ZeroMemory(&msg, sizeof(msg));

    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return msg.wParam;
}

```

这个就是 win32 的经典写法了。

---

参考，

1、<https://www.cnblogs.com/h2zZhou/p/6295455.html>  
2、<https://github.com/holy-shit/clion-directx-example/blob/master/CMakeLists.txt>

