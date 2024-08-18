---
title: clangd all command line options
date: 2023-11-30 22:51:01
tags:
- clangd
categories:
index_img: https://i.imgur.com/5810vAz.png
banner_img: https://i.imgur.com/5810vAz.png
---

为了方便检索，这篇博客也可以叫作：clangd all command line argument reference.

网上即使是使用英文检索 clangd 的所有的命令行选项，依旧找不到对应的文档，官网的文档写得有些简略。此外，因为 clang 在搜索引擎中所占的权重实在是太高了，所以，竟然指鹿为马，给我搜索出 clang 的 command line arguments，就是这个，

<https://clang.llvm.org/docs/ClangCommandLineReference.html>

那么，我们还有没有办法获取 clangd 的所有的命令行选项呢？毕竟，不知全貌是一件很危险的事情，不安全。比如，我们在 VSCode 中需要设置这个命令行参数时，

```jsonc
"clangd.arguments": [
  // 在后台自动分析文件（基于complie_commands)
  "--background-index",
  // 标记compelie_commands.json文件的目录位置
  "--compile-commands-dir=build",
  // 同时开启的任务数量
  "-j=12",
  // 告诉clangd用那个clang进行编译，路径参考which clang++的路径
  "--query-driver=/usr/bin/clang++",
  // clang-tidy功能
  "--clang-tidy",
  "--clang-tidy-checks=performance-*,bugprone-*",,
  // 全局补全（会自动补充头文件）
  "--all-scopes-completion",
  // 更详细的补全内容
  "--completion-style=detailed",
  // 补充头文件的形式
  "--header-insertion=iwyu",
  // pch优化的位置
  "--pch-storage=disk",
],
```

答案就是，使用原初的命令行自己的 help 命令，

```bash
clangd --help
```

我们来看输出，

```bash
OVERVIEW: clangd is a language server that provides IDE-like features to editors.

It should be used via an editor plugin rather than invoked directly. For more information, see:
        https://clangd.llvm.org/
        https://microsoft.github.io/language-server-protocol/

clangd accepts flags on the commandline, and in the CLANGD_FLAGS environment variable.

USAGE: clangd.exe [options]

OPTIONS:

Generic Options:

  --help                              - Display available options (--help-hidden for more)
  --help-list                         - Display list of available options (--help-list-hidden for more)
  --version                           - Display the version of this program

clangd compilation flags options:

  --compile-commands-dir=<string>     - Specify a path to look for compile_commands.json. If path is invalid, clangd will
 look in the current directory and parent paths of each source file
  --query-driver=<string>             - Comma separated list of globs for white-listing gcc-compatible drivers that are s
afe to execute. Drivers matching any of these globs will be used to extract system includes. e.g. /usr/bin/**/clang-*,/pa
th/to/repo/**/g++-*

clangd feature options:

  --all-scopes-completion             - If set to true, code completion will include index symbols that are not defined i
n the scopes (e.g. namespaces) visible from the code completion point. Such completions can insert scope qualifiers
    =iwyu                             -   Include what you use. Insert the owning header for top-level symbols, unless th
e header is already directly included or the symbol is forward-declared
    =never                            -   Never insert #include directives as part of code completion
  --header-insertion-decorators       - Prepend a circular dot or space before the completion label, depending on whether
 an include line will be inserted or not
  --import-insertions                 - If header insertion is enabled, add #import directives when accepting code comple
tions or fixing includes in Objective-C code
  --limit-references=<int>            - Limit the number of references returned by clangd. 0 means no limit (default=1000
)
  --limit-results=<int>               - Limit the number of results returned by clangd. 0 means no limit (default=100)   
  --project-root=<string>             - Path to the project root. Requires remote-index-address to be set.
  --remote-index-address=<string>     - Address of the remote index server
  --rename-file-limit=<int>           - Limit the number of files to be affected by symbol renaming. 0 means no limit (de
fault=50)

clangd miscellaneous options:

  --check[=<string>]                    - Parse one file in isolation instead of acting as a language server. Useful to i
nvestigate/reproduce crashes or configuration problems. With --check=<filename>, attempts to parse a particular file.    
  --enable-config                     - Read user and project configuration from YAML files.
                                        Project config is from a .clangd file in the project directory.
                                        User config is from clangd/config.yaml in the following directories:
                                                Windows: %USERPROFILE%\AppData\Local
                                                Mac OS: ~/Library/Preferences/
                                                Others: $XDG_CONFIG_HOME, usually ~/.config
                                        Configuration is documented at https://clangd.llvm.org/config.html
  -j <uint>                           - Number of async workers used by clangd. Background index also uses this many work
ers.
  --pch-storage=<value>               - Storing PCHs in memory increases memory usages, but may improve performance      
    =disk                             -   store PCHs on disk
    =memory                           -   store PCHs in memory

clangd protocol and logging options:

  --log=<value>                       - Verbosity of log messages written to stderr
    =error                            -   Error messages only
    =info                             -   High level execution tracing
    =verbose                          -   Low level details
  --offset-encoding=<value>           - Force the offsetEncoding used for character positions. This bypasses negotiation 
via client capabilities
    =utf-8                            -   Offsets are in UTF-8 bytes
    =utf-16                           -   Offsets are in UTF-16 code units
    =utf-32                           -   Offsets are in unicode codepoints
  --path-mappings=<string>            - Translates between client paths (as seen by a remote editor) and server paths (wh
ere clangd sees files on disk). Comma separated list of '<client_path>=<server_path>' pairs, the first entry matching a g
iven path is used. e.g. /home/project/incl=/opt/include,/home/project=/workarea/project
  --pretty                            - Pretty-print JSON output
```

这一下，所有的命令行选项都出来了，而且解释也比较清楚，我到网上搜索文档反而是灯下黑的舍近求远了。

----------

参考：<https://zhuanlan.zhihu.com/p/364518020>


