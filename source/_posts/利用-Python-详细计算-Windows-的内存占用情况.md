---
title: 利用 Python 详细计算 Windows 的内存占用情况
date: 2022-09-29 18:09:59
tags:
- Windows
categories:
index_img: https://i.imgur.com/ZpdgW6w.png
banner_img: https://i.imgur.com/38ScglI.jpg
---

其实是利用了 Python 调用 PowerShell 的命令 `tasklist`，然后手动计算。

所以，这篇博客的关键词还可以是如何在 Python 中执行 PowerShell 的命令。

代码是比较简单的，也是想放在 Gist 上的本来，可惜，不太方便呀。

```py
import locale
import subprocess
import sys

p = subprocess.Popen(['C:\\Program Files\\PowerShell\\7\\pwsh', '-Command', 'tasklist > tmp.txt'],
                     stdout=sys.stdout, encoding='utf8')
p.communicate()

locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')

with open('./tmp.txt', encoding='utf8') as f:
    lines = f.readlines()

numsList = []
index = 0
totalSize = 0
for line in lines:
    if (index < 3):
        index += 1
        continue
    curLine = line.split()
    numsList.append(curLine[-2])
    curNum = locale.atoi(curLine[-2])
    totalSize += curNum
    index += 1

print('The memory usesage:')
print('  ' + str(totalSize) + " KB")
totalSizeMB = totalSize / 1024
print('  ' + str(totalSizeMB) + " MB")
totalSizeGB = totalSize / (1024 * 1024)
print('  ' + str(totalSizeGB) + " GB")
percentage = totalSizeGB / 64 * 100
print('  ' + str(percentage) + "%")
```
