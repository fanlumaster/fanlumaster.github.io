---
title: 如何给 hexo-fluid 主题的博客文章添加更新的时间信息
date: 2023-06-09 21:50:06
tags:
- 博客
categories:
index_img: https://i.imgur.com/ciFbyXZ.png
banner_img: https://i.imgur.com/ciFbyXZ.png
---

hexo-fluid 这个主题本身提供了一个显示更新日期的方式，但是，它不满足我的要求，它并不是制作一个类似于创建日期一样的 html 小部件在标题的下面，而是使用了一个类似于标题一样的样式嵌在了文章的身体里面，这样子是很丑的，效果和底部的版权声明是类似的，

![](https://i.imgur.com/eOcxqvY.png)

实际上，我想要的是直接在标题的创建时间这个信息的旁边添加一个更新的时间就可以了。

这个需求无法通过 fluid 自带的配置来实现，只能够去到这个主题的源码文件里面去修改了。所以我们就直接到 node_modules 中的 `hexo-theme-fluid` 目录下去修改，主要是这两个文件，

![](https://i.imgur.com/EwWCKSa.png)

接下来就是具体操作的步骤，其背后的原理不难，就不作具体的复述。

首先，配置主题 `_config.fluid.yml` 配置文件中的 `updated` 选项为 `true`，

![](https://i.imgur.com/ZSaycyP.png)

这个在后面更改 ejs 文件的时候会用到。

然后，来到之前的 `post.ejs` 文件中，把以下的代码注释掉，注释掉之后是这个样子，

```html
<!-- fanyfull 注释原本的更新时间 start -->
<!-- <% if(theme.post.updated && theme.post.updated.enable) { %>
    <p class="note note-info">
    <% if (theme.post.updated.relative) { %>
        <%- theme.post.updated.content %><%- relative_date(page.updated, theme.post.meta.date.format) %>
    <% } else { %>
        <%- theme.post.updated.content %><%- date(page.updated, theme.post.meta.date.format) %>
    <% } %>
    </p>
<% } %> -->
<!-- fanyfull 注释原本的更新时间 end -->
```

然后再来到 `post-meta.ejs` 代码中，添加如下代码，

```html
<% if (theme.post.updated && theme.post.updated.enable) { %>
<span>-</span>
<span class="post-meta">
    <i class="iconfont icon-date-fill" aria-hidden="true"></i>
    <time datetime="<%= date(page.updated, 'YYYY-MM-DD HH:mm') %>" pubdate>
    <!-- <%= date(page.updated, theme.post.meta.date.format) %> -->
    <%= date(page.updated, 'YYYY-MM-DD HH:mm' ) %>
    </time>
</span>
<% } %>
```

![](https://i.imgur.com/KwoB77M.png)

之后，像这里的 `page.updated`、`theme.post.updated` 这些变量其实是 hexo 自己的变量，在[这里](https://hexo.io/zh-cn/docs/variables.html)可以查到，而具体一点，比如 `theme.post.updated` 其实就是上面我们在配置文件中设置的那个 `updated`。然后这里的时间我们可以在每一篇文章的头信息里面添加一条 `updated`，其格式保持和 `date` 保持一致，我们也可以不写，那么，默认的更新时间就是此 md 文件最后一次修改的时间。

到这里，这个问题就解决了，我们再执行一下 `hexo g`，然后 `hexo s` 预览一下，效果如下，

![](https://i.imgur.com/dJskhpJ.png)

---

参考：  
1、[Hexo Fluid--博客装修整理](https://www.pplong.top/2022/04/07/Hexo-Fluid-%E5%8D%9A%E5%AE%A2%E8%A3%85%E4%BF%AE/)