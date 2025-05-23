---
title: 加密货币祛魅 5 - 监管与合规篇
createTime: 2025/04/20 21:25:42
permalink: /notes/crypto/crypto-5/
---


# 加密货币祛魅 5 - 监管与合规篇

## 关于金融监管
- **FATF = Financial Action Task Force**，金融行动特别工作组
- **KYC（Know Your Customer）**：金融系统要求服务提供方必须“知道你是谁”，通过身份验证、风险评估、记录存档来防止洗钱、诈骗、制裁规避等非法行为。本质上是一个由37个国家组成的国际政策协调小组，负责制定全球反洗钱（AML）、反恐融资（CFT）等规则。
  - 你得告诉我你是谁，不然我怕你是洗黑钱的
- **AML = Anti-Money Laundering**，反洗钱法规体系
  - 我怕你拿毒贩的钱买房子，所以要多问几句
- **CDD = Customer Due Diligence**，客户尽职调查
 - “我不只是问你是谁，还要你拿出证据证明你是谁、你在哪、钱从哪来。”
- **PEP = Politically Exposed Person**，政治公众人物
  - 指的是那些“有可能利用职权搞钱”的人
  - “你爸是市长？你哥在中东搞军火？那你买基金之前我们得重点盯你。”
- **EDD = Enhanced Due Diligence**，强化尽职调查
  - 如果客户被列为高风险，比如 PEP、离岸公司、资金异常，就必须启动比 CDD 更深层的调查。
  - “你太不正常了，我们要多问几句，不然我们可能吃官司。”

*“链上的自由梦，链下的许可证”*

## 1. 所谓“去中心化”，最后都要办牌照

- **KYC（Know Your Customer）**：身份实名验证，CEX 强制，部分 DEX 开始引入；
- **AML（反洗钱）制度**：要求交易平台监控可疑交易、冻结风险资产；
- **Travel Rule（金融行动特别工作组 FATF）**：超过一定金额的交易必须披露双方身份信息；
- **现实：你链上搞的再花哨，最终还是要接入银行账户，接受监管身份认证。**

> 人话：你想上车，得先办证；不办证，堵你出口。

## 2. 各国监管分层现状概览

| 国家/地区 | 主体监管机构 | 合规重点 | 状态 |
|-----------|----------------|------------|------|
| **美国** | SEC（证券）、CFTC（商品）、FinCEN（AML） | 是否是证券？合规牌照？ | 高压、多头执法 |
| **欧盟** | ESMA、MiCA（加密资产市场监管） | 统一加密资产定义与准入流程 | 建立中，较明确 |
| **法国** | AMF（金融市场管理局） | DASP 注册制，RWA 管控逐步推进 | 接近 MiCA 合规试验田 |
| **新加坡** | MAS | 反洗钱、机构入场牌照制 | 开放但合规严谨 |
| **中国大陆** | 全面封禁交易，允许链上技术实验 | 无法进行公开 Token 操作 | 强管控，灰色存在 |

## 3. 合规赛道的结构陷阱

**所谓合规创新，大多是“监管套利”**：
 - 比如 CEX 开在开曼、注册在 BVI，实际营运在新加坡或迪拜；
 - 用 DAO 结构假装无法人控制，实则内部控制人手握治理票；
 - RWA 合规包装实为链上转债+链下 PDF 协议，形式合规，实质非法集资风险。

> “披着 DAO 的皮，卖着证券的肉。”

## 4. 合规标的的典型伪命题

### RWA（现实资产映射）
> “你说这是‘上链黄金’，监管问你：你金条存哪儿？谁监管？谁赔付？”

### Stablecoin（稳定币）
> USDC：Circle+银行审计+监管账户  
> USDT：混乱披露+商业票据+多地操作  
> **结论：你用的是链上稳定币，但你信的是链下美元托管**

## 5. 没有监管的自由，是系统性风险的预设

- FTX 崩盘：CEX无托管监管，用户资金挪用；
- Terra 崩盘：算法稳定币无人监管，套利机制失控；
- Tornado Cash：智能合约无法识别用户，但开发者被美国财政部定罪；

“你以为监管束缚了自由，现实是自由没有制度托底就是灾难。”
