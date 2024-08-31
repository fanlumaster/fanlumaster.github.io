---
title: C++ 的虚函数的理解
date: 2023-10-15 12:02:20
updated: 2023-12-19 23:58:33
tags:
- C++
categories:
index_img: https://i.imgur.com/sh2gSM5.png
banner_img: https://i.imgur.com/sh2gSM5.png
---

这里只是简单地理解一下虚函数。暂时只是够用就行。

关于这个概念，其实有两个点需要理解，

- 虚函数
- 纯虚函数

很多人可能上来会被这个"虚"字给吓住。就像曾经刚刚接触编程的我一样。

我这里就直接以实际的代码来理解，

```cpp
#include <iostream>

using namespace std;

class animal
{
  public:
    void eat()
    {
        cout << "animal eat" << endl;
    }
    void sleep()
    {
        cout << "animal sleep" << endl;
    }
    void breath()
    {
        cout << "animal breath" << endl;
    }
};

class fish : public animal
{
  public:
    void breath()
    {
        cout << "fish bubble" << endl;
    }
};

void fn(animal *pAn)
{
    pAn->breath();
}

int main(int argc, char *argv[])
{
    animal *pAn;
    fish fh;
    pAn = &fh;
    fn(pAn);

    return 0;
}
```

运行结果是：

```shell
animal breath
```

为什么输出的结果不是“fish bubble”呢？这是因为在我们将 fish 类的对象fh的地址赋给 pAn 时，C++ 编译器进行了类型转换，此时 C++ 编译器认为变量 pAn 保存就是 animal 对象的地址。当在 fn 函数中执行 `pAn->breathe()` 时，调用的当然就是 animal 对象的 breathe 函数。

再来看，

```cpp
#include <iostream>

using namespace std;

class animal
{
  public:
    void eat()
    {
        cout << "animal eat" << endl;
    }
    void sleep()
    {
        cout << "animal sleep" << endl;
    }
    virtual void breath()
    {
        cout << "animal breath" << endl;
    }
};

class fish : public animal
{
  public:
    void breath()
    {
        cout << "fish bubble" << endl;
    }
};

void fn(animal *pAn)
{
    pAn->breath();
}

int main(int argc, char *argv[])
{
    animal *pAn;
    fish fh;
    pAn = &fh;
    fn(pAn);

    return 0;
}
```

我们在 animal 中的 breath 函数的前面加一个 virtual 限定词，这下运行结果就变成了这样，

```shell
fish bubble
```

这里使用 virtual 关键字声明的函数就叫作虚函数。这是 C++ 中的多态性。当 C++ 编译器在编译的时候，如果知道这是一个虚函数，那么，编译器就会采用一个叫作迟绑定(late binding)的技术。即编译时并不确定具体调用的函数的函数，而是在运行时依据对象的类型来确认调用的是哪一个函数。这里的原理就是这个样子。

了解了虚函数，那么，让我们再看看**纯虚函数**。

```cpp
#include <iostream>

using namespace std;

class animal
{
  public:
    void eat()
    {
        cout << "animal eat" << endl;
    }
    void sleep()
    {
        cout << "animal sleep" << endl;
    }
    virtual void breath() = 0;
};

class fish : public animal
{
  public:
    void breath()
    {
        cout << "fish bubble" << endl;
    }
};

void fn(animal *pAn)
{
    pAn->breath();
}

int main(int argc, char *argv[])
{
    animal *pAn;
    fish fh;
    pAn = &fh;
    fn(pAn);

    return 0;
}
```

这里运行的结果也是，

```shell
fish bubble
```

我们依然是对 animal 中的这个 breath 函数进行修改。这里就是将其声明为纯虚函数。

纯虚函数是指被标明不具体实现的虚成员函数(一般来说)。纯虚函数可以让类先具有一个操作名称，而没有操作内容。让派生类再继承时再去具体地给出定义。凡是含有纯虚函数的类叫作抽象类。这种类**不能**声明对象，只是作为基类为派生类服务。在派生类中必须完全实现基类中的纯虚函数，否则，派生类就也变成了抽象类，不能实例化对象。就这里的概念来说，和 Java 其实有共通之处，更广泛地讲，很多语言其实都有共通之处。

---

参考：

1、《VC++深入详解》


