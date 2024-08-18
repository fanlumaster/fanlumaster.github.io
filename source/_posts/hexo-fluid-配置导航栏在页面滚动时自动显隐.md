---
title: hexo-fluid 配置导航栏在页面滚动时自动显隐
date: 2023-06-09 22:57:38
tags:
- 博客
categories:
index_img: https://i.imgur.com/9a6j7N2.png
banner_img: https://i.imgur.com/9a6j7N2.png
---

这个问题可以通过自定义 js 脚本来解决，无侵入式修改。而 hexo-fluid 配置自定义的 js 文件也是比较轻松的，文档里面写得是比较清晰的，我们在 fluid 的主题配置文件里面指定一下自定义的 js 文件即可，

![](https://i.imgur.com/XMBZE3u.png)

为了同时拥有动画效果，我们也得指定一下 css 文件，做法和上面是一样的，然后具体创建(如果原来没有的话)修改两个文件，一个是 js 文件，我们通过在网页中查看这个 html 元素，然后在 js 代码中定位到这个元素，然后作具体的修改，

```js
var navbarWidget = document.getElementById("navbar");

function toggleNavbar() {
  var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  window.addEventListener('scroll', function () {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (prevScrollPos > currentScrollPos) {
      // 向上滚动，显示导航栏
      // document.querySelector('nav').style.top = '0';
      // navbarWidget.classList.remove('nav-hidden');
      navbarWidget.style.top = '0';
    } else {
      // 向下滚动，隐藏导航栏
      // document.querySelector('nav').style.top = '-100px'; // 根据需要设置隐藏的位置
      // navbarWidget.classList.add('nav-hidden');
      navbarWidget.style.top = '-100px';
    }
    prevScrollPos = currentScrollPos;
  });
};

window.onload = function () {
  toggleNavbar();
};
```

上面这段 js 代码其实是比较简单的，这个问一下 chatgpt 都可以得到类似的效果。

然后是动画效果，在我们的 `custom.css` 文件里面加入如下代码片段，

```css
/* 导航栏动画 */
#navbar {
  transition: all 0.3s;
  font-size: 1rem;
}

.navbar .nav-item .nav-link {
    display: block;
    color: var(--navbar-text-color);
    transition: color 0.3s, background-color 0.3s;
}

.navbar .nav-item .nav-link i {
    font-size: 1rem;
}
```

这里我还多做了一个步骤，那就是把导航栏的字体大小调整成了 `1rem`，这个其实是为了和移动端自适应的时候保持一致，那么，这样的话，浏览器在缩放宽度的时候字体的动画效果就不会因为大小的问题而产生视觉上的不好的观感。

