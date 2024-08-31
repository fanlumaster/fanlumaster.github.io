---
title: 如何修改 VSCode 中 vim 插件的撤销的行为，使其和 VSCode 默认的撤销一致
date: 2022-08-29 17:36:13
updated: 2022-08-29 18:46:40
tags:
- VSCode
- vim
categories:
index_img: https://i.imgur.com/vchKIV0.png
banner_img: https://i.imgur.com/vchKIV0.png
---

要想达到这个目标，其实我们可以这样做——给 vim 插件单独配置一份 vimrc 配置，然后将 vim 的撤销操作重新映射一下，使其一个单词一个单词的撤销。但是，经过我的试验，发现 vim 插件不能够正确地读取并应用这个配置。

因此，采用了另一种思路，就是直接利用这个 vim 插件在 `settings.json` 文件中可以设置的配置，将 `normal` 模式下的 `u` 给重新映射一下，映射成 VSCode 本身的撤销操作，这样就可以了，

```json
"vim.normalModeKeyBindingsNonRecursive": [
    {
        "before": [
            "u"
        ],
        "commands": [
            "undo"
        ]
    },
    {
        "before": [
            "C-r"
        ],
        "commands": [
            "redo"
        ]
    }
]
```

---

参考；

1、<https://github.com/vscodevim/vim/issues/1490>
