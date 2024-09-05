---
title: VSCode 定制 Python 运行的快捷键
date: 2022-09-09 16:40:03
updated: 2022-09-09 17:32:39
tags:
- Python
- VSCode
categories:
index_img: https://i.imgur.com/Wua9Y4e.png
banner_img: https://i.imgur.com/Wua9Y4e.png
---

Python 和 js 一样，都是脚本语言。好吧，Python 才是我更加熟悉的脚本语言。然后，VSCode 对 Python 的支持其实是很完善的，执行当前的脚本的话，我们当然可以使用默认的 `Ctrl + F5`，只是，这个默认的行为是有点慢的，而 Python 执行脚本不需要这么慢，我不想时间花在 Shell 上面。因此，就模仿我之前的配置 nodejs 的 json [配置](https://fanlumaster.github.io/2022/08/24/VSCode-%E5%AE%9A%E5%88%B6-nodejs-%E8%BF%90%E8%A1%8C%E5%BF%AB%E6%8D%B7%E9%94%AE/)，同样地，改造了这个 `Ctrl + F5` 快捷键，直接将 `python filename` 输送到 terminal 不就可以了嘛，呵，

```json
{
  "key": "ctrl+f5",
  "command": "extension.multiCommand.execute",
  "when": "editorTextFocus && editorLangId == 'python'",
  "args": {
    "sequence": [
      "workbench.action.files.saveAll",
      {
        "command": "workbench.action.terminal.sendSequence",
        "args": {
          "text": "clear \u000D"
        }
      },
      "workbench.action.terminal.focus",
      {
        "command": "workbench.action.terminal.sendSequence",
        "args": {
          "text": "python '${file}'\u000D"
        }
      },
      "workbench.action.focusActiveEditorGroup"
    ]
  }
}
```

这下执行 python 脚本快多了，比什么 PyCharm 之流要好多了。当然啦，这个只适合执行一些小脚本，或者说，写一写算法题之类。
