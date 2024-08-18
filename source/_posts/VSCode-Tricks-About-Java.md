---
title: VSCode Tricks About Java
date: 2022-03-14 21:57:42
tags:
- 工具
categories:
- 工具
index_img: https://i.imgur.com/HUC88at.png
banner_img: https://i.imgur.com/HUC88at.png
---

# 配置环境

这个参考微软官方文档即可。

我安装的所有扩展如下：

![](https://i.imgur.com/HajbaZC.png)

# 去掉 VSCode 关于 Java 的一些语法警告

有时候我发现 VSCode 提供的语法警告很多，而且很多其实没有必要。那么我们就可以根据需要进行配置了。

首先，我们创建一个 `.settings` 目录，然后在目录下面添加一个 `org.eclipse.jdt.core.prefs` 文件。

![](https://i.imgur.com/uI7Xl6M.png)

![](https://i.imgur.com/aeSAoTi.png)

之后我们需要配置忽略什么类型的警告的提示就可以在这个文件里面编辑了。

比如，我这里去掉的一些警告：

```txt
org.eclipse.jdt.core.compiler.problem.unusedLocal=ignore
org.eclipse.jdt.core.compiler.problem.unusedPrivateMember=ignore
org.eclipse.jdt.core.compiler.problem.deprecation=ignore
org.eclipse.jdt.core.compiler.source=1.7
```

完整的配置选项可以参考：

<https://github.com/jenkinsci/analysis-core-plugin/blob/master/.settings/org.eclipse.jdt.core.prefs>

# 配置 Java(JVM) 编译选项

首先，点开左侧的 `Debug` 按钮，然后根据提示创建一个 `launch.json` 文件，

![](https://i.imgur.com/13R02O9.png)

然后，我们就可以在 `launch.json` 文件里面进行编辑了。

比如，我这里需要修改一个配置来测试动态代理：

![](https://i.imgur.com/zcBjjdu.png)

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "Launch Current File",
            "request": "launch",
            "mainClass": "${file}",
            "vmArgs": "--add-opens java.base/java.lang=ALL-UNNAMED"
        },
        {
            "type": "java",
            "name": "Launch Main",
            "request": "launch",
            "mainClass": "com.fan.Main",
            "projectName": "cglibdynamic"
        }
    ]
}
```
