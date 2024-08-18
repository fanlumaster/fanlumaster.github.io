---
title: go 的本地和三方模块引入
date: 2024-01-14 23:03:52
tags:
- go
categories:
index_img: https://i.imgur.com/S5CKHnS.png
banner_img: https://i.imgur.com/S5CKHnS.png
description: '一个初学者的问题：go 的本地和三方模块引入'
---

go module 如何导入一个本地的包呢？以及，如何导入一个三方的包呢？

这是一个初学者的问题，却也值得记录。

首先，要搞清楚一件事情，在 go 里面的代码，并不是类似于 Python 的单文件脚本，而是类似于 C 那样，一个项目只有一个 main 函数，对于代码的引入，不是直接把一个文件的相对路径给包含进来这种做法，而是以一整个包的形式进行引入，对于某一个具体的包，其中所有的 go 文件中的函数都会被一起暴露出来，所以，在同一个包里面，不同的代码之间也是不可以有重复的函数的(应该是这样，go 生手，以后可能会回来纠正优化)。

注意，`GO111MODULE` 这个语言选项在当前以及未来的语言版本中，默认就是开启的，不用特意去设置。

## 本地包的导入

### 不同的包在同一个项目下

首先，

```pwsh
mkdir moduledemo
cd moduledemo
```

然后，

```pwsh
go mod init moduledemo
```

此时，生成了一个 `go.mod` 文件，长这样，

```pwsh
module moduledemo

go 1.21.6
```

然后，新建一个 `main.go` 文件，

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("main")
}
```

然后，

```pwsh
mkdir mypackage
cd mypackage
```

然后，在这个 mypackage 目录下新建一个 `mypackage.go` 文件，

```go
package mypackage

import "fmt"

func New(){
	fmt.Println("mypackage.New")
}
```

然后，修改之前的 `main.go` 代码，

```go
package main

import (
	"fmt"
	"moduledemo/mypackage"
)

func main() {
	mypackage.New()
	fmt.Println("main")
}
```

然后，我们在 `main.go` 所在的目录下执行 `go run .`，

```pwsh
❯ go run .
mypackage.New
main
```

上面的包可以说是和 `main.go` 同级的包，那么，如果我想在 mypackage 中嵌套呢？请看下面的试验，

![](https://i.imgur.com/FFqefbn.png)

本地包，并且不同的包在同一个项目下的导入差不多就是这些了，其他的形式都可以依此变化得到。

### 不同的包在不同项目下

首先，进入一个干净的目录，

```pwsh
mkdir moduledemo
mkdir mypackage
cd moduledemo
go mod init moduledemo
cd ../mypackage
go mod init mypackage
cd ..
```

然后，在 mypackage 目录下新建一个 `mypackage.go` 文件，

```go
package mypackage

import "fmt"

func New(){
	fmt.Println("mypackage.New")
}
```

然后，修改 `moduledemo/go.mod`，

```txt
module moduledemo

go 1.21.6

require mypackage v0.0.0

replace mypackage => ../mypackage
```

然后，在 moduledemo 目录下新建一个 `main.go` 文件，

```go
package main

import (
	"fmt"
	"mypackage"
)
func main() {
	mypackage.New()
	fmt.Println("main")
}
```

然后，在 moduledemo 路径下执行 `go run .`，

```pwsh
❯ go run .
mypackage.New
main
```

整个文件的布局如下，

```pwsh
├───moduledemo
│       go.mod
│       main.go
│       
└───mypackage
        go.mod
        mypackage.go
```

![](https://i.imgur.com/u3TpAPj.png)

## 远程三方包的导入

首先，来到一个干净的目录下，

```pwsh
mkdir moduledemo
cd moduledemo
go mod init moduledemo
```

然后，创建一个 `main.go` 文件，

```go
package main

import (
	"fmt"
)
func main() {
	fmt.Println("main")
}
```

然后，在当前工作目录的命令行执行，

```pwsh
❯ go get -u github.com/golang-module/carbon/v2
go: downloading github.com/golang-module/carbon/v2 v2.3.5
go: downloading github.com/golang-module/carbon v1.7.3
go: added github.com/golang-module/carbon/v2 v2.3.5
```

可以看到，此时，`go.mod` 文件变成了下面的内容，

```txt
module moduledemo

go 1.21.6

require github.com/golang-module/carbon/v2 v2.3.5 // indirect
```

以及，多出了一个 `go.sum` 文件(这个 sum 是可以关闭的)，

```txt
github.com/davecgh/go-spew v1.1.0/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/davecgh/go-spew v1.1.1/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/golang-module/carbon/v2 v2.3.5 h1:c7uWPX2nAG4NR27iFmen2blNoyrH/yTsiyRQZKkM8iY=
github.com/golang-module/carbon/v2 v2.3.5/go.mod h1:XDALX7KgqmHk95xyLeaqX9/LJGbfLATyruTziq68SZ8=
github.com/pmezard/go-difflib v1.0.0/go.mod h1:iKH77koFhYxTK1pcRnkKkqfTogsbg7gZNVY4sRDYZ/4=
github.com/stretchr/objx v0.1.0/go.mod h1:HFkY916IF+rwdDfMAkV7OtwuqBVzrE8GR6GFx+wExME=
github.com/stretchr/objx v0.4.0/go.mod h1:YvHI0jy2hoMjB+UWwv71VJQ9isScKT/TqJzVSSt89Yw=
github.com/stretchr/objx v0.5.0/go.mod h1:Yh+to48EsGEfYuaHDzXPcE3xhTkx73EhmCGUpEOglKo=
github.com/stretchr/testify v1.7.1/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.8.0/go.mod h1:yNjHg4UonilssWZ8iaSj1OCr/vHnekPRkoO+kdMU+MU=
github.com/stretchr/testify v1.8.4/go.mod h1:sz/lmYIOXD/1dqDmKjjqLyZ2RngseejIcXlSw2iwfAo=
gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
gopkg.in/yaml.v3 v3.0.1/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
```

然后，我们就可以在 `main.go` 代码里面使用这个包了，

```go
package main

import (
	"fmt"
	"github.com/golang-module/carbon/v2"
)

func main() {
	fmt.Printf("%s", carbon.Now())
	fmt.Println("main")
}
```

执行一下，

```pwsh
❯ go run .
2024-01-15 00:24:41main
```

按：如果这里在 neovim 中使用 gopls 代码提示报错，那么，重启一下 neovim，或者重启一下 lsp 应该就可以了。

总按：试用下来，发现 go 和 python 还蛮像的，当然，要排除 go 不是脚本语言这一点。在编写的便捷性上面，确实和 Python 有得一比。怪不得有不少 go 写的工具(比如，yay)。

----------

参考：<https://www.liwenzhou.com/posts/Go/import-local-package/>


