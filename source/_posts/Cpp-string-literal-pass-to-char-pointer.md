---
title: C++ 字符串字面量作为参数传递给字符指针
date: 2024-03-24 22:27:06
tags:
- cpp
categories:
index_img: https://i.imgur.com/8YUz76Z.png
banner_img: https://i.imgur.com/8YUz76Z.png
---

简而言之，这就是一个对字符串字面量的理解的问题。字符串字面量不会被隐式转为 `char *`，而是 `const char *`，而下面的代码对其进行了隐式转换，转换完之后还进行了修改，显然是不对的。自然，编译运行出来的结果也是不对的。

```cpp
#include <iostream>

using namespace std;

class str {
private:
  char *w;
  int m, len;

public:
  str(char *p, int n, int k) : w(p), m(n), len(k) {}
  void move();
  void show();
};

void str::move() {
  for (int i = 0; i < m; i++) {
    char first = *w;
    cout << w[0] << endl;
    for (int j = 1; j < len; j++) {
      w[j - 1] = w[j];
    }
    w[len - 1] = first;
  }
}

void str::show() {
  for (int i = 0; i < len; i++) {
    cout << *(w + i) << " ";
  }
}

int main() {
  str c("ABCD", 3, 4);
  c.move();
  c.show();
  return 0;
}
```

一种可能的改法是，在调用构造函数的时候，传递一个数组，

```cpp
#include <iostream>

using namespace std;

class str {
private:
  char *w;
  int m, len;

public:
  str(char *p, int n, int k) : w(p), m(n), len(k) {}
  void move();
  void show();
};

void str::move() {
  for (int i = 0; i < m; i++) {
    char first = *w;
    cout << w[0] << endl;
    for (int j = 1; j < len; j++) {
      w[j - 1] = w[j];
    }
    w[len - 1] = first;
  }
}

void str::show() {
  for (int i = 0; i < len; i++) {
    cout << *(w + i) << " ";
  }
}

int main() {
  char buffer[] = "ACBD";
  str c(buffer, 3, 4);
  c.move();
  c.show();
  return 0;
}
```

当然，如果依然想传字面量，那么，就可以改一下构造函数，把字面量复制出来，然后再修改即可。


