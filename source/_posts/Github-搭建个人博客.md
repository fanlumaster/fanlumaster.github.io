---
title: Github 搭建个人博客
date: 2021-03-22 00:27:27
updated: 2024-08-03 01:24:58
tags: 搭建博客
categories: 博客相关
index_img: https://i.imgur.com/tejnKky.png
banner_img: https://i.imgur.com/tejnKky.png
description: 搭建博客相关...
---

> 这里假设我们所有的准备工作都已经做好了，比如 npm 的安装、hexo 的安装等等。

## 基本部署

执行下面的命令进行初始化。

```shell
hexo init
```

<!-- more -->

![20210321221904](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321221904.png)

然后执行：

```shell
hexo g
```

生成静态文件，命令执行后文件夹如下：

![20210321222053](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321222053.png)

然后，执行 `hexo s` 命令，在本地浏览器预览一下

![20210321222858](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321222858.png)

![20210321222821](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321222821.png)

之后，配置根目录下的 `_config.yml` 文件

```yml
deploy:
  type: git
  repository: git@github.com:fanlumaster/fanlumaster.github.io.git
  branch: master
```

![20210321222711](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321222711.png)

### 安装插件和部署到 Github

安装插件命令

```bash
npm install hexo-deployer-git --save
```

部署命令

```bash
hexo d
```

![20210321224721](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321224721.png)

可以访问 <https://fanlumaster.github.io> 来检验是否部署成功，下面是部署成功的页面

![20210321224948](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321224948.png)

我们再看一下我们的 Github 仓库

![20210322002245](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210322002245.png)

发现多了好多文件，到这里，基本的部署就完成了，接下来就是要学习如何美化博客了。

## 美化博客

首先，我们选择的是 `NextT` 主题，第一步，先将其代码克隆到根目录下的 themes 文件夹下

```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

这里要注意，这个仓库名是最新的，以前有些博客搭建教程上的已经过期。

这里我们使用 git 的好处是之后的更新可以使用 `git pull` 来快速更新。

然后，启用主题。打开根目录下站点配置文件 `_config.yml`，找到 `theme` 字段，并将其值更改为 `next`，如下

![20210321225901](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321225901.png)

然后，打开主题的 `_config.yml` 文件，不是**站点文件**，找到 `Scheme Settings`

![20210321230047](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321230047.png)

![20210321230228](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321230228.png)

`next` 主题有四个样式，想用哪一个，就把其注释给取消即可，这里使用的是 `Gemini` 主题。

在切换主题之后、验证之前，我们最好使用 `hexo clean` 来清除 Hexo 的缓存，以免出现一些莫名其妙的问题。

然后重新执行 `hexo g` 以及 `hexo s` 来重新生成本地预览，如下

注意，这里有一个**坑**，修改主题的 `_config.yml` 配置时，这里是更换 `scheme`，没有将原来的 `scheme` 给注释掉，导致会出现 `ERROR Theme config load failed.`

![20210321232200](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321232200.png)

解决完坑之后，我们重新执行那三条指令：

```bash
hexo clean
hexo g # 生成静态文件
hexo s # 生成本地预览
```

![20210321233034](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321233034.png)

到这里，主题就更换成功了。

#### 配置站点信息

打开站点根目录下的 `_config.yml`，设置如下内容

![20210401231748](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210401231748.png)

参数说明：

- title: 网站标题
- subtitle: 网站副标题
- description: 网站描述
- keywords: 关键字
- author: 作者
- language: 网站使用的语言
- timezone: 网站时区。Hexo 默认使用您电脑的时区

其中，language 一定要设置为主题能够识别的语言（不然中文可能出现乱码），在 `\themes\next\languages\` 中可以找到，中文有两种格式，`zh-CN`、`zh-hk`、`zh-tw` 可选。

## 高级配置

#### 创建一篇博文

执行如下命令

```bash
hexo new 'blog_name' # blog_name 填入文章名称
```

Hexo 会帮我们在 `..\source\_posts` 下生成相关 `md` 文件

![20210321234534](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321234534.png)

#### _config.yml 文件

网站配置信息，也就是本文所称的**站点配置文件**，可以在此配置大部分的参数。我们之前也在这个文件里面配置了一些基本的配置。

#### scaffolds 文件

![20210321234856](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210321234856.png)

模板文件夹，新建文章时，Hexo 会根据 `scaffolds` 来建立文件。默认的模板有三种 `draft.md`、`page.md`、`post.md`，我们也可以在该文件夹下创建属于自己定制的模板，推荐格式如下：

- title: 测试模板文件
- date: {{ date }}
- tags:
- categories:
- description:

然后，输入 `hexo new blog '文章名'` 进行测试。

按：这里并没有进行真正的测试，命令的使用也有点模糊，比如，如果需要使用某个模板，那么，在新建文章时，是否需要再加必要的参数？

#### public

该文件夹中的内容最终将被 `push` 到 `Github` 仓库中。

#### source

资源文件夹是存放用户资源的地方，除 `_posts` 文件夹之外，开头命名为 `_(下划线)` 的文件 / 文件夹将会被忽略。`Markdown` 和 `HTML` 文件会被解析并放到 `public` 文件夹，而其他文件会被拷贝到 `public` 文件夹。

#### themes

主题文件夹，下载的主题都保存在此文件夹下。Hexo 会根据主题来生成静态页面。

另外主题的配置也有很多高级技巧，更多可以参考 Next 的官方网站。

还有许多个性化设置，如SEO、评论系统、个人头像、博客分享、订阅功能High功能、404网页设置等，可以参看：

- 主题配置 - NexT 使用文档
- 第三方服务集成 - NexT 使用文档
- 内置标签 - NexT 使用文档
- 进阶设定 - NexT 使用文档
- High功能特效 - Next 主题网站推荐博主的文章

#### 寻找图床

我这里本身也是使用 `Github` 搭建的图床。免费且稳定。

## Hexo 常用命令

#### 常见命令

1. hexo new 'postName' # 新建文章
2. hexo clean # 清除缓存
3. hexo generate # 生成静态页面至 public 目录
4. hexo server # 开启预览访问端口（默认端口是 4000,‘Ctrl + C’ 关闭 server）
5. hexo deploy # 部署到 Github
6. hexo help # 查看帮助
7. hexo version # 查看 Hexo 的版本

#### 缩写

1. hexo n == hexo new
2. hexo g == hexo generate
3. hexo s == hexo server
4. hexo d == hexo deploy

#### 组合命令

1. hexo s -g # 生成本地预览
2. hexo d -g # 生成并上传

![20210322002245](https://cdn.jsdelivr.net/gh/fanlumaster/BlogMaps@master/blogs/pictures/20210322002245.png)
