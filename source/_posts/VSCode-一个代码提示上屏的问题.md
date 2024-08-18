---
title: VSCode 一个代码提示上屏的问题
date: 2023-04-06 14:20:47
tags:
- VSCode
categories:
index_img: https://i.imgur.com/lB1MTEq.png
banner_img: https://i.imgur.com/lB1MTEq.png
---

所遇到的问题：在引号里面的代码提示出现时，如果按下 `/`，那么，代码提示框中的第一个选项会自动上屏。

我的需求：取消这种行为。

解决：经过询问 chatgpt，发现这个是 Intellisense 的问题，我们只需要在设置中把 `Editor: Accept Suggestion On Commit Character` 给取消勾选即可，

![](https://i.imgur.com/FNLXsPy.png)

如果是直接在 `settings.json` 中修改的话，配置是这个样子的，

```json
"editor.acceptSuggestionOnCommitCharacter": false,
```
