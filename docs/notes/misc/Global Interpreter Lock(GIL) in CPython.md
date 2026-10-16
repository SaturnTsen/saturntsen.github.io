---
title: GIL in CPython
tags:
    - misc
createTime: 2024/01/22 18:38:50
permalink: /notes/misc/global-interpreter-lock-in-cpython/
---

在完成FCOS目标检测项目中，我发现在训练过程中GPU利用率非常低，反倒是CPU利用率高。
而训练过程中所有的数据的确是在VRAM上的。通过排查发现，只有第一个batch的获取消耗
了大量的时间，于是推断是CPython解释器的GIL(Global Interpreter Lock)和Windows创建
子进程的方式(spawn)导致的数据Class的__init__方法中重复IO和pickle json导致的性能
瓶颈。

解决方案：
1. 关闭Windows自动开启的Core Parking，强制开启所有CPU核心。
2. 设置perprocess=True，这样即使在Windows下使用spawn的方式创建子进程，也能够保证
   每个子进程都是持久化的，在一个epoch结束后不会重复IO和pickle json。

这里记录一下GIL的相关知识。