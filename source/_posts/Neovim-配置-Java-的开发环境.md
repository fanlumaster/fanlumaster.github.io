---
title: Neovim 配置 Java 的开发环境
date: 2023-11-05 15:12:47
updated: 2023-12-02 19:29:07
tags:
- Neovim
- Java
- 工具
categories:
index_img: https://i.imgur.com/LjKMCJW.png
banner_img: https://i.imgur.com/LjKMCJW.png
---

## 配置

书接上一篇博客，上一篇是讲了在 neovim 中配置 Java 的过程中遇到的一个具体问题，然后给出了相应的解决方法。

这里则是从整体上来讲一下配置这个 Java 环境的过程，以及会遇到的一些问题，以及，我所采取的一些捂盖子的折衷的解决方案。

首先，我采取的是 astronvim 这样一个开箱即用的版本，然后，想增加对 Java 的支持的话，那么，我们就使用 mason 安装一下 Java 的 lsp 即可，

```shell
:MasonInstall jdtls
```

当然，也会有其他的 lsp，不过，这个 jdtls 是 eclipse 出品的，很多年的积累了，质量肯定有保证，VSCode 中的 Java 支持其实也是采取的这个解决方案，所以，用这个是比较靠谱的。

按：安装这个 lsp 的时候，记得用一个比较稳定的节点，因为这个资源似乎有点大，万一中途断掉了，或者代理的配置没有让网络在访问其中的一个子项 lombok 的时候去走代理，那就糟啦。

至此，其实已经可以用了。至少有了代码补全和错误提示的功能。

可是，如果仅仅是到这里的话，那么，它其实是有一个令我难以忍受的点的，那就是这个 lsp 它在底部的 status bar 会不停地反复地闪烁 nil 这个字符串，当时不知道如何处理(因为没有想用丑陋的直接去修改包里面的代码)，遂去 reddit 上看看有没有别人的现成的方案，果然是有的，于是跟着指引回到了 astronvim 的文档，然后，

![](https://i.imgur.com/xs2tnX2.png)

![](https://i.imgur.com/vhQlE8n.png)

然后，就是老规矩，把这里的 init.lua 给复制过来，注意，是复制这个仓库里面的脚本而不是看文档里面的，因为文档里面的代码可能会有些滞后，

![](https://i.imgur.com/G3Fp1D4.png)

然后，我们就可以根据需要，去修改这个文件了。这里之所以命名为 java.lua 是因为 github 上的那个仓库里面把这个社区包命名为 java 的缘故。

把这个处理好了之后，再次启动 neovim，发现会报这样的错误，

![](https://i.imgur.com/NMIYnpF.png)

这究竟是为什么呢？这个问题可以在 [issues](https://github.com/AstroNvim/AstroNvim/issues/2229) 中找到答案，原因就是，现在的这个 astronvim 在 windows 端是不支持 dap 的，

![](https://i.imgur.com/mgOUpcF.png)

不过呢，我个人正好也不太喜欢使用 debug 的方式来调试程序(龟叔是同道中人这一点倒也是很以外)，所以，那，在 windows 端干脆就把这个 dap 给屏蔽掉好了。

那么，如果我们想去屏蔽掉 dap，该做些什么呢？这其实不是一件容易的事情，如果想做好的话，但是我这里就仅仅是把盖子给捂住，所以，最终从结果上看，是屏蔽掉了，

首先，在刚才的 `java.lua` 文件中注释掉所有和 dap 相关的代码行，

```lua
local utils = require "astronvim.utils"

return {
  {
    "nvim-treesitter/nvim-treesitter",
    opts = function(_, opts)
      if opts.ensure_installed ~= "all" then
        opts.ensure_installed = utils.list_insert_unique(opts.ensure_installed, { "java", "html" })
      end
    end,
  },
  {
    "williamboman/mason-lspconfig.nvim",
    opts = function(_, opts)
      opts.ensure_installed = utils.list_insert_unique(opts.ensure_installed, { "jdtls", "lemminx" })
    end,
  },

  {
    "jay-babu/mason-null-ls.nvim",
    opts = function(_, opts) opts.ensure_installed = utils.list_insert_unique(opts.ensure_installed, "clang_format") end,
  },

  -- {
  --   "jay-babu/mason-nvim-dap.nvim",
  --   opts = function(_, opts)
  --     opts.ensure_installed = utils.list_insert_unique(opts.ensure_installed, { "javadbg", "javatest" })
  --   end,
  -- },

  {
    "mfussenegger/nvim-jdtls",
    ft = { "java" },
    init = function() astronvim.lsp.skip_setup = utils.list_insert_unique(astronvim.lsp.skip_setup, "jdtls") end,
    dependencies = { "williamboman/mason-lspconfig.nvim" },
    opts = function(_, opts)
      -- use this function notation to build some variables
      local root_markers = { ".git", "mvnw", "gradlew", "pom.xml", "build.gradle", ".project" }
      local root_dir = require("jdtls.setup").find_root(root_markers)
      -- calculate workspace dir
      local project_name = vim.fn.fnamemodify(vim.fn.getcwd(), ":p:h:t")
      local workspace_dir = vim.fn.stdpath "data" .. "/site/java/workspace-root/" .. project_name
      os.execute("mkdir " .. workspace_dir)

      -- get the current OS
      local os
      if vim.fn.has "mac" == 1 then
        os = "mac"
      elseif vim.fn.has "unix" == 1 then
        os = "linux"
      elseif vim.fn.has "win32" == 1 then
        os = "win"
      end

      -- ensure that OS is valid
      if not os or os == "" then
        require("astronvim.utils").notify("jdtls: Could not detect valid OS", vim.log.levels.ERROR)
      end

      local defaults = {
        cmd = {
          "java",
          "-Declipse.application=org.eclipse.jdt.ls.core.id1",
          "-Dosgi.bundles.defaultStartLevel=4",
          "-Declipse.product=org.eclipse.jdt.ls.core.product",
          "-Dlog.protocol=true",
          "-Dlog.level=ALL",
          "-javaagent:" .. vim.fn.expand "$MASON/share/jdtls/lombok.jar",
          "-Xms1g",
          "--add-modules=ALL-SYSTEM",
          "--add-opens",
          "java.base/java.util=ALL-UNNAMED",
          "--add-opens",
          "java.base/java.lang=ALL-UNNAMED",
          "-jar",
          vim.fn.expand "$MASON/share/jdtls/plugins/org.eclipse.equinox.launcher.jar",
          "-configuration",
          vim.fn.expand "$MASON/share/jdtls/config",
          "-data",
          workspace_dir,
        },
        root_dir = root_dir,
        settings = {
          java = {
            eclipse = {
              downloadSources = true,
            },
            configuration = {
              updateBuildConfiguration = "interactive",
            },
            maven = {
              downloadSources = true,
            },

            implementationsCodeLens = {
              enabled = true,
            },
            referencesCodeLens = {
              enabled = true,
            },
          },
          signatureHelp = {

            enabled = true,
          },
          completion = {
            favoriteStaticMembers = {
              "org.hamcrest.MatcherAssert.assertThat",
              "org.hamcrest.Matchers.*",
              "org.hamcrest.CoreMatchers.*",
              "org.junit.jupiter.api.Assertions.*",
              "java.util.Objects.requireNonNull",
              "java.util.Objects.requireNonNullElse",
              "org.mockito.Mockito.*",
            },
          },
          sources = {
            organizeImports = {
              starThreshold = 9999,
              staticStarThreshold = 9999,
            },
          },
        },
        init_options = {
          -- bundles = {
          --   vim.fn.expand "$MASON/share/java-debug-adapter/com.microsoft.java.debug.plugin.jar",
          --   -- unpack remaining bundles
          --   (table.unpack or unpack)(vim.split(vim.fn.glob "$MASON/share/java-test/*.jar", "\n", {})),
          -- },
        },
        handlers = {
          ["$/progress"] = function()
            -- disable progress updates.
          end,
        },
        filetypes = { "java" },
        on_attach = function(client, bufnr)
          -- require("jdtls").setup_dap { hotcodereplace = "auto" }
          require("astronvim.utils.lsp").on_attach(client, bufnr)
        end,
      }

      -- TODO: add overwrite for on_attach

      -- ensure that table is valid
      if not opts then opts = {} end

      -- extend the current table with the defaults keeping options in the user opts
      -- this allows users to pass opts through an opts table in community.lua
      opts = vim.tbl_deep_extend("keep", opts, defaults)

      -- send opts to config
      return opts
    end,
    config = function(_, opts)
      -- setup autocmd on filetype detect java
      vim.api.nvim_create_autocmd("Filetype", {
        pattern = "java", -- autocmd to start jdtls
        callback = function()
          if opts.root_dir and opts.root_dir ~= "" then
            require("jdtls").start_or_attach(opts)
            -- require('jdtls.dap').setup_dap_main_class_configs()
          else
            require("astronvim.utils").notify(
              "jdtls: root_dir not found. Please specify a root marker",
              vim.log.levels.ERROR
            )
          end
        end,
      })
      -- create autocmd to load main class configs on LspAttach.
      -- This ensures that the LSP is fully attached.
      -- See https://github.com/mfussenegger/nvim-jdtls#nvim-dap-configuration
      vim.api.nvim_create_autocmd("LspAttach", {
        pattern = "*.java",
        callback = function(args)
          local client = vim.lsp.get_client_by_id(args.data.client_id)
          -- ensure that only the jdtls client is activated
          -- if client.name == "jdtls" then require("jdtls.dap").setup_dap_main_class_configs() end
        end,
      })
    end,
  },
}
```

然后，这个时候，如果我们从命令行中打开 neovim，并且在 telescope 中打开一个文件的话，已经没有问题了，但是，如果是从 nvim-tree 中打开一个 java 文件的话，那么，底部的状态栏会弹出提示说 `nvim-dap is not available`，这个我暂时没有好的解决方法，只能把源码的包里面的内容给注释掉，windows 下，这个 nvim-data 目录是在这个地方，

```shell
$ echo $env:LOCALAPPDATA\nvim-data
C:\Users\fanyfull\AppData\Local\nvim-data
```

![](https://i.imgur.com/pCiZfwf.png)

这里其实就是全局搜索，然后能替换我就替换了。

至此，neovim 的 java 环境算是搭建完毕。不过，这个 java 环境也只是和 VSCode 类似，只能用来写一些很小的项目，比如写一写算法题，或者熟悉一下语法，提高编码的熟练度可以用一用，比较轻量，结合 neovide 可以把兴趣给拉上来。毕竟，和游戏很像嘛。

## pwsh 脚本

这里采用了 powershell 脚本来执行当前所在的 java 文件。思路比较笨重。偶尔用一用还是可以的。说起这个，还是 cmake 更好一点呀，使用脚本完全不必使用 IDE 慢。

```pwsh
# 输入的路径
# $path = "C:/EDisk/JavaCodes/Algorithms-Four/Trie/algo/src/main/java/com/fanyfull/TrieST.java"
$path = $args[0]
$path = $path -replace '\\', '/'

$winPath = $path -replace '/', '\\'
# $winPath = $path

# 使用Split-Path获取src之前的路径
$srcParentPath = (Split-Path -Path $winPath -Parent) -split '\\src\\' | Select-Object -First 1
# C:\EDisk\JavaCodes\Algorithms-Four\Trie\algo\target\classes
$targetClassPath = $srcParentPath + "\target\classes"

# 使用正则表达式提取 "main/java/" 后面的部分
$match = [regex]::Match($path, 'main/java/(.+?)\.java')

# 获取匹配的部分
$matchedString = $match.Groups[1].Value
# 替换斜杠为点号
$className = $matchedString -replace '/', '.'

$firstStr = "& 'C:\Users\fanyfull\scoop\apps\openjdk17\17.0.2-8\bin\java.exe' '-XX:+ShowCodeDetailsInExceptionMessages' '-cp'"
$secondStr = $targetClassPath
$thirdStr = $className
$fullCmd = $firstStr + " " + $secondStr + " " + $thirdStr

Write-Host "start compiling..."
mvn compile
Write-Host "compiled success"
Write-Host "---------------------------------------------------"
Invoke-Expression $fullCmd
```


