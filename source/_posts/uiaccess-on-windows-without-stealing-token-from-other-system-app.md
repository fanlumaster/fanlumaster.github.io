---
title: uiaccess on windows without stealing token from other system app
date: 2024-03-24 20:43:11
tags:
- Windows
categories:
index_img: https://i.imgur.com/NJxKJg2.png
banner_img: https://i.imgur.com/NJxKJg2.png
---

之前在程序里面使用的 enable uiaccess 的方法是参考了这篇博客：<https://killtimer0.github.io/2023/03/06/UIAccess/>，体验下来功能是比较正常和稳定的，我将其用在了我的输入法的候选框中，也就是将输入法的候选框给设置为 TOP_MOST。只有一个缺点不能不提，那就是，需要强制使用 admin 权限来运行，这个体验对于普通用户来说其实是不太友好的。然后，在之前使用的 ahk 编写的影子输入法中，也有获取 uiaccess 的选项，就去看了一下那个在 ahk 界比较通用流行的脚本，发现其并不是采取从其它进程中窃取 token 的做法，而是利用了之前据说已经失效的方式——在 manifest 中定义相应的属性，

```xml
<?xml version="1.0" encoding="UTF-8"?>
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
    <trustInfo xmlns="urn:schemas-microsoft-com:asm.v3">
        <security>
            <requestedPrivileges xmlns="urn:schemas-microsoft-com:asm.v3">
                <requestedExecutionLevel level="asInvoker" uiAccess="true" />
            </requestedPrivileges>
        </security>
    </trustInfo>
</assembly>
```

这里的 level 使用 asInvoker 就可以了，不需要 requireAdministrator 来获取管理员权限。

但是这里，我在使用 cmake 来编译的时候，又遇到一个问题，就是 cmake 所使用的 MSVC(VS2022) 会默认生成一个 manifest 然后 enbed 到最终的 exe 文件中，导致我这里自己定义的 manifest 属性会发生冲突，也就是会报一个 mt.exe 编译 manifest 不通过的问题。

```
C:\Users\fanyfull\AppData\Local\Temp\lnk{77D5E062-3BB8-4A99-BF39 
-4480C59E2E06}.tmp : manifest authoring error c1010001: Values o 
f attribute "uiAccess" not equal in different manifest snippets. 
 [C:\EDisk\CppCodes\IME\IMEByHook\build\fullcpp.vcxproj]
  
LINK : fatal error LNK1327: failure during running mt.exe [C:\ED 
isk\CppCodes\IME\IMEByHook\build\fullcpp.vcxproj]
```

把这个错误择出来看看，就是这个，

```
manifest authoring error c1010001: Values of attribute "uiAccess" not equal in different manifest snippets.
```

那么，这个问题应该怎么去解决呢？目前通过 cmake 来解决，我还没有找到方法，那么，只能退而求其次，使用 Visual Studio 本身来进行解决了。

按：下面也可以作为一个单独的完整的内容来阅读，遵从下面的步骤，是可以完整地实现一个窗口真正置顶的功能的。

## 通用的操作

实现一个窗口置顶，通常是以下四个步骤：

- 修改 Manifest

```xml
<requestedExecutionLevel level="asInvoker" uiAccess="true" />
```
- 修改窗口属性
- 为程序签名
- 将程序放在受信任的目录下

### 第一步

那就简单使用 VS 来创建一个 demo 来演示一下，

![](https://i.imgur.com/ZP1ujS9.png)

然后，Project -> Properties -> Configuration Properties -> Linker -> Manifest File -> UAC Bypass UI Protection

![](https://i.imgur.com/G0qdX6L.png)

![](https://i.imgur.com/TiFs14z.png)

按：这里我尝试了微软[官方](https://learn.microsoft.com/en-us/cpp/build/understanding-manifest-generation-for-c-cpp-programs?view=msvc-170)文档里面的一种直接使用 `mt.exe` 来将 manifest 编译进 exe 文件的方法，发现，是不行的，

```bash
mt.exe -manifest ./DeclareDPIAware.manifest -outputresource:./build/Debug/fullcpp.exe;1
```

### 第二步

然后，在创建窗口的时候，需要设置一下 `WS_EX_TOPMOST` 和 `HWND_TOPMOST`，

```cpp
BOOL InitInstance(HINSTANCE hInstance, int nCmdShow)
{
   hInst = hInstance; // Store instance handle in our global variable

   HWND hWnd = CreateWindowW(szWindowClass, szTitle, WS_EX_LAYERED | WS_EX_TOPMOST,
      CW_USEDEFAULT, 0, CW_USEDEFAULT, 0, nullptr, nullptr, hInstance, nullptr);

   if (!hWnd)
   {
      return FALSE;
   }
   SetWindowPos(hWnd, HWND_TOPMOST, 10, 10, 100, 100, SWP_SHOWWINDOW);

   ShowWindow(hWnd, nCmdShow);
   UpdateWindow(hWnd);

   return TRUE;
}
```

经过我实际的测试，发现单独设置一个 `WS_EX_LAYERED` 是不生效的，所以，还需要再额外设置一下 `HWND_TOPMOST`。

### 第三步

为程序签名。

```bash
makecert -r -pe -n "CN=Test Certificate - For Internal Use Only" -ss PrivateCertStore testcert.cer
```

```bash
certmgr.exe -add testcert.cer -s -r localMachine root
```

按：这一步如果失败，请切换到管理员模式来执行这个命令。

```bash
SignTool sign /fd SHA256 /v /s PrivateCertStore /n "Test Certificate - For Internal Use Only" WindowsProject2.exe
```

按：这里可以把编译好的 exe 文件复制到别的目录进行这个签名的操作。当然，也可以直接在编译输出的原目录中进行操作。

### 第四步

把签好名的可执行文件放入到 `C:/Program Files` 目录下，随意新建一个目录放进去即可。

## 迁移我自己的 cmake 程序可能会遇到的问题以及处理方案

其实也就是一些编译的问题。(这里在创建项目的时候我使用的 solution 和 project 不放在同一目录下)

- 将必要的文件都复制到工程目录中。
- LNK2005 问题。这个问题的原因是我自己写的 `main.cpp` 和 VS 自己生成的一个包含入口函数的程序文件冲突了。
- Resource 头文件和 rc 资源文件的问题。注意对原有文件进行替换即可。

![](https://i.imgur.com/9ychKdO.png)

- 链接 sqlite3 的问题。

![](https://i.imgur.com/u73awfu.png)

按：上面这步不确定是否需要处理。

然后，将 sqlite3.dll 文件复制到 exe 文件所在的目录下即可。

然后，再执行上面的四个步骤。最后运行即可得到想要的置顶的效果。

按：2024.03.25 发现，其实不用迁移了。CMake 本身是可以做到的。只需要在 CMakeLists 文件中加上如下的链接脚本即可，

```txt
# 如果是 windows，设置 asInvoker 权限。注意使用 if 需要配合 endif 使用
if (CMAKE_SYSTEM_NAME MATCHES "Windows")
    set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "/level='asInvoker' /uiAccess='true'" )
endif()
```

----------

稍微多说一点，窗口置顶有什么好处呢？或者说，有什么具体的应用呢？在我这里，当然是为了输入法的候选框来服务的，输入法的候选框如果被其它窗口遮住，那还得了。

那，有没有其它场景的应用了呢？

有。比如说，桌面水印。如果需要一个全局的水印，那么，这个水印的窗口的优先级肯定是要最高的。

还有呢？其实，键盘可视化的软件也是需要的。不是吗？其它当然也还有适用的场景，这个功能并不是不需要的。

----------

1、[让你的程序置顶到比系统界面都更上层，就像任务管理器/放大镜一样绝对置顶](https://blog.walterlv.com/post/run-desktop-application-above-windows-application.html)  
2、[通过System令牌获取UIAccess](https://killtimer0.github.io/2023/03/06/UIAccess/)  
3、<https://github.com/killtimer0/uiaccess>  
4、<https://www.cnblogs.com/pandamohist/p/16908223.html>  
5、<https://googles.plus/2024/01/25/cmake-dui-windows-cheng-xu-jia-ru-uac-zhi-chi/>  
6、<https://learn.microsoft.com/en-us/cpp/build/understanding-manifest-generation-for-c-cpp-programs?view=msvc-170>


