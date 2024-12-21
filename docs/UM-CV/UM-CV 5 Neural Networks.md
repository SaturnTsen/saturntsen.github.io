---
title: UM-CV 5 Neural Networks
tags: 
  - notes
  - computer-vision
createTime: 2024/12/21 17:34:25
permalink: /computer-vision/UMichigan-CV/um-cv-course-5-neural-networks/
---

@Credits: [EECS 498.007](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/)

Video Lecture: [UM-CV 5 Neural Networks](https://www.youtube.com/watch?v=g6InpdhUblE&list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r&index=6)

<!-- more -->

# Neural Networks

Linear classifiers are limited to their linear decision boundaries. Neural networks are more flexible and can learn more complex decision boundaries.

## Feature extraction

**Color histograms, HOG, SIFT, etc. (2000-2010)**
- Color histograms - Statiscal Method
- HOG: Histogram of Oriented Gradients
  - Compute edge direction/strength at each pixel
- Bag of Words(Data-Driven) - Clustering
  1. Extract random patches from images &Cluster patches into "codebook" of visual words
  3. Encode each image as histogram of visual words
- Concatenate features together - Different methods can capture different features of the image

**2011 ImageNet Winner: A complicated feature extractor**

SIFT: Scale-Invariant Feature Transform 128-D vector

color: 96-D vector

Reduced to 64-D with PCA

FV extraction and compression

One-vs-all SVM learning with SGD

Late fusion of SIFT and color systems

Problem: These complicated systems are not designed to directly minimize the classification error!

**AlexNet: Deep Learning (2012)**

Deep Neural Networks (DNNs) are end-to-end trainable!

<div style="text-align:center;">
  <img src="/images/um-cv/um-cv-5-1.png" width="50%" alt="description"  /><br>
Fig: AlexNet</div>

## Neural Networks

(Before) Linear score function: $f(x, W) = Wx$

(Now) 2-layer Neural Network: $f(x, W) = W_2\max(0, W_1x)$

where $x\in\mathbb{R}^D$,$W_1\in\mathbb{R}^{H\times D}$, $W_2\in\mathbb{R}^{C\times H}$

or 3-layer Neural Network

$$
f(x, W) = W_3\max(0, W_2\max(0, W_1x))
$$

<div style="text-align:center;">
  <img src="/images/um-cv/um-cv-5-2.png" width="50%" alt="data flow"  /><br>
Fig: Data Flow</div>

### Deep Neural Networks

Each output is affected by each input: Fully connected network (or MLP - Multi-Layer Perceptron), and templates (each row of the matrix $W$) are combined layerwise.

 <div style="text-align:center;">
  <img src="/images/um-cv/um-cv-5-3.png" width="85%" alt="Deep neural networks"  /><br>
Fig: DNN</div>

### Activation Functions

Add non-linearity to the network. Without non-linearity, the network would be equivalent to a single layer.

**The most widely used: ReLU (Rectified Linear Unit)**

$$
\text{ReLu}(x) = \max(0, x)
$$

**Sigmoid**

$$
\sigma(x) = \frac{1}{1+e^{-x}}
$$

**Tanh**

$$
\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$

**Leaky ReLU**

$$
\text{Leaky ReLU}(x) = \max(0.01x, x)
$$

**Maxout**

$$
\text{Maxout}(x) = \max(w_1^Tx + b_1, w_2^Tx + b_2)
$$

**ELU**

$$
\text{ELU}(x) = \begin{cases}
x & \text{if } x > 0 \\
\alpha(e^x - 1) & \text{if } x \leq 0
\end{cases}
$$

### Neural Network in < 20 lines!

```python
import numpy as np
from numpy.random import randn
N, Din, H, Dout, = 64, 1000, 100, 10
x, y = randn(N, Din), randn(N, Dout)
w1, w2 = randn(Din, H), randn(H, Dout)
learning_rate = 1e-6
for t in range(10000):
  h = 1/(1 + np.exp(-x.dot(w1)))
  y_pred = h.dot(w2)
  loss = np.square(y_pred - y).sum()
  grad_y_pred = 2.0 * (y_pred - y)
  grad_w2 = h.T.dot(grad_y_pred)
  grad_h = grad_y_pred.dot(w2.T)
  grad_w1 = x.T.dot(grad_h * h * (1 - h))
  w1 -= learning_rate * grad_w1
  w2 -= learning_rate * grad_w2
```

### Analogy: Biological Neurons

Our brains are made of neurons. Impulses are carried away from cell body. Dendrites receive impulses from other neurons. Synapses are connections between neurons.

<div style="text-align:center;">
  <img src="/images/um-cv/um-cv-5-4.png" width="50%" alt="Biological Neurons"  /><br>
Fig: Biological Neurons</div>

Differences between biological and artificial neurons
- Biological neurons have complex connectivity patterns
- Inside a neuron, signals are computated by complex processes
- Artificial neurons are organized into regular layers for computational efficiency

Fun fact: But neural networks with random connectivity can still learn!

### Space Warping

A linear layer cannot improve the representation power of the classifier, but with a non-linear transform in between, the classifier can learn more complex decision boundaries.

Explanation: [Space Warping](https://distill.pub/2018/building-blocks/)

<div style="text-align:center;">
  <img src="/images/um-cv/um-cv-5-5.png" width="50%" alt="Space Warping"  /><br>
Fig: Space Warping</div>

Points can be linearly separable in a higher-dimensional space.

Technique: Don't regularize with size; instead use stronger L2.

### Universal Approximation

A neural network with a single hidden layer can approximate any **continuous** function to arbitrary accuracy (uniformly convergent), on **compacts** of $\mathbb{R}^n$.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/5-7.png" width="80%" alt="Universal Approximation"  /><br>
Fig: Universal Approximation</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/5-8.png" width="30%" alt="Bump function as basis"  /><br>
Fig: Bump function as basis</div>

See Nielsen's [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/chap4.html) for more details.

Reality check: Networks don't really learn bumps!

But the theorem does not tell us how to find the right weights, given that $f$ is unknown a priori.

### Convergence of Neural Networks

**Definition**: (Convexity) A function $f: \mathbb{R}^D \to \mathbb{R}$ is convex if for all $x, y \in \mathbb{R}^D$ and $t \in [0, 1]$, we have

$$
f(t x + (1 - t)y) \leq t f(x) + (1 - t)f(y)
$$ 

**Theorem**: Linear networks are convex in the weights.

No such guarantee for non-linear networks.

Neural net losses sometimes look convex-ish.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/5-9.png" width="30%" alt="loss surface 1"  /> <img src="/images/um-cv/5-10.png" width="30%" alt="loss surface 2"  /><br>
Fig: loss surfaces</div>

Open question: theorectical properties of the optimization landscape of neural networks.

## Summary

- Feature transform
- Neural networks
- Activation functions
- Biological neurons
- Space warping
- Universal approximation
- Convergence of neural networks