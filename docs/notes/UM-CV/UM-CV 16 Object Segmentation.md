---
title:  16 Object Semantic Segmentation
tags:
  - computer-vision
createTime: 2024/12/29 11:01:56
permalink: /notes/um-cv/um-cv-16/
outline: [2, 4]
---

## Summary

Many Computer Vision Tasks: Classification, Semantic Segmentation, Object Detection, Instance Segmentation, Key Point Estimation, Dense Captioning, etc.

<!-- more -->

@Credits: [EECS 498.007](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/) | 
Video Lecture: [UM-CV](https://www.youtube.com/watch?v=dJYGatp4SvA&list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r) 

Personal work for the assignments of the course: [github repo](https://github.com/SaturnTsen/EECS-498-007/).

**Notice on Usage and Attribution**

These are personal class notes based on the University of Michigan EECS 498.008
/ 598.008 course. They are intended solely for personal learning and academic
discussion, with no commercial use.

For detailed information, please refer to the **[complete notice at the end of
this document](#notice-on-usage-and-attribution)**


## Object Segmentation

Label each pixel in an image with a category label. Do not differentiate
instances, only care about pixels.

Intuition: Sliding window classifier, but for each pixel.

### Fully Convolutional Networks (FCNs)

The size of the output is the same as the input. Make predictions for pixels all
at once!

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-1.png" width="60%" alt="FCNs"  /><br>
Fig: FCNs </div>

[Long et al. 2015](https://arxiv.org/abs/1411.4038) proposed FCNs for semantic
Segmentation

**Problems**
1. Effective receptive field size is linear in number of conv layers: With L 3x3
   conv layers, the receptive field is 1+2L
2. Convolution on high res images is expensive 

With down sampling and upsampling inside the network.

[Noh et al, Learning Deconvolution Network for Semantic Segmentation"](https://arxiv.org/abs/1505.04366)

### Unpooling

Bed of Nails,KNN, Bilinear Interpolation

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-2.png" width="60%" alt="Unpooling"  /><br>
Fig: Unpooling </div>

Cubic Interpolation, Bicubic Interpolation (两次立方)

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-3.png" width="60%" alt="Cubic Interpolation"  /><br>
Fig: Cubic Interpolation </div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-4.png" width="40%" alt="Bicubic Interpolation"  /><br>
Fig: Bicubic Interpolation </div>

Max Unpooling: Remember the location of the max value in the pooling layer and put it back in the unpooling layer.

[Noh et al, Learning Deconvolution Network for Semantic Segmentation](https://arxiv.org/abs/1505.04366)

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-5.png" width="60%" alt="Max Unpooling"  /><br>
Fig: Max Unpooling </div>

Pair each downsampling layer with an upsampling layer.

### Transposed Convolution (Deconvolution)

Idea: Convolution with stride > 1 is "learnable downsampling", can we use stride < 1 for "learnable upsampling"?

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-6.png" width="40%" alt="Transposed Convolution"  /><br>
Fig: Transposed Convolution </div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-7.png" width="60%" alt="Transposed Convolution"  /><br>
Fig: Transposed Convolution </div>

## Instance Segmentation 

Semantic segmentation merges objects of the same class.

Things and stuff: Things are object categories that can be separated into object instances, while stuff is object categories that cannot be separated into object instances.(e.g. sky, grass)

Object Detection: Detects individual object instances, but only gives box (Only things!)

Semantic Segmentation: Gives per-pixel labels that does not differentiate between instances.

Instance Segmentation: Detect all objects in the image and identify the pixels that belong to each object. 

Approach: Perform object detection, then predict a segmentation mask for each object.

### Mask R-CNN

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-8.png" width="70%" alt="Mask R-CNN"  /><br>
Fig: Mask R-CNN </div>

[ICCV 2017](https://arxiv.org/abs/1703.06870)

1. Region Proposal Network (RPN): Predicts bounding boxes
2. Semantic Segmentation for each bounding boxes

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-9.png" width="70%" alt="Example Targets"  /><br>
Fig: Example Targets </div>

## Panoptic Segmentation

Panoptic 中文的意思是全景，全视角的意思。

Label all pixels in the image, and for thing categories, differentiate between instances.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-10.png" width="70%" alt="Panoptic Segmentation"  /><br>
Fig: Panoptic Segmentation </div>

[CVPR 2019: Panoptic Feature Pyramid Networks](https://arxiv.org/abs/1901.02446)

## Beyond Instance Segmentation

### Key Point Estimation

Predict the location of key points on an object.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-11.png" width="70%" alt="Key Point Estimation"  /><br>
Fig: Key Point Estimation </div>

Mask R-CNN: key points

- Add a keypoint head to predict the location of key points

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv-2/16-12.png" width="70%" alt="Mask R-CNN Key points"  /><br>
Fig: Mask R-CNN Key points </div>

Joint Instance Segmentation and Keypoint (Pose) Estimation

General Idea: Add Per-region "Heads" to Faster/ Mask R-CNN!

### Dense Captioning

[CVPR 2017: DenseCap](https://arxiv.org/abs/1511.07571)

### 3D Shape Prediction: Mask R-CNN + Mesh Head


## **Notice on Usage and Attribution**

This note is based on the **University of Michigan's publicly available course EECS 498.008 / 598.008** and is intended **solely for personal learning and academic discussion**, with no commercial use.
- **Nature of the Notes:** These notes include extensive references and citations
  from course materials to ensure clarity and completeness. However, they are
  presented as personal interpretations and summaries, not as substitutes for
  the original course content.
- **Original Course Resources:** Please refer to the official [**University of
  Michigan website**](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/) for complete and accurate course materials.  
- **Third-Party Open Access Content:** This note may reference Open Access (OA)
  papers or resources cited within the course materials. These materials are
  used under their original Open Access licenses (e.g., CC BY, CC BY-SA).  
- **Proper Attribution:** Every referenced OA resource is appropriately cited,
  including the author, publication title, source link, and license type.  
- **Copyright Notice:** All rights to third-party content remain with their
  respective authors or publishers.  
- **Content Removal:** If you believe any content infringes on your copyright,
  please contact me, and I will promptly remove the content in question.

Thanks to the **University of Michigan** and the contributors to the course for
their openness and dedication to accessible education. 
