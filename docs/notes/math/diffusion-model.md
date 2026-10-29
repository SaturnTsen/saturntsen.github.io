---
title: 深度解析扩散模型：从随机微分方程到离散去噪
createTime: 2026/10/29 22:25:19
permalink: /notes/math/diffusion-model
---
# 深度解析扩散模型：从随机微分方程到离散去噪

为了在离散和连续的数学框架中保持一致性，我们首先统一关键符号，并对它们背后的物理意义进行解释。

| 符号 | 含义 | 解释 |
| :--- | :--- | :--- |
| $x_0 \sim p_0(x)$ | 原始数据分布 | 我们希望模型最终能生成的真实数据分布。$p_0$ 即 $p_{\text{data}}$。 |
| $t \in [0, T]$ 或 $t=0,\dots,T$ | 前向扩散时刻 | $t=0$ 是原始数据，$t=T$ 是纯噪声（先验）。 |
| $p_t(x)$ | 前向边缘密度 | 在时刻 $t$ 时，数据 $x_t$ 的边际概率密度函数。 |
| $\nabla_x \log p_t(x)$ | Score Function（分数函数） | 概率密度的梯度，指向密度增大的方向。在扩散模型中，它指示了如何从 $x_t$ 逆向回到 $x_0$。 |
| $\varepsilon_\theta(x, t)$ 或 $s_\theta(x, t)$ | 神经网络输出 | 模型学习的目标。$\varepsilon_\theta$ 是预测的噪声（DDPM常用），$s_\theta$ 是预测的Score（SDE常用）。 |

*   $\beta_t \in (0, 1)$：噪声调度（Noise Schedule），控制每一步加入的噪声量。
*   $\alpha_t = 1 - \beta_t$：信号保留率。
*   $\bar\alpha_t = \prod_{s=1}^t \alpha_s$：累积信号保留率。
*   $\sigma_t := \sqrt{1 - \bar\alpha_t}$：累积噪声标准差。

## 理论篇

## 1. 前向扩散：离散与连续的桥梁

前向扩散过程的核心思想是**逐步、可控地**向数据中添加高斯噪声，直到数据完全变成一个标准的先验高斯分布。

### 1.1 离散前向马尔可夫链（DDPM Forward）

DDPM采用马尔可夫链的形式，每一步只依赖于前一步的状态：
$$
q(x_t \mid x_{t-1}) = \mathcal{N}(x_t; \sqrt{\alpha_t}x_{t-1}, (1 - \alpha_t)I)
$$
这一步操作相当于将 $x_{t-1}$ 乘以 $\sqrt{\alpha_t}$（保留信号），然后加上一个方差为 $(1-\alpha_t)I$ 的高斯噪声。

由于高斯分布的线性叠加特性，我们可以得到一个从 $x_0$ 直接到 $x_t$ 的**闭式边缘分布**：
$$
x_t = \sqrt{\bar\alpha_t}x_0 + \sqrt{1 - \bar\alpha_t}\varepsilon, \quad \varepsilon \sim \mathcal{N}(0, I) \tag{F-closed}
$$
这个公式是DDPM训练的基础。它表明 $x_t$ 可以看作是原始数据 $x_0$（被 $\sqrt{\bar\alpha_t}$ 衰减）和纯噪声 $\varepsilon$（被 $\sqrt{1 - \bar\alpha_t}$ 缩放）的线性组合。这使得我们可以直接从 $x_0$ 采样任意时刻 $t$ 的 $x_t$，而无需迭代 $t$ 步，极大地简化了训练过程。

可以证明，$x_t$ 依概率收敛至 $\mathcal{N}(0,I_d)$, 这是Diffusion模型采样的基础。

### 1.2 连续前向 SDE（VP-SDE 典型形态）

当离散步长趋于无穷小，DDPM过程可以被一个**随机微分方程 (SDE)** 描述，典型的VP-SDE（Variance Preserving SDE）形式为：
$$
\mathrm{d}x_t = -\frac{1}{2}\beta(t)x_t \mathrm{d}t + \sqrt{\beta(t)}\mathrm{d}W_t \tag{VP-SDE}
$$
其中

*   **$\mathrm{d}x_t$**：$x$ 在极短时间 $\mathrm{d}t$ 内的变化量。
*   **$-\frac{1}{2}\beta(t)x_t \mathrm{d}t$**：**漂移项 (Drift)**。它是一个确定性项，将 $x_t$ 拉向原点（均值）。这对应于离散DDPM中 $\sqrt{\alpha_t} < 1$ 的信号衰减。
*   **$\sqrt{\beta(t)}\mathrm{d}W_t$**：**扩散项 (Diffusion)**。它是一个随机项，$\mathrm{d}W_t$ 是布朗运动，代表高斯噪声的注入。这对应于离散DDPM中添加的噪声。
*   （布朗运动是最常见的随机过程之一，其最重要的性质是独立增量，且增量为高斯向量 $W_t - W_s\sim \mathcal{N}(0,(t-s)I)$

**扩展：密度演化：Fokker–Planck 方程**

SDE描述了单个样本 $x_t$ 的轨迹，而**Fokker–Planck (Kolmogorov Forward) 方程**则描述了整个概率密度函数 $p_t(x)$ 随时间 $t$ 的演化：
$$
\partial_t p_t(x) = -\nabla \cdot \big(f(x, t)p_t(x)\big) + \frac{1}{2} \nabla \nabla : \big(g(t)^2 I p_t(x)\big)
$$
对于VP-SDE，漂移向量 $f(x, t) = -\frac{1}{2}\beta(t)x$，扩散系数 $g(t) = \sqrt{\beta(t)}$。这个方程保证了SDE过程的数学严谨性。

## 2. 反向过程：SDE 与 ODE 的双重路径

生成过程（去噪）是前向扩散过程的逆转。根据SDE理论，反向过程的动力学可以被精确地推导出来。

### 2.1 反向时间 SDE（Reverse-Time SDE）

对于一般的SDE
$$
\mathrm{d}x_t = f(x_t, t)\mathrm{d}t + g(t)\mathrm{d}W_t
$$
其反向过程满足：
$$
\mathrm{d}x_t = \Big(f(x_t, t) - g(t)^2 \nabla_x \log p_t(x_t)\Big)\mathrm{d}t + g(t)\mathrm{d}\bar{W}_t \tag{Reverse-SDE}
$$

*   **$\mathrm{d}\bar{W}_t$**：这是反向时间的布朗运动，分布上等于布朗运动。
*   **核心项 $g(t)^2 \nabla_x \log p_t(x_t)$**：这是**Score Function**发挥作用的地方。它修正了前向的漂移项 $f(x_t, t)$。
    *   前向过程的漂移 $f$ 将数据推向原点（或均值）。
    *   反向过程需要一个**反向漂移**来将数据从原点推回数据流形。这个反向漂移项正是由 $g(t)^2$ 乘以 **Score Function** $\nabla_x \log p_t(x_t)$ 构成。
    *   Score Function $\nabla_x \log p_t(x_t)$ 指向密度增大的方向，因此它指导了反向过程如何沿着概率密度最高的路径（即数据流形）进行去噪。

将VP-SDE的参数代入，得到VP-SDE的反向形式：
$$
\mathrm{d}x_t = \Big(-\frac{1}{2}\beta(t)x_t - \beta(t)\nabla_x \log p_t(x_t)\Big)\mathrm{d}t + \sqrt{\beta(t)}\mathrm{d}\bar{W}_t \tag{VP-Reverse}
$$

### 2.2 Probability Flow ODE（确定性版本）

我们还可以找到一个**确定性**的常微分方程（ODE），它与SDE共享相同的边际概率密度 $p_t(x)$：
$$
\frac{\mathrm{d}x_t}{\mathrm{d}t} = f(x_t, t) - \frac{1}{2}g(t)^2 \nabla_x \log p_t(x_t) \tag{PF-ODE}
$$

## 3. Score Matching：学习不可见的边缘 Score

有了以上方程，我们便知道了加噪和逆向过程。为了实现逆向过程，我们要估计score function。因此，我们的目标是学习一个网络$s_\theta(t,x_t)\approx \nabla_{x_t} \log p_t(x_t)$. 然而 score function 依赖于**边际密度** $p_t(\cdot)$，而 $p_t(\cdot)$ 在高维空间中是**不可计算**的。Score Matching提供了一种绕过这一难题的方法。

### 3.1 关键恒等式：边缘 Score 是条件 Score 的后验期望

我们定义**条件 Score** $u_t(x_0, x_t) := \nabla_{x_t}\log p_t(x_t\mid x_0)$，它是从 $x_t$ 预测 $x_0$ 的Score。
**用联合采样的 MSE 去回归条件 Score $u(x_0, x_t)$，最优解就是边际 Score $\nabla_{x_t}\log p_t(x_t)$。**

固定时间步$t$, 我们实际训练的DSM（Denoising Score Matching）损失是：
$$
\mathcal{L}_t{\text{DSM}}(\theta) = \mathbb{E}_{x_0, x_t}\big[\|s_\theta(x_t, t) - u(x_0, x_t)\|^2\big]
$$

该损失的最优解为 $s_\theta(t,x_t) = \nabla_x \log p_t(x)$ 

### 3.2* DSM 损失的最优解证明

我们证明：最小化 DSM 损失 $\mathcal{L}^{\text{DSM}}(\theta)$ 的最优函数形式 $s^*(x_t, t)$ 恰好是边际 Score $\nabla_{x_t}\log p_t(x_t)$。

DSM 损失（固定时间步 $t$）：
$$\mathcal{L}^{\text{DSM}}_t(\theta) = \mathbb{E}_{x_0, x_t}\Big[\|s_\theta(x_t, t) - u_t(x_0, x_t)\|^2\Big]$$

#### 步骤 1: MSE 回归的最优解是条件期望（$L^2$ 投影）

将 $s_\theta(x_t, t)$ 记为 $g(x_t)$，将 $u_t(x_0, x_t)$ 记为 $Y$。损失函数为 $\mathcal{L}(g)=\mathbb E\big[\|g(x_t)-Y\|^2\big]$。
根据全期望定律，我们可以对 $x_t$ 的边际分布进行分解：
$$\mathcal{L}(g) = \mathbb E_{x_t}\Big[\mathbb E\big[\|g(x_t)-Y\|^2\mid x_t\big]\Big]$$
要最小化 $\mathcal{L}(g)$，只需对每个固定的 $x_t$ 最小化内层期望 $\phi_{x_t}(a) := \mathbb E\big[\|a-Y\|^2\mid x_t\big]$，其中 $a=g(x_t)$。
根据均方误差的性质（完成平方），内层期望可以分解为：
$$\phi_{x_t}(a) = \mathbb E\big[\|Y-\mathbb E[Y\mid x_t]\|^2\mid x_t\big] + \|a-\mathbb E[Y\mid x_t]\|^2$$
第一项与 $a$ 无关，第二项在且仅在 $a=\mathbb E[Y\mid x_t]$ 时取到最小值（为 0）。
因此，全局最优函数为：
$$g^*(x_t) = \mathbb E\big[u_t(x_0, x_t)\mid x_t\big]$$

#### 步骤 2: 条件期望等于边际 Score（Score Identity 证明）

我们证明 $g^*(x_t)$ 恰好是边际 Score $\nabla_{x_t}\log p_t(x_t)$。
根据条件期望的定义：
$$\mathbb E[u_t(x_0, x_t)\mid x_t] = \int u_t(x_0, x_t) p(x_0\mid x_t) \mathrm{d}x_0$$
代入 $u_t(x_0, x_t) = \nabla_{x_t}\log p_t(x_t\mid x_0) = \frac{\nabla_{x_t} p_t(x_t\mid x_0)}{p_t(x_t\mid x_0)}$：
$$= \int \frac{\nabla_{x_t} p_t(x_t\mid x_0)}{p_t(x_t\mid x_0)} p(x_0\mid x_t) \mathrm{d}x_0$$
再利用贝叶斯公式 $p(x_0\mid x_t)=\frac{p_t(x_t\mid x_0)p(x_0)}{p_t(x_t)}$：
$$= \int \frac{\nabla_{x_t} p_t(x_t\mid x_0)}{p_t(x_t\mid x_0)} \cdot \frac{p_t(x_t\mid x_0)p(x_0)}{p_t(x_t)} \mathrm{d}x_0$$
消去 $p_t(x_t\mid x_0)$ 并将与 $x_0$ 无关的 $p_t(x_t)$ 移出积分：
$$= \frac{1}{p_t(x_t)}\int \nabla_{x_t} p_t(x_t\mid x_0) p(x_0) \mathrm{d}x_0$$
在满足光滑和可积条件下（扩散模型通常满足），可以将梯度 $\nabla_{x_t}$ 移入/移出积分（Leibniz Rule）：
$$= \frac{1}{p_t(x_t)}\nabla_{x_t}\int p_t(x_t\mid x_0) p(x_0) \mathrm{d}x_0$$
注意到 $\int p_t(x_t\mid x_0) p(x_0) \mathrm{d}x_0$ 正是边际密度 $p_t(x_t)$ 的定义。因此：
$$= \frac{\nabla_{x_t} p_t(x_t)}{p_t(x_t)} = \nabla_{x_t}\log p_t(x_t)$$

#### 结论

综合以上两步，我们证明了：
$$\arg\min_{s(\cdot,t)}\ \mathbb E_{x_0,x_t}\big[\|s(x_t,t)-u_t(x_0,x_t)\|^2\big] = \mathbb E[u_t(x_0,x_t)\mid x_t] = \nabla_{x_t}\log p_t(x_t)$$
这严谨地确立了 **DSM 损失函数** 的理论基础：

通过最小化一个可计算的 MSE 损失，我们能够训练网络去逼近一个不可计算的边际 Score Function。



## 实践篇

## 4. 噪声参数化：为何网络常预测 $\varepsilon$

在DDPM中，网络通常被设计为预测噪声 $\varepsilon_\theta(x_t, t)$，而不是Score $s_\theta(x_t, t)$。

从闭式公式 $x_t = \sqrt{\bar\alpha_t}x_0 + \sigma_t \varepsilon$ 可知，$\varepsilon = \frac{x_t - \sqrt{\bar\alpha_t}x_0}{\sigma_t}$。 通过高斯分布的性质，可以显式计算出**条件 Score**：
$$
\nabla_{x_t}\log p(x_t \mid x_0) = -\frac{1}{\sigma_t}\varepsilon
$$
因此，我们希望模型预测的Score $s_\theta(x_t, t)$ 近似于 $-\frac{1}{\sigma_t}\varepsilon$。
$$
s_\theta(x_t, t) \approx -\frac{1}{\sigma_t}\varepsilon \quad \Longleftrightarrow \quad \varepsilon_\theta(x_t, t) \approx \varepsilon
$$
这给出了Score和噪声预测之间的**换算关系**：
$$
\boxed{s_\theta(x_t, t) = -\frac{1}{\sigma_t}\varepsilon_\theta(x_t, t)} \tag{eps-to-score}
$$
**预测干净样本 $\hat{x}_0$：** 我们定义对原始干净样本 $\hat{x}_0$ 的预测：
$$
\boxed{\hat{x}_0 = \frac{x_t - \sigma_t \varepsilon_\theta(x_t, t)}{\sqrt{\bar\alpha_t}}} \tag{x0hat}
$$


**物理意义：** $\hat{x}_0$ 是在当前 $x_t$ 和预测噪声 $\varepsilon_\theta$ 的基础上，通过解析方法得到的**最可能**的原始数据。在反向SDE/ODE的离散化中，$\hat{x}_0$ 是最自然的“去噪中心”。后文离散去噪过程会用到这个值。

## 5. 离散去噪：DDPM 与 DDIM

现在我们将连续的反向SDE/ODE转化为实际可执行的离散更新步骤，即采样过程（Sampling）。

### 5.1 DDPM Sampling（随机；反向 SDE 的离散化）

DDPM采样是基于**反向马尔可夫链**的，它对应于反向SDE的一种离散化。
$$
\boxed{x_{t-1} = \frac{1}{\sqrt{\alpha_t}} \left( x_t - \frac{1-\alpha_t}{\sqrt{1-\bar\alpha_t}}\varepsilon_\theta(x_t, t) \right) + \sqrt{\tilde\beta_t}z, \quad z \sim \mathcal{N}(0, I)} \tag{DDPM-step}
$$
其中 $\tilde\beta_t = \frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}\beta_t$。

*   **均值项（去噪）**：公式中 $\frac{1}{\sqrt{\alpha_t}} (\dots)$ 部分是**确定性**的去噪方向，它将 $x_t$ 沿着 Score Function 指引的方向推向 $x_{t-1}$ 的均值。
*   **方差项（随机性）**：$\sqrt{\tilde\beta_t}z$ 是注入的**高斯噪声**。这保证了DDPM采样是**随机**的，每次运行都会产生不同的结果，从而覆盖整个数据分布。

### 5.2 DDIM Sampling（确定性；Probability Flow ODE 的离散化）

DDIM（Denoising Diffusion Implicit Models）采样是基于**Probability Flow ODE**的，它通常是**确定性**的（当 $\eta=0$ 时）。DDIM通过**重参数化**，允许使用更少的采样步数。
$$
\boxed{x_{t-1} = \sqrt{\bar\alpha_{t-1}}\hat{x}_0 + \sqrt{1-\bar\alpha_{t-1}}\varepsilon_\theta(x_t, t), \quad \hat{x}_0 \text{ 由式 }(x0hat) \text{ 给出}} \tag{DDIM-step}
$$

*   DDIM将 $x_{t-1}$ 分解为两部分：**预测的干净信号** $\sqrt{\bar\alpha_{t-1}}\hat{x}_0$ 和**残余噪声** $\sqrt{1-\bar\alpha_{t-1}}\varepsilon_\theta(x_t, t)$。
*   当 $\eta=0$ 时，DDIM不添加额外的随机噪声，因此它沿着一条**确定性**的“概率流线”进行去噪。这使得DDIM可以进行**快速采样**（子采样时间步）和**一致性采样**（相同的 $x_T$ 总是得到相同的 $x_0$）。

### 5.3. DDPM vs DDIM：同网络、不同路径、同终点

在**理想条件**下（Score函数真实、连续时间、无离散误差），Reverse-SDE（DDPM的理论基础）和 PF-ODE（DDIM的理论基础）都由同一个 $\nabla\log p_t$ 驱动。它们都严格保证将先验分布 $p_T$ 推回到数据分布 $p_0$。即 $X_0^{\text{SDE}} \sim p_0$ 且 $X_0^{\text{ODE}} \sim p_0$。

然而，它们**中间时刻的分布一般不同**，即虽然起点和终点分布相同，但DDPM的随机路径和DDIM的确定性流线在中间时刻的样本分布是不同的。**工程实践**：同一个训练好的网络 $\varepsilon_\theta$ 可以同时兼容 DDPM 和 DDIM 两种采样器（Scheduler），前提是使用了**一致的噪声参数项**和**参数化换算**。

## 6. Scheduler 的核心功能总结

Scheduler 是连接训练好的网络 $\varepsilon_\theta$ 和最终采样结果的桥梁。它负责将连续的数学理论转化为离散的工程实现。给定网络输出 $\varepsilon_\theta(x_t, t)$，Scheduler 负责以下五个核心功能：

| 功能 | 描述 | 对应数学概念 |
| :--- | :--- | :--- |
| **1. 时间网格** | 确定从 $t_T$ 到 $t_0$ 的离散时间序列。允许子采样（如DDIM）以加速。 | 离散化步长 $\Delta t$ 的选择。 |
| **2. 噪声日程** | 提供每一步所需的 $\alpha_t, \bar\alpha_t, \sigma_t$ 等参数。 | 前向过程的参数定义。 |
| **3. 语义变换** | 实现 $\varepsilon_\theta \leftrightarrow s_\theta \leftrightarrow \hat{x}_0$ 之间的解析换算。 | (eps-to-score) 和 (x0hat) 公式。 |
| **4. 一步更新公式** | 实现 DDPM-step 或 DDIM-step 等离散更新公式。 | 反向 SDE/ODE 的数值求解器。 |
| **5. 随机性控制** | 决定是否注入随机噪声，以及注入多少（如DDIM中的 $\eta$ 参数）。 | Reverse-SDE 与 PF-ODE 的选择。 |

这个总结链条清晰地展示了扩散模型的完整理论框架：
**前向 SDE → 反向 SDE（定理）→ Score Identity → DSM（Tower + 投影定理）→ 噪声参数化 → 离散更新（DDPM/DDIM）**。

## 7. 代码

```python
import torch
from diffusers import DDPMScheduler, UNet2DModel
from PIL import Image
import os

# --- 1. Setup and Model Loading ---
# 使用一个轻量级的预训练模型进行演示
MODEL_ID = "google/ddpm-cifar10-32"
# 确保使用GPU（如果可用）
device = "cuda" if torch.cuda.is_available() else "cpu"

print(f"Loading model and scheduler on device: {device}")

# 加载预训练的UNet模型（噪声预测网络）
unet = UNet2DModel.from_pretrained(MODEL_ID)
unet.to(device)

# 加载DDPM调度器（Scheduler），它包含了我们理论中讨论的 alpha, beta 等参数
scheduler = DDPMScheduler.from_pretrained(MODEL_ID)

# --- 2. Generation Parameters ---
# 图像尺寸和通道数
sample_size = unet.config.sample_size
batch_size = 1
# 采样步数，对应理论中的 T
scheduler.set_timesteps(num_inference_steps=1000)
timesteps = scheduler.timesteps

# --- 3. Initial Noise (x_T) ---
# 从标准高斯分布中采样初始噪声 x_T
# 对应理论中的 x_T ~ N(0, I)
latents = torch.randn(
    (batch_size, unet.config.in_channels, sample_size, sample_size)
).to(device)

print(f"Starting denoising loop with {len(timesteps)} steps...")

# --- 4. Denoising Loop (Reverse Process) ---
# 对应理论中的 DDPM-step 或 DDIM-step 的迭代过程
for i, t in enumerate(timesteps):
    # 1. 预测噪声 (Predict noise)
    # t 是一个张量，需要将其转换为模型接受的格式
    t_tensor = torch.tensor([t], device=device)
    
    # 模型 s_theta(x_t, t) 预测的是噪声 epsilon_theta(x_t, t)
    with torch.no_grad():
        noise_pred = unet(latents, t_tensor).sample

    # 2. 计算 x_{t-1} (Compute x_{t-1})
    # 调度器根据预测的噪声和当前状态，计算下一步的去噪结果
    # 这一步内部实现了 DDPM-step 的公式
    latents = scheduler.step(noise_pred, t, latents).prev_sample

    if (i + 1) % 100 == 0 or i == len(timesteps) - 1:
        print(f"Step {i+1}/{len(timesteps)} completed (t={t.item()})")

# --- 5. Post-processing and Saving ---
# 将结果从 [-1, 1] 范围缩放到 [0, 255]
latents = (latents / 2 + 0.5).clamp(0, 1)
latents = latents.cpu().permute(0, 2, 3, 1).numpy()
image = (latents[0] * 255).astype("uint8")
image = Image.fromarray(image)

OUTPUT_PATH = "generated_image.png"
image.save(OUTPUT_PATH)
print(f"\nGeneration complete. Image saved to {OUTPUT_PATH}")

# 确保文件存在以便交付
if os.path.exists(OUTPUT_PATH):
    print("File check passed.")
else:
    print("Error: Output file not found.")
```

