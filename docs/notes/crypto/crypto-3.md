---
title: 加密货币祛魅 3 - 服务篇
createTime: 2025/04/20 21:25:36
permalink: /notes/crypto/crypto-3/
---
# 加密货币祛魅3 - 服务篇

## 接口服务
### Node 服务（RPC / Indexer 提供商）
开发者通过它们访问链上数据、发交易、同步状态，是 Web3 的“云服务商”。
**QuickNode**    老牌多链节点服务商，面向企业级应用，覆盖广
**Helius**    专注 Solana，提供解析器、Webhook、NFT API 等
**Alchemy**    EVM 生态明星项目，强调开发者体验，支持模拟与追踪
*“一条真正的‘公共链’，99% 的普通开发者却连跑节点都跑不起。RPC 不过是另一种形式的 AWS。”*

### Business SDK
- **Business SDK** 是抽象层，即把链上 RPC 转换成 Web 开发者更熟悉的 API 调用接口。
- **Privy**：JS SDK + MPC，面向 Web3 初创项目，前端体验优秀，安全性相对次要。
- **Particle**：JS SDK + 多链支持，面向中国市场，用户主权较低但功能齐全，运行速度快。
- **Dfns**：支持 MPC、多角色权限策略与审计，面向金融机构与 RWA 项目，获法国 BPIFrance、Station F 孵化器及欧洲 Web3 基金支持。
- **Turnkey**：开发者密钥管理基础设施，强调模块化安全架构（TEE + API 密钥托管）。
*“Wormhole 在 2022 年因验证器漏洞丢了 3 亿美金，靠 VC 打钱续命；LayerZero 虽然火，但 relay 验证机制本质不透明。桥，是新一代的黑箱。”*

## 交易所
### CEX（中心化交易所）
- 用户账户资金为数据库记录，本质上用户与交易所构成“债权人-债务人”关系；
- 实际资产由交易所控制，链上资产非用户自主可控。

### DEX（去中心化交易所）
- 无中介、无审批、无客服，所有操作通过智能合约自动执行；
- 用户与合约交互直接换币，不经由中心方。

## 跨币种交易
### Getaway（加密支付入口 / 出入口）
- **On-ramp**：用法币购买加密货币；
- **Off-ramp**：将加密货币兑换回法币。
### Bridge（跨链桥）于把资产或消息从一条链安全转移到另一条链，核心是跨链通信。
  - LayerZero    通用跨链消息传递协议，支持多链通信，不限于资产转移
  - Stargate    构建于 LayerZero 之上，主打资产桥转，支持流动性共享
  - Circle CCTP    USDC 官方跨链协议，依托 Circle 直接铸造/销毁
  - Wormhole    多链资产桥，原生支持 Solana、EVM 等，安全治理结构复杂
  - portal    Wormhole 在 Solana 上的实现入口
  - deBridge    注重安全与合规的跨链桥，主打企业级场景