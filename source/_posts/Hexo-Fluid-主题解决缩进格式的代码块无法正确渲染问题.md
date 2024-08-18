---
title: Hexo Fluid 主题解决缩进格式的代码块无法正确渲染问题
date: 2021-06-06 23:10:37
tags:
- Hexo
- Fluid
categories:
- Hexo
index_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210606232105.png
banner_img: https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210606232105.png
---

## Bug 描述

我的问题是在代码高亮配置为 highlightjs 的 Atom One Dark 的情况下，关于采用 TAB 键缩进的代码无法正常渲染，效果如下

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210606220528.png)

主题配置文件中的相关配置如下

```yml
# 代码高亮
# Code highlight
highlight:
  enable: true

# 代码块是否显示行号
# If true, the code block display line numbers
line_number: true

# 实现高亮的库，对应下面的设置
# Highlight library
# Options: highlightjs | prismjs
lib: "highlightjs"

highlightjs:
  # 在链接中挑选 style 填入
  # Select a style in the link
  # See: https://highlightjs.org/static/demo/
  style: "Atom One Dark"

  # 是否根据 style 改变代码背景色（如果 style 是深色背景别忘了开启此项）
  # If true, the code background will change color based on the style (If style has a dark background, don't forget to true)
  bg_color: true

prismjs:
  # 在下方链接页面右侧的圆形按钮挑选 style 填入，也可以直接填入 css 链接
  # Select the style button on the right side of the link page, you can also set the CSS link
  # See: https://prismjs.com/
  style: "default"

  # 设为 true 高亮将本地静态生成（并只支持部分 prismjs 插件），设为 false 高亮将在浏览器通过 js 生成
  # If true, it will be generated locally (but some prismjs plugins are not supported). If false, it will be generated via JS in the browser
  preprocess: true
```

## 解决方法

### 增加 custom.css 文件

根据官方文档(<https://fluid-dev.github.io/hexo-fluid-docs/guide/#%E8%87%AA%E5%AE%9A%E4%B9%89-js-css-html>)给出的自定义 css 的方法，在 source 目录下新建一个 css 目录，然后在 css 目录下新建一个 `custom.css` 文件，内容如下

```css
pre code {
    color: #abb2bf;
}
```

即通过修改代码颜色来解决问题。

### 修改主题配置文件

```yml
# 指定自定义 .css 文件路径，用法和 custom_js 相同
# The usage is the same as custom_js
custom_css: /css/custom.css
```

验证一下

![](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210606231703.png)

发现成功解决。