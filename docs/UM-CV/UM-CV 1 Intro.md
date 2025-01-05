---
title: UM-CV 1 Intro
tags:
  - notes
  - computer-vision
createTime: 2024/12/19 14:30:31
permalink: /computer-vision/UMichigan-CV/um-cv-course-1-intro/
---

@Credits: [EECS 498.007](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/)

Video Lecture: [UM-CV](https://www.youtube.com/watch?v=dJYGatp4SvA&list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r)

Personal work for the assignments of the course: [github repo](https://github.com/SaturnTsen/EECS-498-007/).

<!-- more -->

# Deep Learning in Computer Vision 

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

## A brief history of computer vision and deep learning

A brief history of computer vision and deep learning

### Computer Vision

- Hubel and Weisel, 1959, neural response of cats to the image patterns 
- Larry Robrets, 1963, get photographic information and features to understand pictures
- Seymour Papert, 1966, summer computer vision project. construction of a visual system. 
- David Marr, 1970s, stages of visual representation
- Brooks and Binford, 1979, Recognition via parts and human as rigid parts
- Canny and Lowe, 1987, Recognition via edge detection
- 1990s, Shi and Malik, Recognition via grouping
- 1999, SIFT, David Lowe, Recognition via Matching & design of invariant robust
  -feature vectors
- 2001 Face detection, Viola and Jones, 1st successful applications of machine learning to vision & 1st commercialization of CV
- 2007 PASCAL Visual Object Challenge
- 2009 IMAGENET, Deng, 1.4M images, 1k labels - crowdsourcing to build the dataset & Benchmark competition
    ○ Deep learning methods have significantly increased the performance
    ○ DL outperforms humans on the dataset
- 2012 Breakthrough: Alexnet, NeurIPS

### Deep Learning
- 1958 Perceptrons: One of the earliest algorithms that could learn from data,
  implemented as a piece of hardware, whose weights are stored in
  potentiometers.
- 1969 Perceptrons cannot learn the XOR function. Minsky and Papert (People
didn't realize that multi-layer perceptrons can)
- 1980 Neocognition, Computation model the visual system, inspired by hierarchy
of complex and simple cells. No efficient methods to train the model.
- 1986 Backpropagation for computing gradients in neural networks.
- 1998 Convolutional Networks: LeCun et al, 1998, deployed commercially to
  process handwriting, e.g. number recognitions (algorithm similar to AlexNet)
- 2000 Deep Learning, Hinton and Salakhutdinov: Deep - multi-layer
- 2012 AlexNet trained on ImageNet
- 2012-Present ConvNets are everywhere
  - 2015 YOLO
  - 2016 AlphaGo
  - 2017 Transformer
  - 2017 AlphaFold
  - 2018 Turing Award: Yoshua Bengio, Geoffrey Hinton, Yann LeCun
  - 2022 Stable Diffusion
- Computer Vision still has a long way to go…
  - Context aware & Semantic aware
  - Physics+

### Why Breakthrough in 2012?
    - Algorithm
    - Massive Dataset
    - Computing Power

### Course overview and logistics
