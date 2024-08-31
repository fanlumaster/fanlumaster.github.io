---
title: Hexo 在使用 github actions 部署时更新时间信息丢失
date: 2024-08-31 09:29:18
tags:
- 博客
- GitHub
categories:
index_img: https://i.postimg.cc/RZzvzCQR/image.png
banner_img: https://i.postimg.cc/3YkNmdkP/image.png
---

为了省事儿和跨设备写作，把 hexo 的构建和生成的工作交给了 github actions。结果，发现 updated time 出了问题。

理由也很简单，之前是使用 hexo 在本地的机器上进行 generate 的，更新时间是直接从本地的 markdown 文件的属性里面去获取的，所以，没有什么问题。但是，git 是不记录文件的 modified time 的。

那怎么办呢？

需要处理两个事情。

- 1、时间的问题，github actions 无法从文件的属性获取修改时间。
- 2、时区的问题。github actions 默认是 utc 时区，默认 +0 而非北京的 +8。

时间的问题，一方面可以折中一下，使用 hexo 的 front-matter 中的 updated 属性来手动把更新日期加上，这个手动，当然是指用 py 脚本来干着活儿了。

然后，作为补充，要加一个自动化脚本，即，在 CI 构建的时候，利用 bash 去修改文件的修改日期为该文件被 git 最后记录的一次，这里需要注意一下 `fetch-depth` 的问题，如果不设置为 0，那么，自动化构建不会拉去 git 所有的历史记录，也就不会正确地根据提交记录来修改文件的修改时间了。

```yaml
- uses: actions/checkout@v4
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    fetch-depth: 0
    # If your repository depends on submodule, please see: https://github.com/actions/checkout
    submodules: recursive
- name: Update file timestamps based on last Git commit
  run: |
    git ls-files -z | while IFS= read -r -d '' file; do
      commit_date=$(git log -1 --format="%ci" "$file")
      adjusted_date=$(date -d "$commit_date 8 hours" "+%Y-%m-%d %H:%M:%S %z")
      # only for debug
      # echo "Updating timestamp for $file to $adjusted_date"
      touch -d "$adjusted_date" "$file"
    done
```

然后，就是时区的问题，这里就 hard code 一下一下吧，直接手动给加上八个小时。上面的脚本中也有体现。

这一波操作下来，大概就没有问题了。

----------

参考：

1、<https://github.com/theme-next/hexo-theme-next/issues>


