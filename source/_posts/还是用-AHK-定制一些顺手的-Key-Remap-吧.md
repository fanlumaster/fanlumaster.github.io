---
title: 还是用 AHK 定制一些顺手的 Key Remap 吧
date: 2024-06-14 00:07:19
updated: 2024-08-18 22:28:18
tags:
  - AHK
  - Windows
  - Vim
categories:
index_img: https://file.notion.so/f/f/9a846297-de6b-4494-b312-23f8e5db7b7e/65f2d7ac-2df4-459a-996d-105f72ff290e/image.png?table=block&id=1ad72237-1a17-80b6-9d56-e9b2161cf774&spaceId=9a846297-de6b-4494-b312-23f8e5db7b7e&expirationTimestamp=1741219200000&signature=TyfBF6jjItdpTw7oRSBtQ3K2OtFDuWavVXKwSsSPqsU&downloadName=image.png
banner_img: https://file.notion.so/f/f/9a846297-de6b-4494-b312-23f8e5db7b7e/65f2d7ac-2df4-459a-996d-105f72ff290e/image.png?table=block&id=1ad72237-1a17-80b6-9d56-e9b2161cf774&spaceId=9a846297-de6b-4494-b312-23f8e5db7b7e&expirationTimestamp=1741219200000&signature=TyfBF6jjItdpTw7oRSBtQ3K2OtFDuWavVXKwSsSPqsU&downloadName=image.png
---

起因是 Powertoys 的这个 [issue](https://github.com/microsoft/PowerToys/issues/3794)，其实就是一个简单的快捷键，这在 KDE 中是一个默认的键位，事实上，很多 Linux 系的软件都是默认有简单的 vim-like 的键位的，这并不是什么费事儿的开发需求，但是呢，在 Windows 中，微软就是不理，那还能怎么办呢？只好自己来动手了。

本次就简单地给几个常用的类似于 Powertoys Run 这样的应用添加一些 vim-like 的 remap。

使用的是 AHK 的 v2 版本，

## moving shortcuts

下面是给一些应用定制不使用箭头也可以上下左右移动光标的快捷键。

```autohotkey
#Requires AutoHotkey v2.0

; Chrome, Powertoys's Launcher and VSCode arrow keymap
#HotIf WinActive("ahk_exe chrome.exe") || WinActive("ahk_exe PowerToys.PowerLauncher.exe") || WinActive("ahk_exe code.exe")
<!h::SendInput("{Left}")
<!j::SendInput("{Down}")
<!k::SendInput("{Up}")
<!l::SendInput("{Right}")
#HotIf ; end this trunk
```

这样一来，我们就可以在 Powertoys Run 中使用 `Alt + hjkl` 来进行方向键的移动了。

## moving and resizing windows shortcuts

下面是给所有的应用都定制移动和以 1 像素为步长来调整窗口大小的快捷键。

关于以 1 像素为步长来调整窗口的大小，我设置这个功能的快捷键的初衷是为了可以便捷地微调 Neovide 的尺寸，因为它在窗口的右侧和下侧做得不严谨，所以，需要我们进行手动的微调。

```autohotkey
; 窗口的 resize 和移动相关

global stretchStepSize := 1
global moveStepSize := 10

; Ctrl + Shift + Alt + hjkl
^+!h:: stretch_left()
^+!l:: stretch_right()
^+!k:: stretch_up()
^+!j:: stretch_down()

; Ctrl + Win + Shift + Alt + hjkl
^#+!h:: move_left()
^#+!j:: move_down()
^#+!k:: move_up()
^#+!l:: move_right()

stretch_right() {
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x, y, w + stretchStepSize, h, id)
}

stretch_left() {
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x, y, w - stretchStepSize, h, id)
}

stretch_up() {
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x, y, w, h - stretchStepSize, id)
}

stretch_down() {
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x, y, w, h + stretchStepSize, id)
}

move_right() {
    global moveStepSize
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x + moveStepSize, y, w, h, id)
}

move_left() {
    global moveStepSize
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x - moveStepSize, y, w, h, id)
}

move_up() {
    global moveStepSize
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x, y - moveStepSize, w, h, id)
}

move_down() {
    global moveStepSize
    id := 'ahk_id ' WinActive('A')
    WinGetPos(&x, &y, &w, &h, id)
    WinMove(x, y + moveStepSize, w, h, id)
}
```
