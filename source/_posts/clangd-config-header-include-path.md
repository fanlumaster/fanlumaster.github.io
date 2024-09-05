---
title: clangd 配置头文件的路径
date: 2024-04-03 13:02:06
updated: 2024-04-04 18:43:30
tags:
- clangd
- arch
categories:
index_img: https://i.imgur.com/JlhonL4.png
banner_img: https://i.imgur.com/JlhonL4.png
---

虽然是一个小问题，但是还折磨我昨晚不小时间。遂记录一波。

先说现象，在 Neovim 中打开 fcitx5 的一个示例项目时，发现一个问题，我们在正常配置当前项目下的 `.clangd` 当然是没有问题的，当前项目下的源文件在包含其他外部的我已经在 `.clangd` 中指定过的文件是没有问题的。

先看我的配置文件吧，

![](https://i.imgur.com/bL7xaS3.png)

```yaml
CompileFlags:
  Add: [
    -I/usr/include/Fcitx5/Utils/,
    -I/usr/include/Fcitx5/Utils/fcitx-utils/,
    -I/usr/include/Fcitx5/Core,
    -I/usr/include/Fcitx5/Config/,
    -I/usr/include/Fcitx5/Module/,
  ]
```

然后重新启动一下 Lsp(命令是 `:LspRestart` ，如果重启不行，那么，就只好重启 neovim 了)，可以看到，头文件都可以正常被索引到，

![](https://i.imgur.com/qhV1bTi.png)

然后我们进一步点进去，比如，到包含的第一个头文件里面去，这时，就发现有些本该找到的头文件找不到了，比如，下面报的找不到的 `flags.h` ，其实就是在该头文件的同级目录下，

![](https://i.imgur.com/Xo8pK9S.png)

那么，我们该如何处理这个问题呢？

我试过一个方案，比如说，使用 CMake 来编译一个 compile_commands.json 文件出来，然后再在 `.clangd` 文件中指定其位置。没用的。因为 Neovim 的 lsp 只针对当前 workspace 中的文件有效，而我们打开的外部的头文件不受当前目录的管辖，所以，Lsp 不会自动帮我们去把当前目录配置的 clangd 的规则给应用到别的目录的文件下。(但是，VSCode 是可以的，不知道原理是啥，背后肯定做了什么不为人知的定制的操作)

那么，到底该如何处理呢？

有两种方式。

- 一，侵入式的修改，直接再到外部头文件的目录下新建一个 `.clangd` 文件，复制当前项目的配置到里面去，经测试可以生效。
- 二，修改全局配置。Linux 下，在 `~/.config/clangd` 目录下新建一个 `config.yaml` 文件，如果没有目录，也要新建。之后，同样，把项目中的 `.clangd` 中的内容给放入到其中。此时，经测试，生效。

按：Windows 下的 clangd 的默认配置目录是 `Windows: %LocalAppData%\clangd\config.yaml`, typically `C:\Users\Bob\AppData\Local\clangd\config.yaml`。

![](https://i.imgur.com/TQE5wGq.png)

关于 Linux 和 Windows 上的路径格式问题，也需要注意一下，这里举两个例子，

1、For Windows: 

```yaml
CompileFlags:
  Add: [
    "-IC:\\EDisk\\AlgoCodes\\leetcode-records\\Cpp\\src\\utils\\includes", # for Windows
    -Wno-microsoft-goto, 
    -Wno-unused-value, 
    -Wno-nonportable-include-path, 
    -Wno-microsoft-extra-qualification,
  ] # ignore some specific warnings
  CompilationDatabase: build/       # Search build/ directory for compile_commands.json
Diagnostics:
  UnusedIncludes: None # 忽略 unused includes
``` 

2、For Linux:

上面已经有了样例。这里只是有点奇怪，似乎 Linux 中不需要给这个配置加上引号，而 Windows 中则是需要的。

而且，不管是在哪个系统中，都只能使用绝对路径。

----------

参考：

1、<https://clangd.llvm.org/config>  
2、<https://github.com/neovim/neovim/blob/master/.clangd>


