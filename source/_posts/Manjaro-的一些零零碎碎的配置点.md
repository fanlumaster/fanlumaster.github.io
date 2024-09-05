---
title: Manjaro 的一些零零碎碎的配置点
date: 2022-08-07 17:37:43
updated: 2022-09-09 22:03:22
tags:
- Manjaro
categories:
index_img: https://i.imgur.com/lT8atDH.png
banner_img: https://i.imgur.com/lT8atDH.png
---


> 悬而未决

## manjaro 使用 hexo g 报错

加载文件的时间非常长，而且会出现一个报错信息：

```
Database load failed
```

解决方法呢，直接 `npm update hexo` 试一下。

结果，是不行的。

还是总是一次加载时间很长，36s 左右，一次要报错。

呵，暂时按下不表。先睡觉。

> 已经可以解决的问题

## Manjaro 上外网的问题

其实吧，最直接的解决方法是使用 Clash For Windows。

别看这个玩意儿名字里面带了一个 Windows，其实它是一个跨平台软件。

所以我们直接像在 Windows 上使用这个软件一样，直接在 GitHub 上下载，然后解压，找到里面的执行文件运行即可。

什么导入订阅，导入节点之类，就不用赘述啦。

![](https://i.imgur.com/SBNXrLD.png)

然后是设置系统代理：

![](https://i.imgur.com/G7VXRXV.png)

这个 7890 端口也是我们的老朋友啦。

然后就是设置 `.zshrc` 的代理设置了，

![](https://i.imgur.com/xmNaAoI.png)

```bash
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

然后呢，我们肯定是要用到 git 的，所以 git 当然也是要设置代理的，也就是设置 http 和 https 的 proxy，

![](https://i.imgur.com/HXWofl4.png)

## fctix5 的皮肤设置

主要是皮肤，这里这个暗色皮肤和整个系统很搭配：

![](https://i.imgur.com/VCN7Rf8.png)

这个是采用了 fcitx5-breeze 这个皮肤。

经过我的试验，下面标注的两个皮肤是可以直接使用 `yay -S` 进行安装的。

![](https://i.imgur.com/k6f4Byq.png)

然后就是配置皮肤的入口，我是直接使用 fcitx5 默认的 pinyin，可以在这里配置：

![](https://i.imgur.com/mVfgBJR.png)

![](https://i.imgur.com/nlFHbiK.png)

![](https://i.imgur.com/FTQ1sE1.png)

## Manjaro 的 Chrome 在开机后总会弹出 restore pages 界面

很烦，每次开机之后，如果启动 chrome，总是在右上角給我弹出一个那个 restore pages 的玩意儿，而且即使我是正常关闭这个 chrome，下一次开机之后启动 chrome 还是会給我弹这个弹窗，呵呵。

对于这个，我们可以修改 chrome 的 desktop 文件，給它加一个启动参数关闭这个特性就可以了，

![](https://i.imgur.com/e07O4Ex.png)

![](https://i.imgur.com/9EUmAe1.png)

```bash
--disable--session-crashed-bubble
```

## manjaro 下 chrome 无法正确识别出系统的暗色模式

呵呵。

参考[这个链接](https://forum.manjaro.org/t/chrome-doesnt-see-dark-theme-and-displays-site-in-white/113409/8)。

![](https://i.imgur.com/mK32J5o.png)

这里也是采用加启动参数的做法，只是这个更加的解耦，将启动参数单独放在了一个文件中。

```bash
echo "--enable-features=WebUIDarkMode\n--force-dark-mode" >> ~/.config/{chrome,chromium}-flags.conf
```

需要注意的是，像这种修改启动参数的变动，得重新启动系统才能够使之生效。我之前没有重启系统，发现不生效，还以为真的就不生效呢。

下面是生效后的界面，本来这个设置界面是呈现亮瞎人眼的大白色的，

![](https://i.imgur.com/1JjHXTH.png)

## 如何关闭右下角任务栏的大小写提示

每次切换大小写时，右下角的图标总是要出来整一下存在感。呵。直接右键 configure，然后取消勾选即可，

![](https://i.imgur.com/1HAhkEn.png)

## Manjaro 下的 .ssh 文件是放在哪里的？

```bash
/home/fanyfull
```

## Manjaro 修改默认 shell 不生效

我在修改默认 SHELL 之后，使用 `echo $SEHLL` 查看当前的 SHELL 是否修改成功，然后总是给我打印 not change 的消息。

然后 reboot 一下，发现已经修改过来了。呵呵。


## 配置 oh my zsh 自动补全

[链接](https://cangmang.xyz/articles/1642841384360)

## 安装完 oh-my-zsh 之后发现 zsh 配置被覆写了

然后灰色提示没了，代理，别名配置都没了。呵呵。

关于灰色历史提示，就偷懒，直接使用了别人的脚本：

[github](https://github.com/skywind3000/vim/blob/master/etc/zshrc.zsh)

[知乎链接](https://www.zhihu.com/question/21418449)

## 窗口拖动特效

主要是果冻的效果。然后专业术语叫做 deform，形变，呵。

wobbly，摇摇晃晃，摇头晃脑，不太用心。呵。

![](https://i.imgur.com/qdmkHPx.png)

## manjaro 下 git 更改 commit 的编辑器为 neovim

当然，前提得是系统安装了 neovim 才行，然后在 shell 中执行：

```zsh
git config --global core.editor "nvim" 
```

注意，是 `nvim`，不是 `neovim`。

## manjaro 下 vscode vim 没有中文输入法的问题

不会像在 Windows 和 mac 下一样，字符闪烁个不停，烦人。

看来，在 manjaro 上写博客可继续使用我的 VSCode 了。好耶。

分析了一下，应该是 fctix5 的原因。嗯，很好。之前装旧版 fctix 使用谷歌输入法在 VSCode 里面打字也会出现闪烁的问题。

唉，来之不易呀。VSCode 都 1.70 版本了，还是不去修复在 Windows 上的这个 Bug。我呵呵。

## Manjaro 为什么配置了 github ssh 公钥还是无法 push 呢

我个人的原因，是 clone 我自己项目的时候直接选用了第一个 https 的链接，应该选用第二个 ssh 的链接进行克隆的。

之后就可以了。

## ftcix5 自带的 pinyin 导入搜狗词库

在 <https://pinyin.sogou.com/dict/> 中下载相应的词库之后，我们可以打开 `fcitx5 configuratoin->pinyin configuration->dictionaries->import`。

## Manjaro 如何使用 yay 更新某一个具体的包呢？

比如说 VSCode。

首先，执行一下 `yay`，这是 `yay -Syu` 的 alias，`Syu` 即 sysupgrade 的意思。

然后，我们再执行

```zsh
yay -S visual-studio-code-bin
```

不过，我这里是在执行 `yay` 之后就给我提示 vscode 有新的包的，因此我就顺着它直接更新了。

好吧，其实可以直接执行 `yay -S visual-studio-code-bin`，再安装一遍就可以了。

## 记录一下当前的一个字体的尺寸配置

算是有效解决了 Manjaro 字体发虚的问题了吧。主要是有时候会有一点阴影。

现在好多了。

![](https://i.imgur.com/lKt3qcF.png)

![](https://i.imgur.com/OUgWebN.png)

如果能够换上 2k 的屏幕，显示效果应该会更好吧。毕竟，很多显示问题是可以通过提升分辨率来解决的。

## 调整亮度的入口

不需要使用代码，直接在 System Settings 中找到 `Power Management`，然后找到 `Entry Saving` 选项，然后右边的栏目就有一个 `Screen brightness` 选项。

要注意，这个亮度的调节不是热更新的，得 `Apply` 之后才能看到效果。

![](https://i.imgur.com/GjtaDt1.png)

## Manjaro 如何安装字体呢？

最近比较喜欢微软开源的 Cascadia Code 这个字体，主要是这个字体变胖的边界比较容易，胖胖的还是比较好看的。

首先，到 github 上下载这个字体的最新的 release 版本。

然后解压，把 ttf 文件夹改一个名字之后，在终端中复制到 `/usr/share/fonts/` 目录下，然后执行以下命令进行刷新：

```shell
fc-cache -fv
```

之后就可以了。

VSCode 换上这个字体，编写代码明显是更加舒服的。
