---
title: conda
createTime: 2024/01/11 16:36:01
permalink: /notes/misc/conda-env-config/
outline: [2,4]
---

本篇记录自使用服务器集群以来，踩过的无数坑，熬过的无数个夜，最后总结出来一份环境配置宝典，希望能帮助到后来者。

## 网络代理

此处详见[网络代理配置](network-proxy.md)

```bash
setproxy
```

## Conda 配置

conda 是一个开源的软件包管理系统和环境管理系统，用于安装多个版本的软件包及其依赖关系，并在它们之间轻松切换。它的特点是无需 root 权限，即可创建一整套Python环境和各种编译工具链集合。

### 安装conda

前往[repo.anaconda.com](https://repo.anaconda.com/)查找最新的安装包。

```bash
cd ~
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
rm Miniconda3-latest-Linux-x86_64.sh
```

激活环境。激活后，重启终端。

```bash
$(find ~ -name "conda" 2>/dev/null) init
```

### 常用命令

| 命令 | 说明 |
| --- | --- |
| `conda env list` | 列出所有 Conda 环境 |
| `conda create -n [name] python=3.8.* -y` | 创建名为 `name` 的环境，Python 版本为 3.8 |
| `conda env remove -n [name]` | 删除名为 `name` 的环境 |
| `conda activate [name]` | 激活名为 `name` 的环境 |
| `conda deactivate` | 退出当前环境 |
| `conda list` | 列出当前环境的所有包 |

**配置国内镜像**

```bash
# 删除 defaults
conda config --remove channels https://repo.anaconda.com/pkgs/main
conda config --remove channels https://repo.anaconda.com/pkgs/free
conda config --remove channels https://repo.anaconda.com/pkgs/r
conda config --remove channels https://repo.anaconda.com/pkgs/pro
conda config --remove channels https://repo.anaconda.com/pkgs/msys2
# 添加清华镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --set show_channel_urls yes
```

### 高级配置

| 命令 | 说明 |
| --- | --- |
| `conda config --show` | 显示当前的 Conda 配置 |
| `conda config --describe [key]` | 显示配置的详细信息 |
| `conda config --show channels` | 显示当前配置的所有 channels |


#### <span style="color: red;">channel 优先级</span>

| 命令 | 说明 |
| --- | --- |
| `conda config --add channels [channel_url]` | 添加channel |
| `conda config --set channel_priority strict` | 设置 channel 优先级为严格模式 |
| `conda config --set channel_priority flexible` | 设置 channel 优先级为灵活模式 |

当多个 channel 都有相同的包时，conda 需要解决冲突。

默认情况下，conda 会优先选择来自高优先级 channel 的包，而不是低优先级 channel 的包。因此，您可以将其他 channel 放在列表的底部，以提供默认 channel 中没有的包，同时也能保证这些 channel 不会覆盖核心包。

Conda 会收集所有列出 channel 中具有相同名称的包，并按以下方式处理：

1. 按 channel 优先级从高到低排序包。
2. 对于具有相同 channel 优先级的包，按版本号从高到低排序。例如，如果 channelA 包含 NumPy 1.12.0 和 1.13.1，NumPy 1.13.1 将排在更高的位置。
3. 对于仍然相同的包，按构建号从高到低排序。例如，如果 channelA 包含 NumPy 1.12.0 构建 1 和构建 2，构建 2 排在最前面。channelB 中的任何包都将排在 channelA 中的包之后。
4. 安装满足安装规范的排序列表中的第一个包。

例如，假设有两个 channel：channelA 和 channelB， 均包含 NumPy 1.12.1 和 1.13_1。channelA 的优先级高于 channelB。

则解析顺序是：channelA::numpy-1.13_1 > channelA::numpy-1.12.1_1 > channelA::numpy-1.12.1_0 > channelB::numpy-1.13_1

#### 严格模式

```bash
conda config --set channel_priority strict
```

channel_priority (通道优先级) 有三个选项：'strict'、'flexible'和 'disabled'。默认 'flexible'。
- 在严格模式下，高优先级通道中的包会优先被选中，低优先级通道中的同名包不会被考虑。
- 在灵活模式下，解决器可能会选择低优先级通道中的包来满足依赖关系，而不是报错。
- 在禁用模式下，优先选择包版本，通道优先级仅在版本相同时起作用。


### Best Practice

#### 推荐channel配置

nvidia、pytorch的包时常起冲突，建议将 nvidia 的 channel 放在 pytorch 的 channel 之前。

```bash
# 示例 .condarc
channel_priority: strict      # 强制优先级严格匹配频道顺序
channels:
  - pytorch                   # 最高优先级：PyTorch 官方库（必须的版本）
  - nvidia                    # 第二优先级：NVIDIA CUDA 相关库
  - conda-forge               # 第三优先级：灵活更新的第三方包
  - defaults                  # 最低优先级：稳定但有时过时的官方源
```

#### 必要时强制override

示例：安装 PyTorch 并强制匹配 CUDA 版本

```bash
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 
```
Args:
- `-c, --channel`
  
  指定额外的包搜索通道。这些通道按给定顺序搜索，可以是 URL、本地目录（使用 'file://' 语法）或简单路径（如 '/home/conda/mychan' 或 '../mychan'）。然后，搜索默认或 .condarc 中的通道（除非使用了 --override-channels）。可以使用 'defaults' 来获取 conda 的默认包。还可以使用任何名称，.condarc 的 channel_alias 值将被预先添加。默认的 channel_alias 是 https://conda.anaconda.org/。

- `--use-local`

  使用本地构建的包。等同于 '-c local'。

- `--override-channels`
  
  不搜索默认或 .condarc 里的通道。需要显式指定 --channel。

<span style="color: red;">巨坑：`-c` 指定的channel会添加在`.condarc`的channel的后面，所以我们在安装某些特定版本时一定注意要`--override-channels`！</span>

例如下面安装`nvidia`的指定cu116版本cuda-toolkit时，如果不手动override，就会被强制装上最新版！

<span style="color: red;">血的教训：装包按y确认之前一定看好哪些包被覆盖，尤其注意有没有影响cuda及其环境的包！</span>

## 总结

**配置conda的步骤**

1. 安装conda
2. 初始化终端，重启
3. 配置国内镜像

**关于channel优先级**

1. 配置`.condarc`优先级
2. 必要时强制override