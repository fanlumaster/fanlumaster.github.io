---
title: VSCode 定制 nodejs 运行快捷键
date: 2022-08-24 01:48:33
tags:
- VSCode
categories:
index_img: https://i.imgur.com/djkEiqV.jpg
banner_img: https://i.imgur.com/djkEiqV.jpg
---

问题的场景呢，是想借着使用 js 同时刷一下算法题，然后学习一下 js 的基本使用。然后在 VSCode 中配置一下最方便。

首先是要安装 `multi-command` 这个插件的。然后定制快捷键即可。

```json
{
    "key": "ctrl+f5",
    "command": "extension.multiCommand.execute",
    "when": "editorTextFocus && editorLangId == 'javascript'",
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
                    "text": "node '${file}'\u000D"
                }
            },
            "workbench.action.focusActiveEditorGroup"
        ]
    }
}
```
