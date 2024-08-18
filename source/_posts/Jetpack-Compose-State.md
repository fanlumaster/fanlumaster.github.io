---
title: Jetpack Compose State
date: 2021-12-29 10:24:29
tags:
- Android
- Little Tricks
categories:
- Android
index_img: https://i.imgur.com/FGc94XQ.png
banner_img: https://i.imgur.com/FGc94XQ.png
description: '关于 Jetpack Compose State 的一点理解'
---

事情的发端是关于 `by remember` 的使用。然后找到 [文档](https://developer.android.com/jetpack/compose/state)。

目前只能够粗浅理解。

```kt
package com.fan.statelearning

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HelloContent()
        }
    }

    @Composable
    fun HelloContent() {
        Column(modifier = Modifier.padding(16.dp)) {
            var name by remember { mutableStateOf("") }
            if (name.isNotEmpty()) {
                Text(
                    text = "Hello, $name!",
                    modifier = Modifier.padding(bottom = 8.dp),
                    style = MaterialTheme.typography.h5
                )
            }
            OutlinedTextField(
                value = name,
                onValueChange = { name = it },
                label = { Text("Name") }
            )
        }
    }

}
```

![](https://i.imgur.com/r5zxuL5.png)

简而言之，这个 `by remember` 是为了让数据可以动态变化的。这是一个语法糖。在上面的例子中，`name` 所绑定的数据一旦发生了变化，那么，使用了 `name` 属性的的 `Text` 组件就会 recompose。