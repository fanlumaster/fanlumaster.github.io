---
title: 记一次 C++ 内存泄漏的排查及解决过程
date: 2023-05-11 21:38:08
updated: 2023-05-13 00:13:48
tags:
- Cpp
- 问题
categories:
index_img: https://i.imgur.com/42wKr6Z.png
banner_img: https://i.imgur.com/42wKr6Z.png
---

主要是使用 Direct2D 和 DirectWrite 来绘制图形的时候，我以为是把资源最后一起释放就可以，结果当然不是这个样子。

一开始，我以为可能是 vector 出了问题，因为我对 C++ 其实并不是很熟悉，所以，上网检索一通，然后自己再测试一通，发现不可能是 vector 的问题，然后标准库里的组件怎么可能在内存这一块出问题呢？

然后还是一点点测试，既然不是 vector 的问题，那么，只能是图形的问题，之前测试了一次，但是忽略了 `g_pRenderTarget` 的释放，结果就以为，内存泄漏和这个指针没有关系，后面排查，问题大概只可能出现在这里了，所以，把相关的资源在这里进行释放，果然，是可以的，经过测试，发现问题解决，

其实就是这一个函数里面的问题，

```cpp
void FanyDrawText(HWND hwnd, std::wstring wText) {
    /*
        我们在重绘的时候，得重新获取一下客户区的信息，以及重新定义一下字体的信息？
        不然，字体的拉伸会导致字体的质量变得很差。
    */
    g_pDWriteFactory->CreateTextFormat(L"微软雅黑", NULL, DWRITE_FONT_WEIGHT_NORMAL, DWRITE_FONT_STYLE_NORMAL, DWRITE_FONT_STRETCH_NORMAL, 16.0f, L"zh-cn", &g_pDWriteTextFormat);
    // 获取可以绘制的客户区的长方形区域
    RECT rc;
    GetClientRect(hwnd, &rc);
    g_pD2DFactory->CreateHwndRenderTarget(D2D1::RenderTargetProperties(), D2D1::HwndRenderTargetProperties(hwnd, D2D1::SizeU(rc.right - rc.left, rc.bottom - rc.top)), &g_pRenderTarget);
    // 清除背景为白色
    // pRenderTarget->BeginDraw();
    g_pRenderTarget->BeginDraw();
    // pRenderTarget->Clear(D2D1::ColorF(D2D1::ColorF::White));
    // 如果想改变输入法候选框的背景颜色，可以在这里修改
    // g_pRenderTarget->Clear(D2D1::ColorF(D2D1::ColorF::Green));
    // g_pRenderTarget->Clear(D2D1::ColorF(D2D1::ColorF::White));
    g_pRenderTarget->Clear(D2D1::ColorF(D2D1::ColorF::LightGreen));
    // 设置绘制参数
    g_pRenderTarget->SetTransform(D2D1::IdentityMatrix());
    g_pRenderTarget->SetTextAntialiasMode(D2D1_TEXT_ANTIALIAS_MODE_DEFAULT);
    // 绘制文本
    // ISO C++11 does not allow conversion from string literal to 'wchar_t *'
    // wchar_t *szText = L"1.你好\n2.世界\n3.毛笔\n4.量子\n5.笔画\n6.竟然\n7.什么\n8.测试";
    // std::wstring wText = L"ni'hc\n1.你好\n2.世界\n3.毛笔\n4.量子\n5.笔画\n6.竟然\n7.什么\n8.测试";
    wchar_t *szText = const_cast<wchar_t *>(wText.c_str());
    RECT rect;
    GetClientRect(hwnd, &rect);
    D2D1_RECT_F layoutRect = D2D1::RectF(static_cast<FLOAT>(rect.left), static_cast<FLOAT>(rect.top), static_cast<FLOAT>(rect.right), static_cast<FLOAT>(rect.bottom));
    g_pRenderTarget->CreateSolidColorBrush(D2D1::ColorF(D2D1::ColorF::Black), &g_pBrush);
    g_pRenderTarget->DrawText(szText, wcslen(szText), g_pDWriteTextFormat, layoutRect, g_pBrush);
    // 结束绘制
    HRESULT hr = g_pRenderTarget->EndDraw();
    if (FAILED(hr)) {
        // 错误处理
        MessageBox(NULL, TEXT("End Drawing Error!"), L"error", MB_ICONERROR);
    }
    // 释放资源就不在这里操作了，而是专门在程序结束的时候统一释放
    // Cleanup();
    SAFE_RELEASE(g_pDWriteTextFormat);
    SAFE_RELEASE(g_pBrush);
    SAFE_RELEASE(g_pRenderTarget);
}
```

之前写完一篇博客，程序的内存占用会飙升到 200MB，现在的话，一直可以维持在 18MB 以下。

后面可以再优化，那时就是优化，而非解决内存泄漏的问题了。

