---
title: Paper Reading - Track4Gen
tags:
  - research
  - computer-vision
  - point-tracking
  - consistency
createTime: 2024/12/20 12:02:00
permalink: /computer-vision/paper-reading/track4gen/
---
# Track4Gen 条目笔记

## Abstract

- 提出了利用点云跟踪改善模型生成视频的一致性的方法
    
- 对原网络改动较小
    

## Intro

- appearance drift: 视频帧之间物体形状不稳定，或者发生变形。
    
- 假定物体发生变形是由于仅仅使用video diffusion loss导致的（即denoising score matching）【待查】
    
- Track4Gen解决该问题
    

## Related Work

- Diffusion-based video generation
    
    - text2img + temporal layers
        
    - cascaded approached
        
    - lower-dimensional latent space modeling (+encoder-decoder架构)
        
- Foundational models as feature extractors
    
    - vision transformers
        
    - post-processing feature maps: per-frame features from a foundational model into a 3D Gaussian representation 【待查】
        
    - “human similarity judgments” ([pdf](zotero://open-pdf/library/items/SIXV5UGS?page=2&annotation=E2VASSIH)) 【待查】
        
- Tracking any point in a video
    
    - PIP algorithm + longer temporal context
        
    - training-based trackers
        
    - synthetic videos with automantic annotations
        

## Method

### Background: Stable Video Diffusion

主要就是denoise的算法

需要查找

1. 【EDM frmaework】
    
2. “condition c refers to the CLIP image embedding”【CLIP】
    

或许实现一下更好

### Video Diffusion Features

- image diffusion虽好，但不一致