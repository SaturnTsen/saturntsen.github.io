---
title: UM-CV 19 Autoregressive Models, Variational Autoencoders
tags:
    - computer-vision
createTime: 2025/01/14 20:59:11
permalink: /notes/computer-vision/UMichigan-CV/um-cv-course-19-generative-models/
---

Taxonomy of generative models, Autoregressive models, Variational Inference, ELBO Optimization, Variational autoencoders, VQ-VAE

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

## Intro

1. Supervised Learning vs Unsupervised learning, density estimation,
    etc. *structure* of the data. E.g. Clustering,
  - Supervised learning: Data $(x,y)$ - learn a function to map $x\mapsto y$.
    E.g. classification, regression, detection, segmentation, captioning
    dimensionality reduction, feature
  - Unsupervised learning: Data $x$ - no labels - lean some underlying hidden
  - Usage: Assign labels to data, feature learning (with labels)
2. Discriminative vs Generative models
  - Discriminative model: learn a probability distribution $p(y|x)$ - supervised
    - "competition" between labels conditioned on input images
    - Requires deep image understanding!
    - All possible images compete with each other for probability mass
    - Usage: Detect outliers, feature learning (Unsupervised), sample to **generate** new data
  - Generative model: learn a probability distribution $p(x)$
    - **All** possible images compete with each other for probability mass.
    - Model can "reject" unreasonable inputs by assigning them small estimated
      probabilities.
  - Conditional Generative Model: learn $p(x|y)$ - mostly supervised
    - Conditioned on labels, all possible images compete.
  
<div class='img-wrapper'>
<img src="/images/um-cv-2/19-1.png" width="50%" /><br>
Fig: Recall: Bayes' Rule</div>

## Taxonomy of Generative Models

Figure adapted from Ian Goodfellow, tutorial on Generative Adversarial Net

<div class='img-wrapper'>
<img src="/images/um-cv-2/19-2.png" width="95%" /><br>
Fig: Taxonomy of Generative Models</div>

Our course: Autoregressive/VAE/GANs

## Autoregressive Models

Explicit Density Estimation

**Goal**: Write down an explicit function for $p(x)=f(x,W)$

Given dataset $x^{(1)},x^{(2)},...,x^{(N)}$, train the model by solving:

$$
W* = \arg\max_W \prod_i p(x^{(i)}) = \arg\max_W \sum_i \log p(x^{(i)})  = \arg\max_W \sum_i \log f(x^{(i)},W)
$$

Assume $x$ consists of multiple subparts: $x=(x_1,x_2,...,x_{T})$

Break down probability using the chain rule: $p(x) = p (x_1,...,x_T)=\prod_{t=1}^T p(x_t|x_1,...,x_{t-1})$

This is similar to recurrent neural networks!

### PixelRNN

Generate image pixels one at a time, starting at the upper left corner

[ICML 2016, Pixel Recurrent Neural Networks](https://arxiv.org/abs/1601.06759)

Problem: super slow, not parallelizable

### PixelCNN

<div class='img-wrapper'>
<img src="/images/um-cv-2/19-3.png" width="95%" /><br>
Fig: PixelCNN</div>

## Autoencoders

### Regular Autoencoders

<div class='img-wrapper'>
<img src="/images/um-cv-2/19-4.png" width="75%" /><br></div>

<div class='img-wrapper'>
<img src="/images/um-cv-2/19-5.png" width="75%" /><br>
Fig: Encoders</div>

Problem: Not probabilistic - No way to sample new data from learned model

### Variational Autoencoders

1. Learn latent features z from raw data
2. Sample from the model to generate new data

<div class='img-wrapper'>
<img src="/images/um-cv-2/19-6.png" width="75%" /><br>
Fig: Variational Autoencoders</div>

Train the model? Maximize likelihood of data.

<div class='img-wrapper'>
<img src="/images/um-cv-2/19-7.png" width="75%" /><br>
Fig: Encoders and decoders</div>

<div class='img-wrapper'>
<img src="/images/um-cv-2/19-8.png" width="75%" /><br>
Fig: Training autoencoders</div>


### Training with ELBO

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-1.png" width="75%" /><br>
Fig: Fully-Connected VAE</div>

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-2.png" width="75%" /><br>
Fig: Fully-Connected VAE</div>

### Generating data

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-3.png" width="75%" /><br>
Generating data</div>

### Disentangling factors of variation

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-4.png" width="75%" /><br>
Generating data</div>

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-5.png" width="35%" /><br>
Editing latent space</div>

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-6.png" width="75%" /><br>
Summary</div>

### VQ-VAE

NeurIPS 2019

VAE model to generate multi-scale grids of latent codes

PixelCNN in latent space

<div class='img-wrapper'>
<img src="/images/um-cv-2/20-7.png" width="75%" /><br>
Summary</div>

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