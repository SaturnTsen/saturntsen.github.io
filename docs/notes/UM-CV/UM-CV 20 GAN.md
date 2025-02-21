---
title: UM-CV 20 Generative Adversarial Networks
tags:
    - computer-vision
createTime: 2025/01/14 20:59:11
permalink: /notes/computer-vision/UMichigan-CV/um-cv-course-19-GAN/
---

Generative adversarial networks: architecture, training objective, optimality, and variants of GANs.

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

## Generative Adversarial Networks

Setup: Assume we have data $x_i$ drawn from distribution $p_{data}(x)$. Want to
sample from $p_{data}$


### Architecture

Idea: Introduce a latent variable $z$ with simple prior $p(z)$
- Sample $z\sim p(z)$ and pass to a **Generator Network** $x=G(z)$
- Then $x$ is a sample from the **generator distribution** $p_G$. Want $p_G=p_{data}$
- The Discriminator Network $D$ is trained to classify data as real or fake

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-8.png" width="85%" /><br>
GAN</div>

### Training Objective

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-9.png" width="85%" /><br>
GAN: Training Objective</div>

Problems:

- We are not minimizing any overall loss, and there is no training curves to look at.
- Vanishing gradients for G: <img src="/images/um-cv-2/20-11.png" width="85%" />

### Optimality

#### Optimal Discriminator

This expression cannot be computed since it involves $p_{data}$。

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-12.png" width="85%" /><br>
GAN: Optimal Discriminator</div>

#### Optimality

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-13.png" width="85%" /><br>
GAN: Jensen-Shannon Divergence</div>

#### Summary

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-14.png" width="85%" /><br>
GAN: Jensen-Shannon Divergence</div>

## Variants of GAN

### DC-GAN

[Radford et al, ICLR 2016](https://arxiv.org/abs/1511.06434)

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-15.png" width="85%" /><br>
Fun facts</div>

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-16.png" width="85%" /><br>
Fun facts</div>

### Conditional GANs

[A style-based generator architecture for generative adversarial networks, CVPR 2019](https://arxiv.org/abs/1812.04948)

[A learned representation for artistic style, ICLR 2017](https://arxiv.org/abs/1610.07629)

Conditional batch normalization

### BigGAN

[Large Scale GAN Training for High Fidelity Natural Image Synthesis](https://arxiv.org/abs/1809.11096)

### Generating Videos with GANs

[Adversarial Video Generation on Complex Datasets, Arxiv 2019](https://arxiv.org/abs/1907.06571)

### Text2Img

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-17.png" width="85%" /><br>
</div>

Zhang et al, “StackGAN++: Realistic Image Synthesis with Stacked Generative
Adversarial Networks.”, TPAMI 2018

Zhang et al, “StackGAN: Text to Photo-realistic Image Synthesis with Stacked
Generative Adversarial Networks.”, ICCV 2017

Reed et al, “Generative Adversarial Text-to-Image Synthesis”, ICML 2016

### Super-resolution

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-18.png" width="85%" /><br>
</div>

Ledig et al, “Photo-Realistic Single Image Super-Resolution Using a Generative
Adversarial Network”, CVPR 2017

### Pix2Pix

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-19.png" width="85%" /><br>
</div>

Isola et al, “Image-to-Image Translation with Conditional Adversarial Nets”,
CVPR 2017

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-20.png" width="85%" /><br>
</div>

Zhu et al, “Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks”, ICCV 2017

### Label Map to Img

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-21.png" width="85%" /><br>
</div>

Park et al, “Semantic Image Synthesis with Spatially-Adaptive Normalization”,
CVPR 2019

### Trajectory Prediction

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-22.png" width="85%" /><br>
</div>

Gupta, Johnson, Li, Savarese, Alahi, “Social GAN: Socially Acceptable Trajectories with Generative Adversarial Networks”, CVPR 2018

## **Notice on Usage and Attribution**

This note is based on the **University of Michigan's publicly available course
EECS 498.008 / 598.008** and is intended **solely for personal learning and
academic discussion**.
- **Nature of the Notes:** These notes include extensive references and
  citations from course materials to ensure clarity and completeness. However,
  they are presented as personal interpretations and summaries, not as
  substitutes for the original course content. Please refer to the official
  [**University of Michigan
  website**](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/) for
  complete and accurate course materials.  
- **Third-Party Open Access Content:** This note may reference Open Access (OA)
  papers or resources cited within the course materials. These materials are
  used under their original Open Access licenses (e.g., CC BY, CC BY-SA). Every
  referenced OA resource is appropriately cited, including the author,
  publication title, source link, and license type.  
- **Copyright:** All rights to third-party content remain with their respective
  authors or publishers. If you believe any content infringes on your copyright,
  please contact me, and I will promptly remove the content in question.

Thanks to the **University of Michigan** and the contributors to the course for
their openness and dedication to accessible education. 