---
title: autohotkey(ahk) 去掉窗口的标题栏和边框
date: 2023-08-28 22:31:24
tags:
- ahk
- windows
categories:
index_img: https://i.imgur.com/InwY1rd.png
banner_img: https://i.imgur.com/InwY1rd.png
---

可能偶尔有点用处。就是利用 ahk 来控制标题栏的显隐。

这个只针对使用 windows 原生的标题栏的应用有效。现在很多有名的软件都是选择自绘标题栏和边框这些组件了，比如 chrome。所以，这个脚本可能用处并不是很大。

我目前的一个应用是把 terminal 的标题栏给隐藏掉，然后使用 snipaste 去截图，这样截出来的就是四四方方的一个窗口，不会有边角料的干预。这里吐槽一下，win11 的圆角窗口的截图有点不好处理，现有的截图软件截出来一点都不优雅。或许这是一个创新的点，等待有技术、有时间、有想法的同志去实现一下。

话不多说，上脚本，

```ahk
+^+!u::
WinGetTitle, currentWindow, A
IfWinExist %currentWindow%
WinSet, Style, -0xC40000,
; WinMove, , , 0, 0, A_ScreenWidth, A_ScreenHeight
; WinMove, , , 0, 0, 1400, 1200
DllCall(“SetMenu”, “Ptr”, WinExist(), “Ptr”, 0)
return


+^+!i::
WinGetTitle, currentWindow, A
IfWinExist %currentWindow%
WinSet, Style, +0xC40000,
; WinMove, , , 0, 0, A_ScreenWidth, A_ScreenHeight
; WinMove, , , 0, 0, 1400, 1200
DllCall(“SetMenu”, “Ptr”, WinExist(), “Ptr”, 0)
return
```

上面脚本定义的快捷键分别是：

- `Ctrl + Shift + Alt + u`: 隐藏窗口的标题栏
- `Ctrl + Shift + Alt + i`: 恢复窗口的标题栏

