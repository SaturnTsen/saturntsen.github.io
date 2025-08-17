---
title: 加密货币祛魅 1 - 基础概念篇
createTime: 2025/04/20 21:25:18
permalink: /notes/crypto/crypto-1/
---

# 加密货币祛魅 - 基础概念篇

## 基础概念
- 区块链基础概念及非对称加密，详见3B1B。
- 区块链的两个机制：**PoW (Proof of Work) **和** PoS (Proof of Stake)**，Stake即质押。PoW采用计算量证明，对环境极不友好，消耗大量资源；PoS采博弈论保证质押代币，略微降低了安全性，但耗能大大降低。
- **Token**，即代币。
- **DID = Decentralized Identifier** = 去中心化身份凭证，币圈吹得神乎其神，说白了就是私钥公钥对。。。
  - 有一些项目把“你是谁”这件事放上链，赋予地址可识别名字、认证等功能。
  - 如：ENS    EVM    Ethereum Name Service，以太坊域名系统（xxx.eth）
  - SpaceID    BSC    BNB Chain 的 DID 服务，支持多链域名
  - SNS    Solana    Solana Name Service，支持 xxx.sol 域名
- **gas**，即交易手续费。不是固定的，而是由供需和拥堵决定的。
- **TPS = Transactions Per Second** 每秒能处理多少笔交易。“Visa   2000+ TPS，Solana 超过 50000+，但多数链在现实使用中远未达标”。
- **Altcoin** 意思是“除了比特币之外的币”；比如Solana、Avalanche、Dogecoin，这些都叫Altcoin；
-  **Layer1/Layer2**Layer1 是主链本身，负责共识、结算、数据可验证性；Layer2 是挂在主链之上的扩展层，通过把交易搬到链下或侧链处理，再提交结果回主链，换来更高 TPS 和更低 gas。

## 代币/资产的种类
- **NFT (Non-Fungible Token)** 非同质化代币，跟别人的不一样，没法互换不能拆分。
  - 人话：类似于纪念币，或者区块链上的房产证。
  - 但NFT只是链上资产的一个表现形式，但要看是否有真实资产 (Real World Asset, RWA) 映射：有，比如房产凭证，可交易、有二级市场，OK。也有纯纪念意义的代币，但非真实，存在很大风险。
- **RWA (Real World Asset)** = 把现实世界里的资产（房产、债券、股票、黄金、发票、艺术品等）用代币的形式表达出来，从而实现转让、抵押、交易、拆分、编程化管理。
- **灵魂绑定代币（SBT，Soulbound token）**
 - 人话：去不掉的纹身
  - 用途：
    - 你参与了 DAO 的贡献 → 发你一枚 SBT    履历表上的“我参与过 XX 项目”。大学给你发一个毕业 SBT（学位证书）。
    - 你在某论坛被封号，收到一枚黑历史 SBT（不良记录 + 封号警告”）
    - 你去黑客松黑了一场，被发一枚参加证明 SBT（活动纪念章）
- **LST = Liquid Staking Token = 流动性质押代币** 
   - 人话：你把币交出去，别人把你交钱的“收据”还给你，这个收据就叫 LST。如以太坊ETH质押换成stETH。
   - 那为什么大家想要这个“纸条”？因为你这张纸条每天都有利息（因为你原来的币在网络那儿生利息了）；还能随便用（不像真的 ETH 被锁起来不能动）；所以你一边吃利息，一边还能拿它去炒别的东西，多赚一层。
- **AVS（Actively Validated Services）** 是指你可以把 stETH 等流动性质押资产再质押，去为某个链上“服务系统”提供安全性，这个服务系统就叫一个 AVS。
  - 这个过程也叫**Restake**（再质押）你把质押过的 ETH 的“影子票据”（stETH、rETH）再押一次，去给别的系统用。
  - 蚂蚁金服当时就希望以这种方式把“质押安全”这种本来用来做风控的东西，反过来用来做信用放大器。后被监管叫停。

## 社群和去中心化自治组织
- **DAO（Decentralized Autonomous Organization，去中心化自治组织）** 没有老板的“链上投票型群体协作结构”，
用智能合约代替传统公司章程、用 Token 代替投票权、用社区共识代替上下级管理。
- **ERC-20** 是以太坊上的“同质化代币”合约标准，ERC-20+ 在此基础上加入额外功能