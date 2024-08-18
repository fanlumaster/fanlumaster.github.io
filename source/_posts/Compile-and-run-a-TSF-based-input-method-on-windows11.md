---
title: 在 Windows11 系统中编译并运行一个基于 TSF 的中文输入法
date: 2023-10-14 13:29:52
tags:
- TSF
- 输入法
- C++
categories:
index_img: https://i.imgur.com/7JFaTUE.png
banner_img: https://i.imgur.com/7JFaTUE.png
description: '记录一下最近在 Windows11 中编译并运行基于 TSF 输入法的过程'
---

记录一下最近在 Windows11 中编译并运行基于 TSF 输入法的过程。

我个人所配置的编译环境：

- Visual Studio 17 2022
- CMake 3.27.7
- powershell 7.3.8: 因为我的编译脚本是使用 powershell 写的，所以最好安装最新版的 powershell
- Visual Studio 2022 community version

![](https://i.imgur.com/p97vrZP.png)

其他的开发环境，我的选择是：

- Neovim
- Neovide
- AstroNvim
- clangd

关于这个开发工具，其实选择 VSCode 也是可以的，因为是使用 CMake 构建的项目，所以，理论上，我们即使是一个简单的文本编辑器都是可以的。

下面开始进入正题。

TSF 想必是不用我过多介绍了，这是微软的一个文本输入法框架，它的全名是 Text Service Framework，理论上来讲，这个框架是比较强大的，它的出现也是为了替代微软的旧时代的 IMM 这个用来写输入法的框架的，而且，TSF 不仅仅局限于文字输入法，它还有其他很多有趣的和文本相关的用途，这里不作过多的介绍。那为什么这个新鲜的(其实也有很多年了)输入法框架已经释出这么久，还是没有多少基于它的开源的输入法的涌现呢？我想，这大概和微软给出的文档太少、太旧有关。给的[样例](https://github.com/microsoft/Windows-classic-samples/tree/main/Samples/IME/cpp/SampleIME)，我们可以看一下，

![](https://i.imgur.com/ETKI9wv.png)

我们看，这个代码都是七八年前的，而且，阅读它的 readme 文件，还可以发现它是为 widnows8 构建的，当然啦，由于 TSF 的 api 没有太大的变化，所以，我觉得这个代码在 Win11 上依旧是可以兼容的，然后，经过尝试，发现果然如此。这样的话，基于这个 demo 来开发我们想要的功能更加丰富的输入法。

好吧，本篇博客的重心是在编译运行微软的那个 demo，在 Windows11 系统上。如果上面的编译环境配置完毕且没有问题，那么，接下来的步骤其实很简单。

第一步，clone 一下我的[仓库](https://github.com/fanlumaster/MicrosoftSampleIME)，

![](https://i.imgur.com/tmaV6pl.png)

然后，使用任意一个文本编辑器或者 IDE 打开这个项目，同时，打开 powershell，然后，执行其中的 `lcompile.ps1`，`lcompile.ps1` 脚本如下，

```shell
# generate and compile exe/dll files

$currentDirectory = Get-Location
$cmakeListsPath = Join-Path -Path $currentDirectory -ChildPath "CMakeLists.txt"

if (-not (Test-Path $cmakeListsPath))
{
  Write-Host("No CMakeLists.txt in current directory, please check.")
  return
}

Write-Host "Start generating and compiling..."

$buildFolderPath = ".\build"

if (-not (Test-Path $buildFolderPath))
{
  New-Item -ItemType Directory -Path $buildFolderPath | Out-Null
  Write-Host "build folder created."
}

cmake -G "Visual Studio 17 2022" -A Win32 -S . -B ./build/

if ($LASTEXITCODE -eq 0)
{
  cmake --build ./build/ --config DEBUG
}

```

这个脚本默认是生成 32 位的 dll，生成的 dll 文件是在项目根目录下的 `./build/DEBUG` 中。这一次编译完成后，我们需要把这个 32 位的 dll 文件复制出来保存好，然后，把这个 `build` 目录给删除，把 `lcompile.ps1` 中的这一行，

```shell
cmake -G "Visual Studio 17 2022" -A Win32 -S . -B ./build/
```

修改为，

```shell
cmake -G "Visual Studio 17 2022" -A x64 -S . -B ./build/
```

然后，再次在 pwsh 中执行这个脚本，生成 64 位的 dll 文件，依然是复制出来保存好。

好了，我们现在还剩最后一步，那就是手动安装。在安装之前，我们先来简单讲一下现在的 Windows 系统中的输入法的原理。在现在的 Windows 系统中，我们想要编写一个基于 TSF 的输入法软件，只需提供 1~2 个 dll 软件，为什么说是 1~2 个呢，是因为 32 位的系统只需要我们提供一个 32 位的 dll 文件，而 64 位的系统需要我们同时提供 32 位的 64 位的 dll 文件，本文只以 64 位的系统来举例，因为 32 位的系统也是同理。有了 dll 文件之后，我们只需要把它放到合适的位置，然后注册进系统的注册表中即可。而实际的输入法的运行过程中，就是由各自的程序来调用这个 dll，这里就不去作过多的讲述。下面来具体操作一下，

首先，我们可以在 `C:\Program Files\` 和 `C:\Program Files (x86)\` 中分别建立 `SampleIME` 目录，这个目录的名字可以自己选择。然后，我们把刚刚的两个 dll 文件，分别放入 `SampleIME` 目录中，32 位的 dll 放入 `C:\Program Files (x86)\SampleIME\` 中，64 位的就放入 `C:\Program Files (x86)\SampleIME\` 中。

最后，以管理员的身份在 pwsh 中执行下面的两个命令，

```shell
regsvr32 "C:\Program Files\SampleIME\SampleIME.dll"
regsvr32 "C:\Program Files (x86)\SampleIME\SampleIME.dll"
```

这时，我们已经在语言栏看见我们刚才注册好的输入法了，

![](https://i.imgur.com/34rSfSM.png)

这时，还差最后一个步骤，很**重要**的步骤，那就是把词库文件也要复制到刚刚那两个 dll 所在的目录下，词库文件是这个，

![](https://i.imgur.com/RAFymHi.png)

然后，复制到相应的目录下，

![](https://i.imgur.com/va6dPzj.png)

至此，大功告成，下面，来看一下运行的效果：

![](https://i.imgur.com/tSXSsCM.png)

![](https://i.imgur.com/ZTvuYaz.png)

![](https://i.imgur.com/9E8qbEy.png)

当然啦，各位可能觉得这个输入法有点简陋，但是，毕竟只是一个 demo 嘛。但是，这个简陋的 demo，将是开启新世界的一扇重要的大门。甚至称其为最重要也不为过。

我们可以看一下微软现在的输入法，

![](https://i.imgur.com/midrE1p.png)

然后，我们用工具来看一下这个窗口，

![](https://i.imgur.com/gQgqYmh.png)

可以看到，不过是一个使用较新的绘图技术绘制的窗口罢了，加了一些现代化的的特性和效果，而这些，对于我们开发者来讲，windows programming 中的那些 api，其实是触手可及的。

下面，就敬请期待鄙人在输入法这一块的迭代。

附：手动卸载这个输入法的方法。

只要以管理员身份执行下面的命令即可，

```shell
regsvr32 /u "C:\Program Files\SampleIME\SampleIME.dll"
regsvr32 /u "C:\Program Files (x86)\SampleIME\SampleIME.dll"
```

这是我自己用的输入法，最大的痛点，其实是，候选框无法实时跟随光标。这一个输入法的实现是使用 windows hook，非常快，



---

参考：

1、<https://github.com/microsoft/Windows-classic-samples>  
2、<https://github.com/navilera/NavilIME>


