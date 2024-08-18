---
title: CMake 使用笔记
date: 2024-03-25 23:44:19
tags:
- CMake
- Cpp
categories:
index_img: https://i.imgur.com/ocPFzfG.png
banner_img: https://i.imgur.com/ocPFzfG.png
---

依然是从实际的使用例子出发。暂时先不去研究其原理。

## 设置 C++ 的标准

比如，我这里想要设置标准为 C++17，

```txt
# specify the C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
```

## Windows 平台下设置 uiaccess

按理说应该是在 manifest 中设置的，实际上，正确的设置方法，是在 CMake 的脚本中进行设置，

```txt
set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "/level='asInvoker' /uiAccess='true'" )
```

参考：

<https://cmake.org/cmake/help/v3.20/guide/tutorial/index.html?highlight=destination#id5>


