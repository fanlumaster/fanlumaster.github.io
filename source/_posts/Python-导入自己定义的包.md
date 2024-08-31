---
title: Python 导入自己定义的包
date: 2022-10-05 14:48:07
updated: 2024-04-07 21:37:45
tags:
- Python
categories:
index_img: https://i.imgur.com/PGJ7CWz.png 
banner_img: https://i.imgur.com/PGJ7CWz.png
---

关键词：Python 包引入问题。

今天又遇到了这个问题。

stackoverflow 上有这个[question](https://stackoverflow.com/questions/43728431/relative-imports-modulenotfounderror-no-module-named-x)，该死，像是设置环境变量的的方法在 PowerShell 中竟然不管用，那个命令执行不了，浪费了不少时间，没有时间去仔细查看那个命令的文档，所以就采用了 py 代码中解决的方式，思路是一样的，就是把相关的模块给添加到系统的环境变量中去，使得可以获得类似于 Python 自带的包一样的效果。

```py
import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..'))) # 这里的路径要根据实际需求来改，主要是把当前项目的根路径要添加到 path 中去
```

我的测试包的引入的文件结构如下：

```
C:.
│  functionality.py
│  main.py
│  
├─anothermodule
│      test.py
│      __init__.py
│      
└─othermodule
    │  second.py
    │  third.py
    │  __init__.py
    │  
    └─submodule
            fouth.py
```

然后就是复习一下 Python 中的自定义的包的引用了。

主要是两个点，一个点上面已经说过了，另一个基础的点就是 `__init__.py` 文件的使用。

```py

# first approach
__all__ = ["second", "third"]

# second approach
from .second import myfunction
from .third import another_function
```

想让别的文件夹下的 py 文件引入某一个文件夹下的某个 py 文件下的代码，我们就要定义这个 `__init__.py`。

如果是根目录下的代码想要引入模块，直接引入就可以了，如果是其他的目录下的代码想要引入模块，那么就得想上面那样，先将项目的根路径添加到系统的环境变量中。

![](https://i.imgur.com/K3KoEtv.png)

![](https://i.imgur.com/NoZAbyn.png)

----------

补充一个案例，

![](https://i.imgur.com/R1Vp1DT.png)

这里，我是想在比如说 leet99 这个目录下的 `leet99.py` 中引入 `utils` 目录下的 buildTreeFromLevelOrder.py 脚本中的类和函数，那么，首先，我需要在 utils 目录下新建一个 `__init.py` 文件，内容可以为空，然后，我们需要在 `leet99.py` 开头加上如下的代码，

```python
# 引入二叉树相关的包
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")))
from utils.buildTreeFromLevelOrder import TreeNode, buildTreeFromLevelOrder
```

注意，这里的代码不能让代码格式化工具给乱了顺序。

此外，这里我使用的 Neovim 中的 pyright 可以正常识别这种引入的语法。

----------

参考：

1、<https://stackoverflow.com/questions/43728431/relative-imports-modulenotfounderror-no-module-named-x>


