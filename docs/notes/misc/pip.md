---
title: pip 使用指南
createTime: 2025/02/24 17:37:43
permalink: /notes/misc/pip/
---


## Pip：如何解析包，如何与conda配合

### 常用指令
- `pip install [package]`：安装包
  - Args:
    - `-e [path]`：安装一个包的可编辑版本
    - `-r [file]`：从文件安装包
    - `--no-deps [package]`：安装包时不安装依赖
    - `-i [repo]`：从指定的仓库安装包
    - `--upgrade-strategy only-if-needed`：仅在需要时升级包
- `pip install --upgrade [package]`：更新包
- `pip uninstall [package]`：卸载包
- `pip list`：列出所有包
- `pip show [package]`：显示包的详细信息，以及依赖
- `pip search [package]`：搜索包

关于(requirements.txt)[https://zhuanlan.zhihu.com/p/663837782]

### 换源

上海交大源，距离集群最近，速度最快。

```bash
pip config set global.index-url https://mirror.sjtu.edu.cn/pypi/web/simple

```

或者创建或编辑 `~/.config/pip/pip.conf` 文件，加入或修改 `index-url` 相关段落为：

```ini
[global]
index-url = https://mirror.sjtu.edu.cn/pypi/web/simple
format = columns
```
更多配置详见[Configuring pip](https://pip.pypa.io/en/stable/topics/configuration/)

### Pip 与 Conda 混用

Ref 1. [Bilibili: Pip与Conda到底能混用吗？](https://www.bilibili.com/opus/837695171647766546)

Ref 2. [Anaconda: Using pip in a conda environment](https://www.anaconda.com/blog/using-pip-in-a-conda-environment)

以下内容部分引用自上述链接。

1. **理论上二者不能掺杂使用。** 在conda环境中使用pip安装包时，conda并不会察觉到
这些变更，并存在破坏环境的风险。一个可靠的方法是创建一个新的环境，并先通过conda
安装需要的包，再运行pip。再次强调，主要问题是pip的“状态性（或关联性）”——安装包的
顺序会关联更多的状态，这将使事情更难以正常工作。

2. **从PyPI构建conda包** 如果需要conda没有提供的软件包，可以使用`conda build`来
创建，在`pypi`上的项目，使用`conda skeleton`可以生成一个用来[创建conda包的配
方](https://docs.conda.io/projects/conda-build/en/stable/)，几乎无需手动修改。

2. **使用conda后再使用pip** 如果有大量只在PyPI上的包，在这种情况下，最安全的做法
   是先通过conda安装所有包，然后再使用pip安装那些conda没有的包。<span
   style="color: red;">应该使用`--upgrade-strategy only-if-needed`来避免pip升级
   已经安装的包。</span>

3. **不要在base中使用pip** 如果预计某项目需要混用conda与pip，最好的做法是将此安
  装放入一个专门的conda环境中，以保护其他环境免受pip可能会进行的任何修改，因为
  [conda环境是独立
  的](https://conda.io/docs/user-guide/tasks/manage-environments.html)，允许不同
  版本的包存在。

4. **在conda环境中，尽可能使用硬链接而不是复制文件。** 如果安装了相同的一组包，
每个新的conda环境将只需要少量额外的磁盘空间。许多用户依赖于由安装Anaconda或
Miniconda创建的“base” conda环境，如果这个环境混杂着pip和conda安装的包，将会更难
恢复。另一方面，创建单独的conda环境允许随时整个删除和重新创建环境，而不会影响核
心的conda功能

### Pip 解析环境的过程

**20.3+：pip 的依赖解析器支持回溯。**  

在解析依赖时，pip 需要先假设要安装的软件包版本，然后再验证这些假设是否正确。如果
发现某个假设是错误的，就需要回溯（backtrack），也就是撤回部分已经完成的工作，重
新选择另一条安装路径。  

这就是为什么 pip 可能会多次下载同一个软件包的不同版本，因为每次下载都会明确展示
给用户。回溯并不是 bug 或异常情况，而是 Python 依赖解析的正常工作方式。  

### 示例  

用户运行 `pip install tea`，而 `tea` 依赖于 `hot-water`、`spoon` 和 `cup` 等多个
软件包。  

pip 先选择 `tea` 的最新版本，并获取它的依赖列表。然后，它会按照这个依赖关系，选
择 `spoon` 和 `cup` 的最新版本。但如果发现 `cup` 的这个版本和 `spoon` 的版本不兼
容，就会回溯，换一个 `cup` 版本再试。如果换成功了，pip 会继续处理下一个依赖（比
如 `sugar`）；如果还是不行，就会继续回溯，直到找到所有依赖项都兼容的组合。

### 减少回溯，解决依赖冲突

1. 限制软件包的版本范围，或使用[constraints文
   件](https://pip.pypa.io/en/stable/topics/dependency-resolution/#use-constraint-files-or-lockfiles)
2. 修改requirements.txt文件，去除无用或过时的依赖，放松对依赖的版本要求
3. 使用`--upgrade-strategy only-if-needed`参数，仅在需要时升级包
