---
title: 加密货币祛魅 4 - 衍生篇
createTime: 2025/04/20 21:25:38
permalink: /notes/crypto/crypto-4/
---
## 加密货币祛魅4 - 衍生篇

### LP（Liquidity Provider，流动性提供者）
- 用户将资产投入池子供他人交易，按交易额比例赚取手续费；
- 本质上是做市角色，赚取交易流动性收益。
- 智能合约托管的链上资产集合；
- 类型包括：
  - Swap 池：用于币种兑换；
  - Perp 池：作为 Perp 对手盘；
  - 借贷池：如 AAVE 中的存贷资产。
-  AMM（Automated Market Maker，自动做市商）
  - 以公式（如 x*y=k）进行定价，用户与系统自动交易，无需挂单撮合；
  - 每笔交易会改变池内资产比例，导致滑点。

### Perp（Perpetual Contract，永续合约）
- 并非购买真实资产，而是押注某币价格涨跌，可长期持有；
- **机制组件**：
  - **Matching Engine**：撮合买涨与买跌用户；
  - **Oracle**：提供外部价格信息；
  - **Liquidation**：清算爆仓用户；
  - **Funding Rate**：平衡多空头寸；
  - **Position Management**：管理杠杆与保证金；
  - **Settlement**：盈亏结算。
- **撮合方式**：
  - **AMM**：用户与系统交易；
  - **Orderbook**：用户挂单撮合，仿中心化交易所。

### 链上收益策略协议（Yield Protocol）
- 利用 DeFi 组合策略进行收益聚合与再分配；
- 常见协议与核心机制：
  - **Pendle**：利率分离，把一笔资产的“本金”和“未来利息”拆成两个可交易的代币，适合构建固定收益策略；
  - **Morpho**：将 Aave/Compound 借贷机制优化为 P2P 匹配，提升借贷效率、提高利率收益；
  - **Convex**：围绕 Curve veToken 机制构建收益聚合平台，通过锁仓投票获得 CRV 分配权再重分配；
  - **Yearn**：最早的策略组合金库，用户存入资产后系统自动调度至多个协议中赚取最高年化收益。