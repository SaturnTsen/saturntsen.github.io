---
title: Paper reading - SAM2
createTime: 2025/01/21 22:01:23
permalink: /computer-vision/paper-reading/SAM2/
---

Segment Anything 笔记

This article is a draft converted from my Zotero notes, and the content is still not organized.

# Intro

1. Segment ANYTHING: 没有foregound+标签的形式，而是给图像中的所有部分做分割
    
2. Promptable：Masklet 用户提示
    
3. Unified Img & Video Seg: memory
    
4. 提到了data engine
    

# Related Work

Image Segmentation: 介绍了基于用户提示的分割方法，以及基于SAM的遥感等

Interactive Video Object Segmentation 介绍了可交互（用户点击或画RoI）的视频分割方法，以及propagation和video trackers. Meta构建了一个统一视频和图像的分割方法。反正是各种方法。

“Video Object Segmentation (VOS).” ([pdf](zotero://open-pdf/library/items/3ZLDSFWT?page=3)) 普通的视频分割方法. 给定第一帧的mask，在整个视频下track - semi-supervised VOS **VOS**: 任务重点是从视频的第一帧开始跟踪目标，并在后续帧中准确分割目标。

- Oneline fine-tuning on the first video frame
    
- faster inference conditioned on the first frame
    
- integrating the previous frame
    
- RNNs & transformers
    

**PVS**: 广义任务框架，可以适应包括VOS在内的各种视觉分割任务，支持不同类型的提示（例如文本、边框、点）“Promptable Visual Segmentation (PVS)” 

**VideoSeg Datasets**

- “DAVIS (Pont-Tuset et al., 2017; Caelles et al., 2019)” 
    
- “YouTube-VOS” 
    
- “increasing the difficulty of the VOS task by specifically focusing on occlusions (Qi et al., 2022; Ding et al., 2023), long videos (Hong et al., 2023, 2024), extreme transformations (Tokmakov et al., 2022), object diversity (Wang et al., 2021b, 2023) or scene diversity (Athar et al., 2022)” [Ravi 等, 2024, p. 3]
    

# Structure

类似于RNN的结构？Not parallelizable?

**用户可实时调整**，不知道技术细节是什么

# Task

- “providing prompts to the model on any frame of a video” 
    
- “positive/negative clicks, boxes, or masks” 
    
- “After receiving initial prompts (either on the same frame or different frames), the model should propagate these prompts to obtain the masklet of the object across the entire video” 

- 这里没什么信息量。详见附录
    
- Evaluation
    
    “evaluate the model (§6)”
    

# Model

[Ravi 等, 2024, p. 5]

“conditioned on memories” “and prompted frames”  没什么信息量，如图所见。

**Image encoder:** Run only once!!

- “We use an MAE (He et al., 2022) pre-trained Hiera (Ryali et al., 2023; Bolya et al., 2023) image encoder”,
    
- “Videos are processed in a streaming fashion with frames being consumed one at a time by the image encoder, and cross-attended to memories” 这里具体什么是straming fashion要仔细看下
    

**Memory attention**

- “condition the current frame features on the past frames features” 嗯有causality
    
- “We **stack L transformer blocks**, the first one taking the image encoding from the current frame as input. Each block performs **self-attention**, followed by **cross-attention to memories** of (prompted/unprompted) frames and object pointers (see below)”
    

**Prompt Encoder**

- 对于points、box和mask有不一样的处理方法 “Sparse prompts are represented by positional encodings summed with learned embeddings for each prompt type, while masks are embedded using convolutions and summed with the frame embedding.”
    

**Mask decoder**

“We stack “two-way” transformer blocks that update prompt and frame embeddings. As in SAM, for ambiguous prompts (i.e., a single click) where there may be multiple compatible target masks, we predict multiple masks.” 从prompt和frame embedding开始

提到了在视频中可能某几帧没有positive instance

**Memory bank**

“FIFO queue of memories of up to N recent frames”
“not into those of prompted frames” 这个设计很新奇，但不知道为什么有用

**训练**

方法 “simulate interactive prompting of the model.” 

“8 frames and randomly select up to 2 frames” “probabilistically receive corrective clicks”

任务 “predict the ground-truth masklet” 