---
title: UM-CV 5 & 6 Neural Networks and Back Propagation
tags: 
  - notes
  - computer-vision
createTime: 2024/12/21 17:34:25
permalink: /computer-vision/UMichigan-CV/um-cv-course-5-neural-networks/
---

@Credits: [EECS 498.007](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/)

Video Lecture: [UM-CV 5 Neural Networks](https://www.youtube.com/watch?v=g6InpdhUblE&list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r&index=6)

Personal work for the assignments of the course: [github repo](https://github.com/SaturnTsen/EECS-498-007/).

# Neural Networks

Linear classifiers are limited to their linear decision boundaries. Neural networks are more flexible and can learn more complex decision boundaries.

<!-- more -->

## Feature extraction

**Color histograms, HOG, SIFT, etc. (2000-2010)**
- Color histograms - Statistical Method
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
- Inside a neuron, signals are computed by complex processes
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

**Theorem**: A single layer neural network with ReLU activation is a convex function of its weights.

No such guarantee for non-linear networks.

Neural net losses sometimes look convex-ish.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/5-9.png" width="30%" alt="loss surface 1"  /> <img src="/images/um-cv/5-10.png" width="30%" alt="loss surface 2"  /><br>
Fig: loss surfaces</div>

Open question: theoretical properties of the optimization landscape of neural networks.

## Summary of lecture 5

- Feature transform
- Neural networks
- Activation functions
- Biological neurons
- Space warping
- Universal approximation
- Convergence of neural networks

## Backpropagation

**Problem**: How to compute the gradient of the loss function with respect to the weights?

#### (Bad) Idea: Derive $\frac{\partial L}{\partial W}$ by hand

See what I have done [Derive gradient by hand](/mathematics/gradient-chain-rule-matrix-gradients-deep-learning/)

### Computational graphs

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-1.png" width="50%" alt="computation graphs"  /><br>
Fig: computational graph of a SVM
</div>

This is critical for large neural networks, e.g. AlexNet or Recurrent Neural Turing Machine...


<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-2.png" width="50%" alt="AlexNet"  /><br>
Fig: AlexNet
</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-3.png" width="50%" alt="Recurrent Neural Turing Machine"  /><br>
Fig: Recurrent Neural Turing Machine
</div>


### Examples

#### Example 1
$$
f(x, y, z) = (x + y)z \quad x=-2, y=5, z=-4
$$

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-4.png" width="50%" /><br>
Fig: Backpropagation example 1
</div>

1. Forward pass: Compute outputs $q = x + y$ and $f = qz$
2. Backward pass: Compute gradients $\frac{\partial f}{\partial q}$ and $\frac{\partial f}{\partial z}$ 

$$
\frac{\partial f}{\partial f} = 1 \quad \frac{\partial f}{\partial q} = z \quad \frac{\partial f}{\partial z} = q
$$

$$
\frac{\partial f}{\partial x} = \frac{\partial f}{\partial q} \frac{\partial q}{\partial x} = z \cdot 1 = -4
$$

$$
\frac{\partial f}{\partial y} = \frac{\partial f}{\partial q} \frac{\partial q}{\partial y} = z \cdot 1 = -4
$$

We can compute local gradient of one node and the chain rules can be implemented as modules.


<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-5.png" width="40%" /><br>
Fig: local gradient computation
</div>

#### Example 2

$$
f(x,w) = \frac{1}{1 + e^{-(w_0x_0+w_1x_1)}}
$$

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-6.png" width="60%" /><br>
Fig: Backpropagation example 2
</div>

We can also choose more primitive functions for which the gradients are easy to compute.

e.g. Sigmoid functions

$$
\sigma(x) = \frac{1}{1 + e^{-x}} \quad
\frac{d\sigma}{dx} = \sigma(x)(1 - \sigma(x))
$$

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-7.png" width="60%" /><br>
Fig: Sigmoid function
</div>

### Pattern in gradient Flow

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-8.png" width="60%" /><br>
Fig: Patterns in Gradient flow
</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-9.png" width="60%" /><br>
Fig: Backprop Implementation
</div>

### Modular Implementation

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-10.png" width="60%" /><br>
Fig: Modular Implementation
</div>


<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-11.png" width="60%" /><br>
Fig: Backpropagation of Sigmoid function
</div>

### Backpropagation for vector-based functions

In this course, the jacobian matrix is the transpose of that in mathematics...

$$
\frac{\partial f}{\partial x} = \begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_1} \\
\vdots & \ddots & \vdots \\
\frac{\partial f_1}{\partial x_n} & \cdots & \frac{\partial f_m}{\partial x_n}
\end{bmatrix}\in\mathbb{R}^{n\times m}
$$

Local gradient calculation:

Let $f$ be a vector-valued function $f: \mathbb{R}^n \to \mathbb{R}^m$, and $y = f(x)$. Suppose we have calculated $\frac{\partial l}{\partial y}\in\mathbb{R}^{m}$, then

$$
\underbrace{\frac{\partial l}{\partial x}}_{\text{grad\_x}} = \underbrace{\frac{\partial f}{\partial g}(x)}_{\text{local grad module}}\cdot \underbrace{\frac{\partial l}{\partial y}}_{\text{grad\_y}}(y)
$$

Again we have omitted transposing $\frac{\partial l}{\partial y}$.

In practice, we never actually compute the jacobian matrix, but instead compute the product of the jacobian and a vector.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-12.png" width="70%" /><br>
Fig: Backpropagation for vectors
</div>

### Backpropagation for Matrices (or Tensors)

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-13.png" width="70%" /><br>
Fig: Backpropagation with Matrices
</div>

How to generalize the matrix product?

We can use the [Einstein summation convention](https://en.wikipedia.org/wiki/Einstein_notation) to generalize the matrix product.

Let $X\in\mathbb{R}^{m\times n}$ and a matrix function $Y=f: \mathbb{R}^{m\times n} \to \mathbb{R}^{p\times q}$. Suppose we have calculated $\frac{\partial l}{\partial Y}\in\mathbb{R}^{p\times q}$, then

$$
\frac{\partial l}{\partial X} = \frac{\partial f}{\partial X}(X) \cdot \frac{\partial l}{\partial Y}
$$

where $\frac{\partial f}{\partial X}(X)$ is a tensor of shape $(m, n, p, q)$.

With the [Einstein summation convention](https://en.wikipedia.org/wiki/Einstein_notation), we can write this as

$$
\frac{\partial l}{\partial X}_{ij} = \frac{\partial f_{kl}}{\partial X_{ij}} \frac{\partial l}{\partial Y_{kl}}
$$

The trick here is to find a quick way to carry out the computation implicitly without actually constructing the jacobian tensor.

### Reverse-Mode Automatic Differentiation

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-14.png" width="70%" /><br>
Fig: Reverse-Mode Automatic Differentiation
</div>

### Forward-Mode Automatic Differentiation

This is used when the input is a scalar.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-15.png" width="70%" /><br>
Fig: Backpropagation with Matrices
</div>

### Backprop: Higher-Order Derivatives

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-16.png" width="70%" /><br>
Fig: Higher-Order Derivatives
</div>

If we want to calculate the Hessian/vector product, we can construct this by hand.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/6-17.png" width="70%" /><br>
Fig: Application of Higher-Order Derivatives as a penalization
</div>

## Summary of lecture 6

- Backpropagation
- Computational graphs
- Examples of backpropagation
- Gradient flow patterns
- Modular implementation
- Backpropagation for vector-based functions
- Backpropagation for matrices (or tensors)
- Reverse-mode automatic differentiation
- Forward-mode automatic differentiation
- Higher-order derivatives