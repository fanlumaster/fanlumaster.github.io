---
title: Java 多线程学习
date: 2022-03-15 16:06:30
tags:
- Java
- 面试
categories:
- Java
index_img: https://i.imgur.com/sfcWgFh.png
banner_img: https://i.imgur.com/sfcWgFh.png
---

文章转载自 B 站视频笔记，B 站链接：<https://www.bilibili.com/video/BV1JT4y1S7K8>

# 再谈多线程

> JUC相对于Java应用层的学习难度更大，**开篇推荐掌握的预备知识：**JavaSE多线程部分**（必备）**、操作系统、JVM**（推荐）**、计算机组成原理。掌握预备知识会让你的学习更加轻松，其中，JavaSE多线程部分要求必须掌握，否则无法继续学习本教程！我们不会再去重复教学JavaSE阶段的任何知识了。
>
> 各位小伙伴一定要点击收藏按钮（收藏 = 学会）

还记得我们在JavaSE中学习的多线程吗？让我们来回顾一下：

在我们的操作系统之上，可以同时运行很多个进程，并且每个进程之间相互隔离互不干扰。我们的CPU会通过时间片轮转算法，为每一个进程分配时间片，并在时间片使用结束后切换下一个进程继续执行，通过这种方式来实现宏观上的多个程序同时运行。

由于每个进程都有一个自己的内存空间，进程之间的通信就变得非常麻烦（比如要共享某些数据）而且执行不同进程会产生上下文切换，非常耗时，那么有没有一种更好地方案呢？

后来，线程横空出世，一个进程可以有多个线程，线程是程序执行中一个单一的顺序控制流程，现在线程才是程序执行流的最小单元，各个线程之间共享程序的内存空间（也就是所在进程的内存空间），上下文切换速度也高于进程。

现在有这样一个问题：

```java
public static void main(String[] args) {
    int[] arr = new int[]{3, 1, 5, 2, 4};
    //请将上面的数组按升序输出
}
```

按照正常思维，我们肯定是这样：

```java
public static void main(String[] args) {
    int[] arr = new int[]{3, 1, 5, 2, 4};
		//直接排序吧
    Arrays.sort(arr);
    for (int i : arr) {
        System.out.println(i);
    }
}
```

而我们学习了多线程之后，可以换个思路来实现：

```java
public static void main(String[] args) {
    int[] arr = new int[]{3, 1, 5, 2, 4};

    for (int i : arr) {
        new Thread(() -> {
            try {
                Thread.sleep(i * 1000);   //越小的数休眠时间越短，优先被打印
                System.out.println(i);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
```

我们接触过的很多框架都在使用多线程，比如Tomcat服务器，所有用户的请求都是通过不同的线程来进行处理的，这样我们的网站才可以同时响应多个用户的请求，要是没有多线程，可想而知服务器的处理效率会有多低。

虽然多线程能够为我们解决很多问题，但是，如何才能正确地使用多线程，如何才能将多线程的资源合理使用，这都是我们需要关心的问题。

在Java 5的时候，新增了java.util.concurrent（JUC）包，其中包括大量用于多线程编程的工具类，目的是为了更好的支持高并发任务，让开发者进行多线程编程时减少竞争条件和死锁的问题！通过使用这些工具类，我们的程序会更加合理地使用多线程。而我们这一系列视频的主角，正是`JUC`。

但是我们先不着急去看这些内容，第一章，我们先来补点基础知识。

***

## 并发与并行

我们经常听到并发编程，那么这个并发代表的是什么意思呢？而与之相似的并行又是什么意思？它们之间有什么区别？

比如现在一共有三个工作需要我们去完成。

![image-20220301213510841](https://tva1.sinaimg.cn/large/e6c9d24ely1gzupjszpjnj21bk06ujrw.jpg)

### 顺序执行

顺序执行其实很好理解，就是我们依次去将这些任务完成了：

![image-20220301213629649](https://tva1.sinaimg.cn/large/e6c9d24ely1gzupl4sldlj219s06et98.jpg)

实际上就是我们同一时间只能处理一个任务，所以需要前一个任务完成之后，才能继续下一个任务，依次完成所有任务。

### 并发执行

并发执行也是我们同一时间只能处理一个任务，但是我们可以每个任务轮着做（时间片轮转）：

![image-20220301214032719](https://tva1.sinaimg.cn/large/e6c9d24ely1gzuppchmldj21lm078myf.jpg)

只要我们单次处理分配的时间足够的短，在宏观看来，就是三个任务在同时进行。

而我们Java中的线程，正是这种机制，当我们需要同时处理上百个上千个任务时，很明显CPU的数量是不可能赶得上我们的线程数的，所以说这时就要求我们的程序有良好的并发性能，来应对同一时间大量的任务处理。学习Java并发编程，能够让我们在以后的实际场景中，知道该如何应对高并发的情况。

### 并行执行

并行执行就突破了同一时间只能处理一个任务的限制，我们同一时间可以做多个任务：

![image-20220301214238743](https://tva1.sinaimg.cn/large/e6c9d24ely1gzuprj83gqj21hw0hqmz2.jpg)

比如我们要进行一些排序操作，就可以用到并行计算，只需要等待所有子任务完成，最后将结果汇总即可。包括分布式计算模型MapReduce，也是采用的并行计算思路。

***

## 再谈锁机制

谈到锁机制，相信各位应该并不陌生了，我们在JavaSE阶段，通过使用`synchronized`关键字来实现锁，这样就能够很好地解决线程之间争抢资源的情况。那么，`synchronized`底层到底是如何实现的呢？

我们知道，使用`synchronized`，一定是和某个对象相关联的，比如我们要对某一段代码加锁，那么我们就需要提供一个对象来作为锁本身：

```java
public static void main(String[] args) {
    synchronized (Main.class) {
        //这里使用的是Main类的Class对象作为锁
    }
}
```

我们来看看，它变成字节码之后会用到哪些指令：

![image-20220302111724784](https://tva1.sinaimg.cn/large/e6c9d24ely1gzvdbajqhfj229a0u0te0.jpg)

其中最关键的就是`monitorenter`指令了，可以看到之后也有`monitorexit`与之进行匹配（注意这里有2个），`monitorenter`和`monitorexit`分别对应加锁和释放锁，在执行`monitorenter`之前需要尝试获取锁，每个对象都有一个`monitor`监视器与之对应，而这里正是去获取对象监视器的所有权，一旦`monitor`所有权被某个线程持有，那么其他线程将无法获得（管程模型的一种实现）。

在代码执行完成之后，我们可以看到，一共有两个`monitorexit`在等着我们，那么为什么这里会有两个呢，按理说`monitorenter`和`monitorexit`不应该一一对应吗，这里为什么要释放锁两次呢？

首先我们来看第一个，这里在释放锁之后，会马上进入到一个goto指令，跳转到15行，而我们的15行对应的指令就是方法的返回指令，其实正常情况下只会执行第一个`monitorexit`释放锁，在释放锁之后就接着同步代码块后面的内容继续向下执行了。而第二个，其实是用来处理异常的，可以看到，它的位置是在12行，如果程序运行发生异常，那么就会执行第二个`monitorexit`，并且会继续向下通过`athrow`指令抛出异常，而不是直接跳转到15行正常运行下去。

![image-20220302114613847](https://tva1.sinaimg.cn/large/e6c9d24ely1gzve59lrkqj21wq0ca76u.jpg)

实际上`synchronized`使用的锁就是存储在Java对象头中的，我们知道，对象是存放在堆内存中的，而每个对象内部，都有一部分空间用于存储对象头信息，而对象头信息中，则包含了Mark Word用于存放`hashCode`和对象的锁信息，在不同状态下，它存储的数据结构有一些不同。

![image-20220302203846868](https://tva1.sinaimg.cn/large/e6c9d24ely1gzvtjfgg91j21e00howh1.jpg)

### 重量级锁

在JDK6之前，`synchronized`一直被称为重量级锁，`monitor`依赖于底层操作系统的Lock实现，Java的线程是映射到操作系统的原生线程上，切换成本较高。而在JDK6之后，锁的实现得到了改进。我们先从最原始的重量级锁开始：

我们说了，每个对象都有一个monitor与之关联，在Java虚拟机（HotSpot）中，monitor是由ObjectMonitor实现的：

```c++
ObjectMonitor() {
    _header       = NULL;
    _count        = 0; //记录个数
    _waiters      = 0,
    _recursions   = 0;
    _object       = NULL;
    _owner        = NULL;
    _WaitSet      = NULL; //处于wait状态的线程，会被加入到_WaitSet
    _WaitSetLock  = 0 ;
    _Responsible  = NULL ;
    _succ         = NULL ;
    _cxq          = NULL ;
    FreeNext      = NULL ;
    _EntryList    = NULL ; //处于等待锁block状态的线程，会被加入到该列表
    _SpinFreq     = 0 ;
    _SpinClock    = 0 ;
    OwnerIsThread = 0 ;
}
```

每个等待锁的线程都会被封装成ObjectWaiter对象，进入到如下机制：

![img](https://tva1.sinaimg.cn/large/e6c9d24ely1gzvej55r7tj20dw08vjrt.jpg)

ObjectWaiter首先会进入 Entry Set等着，当线程获取到对象的`monitor`后进入 The Owner 区域并把`monitor`中的`owner`变量设置为当前线程，同时`monitor`中的计数器`count`加1，若线程调用`wait()`方法，将释放当前持有的`monitor`，`owner`变量恢复为`null`，`count`自减1，同时该线程进入 WaitSet集合中等待被唤醒。若当前线程执行完毕也将释放`monitor`并复位变量的值，以便其他线程进入获取对象的`monitor`。

虽然这样的设计思路非常合理，但是在大多数应用上，每一个线程占用同步代码块的时间并不是很长，我们完全没有必要将竞争中的线程挂起然后又唤醒，并且现代CPU基本都是多核心运行的，我们可以采用一种新的思路来实现锁。

在JDK1.4.2时，引入了自旋锁（JDK6之后默认开启），它不会将处于等待状态的线程挂起，而是通过无限循环的方式，不断检测是否能够获取锁，由于单个线程占用锁的时间非常短，所以说循环次数不会太多，可能很快就能够拿到锁并运行，这就是自旋锁。当然，仅仅是在等待时间非常短的情况下，自旋锁的表现会很好，但是如果等待时间太长，由于循环是需要处理器继续运算的，所以这样只会浪费处理器资源，因此自旋锁的等待时间是有限制的，默认情况下为10次，如果失败，那么会进而采用重量级锁机制。

![image-20220302163246988](https://tva1.sinaimg.cn/large/e6c9d24ely1gzvmffuq1hj21dm0ae75f.jpg)

在JDK6之后，自旋锁得到了一次优化，自旋的次数限制不再是固定的，而是自适应变化的，比如在同一个锁对象上，自旋等待刚刚成功获得过锁，并且持有锁的线程正在运行，那么这次自旋也是有可能成功的，所以会允许自旋更多次。当然，如果某个锁经常都自旋失败，那么有可能会不再采用自旋策略，而是直接使用重量级锁。

### 轻量级锁

> 从JDK 1.6开始，为了减少获得锁和释放锁带来的性能消耗，就引入了轻量级锁。

轻量级锁的目标是，在无竞争情况下，减少重量级锁产生的性能消耗（并不是为了代替重量级锁，实际上就是赌一手同一时间只有一个线程在占用资源），包括系统调用引起的内核态与用户态切换、线程阻塞造成的线程切换等。它不像是重量级锁那样，需要向操作系统申请互斥量。它的运作机制如下：

在即将开始执行同步代码块中的内容时，会首先检查对象的Mark Word，查看锁对象是否被其他线程占用，如果没有任何线程占用，那么会在当前线程中所处的栈帧中建立一个名为锁记录（Lock Record）的空间，用于复制并存储对象目前的Mark Word信息（官方称为Displaced Mark Word）。

接着，虚拟机将使用CAS操作将对象的Mark Word更新为轻量级锁状态（数据结构变为指向Lock Record的指针，指向的是当前的栈帧）

> CAS（Compare And Swap）是一种无锁算法（我们之前在Springboot阶段已经讲解过了），它并不会为对象加锁，而是在执行的时候，看看当前数据的值是不是我们预期的那样，如果是，那就正常进行替换，如果不是，那么就替换失败。比如有两个线程都需要修改变量`i`的值，默认为10，现在一个线程要将其修改为20，另一个要修改为30，如果他们都使用CAS算法，那么并不会加锁访问`i`，而是直接尝试修改`i`的值，但是在修改时，需要确认`i`是不是10，如果是，表示其他线程还没对其进行修改，如果不是，那么说明其他线程已经将其修改，此时不能完成修改任务，修改失败。
>
> 在CPU中，CAS操作使用的是`cmpxchg`指令，能够从最底层硬件层面得到效率的提升。

如果CAS操作失败了的话，那么说明可能这时有线程已经进入这个同步代码块了，这时虚拟机会再次检查对象的Mark Word，是否指向当前线程的栈帧，如果是，说明不是其他线程，而是当前线程已经有了这个对象的锁，直接放心大胆进同步代码块即可。如果不是，那确实是被其他线程占用了。

这时，轻量级锁一开始的想法就是错的（这时有对象在竞争资源，已经赌输了），所以说只能将锁膨胀为重量级锁，按照重量级锁的操作执行（注意锁的膨胀是不可逆的）

![image-20220302210830272](https://tva1.sinaimg.cn/large/e6c9d24ely1gzvuebbr7ej21b20ba763.jpg)

所以，轻量级锁 -> 失败 -> 自适应自旋锁 -> 失败 -> 重量级锁

解锁过程同样采用CAS算法，如果对象的MarkWord仍然指向线程的锁记录，那么就用CAS操作把对象的MarkWord和复制到栈帧中的Displaced Mark Word进行交换。如果替换失败，说明其他线程尝试过获取该锁，在释放锁的同时，需要唤醒被挂起的线程。

### 偏向锁

偏向锁相比轻量级锁更纯粹，干脆就把整个同步都消除掉，不需要再进行CAS操作了。它的出现主要是得益于人们发现某些情况下某个锁频繁地被同一个线程获取，这种情况下，我们可以对轻量级锁进一步优化。

偏向锁实际上就是专门为单个线程而生的，当某个线程第一次获得锁时，如果接下来都没有其他线程获取此锁，那么持有锁的线程将不再需要进行同步操作。

可以从之前的MarkWord结构中看到，偏向锁也会通过CAS操作记录线程的ID，如果一直都是同一个线程获取此锁，那么完全没有必要在进行额外的CAS操作。当然，如果有其他线程来抢了，那么偏向锁会根据当前状态，决定是否要恢复到未锁定或是膨胀为轻量级锁。

如果我们需要使用偏向锁，可以添加`-XX:+UseBiased`参数来开启。

所以，最终的锁等级为：未锁定 < 偏向锁 < 轻量级锁 < 重量级锁

值得注意的是，如果对象通过调用`hashCode()`方法计算过对象的一致性哈希值，那么它是不支持偏向锁的，会直接进入到轻量级锁状态，因为Hash是需要被保存的，而偏向锁的Mark Word数据结构，无法保存Hash值；如果对象已经是偏向锁状态，再去调用`hashCode()`方法，那么会直接将锁升级为重量级锁，并将哈希值存放在`monitor`（有预留位置保存）中。

![image-20220302214647735](https://tva1.sinaimg.cn/large/e6c9d24ely1gzvvi5l9jhj21cy0bwjtl.jpg)

### 锁消除和锁粗化

锁消除和锁粗化都是在运行时的一些优化方案，比如我们某段代码虽然加了锁，但是在运行时根本不可能出现各个线程之间资源争夺的情况，这种情况下，完全不需要任何加锁机制，所以锁会被消除。锁粗化则是我们代码中频繁地出现互斥同步操作，比如在一个循环内部加锁，这样明显是非常消耗性能的，所以虚拟机一旦检测到这种操作，会将整个同步范围进行扩展。

***

## JMM内存模型

注意这里提到的内存模型和我们在JVM中介绍的内存模型不在同一个层次，JVM中的内存模型是虚拟机规范对整个内存区域的规划，而Java内存模型，是在JVM内存模型之上的抽象模型，具体实现依然是基于JVM内存模型实现的，我们会在后面介绍。

### Java内存模型

我们在`计算机组成原理`中学习过，在我们的CPU中，一般都会有高速缓存，而它的出现，是为了解决内存的速度跟不上处理器的处理速度的问题，所以CPU内部会添加一级或多级高速缓存来提高处理器的数据获取效率，但是这样也会导致一个很明显的问题，因为现在基本都是多核心处理器，每个处理器都有一个自己的高速缓存，那么又该怎么去保证每个处理器的高速缓存内容一致呢？

![image-20220303113148313](https://tva1.sinaimg.cn/large/e6c9d24ely1gzwjckl9pfj20x60cqdgt.jpg)

为了解决缓存一致性的问题，需要各个处理器访问缓存时都遵循一些协议，在读写时要根据协议来进行操作，这类协议有MSI、MESI（Illinois Protocol）、MOSI、Synapse、Firefly及Dragon Protocol等。

而Java也采用了类似的模型来实现支持多线程的内存模型：

![image-20220303114228749](https://tva1.sinaimg.cn/large/e6c9d24ely1gzwjnodcejj20xs0ewaba.jpg)

JMM（Java Memory Model）内存模型规定如下：

* 所有的变量全部存储在主内存（注意这里包括下面提到的变量，指的都是会出现竞争的变量，包括成员变量、静态变量等，而局部变量这种属于线程私有，不包括在内）
* 每条线程有着自己的工作内存（可以类比CPU的高速缓存）线程对变量的所有操作，必须在工作内存中进行，不能直接操作主内存中的数据。
* 不同线程之间的工作内存相互隔离，如果需要在线程之间传递内容，只能通过主内存完成，无法直接访问对方的工作内存。

也就是说，每一条线程如果要操作主内存中的数据，那么得先拷贝到自己的工作内存中，并对工作内存中数据的副本进行操作，操作完成之后，也需要从工作副本中将结果拷贝回主内存中，具体的操作就是`Save`（保存）和`Load`（加载）操作。

那么各位肯定会好奇，这个内存模型，结合之前JVM所讲的内容，具体是怎么实现的呢？

* 主内存：对应堆中存放对象的实例的部分。
* 工作内存：对应线程的虚拟机栈的部分区域，虚拟机可能会对这部分内存进行优化，将其放在CPU的寄存器或是高速缓存中。比如在访问数组时，由于数组是一段连续的内存空间，所以可以将一部分连续空间放入到CPU高速缓存中，那么之后如果我们顺序读取这个数组，那么大概率会直接缓存命中。

前面我们提到，在CPU中可能会遇到缓存不一致的问题，而Java中，也会遇到，比如下面这种情况：

```java
public class Main {
    private static int i = 0;
    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            for (int j = 0; j < 100000; j++) i++;
            System.out.println("线程1结束");
        }).start();
        new Thread(() -> {
            for (int j = 0; j < 100000; j++) i++;
            System.out.println("线程2结束");
        }).start();
        //等上面两个线程结束
        Thread.sleep(1000);
        System.out.println(i);
    }
}
```

可以看到这里是两个线程同时对变量`i`各自进行100000次自增操作，但是实际得到的结果并不是我们所期望的那样。

那么为什么会这样呢？在之前学习了JVM之后，相信各位应该已经知道，自增操作实际上并不是由一条指令完成的（注意一定不要理解为一行代码就是一个指令完成的）：

![image-20220303143131899](https://tva1.sinaimg.cn/large/e6c9d24ely1gzwojklg4fj224y0oktfi.jpg)

包括变量`i`的获取、修改、保存，都是被拆分为一个一个的操作完成的，那么这个时候就有可能出现在修改完保存之前，另一条线程也保存了，但是当前线程是毫不知情的。

![image-20220303144344450](https://tva1.sinaimg.cn/large/e6c9d24ely1gzwow9xzb6j21kg0ayq54.jpg)

所以说，我们当时在JavaSE阶段讲解这个问题的时候，是通过`synchronized`关键字添加同步代码块解决的，当然，我们后面还会讲解另外的解决方案（原子类）

### 重排序

在编译或执行时，为了优化程序的执行效率，编译器或处理器常常会对指令进行重排序，有以下情况：

1. 编译器重排序：Java编译器通过对Java代码语义的理解，根据优化规则对代码指令进行重排序。
2. 机器指令级别的重排序：现代处理器很高级，能够自主判断和变更机器指令的执行顺序。

指令重排序能够在不改变结果（单线程）的情况下，优化程序的运行效率，比如：

```java
public static void main(String[] args) {
    int a = 10;
    int b = 20;
    System.out.println(a + b);
}
```

我们其实可以交换第一行和第二行：

```java
public static void main(String[] args) {
    int b = 10;
    int a = 20;
    System.out.println(a + b);
}
```

即使发生交换，但是我们程序最后的运行结果是不会变的，当然这里只通过代码的形式演示，实际上JVM在执行字节码指令时也会进行优化，可能两个指令并不会按照原有的顺序进行。

虽然单线程下指令重排确实可以起到一定程度的优化作用，但是在多线程下，似乎会导致一些问题：

```java
public class Main {
    private static int a = 0;
    private static int b = 0;
    public static void main(String[] args) {
        new Thread(() -> {
            if(b == 1) {
                if(a == 0) {
                    System.out.println("A");
                }else {
                    System.out.println("B");
                }   
            }
        }).start();
        new Thread(() -> {
            a = 1;
            b = 1;
        }).start();
    }
}
```

上面这段代码，在正常情况下，按照我们的正常思维，是不可能输出`A`的，因为只要b等于1，那么a肯定也是1才对，因为a是在b之前完成的赋值。但是，如果进行了重排序，那么就有可能，a和b的赋值发生交换，b先被赋值为1，而恰巧这个时候，线程1开始判定b是不是1了，这时a还没来得及被赋值为1，可能线程1就已经走到打印那里去了，所以，是有可能输出`A`的。

### volatile关键字

好久好久都没有认识新的关键字了，今天我们来看一个新的关键字`volatile`，开始之前我们先介绍三个词语：

* 原子性：其实之前讲过很多次了，就是要做什么事情要么做完，要么就不做，不存在做一半的情况。
* 可见性：指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。
* 有序性：即程序执行的顺序按照代码的先后顺序执行。

我们之前说了，如果多线程访问同一个变量，那么这个变量会被线程拷贝到自己的工作内存中进行操作，而不是直接对主内存中的变量本体进行操作，下面这个操作看起来是一个有限循环，但是是无限的：

```java
public class Main {
    private static int a = 0;
    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            while (a == 0);
            System.out.println("线程结束！");
        }).start();

        Thread.sleep(1000);
        System.out.println("正在修改a的值...");
        a = 1;   //很明显，按照我们的逻辑来说，a的值被修改那么另一个线程将不再循环
    }
}
```

实际上这就是我们之前说的，虽然我们主线程中修改了a的值，但是另一个线程并不知道a的值发生了改变，所以循环中依然是使用旧值在进行判断，因此，普通变量是不具有可见性的。

要解决这种问题，我们第一个想到的肯定是加锁，同一时间只能有一个线程使用，这样总行了吧，确实，这样的话肯定是可以解决问题的：

```java
public class Main {
    private static int a = 0;
    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            while (a == 0) {
                synchronized (Main.class){}
            }
            System.out.println("线程结束！");
        }).start();

        Thread.sleep(1000);
        System.out.println("正在修改a的值...");
        synchronized (Main.class){
            a = 1;
        }
    }
}
```

但是，除了硬加一把锁的方案，我们也可以使用`volatile`关键字来解决，此关键字的第一个作用，就是保证变量的可见性。当写一个`volatile`变量时，JMM会把该线程本地内存中的变量强制刷新到主内存中去，并且这个写会操作会导致其他线程中的`volatile`变量缓存无效，这样，另一个线程修改了这个变时，当前线程会立即得知，并将工作内存中的变量更新为最新的版本。

那么我们就来试试看：

```java
public class Main {
    //添加volatile关键字
    private static volatile int a = 0;
    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            while (a == 0);
            System.out.println("线程结束！");
        }).start();

        Thread.sleep(1000);
        System.out.println("正在修改a的值...");
        a = 1;
    }
}
```

结果还真的如我们所说的那样，当a发生改变时，循环立即结束。

当然，虽然说`volatile`能够保证可见性，但是不能保证原子性，要解决我们上面的`i++`的问题，以我们目前所学的知识，还是只能使用加锁来完成：

```java
public class Main {
    private static volatile int a = 0;
    public static void main(String[] args) throws InterruptedException {
        Runnable r = () -> {
            for (int i = 0; i < 10000; i++) a++;
            System.out.println("任务完成！");
        };
        new Thread(r).start();
        new Thread(r).start();

        //等待线程执行完成
        Thread.sleep(1000);
        System.out.println(a);
    }
}
```

不对啊，`volatile`不是能在改变变量的时候其他线程可见吗，那为什么还是不能保证原子性呢？还是那句话，自增操作是被瓜分为了多个步骤完成的，虽然保证了可见性，但是只要手速够快，依然会出现两个线程同时写同一个值的问题（比如线程1刚刚将a的值更新为100，这时线程2可能也已经执行到更新a的值这条指令了，已经刹不住车了，所以依然会将a的值再更新为一次100）

那要是真的遇到这种情况，那么我们不可能都去写个锁吧？后面，我们会介绍原子类来专门解决这种问题。

最后一个功能就是`volatile`会禁止指令重排，也就是说，如果我们操作的是一个`volatile`变量，它将不会出现重排序的情况，也就解决了我们最上面的问题。那么它是怎么解决的重排序问题呢？若用volatile修饰共享变量，在编译时，会在指令序列中插入`内存屏障`来禁止特定类型的处理器重排序

>  内存屏障（Memory Barrier）又称内存栅栏，是一个CPU指令，它的作用有两个：
>
> 1. 保证特定操作的顺序
> 2. 保证某些变量的内存可见性（volatile的内存可见性，其实就是依靠这个实现的）
>
> 由于编译器和处理器都能执行指令重排的优化，如果在指令间插入一条Memory Barrier则会告诉编译器和CPU，不管什么指令都不能和这条Memory Barrier指令重排序。
>
> ![image-20220303172519404](https://tva1.sinaimg.cn/large/e6c9d24ely1gzwtkeydk7j2194068jsd.jpg)
>
> | 屏障类型   | 指令示例                 | 说明                                                         |
> | ---------- | ------------------------ | ------------------------------------------------------------ |
> | LoadLoad   | Load1;LoadLoad;Load2     | 保证Load1的读取操作在Load2及后续读取操作之前执行             |
> | StoreStore | Store1;StoreStore;Store2 | 在Store2及其后的写操作执行前，保证Store1的写操作已刷新到主内存 |
> | LoadStore  | Load1;LoadStore;Store2   | 在Store2及其后的写操作执行前，保证Load1的读操作已读取结束    |
> | StoreLoad  | Store1;StoreLoad;Load2   | 保证load1的写操作已刷新到主内存之后，load2及其后的读操作才能执行 |

所以`volatile`能够保证，之前的指令一定全部执行，之后的指令一定都没有执行，并且前面语句的结果对后面的语句可见。

最后我们来总结一下`volatile`关键字的三个特性：

* 保证可见性
* 不保证原子性
* 防止指令重排

在之后我们的设计模式系列视频中，还会讲解单例模式下`volatile`的运用。

### happens-before原则

经过我们前面的讲解，相信各位已经了解了JMM内存模型以及重排序等机制带来的优点和缺点，综上，JMM提出了`happens-before`（先行发生）原则，定义一些禁止编译优化的场景，来向各位程序员做一些保证，只要我们是按照原则进行编程，那么就能够保持并发编程的正确性。具体如下：

* **程序次序规则：**同一个线程中，按照程序的顺序，前面的操作happens-before后续的任何操作。
  * 同一个线程内，代码的执行结果是有序的。其实就是，可能会发生指令重排，但是保证代码的执行结果一定是和按照顺序执行得到的一致，程序前面对某一个变量的修改一定对后续操作可见的，不可能会出现前面才把a修改为1，接着读a居然是修改前的结果，这也是程序运行最基本的要求。
* **监视器锁规则：**对一个锁的解锁操作，happens-before后续对这个锁的加锁操作。
  * 就是无论是在单线程环境还是多线程环境，对于同一个锁来说，一个线程对这个锁解锁之后，另一个线程获取了这个锁都能看到前一个线程的操作结果。比如前一个线程将变量`x`的值修改为了`12`并解锁，之后另一个线程拿到了这把锁，对之前线程的操作是可见的，可以得到`x`是前一个线程修改后的结果`12`（所以synchronized是有happens-before规则的）
* **volatile变量规则：**对一个volatile变量的写操作happens-before后续对这个变量的读操作。
  * 就是如果一个线程先去写一个`volatile`变量，紧接着另一个线程去读这个变量，那么这个写操作的结果一定对读的这个变量的线程可见。
* **线程启动规则：**主线程A启动线程B，线程B中可以看到主线程启动B之前的操作。
  * 在主线程A执行过程中，启动子线程B，那么线程A在启动子线程B之前对共享变量的修改结果对线程B可见。
* **线程加入规则：**如果线程A执行操作`join()`线程B并成功返回，那么线程B中的任意操作happens-before线程A`join()`操作成功返回。
* **传递性规则：**如果A happens-before B，B happens-before C，那么A happens-before C。

那么我们来从happens-before原则的角度，来解释一下下面的程序结果：

```java
public class Main {
    private static int a = 0;
  	private static int b = 0;
    public static void main(String[] args) {
        a = 10;
        b = a + 1;
        new Thread(() -> {
          if(b > 10) System.out.println(a); 
        }).start();
    }
}
```

首先我们定义以上出现的操作：

* **A：**将变量`a`的值修改为`10`
* **B：**将变量`b`的值修改为`a + 1`
* **C：**主线程启动了一个新的线程，并在新的线程中获取`b`，进行判断，如果为`true`那么就打印`a`

首先我们来分析，由于是同一个线程，并且**B**是一个赋值操作且读取了**A**，那么按照**程序次序规则**，A happens-before B，接着在B之后，马上执行了C，按照**线程启动规则**，在新的线程启动之前，当前线程之前的所有操作对新的线程是可见的，所以 B happens-before C，最后根据**传递性规则**，由于A happens-before B，B happens-before C，所以A happens-before C，因此在新的线程中会输出`a`修改后的结果`10`。

# 多线程编程核心

在前面，我们了解了多线程的底层运作机制，我们终于知道，原来多线程环境下存在着如此之多的问题。在JDK5之前，我们只能选择`synchronized`关键字来实现锁，而JDK5之后，由于`volatile`关键字得到了升级（具体功能就是上一章所描述的），所以并发框架包便出现了，相比传统的`synchronized`关键字，我们对于锁的实现，有了更多的选择。

> Doug Lea — JUC并发包的作者
>
> 如果IT的历史，是以人为主体串接起来的话，那么肯定少不了Doug Lea。这个鼻梁挂着眼镜，留着德王威廉二世的胡子，脸上永远挂着谦逊腼腆笑容，服务于纽约州立大学Oswego分校计算机科学系的老大爷。
>
> 说他是这个世界上对Java影响力最大的一个人，一点也不为过。因为两次Java历史上的大变革，他都间接或直接的扮演了举足轻重的角色。2004年所推出的Tiger。Tiger广纳了15项JSRs(Java Specification Requests)的语法及标准，其中一项便是JSR-166。JSR-166是来自于Doug编写的util.concurrent包。

那么，从这章开始，就让我们来感受一下，JUC为我们带来了什么。

***

## 锁框架

在JDK 5之后，并发包中新增了Lock接口（以及相关实现类）用来实现锁功能，Lock接口提供了与synchronized关键字类似的同步功能，但需要在使用时手动获取锁和释放锁。

### Lock和Condition接口

使用并发包中的锁和我们传统的`synchronized`锁不太一样，这里的锁我们可以认为是一把真正意义上的锁，每个锁都是一个对应的锁对象，我只需要向锁对象获取锁或是释放锁即可。我们首先来看看，此接口中定义了什么：

```java
public interface Lock {
  	//获取锁，拿不到锁会阻塞，等待其他线程释放锁，获取到锁后返回
    void lock();
  	//同上，但是等待过程中会响应中断
    void lockInterruptibly() throws InterruptedException;
  	//尝试获取锁，但是不会阻塞，如果能获取到会返回true，不能返回false
    boolean tryLock();
  	//尝试获取锁，但是可以限定超时时间，如果超出时间还没拿到锁返回false，否则返回true，可以响应中断
    boolean tryLock(long time, TimeUnit unit) throws InterruptedException;
  	//释放锁
    void unlock();
  	//暂时可以理解为替代传统的Object的wait()、notify()等操作的工具
    Condition newCondition();
}
```

这里我们可以演示一下，如何使用Lock类来进行加锁和释放锁操作：

```java
public class Main {
    private static int i = 0;
    public static void main(String[] args) throws InterruptedException {
        Lock testLock = new ReentrantLock();   //可重入锁ReentrantLock类是Lock类的一个实现，我们后面会进行介绍
        Runnable action = () -> {
            for (int j = 0; j < 100000; j++) {   //还是以自增操作为例
                testLock.lock();    //加锁，加锁成功后其他线程如果也要获取锁，会阻塞，等待当前线程释放
                i++;
                testLock.unlock();  //解锁，释放锁之后其他线程就可以获取这把锁了（注意在这之前一定得加锁，不然报错）
            }
        };
        new Thread(action).start();
        new Thread(action).start();
        Thread.sleep(1000);   //等上面两个线程跑完
        System.out.println(i);
    }
}
```

可以看到，和我们之前使用`synchronized`相比，我们这里是真正在操作一个"锁"对象，当我们需要加锁时，只需要调用`lock()`方法，而需要释放锁时，只需要调用`unlock()`方法。程序运行的最终结果和使用`synchronized`锁是一样的。

那么，我们如何像传统的加锁那样，调用对象的`wait()`和`notify()`方法呢，并发包提供了Condition接口：

```java
public interface Condition {
  	//与调用锁对象的wait方法一样，会进入到等待状态，但是这里需要调用Condition的signal或signalAll方法进行唤醒（感觉就是和普通对象的wait和notify是对应的）同时，等待状态下是可以响应中断的
 		void await() throws InterruptedException;
  	//同上，但不响应中断（看名字都能猜到）
  	void awaitUninterruptibly();
  	//等待指定时间，如果在指定时间（纳秒）内被唤醒，会返回剩余时间，如果超时，会返回0或负数，可以响应中断
  	long awaitNanos(long nanosTimeout) throws InterruptedException;
  	//等待指定时间（可以指定时间单位），如果等待时间内被唤醒，返回true，否则返回false，可以响应中断
  	boolean await(long time, TimeUnit unit) throws InterruptedException;
  	//可以指定一个明确的时间点，如果在时间点之前被唤醒，返回true，否则返回false，可以响应中断
  	boolean awaitUntil(Date deadline) throws InterruptedException;
  	//唤醒一个处于等待状态的线程，注意还得获得锁才能接着运行
  	void signal();
  	//同上，但是是唤醒所有等待线程
  	void signalAll();
}
```

这里我们通过一个简单的例子来演示一下：

```java
public static void main(String[] args) throws InterruptedException {
    Lock testLock = new ReentrantLock();
    Condition condition = testLock.newCondition();
    new Thread(() -> {
        testLock.lock();   //和synchronized一样，必须持有锁的情况下才能使用await
        System.out.println("线程1进入等待状态！");
        try {
            condition.await();   //进入等待状态
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("线程1等待结束！");
        testLock.unlock();
    }).start();
    Thread.sleep(100); //防止线程2先跑
    new Thread(() -> {
        testLock.lock();
        System.out.println("线程2开始唤醒其他等待线程");
        condition.signal();   //唤醒线程1，但是此时线程1还必须要拿到锁才能继续运行
        System.out.println("线程2结束");
        testLock.unlock();   //这里释放锁之后，线程1就可以拿到锁继续运行了
    }).start();
}
```

可以发现，Condition对象使用方法和传统的对象使用差别不是很大。

**思考：**下面这种情况跟上面有什么不同？

```java
public static void main(String[] args) throws InterruptedException {
    Lock testLock = new ReentrantLock();
    new Thread(() -> {
        testLock.lock();
        System.out.println("线程1进入等待状态！");
        try {
            testLock.newCondition().await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("线程1等待结束！");
        testLock.unlock();
    }).start();
    Thread.sleep(100);
    new Thread(() -> {
        testLock.lock();
        System.out.println("线程2开始唤醒其他等待线程");
        testLock.newCondition().signal();
        System.out.println("线程2结束");
        testLock.unlock();
    }).start();
}
```

通过分析可以得到，在调用`newCondition()`后，会生成一个新的Condition对象，并且同一把锁内是可以存在多个Condition对象的（实际上原始的锁机制等待队列只能有一个，而这里可以创建很多个Condition来实现多等待队列），而上面的例子中，实际上使用的是不同的Condition对象，只有对同一个Condition对象进行等待和唤醒操作才会有效，而不同的Condition对象是分开计算的。

最后我们再来讲解一下时间单位，这是一个枚举类，也是位于`java.util.concurrent`包下：

```java
public enum TimeUnit {
    /**
     * Time unit representing one thousandth of a microsecond
     */
    NANOSECONDS {
        public long toNanos(long d)   { return d; }
        public long toMicros(long d)  { return d/(C1/C0); }
        public long toMillis(long d)  { return d/(C2/C0); }
        public long toSeconds(long d) { return d/(C3/C0); }
        public long toMinutes(long d) { return d/(C4/C0); }
        public long toHours(long d)   { return d/(C5/C0); }
        public long toDays(long d)    { return d/(C6/C0); }
        public long convert(long d, TimeUnit u) { return u.toNanos(d); }
        int excessNanos(long d, long m) { return (int)(d - (m*C2)); }
    },
  	//....
```

可以看到时间单位有很多的，比如`DAY`、`SECONDS`、`MINUTES`等，我们可以直接将其作为时间单位，比如我们要让一个线程等待3秒钟，可以像下面这样编写：

```java
public static void main(String[] args) throws InterruptedException {
    Lock testLock = new ReentrantLock();
    new Thread(() -> {
        testLock.lock();
        try {
            System.out.println("等待是否未超时："+testLock.newCondition().await(1, TimeUnit.SECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        testLock.unlock();
    }).start();
}
```

当然，Lock类的tryLock方法也是支持使用时间单位的，各位可以自行进行测试。TimeUnit除了可以作为时间单位表示以外，还可以在不同单位之间相互转换：

```java
public static void main(String[] args) throws InterruptedException {
    System.out.println("60秒 = "+TimeUnit.SECONDS.toMinutes(60) +"分钟");
    System.out.println("365天 = "+TimeUnit.DAYS.toSeconds(365) +" 秒");
}
```

也可以更加便捷地使用对象的`wait()`方法：

```java
public static void main(String[] args) throws InterruptedException {
    synchronized (Main.class) {
        System.out.println("开始等待");
        TimeUnit.SECONDS.timedWait(Main.class, 3);   //直接等待3秒
        System.out.println("等待结束");
    }
}
```

我们也可以直接使用它来进行休眠操作：

```java
public static void main(String[] args) throws InterruptedException {
    TimeUnit.SECONDS.sleep(1);  //休眠1秒钟
}
```

### 可重入锁

前面，我们讲解了锁框架的两个核心接口，那么我们接着来看看锁接口的具体实现类，我们前面用到了ReentrantLock，它其实是锁的一种，叫做可重入锁，那么这个可重入代表的是什么意思呢？简单来说，就是同一个线程，可以反复进行加锁操作：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantLock lock = new ReentrantLock();
    lock.lock();
    lock.lock();   //连续加锁2次
    new Thread(() -> {
        System.out.println("线程2想要获取锁");
        lock.lock();
        System.out.println("线程2成功获取到锁");
    }).start();
    lock.unlock();
    System.out.println("线程1释放了一次锁");
    TimeUnit.SECONDS.sleep(1);
    lock.unlock();
    System.out.println("线程1再次释放了一次锁");  //释放两次后其他线程才能加锁
}
```

可以看到，主线程连续进行了两次加锁操作（此操作是不会被阻塞的），在当前线程持有锁的情况下继续加锁不会被阻塞，并且，加锁几次，就必须要解锁几次，否则此线程依旧持有锁。我们可以使用`getHoldCount()`方法查看当前线程的加锁次数：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantLock lock = new ReentrantLock();
    lock.lock();
    lock.lock();
    System.out.println("当前加锁次数："+lock.getHoldCount()+"，是否被锁："+lock.isLocked());
    TimeUnit.SECONDS.sleep(1);
    lock.unlock();
    System.out.println("当前加锁次数："+lock.getHoldCount()+"，是否被锁："+lock.isLocked());
    TimeUnit.SECONDS.sleep(1);
    lock.unlock();
    System.out.println("当前加锁次数："+lock.getHoldCount()+"，是否被锁："+lock.isLocked());
}
```

可以看到，当锁不再被任何线程持有时，值为`0`，并且通过`isLocked()`方法查询结果为`false`。

实际上，如果存在线程持有当前的锁，那么其他线程在获取锁时，是会暂时进入到等待队列的，我们可以通过`getQueueLength()`方法获取等待中线程数量的预估值：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantLock lock = new ReentrantLock();
    lock.lock();
    Thread t1 = new Thread(lock::lock), t2 = new Thread(lock::lock);;
    t1.start();
    t2.start();
    TimeUnit.SECONDS.sleep(1);
    System.out.println("当前等待锁释放的线程数："+lock.getQueueLength());
    System.out.println("线程1是否在等待队列中："+lock.hasQueuedThread(t1));
    System.out.println("线程2是否在等待队列中："+lock.hasQueuedThread(t2));
    System.out.println("当前线程是否在等待队列中："+lock.hasQueuedThread(Thread.currentThread()));
}
```

我们可以通过`hasQueuedThread()`方法来判断某个线程是否正在等待获取锁状态。

同样的，Condition也可以进行判断：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantLock lock = new ReentrantLock();
    Condition condition = lock.newCondition();
    new Thread(() -> {
       lock.lock();
        try {
            condition.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        lock.unlock();
    }).start();
    TimeUnit.SECONDS.sleep(1);
    lock.lock();
    System.out.println("当前Condition的等待线程数："+lock.getWaitQueueLength(condition));
    condition.signal();
    System.out.println("当前Condition的等待线程数："+lock.getWaitQueueLength(condition));
    lock.unlock();
}
```

通过使用`getWaitQueueLength()`方法能够查看同一个Condition目前有多少线程处于等待状态。

#### 公平锁与非公平锁

前面我们了解了如果线程之间争抢同一把锁，会暂时进入到等待队列中，那么多个线程获得锁的顺序是不是一定是根据线程调用`lock()`方法时间来定的呢，我们可以看到，`ReentrantLock`的构造方法中，是这样写的：

```java
public ReentrantLock() {
    sync = new NonfairSync();   //看名字貌似是非公平的
}
```

其实锁分为公平锁和非公平锁，默认我们创建出来的ReentrantLock是采用的非公平锁作为底层锁机制。那么什么是公平锁什么又是非公平锁呢？

* 公平锁：多个线程按照申请锁的顺序去获得锁，线程会直接进入队列去排队，永远都是队列的第一位才能得到锁。
* 非公平锁：多个线程去获取锁的时候，会直接去尝试获取，获取不到，再去进入等待队列，如果能获取到，就直接获取到锁。

简单来说，公平锁不让插队，都老老实实排着；非公平锁让插队，但是排队的人让不让你插队就是另一回事了。

我们可以来测试一下公平锁和非公平锁的表现情况：

```java
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
```

这里我们选择使用第二个构造方法，可以选择是否为公平锁实现：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantLock lock = new ReentrantLock(false);

    Runnable action = () -> {
        System.out.println("线程 "+Thread.currentThread().getName()+" 开始获取锁...");
        lock.lock();
        System.out.println("线程 "+Thread.currentThread().getName()+" 成功获取锁！");
        lock.unlock();
    };
    for (int i = 0; i < 10; i++) {   //建立10个线程
        new Thread(action, "T"+i).start();
    }
}
```

这里我们只需要对比`将在1秒后开始获取锁...`和`成功获取锁！`的顺序是否一致即可，如果是一致，那说明所有的线程都是按顺序排队获取的锁，如果不是，那说明肯定是有线程插队了。

运行结果可以发现，在公平模式下，确实是按照顺序进行的，而在非公平模式下，一般会出现这种情况：线程刚开始获取锁马上就能抢到，并且此时之前早就开始的线程还在等待状态，很明显的插队行为。

那么，接着下一个问题，公平锁在任何情况下都一定是公平的吗？有关这个问题，我们会留到队列同步器中再进行讨论。

***

### 读写锁

除了可重入锁之外，还有一种类型的锁叫做读写锁，当然它并不是专门用作读写操作的锁，它和可重入锁不同的地方在于，可重入锁是一种排他锁，当一个线程得到锁之后，另一个线程必须等待其释放锁，否则一律不允许获取到锁。而读写锁在同一时间，是可以让多个线程获取到锁的，它其实就是针对于读写场景而出现的。

读写锁维护了一个读锁和一个写锁，这两个锁的机制是不同的。

* 读锁：在没有任何线程占用写锁的情况下，同一时间可以有多个线程加读锁。
* 写锁：在没有任何线程占用读锁的情况下，同一时间只能有一个线程加写锁。

读写锁也有一个专门的接口：

```java
public interface ReadWriteLock {
    //获取读锁
    Lock readLock();

  	//获取写锁
    Lock writeLock();
}
```

此接口有一个实现类ReentrantReadWriteLock（实现的是ReadWriteLock接口，不是Lock接口，它本身并不是锁），注意我们操作ReentrantReadWriteLock时，不能直接上锁，而是需要获取读锁或是写锁，再进行锁操作：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    lock.readLock().lock();
    new Thread(lock.readLock()::lock).start();
}
```

这里我们对读锁加锁，可以看到可以多个线程同时对读锁加锁。

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    lock.readLock().lock();
    new Thread(lock.writeLock()::lock).start();
}
```

有读锁状态下无法加写锁，反之亦然：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    lock.writeLock().lock();
    new Thread(lock.readLock()::lock).start();
}
```

并且，ReentrantReadWriteLock不仅具有读写锁的功能，还保留了可重入锁和公平/非公平机制，比如同一个线程可以重复为写锁加锁，并且必须全部解锁才真正释放锁：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    lock.writeLock().lock();
    lock.writeLock().lock();
    new Thread(() -> {
        lock.writeLock().lock();
        System.out.println("成功获取到写锁！");
    }).start();
    System.out.println("释放第一层锁！");
    lock.writeLock().unlock();
    TimeUnit.SECONDS.sleep(1);
    System.out.println("释放第二层锁！");
    lock.writeLock().unlock();
}
```

通过之前的例子来验证公平和非公平：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock(true);

    Runnable action = () -> {
        System.out.println("线程 "+Thread.currentThread().getName()+" 将在1秒后开始获取锁...");
        lock.writeLock().lock();
        System.out.println("线程 "+Thread.currentThread().getName()+" 成功获取锁！");
        lock.writeLock().unlock();
    };
    for (int i = 0; i < 10; i++) {   //建立10个线程
        new Thread(action, "T"+i).start();
    }
}
```

可以看到，结果是一致的。

#### 锁降级和锁升级

锁降级指的是写锁降级为读锁。当一个线程持有写锁的情况下，虽然其他线程不能加读锁，但是线程自己是可以加读锁的：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    lock.writeLock().lock();
    lock.readLock().lock();
    System.out.println("成功加读锁！");
}
```

那么，如果我们在同时加了写锁和读锁的情况下，释放写锁，是否其他的线程就可以一起加读锁了呢？

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    lock.writeLock().lock();
    lock.readLock().lock();
    new Thread(() -> {
        System.out.println("开始加读锁！");
        lock.readLock().lock();
        System.out.println("读锁添加成功！");
    }).start();
    TimeUnit.SECONDS.sleep(1);
    lock.writeLock().unlock();    //如果释放写锁，会怎么样？
}
```

可以看到，一旦写锁被释放，那么主线程就只剩下读锁了，因为读锁可以被多个线程共享，所以这时第二个线程也添加了读锁。而这种操作，就被称之为"锁降级"（注意不是先释放写锁再加读锁，而是持有写锁的情况下申请读锁再释放写锁）

注意在仅持有读锁的情况下去申请写锁，属于"锁升级"，ReentrantReadWriteLock是不支持的：

```java
public static void main(String[] args) throws InterruptedException {
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    lock.readLock().lock();
    lock.writeLock().lock();
    System.out.println("所升级成功！");
}
```

可以看到线程直接卡在加写锁的那一句了。

### 队列同步器AQS

**注意：**难度巨大，如果对锁的使用不是很熟悉建议之后再来看！

前面我们了解了可重入锁和读写锁，那么它们的底层实现原理到底是什么样的呢？又是大家看到就想跳过的套娃解析环节。

比如我们执行了ReentrantLock的`lock()`方法，那它的内部是怎么在执行的呢？

```java
public void lock() {
    sync.lock();
}
```

可以看到，它的内部实际上啥都没做，而是交给了Sync对象在进行，并且，不只是这个方法，其他的很多方法都是依靠Sync对象在进行：

```java
public void unlock() {
    sync.release(1);
}
```

那么这个Sync对象是干什么的呢？可以看到，公平锁和非公平锁都是继承自Sync，而Sync是继承自AbstractQueuedSynchronizer，简称队列同步器：

```java
abstract static class Sync extends AbstractQueuedSynchronizer {
   //...
}

static final class NonfairSync extends Sync {}
static final class FairSync extends Sync {}
```

所以，要了解它的底层到底是如何进行操作的，还得看队列同步器，我们就先从这里下手吧！

#### 底层实现

AbstractQueuedSynchronizer（下面称为AQS）是实现锁机制的基础，它的内部封装了包括锁的获取、释放、以及等待队列。

一个锁（排他锁为例）的基本功能就是获取锁、释放锁、当锁被占用时，其他线程来争抢会进入等待队列，AQS已经将这些基本的功能封装完成了，其中等待队列是核心内容，等待队列是由双向链表数据结构实现的，每个等待状态下的线程都可以被封装进结点中并放入双向链表中，而对于双向链表是以队列的形式进行操作的，它像这样：

![image-20220306162015545](https://tva1.sinaimg.cn/large/e6c9d24ely1h008jltp0zj212k0b4tac.jpg)

AQS中有一个`head`字段和一个`tail`字段分别记录双向链表的头结点和尾结点，而之后的一系列操作都是围绕此队列来进行的。我们先来了解一下每个结点都包含了哪些内容：

```java
//每个处于等待状态的线程都可以是一个节点，并且每个节点是有很多状态的
static final class Node {
  	//每个节点都可以被分为独占模式节点或是共享模式节点，分别适用于独占锁和共享锁
    static final Node SHARED = new Node();
    static final Node EXCLUSIVE = null;

  	//等待状态，这里都定义好了
   	//唯一一个大于0的状态，表示已失效，可能是由于超时或中断，此节点被取消。
    static final int CANCELLED =  1;
  	//此节点后面的节点被挂起（进入等待状态）
    static final int SIGNAL    = -1;	
  	//在条件队列中的节点才是这个状态
    static final int CONDITION = -2;
  	//传播，一般用于共享锁
    static final int PROPAGATE = -3;

    volatile int waitStatus;    //等待状态值
    volatile Node prev;   //双向链表基操
    volatile Node next;
    volatile Thread thread;   //每一个线程都可以被封装进一个节点进入到等待队列
  
    Node nextWaiter;   //在等待队列中表示模式，条件队列中作为下一个结点的指针

    final boolean isShared() {
        return nextWaiter == SHARED;
    }

    final Node predecessor() throws NullPointerException {
        Node p = prev;
        if (p == null)
            throw new NullPointerException();
        else
            return p;
    }

    Node() {
    }

    Node(Thread thread, Node mode) {
        this.nextWaiter = mode;
        this.thread = thread;
    }

    Node(Thread thread, int waitStatus) {
        this.waitStatus = waitStatus;
        this.thread = thread;
    }
}
```

在一开始的时候，`head`和`tail`都是`null`，`state`为默认值`0`：

```java
private transient volatile Node head;

private transient volatile Node tail;

private volatile int state;
```

不用担心双向链表不会进行初始化，初始化是在实际使用时才开始的，先不管，我们接着来看其他的初始化内容：

```java
//直接使用Unsafe类进行操作
private static final Unsafe unsafe = Unsafe.getUnsafe();
//记录类中属性的在内存中的偏移地址，方便Unsafe类直接操作内存进行赋值等（直接修改对应地址的内存）
private static final long stateOffset;   //这里对应的就是AQS类中的state成员字段
private static final long headOffset;    //这里对应的就是AQS类中的head头结点成员字段
private static final long tailOffset;
private static final long waitStatusOffset;
private static final long nextOffset;

static {   //静态代码块，在类加载的时候就会自动获取偏移地址
    try {
        stateOffset = unsafe.objectFieldOffset
            (AbstractQueuedSynchronizer.class.getDeclaredField("state"));
        headOffset = unsafe.objectFieldOffset
            (AbstractQueuedSynchronizer.class.getDeclaredField("head"));
        tailOffset = unsafe.objectFieldOffset
            (AbstractQueuedSynchronizer.class.getDeclaredField("tail"));
        waitStatusOffset = unsafe.objectFieldOffset
            (Node.class.getDeclaredField("waitStatus"));
        nextOffset = unsafe.objectFieldOffset
            (Node.class.getDeclaredField("next"));

    } catch (Exception ex) { throw new Error(ex); }
}

//通过CAS操作来修改头结点
private final boolean compareAndSetHead(Node update) {
  	//调用的是Unsafe类的compareAndSwapObject方法，通过CAS算法比较对象并替换
    return unsafe.compareAndSwapObject(this, headOffset, null, update);
}

//同上，省略部分代码
private final boolean compareAndSetTail(Node expect, Node update) {

private static final boolean compareAndSetWaitStatus(Node node, int expect, int update) {

private static final boolean compareAndSetNext(Node node, Node expect, Node update) {
```

可以发现，队列同步器由于要使用到CAS算法，所以，直接使用了Unsafe工具类，Unsafe类中提供了CAS操作的方法（Java无法实现，底层由C++实现）所有对AQS类中成员字段的修改，都有对应的CAS操作封装。

现在我们大致了解了一下它的底层运作机制，我们接着来看这个类是如何进行使用的，它提供了一些可重写的方法（根据不同的锁类型和机制，可以自由定制规则，并且为独占式和非独占式锁都提供了对应的方法），以及一些已经写好的模板方法（模板方法会调用这些可重写的方法），使用此类只需要将可重写的方法进行重写，并调用提供的模板方法，从而实现锁功能（学习过设计模式会比较好理解一些）

我们首先来看可重写方法：

```java
//独占式获取同步状态，查看同步状态是否和参数一致，如果返没有问题，那么会使用CAS操作设置同步状态并返回true
protected boolean tryAcquire(int arg) {
    throw new UnsupportedOperationException();
}

//独占式释放同步状态
protected boolean tryRelease(int arg) {
    throw new UnsupportedOperationException();
}

//共享式获取同步状态，返回值大于0表示成功，否则失败
protected int tryAcquireShared(int arg) {
    throw new UnsupportedOperationException();
}

//共享式释放同步状态
protected boolean tryReleaseShared(int arg) {
    throw new UnsupportedOperationException();
}

//是否在独占模式下被当前线程占用（锁是否被当前线程持有）
protected boolean isHeldExclusively() {
    throw new UnsupportedOperationException();
}
```

可以看到，这些需要重写的方法默认是直接抛出`UnsupportedOperationException`，也就是说根据不同的锁类型，我们需要去实现对应的方法，我们可以来看一下ReentrantLock（此类是全局独占式的）中的公平锁是如何借助AQS实现的：

```java
static final class FairSync extends Sync {
    private static final long serialVersionUID = -3000897897090466540L;

  	//加锁操作调用了模板方法acquire
  	//为了防止各位绕晕，请时刻记住，lock方法一定是在某个线程下为了加锁而调用的，并且同一时间可能会有其他线程也在调用此方法
    final void lock() {
        acquire(1);
    }

    ...
}
```

我们先看看加锁操作干了什么事情，这里直接调用了AQS提供的模板方法`acquire()`，我们来看看它在AQS类中的实现细节：

```java
@ReservedStackAccess //这个是JEP 270添加的新注解，它会保护被注解的方法，通过添加一些额外的空间，防止在多线程运行的时候出现栈溢出，下同
public final void acquire(int arg) {
    if (!tryAcquire(arg) &&
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))   //节点为独占模式Node.EXCLUSIVE
        selfInterrupt();
}
```

首先会调用`tryAcquire()`方法（这里是由FairSync类实现的），如果尝试加独占锁失败（返回false了）说明可能这个时候有其他线程持有了此独占锁，所以当前线程得先等着，那么会调用`addWaiter()`方法将线程加入等待队列中：

```java
private Node addWaiter(Node mode) {
    Node node = new Node(Thread.currentThread(), mode);
    // 先尝试使用CAS直接入队，如果这个时候其他线程也在入队（就是不止一个线程在同一时间争抢这把锁）就进入enq()
    Node pred = tail;
    if (pred != null) {
        node.prev = pred;
        if (compareAndSetTail(pred, node)) {
            pred.next = node;
            return node;
        }
    }
  	//此方法是CAS快速入队失败时调用
    enq(node);
    return node;
}

private Node enq(final Node node) {
  	//自旋形式入队，可以看到这里是一个无限循环
    for (;;) {
        Node t = tail;
        if (t == null) {  //这种情况只能说明头结点和尾结点都还没初始化
            if (compareAndSetHead(new Node()))   //初始化头结点和尾结点
                tail = head;
        } else {
            node.prev = t;
            if (compareAndSetTail(t, node)) {
                t.next = node;
                return t;   //只有CAS成功的情况下，才算入队成功，如果CAS失败，那说明其他线程同一时间也在入队，并且手速还比当前线程快，刚好走到CAS操作的时候，其他线程就先入队了，那么这个时候node.prev就不是我们预期的节点了，而是另一个线程新入队的节点，所以说得进下一次循环再来一次CAS，这种形式就是自旋
            }
        }
    }
}
```

在了解了`addWaiter()`方法会将节点加入等待队列之后，我们接着来看，`addWaiter()`会返回已经加入的节点，`acquireQueued()`在得到返回的节点时，也会进入自旋状态，等待唤醒（也就是开始进入到拿锁的环节了）：

```java
@ReservedStackAccess
final boolean acquireQueued(final Node node, int arg) {
    boolean failed = true;
    try {
        boolean interrupted = false;
        for (;;) {
            final Node p = node.predecessor();
            if (p == head && tryAcquire(arg)) {   //可以看到当此节点位于队首(node.prev == head)时，会再次调用tryAcquire方法获取锁，如果获取成功，会返回此过程中是否被中断的值
                setHead(node);    //新的头结点设置为当前结点
                p.next = null; // 原有的头结点没有存在的意义了
                failed = false;   //没有失败
                return interrupted;   //直接返回等待过程中是否被中断
            }	
          	//依然没获取成功，
            if (shouldParkAfterFailedAcquire(p, node) &&   //将当前节点的前驱节点等待状态设置为SIGNAL，如果失败将直接开启下一轮循环，直到成功为止，如果成功接着往下
                parkAndCheckInterrupt())   //挂起线程进入等待状态，等待被唤醒，如果在等待状态下被中断，那么会返回true，直接将中断标志设为true，否则就是正常唤醒，继续自旋
                interrupted = true;
        }
    } finally {
        if (failed)
            cancelAcquire(node);
    }
}

private final boolean parkAndCheckInterrupt() {
    LockSupport.park(this);   //通过unsafe类操作底层挂起线程（会直接进入阻塞状态）
    return Thread.interrupted();
}
```

```java
private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
    int ws = pred.waitStatus;
    if (ws == Node.SIGNAL)
        return true;   //已经是SIGNAL，直接true
    if (ws > 0) {   //不能是已经取消的节点，必须找到一个没被取消的
        do {
            node.prev = pred = pred.prev;
        } while (pred.waitStatus > 0);
        pred.next = node;   //直接抛弃被取消的节点
    } else {
        //不是SIGNAL，先CAS设置为SIGNAL（这里没有返回true因为CAS不一定成功，需要下一轮再判断一次）
        compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
    }
    return false;   //返回false，马上开启下一轮循环
}
```

所以，`acquire()`中的if条件如果为true，那么只有一种情况，就是等待过程中被中断了，其他任何情况下都是成功获取到独占锁，所以当等待过程被中断时，会调用`selfInterrupt()`方法：

```java
static void selfInterrupt() {
    Thread.currentThread().interrupt();
}
```

这里就是直接向当前线程发送中断信号了。

上面提到了LockSupport类，它是一个工具类，我们也可以来玩一下这个`park`和`unpark`:

```java
public static void main(String[] args) throws InterruptedException {
    Thread t = Thread.currentThread();  //先拿到主线程的Thread对象
    new Thread(() -> {
        try {
            TimeUnit.SECONDS.sleep(1);
            System.out.println("主线程可以继续运行了！");
            LockSupport.unpark(t);
          	//t.interrupt();   发送中断信号也可以恢复运行
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }).start();
    System.out.println("主线程被挂起！");
    LockSupport.park();
    System.out.println("主线程继续运行！");
}
```

这里我们就把公平锁的`lock()`方法实现讲解完毕了（让我猜猜，已经晕了对吧，越是到源码越考验个人的基础知识掌握，基础不牢地动山摇）接着我们来看公平锁的`tryAcquire()`方法：

```java
static final class FairSync extends Sync {
  	//可重入独占锁的公平实现
    @ReservedStackAccess
    protected final boolean tryAcquire(int acquires) {
        final Thread current = Thread.currentThread();   //先获取当前线程的Thread对象
        int c = getState();     //获取当前AQS对象状态（独占模式下0为未占用，大于0表示已占用）
        if (c == 0) {       //如果是0，那就表示没有占用，现在我们的线程就要来尝试占用它
            if (!hasQueuedPredecessors() &&    //等待队列是否不为空且当前线程没有拿到锁，其实就是看看当前线程有没有必要进行排队，如果没必要排队，就说明可以直接获取锁
                compareAndSetState(0, acquires)) {   //CAS设置状态，如果成功则说明成功拿到了这把锁，失败则说明可能这个时候其他线程在争抢，并且还比你先抢到
                setExclusiveOwnerThread(current);    //成功拿到锁，会将独占模式所有者线程设定为当前线程（这个方法是父类AbstractOwnableSynchronizer中的，就表示当前这把锁已经是这个线程的了）
                return true;   //占用锁成功，返回true
            }
        }
        else if (current == getExclusiveOwnerThread()) {   //如果不是0，那就表示被线程占用了，这个时候看看是不是自己占用的，如果是，由于是可重入锁，可以继续加锁
            int nextc = c + acquires;    //多次加锁会将状态值进行增加，状态值就是加锁次数
            if (nextc < 0)   //加到int值溢出了？
                throw new Error("Maximum lock count exceeded");
            setState(nextc);   //设置为新的加锁次数
            return true;
        }
        return false;   //其他任何情况都是加锁失败
    }
}
```

在了解了公平锁的实现之后，是不是感觉有点恍然大悟的感觉，虽然整个过程非常复杂，但是只要理清思路，还是比较简单的。

加锁过程已经OK，我们接着来看，它的解锁过程，`unlock()`方法是在AQS中实现的：

```java
public void unlock() {
    sync.release(1);    //直接调用了AQS中的release方法，参数为1表示解锁一次state值-1
}
```

```java
@ReservedStackAccess
public final boolean release(int arg) {
    if (tryRelease(arg)) {   //和tryAcquire一样，也得子类去重写，释放锁操作
        Node h = head;    //释放锁成功后，获取新的头结点
        if (h != null && h.waitStatus != 0)   //如果新的头结点不为空并且不是刚刚建立的结点（初始状态下status为默认值0，而上面在进行了shouldParkAfterFailedAcquire之后，会被设定为SIGNAL状态，值为-1）
            unparkSuccessor(h);   //唤醒头节点下一个节点中的线程
        return true;
    }
    return false;
}
```

```java
private void unparkSuccessor(Node node) {
    // 将等待状态waitStatus设置为初始值0
    int ws = node.waitStatus;
    if (ws < 0)
        compareAndSetWaitStatus(node, ws, 0);

    //获取下一个结点
    Node s = node.next;
    if (s == null || s.waitStatus > 0) {   //如果下一个结点为空或是等待状态是已取消，那肯定是不能通知unpark的，这时就要遍历所有节点再另外找一个符合unpark要求的节点了
        s = null;
        for (Node t = tail; t != null && t != node; t = t.prev)   //这里是从队尾向前，因为enq()方法中的t.next = node是在CAS之后进行的，而 node.prev = t 是CAS之前进行的，所以从后往前一定能够保证遍历所有节点
            if (t.waitStatus <= 0)
                s = t;
    }
    if (s != null)   //要是找到了，就直接unpark，要是还是没找到，那就算了
        LockSupport.unpark(s.thread);
}
```

那么我们来看看`tryRelease()`方法是怎么实现的，具体实现在Sync中：

```java
@ReservedStackAccess
protected final boolean tryRelease(int releases) {
    int c = getState() - releases;   //先计算本次解锁之后的状态值
    if (Thread.currentThread() != getExclusiveOwnerThread())   //因为是独占锁，那肯定这把锁得是当前线程持有才行
        throw new IllegalMonitorStateException();   //否则直接抛异常
    boolean free = false;
    if (c == 0) {  //如果解锁之后的值为0，表示已经完全释放此锁
        free = true;
        setExclusiveOwnerThread(null);  //将独占锁持有线程设置为null
    }
    setState(c);   //状态值设定为c
    return free;  //如果不是0表示此锁还没完全释放，返回false，是0就返回true
}
```

综上，我们来画一个完整的流程图：

![image-20220306141248030](https://tva1.sinaimg.cn/large/e6c9d24ely1h004uzeni8j224k0ca0w9.jpg)

这里我们只讲解了公平锁，有关非公平锁和读写锁，还请各位观众根据我们之前的思路，自行解读。

#### 公平锁一定公平吗？

前面我们讲解了公平锁的实现原理，那么，我们尝试分析一下，在并发的情况下，公平锁一定公平吗？

我们再次来回顾一下`tryAcquire()`方法的实现：

```java
@ReservedStackAccess
protected final boolean tryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        if (!hasQueuedPredecessors() &&   //注意这里，公平锁的机制是，一开始会查看是否有节点处于等待
            compareAndSetState(0, acquires)) {   //如果前面的方法执行后发现没有等待节点，就直接进入占锁环节了
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0)
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```

所以`hasQueuedPredecessors()`这个环节容不得半点闪失，否则会直接破坏掉公平性，假如现在出现了这样的情况：

线程1已经持有锁了，这时线程2来争抢这把锁，走到`hasQueuedPredecessors()`，判断出为 `false`，线程2继续运行，然后线程2肯定获取锁失败（因为锁这时是被线程1占有的），因此就进入到等待队列中：

```java
private Node enq(final Node node) {
    for (;;) {
        Node t = tail;
        if (t == null) { // 线程2进来之后，肯定是要先走这里的，因为head和tail都是null
            if (compareAndSetHead(new Node()))
                tail = head;   //这里就将tail直接等于head了，注意这里完了之后还没完，这里只是初始化过程
        } else {
            node.prev = t;
            if (compareAndSetTail(t, node)) {
                t.next = node;
                return t;
            }
        }
    }
}

private Node addWaiter(Node mode) {
    Node node = new Node(Thread.currentThread(), mode);
    Node pred = tail;
    if (pred != null) {   //由于一开始head和tail都是null，所以线程2直接就进enq()了
        node.prev = pred;
        if (compareAndSetTail(pred, node)) {
            pred.next = node;
            return node;
        }
    }
    enq(node);   //请看上面
    return node;
}
```

而碰巧不巧，这个时候线程3也来抢锁了，按照正常流程走到了`hasQueuedPredecessors()`方法，而在此方法中：

```java
public final boolean hasQueuedPredecessors() {
    Node t = tail; // Read fields in reverse initialization order
    Node h = head;
    Node s;
  	//这里直接判断h != t，而此时线程2才刚刚执行完 tail = head，所以直接就返回false了
    return h != t &&
        ((s = h.next) == null || s.thread != Thread.currentThread());
}
```

因此，线程3这时就紧接着准备开始CAS操作了，又碰巧，这时线程1释放锁了，现在的情况就是，线程3直接开始CAS判断，而线程2还在插入节点状态，结果可想而知，居然是线程3先拿到了锁，这显然是违背了公平锁的公平机制。

一张图就是：

![image-20220306155509195](https://tva1.sinaimg.cn/large/e6c9d24ely1h007thq2x1j22ce0k879c.jpg)

因此公不公平全看`hasQueuedPredecessors()`，而此方法只有在等待队列中存在节点时才能保证不会出现问题。所以公平锁，只有在等待队列存在节点时，才是真正公平的。

#### Condition实现原理

通过前面的学习，我们知道Condition类实际上就是用于代替传统对象的wait/notify操作的，同样可以实现等待/通知模式，并且同一把锁下可以创建多个Condition对象。那么我们接着来看看，它又是如何实现的呢，我们先从单个Condition对象进行分析：

在AQS中，Condition有一个实现类ConditionObject，而这里也是使用了链表实现了条件队列：

```java
public class ConditionObject implements Condition, java.io.Serializable {
    private static final long serialVersionUID = 1173984872572414699L;
    /** 条件队列的头结点 */
    private transient Node firstWaiter;
    /** 条件队列的尾结点 */
    private transient Node lastWaiter;
  
  	//...
```

这里是直接使用了AQS中的Node类，但是使用的是Node类中的nextWaiter字段连接节点，并且Node的status为CONDITION：

![image-20220307115850295](https://tva1.sinaimg.cn/large/e6c9d24ely1h016lyg63ij21ew0dsgnt.jpg)

我们知道，当一个线程调用`await()`方法时，会进入等待状态，直到其他线程调用`signal()`方法将其唤醒，而这里的条件队列，正是用于存储这些处于等待状态的线程。

我们先来看看最关键的`await()`方法是如何实现的，为了防止一会绕晕，在开始之前，我们先明确此方法的目标：

* 只有已经持有锁的线程才可以使用此方法
* 当调用此方法后，会直接释放锁，无论加了多少次锁
* 只有其他线程调用`signal()`或是被中断时才会唤醒等待中的线程
* 被唤醒后，需要等待其他线程释放锁，拿到锁之后才可以继续执行，并且会恢复到之前的状态（await之前加了几层锁唤醒后依然是几层锁）

好了，差不多可以上源码了：

```java
public final void await() throws InterruptedException {
    if (Thread.interrupted())
        throw new InterruptedException();   //如果在调用await之前就被添加了中断标记，那么会直接抛出中断异常
    Node node = addConditionWaiter();    //为当前线程创建一个新的节点，并将其加入到条件队列中
    int savedState = fullyRelease(node);    //完全释放当前线程持有的锁，并且保存一下state值，因为唤醒之后还得恢复
    int interruptMode = 0;     //用于保存中断状态
    while (!isOnSyncQueue(node)) {   //循环判断是否位于同步队列中，如果等待状态下的线程被其他线程唤醒，那么会正常进入到AQS的等待队列中（之后我们会讲）
        LockSupport.park(this);   //如果依然处于等待状态，那么继续挂起
        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)   //看看等待的时候是不是被中断了
            break;
    }
  	//出了循环之后，那线程肯定是已经醒了，这时就差拿到锁就可以恢复运行了
    if (acquireQueued(node, savedState) && interruptMode != THROW_IE)  //直接开始acquireQueued尝试拿锁（之前已经讲过了）从这里开始基本就和一个线程去抢锁是一样的了
        interruptMode = REINTERRUPT;
  	//已经拿到锁了，基本可以开始继续运行了，这里再进行一下后期清理工作
    if (node.nextWaiter != null) 
        unlinkCancelledWaiters();  //将等待队列中，不是Node.CONDITION状态的节点移除
    if (interruptMode != 0)   //依然是响应中断
        reportInterruptAfterWait(interruptMode);
  	//OK，接着该干嘛干嘛
}
```

实际上`await()`方法比较中规中矩，大部分操作也在我们的意料之中，那么我们接着来看`signal()`方法是如何实现的，同样的，为了防止各位绕晕，先明确signal的目标：

* 只有持有锁的线程才能唤醒锁所属的Condition等待的线程
* 优先唤醒条件队列中的第一个，如果唤醒过程中出现问题，接着找往下找，直到找到一个可以唤醒的
* 唤醒操作本质上是将条件队列中的结点直接丢进AQS等待队列中，让其参与到锁的竞争中
* 拿到锁之后，线程才能恢复运行

![image-20220307120449303](https://tva1.sinaimg.cn/large/e6c9d24ely1h016s4p0rfj21as0hg76w.jpg)

好了，上源码：

```java
public final void signal() {
    if (!isHeldExclusively())    //先看看当前线程是不是持有锁的状态
        throw new IllegalMonitorStateException();   //不是？那你不配唤醒别人
    Node first = firstWaiter;    //获取条件队列的第一个结点
    if (first != null)    //如果队列不为空，获取到了，那么就可以开始唤醒操作
        doSignal(first);
}
```

```java
private void doSignal(Node first) {
    do {
        if ( (firstWaiter = first.nextWaiter) == null)   //如果当前节点在本轮循环没有后继节点了，条件队列就为空了
            lastWaiter = null;   //所以这里相当于是直接清空
        first.nextWaiter = null;   //将给定节点的下一个结点设置为null，因为当前结点马上就会离开条件队列了
    } while (!transferForSignal(first) &&   //接着往下看
             (first = firstWaiter) != null);   //能走到这里只能说明给定节点被设定为了取消状态，那就继续看下一个结点
}
```

```java
final boolean transferForSignal(Node node) {
    /*
     * 如果这里CAS失败，那有可能此节点被设定为了取消状态
     */
    if (!compareAndSetWaitStatus(node, Node.CONDITION, 0))
        return false;

    //CAS成功之后，结点的等待状态就变成了默认值0，接着通过enq方法直接将节点丢进AQS的等待队列中，相当于唤醒并且可以等待获取锁了
  	//这里enq方法返回的是加入之后等待队列队尾的前驱节点，就是原来的tail
    Node p = enq(node);
    int ws = p.waitStatus;   //保存前驱结点的等待状态
  	//如果上一个节点的状态为取消, 或者尝试设置上一个节点的状态为SIGNAL失败（可能是在ws>0判断完之后马上变成了取消状态，导致CAS失败）
    if (ws > 0 || !compareAndSetWaitStatus(p, ws, Node.SIGNAL))
        LockSupport.unpark(node.thread);  //直接唤醒线程
    return true;
}
```

其实最让人不理解的就是倒数第二行，明明上面都正常进入到AQS等待队列了，应该是可以开始走正常流程了，那么这里为什么还要提前来一次unpark呢？

这里其实是为了进行优化而编写，直接unpark会有两种情况：

- 如果插入结点前，AQS等待队列的队尾节点就已经被取消，则满足wc > 0
- 如果插入node后，AQS内部等待队列的队尾节点已经稳定，满足tail.waitStatus == 0，但在执行ws >
  0之后!compareAndSetWaitStatus(p, ws,
  Node.SIGNAL)之前被取消，则CAS也会失败，满足compareAndSetWaitStatus(p, ws,
  Node.SIGNAL) == false

如果这里被提前unpark，那么在`await()`方法中将可以被直接唤醒，并跳出while循环，直接开始争抢锁，因为前一个等待结点是被取消的状态，没有必要再等它了。

所以，大致流程下：

![image-20220307131536020](https://tva1.sinaimg.cn/large/e6c9d24ely1h018ts8x80j21to0eidix.jpg)

只要把整个流程理清楚，还是很好理解的。

#### 自行实现锁类

既然前面了解了那么多AQS的功能，那么我就仿照着这些锁类来实现一个简单的锁：

* 要求：同一时间只能有一个线程持有锁，不要求可重入（反复加锁无视即可）

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        
    }

    /**
     * 自行实现一个最普通的独占锁
     * 要求：同一时间只能有一个线程持有锁，不要求可重入
     */
    private static class MyLock implements Lock {

        /**
         * 设计思路：
         * 1. 锁被占用，那么exclusiveOwnerThread应该被记录，并且state = 1
         * 2. 锁没有被占用，那么exclusiveOwnerThread为null，并且state = 0
         */
        private static class Sync extends AbstractQueuedSynchronizer {
            @Override
            protected boolean tryAcquire(int arg) {
                if(isHeldExclusively()) return true;     //无需可重入功能，如果是当前线程直接返回true
                if(compareAndSetState(0, arg)){    //CAS操作进行状态替换
                    setExclusiveOwnerThread(Thread.currentThread());    //成功后设置当前的所有者线程
                    return true;
                }
                return false;
            }

            @Override
            protected boolean tryRelease(int arg) {
                if(getState() == 0)
                    throw new IllegalMonitorStateException();   //没加锁情况下是不能直接解锁的
                if(isHeldExclusively()){     //只有持有锁的线程才能解锁
                    setExclusiveOwnerThread(null);    //设置所有者线程为null
                    setState(0);    //状态变为0
                    return true;
                }
                return false;
            }

            @Override
            protected boolean isHeldExclusively() {
                return getExclusiveOwnerThread() == Thread.currentThread();
            }

            protected Condition newCondition(){
                return new ConditionObject();    //直接用现成的
            }
        }

        private final Sync sync = new Sync();

        @Override
        public void lock() {
            sync.acquire(1);
        }

        @Override
        public void lockInterruptibly() throws InterruptedException {
            sync.acquireInterruptibly(1);
        }

        @Override
        public boolean tryLock() {
            return sync.tryAcquire(1);
        }

        @Override
        public boolean tryLock(long time, TimeUnit unit) throws InterruptedException {
            return sync.tryAcquireNanos(1, unit.toNanos(time));
        }

        @Override
        public void unlock() {
            sync.release(1);
        }

        @Override
        public Condition newCondition() {
            return sync.newCondition();
        }
    }
}
```

到这里，我们对应队列同步器AQS的讲解就先到此为止了，当然，AQS的全部机制并非仅仅只有我们讲解的内容，一些我们没有提到的内容，还请各位观众自行探索，会有满满的成就感哦~

***

## 原子类

前面我们讲解了锁框架的使用和实现原理，虽然比较复杂，但是收获还是很多的（主要是观摩大佬写的代码）这一部分我们就来讲一点轻松的。

前面我们说到，如果要保证`i++`的原子性，那么我们的唯一选择就是加锁，那么，除了加锁之外，还有没有其他更好的解决方法呢？JUC为我们提供了原子类，底层采用CAS算法，它是一种用法简单、性能高效、线程安全地更新变量的方式。

所有的原子类都位于`java.util.concurrent.atomic`包下。

### 原子类介绍

常用基本数据类，有对应的原子类封装：

* AtomicInteger：原子更新int
* AtomicLong：原子更新long
* AtomicBoolean：原子更新boolean

那么，原子类和普通的基本类在使用上有没有什么区别呢？我们先来看正常情况下使用一个基本类型：

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;
        System.out.println(i++);
    }
}
```

现在我们使用int类型对应的原子类，要实现同样的代码该如何编写：

```java
public class Main {
    public static void main(String[] args) {
        AtomicInteger i = new AtomicInteger(1);
        System.out.println(i.getAndIncrement());  //如果想实现i += 2这种操作，可以使用 addAndGet() 自由设置delta 值
    }
}
```

我们可以将int数值封装到此类中（注意必须调用构造方法，它不像Integer那样有装箱机制），并且通过调用此类提供的方法来获取或是对封装的int值进行自增，乍一看，这不就是基本类型包装类嘛，有啥高级的。确实，还真有包装类那味，但是它可不仅仅是简单的包装，它的自增操作是具有原子性的：

```java
public class Main {
    private static AtomicInteger i = new AtomicInteger(0);
    public static void main(String[] args) throws InterruptedException {
        Runnable r = () -> {
            for (int j = 0; j < 100000; j++)
                i.getAndIncrement();
            System.out.println("自增完成！");
        };
        new Thread(r).start();
        new Thread(r).start();
        TimeUnit.SECONDS.sleep(1);
        System.out.println(i.get());
    }
}
```

同样是直接进行自增操作，我们发现，使用原子类是可以保证自增操作原子性的，就跟我们前面加锁一样。怎么会这么神奇？我们来看看它的底层是如何实现的，直接从构造方法点进去：

```java
private volatile int value;

public AtomicInteger(int initialValue) {
    value = initialValue;
}

public AtomicInteger() {
}
```

可以看到，它的底层是比较简单的，其实本质上就是封装了一个`volatile`类型的int值，这样能够保证可见性，在CAS操作的时候不会出现问题。

```java
private static final Unsafe unsafe = Unsafe.getUnsafe();
private static final long valueOffset;

static {
    try {
        valueOffset = unsafe.objectFieldOffset
            (AtomicInteger.class.getDeclaredField("value"));
    } catch (Exception ex) { throw new Error(ex); }
}
```

可以看到最上面是和AQS采用了类似的机制，因为要使用CAS算法更新value的值，所以得先计算出value字段在对象中的偏移地址，CAS直接修改对应位置的内存即可（可见Unsafe类的作用巨大，很多的底层操作都要靠它来完成）

接着我们来看自增操作是怎么在运行的：

```java
public final int getAndIncrement() {
    return unsafe.getAndAddInt(this, valueOffset, 1);
}
```

可以看到这里调用了`unsafe.getAndAddInt()`，套娃时间到，我们接着看看Unsafe里面写了什么：

```java
public final int getAndAddInt(Object o, long offset, int delta) {  //delta就是变化的值，++操作就是自增1
    int v;
    do {
      	//volatile版本的getInt()
      	//能够保证可见性
        v = getIntVolatile(o, offset);
    } while (!compareAndSwapInt(o, offset, v, v + delta));  //这里是开始cas替换int的值，每次都去拿最新的值去进行替换，如果成功则离开循环，不成功说明这个时候其他线程先修改了值，就进下一次循环再获取最新的值然后再cas一次，直到成功为止
    return v;
}
```

可以看到这是一个`do-while`循环，那么这个循环在做一个什么事情呢？感觉就和我们之前讲解的AQS队列中的机制差不多，也是采用自旋形式，来不断进行CAS操作，直到成功。

![image-20220308131536403](https://tva1.sinaimg.cn/large/e6c9d24egy1h02eg5qcfaj21pa0ekju1.jpg)

可见，原子类底层也是采用了CAS算法来保证的原子性，包括`getAndSet`、`getAndAdd`等方法都是这样。原子类也直接提供了CAS操作方法，我们可以直接使用：

```java
public static void main(String[] args) throws InterruptedException {
    AtomicInteger integer = new AtomicInteger(10);
    System.out.println(integer.compareAndSet(30, 20));
    System.out.println(integer.compareAndSet(10, 20));
    System.out.println(integer);
}
```

如果想以普通变量的方式来设定值，那么可以使用`lazySet()`方法，这样就不采用`volatile`的立即可见机制了。

```java
AtomicInteger integer = new AtomicInteger(1);
integer.lazySet(2);
```

除了基本类有原子类以外，基本类型的数组类型也有原子类：

* AtomicIntegerArray：原子更新int数组
* AtomicLongArray：原子更新long数组
* AtomicReferenceArray：原子更新引用数组

其实原子数组和原子类型一样的，不过我们可以对数组内的元素进行原子操作：

```java
public static void main(String[] args) throws InterruptedException {
    AtomicIntegerArray array = new AtomicIntegerArray(new int[]{0, 4, 1, 3, 5});
    Runnable r = () -> {
        for (int i = 0; i < 100000; i++)
            array.getAndAdd(0, 1);
    };
    new Thread(r).start();
    new Thread(r).start();
    TimeUnit.SECONDS.sleep(1);
    System.out.println(array.get(0));
}
```

在JDK8之后，新增了`DoubleAdder`和`LongAdder`，在高并发情况下，`LongAdder`的性能比`AtomicLong`的性能更好，主要体现在自增上，它的大致原理如下：在低并发情况下，和`AtomicLong`是一样的，对value值进行CAS操作，但是出现高并发的情况时，`AtomicLong`会进行大量的循环操作来保证同步，而`LongAdder`会将对value值的CAS操作分散为对数组`cells`中多个元素的CAS操作（内部维护一个Cell[] as数组，每个Cell里面有一个初始值为0的long型变量，在高并发时会进行分散CAS，就是不同的线程可以对数组中不同的元素进行CAS自增，这样就避免了所有线程都对同一个值进行CAS），只需要最后再将结果加起来即可。

![image-20220308141517668](https://tva1.sinaimg.cn/large/e6c9d24egy1h02g67t42fj21ps0lan19.jpg)

使用如下：

```java
public static void main(String[] args) throws InterruptedException {
    LongAdder adder = new LongAdder();
    Runnable r = () -> {
        for (int i = 0; i < 100000; i++)
            adder.add(1);
    };
    for (int i = 0; i < 100; i++)
        new Thread(r).start();   //100个线程
    TimeUnit.SECONDS.sleep(1);
    System.out.println(adder.sum());   //最后求和即可
}
```

由于底层源码比较复杂，这里就不做讲解了。两者的性能对比（这里用到了CountDownLatch，建议学完之后再来看）：

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("使用AtomicLong的时间消耗："+test2()+"ms");
        System.out.println("使用LongAdder的时间消耗："+test1()+"ms");
    }

    private static long test1() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(100);
        LongAdder adder = new LongAdder();
        long timeStart = System.currentTimeMillis();
        Runnable r = () -> {
            for (int i = 0; i < 100000; i++)
                adder.add(1);
            latch.countDown();
        };
        for (int i = 0; i < 100; i++)
            new Thread(r).start();
        latch.await();
        return System.currentTimeMillis() - timeStart;
    }

    private static long test2() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(100);
        AtomicLong atomicLong = new AtomicLong();
        long timeStart = System.currentTimeMillis();
        Runnable r = () -> {
            for (int i = 0; i < 100000; i++)
                atomicLong.incrementAndGet();
            latch.countDown();
        };
        for (int i = 0; i < 100; i++)
            new Thread(r).start();
        latch.await();
        return System.currentTimeMillis() - timeStart;
    }
}
```

除了对基本数据类型支持原子操作外，对于引用类型，也是可以实现原子操作的：

```java
public static void main(String[] args) throws InterruptedException {
    String a = "Hello";
    String b = "World";
    AtomicReference<String> reference = new AtomicReference<>(a);
    reference.compareAndSet(a, b);
    System.out.println(reference.get());
}
```

JUC还提供了字段原子更新器，可以对类中的某个指定字段进行原子操作（注意字段必须添加volatile关键字）：

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Student student = new Student();
        AtomicIntegerFieldUpdater<Student> fieldUpdater =
                AtomicIntegerFieldUpdater.newUpdater(Student.class, "age");
        System.out.println(fieldUpdater.incrementAndGet(student));
    }

    public static class Student{
        volatile int age;
    }
}
```

了解了这么多原子类，是不是感觉要实现保证原子性的工作更加轻松了？

### ABA问题及解决方案

我们来想象一下这种场景：

![image-20220308150840321](https://tva1.sinaimg.cn/large/e6c9d24egy1h02hpquocrj213i0c8myf.jpg)

线程1和线程2同时开始对`a`的值进行CAS修改，但是线程1的速度比较快，将a的值修改为2之后紧接着又修改回1，这时线程2才开始进行判断，发现a的值是1，所以CAS操作成功。

很明显，这里的1已经不是一开始的那个1了，而是被重新赋值的1，这也是CAS操作存在的问题（无锁虽好，但是问题多多），它只会机械地比较当前值是不是预期值，但是并不会关心当前值是否被修改过，这种问题称之为`ABA`问题。

那么如何解决这种`ABA`问题呢，JUC提供了带版本号的引用类型，只要每次操作都记录一下版本号，并且版本号不会重复，那么就可以解决ABA问题了：

```java
public static void main(String[] args) throws InterruptedException {
    String a = "Hello";
    String b = "World";
    AtomicStampedReference<String> reference = new AtomicStampedReference<>(a, 1);  //在构造时需要指定初始值和对应的版本号
    reference.attemptStamp(a, 2);   //可以中途对版本号进行修改，注意要填写当前的引用对象
    System.out.println(reference.compareAndSet(a, b, 2, 3));   //CAS操作时不仅需要提供预期值和修改值，还要提供预期版本号和新的版本号
}
```

至此，有关原子类的讲解就到这里。

***

## 并发容器

简单的讲完了，又该讲难一点的了。

**注意：**本版块的重点在于探究并发容器是如何利用锁机制和算法实现各种丰富功能的，我们会忽略一些常规功能的实现细节（比如链表如何插入元素删除元素），而更关注并发容器应对并发场景算法上的实现（比如在多线程环境下的插入操作是按照什么规则进行的）

在单线程模式下，集合类提供的容器可以说是非常方便了，几乎我们每个项目中都能或多或少的用到它们，我们在JavaSE阶段，为各位讲解了各个集合类的实现原理，我们了解了链表、顺序表、哈希表等数据结构，那么，在多线程环境下，这些数据结构还能正常工作吗？

### 传统容器线程安全吗

我们来测试一下，100个线程同时向ArrayList中添加元素会怎么样：

```java
public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        Runnable r = () -> {
            for (int i = 0; i < 100; i++)
                list.add("lbwnb");
        };
        for (int i = 0; i < 100; i++)
            new Thread(r).start();
      	TimeUnit.SECONDS.sleep(1);
        System.out.println(list.size());
    }
}
```

不出意外的话，肯定是会报错的：

```
Exception in thread "Thread-0" java.lang.ArrayIndexOutOfBoundsException: 73
	at java.util.ArrayList.add(ArrayList.java:465)
	at com.test.Main.lambda$main$0(Main.java:13)
	at java.lang.Thread.run(Thread.java:750)
Exception in thread "Thread-19" java.lang.ArrayIndexOutOfBoundsException: 1851
	at java.util.ArrayList.add(ArrayList.java:465)
	at com.test.Main.lambda$main$0(Main.java:13)
	at java.lang.Thread.run(Thread.java:750)
9773
```

那么我们来看看报的什么错，从栈追踪信息可以看出，是add方法出现了问题：

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;   //这一句出现了数组越界
    return true;
}
```

也就是说，同一时间其他线程也在疯狂向数组中添加元素，那么这个时候有可能在`ensureCapacityInternal`（确认容量足够）执行之后，`elementData[size++] = e;`执行之前，其他线程插入了元素，导致size的值超出了数组容量。这些在单线程的情况下不可能发生的问题，在多线程下就慢慢出现了。

我们再来看看比较常用的HashMap呢？

```java
public static void main(String[] args) throws InterruptedException {
    Map<Integer, String> map = new HashMap<>();
    for (int i = 0; i < 100; i++) {
        int finalI = i;
        new Thread(() -> {
            for (int j = 0; j < 100; j++)
                map.put(finalI * 1000 + j, "lbwnb");
        }).start();
    }
    TimeUnit.SECONDS.sleep(2);
    System.out.println(map.size());
}
```

经过测试发现，虽然没有报错，但是最后的结果并不是我们期望的那样，实际上它还有可能导致Entry对象出现环状数据结构，引起死循环。

所以，在多线程环境下，要安全地使用集合类，我们得找找解决方案了。

### 并发容器介绍

怎么才能解决并发情况下的容器问题呢？我们首先想到的肯定是给方法前面加个`synchronzed`关键字，这样总不会抢了吧，在之前我们可以使用Vector或是Hashtable来解决，但是它们的效率实在是太低了，完全依靠锁来解决问题，因此现在已经很少再使它们了，这里也不会再去进行讲解。

JUC提供了专用于并发场景下的容器，比如我们刚刚使用的ArrayList，在多线程环境下是没办法使用的，我们可以将其替换为JUC提供的多线程专用集合类：

```java
public static void main(String[] args) throws InterruptedException {
    List<String> list = new CopyOnWriteArrayList<>();  //这里使用CopyOnWriteArrayList来保证线程安全
    Runnable r = () -> {
        for (int i = 0; i < 100; i++)
            list.add("lbwnb");
    };
    for (int i = 0; i < 100; i++)
        new Thread(r).start();
    TimeUnit.SECONDS.sleep(1);
    System.out.println(list.size());
}
```

我们发现，使用了`CopyOnWriteArrayList`之后，再没出现过上面的问题。

那么它是如何实现的呢，我们先来看看它是如何进行`add()`操作的：

```java
public boolean add(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();   //直接加锁，保证同一时间只有一个线程进行添加操作
    try {
        Object[] elements = getArray();  //获取当前存储元素的数组
        int len = elements.length;
        Object[] newElements = Arrays.copyOf(elements, len + 1);   //直接复制一份数组
        newElements[len] = e;   //修改复制出来的数组
        setArray(newElements);   //将元素数组设定为复制出来的数组
        return true;
    } finally {
        lock.unlock();
    }
}
```

可以看到添加操作是直接上锁，并且会先拷贝一份当前存放元素的数组，然后对数组进行修改，再将此数组替换（CopyOnWrite）接着我们来看读操作：

```java
public E get(int index) {
    return get(getArray(), index);
}
```

因此，`CopyOnWriteArrayList`对于读操作不加锁，而对于写操作是加锁的，类似于我们前面讲解的读写锁机制，这样就可以保证不丢失读性能的情况下，写操作不会出现问题。

接着我们来看对于HashMap的并发容器`ConcurrentHashMap`：

```java
public static void main(String[] args) throws InterruptedException {
    Map<Integer, String> map = new ConcurrentHashMap<>();
    for (int i = 0; i < 100; i++) {
        int finalI = i;
        new Thread(() -> {
            for (int j = 0; j < 100; j++)
                map.put(finalI * 100 + j, "lbwnb");
        }).start();
    }
    TimeUnit.SECONDS.sleep(1);
    System.out.println(map.size());
}
```

可以看到这里的ConcurrentHashMap就没有出现之前HashMap的问题了。因为线程之间会争抢同一把锁，我们之前在讲解LongAdder的时候学习到了一种压力分散思想，既然每个线程都想抢锁，那我就干脆多搞几把锁，让你们每个人都能拿到，这样就不会存在等待的问题了，而JDK7之前，ConcurrentHashMap的原理也比较类似，它将所有数据分为一段一段地存储，先分很多段出来，每一段都给一把锁，当一个线程占锁访问时，只会占用其中一把锁，也就是仅仅锁了一小段数据，而其他段的数据依然可以被其他线程正常访问。

![image-20220308165304048](https://tva1.sinaimg.cn/large/e6c9d24egy1h02kqcrfhcj21fk0fk75i.jpg)

这里我们重点讲解JDK8之后它是怎么实现的，它采用了CAS算法配合锁机制实现，我们先来回顾一下JDK8下的HashMap是什么样的结构：

![img](https://img-blog.csdnimg.cn/img_convert/3ad05990ed9e29801b1992030c030a00.png)

HashMap就是利用了哈希表，哈希表的本质其实就是一个用于存放后续节点的头结点的数组，数组里面的每一个元素都是一个头结点（也可以说就是一个链表），当要新插入一个数据时，会先计算该数据的哈希值，找到数组下标，然后创建一个新的节点，添加到对应的链表后面。当链表的长度达到8时，会自动将链表转换为红黑树，这样能使得原有的查询效率大幅度降低！当使用红黑树之后，我们就可以利用二分搜索的思想，快速地去寻找我们想要的结果，而不是像链表一样挨个去看。

又是基础不牢地动山摇环节，由于ConcurrentHashMap的源码比较复杂，所以我们先从最简单的构造方法开始下手：

![image-20220308214006830](https://tva1.sinaimg.cn/large/e6c9d24ely1h02t130fslj222h0u0k1b.jpg)

我们发现，它的构造方法和HashMap的构造方法有很大的出入，但是大体的结构和HashMap是差不多的，也是维护了一个哈希表，并且哈希表中存放的是链表或是红黑树，所以我们直接来看`put()`操作是如何实现的，只要看明白这个，基本上就懂了：

```java
public V put(K key, V value) {
    return putVal(key, value, false);
}

//有点小乱，如果看着太乱，可以在IDEA中折叠一下代码块，不然有点难受
final V putVal(K key, V value, boolean onlyIfAbsent) {
    if (key == null || value == null) throw new NullPointerException(); //键值不能为空，基操
    int hash = spread(key.hashCode());    //计算键的hash值，用于确定在哈希表中的位置
    int binCount = 0;   //一会用来记录链表长度的，忽略
    for (Node<K,V>[] tab = table;;) {    //无限循环，而且还是并发包中的类，盲猜一波CAS自旋锁
        Node<K,V> f; int n, i, fh;
        if (tab == null || (n = tab.length) == 0)
            tab = initTable();    //如果数组（哈希表）为空肯定是要进行初始化的，然后再重新进下一轮循环
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {   //如果哈希表该位置为null，直接CAS插入结点作为头结即可（注意这里会将f设置当前哈希表位置上的头结点）
            if (casTabAt(tab, i, null,
                         new Node<K,V>(hash, key, value, null)))  
                break;                   // 如果CAS成功，直接break结束put方法，失败那就继续下一轮循环
        } else if ((fh = f.hash) == MOVED)   //头结点哈希值为-1，这里只需要知道是因为正在扩容即可
            tab = helpTransfer(tab, f);   //帮助进行迁移，完事之后再来下一次循环
        else {     //特殊情况都完了，这里就该是正常情况了，
            V oldVal = null;
            synchronized (f) {   //在前面的循环中f肯定是被设定为了哈希表某个位置上的头结点，这里直接把它作为锁加锁了，防止同一时间其他线程也在操作哈希表中这个位置上的链表或是红黑树
                if (tabAt(tab, i) == f) {
                    if (fh >= 0) {    //头结点的哈希值大于等于0说明是链表，下面就是针对链表的一些列操作
                        ...实现细节略
                    } else if (f instanceof TreeBin) {   //肯定不大于0，肯定也不是-1，还判断是不是TreeBin，所以不用猜了，肯定是红黑树，下面就是针对红黑树的情况进行操作
                      	//在ConcurrentHashMap并不是直接存储的TreeNode，而是TreeBin
                        ...实现细节略
                    }
                }
            }
          	//根据链表长度决定是否要进化为红黑树
            if (binCount != 0) {
                if (binCount >= TREEIFY_THRESHOLD)
                    treeifyBin(tab, i);   //注意这里只是可能会进化为红黑树，如果当前哈希表的长度小于64，它会优先考虑对哈希表进行扩容
                if (oldVal != null)
                    return oldVal;
                break;
            }
        }
    }
    addCount(1L, binCount);
    return null;
}
```

怎么样，是不是感觉看着挺复杂，其实也还好，总结一下就是：

![image-20220308230825627](https://tva1.sinaimg.cn/large/e6c9d24ely1h02vkx608bj21eo0iwad0.jpg)

我们接着来看看`get()`操作：

```java
public V get(Object key) {
    Node<K,V>[] tab; Node<K,V> e, p; int n, eh; K ek;
    int h = spread(key.hashCode());   //计算哈希值
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (e = tabAt(tab, (n - 1) & h)) != null) {
      	// 如果头结点就是我们要找的，那直接返回值就行了
        if ((eh = e.hash) == h) {
            if ((ek = e.key) == key || (ek != null && key.equals(ek)))
                return e.val;
        }
      	//要么是正在扩容，要么就是红黑树，负数只有这两种情况
        else if (eh < 0)
            return (p = e.find(h, key)) != null ? p.val : null;
      	//确认无误，肯定在列表里，开找
        while ((e = e.next) != null) {
            if (e.hash == h &&
                ((ek = e.key) == key || (ek != null && key.equals(ek))))
                return e.val;
        }
    }
  	//没找到只能null了
    return null;
}
```

综上，ConcurrentHashMap的put操作，实际上是对哈希表上的所有头结点元素分别加锁，理论上来说哈希表的长度很大程度上决定了ConcurrentHashMap在同一时间能够处理的线程数量，这也是为什么`treeifyBin()`会优先考虑为哈希表进行扩容的原因。显然，这种加锁方式比JDK7的分段锁机制性能更好。

其实这里也只是简单地介绍了一下它的运行机制，ConcurrentHashMap真正的难点在于扩容和迁移操作，我们主要了解的是他的并发执行机制，有关它的其他实现细节，这里暂时不进行讲解。

### 阻塞队列

除了我们常用的容器类之外，JUC还提供了各种各样的阻塞队列，用于不同的工作场景。

阻塞队列本身也是队列，但是它是适用于多线程环境下的，基于ReentrantLock实现的，它的接口定义如下：

```java
public interface BlockingQueue<E> extends Queue<E> {
   	boolean add(E e);

    //入队，如果队列已满，返回false否则返回true（非阻塞）
    boolean offer(E e);

    //入队，如果队列已满，阻塞线程直到能入队为止
    void put(E e) throws InterruptedException;

    //入队，如果队列已满，阻塞线程直到能入队或超时、中断为止，入队成功返回true否则false
    boolean offer(E e, long timeout, TimeUnit unit)
        throws InterruptedException;

    //出队，如果队列为空，阻塞线程直到能出队为止
    E take() throws InterruptedException;

    //出队，如果队列为空，阻塞线程直到能出队超时、中断为止，出队成功正常返回，否则返回null
    E poll(long timeout, TimeUnit unit)
        throws InterruptedException;

    //返回此队列理想情况下（在没有内存或资源限制的情况下）可以不阻塞地入队的数量，如果没有限制，则返回 Integer.MAX_VALUE
    int remainingCapacity();

    boolean remove(Object o);

    public boolean contains(Object o);

  	//一次性从BlockingQueue中获取所有可用的数据对象（还可以指定获取数据的个数）
    int drainTo(Collection<? super E> c);

    int drainTo(Collection<? super E> c, int maxElements);
```

比如现在有一个容量为3的阻塞队列，这个时候一个线程`put`向其添加了三个元素，第二个线程接着`put`向其添加三个元素，那么这个时候由于容量已满，会直接被阻塞，而这时第三个线程从队列中取走2个元素，线程二停止阻塞，先丢两个进去，还有一个还是进不去，所以说继续阻塞。

![image-20220309165644403](https://tva1.sinaimg.cn/large/e6c9d24egy1h03qghwg2nj21sc0gawhb.jpg)

利用阻塞队列，我们可以轻松地实现消费者和生产者模式，还记得我们在JavaSE中的实战吗？

> 所谓的生产者消费者模型，是通过一个容器来解决生产者和消费者的强耦合问题。通俗的讲，就是生产者在不断的生产，消费者也在不断的消费，可是消费者消费的产品是生产者生产的，这就必然存在一个中间容器，我们可以把这个容器想象成是一个货架，当货架空的时候，生产者要生产产品，此时消费者在等待生产者往货架上生产产品，而当货架有货物的时候，消费者可以从货架上拿走商品，生产者此时等待货架出现空位，进而补货，这样不断的循环。

通过多线程编程，来模拟一个餐厅的2个厨师和3个顾客，假设厨师炒出一个菜的时间为3秒，顾客吃掉菜品的时间为4秒，窗口上只能放一个菜。

我们来看看，使用阻塞队列如何实现，这里我们就使用`ArrayBlockingQueue`实现类：

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<Object> queue = new ArrayBlockingQueue<>(1);
        Runnable supplier = () -> {
            while (true){
                try {
                    String name = Thread.currentThread().getName();
                    System.err.println(time()+"生产者 "+name+" 正在准备餐品...");
                    TimeUnit.SECONDS.sleep(3);
                    System.err.println(time()+"生产者 "+name+" 已出餐！");
                    queue.put(new Object());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    break;
                }
            }
        };
        Runnable consumer = () -> {
            while (true){
                try {
                    String name = Thread.currentThread().getName();
                    System.out.println(time()+"消费者 "+name+" 正在等待出餐...");
                    queue.take();
                    System.out.println(time()+"消费者 "+name+" 取到了餐品。");
                    TimeUnit.SECONDS.sleep(4);
                    System.out.println(time()+"消费者 "+name+" 已经将饭菜吃完了！");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    break;
                }
            }
        };
        for (int i = 0; i < 2; i++) new Thread(supplier, "Supplier-"+i).start();
        for (int i = 0; i < 3; i++) new Thread(consumer, "Consumer-"+i).start();
    }

    private static String time(){
        SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
        return "["+format.format(new Date()) + "] ";
    }
}
```

可以看到，阻塞队列在多线程环境下的作用是非常明显的，算上ArrayBlockingQueue，一共有三种常用的阻塞队列：

* ArrayBlockingQueue：有界带缓冲阻塞队列（就是队列是有容量限制的，装满了肯定是不能再装的，只能阻塞，数组实现）
* SynchronousQueue：无缓冲阻塞队列（相当于没有容量的ArrayBlockingQueue，因此只有阻塞的情况）
* LinkedBlockingQueue：无界带缓冲阻塞队列（没有容量限制，也可以限制容量，也会阻塞，链表实现）

这里我们以ArrayBlockingQueue为例进行源码解读，我们先来看看构造方法：

```java
final ReentrantLock lock;

private final Condition notEmpty;

private final Condition notFull;

public ArrayBlockingQueue(int capacity, boolean fair) {
    if (capacity <= 0)
        throw new IllegalArgumentException();
    this.items = new Object[capacity];
    lock = new ReentrantLock(fair);   //底层采用锁机制保证线程安全性，这里我们可以选择使用公平锁或是非公平锁
    notEmpty = lock.newCondition();   //这里创建了两个Condition（都属于lock）一会用于入队和出队的线程阻塞控制
    notFull =  lock.newCondition();
}
```

接着我们来看`put`和`offer`方法是如何实现的：

```java
public boolean offer(E e) {
    checkNotNull(e);
    final ReentrantLock lock = this.lock;    //可以看到这里也是使用了类里面的ReentrantLock进行加锁操作
    lock.lock();    //保证同一时间只有一个线程进入
    try {
        if (count == items.length)   //直接看看队列是否已满，如果没满则直接入队，如果已满则返回false
            return false;
        else {
            enqueue(e);
            return true;
        }
    } finally {
        lock.unlock();
    }
}

public void put(E e) throws InterruptedException {
    checkNotNull(e);
    final ReentrantLock lock = this.lock;    //同样的，需要进行加锁操作
    lock.lockInterruptibly();    //注意这里是可以响应中断的
    try {
        while (count == items.length)
            notFull.await();    //可以看到当队列已满时会直接挂起当前线程，在其他线程出队操作时会被唤醒
        enqueue(e);   //直到队列有空位才将线程入队
    } finally {
        lock.unlock();
    }
}
```

```java
private E dequeue() {
    // assert lock.getHoldCount() == 1;
    // assert items[takeIndex] != null;
    final Object[] items = this.items;
    @SuppressWarnings("unchecked")
    E x = (E) items[takeIndex];
    items[takeIndex] = null;
    if (++takeIndex == items.length)
        takeIndex = 0;
    count--;
    if (itrs != null)
        itrs.elementDequeued();
    notFull.signal();    //出队操作会调用notFull的signal方法唤醒被挂起处于等待状态的线程
    return x;
}
```

接着我们来看出队操作：

```java
public E poll() {
    final ReentrantLock lock = this.lock;
    lock.lock();    //出队同样进行加锁操作，保证同一时间只能有一个线程执行
    try {
        return (count == 0) ? null : dequeue();   //如果队列不为空则出队，否则返回null
    } finally {
        lock.unlock();
    }
}

public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();    //可以响应中断进行加锁
    try {
        while (count == 0)
            notEmpty.await();    //和入队相反，也是一直等直到队列中有元素之后才可以出队，在入队时会唤醒此线程
        return dequeue();
    } finally {
        lock.unlock();
    }
}
```

```java
private void enqueue(E x) {
    // assert lock.getHoldCount() == 1;
    // assert items[putIndex] == null;
    final Object[] items = this.items;
    items[putIndex] = x;
    if (++putIndex == items.length)
        putIndex = 0;
    count++;
    notEmpty.signal();    //对notEmpty的signal唤醒操作
}
```

可见，如果各位对锁的使用非常熟悉的话，那么在阅读这些源码的时候，就会非常轻松了。

接着我们来看一个比较特殊的队列SynchronousQueue，它没有任何容量，也就是说正常情况下出队必须和入队操作成对出现，我们先来看它的内部，可以看到内部有一个抽象类Transferer，它定义了一个`transfer`方法：

```java
abstract static class Transferer<E> {
    /**
     * 可以是put也可以是take操作
     *
     * @param e 如果不是空，即作为生产者，那么表示会将传入参数元素e交给消费者
     *          如果为空，即作为消费者，那么表示会从生产者那里得到一个元素e并返回
     * @param 是否可以超时
     * @param 超时时间
     * @return 不为空就是从生产者那里返回的，为空表示要么被中断要么超时。
     */
    abstract E transfer(E e, boolean timed, long nanos);
}
```

乍一看，有点迷惑，难不成还要靠这玩意去实现put和take操作吗？实际上它是直接以生产者消费者模式进行的，由于不需要依靠任何容器结构来暂时存放数据，所以我们可以直接通过`transfer`方法来对生产者和消费者之间的数据进行传递。

比如一个线程put一个新的元素进入，这时如果没有其他线程调用take方法获取元素，那么会持续被阻塞，直到有线程取出元素，而`transfer`正是需要等生产者消费者双方都到齐了才能进行交接工作，单独只有其中一方都需要进行等待。

```java
public void put(E e) throws InterruptedException {
    if (e == null) throw new NullPointerException();  //判空
    if (transferer.transfer(e, false, 0) == null) {   //直接使用transfer方法进行数据传递
        Thread.interrupted();    //为空表示要么被中断要么超时
        throw new InterruptedException();
    }
}
```

它在公平和非公平模式下，有两个实现，这里我们来看公平模式下的SynchronousQueue是如何实现的：

```java
static final class TransferQueue<E> extends Transferer<E> {
     //头结点（头结点仅作为头结点，后续节点才是真正等待的线程节点）
     transient volatile QNode head;
     //尾结点
     transient volatile QNode tail;

    /** 节点有生产者和消费者角色之分 */
    static final class QNode {
        volatile QNode next;          // 后继节点
        volatile Object item;         // 存储的元素
        volatile Thread waiter;       // 处于等待的线程，和之前的AQS一样的思路，每个线程等待的时候都会被封装为节点
        final boolean isData;         // 是生产者节点还是消费者节点
```

公平模式下，Transferer的实现是TransferQueue，是以先进先出的规则的进行的，内部有一个QNode类来保存等待的线程。

好了，我们直接上`transfer()`方法的实现（这里再次提醒各位，多线程环境下的源码分析和单线程的分析不同，我们需要时刻关注当前代码块的加锁状态，如果没有加锁，一定要具有多线程可能会同时运行的意识，这个意识在以后你自己处理多线程问题伴随着你，才能保证你的思路在多线程环境下是正确的）：

```java
E transfer(E e, boolean timed, long nanos) {   //注意这里面没加锁，肯定会多个线程之间竞争
    QNode s = null;
    boolean isData = (e != null);   //e为空表示消费者，不为空表示生产者

    for (;;) {
        QNode t = tail;
        QNode h = head;
        if (t == null || h == null)         // 头结点尾结点任意为空（但是在构造的时候就已经不是空了）
            continue;                       // 自旋

        if (h == t || t.isData == isData) { // 头结点等于尾结点表示队列中只有一个头结点，肯定是空，或者尾结点角色和当前节点一样，这两种情况下，都需要进行入队操作
            QNode tn = t.next;
            if (t != tail)                  // 如果这段时间内t被其他线程修改了，如果是就进下一轮循环重新来
                continue;
            if (tn != null) {               // 继续校验是否为队尾，如果tn不为null，那肯定是其他线程改了队尾，可以进下一轮循环重新来了
                advanceTail(t, tn);					// CAS将新的队尾节点设置为tn，成不成功都无所谓，反正这一轮肯定没戏了
                continue;
            }
            if (timed && nanos <= 0)        // 超时返回null
                return null;
            if (s == null)
                s = new QNode(e, isData);   //构造当前结点，准备加入等待队列
            if (!t.casNext(null, s))        // CAS添加当前节点为尾结点的下一个，如果失败肯定其他线程又抢先做了，直接进下一轮循环重新来
                continue;

            advanceTail(t, s);              // 上面的操作基本OK了，那么新的队尾元素就修改为s
            Object x = awaitFulfill(s, e, timed, nanos);   //开始等待s所对应的消费者或是生产者进行交接，比如s现在是生产者，那么它就需要等到一个消费者的到来才会继续（这个方法会先进行自旋等待匹配，如果自旋一定次数后还是没有匹配成功，那么就挂起）
            if (x == s) {                   // 如果返回s本身说明等待状态下被取消
                clean(t, s);
                return null;
            }

            if (!s.isOffList()) {           // 如果s操作完成之后没有离开队列，那么这里将其手动丢弃
                advanceHead(t, s);          // 将s设定为新的首节点(注意头节点仅作为头结点，并非处于等待的线程节点)
                if (x != null)              // 删除s内的其他信息
                    s.item = s;
                s.waiter = null;
            }
            return (x != null) ? (E)x : e;   //假如当前是消费者，直接返回x即可，x就是从生产者那里拿来的元素

        } else {                            // 这种情况下就是与队列中结点类型匹配的情况了（注意队列要么为空要么只会存在一种类型的节点，因为一旦出现不同类型的节点马上会被交接掉）
            QNode m = h.next;               // 获取头结点的下一个接口，准备进行交接工作
            if (t != tail || m == null || h != head)
                continue;                   // 判断其他线程是否先修改，如果修改过那么开下一轮

            Object x = m.item;
            if (isData == (x != null) ||    // 判断节点类型，如果是相同的操作，那肯定也是有问题的
                x == m ||                   // 或是当前操作被取消
                !m.casItem(x, e)) {         // 上面都不是？那么最后再进行CAS替换m中的元素，成功表示交接成功，失败就老老实实重开吧
                advanceHead(h, m);          // dequeue and retry
                continue;
            }

            advanceHead(h, m);              // 成功交接，新的头结点可以改为m了，原有的头结点直接不要了
            LockSupport.unpark(m.waiter);   // m中的等待交接的线程可以继续了，已经交接完成
            return (x != null) ? (E)x : e;  // 同上，该返回什么就返回什么
        }
    }
}
```

所以，总结为以下流程：

![image-20220314002203511](https://tva1.sinaimg.cn/large/e6c9d24ely1h08pt2hn9rj21rw0mojw7.jpg)

对于非公平模式下的SynchronousQueue，则是采用的栈结构来存储等待节点，但是思路也是与这里的一致，需要等待并进行匹配操作，各位如果感兴趣可以继续了解一下非公平模式下的SynchronousQueue实现。

在JDK7的时候，基于SynchronousQueue产生了一个更强大的TransferQueue，它保留了SynchronousQueue的匹配交接机制，并且与等待队列进行融合。

我们知道，SynchronousQueue并没有使用锁，而是采用CAS操作保证生产者与消费者的协调，但是它没有容量，而LinkedBlockingQueue虽然是有容量且无界的，但是内部基本都是基于锁实现的，性能并不是很好，这时，我们就可以将它们各自的优点单独拿出来，揉在一起，就成了性能更高的LinkedTransferQueue

```java
public static void main(String[] args) throws InterruptedException {
    LinkedTransferQueue<String> queue = new LinkedTransferQueue<>();
    queue.put("1");  //插入时，会先检查是否有其他线程等待获取，如果是，直接进行交接，否则插入到存储队列中
   	queue.put("2");  //不会像SynchronousQueue那样必须等一个匹配的才可以
    queue.forEach(System.out::println);   //直接打印所有的元素，这在SynchronousQueue下只能是空，因为单独的入队或出队操作都会被阻塞
}
```

相比 `SynchronousQueue` ，它多了一个可以存储的队列，我们依然可以像阻塞队列那样获取队列中所有元素的值，简单来说，`LinkedTransferQueue`其实就是一个多了存储队列的`SynchronousQueue`。

接着我们来了解一些其他的队列：

* PriorityBlockingQueue - 是一个支持优先级的阻塞队列，元素的获取顺序按优先级决定。
* DelayQueue - 它能够实现延迟获取元素，同样支持优先级。

我们先来看优先级阻塞队列：

```java
public static void main(String[] args) throws InterruptedException {
    PriorityBlockingQueue<Integer> queue =
            new PriorityBlockingQueue<>(10, Integer::compare);   //可以指定初始容量（可扩容）和优先级比较规则，这里我们使用升序
    queue.add(3);
    queue.add(1);
    queue.add(2);
    System.out.println(queue);    //注意保存顺序并不会按照优先级排列，所以可以看到结果并不是排序后的结果
    System.out.println(queue.poll());   //但是出队顺序一定是按照优先级进行的
    System.out.println(queue.poll());
    System.out.println(queue.poll());
}
```

我们的重点是DelayQueue，它能实现延时出队，也就是说当一个元素插入后，如果没有超过一定时间，那么是无法让此元素出队的。

```java
public class DelayQueue<E extends Delayed> extends AbstractQueue<E>
    implements BlockingQueue<E> {
```

可以看到此类只接受Delayed的实现类作为元素：

```java
public interface Delayed extends Comparable<Delayed> {  //注意这里继承了Comparable，它支持优先级

    //获取剩余等待时间，正数表示还需要进行等待，0或负数表示等待结束
    long getDelay(TimeUnit unit);
}
```

这里我们手动实现一个：

```java
private static class Test implements Delayed {
    private final long time;   //延迟时间，这里以毫秒为单位
    private final int priority;
    private final long startTime;
    private final String data;

    private Test(long time, int priority, String data) {
        this.time = TimeUnit.SECONDS.toMillis(time);   //秒转换为毫秒
        this.priority = priority;
        this.startTime = System.currentTimeMillis();   //这里我们以毫秒为单位
        this.data = data;
    }

    @Override
    public long getDelay(TimeUnit unit) {
        long leftTime = time - (System.currentTimeMillis() - startTime); //计算剩余时间 = 设定时间 - 已度过时间(= 当前时间 - 开始时间)
        return unit.convert(leftTime, TimeUnit.MILLISECONDS);   //注意进行单位转换，单位由队列指定（默认是纳秒单位）
    }

    @Override
    public int compareTo(Delayed o) {
        if(o instanceof Test)
            return priority - ((Test) o).priority;   //优先级越小越优先
        return 0;
    }

    @Override
    public String toString() {
        return data;
    }
}
```

接着我们在主方法中尝试使用：

```java
public static void main(String[] args) throws InterruptedException {
    DelayQueue<Test> queue = new DelayQueue<>();
    queue.add(new Test(1, 2, "2号"));   //1秒钟延时
    queue.add(new Test(3, 1, "1号"));   //1秒钟延时，优先级最高

    System.out.println(queue.take());    //注意出队顺序是依照优先级来的，即使一个元素已经可以出队了，依然需要等待优先级更高的元素到期
    System.out.println(queue.take());
}
```

我们来研究一下DelayQueue是如何实现的，首先来看`add()`方法：

```java
public boolean add(E e) {
    return offer(e);
}

public boolean offer(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        q.offer(e);   //注意这里是向内部维护的一个优先级队列添加元素，并不是DelayQueue本身存储元素
        if (q.peek() == e) {   //如果入队后队首就是当前元素，那么直接进行一次唤醒操作（因为有可能之前就有其他线程等着take了）
            leader = null;
            available.signal();
        }
        return true;
    } finally {
        lock.unlock();
    }
}

public void put(E e) {
    offer(e);
}
```

可以看到无论是哪种入队操作，都会加锁进行，属于常规操作。我们接着来看`take()`方法：

```java
public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;   //出队也要先加锁，基操
    lock.lockInterruptibly();
    try {
        for (;;) {    //无限循环，常规操作
            E first = q.peek();    //获取队首元素
            if (first == null)     //如果为空那肯定队列为空，先等着吧，等有元素进来
                available.await();
            else {
                long delay = first.getDelay(NANOSECONDS);    //获取延迟，这里传入的时间单位是纳秒
                if (delay <= 0)
                    return q.poll();     //如果获取到延迟时间已经小于0了，那说明ok，可以直接出队返回
                first = null;
                if (leader != null)   //这里用leader来减少不必要的等待时间，如果不是null那说明有线程在等待，为null说明没有线程等待
                    available.await();   //如果其他线程已经在等元素了，那么当前线程直接进永久等待状态
                else {
                    Thread thisThread = Thread.currentThread();
                    leader = thisThread;    //没有线程等待就将leader设定为当前线程
                    try {
                        available.awaitNanos(delay);     //获取到的延迟大于0，那么就需要等待延迟时间，再开始下一次获取
                    } finally {
                        if (leader == thisThread)
                            leader = null;
                    }
                }
            }
        }
    } finally {
        if (leader == null && q.peek() != null)
            available.signal();   //当前take结束之后唤醒一个其他永久等待状态下的线程
        lock.unlock();   //解锁，完事
    }
}
```

到此，有关并发容器的讲解就到这里。

下一章我们会继续讲解线程池以及并发工具类。

# 并发编程进阶

欢迎来到JUC学习的最后一章，王炸当然是放在最后了。

## 线程池

在我们的程序中，多多少少都会用到多线程技术，而我们以往都是使用Thread类来创建一个新的线程：

```java
public static void main(String[] args) {
    Thread t = new Thread(() -> System.out.println("Hello World!"));
    t.start();
}
```

利用多线程，我们的程序可以更加合理地使用CPU多核心资源，在同一时间完成更多的工作。但是，如果我们的程序频繁地创建线程，由于线程的创建和销毁也需要占用系统资源，因此这样会降低我们整个程序的性能，那么怎么做，才能更高效地使用多线程呢？

我们其实可以将已创建的线程复用，利用池化技术，就像数据库连接池一样，我们也可以创建很多个线程，然后反复地使用这些线程，而不对它们进行销毁。

虽然听起来这个想法比较新颖，但是实际上线程池早已利用到各个地方，比如我们的Tomcat服务器，要在同一时间接受和处理大量的请求，那么就必须要在短时间内创建大量的线程，结束后又进行销毁，这显然会导致很大的开销，因此这种情况下使用线程池显然是更好的解决方案。

由于线程池可以反复利用已有线程执行多线程操作，所以它一般是有容量限制的，当所有的线程都处于工作状态时，那么新的多线程请求会被阻塞，直到有一个线程空闲出来为止，实际上这里就会用到我们之前讲解的阻塞队列。

所以我们可以暂时得到下面一个样子：

![image-20220314203232154](https://tva1.sinaimg.cn/large/e6c9d24ely1h09oslzmw2j21o20i277f.jpg)

当然，JUC提供的线程池肯定没有这么简单，接下来就让我们深入进行了解。

### 线程池的使用

我们可以直接创建一个新的线程池对象，它已经提前帮助我们实现好了线程的调度机制，我们先来看它的构造方法：

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler) {
    if (corePoolSize < 0 ||
        maximumPoolSize <= 0 ||
        maximumPoolSize < corePoolSize ||
        keepAliveTime < 0)
        throw new IllegalArgumentException();
    if (workQueue == null || threadFactory == null || handler == null)
        throw new NullPointerException();
    this.acc = System.getSecurityManager() == null ?
            null :
            AccessController.getContext();
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.workQueue = workQueue;
    this.keepAliveTime = unit.toNanos(keepAliveTime);
    this.threadFactory = threadFactory;
    this.handler = handler;
}
```

参数稍微有一点多，这里我们依次进行讲解：

* corePoolSize：**核心线程池大小**，我们每向线程池提交一个多线程任务时，都会创建一个新的`核心线程`，无论是否存在其他空闲线程，直到到达核心线程池大小为止，之后会尝试复用线程资源。当然也可以在一开始就全部初始化好，调用` prestartAllCoreThreads()`即可。
* maximumPoolSize：**最大线程池大小**，当目前线程池中所有的线程都处于运行状态，并且这时来了新的多线程任务，如果当前线程池中线程数量小于最大线程池大小，那么会继续创建新的`非核心线程`运行，直到最大大小。
* keepAliveTime：**线程最大空闲时间**，当一个`非核心线程`空闲超过一定时间，会自动销毁。
* unit：**线程最大空闲时间的时间单位**
* workQueue：**线程等待队列**，当线程池中确实无法分配线程执行任务的时候，就会将任务暂时存到等待队列中，直到有线程资源可用为止，这里可以使用我们上一章学到的阻塞队列。
* threadFactory：**线程创建工厂**，我们可以干涉线程池中线程的创建过程，进行自定义。
* handler：**拒绝策略**，当等待队列和线程池都没有空间了，真的不能再来新的任务时，来了个新的多线程任务，那么只能拒绝了，这时就会根据当前设定的拒绝策略进行处理。

最为重要的就是线程池大小的限定了，这个也是很有学问的，合理地分配大小会使得线程池的执行效率事半功倍：

* 首先我们可以分析一下，线程池执行任务的特性，是CPU 密集型还是 IO 密集型
  * **CPU密集型：**主要是执行计算任务，响应时间很快，CPU一直在运行，这种任务CPU的利用率很高，那么线程数应该是根据 CPU 核心数来决定，CPU 核心数 = 最大同时执行线程数，以 i5-9400F 处理器为例，CPU 核心数为 6，那么最多就能同时执行 6 个线程。
  * **IO密集型：**主要是进行 IO 操作，因为执行 IO 操作的时间比较较长，比如从硬盘读取数据之类的，CPU就得等着IO操作，很容易出现空闲状态，导致 CPU 的利用率不高，这种情况下可以适当增加线程池的大小，让更多的线程可以一起进行IO操作，一般可以配置为CPU核心数的2倍。

这里我们手动创建一个新的线程池看看效果：

```java
public static void main(String[] args) throws InterruptedException {
    ThreadPoolExecutor executor =
            new ThreadPoolExecutor(2, 4,   //2个核心线程，最大线程数为4个
                    3, TimeUnit.SECONDS,        //最大空闲时间为3秒钟
                    new ArrayBlockingQueue<>(2));     //这里使用容量为2的ArrayBlockingQueue队列

    for (int i = 0; i < 6; i++) {   //开始6个任务
        int finalI = i;
        executor.execute(() -> {
            try {
                System.out.println(Thread.currentThread().getName()+" 开始执行！（"+ finalI);
                TimeUnit.SECONDS.sleep(1);
                System.out.println(Thread.currentThread().getName()+" 已结束！（"+finalI);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }

    TimeUnit.SECONDS.sleep(1);    //看看当前线程池中的线程数量
    System.out.println("线程池中线程数量："+executor.getPoolSize());
    TimeUnit.SECONDS.sleep(5);     //等到超过空闲时间
    System.out.println("线程池中线程数量："+executor.getPoolSize());

    executor.shutdownNow();    //使用完线程池记得关闭，不然程序不会结束，它会取消所有等待中的任务以及试图中断正在执行的任务，关闭后，无法再提交任务，一律拒绝
  	//executor.shutdown();     同样可以关闭，但是会执行完等待队列中的任务再关闭
}
```

这里我们创建了一个核心容量为2，最大容量为4，等待队列长度为2，空闲时间为3秒的线程池，现在我们向其中执行6个任务，每个任务都会进行1秒钟休眠，那么当线程池中4个线程都被占用时，还有两个线程就只能进入到等待队列中了，当线程池中4个线程完成后，等待队列中的两个任务才能开始执行。并且在等待5秒后，超过了线程池的最大空闲时间，`非核心线程`被回收了，所以线程池中只有2个线程存在。

那么要是等待队列设定为没有容量的SynchronousQueue呢，这个时候会发生什么？

```java
pool-1-thread-1 开始执行！（0
pool-1-thread-4 开始执行！（3
pool-1-thread-3 开始执行！（2
pool-1-thread-2 开始执行！（1
Exception in thread "main" java.util.concurrent.RejectedExecutionException: Task com.test.Main$$Lambda$1/1283928880@682a0b20 rejected from java.util.concurrent.ThreadPoolExecutor@3d075dc0[Running, pool size = 4, active threads = 4, queued tasks = 0, completed tasks = 0]
	at java.util.concurrent.ThreadPoolExecutor$AbortPolicy.rejectedExecution(ThreadPoolExecutor.java:2063)
	at java.util.concurrent.ThreadPoolExecutor.reject(ThreadPoolExecutor.java:830)
	at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1379)
	at com.test.Main.main(Main.java:15)
```

可以看到，前4个任务都可以正常执行，但是到第五个任务时，直接抛出了异常，这其实就是因为等待队列的容量为0，相当于没有容量，那么这个时候，就只能拒绝任务了，拒绝的操作会根据拒绝策略决定。

线程池的拒绝策略默认有以下几个：

* AbortPolicy(默认)：像上面一样，直接抛异常。
* CallerRunsPolicy：直接让提交任务的线程运行这个任务，比如在主线程向线程池提交了任务，那么就直接由主线程执行。
* DiscardOldestPolicy：丢弃队列中最近的一个任务，替换为当前任务。
* DiscardPolicy：什么也不用做。

这里我们进行一下测试：

```java
public static void main(String[] args) throws InterruptedException {
    ThreadPoolExecutor executor =
            new ThreadPoolExecutor(2, 4,
                    3, TimeUnit.SECONDS,
                    new SynchronousQueue<>(),
                    new ThreadPoolExecutor.CallerRunsPolicy());   //使用另一个构造方法，最后一个参数传入策略，比如这里我们使用了CallerRunsPolicy策略
```

CallerRunsPolicy策略是谁提交的谁自己执行，所以：

```java
pool-1-thread-1 开始执行！（0
pool-1-thread-2 开始执行！（1
main 开始执行！（4
pool-1-thread-4 开始执行！（3
pool-1-thread-3 开始执行！（2
pool-1-thread-3 已结束！（2
pool-1-thread-2 已结束！（1
pool-1-thread-1 已结束！（0
main 已结束！（4
pool-1-thread-4 已结束！（3
pool-1-thread-1 开始执行！（5
pool-1-thread-1 已结束！（5
线程池中线程数量：4
线程池中线程数量：2
```

可以看到，当队列塞不下时，直接在主线程运行任务，运行完之后再继续向下执行。

我们吧策略修改为DiscardOldestPolicy试试看：

```java
public static void main(String[] args) throws InterruptedException {
    ThreadPoolExecutor executor =
            new ThreadPoolExecutor(2, 4,
                    3, TimeUnit.SECONDS,
                    new ArrayBlockingQueue<>(1),    //这里设置为ArrayBlockingQueue，长度为1
                    new ThreadPoolExecutor.DiscardOldestPolicy());   
```

它会移除等待队列中的最近的一个任务，所以可以看到有一个任务实际上是被抛弃了的：

```
pool-1-thread-1 开始执行！（0
pool-1-thread-4 开始执行！（4
pool-1-thread-3 开始执行！（3
pool-1-thread-2 开始执行！（1
pool-1-thread-1 已结束！（0
pool-1-thread-4 已结束！（4
pool-1-thread-1 开始执行！（5
线程池中线程数量：4
pool-1-thread-3 已结束！（3
pool-1-thread-2 已结束！（1
pool-1-thread-1 已结束！（5
线程池中线程数量：2
```

比较有意思的是，如果选择没有容量的SynchronousQueue作为等待队列会爆栈：

```java
pool-1-thread-1 开始执行！（0
pool-1-thread-3 开始执行！（2
pool-1-thread-2 开始执行！（1
pool-1-thread-4 开始执行！（3
Exception in thread "main" java.lang.StackOverflowError
	at java.util.concurrent.SynchronousQueue.offer(SynchronousQueue.java:912)
	at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1371)	
	...
pool-1-thread-1 已结束！（0
pool-1-thread-2 已结束！（1
pool-1-thread-4 已结束！（3
pool-1-thread-3 已结束！（2
```

这是为什么呢？我们来看看这个拒绝策略的源码：

```java
public static class DiscardOldestPolicy implements RejectedExecutionHandler {
    public DiscardOldestPolicy() { }

    public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
        if (!e.isShutdown()) {
            e.getQueue().poll();   //会先执行一次出队操作，但是这对于SynchronousQueue来说毫无意义
            e.execute(r);     //这里会再次调用execute方法
        }
    }
}
```

可以看到，它会先对等待队列进行出队操作，但是由于SynchronousQueue压根没容量，所有这个操作毫无意义，然后就会递归执行`execute`方法，而进入之后，又发现没有容量不能插入，于是又重复上面的操作，这样就会无限的递归下去，最后就爆栈了。

当然，除了使用官方提供的4种策略之外，我们还可以使用自定义的策略：

```java
public static void main(String[] args) throws InterruptedException {
    ThreadPoolExecutor executor =
            new ThreadPoolExecutor(2, 4,
                    3, TimeUnit.SECONDS,
                    new SynchronousQueue<>(),
                    (r, executor1) -> {   //比如这里我们也来实现一个就在当前线程执行的策略
                        System.out.println("哎呀，线程池和等待队列都满了，你自己耗子尾汁吧");
                        r.run();   //直接运行
                    });
```

接着我们来看线程创建工厂，我们可以自己决定如何创建新的线程：

```java
public static void main(String[] args) throws InterruptedException {
    ThreadPoolExecutor executor =
            new ThreadPoolExecutor(2, 4,
                    3, TimeUnit.SECONDS,
                    new SynchronousQueue<>(),
                    new ThreadFactory() {
                        int counter = 0;
                        @Override
                        public Thread newThread(Runnable r) {
                            return new Thread(r, "我的自定义线程-"+counter++);
                        }
                    });

    for (int i = 0; i < 4; i++) {
        executor.execute(() -> System.out.println(Thread.currentThread().getName()+" 开始执行！"));
    }
}
```

这里传入的Runnable对象就是我们提交的任务，可以看到需要我们返回一个Thread对象，其实就是线程池创建线程的过程，而如何创建这个对象，以及它的一些属性，就都由我们来决定。

各位有没有想过这样一个情况，如果我们的任务在运行过程中出现异常了，那么是不是会导致线程池中的线程被销毁呢？

```java
public static void main(String[] args) throws InterruptedException {
    ThreadPoolExecutor executor = new ThreadPoolExecutor(1, 1,   //最大容量和核心容量锁定为1
            0, TimeUnit.MILLISECONDS, new LinkedBlockingDeque<>());
    executor.execute(() -> {
        System.out.println(Thread.currentThread().getName());
        throw new RuntimeException("我是异常！");
    });
    TimeUnit.SECONDS.sleep(1);
    executor.execute(() -> {
        System.out.println(Thread.currentThread().getName());
    });
}
```

可以看到，出现异常之后，再次提交新的任务，执行的线程是一个新的线程了。

除了我们自己创建线程池之外，官方也提供了很多的线程池定义，我们可以使用`Executors`工具类来快速创建线程池：

```java
public static void main(String[] args) throws InterruptedException {
    ExecutorService executor = Executors.newFixedThreadPool(2);   //直接创建一个固定容量的线程池
}
```

可以看到它的内部实现为：

```java
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>());
}
```

这里直接将最大线程和核心线程数量设定为一样的，并且等待时间为0，因为压根不需要，并且采用的是一个无界的LinkedBlockingQueue作为等待队列。

使用newSingleThreadExecutor来创建只有一个线程的线程池：

```java
public static void main(String[] args) throws InterruptedException {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    //创建一个只有一个线程的线程池
}
```

原理如下：

```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
```

可以看到这里并不是直接创建的一个ThreadPoolExecutor对象，而是套了一层FinalizableDelegatedExecutorService，那么这个又是什么东西呢？

```java
static class FinalizableDelegatedExecutorService
    extends DelegatedExecutorService {
    FinalizableDelegatedExecutorService(ExecutorService executor) {
        super(executor);
    }
    protected void finalize() {    //在GC时，会执行finalize方法，此方法中会关闭掉线程池，释放资源
        super.shutdown();
    }
}
```

```java
static class DelegatedExecutorService extends AbstractExecutorService {
    private final ExecutorService e;    //被委派对象
    DelegatedExecutorService(ExecutorService executor) { e = executor; }   //实际上所以的操作都是让委派对象执行的，有点像代理
    public void execute(Runnable command) { e.execute(command); }
    public void shutdown() { e.shutdown(); }
    public List<Runnable> shutdownNow() { return e.shutdownNow(); }
```

所以，下面两种写法的区别在于：

```java
public static void main(String[] args) throws InterruptedException {
    ExecutorService executor1 = Executors.newSingleThreadExecutor();
    ExecutorService executor2 = Executors.newFixedThreadPool(1);
}
```

前者实际上是被代理了，我们没办法直接修改前者的相关属性，显然使用前者创建只有一个线程的线程池更加专业和安全（可以防止属性被修改）一些。

最后我们来看`newCachedThreadPool`方法：

```java
public static void main(String[] args) throws InterruptedException {
    ExecutorService executor = Executors.newCachedThreadPool();
    //它是一个会根据需要无限制创建新线程的线程池
}
```

我们来看看它的实现：

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}
```

可以看到，核心线程数为0，那么也就是说所有的线程都是`非核心线程`，也就是说线程空闲时间超过1秒钟，一律销毁。但是它的最大容量是`Integer.MAX_VALUE`，也就是说，它可以无限制地增长下去，所以这玩意一定要慎用。

### 执行带返回值的任务

一个多线程任务不仅仅可以是void无返回值任务，比如我们现在需要执行一个任务，但是我们需要在任务执行之后得到一个结果，这个时候怎么办呢？

这里我们就可以使用到Future了，它可以返回任务的计算结果，我们可以通过它来获取任务的结果以及任务当前是否完成：

```java
public static void main(String[] args) throws InterruptedException, ExecutionException {
    ExecutorService executor = Executors.newSingleThreadExecutor();   //直接用Executors创建，方便就完事了
    Future<String> future = executor.submit(() -> "我是字符串!");     //使用submit提交任务，会返回一个Future对象，注意提交的对象可以是Runable也可以是Callable，这里使用的是Callable能够自定义返回值
    System.out.println(future.get());    //如果任务未完成，get会被阻塞，任务完成返回Callable执行结果返回值
    executor.shutdown();
}
```

当然结果也可以一开始就定义好，然后等待Runnable执行完之后再返回：

```java
public static void main(String[] args) throws InterruptedException, ExecutionException {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Future<String> future = executor.submit(() -> {
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }, "我是字符串！");
    System.out.println(future.get());
    executor.shutdown();
}
```

还可以通过传入FutureTask对象的方式：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    ExecutorService service = Executors.newSingleThreadExecutor();
    FutureTask<String> task = new FutureTask<>(() -> "我是字符串！");
    service.submit(task);
    System.out.println(task.get());
    executor.shutdown();
}
```

我们可以还通过Future对象获取当前任务的一些状态：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Future<String> future = executor.submit(() -> "都看到这里了，不赏UP主一个一键三连吗？");
    System.out.println(future.get());
    System.out.println("任务是否执行完成："+future.isDone());
    System.out.println("任务是否被取消："+future.isCancelled());
    executor.shutdown();
}
```

我们来试试看在任务执行途中取消任务：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Future<String> future = executor.submit(() -> {
        TimeUnit.SECONDS.sleep(10);
        return "这次一定！";
    });
    System.out.println(future.cancel(true));
    System.out.println(future.isCancelled());
    executor.shutdown();
}
```

### 执行定时任务

既然线程池怎么强大，那么线程池能不能执行定时任务呢？我们之前如果需要执行一个定时任务，那么肯定会用到Timer和TimerTask，但是它只会创建一个线程处理我们的定时任务，无法实现多线程调度，并且它无法处理异常情况一旦抛出未捕获异常那么会直接终止，显然我们需要一个更加强大的定时器。

JDK5之后，我们可以使用ScheduledThreadPoolExecutor来提交定时任务，它继承自ThreadPoolExecutor，并且所有的构造方法都必须要求最大线程池容量为Integer.MAX_VALUE，并且都是采用的DelayedWorkQueue作为等待队列。

```java
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
          new DelayedWorkQueue());
}

public ScheduledThreadPoolExecutor(int corePoolSize,
                                   ThreadFactory threadFactory) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
          new DelayedWorkQueue(), threadFactory);
}

public ScheduledThreadPoolExecutor(int corePoolSize,
                                   RejectedExecutionHandler handler) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
          new DelayedWorkQueue(), handler);
}

public ScheduledThreadPoolExecutor(int corePoolSize,
                                   ThreadFactory threadFactory,
                                   RejectedExecutionHandler handler) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
          new DelayedWorkQueue(), threadFactory, handler);
}
```

我们来测试一下它的方法，这个方法可以提交一个延时任务，只有到达指定时间之后才会开始：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
  	//直接设定核心线程数为1
    ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(1);
    //这里我们计划在3秒后执行
    executor.schedule(() -> System.out.println("HelloWorld!"), 3, TimeUnit.SECONDS);

    executor.shutdown();
}
```

我们也可以像之前一样，传入一个Callable对象，用于接收返回值：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(2);
  	//这里使用ScheduledFuture
    ScheduledFuture<String> future = executor.schedule(() -> "????", 3, TimeUnit.SECONDS);
    System.out.println("任务剩余等待时间："+future.getDelay(TimeUnit.MILLISECONDS) / 1000.0 + "s");
    System.out.println("任务执行结果："+future.get());
    executor.shutdown();
}
```

可以看到`schedule`方法返回了一个ScheduledFuture对象，和Future一样，它也支持返回值的获取、包括对任务的取消同时还支持获取剩余等待时间。

那么如果我们希望按照一定的频率不断执行任务呢？

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(2);
    executor.scheduleAtFixedRate(() -> System.out.println("Hello World!"),
            3, 1, TimeUnit.SECONDS);
  	//三秒钟延迟开始，之后每隔一秒钟执行一次
}
```

Executors也为我们预置了newScheduledThreadPool方法用于创建线程池：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    ScheduledExecutorService service = Executors.newScheduledThreadPool(1);
    service.schedule(() -> System.out.println("Hello World!"), 1, TimeUnit.SECONDS);
}
```

### 线程池实现原理

前面我们了解了线程池的使用，那么接着我们来看看它的详细实现过程，结构稍微有点复杂，坐稳，发车了。

这里需要首先介绍一下ctl变量：

```java
//这个变量比较关键，用到了原子AtomicInteger，用于同时保存线程池运行状态和线程数量（使用原子类是为了保证原子性）
//它是通过拆分32个bit位来保存数据的，前3位保存状态，后29位保存工作线程数量（那要是工作线程数量29位装不下不就GG？）
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));
private static final int COUNT_BITS = Integer.SIZE - 3;    //29位，线程数量位
private static final int CAPACITY   = (1 << COUNT_BITS) - 1;   //计算得出最大容量（1左移29位，最大容量为2的29次方-1）

// 所有的运行状态，注意都是只占用前3位，不会占用后29位
// 接收新任务，并等待执行队列中的任务
private static final int RUNNING    = -1 << COUNT_BITS;   //111 | 0000... (后29数量位，下同)
// 不接收新任务，但是依然等待执行队列中的任务
private static final int SHUTDOWN   =  0 << COUNT_BITS;   //000 | 数量位
// 不接收新任务，也不执行队列中的任务，并且还要中断正在执行中的任务
private static final int STOP       =  1 << COUNT_BITS;   //001 | 数量位
// 所有的任务都已结束，线程数量为0，即将完全关闭
private static final int TIDYING    =  2 << COUNT_BITS;   //010 | 数量位
// 完全关闭
private static final int TERMINATED =  3 << COUNT_BITS;   //011 | 数量位

// 封装和解析ctl变量的一些方法
private static int runStateOf(int c)     { return c & ~CAPACITY; }   //对CAPACITY取反就是后29位全部为0，前三位全部为1，接着与c进行与运算，这样就可以只得到前三位的结果了，所以这里是取运行状态
private static int workerCountOf(int c)  { return c & CAPACITY; }
//同上，这里是为了得到后29位的结果，所以这里是取线程数量
private static int ctlOf(int rs, int wc) { return rs | wc; }   
// 比如上面的RUNNING, 0，进行与运算之后：
// 111 | 0000000000000000000000000
```

![image-20220315104707467](https://tva1.sinaimg.cn/large/e6c9d24egy1h0adhrjujsj21o605gwes.jpg)

我们先从最简单的入手，看看在调用`execute`方法之后，线程池会做些什么：

```java
//这个就是我们指定的阻塞队列
private final BlockingQueue<Runnable> workQueue;

//再次提醒，这里没加锁！！该有什么意识不用我说了吧，所以说ctl才会使用原子类。
public void execute(Runnable command) {
    if (command == null)
        throw new NullPointerException();     //如果任务为null，那执行个寂寞，所以说直接空指针
    int c = ctl.get();      //获取ctl的值，一会要读取信息的
    if (workerCountOf(c) < corePoolSize) {   //判断工作线程数量是否小于核心线程数
        if (addWorker(command, true))    //如果是，那不管三七二十一，直接加新的线程执行，然后返回即可
            return;
        c = ctl.get();    //如果线程添加失败（有可能其他线程也在对线程池进行操作），那就更新一下c的值
    }
    if (isRunning(c) && workQueue.offer(command)) {   //继续判断，如果当前线程池是运行状态，那就尝试向阻塞队列中添加一个新的等待任务
        int recheck = ctl.get();   //再次获取ctl的值
        if (! isRunning(recheck) && remove(command))   //这里是再次确认当前线程池是否关闭，如果添加等待任务后线程池关闭了，那就把刚刚加进去任务的又拿出来
            reject(command);   //然后直接拒绝当前任务的提交（会根据我们的拒绝策略决定如何进行拒绝操作）
        else if (workerCountOf(recheck) == 0)   //如果这个时候线程池依然在运行状态，那么就检查一下当前工作线程数是否为0，如果是那就直接添加新线程执行
            addWorker(null, false);   //添加一个新的非核心线程
      	//其他情况就啥也不用做了
    }
    else if (!addWorker(command, false))   //这种情况要么就是线程池没有运行，要么就是队列满了，这里再尝试添加一个非核心线程碰碰运气
        reject(command);   //要是实在不行就拒绝
}
```

是不是感觉思路还挺清晰的，我们接着来看`addWorker`是怎么创建和执行任务的，又是一大堆代码：

```java
private boolean addWorker(Runnable firstTask, boolean core) {
  	//这里给最外层循环打了个标签，方便一会的跳转操作
    retry:
    for (;;) {    //无限循环，老套路了，注意这里全程没加锁
        int c = ctl.get();     //获取ctl值
        int rs = runStateOf(c);    //解析当前的运行状态

        // Check if queue empty only if necessary.
        if (rs >= SHUTDOWN &&   //判断线程池是否不是处于运行状态
            ! (rs == SHUTDOWN &&   //如果不是运行状态，判断线程是SHUTDOWN状态并、任务不为null、等待队列不为空，只要有其中一者不满足，直接返回false，添加失败
               firstTask == null &&   
               ! workQueue.isEmpty()))
            return false;

        for (;;) {   //内层又一轮无限循环，这个循环是为了将线程计数增加，然后才可以真正地添加一个新的线程
            int wc = workerCountOf(c);    //解析当前的工作线程数量
            if (wc >= CAPACITY ||
                wc >= (core ? corePoolSize : maximumPoolSize))    //判断一下还装得下不，如果装得下，看看是核心线程还是非核心线程，如果是核心线程，不能大于核心线程数的限制，如果是非核心线程，不能大于最大线程数限制
                return false;
            if (compareAndIncrementWorkerCount(c))    //CAS自增线程计数，如果增加成功，任务完成，直接跳出继续
                break retry;    //注意这里要直接跳出最外层循环，所以用到了标签（类似于goto语句）
            c = ctl.get();  // 如果CAS失败，更新一下c的值
            if (runStateOf(c) != rs)    //如果CAS失败的原因是因为线程池状态和一开始的不一样了，那么就重新从外层循环再来一次
                continue retry;    //注意这里要直接从最外层循环继续，所以用到了标签（类似于goto语句）
            // 如果是其他原因导致的CAS失败，那只可能是其他线程同时在自增，所以重新再来一次内层循环
        }
    }

  	//好了，线程计数自增也完了，接着就是添加新的工作线程了
    boolean workerStarted = false;   //工作线程是否已启动
    boolean workerAdded = false;    //工作线程是否已添加
    Worker w = null;     //暂时理解为工作线程，别急，我们之后会解读Worker类
    try {
        w = new Worker(firstTask);     //创建新的工作线程，传入我们提交的任务
        final Thread t = w.thread;    //拿到工作线程中封装的Thread对象
        if (t != null) {      //如果线程不为null，那就可以安排干活了
            final ReentrantLock mainLock = this.mainLock;      //又是ReentrantLock加锁环节，这里开始就是只有一个线程能进入了
            mainLock.lock();
            try {
                // Recheck while holding lock.
                // Back out on ThreadFactory failure or if
                // shut down before lock acquired.
                int rs = runStateOf(ctl.get());    //获取当前线程的运行状态

                if (rs < SHUTDOWN ||
                    (rs == SHUTDOWN && firstTask == null)) {    //只有当前线程池是正在运行状态，或是SHUTDOWN状态且firstTask为空，那么就继续
                    if (t.isAlive()) // 检查一下线程是否正在运行状态
                        throw new IllegalThreadStateException();   //如果是那肯定是不能运行我们的任务的
                    workers.add(w);    //直接将新创建的Work丢进 workers 集合中
                    int s = workers.size();   //看看当前workers的大小
                    if (s > largestPoolSize)   //这里是记录线程池运行以来，历史上的最多线程数
                        largestPoolSize = s;
                    workerAdded = true;   //工作线程已添加
                }
            } finally {
                mainLock.unlock();   //解锁
            }
            if (workerAdded) {
                t.start();   //启动线程
                workerStarted = true;  //工作线程已启动
            }
        }
    } finally {
        if (! workerStarted)    //如果线程在上面的启动过程中失败了
            addWorkerFailed(w);    //将w移出workers并将计数器-1，最后如果线程池是终止状态，会尝试加速终止线程池
    }
    return workerStarted;   //返回是否成功
}
```

接着我们来看Worker类是如何实现的，它继承自AbstractQueuedSynchronizer，时隔两章，居然再次遇到AQS，那也就是说，它本身就是一把锁：

```java
private final class Worker
    extends AbstractQueuedSynchronizer
    implements Runnable {
    //用来干活的线程
    final Thread thread;
    //要执行的第一个任务，构造时就确定了的
    Runnable firstTask;
    //干活数量计数器，也就是这个线程完成了多少个任务
    volatile long completedTasks;

    Worker(Runnable firstTask) {
        setState(-1); // 执行Task之前不让中断，将AQS的state设定为-1
        this.firstTask = firstTask;
        this.thread = getThreadFactory().newThread(this);   //通过预定义或是我们自定义的线程工厂创建线程
    }
  
    public void run() {
        runWorker(this);   //真正开始干活，包括当前活干完了又要等新的活来，就从这里开始，一会详细介绍
    }

   	//0就是没加锁，1就是已加锁
    protected boolean isHeldExclusively() {
        return getState() != 0;
    }

    ...
}
```

最后我们来看看一个Worker到底是怎么在进行任务的：

```java
final void runWorker(Worker w) {
    Thread wt = Thread.currentThread();   //获取当前线程
    Runnable task = w.firstTask;    //取出要执行的任务
    w.firstTask = null;   //然后把Worker中的任务设定为null
    w.unlock(); // 因为一开始为-1，这里是通过unlock操作将其修改回0，只有state大于等于0才能响应中断
    boolean completedAbruptly = true;
    try {
      	//只要任务不为null，或是任务为空但是可以从等待队列中取出任务不为空，那么就开始执行这个任务，注意这里是无限循环，也就是说如果当前没有任务了，那么会在getTask方法中卡住，因为要从阻塞队列中等着取任务
        while (task != null || (task = getTask()) != null) {
            w.lock();    //对当前Worker加锁，这里其实并不是防其他线程，而是在shutdown时保护此任务的运行
            
          //由于线程池在STOP状态及以上会禁止新线程加入并且中断正在进行的线程
            if ((runStateAtLeast(ctl.get(), STOP) ||   //只要线程池是STOP及以上的状态，那肯定是不能开始新任务的
                 (Thread.interrupted() &&    					 //线程是否已经被打上中断标记并且线程一定是STOP及以上
                  runStateAtLeast(ctl.get(), STOP))) &&
                !wt.isInterrupted())   //再次确保线程被没有打上中断标记
                wt.interrupt();     //打中断标记
            try {
                beforeExecute(wt, task);  //开始之前的准备工作，这里暂时没有实现
                Throwable thrown = null;
                try {
                    task.run();    //OK，开始执行任务
                } catch (RuntimeException x) {
                    thrown = x; throw x;
                } catch (Error x) {
                    thrown = x; throw x;
                } catch (Throwable x) {
                    thrown = x; throw new Error(x);
                } finally {
                    afterExecute(task, thrown);    //执行之后的工作，也没实现
                }
            } finally {
                task = null;    //任务已完成，不需要了
                w.completedTasks++;   //任务完成数++
                w.unlock();    //解锁
            }
        }
        completedAbruptly = false;
    } finally {
      	//如果能走到这一步，那说明上面的循环肯定是跳出了，也就是说这个Worker可以丢弃了
      	//所以这里会直接将 Worker 从 workers 里删除掉
        processWorkerExit(w, completedAbruptly);
    }
}
```

那么它是怎么从阻塞队列里面获取任务的呢：

```java
private Runnable getTask() {
    boolean timedOut = false; // Did the last poll() time out?

    for (;;) {    //无限循环获取
        int c = ctl.get();   //获取ctl 
        int rs = runStateOf(c);      //解析线程池运行状态

        // Check if queue empty only if necessary.
        if (rs >= SHUTDOWN && (rs >= STOP || workQueue.isEmpty())) {      //判断是不是没有必要再执行等待队列中的任务了，也就是处于关闭线程池的状态了
            decrementWorkerCount();     //直接减少一个工作线程数量
            return null;    //返回null，这样上面的runWorker就直接结束了，下同
        }

        int wc = workerCountOf(c);   //如果线程池运行正常，那就获取当前的工作线程数量

        // Are workers subject to culling?
        boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;   //如果线程数大于核心线程数或是允许核心线程等待超时，那么就标记为可超时的

      	//超时或maximumPoolSize在运行期间被修改了，并且线程数大于1或等待队列为空，那也是不能获取到任务的
        if ((wc > maximumPoolSize || (timed && timedOut))
            && (wc > 1 || workQueue.isEmpty())) {
            if (compareAndDecrementWorkerCount(c))   //如果CAS减少工作线程成功
                return null;    //返回null
            continue;   //否则开下一轮循环
        }

        try {
            Runnable r = timed ?
                workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :   //如果可超时，那么最多等到超时时间
                workQueue.take();    //如果不可超时，那就一直等着拿任务
            if (r != null)    //如果成功拿到任务，ok，返回
                return r;
            timedOut = true;   //否则就是超时了，下一轮循环将直接返回null
        } catch (InterruptedException retry) {
            timedOut = false;
        }
      	//开下一轮循环吧
    }
}
```

虽然我们的源码解读越来越深，但是只要各位的思路不断，依然是可以继续往下看的。到此，有关`execute()`方法的源码解读，就先到这里。

接着我们来看当线程池关闭时会做什么事情：

```java
//普通的shutdown会继续将等待队列中的线程执行完成后再关闭线程池
public void shutdown() {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
      	//判断是否有权限终止
        checkShutdownAccess();
      	//CAS将线程池运行状态改为SHUTDOWN状态，还算比较温柔，详细过程看下面
        advanceRunState(SHUTDOWN);
       	//让闲着的线程（比如正在等新的任务）中断，但是并不会影响正在运行的线程，详细过程请看下面
        interruptIdleWorkers();
        onShutdown(); //给ScheduledThreadPoolExecutor提供的钩子方法，就是等ScheduledThreadPoolExecutor去实现的，当前类没有实现
    } finally {
        mainLock.unlock();
    }
    tryTerminate();   //最后尝试终止线程池
}
```

```java
private void advanceRunState(int targetState) {
    for (;;) {
        int c = ctl.get();    //获取ctl
        if (runStateAtLeast(c, targetState) ||    //是否大于等于指定的状态
            ctl.compareAndSet(c, ctlOf(targetState, workerCountOf(c))))   //CAS设置ctl的值
            break;   //任意一个条件OK就可以结束了
    }
}
```

```java
private void interruptIdleWorkers(boolean onlyOne) {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        for (Worker w : workers) {
            Thread t = w.thread;    //拿到Worker中的线程
            if (!t.isInterrupted() && w.tryLock()) {   //先判断一下线程是不是没有被中断然后尝试加锁，但是通过前面的runWorker()源代码我们得知，开始之后是让Worker加了锁的，所以如果线程还在执行任务，那么这里肯定会false
                try {
                    t.interrupt();    //如果走到这里，那么说明线程肯定是一个闲着的线程，直接给中断吧
                } catch (SecurityException ignore) {
                } finally {
                    w.unlock();    //解锁
                }
            }
            if (onlyOne)   //如果只针对一个Worker，那么就结束循环
                break;
        }
    } finally {
        mainLock.unlock();
    }
}
```

而`shutdownNow()`方法也差不多，但是这里会更直接一些：

```java
//shutdownNow开始后，不仅不允许新的任务到来，也不会再执行等待队列的线程，而且会终止正在执行的线程
public List<Runnable> shutdownNow() {
    List<Runnable> tasks;
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        checkShutdownAccess();
      	//这里就是直接设定为STOP状态了，不再像shutdown那么温柔
        advanceRunState(STOP);
      	//直接中断所有工作线程，详细过程看下面
        interruptWorkers();
      	//取出仍处于阻塞队列中的线程
        tasks = drainQueue();
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
    return tasks;   //最后返回还没开始的任务
}
```

```java
private void interruptWorkers() {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        for (Worker w : workers)   //遍历所有Worker
            w.interruptIfStarted();   //无差别对待，一律加中断标记
    } finally {
        mainLock.unlock();
    }
}
```

最后的最后，我们再来看看`tryTerminate()`是怎么完完全全终止掉一个线程池的：

```java
final void tryTerminate() {
    for (;;) {     //无限循环
        int c = ctl.get();    //上来先获取一下ctl值
      	//只要是正在运行 或是 线程池基本上关闭了 或是 处于SHUTDOWN状态且工作队列不为空，那么这时还不能关闭线程池，返回
        if (isRunning(c) ||
            runStateAtLeast(c, TIDYING) ||
            (runStateOf(c) == SHUTDOWN && ! workQueue.isEmpty()))
            return;
      
      	//走到这里，要么处于SHUTDOWN状态且等待队列为空或是STOP状态
        if (workerCountOf(c) != 0) { // 如果工作线程数不是0，这里也会中断空闲状态下的线程
            interruptIdleWorkers(ONLY_ONE);   //这里最多只中断一个空闲线程，然后返回
            return;
        }

      	//走到这里，工作线程也为空了，可以终止线程池了
        final ReentrantLock mainLock = this.mainLock;
        mainLock.lock();
        try {
            if (ctl.compareAndSet(c, ctlOf(TIDYING, 0))) {   //先CAS将状态设定为TIDYING表示基本终止，正在做最后的操作
                try {
                    terminated();   //终止，暂时没有实现
                } finally {
                    ctl.set(ctlOf(TERMINATED, 0));   //最后将状态设定为TERMINATED，线程池结束了它年轻的生命
                    termination.signalAll();    //如果有线程调用了awaitTermination方法，会等待当前线程池终止，到这里差不多就可以唤醒了
                }
                return;   //结束
            }
          	//注意如果CAS失败会直接进下一轮循环重新判断
        } finally {
            mainLock.unlock();
        }
        // else retry on failed CAS
    }
}
```

OK，有关线程池的实现原理，我们就暂时先介绍到这里，关于更高级的定时任务线程池，这里就不做讲解了。

***

## 并发工具类

### 计数器锁 CountDownLatch

多任务同步神器。它允许一个或多个线程，等待其他线程完成工作，比如现在我们有这样的一个需求：

* 有20个计算任务，我们需要先将这些任务的结果全部计算出来，每个任务的执行时间未知
* 当所有任务结束之后，立即整合统计最终结果

要实现这个需求，那么有一个很麻烦的地方，我们不知道任务到底什么时候执行完毕，那么可否将最终统计延迟一定时间进行呢？但是最终统计无论延迟多久进行，要么不能保证所有任务都完成，要么可能所有任务都完成了而这里还在等。

所以说，我们需要一个能够实现子任务同步的工具。

```java
public static void main(String[] args) throws InterruptedException {
    CountDownLatch latch = new CountDownLatch(20);  //创建一个初始值为10的计数器锁
    for (int i = 0; i < 20; i++) {
        int finalI = i;
        new Thread(() -> {
            try {
                Thread.sleep((long) (2000 * new Random().nextDouble()));
                System.out.println("子任务"+ finalI +"执行完成！");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();   //每执行一次计数器都会-1
        }).start();
    }

    //开始等待所有的线程完成，当计数器为0时，恢复运行
    latch.await();   //这个操作可以同时被多个线程执行，一起等待，这里只演示了一个
    System.out.println("所有子任务都完成！任务完成！！！");
  
  	//注意这个计数器只能使用一次，用完只能重新创一个，没有重置的说法
}
```

我们在调用`await()`方法之后，实际上就是一个等待计数器衰减为0的过程，而进行自减操作则由各个子线程来完成，当子线程完成工作后，那么就将计数器-1，所有的子线程完成之后，计数器为0，结束等待。

那么它是如何实现的呢？实现 原理非常简单：

```java
public class CountDownLatch {
   	//同样是通过内部类实现AbstractQueuedSynchronizer
    private static final class Sync extends AbstractQueuedSynchronizer {
        
        Sync(int count) {   //这里直接使用AQS的state作为计数器（可见state能被玩出各种花样），也就是说一开始就加了count把共享锁，当线程调用countdown时，就解一层锁
            setState(count);
        }

        int getCount() {
            return getState();
        }

      	//采用共享锁机制，因为可以被不同的线程countdown，所以实现的tryAcquireShared和tryReleaseShared
      	//获取这把共享锁其实就是去等待state被其他线程减到0
        protected int tryAcquireShared(int acquires) {
            return (getState() == 0) ? 1 : -1;
        }

        protected boolean tryReleaseShared(int releases) {
            // 每次执行都会将state值-1，直到为0
            for (;;) {
                int c = getState();
                if (c == 0)
                    return false;   //如果已经是0了，那就false
                int nextc = c-1;
                if (compareAndSetState(c, nextc))   //CAS设置state值，失败直接下一轮循环
                    return nextc == 0;    //返回c-1之后，是不是0，如果是那就true，否则false，也就是说只有刚好减到0的时候才会返回true
            }
        }
    }

    private final Sync sync;

    public CountDownLatch(int count) {
        if (count < 0) throw new IllegalArgumentException("count < 0");  //count那肯定不能小于0啊
        this.sync = new Sync(count);   //构造Sync对象，将count作为state初始值
    }

   	//通过acquireSharedInterruptibly方法获取共享锁，但是如果state不为0，那么会被持续阻塞，详细原理下面讲
    public void await() throws InterruptedException {
        sync.acquireSharedInterruptibly(1);
    }

    //同上，但是会超时
    public boolean await(long timeout, TimeUnit unit)
        throws InterruptedException {
        return sync.tryAcquireSharedNanos(1, unit.toNanos(timeout));
    }

   	//countDown其实就是解锁一次
    public void countDown() {
        sync.releaseShared(1);
    }

    //获取当前的计数，也就是AQS中state的值
    public long getCount() {
        return sync.getCount();
    }

    //这个就不说了
    public String toString() {
        return super.toString() + "[Count = " + sync.getCount() + "]";
    }
}
```

在深入讲解之前，我们先大致了解一下CountDownLatch的基本实现思路：

* 利用共享锁实现
* 在一开始的时候就是已经上了count层锁的状态，也就是`state = count`
* `await()`就是加共享锁，但是必须`state`为`0`才能加锁成功，否则按照AQS的机制，会进入等待队列阻塞，加锁成功后结束阻塞
* `countDown()`就是解`1`层锁，也就是靠这个方法一点一点把`state`的值减到`0`

由于我们前面只对独占锁进行了讲解，没有对共享锁进行讲解，这里还是稍微提一下它：

```java
public final void acquireShared(int arg) {
    if (tryAcquireShared(arg) < 0)   //上来就调用tryAcquireShared尝试以共享模式获取锁，小于0则失败，上面判断的是state==0返回1，否则-1，也就是说如果计数器不为0，那么这里会判断成功
        doAcquireShared(arg);   //计数器不为0的时候，按照它的机制，那么会阻塞，所以我们来看看doAcquireShared中是怎么进行阻塞的
}
```

```java
private void doAcquireShared(int arg) {
    final Node node = addWaiter(Node.SHARED);   //向等待队列中添加一个新的共享模式结点
    boolean failed = true;
    try {
        boolean interrupted = false;
        for (;;) {    //无限循环
            final Node p = node.predecessor();   //获取当前节点的前驱的结点
            if (p == head) {    //如果p就是头结点，那么说明当前结点就是第一个等待节点
                int r = tryAcquireShared(arg);    //会再次尝试获取共享锁
                if (r >= 0) {      //要是获取成功
                    setHeadAndPropagate(node, r);   //那么就将当前节点设定为新的头结点，并且会继续唤醒后继节点
                    p.next = null; // help GC
                    if (interrupted)
                        selfInterrupt();
                    failed = false;
                    return;
                }
            }
            if (shouldParkAfterFailedAcquire(p, node) &&   //和独占模式下一样的操作，这里不多说了
                parkAndCheckInterrupt())
                interrupted = true;
        }
    } finally {
        if (failed)
            cancelAcquire(node);   //如果最后都还是没获取到，那么就cancel
    }
}
//其实感觉大体上和独占模式的获取有点像，但是它多了个传播机制，会继续唤醒后续节点
```

```java
private void setHeadAndPropagate(Node node, int propagate) {
    Node h = head; // 取出头结点并将当前节点设定为新的头结点
    setHead(node);
    
  	//因为一个线程成功获取到共享锁之后，有可能剩下的等待中的节点也有机会拿到共享锁
    if (propagate > 0 || h == null || h.waitStatus < 0 ||
        (h = head) == null || h.waitStatus < 0) {   //如果propagate大于0（表示共享锁还能继续获取）或是h.waitStatus < 0，这是由于在其他线程释放共享锁时，doReleaseShared会将状态设定为PROPAGATE表示可以传播唤醒，后面会讲
        Node s = node.next;
        if (s == null || s.isShared())
            doReleaseShared();   //继续唤醒下一个等待节点
    }
}
```

我们接着来看，它的countdown过程：

```java
public final boolean releaseShared(int arg) {
    if (tryReleaseShared(arg)) {   //直接尝试释放锁，如果成功返回true（在CountDownLatch中只有state减到0的那一次，会返回true）
        doReleaseShared();    //这里也会调用doReleaseShared继续唤醒后面的结点
        return true;
    }
    return false;   //其他情况false
  									//不过这里countdown并没有用到这些返回值
}
```

```java
private void doReleaseShared() {
    for (;;) {   //无限循环
        Node h = head;    //获取头结点
        if (h != null && h != tail) {    //如果头结点不为空且头结点不是尾结点，那么说明等待队列中存在节点
            int ws = h.waitStatus;    //取一下头结点的等待状态
            if (ws == Node.SIGNAL) {    //如果是SIGNAL，那么就CAS将头结点的状态设定为初始值
                if (!compareAndSetWaitStatus(h, Node.SIGNAL, 0))
                    continue;            //失败就开下一轮循环重来
                unparkSuccessor(h);    //和独占模式一样，当锁被释放，都会唤醒头结点的后继节点，doAcquireShared循环继续，如果成功，那么根据setHeadAndPropagate，又会继续调用当前方法，不断地传播下去，让后面的线程一个一个地获取到共享锁，直到不能再继续获取为止
            }
            else if (ws == 0 &&
                     !compareAndSetWaitStatus(h, 0, Node.PROPAGATE))   //如果等待状态是默认值0，那么说明后继节点已经被唤醒，直接将状态设定为PROPAGATE，它代表在后续获取资源的时候，够向后面传播
                continue;                //失败就开下一轮循环重来
        }
        if (h == head)                   // 如果头结点发生了变化，不会break，而是继续循环，否则直接break退出
            break;
    }
}
```

可能看完之后还是有点乱，我们再来理一下：

* 共享锁是线程共享的，同一时刻能有多个线程拥有共享锁。
* 如果一个线程刚获取了共享锁，那么在其之后等待的线程也很有可能能够获取到锁，所以得传播下去继续尝试唤醒后面的结点，不像独占锁，独占的压根不需要考虑这些。
* 如果一个线程刚释放了锁，不管是独占锁还是共享锁，都需要唤醒后续等待结点的线程。

回到CountDownLatch，再结合整个AQS共享锁的实现机制，进行一次完整的推导，看明白还是比较简单的。

### 循环屏障 CyclicBarrier

好比一场游戏，我们必须等待房间内人数足够之后才能开始，并且游戏开始之后玩家需要同时进入游戏以保证公平性。

假如现在游戏房间内一共5人，但是游戏开始需要10人，所以我们必须等待剩下5人到来之后才能开始游戏，并且保证游戏开始时所有玩家都是同时进入，那么怎么实现这个功能呢？我们可以使用CyclicBarrier，翻译过来就是循环屏障，那么这个屏障正式为了解决这个问题而出现的。

```java
public static void main(String[] args) {
    CyclicBarrier barrier = new CyclicBarrier(10,   //创建一个初始值为10的循环屏障
                () -> System.out.println("飞机马上就要起飞了，各位特种兵请准备！"));   //人等够之后执行的任务
    for (int i = 0; i < 10; i++) {
        int finalI = i;
        new Thread(() -> {
            try {
                Thread.sleep((long) (2000 * new Random().nextDouble()));
                System.out.println("玩家 "+ finalI +" 进入房间进行等待... ("+barrier.getNumberWaiting()+"/10)");

                barrier.await();    //调用await方法进行等待，直到等待的线程足够多为止

                //开始游戏，所有玩家一起进入游戏
                System.out.println("玩家 "+ finalI +" 进入游戏！");
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
```

可以看到，循环屏障会不断阻挡线程，直到被阻挡的线程足够多时，才能一起冲破屏障，并且在冲破屏障时，我们也可以做一些其他的任务。这和人多力量大的道理是差不多的，当人足够多时方能冲破阻碍，到达美好的明天。当然，屏障由于是可循环的，所以它在被冲破后，会重新开始计数，继续阻挡后续的线程：

```java
public static void main(String[] args) {
    CyclicBarrier barrier = new CyclicBarrier(5);  //创建一个初始值为5的循环屏障

    for (int i = 0; i < 10; i++) {   //创建5个线程
        int finalI = i;
        new Thread(() -> {
            try {
                Thread.sleep((long) (2000 * new Random().nextDouble()));
                System.out.println("玩家 "+ finalI +" 进入房间进行等待... ("+barrier.getNumberWaiting()+"/5)");

                barrier.await();    //调用await方法进行等待，直到等待线程到达5才会一起继续执行

                //人数到齐之后，可以开始游戏了
                System.out.println("玩家 "+ finalI +" 进入游戏！");
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
```

可以看到，通过使用循环屏障，我们可以对线程进行一波一波地放行，每一波都放行5个线程，当然除了自动重置之外，我们也可以调用`reset()`方法来手动进行重置操作，同样会重新计数：

```java
public static void main(String[] args) throws InterruptedException {
    CyclicBarrier barrier = new CyclicBarrier(5);  //创建一个初始值为10的计数器锁

    for (int i = 0; i < 3; i++)
        new Thread(() -> {
            try {
                barrier.await();
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }
        }).start();

    Thread.sleep(500);   //等一下上面的线程开始运行
    System.out.println("当前屏障前的等待线程数："+barrier.getNumberWaiting());

    barrier.reset();
    System.out.println("重置后屏障前的等待线程数："+barrier.getNumberWaiting());
}
```

可以看到，在调用`reset()`之后，处于等待状态下的线程，全部被中断并且抛出BrokenBarrierException异常，循环屏障等待线程数归零。那么要是处于等待状态下的线程被中断了呢？屏障的线程等待数量会不会自动减少？

```java
public static void main(String[] args) throws InterruptedException {
    CyclicBarrier barrier = new CyclicBarrier(10);
    Runnable r = () -> {
        try {
            barrier.await();
        } catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }
    };
    Thread t = new Thread(r);
    t.start();
    t.interrupt();
    new Thread(r).start();
}
```

可以看到，当`await()`状态下的线程被中断，那么屏障会直接变成损坏状态，一旦屏障损坏，那么这一轮就无法再做任何等待操作了。也就是说，本来大家计划一起合力冲破屏障，结果有一个人摆烂中途退出了，那么所有人的努力都前功尽弃，这一轮的屏障也不可能再被冲破了（所以CyclicBarrier告诉我们，不要做那个害群之马，要相信你的团队，不然没有好果汁吃），只能进行`reset()`重置操作进行重置才能恢复正常。

乍一看，怎么感觉和之前讲的CountDownLatch有点像，好了，这里就得区分一下了，千万别搞混：

* CountDownLatch：
  1. 它只能使用一次，是一个一次性的工具
  2. 它是一个或多个线程用于等待其他线程完成的同步工具
* CyclicBarrier
  1. 它可以反复使用，允许自动或手动重置计数
  2. 它是让一定数量的线程在同一时间开始运行的同步工具

我们接着来看循环屏障的实现细节：

```java
public class CyclicBarrier {
    //内部类，存放broken标记，表示屏障是否损坏，损坏的屏障是无法正常工作的
    private static class Generation {
        boolean broken = false;
    }

    /** 内部维护一个可重入锁 */
    private final ReentrantLock lock = new ReentrantLock();
    /** 再维护一个Condition */
    private final Condition trip = lock.newCondition();
    /** 这个就是屏障的最大阻挡容量，就是构造方法传入的初始值 */
    private final int parties;
    /* 在屏障破裂时做的事情 */
    private final Runnable barrierCommand;
    /** 当前这一轮的Generation对象，每一轮都有一个新的，用于保存broken标记 */
    private Generation generation = new Generation();

    //默认为最大阻挡容量，每来一个线程-1，和CountDownLatch挺像，当屏障破裂或是被重置时，都会将其重置为最大阻挡容量
    private int count;

  	//构造方法
  	public CyclicBarrier(int parties, Runnable barrierAction) {
        if (parties <= 0) throw new IllegalArgumentException();
        this.parties = parties;
        this.count = parties;
        this.barrierCommand = barrierAction;
    }
  
    public CyclicBarrier(int parties) {
        this(parties, null);
    }
  
    //开启下一轮屏障，一般屏障被冲破之后，就自动重置了，进入到下一轮
    private void nextGeneration() {
        // 唤醒所有等待状态的线程
        trip.signalAll();
        // 重置count的值
        count = parties;
      	//创建新的Generation对象
        generation = new Generation();
    }

    //破坏当前屏障，变为损坏状态，之后就不能再使用了，除非重置
    private void breakBarrier() {
        generation.broken = true;
        count = parties;
        trip.signalAll();
    }
  
  	//开始等待
  	public int await() throws InterruptedException, BrokenBarrierException {
        try {
            return dowait(false, 0L);
        } catch (TimeoutException toe) {
            throw new Error(toe); // 因为这里没有使用定时机制，不可能发生异常，如果发生怕是出了错误
        }
    }
    
  	//可超时的等待
    public int await(long timeout, TimeUnit unit)
        throws InterruptedException,
               BrokenBarrierException,
               TimeoutException {
        return dowait(true, unit.toNanos(timeout));
    }

    //这里就是真正的等待流程了，让我们细细道来
    private int dowait(boolean timed, long nanos)
        throws InterruptedException, BrokenBarrierException,
               TimeoutException {
        final ReentrantLock lock = this.lock;
        lock.lock();   //加锁，注意，因为多个线程都会调用await方法，因此只有一个线程能进，其他都被卡着了
        try {
            final Generation g = generation;   //获取当前这一轮屏障的Generation对象

            if (g.broken)
                throw new BrokenBarrierException();   //如果这一轮屏障已经损坏，那就没办法使用了

            if (Thread.interrupted()) {   //如果当前等待状态的线程被中断，那么会直接破坏掉屏障，并抛出中断异常（破坏屏障的第1种情况）
                breakBarrier();
                throw new InterruptedException();
            }

            int index = --count;     //如果上面都没有出现不正常，那么就走正常流程，首先count自减并赋值给index，index表示当前是等待的第几个线程
            if (index == 0) {  // 如果自减之后就是0了，那么说明来的线程已经足够，可以冲破屏障了
                boolean ranAction = false;
                try {
                    final Runnable command = barrierCommand;
                    if (command != null)
                        command.run();   //执行冲破屏障后的任务，如果这里抛异常了，那么会进finally
                    ranAction = true;
                    nextGeneration();   //一切正常，开启下一轮屏障（方法进入之后会唤醒所有等待的线程，这样所有的线程都可以同时继续运行了）然后返回0，注意最下面finally中会解锁，不然其他线程唤醒了也拿不到锁啊
                    return 0;
                } finally {
                    if (!ranAction)   //如果是上面出现异常进来的，那么也会直接破坏屏障（破坏屏障的第2种情况）
                        breakBarrier();
                }
            }

            // 能走到这里，那么说明当前等待的线程数还不够多，不足以冲破屏障
            for (;;) {   //无限循环，一直等，等到能冲破屏障或是出现异常为止
                try {
                    if (!timed)
                        trip.await();    //如果不是定时的，那么就直接永久等待
                    else if (nanos > 0L)
                        nanos = trip.awaitNanos(nanos);   //否则最多等一段时间
                } catch (InterruptedException ie) {    //等的时候会判断是否被中断（依然是破坏屏障的第1种情况）
                    if (g == generation && ! g.broken) {
                        breakBarrier();
                        throw ie;
                    } else {
                        Thread.currentThread().interrupt();
                    }
                }

                if (g.broken)
                    throw new BrokenBarrierException();   //如果线程被唤醒之后发现屏障已经被破坏，那么直接抛异常

                if (g != generation)   //成功冲破屏障开启下一轮，那么直接返回当前是第几个等待的线程。
                    return index;

                if (timed && nanos <= 0L) {   //线程等待超时，也会破坏屏障（破坏屏障的第3种情况）然后抛异常
                    breakBarrier();
                    throw new TimeoutException();
                }
            }
        } finally {
            lock.unlock();    //最后别忘了解锁，不然其他线程拿不到锁
        }
    }

  	//不多说了
    public int getParties() {
        return parties;
    }

  	//判断是否被破坏，也是加锁访问，因为有可能这时有其他线程正在执行dowait
    public boolean isBroken() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            return generation.broken;
        } finally {
            lock.unlock();
        }
    }

  	//重置操作，也要加锁
    public void reset() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            breakBarrier();   // 先破坏这一轮的线程，注意这个方法会先破坏再唤醒所有等待的线程，那么所有等待的线程会直接抛BrokenBarrierException异常（详情请看上方dowait倒数第13行）
            nextGeneration(); // 开启下一轮
        } finally {
            lock.unlock();
        }
    }
	
  	//获取等待线程数量，也要加锁
    public int getNumberWaiting() {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            return parties - count;   //最大容量 - 当前剩余容量 = 正在等待线程数
        } finally {
            lock.unlock();
        }
    }
}
```

看完了CyclicBarrier的源码之后，是不是感觉比CountDownLatch更简单一些？

### 信号量 Semaphore

还记得我们在《操作系统》中学习的信号量机制吗？它在解决进程之间的同步问题中起着非常大的作用。

> 信号量(Semaphore)，有时被称为信号灯，是在多线程环境下使用的一种设施，是可以用来保证两个或多个关键代码段不被并发调用。在进入一个关键代码段之前，线程必须获取一个信号量；一旦该关键代码段完成了，那么该线程必须释放信号量。其它想进入该关键代码段的线程必须等待直到第一个线程释放信号量。

通过使用信号量，我们可以决定某个资源同一时间能够被访问的最大线程数，它相当于对某个资源的访问进行了流量控制。简单来说，它就是一个可以被N个线程占用的排它锁（因此也支持公平和非公平模式），我们可以在最开始设定Semaphore的许可证数量，每个线程都可以获得1个或n个许可证，当许可证耗尽或不足以供其他线程获取时，其他线程将被阻塞。

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    //每一个Semaphore都会在一开始获得指定的许可证数数量，也就是许可证配额
    Semaphore semaphore = new Semaphore(2);   //许可证配额设定为2

    for (int i = 0; i < 3; i++) {
        new Thread(() -> {
            try {
                semaphore.acquire();   //申请一个许可证
                System.out.println("许可证申请成功！");
                semaphore.release();   //归还一个许可证
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
```

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    //每一个Semaphore都会在一开始获得指定的许可证数数量，也就是许可证配额
    Semaphore semaphore = new Semaphore(3);   //许可证配额设定为3

    for (int i = 0; i < 2; i++)
        new Thread(() -> {
            try {
                semaphore.acquire(2);    //一次性申请两个许可证
                System.out.println("许可证申请成功！");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    
}
```

我们也可以通过Semaphore获取一些常规信息：

```java
public static void main(String[] args) throws InterruptedException {
    Semaphore semaphore = new Semaphore(3);   //只配置一个许可证，5个线程进行争抢，不内卷还想要许可证？
    for (int i = 0; i < 5; i++)
        new Thread(semaphore::acquireUninterruptibly).start();   //可以以不响应中断（主要是能简写一行，方便）
    Thread.sleep(500);
    System.out.println("剩余许可证数量："+semaphore.availablePermits());
    System.out.println("是否存在线程等待许可证："+(semaphore.hasQueuedThreads() ? "是" : "否"));
    System.out.println("等待许可证线程数量："+semaphore.getQueueLength());
}
```

我们可以手动回收掉所有的许可证：

```java
public static void main(String[] args) throws InterruptedException {
    Semaphore semaphore = new Semaphore(3);
    new Thread(semaphore::acquireUninterruptibly).start();
    Thread.sleep(500);
    System.out.println("收回剩余许可数量："+semaphore.drainPermits());   //直接回收掉剩余的许可证
}
```

这里我们模拟一下，比如现在有10个线程同时进行任务，任务要求是执行某个方法，但是这个方法最多同时只能由5个线程执行，这里我们使用信号量就非常合适。

### 数据交换 Exchanger

线程之间的数据传递也可以这么简单。

使用Exchanger，它能够实现线程之间的数据交换：

```java
public static void main(String[] args) throws InterruptedException {
    Exchanger<String> exchanger = new Exchanger<>();
    new Thread(() -> {
        try {
            System.out.println("收到主线程传递的交换数据："+exchanger.exchange("AAAA"));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }).start();
    System.out.println("收到子线程传递的交换数据："+exchanger.exchange("BBBB"));
}
```

在调用`exchange`方法后，当前线程会等待其他线程调用同一个exchanger对象的`exchange`方法，当另一个线程也调用之后，方法会返回对方线程传入的参数。

可见功能还是比较简单的。

### Fork/Join框架

在JDK7时，出现了一个新的框架用于并行执行任务，它的目的是为了把大型任务拆分为多个小任务，最后汇总多个小任务的结果，得到整大任务的结果，并且这些小任务都是同时在进行，大大提高运算效率。Fork就是拆分，Join就是合并。

我们来演示一下实际的情况，比如一个算式：18x7+36x8+9x77+8x53，可以拆分为四个小任务：18x7、36x8、9x77、8x53，最后我们只需要将这四个任务的结果加起来，就是我们原本算式的结果了，有点归并排序的味道。

![image-20220316225312840](https://tva1.sinaimg.cn/large/e6c9d24ely1h0c43lq5kfj223e0lg42t.jpg)

它不仅仅只是拆分任务并使用多线程，而且还可以利用工作窃取算法，提高线程的利用率。

> **工作窃取算法：**是指某个线程从其他队列里窃取任务来执行。一个大任务分割为若干个互不依赖的子任务，为了减少线程间的竞争，把这些子任务分别放到不同的队列里，并为每个队列创建一个单独的线程来执行队列里的任务，线程和队列一一对应。但是有的线程会先把自己队列里的任务干完，而其他线程对应的队列里还有任务待处理。干完活的线程与其等着，不如帮其他线程干活，于是它就去其他线程的队列里窃取一个任务来执行。

![image-20220316230928072](https://tva1.sinaimg.cn/large/e6c9d24ely1h0c4kgoen9j21s00gmwis.jpg)

现在我们来看看如何使用它，这里以计算1-1000的和为例，我们可以将其拆分为8个小段的数相加，比如1-125、126-250... ，最后再汇总即可，它也是依靠线程池来实现的：

```java
public class Main {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ForkJoinPool pool = new ForkJoinPool();
        System.out.println(pool.submit(new SubTask(1, 1000)).get());
    }


  	//继承RecursiveTask，这样才可以作为一个任务，泛型就是计算结果类型
    private static class SubTask extends RecursiveTask<Integer> {
        private final int start;   //比如我们要计算一个范围内所有数的和，那么就需要限定一下范围，这里用了两个int存放
        private final int end;

        public SubTask(int start, int end) {
            this.start = start;
            this.end = end;
        }

        @Override
        protected Integer compute() {
            if(end - start > 125) {    //每个任务最多计算125个数的和，如果大于继续拆分，小于就可以开始算了
                SubTask subTask1 = new SubTask(start, (end + start) / 2);
                subTask1.fork();    //会继续划分子任务执行
                SubTask subTask2 = new SubTask((end + start) / 2 + 1, end);
                subTask2.fork();   //会继续划分子任务执行
                return subTask1.join() + subTask2.join();   //越玩越有递归那味了
            } else {
                System.out.println(Thread.currentThread().getName()+" 开始计算 "+start+"-"+end+" 的值!");
                int res = 0;
                for (int i = start; i <= end; i++) {
                    res += i;
                }
                return res;   //返回的结果会作为join的结果
            }
        }
    }
}
```

```
ForkJoinPool-1-worker-2 开始计算 1-125 的值!
ForkJoinPool-1-worker-2 开始计算 126-250 的值!
ForkJoinPool-1-worker-0 开始计算 376-500 的值!
ForkJoinPool-1-worker-6 开始计算 751-875 的值!
ForkJoinPool-1-worker-3 开始计算 626-750 的值!
ForkJoinPool-1-worker-5 开始计算 501-625 的值!
ForkJoinPool-1-worker-4 开始计算 251-375 的值!
ForkJoinPool-1-worker-7 开始计算 876-1000 的值!
500500
```

可以看到，结果非常正确，但是整个计算任务实际上是拆分为了8个子任务同时完成的，结合多线程，原本的单线程任务，在多线程的加持下速度成倍提升。

包括Arrays工具类提供的并行排序也是利用了ForkJoinPool来实现：

```java
public static void parallelSort(byte[] a) {
    int n = a.length, p, g;
    if (n <= MIN_ARRAY_SORT_GRAN ||
        (p = ForkJoinPool.getCommonPoolParallelism()) == 1)
        DualPivotQuicksort.sort(a, 0, n - 1);
    else
        new ArraysParallelSortHelpers.FJByte.Sorter
            (null, a, new byte[n], 0, n, 0,
             ((g = n / (p << 2)) <= MIN_ARRAY_SORT_GRAN) ?
             MIN_ARRAY_SORT_GRAN : g).invoke();
}
```

并行排序的性能在多核心CPU环境下，肯定是优于普通排序的，并且排序规模越大优势越显著。

至此，并发编程篇完结。
