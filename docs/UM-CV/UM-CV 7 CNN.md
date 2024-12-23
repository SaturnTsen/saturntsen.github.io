---
title: UM-CV 7 CNN
tags: 
  - notes
  - computer-vision
createTime: 2024/12/21 17:34:25
permalink: /computer-vision/UMichigan-CV/um-cv-course-7-CNN/
---

@Credits: [EECS 498.007](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/)

# Convolutional Neural Networks

Problem: All of the previous models flattens the input image into a vector. This loses the spatial structure of the image. CNNs are designed to work with image data directly.

## Components of CNN:

- Convolutional Layers
- Pooling Layers
- Normalization Layers

### Convolution Layer

Image: 3x32x32

Filter: 3x5x5 Convolve the filter with the image to get a dot product. The filter is convolved with the image by sliding it across the image. The output is a 1x28x28 map.

We have multiple (for example 6) filters, each filter produces a different output. The output of the convolutional layer is a stack of 6 (28x28) maps.


### Pooling Layer

The pooling layer is used to reduce the spatial dimensions of the input. It is used to reduce the number of parameters and computation in the network. It also helps in controlling overfitting.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/7-1.png" width="70%" alt="description"  /><br>
Fig: General form of convolutional layer</div>

