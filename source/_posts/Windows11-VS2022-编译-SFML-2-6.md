---
title: Windows11 VS2022 编译 SFML 2.6
date: 2023-05-05 16:21:57
updated: 2023-05-05 22:34:42
tags:
- Cpp
categories:
index_img: https://i.imgur.com/sdQfaxs.png
banner_img: https://i.imgur.com/sdQfaxs.png
---

探讨一下在 Windows11 系统中使用 VS2022 来编译 SFML 2.6 版本。

编译完成之后，我们可以使用 msvc 编译器，配合 cmake 在 VSCode 中去使用 C++ 来编写图形应用了。对于本身 SFML 的一些比如说跨平台的特性，那是自然不用说的。

本文主要分为两个部分，一个编译，另一个是使用 VSCode + CMake 创建一个示例程序并运行。

## 编译

具体的步骤如下：

1、从 GitHub 中克隆 `2.6.x` 分支的代码，

![](https://i.imgur.com/NYla0wL.png)

```shell
git clone -b 2.6.x https://github.com/SFML/SFML.git
```

然后我们打开 CMake 的窗口程序，在 `Where is the source code:` 这里选择我们刚刚 clone 下来的 SFML 的目录，同时也配置一下这个 `Where to build the binaries`，

![](https://i.imgur.com/LspdkrK.png)

然后点击 `Configure`，然后会让我们选 `Specify the generator for this project`，我们这里选择 `Visual Studio 17 2022`，其他保持默认，然后点击 `Finish`，

然后再点击 `Configure`，执行完之后会有一些变红的参数，我们只需要把 `CMAKE_INSTALL_PREFIX` 设置成我们想把编译好的文件放置的地方即可，

![](https://i.imgur.com/lJ1oD3W.png)

然后，再点击 `Configure`，此时就没有红色的参数了，这时，我们再点击 `Generate`，

![](https://i.imgur.com/7PjqM6p.png)

`Generatings done` 了之后，我们点击 `Open Project`，就会在 VS2022 中打开项目了，

右键 `INSTALL`，然后点击**生成**，等待编译完成即可，

![](https://i.imgur.com/WjQ7APG.png)

![](https://i.imgur.com/7jMj8JW.png)

这里编译了 23 秒钟就好了，

![](https://i.imgur.com/00ax6S2.png)

我们来看一下编译好的文件所在的目录的结构，

![](https://i.imgur.com/hOYrbLs.png)

`bin` 目录里面放的都是 dll 文件，`include` 目录里面放的是头文件，如此等等。

## 创建 demo

先新建一个空目录，然后使用 VSCode 打开，然后 `Ctrl + Shift + P` 打开命令面板(Mac 中是 `Command + Shift + P`)，

![](https://i.imgur.com/jET7zWA.png)

然后选择一个编译器，下面的两个都可以，

![](https://i.imgur.com/pHzqlI4.png)

然后，我们按一下 `Esc`，那么，CMake 插件就会给我们自己创建一个 `CMakeLists.txt`，

![](https://i.imgur.com/BW4namG.png)

然后给项目取一个名字，我们这里就叫 `SFMLDemo01`，

![](https://i.imgur.com/evBHu1B.png)

然后，把 `CMakeLists.txt` 中的内容换成如下的配置，

```txt
cmake_minimum_required(VERSION 3.8)
project("SFMLDemo01")

# 设置 SFML 目录
set(SFML_DIR "C:\\FDisk\\SFML\\lib\\cmake\\SFML")

find_package(SFML REQUIRED COMPONENTS audio network graphics window system)

if(NOT SFML_FOUND)
    message(FATAL_ERROR "SFML NOT FOUND!")
else()
    message("SFML FOUND!")
endif()

include_directories(${SFML_INCLUDE_DIR})

add_executable(SFMLDemo01 "main.cpp")

if(CMAKE_VERSION VERSION_GREATER 3.12)
    set_property(TARGET SFMLDemo01 PROPERTY CXX_STANDARD 20)
endif()

target_link_libraries("SFMLDemo01" sfml-main sfml-audio sfml-network sfml-graphics sfml-window sfml-system)

# 把 DLL 复制到执行目录
set(
    DLL_FILES
    "C:\\FDisk\\SFML\\bin\\sfml-graphics-d-2.dll"
    "C:\\FDisk\\SFML\\bin\\sfml-window-d-2.dll"
    "C:\\FDisk\\SFML\\bin\\sfml-system-d-2.dll"
)
foreach(DLL_FILE ${DLL_FILES})
    message("Found DLL to Copy: ${DLL_FILE}")
    add_custom_command(
        TARGET SFMLDemo01 PRE_BUILD
        # 复制到 CMake 的二进制可执行文件的目录下，但是，在 Windows 中，要放到 Debug 子目录下
        # 因为默认编译好的二进制文件是放到 ./build/Debug 目录下的
        COMMAND ${CMAKE_COMMAND} -E copy ${DLL_FILE} ${CMAKE_BINARY_DIR}/Debug.
    )
endforeach()
```

然后，配置一下 `C/C++` 插件的一些属性，可以让我们在写代码的时候可以使用自动补全，尤其是头文件，下面的 `.vscode` 目录和 `c_cpp_properties.json` 都需要我们手动创建，

![](https://i.imgur.com/1rGxyzO.png)

```json
{
  "configurations": [
    {
      "name": "SFML",
      "includePath": [
        "${workspaceFolder}/**",
        "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.34.31933/include",
        "C:/FDisk/SFML/include"
      ],
      "defines": [
        "UNICODE",
        "_UNICODE"
      ],
      "compilerPath": "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.34.31933/bin/Hostx64/x64/cl.exe",
      "cStandard": "c11",
      "cppStandard": "c++11",
      "intelliSenseMode": "msvc-x64",
      "configurationProvider": "ms-vscode.cmake-tools"
    }
  ],
  "version": 4
}
```

然后，把 `main.cpp` 替换成如下的代码，

```cpp
#include <SFML/Graphics.hpp>

using namespace std;

int main() {
    sf::RenderWindow window(sf::VideoMode(500, 500), "SFML works!", sf::Style::Default, sf::ContextSettings(0, 0, 8)); // ContextSettings(0, 0, 8) means setting AntialiasingLevel to 8
    window.setFramerateLimit(60);

    sf::CircleShape circle(220.f);

    circle.setPosition(30.f, 30.f);
    circle.setFillColor(sf::Color::Green);

    circle.setPointCount(3000);

    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed) window.close();
        }

        window.clear();
        window.draw(circle);
        window.display();
    }

    return 0;
}
```

之后，我们可以运行这个 demo 项目，

![](https://i.imgur.com/6tneZ8y.png)

运行结果就是一个窗口里面绘制一个圆，

![](https://i.imgur.com/WABwjMZ.png)

到这里就结束了。

---

参考：  
1、<https://segmentfault.com/a/1190000042050068>

