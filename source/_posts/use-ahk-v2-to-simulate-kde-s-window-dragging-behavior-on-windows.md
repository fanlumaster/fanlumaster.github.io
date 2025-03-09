---
title: 使用 AHK v2 在 Windows 模拟 KDE 的窗口拖动方式
date: 2025-03-05 20:50:55
tags:
  - Windows
  - Autohotkey
categories:
index_img: https://img.notionusercontent.com/s3/prod-files-secure%2F9a846297-de6b-4494-b312-23f8e5db7b7e%2F5390fcbe-7ccb-49f6-a9b9-f15c9d83f975%2Fimage.png/size/w=2000?exp=1741600344&sig=JUniBDJFb14e3hx_n2JPqDKQ9WZOqj-aAz_3ukgk9ME
banner_img: https://img.notionusercontent.com/s3/prod-files-secure%2F9a846297-de6b-4494-b312-23f8e5db7b7e%2F5390fcbe-7ccb-49f6-a9b9-f15c9d83f975%2Fimage.png/size/w=2000?exp=1741600344&sig=JUniBDJFb14e3hx_n2JPqDKQ9WZOqj-aAz_3ukgk9ME
---

首先介绍一下使用 AHK 来模拟 KDE 的窗口拖动。在 KDE 中，我们知道，按下 Win(Super) 键之后，然后使用鼠标的左键就可以在窗口的任意地方拖动窗口，使用鼠标的右键就可以在任意地方 resize 窗口。

ok，我们在 Windows 上可以使用 AHK 来实现这一点。

这里用到的脚本可以直接到 ahk 的官方文档中去找，

<https://www.autohotkey.com/docs/v2/scripts/index.htm#EasyWindowDrag_(KDE)>

就是下面的这些代码啦，

```ahk
; Easy Window Dragging -- KDE style (based on the v1 script by Jonny)
; https://www.autohotkey.com
; This script makes it much easier to move or resize a window: 1) Hold down
; the ALT key and LEFT-click anywhere inside a window to drag it to a new
; location; 2) Hold down ALT and RIGHT-click-drag anywhere inside a window
; to easily resize it; 3) Press ALT twice, but before releasing it the second
; time, left-click to minimize the window under the mouse cursor, right-click
; to maximize it, or middle-click to close it.

; The Double-Alt modifier is activated by pressing
; Alt twice, much like a double-click. Hold the second
; press down until you click.
;
; The shortcuts:
;  Alt + Left Button  : Drag to move a window.
;  Alt + Right Button : Drag to resize a window.
;  Double-Alt + Left Button   : Minimize a window.
;  Double-Alt + Right Button  : Maximize/Restore a window.
;  Double-Alt + Middle Button : Close a window.
;
; You can optionally release Alt after the first
; click rather than holding it down the whole time.

; This is the setting that runs smoothest on my
; system. Depending on your video card and cpu
; power, you may want to raise or lower this value.
SetWinDelay 2
CoordMode "Mouse"

g_DoubleAlt := false

!LButton::
{
    global g_DoubleAlt  ; Declare it since this hotkey function must modify it.
    if g_DoubleAlt
    {
        MouseGetPos ,, &KDE_id
        ; This message is mostly equivalent to WinMinimize,
        ; but it avoids a bug with PSPad.
        PostMessage 0x0112, 0xf020,,, KDE_id
        g_DoubleAlt := false
        return
    }
    ; Get the initial mouse position and window id, and
    ; abort if the window is maximized.
    MouseGetPos &KDE_X1, &KDE_Y1, &KDE_id
    if WinGetMinMax(KDE_id)
        return
    ; Get the initial window position.
    WinGetPos &KDE_WinX1, &KDE_WinY1,,, KDE_id
    Loop
    {
        if !GetKeyState("LButton", "P") ; Break if button has been released.
            break
        MouseGetPos &KDE_X2, &KDE_Y2 ; Get the current mouse position.
        KDE_X2 -= KDE_X1 ; Obtain an offset from the initial mouse position.
        KDE_Y2 -= KDE_Y1
        KDE_WinX2 := (KDE_WinX1 + KDE_X2) ; Apply this offset to the window position.
        KDE_WinY2 := (KDE_WinY1 + KDE_Y2)
        WinMove KDE_WinX2, KDE_WinY2,,, KDE_id ; Move the window to the new position.
    }
}

!RButton::
{
    global g_DoubleAlt
    if g_DoubleAlt
    {
        MouseGetPos ,, &KDE_id
        ; Toggle between maximized and restored state.
        if WinGetMinMax(KDE_id)
            WinRestore KDE_id
        Else
            WinMaximize KDE_id
        g_DoubleAlt := false
        return
    }
    ; Get the initial mouse position and window id, and
    ; abort if the window is maximized.
    MouseGetPos &KDE_X1, &KDE_Y1, &KDE_id
    if WinGetMinMax(KDE_id)
        return
    ; Get the initial window position and size.
    WinGetPos &KDE_WinX1, &KDE_WinY1, &KDE_WinW, &KDE_WinH, KDE_id
    ; Define the window region the mouse is currently in.
    ; The four regions are Up and Left, Up and Right, Down and Left, Down and Right.
    if (KDE_X1 < KDE_WinX1 + KDE_WinW / 2)
        KDE_WinLeft := 1
    else
        KDE_WinLeft := -1
    if (KDE_Y1 < KDE_WinY1 + KDE_WinH / 2)
        KDE_WinUp := 1
    else
        KDE_WinUp := -1
    Loop
    {
        if !GetKeyState("RButton", "P") ; Break if button has been released.
            break
        MouseGetPos &KDE_X2, &KDE_Y2 ; Get the current mouse position.
        ; Get the current window position and size.
        WinGetPos &KDE_WinX1, &KDE_WinY1, &KDE_WinW, &KDE_WinH, KDE_id
        KDE_X2 -= KDE_X1 ; Obtain an offset from the initial mouse position.
        KDE_Y2 -= KDE_Y1
        ; Then, act according to the defined region.
        WinMove KDE_WinX1 + (KDE_WinLeft+1)/2*KDE_X2  ; X of resized window
              , KDE_WinY1 +   (KDE_WinUp+1)/2*KDE_Y2  ; Y of resized window
              , KDE_WinW  -     KDE_WinLeft  *KDE_X2  ; W of resized window
              , KDE_WinH  -       KDE_WinUp  *KDE_Y2  ; H of resized window
              , KDE_id
        KDE_X1 := (KDE_X2 + KDE_X1) ; Reset the initial position for the next iteration.
        KDE_Y1 := (KDE_Y2 + KDE_Y1)
    }
}

; "Alt + MButton" may be simpler, but I like an extra measure of security for
; an operation like this.
!MButton::
{
    global g_DoubleAlt
    if g_DoubleAlt
    {
        MouseGetPos ,, &KDE_id
        WinClose KDE_id
        g_DoubleAlt := false
        return
    }
}

; This detects "double-clicks" of the alt key.
~Alt::
{
    global g_DoubleAlt := (A_PriorHotkey = "~Alt" and A_TimeSincePriorHotkey < 400)
    Sleep 0
    KeyWait "Alt"  ; This prevents the keyboard's auto-repeat feature from interfering.
}
```

然后，补充一点我自己的一些快捷键，一个是使用 CapsLock 来切换输入法，

```ahk
; Map Capslock to Toggle IME state(I use ENG and other IME Keyboard layouts)
CapsLock:: {
    Send("{RAlt down}{LShift down}")
    KeyWait("CapsLock")
    Send("{RAlt up}{LShift up}")
}
```

然后是 Win + C 来关闭当前窗口，这个快捷键是来自 Hyprland，

```ahk
; Windows + C: Close current window, like Alt + F4
#c:: WinClose "A"
```

然后是在一些应用里面映射 vim 的 hjkl 为左下上右，

```ahk
; Chrome, Powertoys's Launcher and VSCode arrow keymap
#HotIf WinActive("ahk_exe chrome.exe") || WinActive("ahk_exe PowerToys.PowerLauncher.exe") || WinActive(
    "ahk_exe code.exe") || WinActive("ahk_exe VSCodium.exe")
<!h:: SendInput("{Left}")
<!j:: SendInput("{Down}")
<!k:: SendInput("{Up}")
<!l:: SendInput("{Right}")
#HotIf ; end this trunk
```

暂时我个人用到的 ahk 的热键就这么多。
