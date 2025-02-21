---
title: Two-layer MLP backpropagation using differential forms - Matrix Gradients by hand in Deep Learning (1)
tags:
  - mathematics
  - machine-learning
  - deep-learning
createTime: 2024/12/22 19:26:16
permalink: /notes/computer-vision/UMichigan-CV/gradient-chain-rule-matrix-gradients-deep-learning/
---

> <Badge type="danger" text="TL;DR" /> This article is a deep dive into the calculation of the gradient of a function defined on a matrix space. We will see how to define a differential form and how to calculate the gradient of a function defined on a matrix space. We will also see how to apply the chain rule in deep learning. We will see how to calculate the gradient of a neural network with a two-layer architecture.

We suppose that all functions are differentiable.

<!-- more -->

## Introduction: Jacobian and gradient for vector functions

This section can be skipped if the reader is not familiar with differential geometry or the concept of the differential form.

From a higher point of view, the gradient, in finite dimensions or [Hilbert Spaces](https://en.wikipedia.org/wiki/Hilbert_space), is the vectorial representation of a linear form in the [dual space](https://en.wikipedia.org/wiki/Dual_space) of the [tangent space](https://en.wikipedia.org/wiki/Tangent_space). See [Riesz representation theorem](https://en.wikipedia.org/wiki/Riesz_representation_theorem).

Thus, the gradient here is supposed to have the same dimension as the domain of the function.

Consider a function $f: \mathbb{R}^n \to \mathbb{R}^m$, the Jacobian matrix of $f$ is the matrix of all first-order partial derivatives of $f$.

$$
J(f) = \begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_n} \\
\vdots & \ddots & \vdots \\
\frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_n}
\end{bmatrix}
$$

Consider a scalar function $g: \mathbb{R}^n \to \mathbb{R}$, the gradient of $g$ is the transpose of the Jacobian matrix of $g$.

$$
\nabla g = J(g)^\top =
\begin{bmatrix}
\frac{\partial g}{\partial x_1} &
\cdots &
\frac{\partial g}{\partial x_n}
\end{bmatrix}^\top
=
\begin{bmatrix}
\frac{\partial g}{\partial x_1} \\
\vdots \\
\frac{\partial g}{\partial x_n}
\end{bmatrix}
$$

The famous chain rule of differentiation can be expressed in terms of the Jacobian matrix.

Let $f: \mathbb{R}^n \to \mathbb{R}^m$ and $g: \mathbb{R}^m \to \mathbb{R}^p$, then the Jacobian matrix of the composition $g \circ f$ is the product of the Jacobian matrices of $f$ and $g$.

$$
J(g \circ f)(x) = J(g)(f(x)) \cdot J(f)(x)
$$

Thus we have to be careful with the order of the Jacobian matrices when applying the chain rule with the gradient.

Let $f: \mathbb{R}^n \to \mathbb{R}^m$ and $g: \mathbb{R}^m \to \mathbb{R}$, then the gradient of the composition $g \circ f$ is the product of the gradient of $f$ and the Jacobian matrix of $g$.

$$
\nabla (g \circ f) =  (J(g)\cdot J(f))^\top = J(f)^\top \cdot J(g)^\top = (\nabla f)(x) \cdot (\nabla g)(f(x))
$$

be careful with the shape, here the jacobian matrix of $g$ is $1 \times m$ and the gradient of $f$ is $m \times n$, whereas the gradient of $g$ is $m \times 1$, and the gradient of $g \circ f$ is $n \times 1$.

The most tedious part of the chain rule is to keep track of the shapes of the Jacobian matrices and the gradients.... especially when the function is defined on a matrix space or a tensor space.

The jacobian becomes somewhat pathological when the function is defined on a matrix space, because the gradient is always the same shape as the domain of the function (representation of the linear form in the dual space), for example when the function is defined on a matrix space.

Next we will see how to compute the gradient of a function defined on a matrix space.

## General differential forms

### Scalar function of a matrix variable

Suppose we have a function $L$ that takes a tensor $X$ as input and outputs a scalar. 
- $L$ is a **scalar function** of a **matrix variable** $X$,  for example with dimension $(m \times n)$.

We want to define and compute
$$
\frac{\partial L}{\partial X} \quad\text{or}\quad \nabla_X L,
$$
where $\tfrac{\partial L}{\partial X}$ has the same shape of $X$ $(m\times n)$, whose element in the position $(i,j)$ is $\tfrac{\partial L}{\partial X_{i,j}}$.
$$
\left[\frac{\partial L}{\partial X}\right]_{i,j}
= \frac{\partial L}{\partial X_{i,j}}.
$$

In higher order notation, we introduce the concept of **differentials**. If $L$ is differentiable, then for a small change $dX$ in the matrix $X$, we have

$$
dL = \sum_{i=1}^m \sum_{j=1}^n \frac{\partial L}{\partial X_{i,j}} \, dX_{i,j}
$$

Or simply with [Einstein notation](https://mathworld.wolfram.com/EinsteinSummation.html):

$$
dL = \frac{\partial L}{\partial X_{i,j}} \, dX_{i,j}.
$$

> <Badge type="tip" text="Tip" />
> If the reader is familiar with the dual space, then he/she will recognize that the notion of **small change** is actually a **differential form**.

> <Badge type="warning" text="Important" /> Frobenius product
>  We will use this following formula many times in the next sections.
>
> We can write $dL$ as a [Frobenius product](https://en.wikipedia.org/wiki/Frobenius_inner_product) of the gradient of $L$ and the differential of $X$.
>
> $$
> dL = \mathrm{tr}\left(\left(\frac{\partial L}{\partial X}\right)^\top \, dX\right)
> $$
>
> This is obtained by the fact that $\mathrm{tr}(A^TB)=A_{i,j}B_{i,j}$.

### Tensor function of a tensor variable

Suppose we have a function $Y\in\mathbb{R}^{m\times n}$ that takes a tensor $X\in\mathbb{R}^{p\times q}$ as input and outputs a tensor.

We want to define and compute

$$
\frac{\partial Y}{\partial X} \quad\text{or}\quad \nabla_X Y,
$$

where $\tfrac{\partial Y}{\partial X}$ is a tensor of shape $(m\times n\times p\times q)$, whose element in the position $(i,j,k,\ell)$ is $\tfrac{\partial Y_{i,j}}{\partial X_{k,\ell}}$.

$$
\left[\frac{\partial Y}{\partial X}\right]_{i,j,k,\ell}
= \frac{\partial Y_{i,j}}{\partial X_{k,\ell}}
$$

### The general form of the chain rule for tensor functions

Let $X$ be a matrix of shape $(m \times n)$ and $Y$ be a matrix of shape $(p \times q)$, and $Z$ be a scalar function of $Y$. Then the chain rule for the tensor function $Z$ is:

$$
\frac{\partial Z}{\partial X_{i,j}} = \frac{\partial Z}{\partial Y_{k,\ell}}
               \cdot
               \frac{\partial Y_{k,\ell}}{\partial X_{i,j}}
$$

Until now, we have not seen how to calculate the gradient of a function defined on a matrix space and the backpropagation algorithm in deep learning. We will first recall the rules for calculating differential forms.

## Rules for calculating differential forms

The differentiation $d$ has a strict definition in differential geometry, but in practice, we can use the following rules to calculate the differential forms.

$$
\begin{align*}
&d(X\pm Y) = dX \pm dY \\
&d(XY) = X \, dY + Y \, dX \\
&d(X^\top) = (dX)^\top \\
&d(\mathrm{tr}(X)) = \mathrm{tr}(dX) \\
\end{align*}
$$
If $X$ is invertible, then we have
$$
\begin{align*}
&d(X^{-1}) = -X^{-1} \, dX \, X^{-1} \\
&d(\det(X)) = \det(X) \, \mathrm{tr}(X^{-1} \, dX)\\
\end{align*}
$$
Element-wise operations:
$$
\begin{align*}
&d(X \odot Y) = Y \odot dX + X \odot dY \\
&d(X \oslash Y) = \frac{dX \odot Y - X \odot dY}{Y^2} \\
\end{align*}
$$
Element-wise functions:
$$
d\sigma(X) = \sigma'(X) \odot dX
$$

## Gradient calculation in practice

The following examples of this section are taken from the [Zhihu article](https://zhuanlan.zhihu.com/p/24709748), which I strongly recommend for more exercises!

Other recommended resources:

- [Matrix Calculus.org](https://www.matrixcalculus.org/)
- [The Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)
- [Matrix Calculus, HU, Pili](https://project.hupili.net/tutorial/hu2012-matrix-calculus/hu2012matrix-calculus.pdf)

Given $df$, we want to calculate $\frac{\partial f}{\partial X}$. We can write $df$ in the form of $df = \mathrm{tr}((\frac{\partial f}{\partial X})^\top \, dX)$. To do this, we need some tricks to calculate the trace.

### Tricks for calculating traces

> <Badge type="info" text="Tricks" />
> 1. Scalar rule: if $a$ is a scalar, then $\mathrm{tr}(a) = a$.
> 2. Transpose rule: $\mathrm{tr}(A) = \mathrm{tr}(A^\top)$.
> 3. Linearity: $\mathrm{tr}(A + B) = \mathrm{tr}(A) + \mathrm{tr}(B)$.
> 4. Cyclic rule: $\mathrm{tr}(AB) = \mathrm{tr}(BA)$. 
> 5. Product rule: $\mathrm{tr}(A^\top (B \odot C)) = \mathrm{tr}((A \odot B)^\top C)$.

> <Badge type="info" text="Frobenius Product" />
> Let $A$ and $B$ be two matrices of the same shape. The Frobenius product of $A$ and $B$ is defined as
> $$
> \mathrm{tr}(A^\top B) = \sum_{i,j} A_{i,j}B_{i,j}
> $$
> This is a generalization of the dot product for matrices.

### Examples

1. $f=a^T X b$, where $a$ is a $(m \times 1)$ vector, $b$ is a $(n\times 1)$ vector, and $X$ is a $(m \times n)$ matrix. Then we have

$$
\begin{align*}
df &= da^T X b + a^T dX b + a^T X db \\
&= a^T dX b \\
&= \mathrm{tr}(a^T dX b) \\
&= \mathrm{tr}(b a^T dX) \\
&= \mathrm{tr}((a b^T)^\top dX) \\
\end{align*}
$$

Thus we have $\frac{\partial f}{\partial X} = a b^T$

<Badge type="danger" text="Note" /> we cannot write $\frac{\partial f}{\partial X} = a^T \frac{\partial X}{\partial X} b$, since the partial derivate does not commute with matrix multiplication.

2. $f = a^\top \exp\left(X b\right)$, where $a$ is a $(m \times 1)$ vector, $b$ is a $(n\times 1)$ vector, and $X$ is a $(m \times n)$ matrix. Then we have

$$
\begin{align*}
df &= (da^\top) \exp\left(X b\right) + a^\top (d\exp\left(X b\right)) \\
&= a^\top (\exp\left(X b\right)\odot d(Xb)) \\
&= \mathrm{tr}(a^\top (\exp\left(X b\right)\odot d(Xb))) \\
&= \mathrm{tr}((a^\top \exp\left(X b\right))^\top\odot d(Xb)) \\
&= \mathrm{tr}(b(a\odot\exp\left(X b\right) )^\top dX) \\
&= \mathrm{tr}(((a\odot\exp\left(X b\right) ) b^\top)^\top dX) \\
\end{align*}
$$

Thus we have $\frac{\partial f}{\partial X} = a\odot\exp\left(X b\right) b^\top$.

3. (Backpropagation) $Y=f(X)$, and $L(Y)$ is a scalar function of $Y$. We have already calculated $\frac{\partial L}{\partial Y}(Y)$.

We want to calculate $\frac{\partial L}{\partial X}(X)$. 

We have

$$
dL = \mathrm{tr}\left(\left(\frac{\partial L}{\partial Y}(Y)\right)^\top dY\right) = \mathrm{tr}\left(\left(\frac{\partial L}{\partial Y}\right)^\top df(X) \right)
$$

Meanwhile, we have

$$
df = \mathrm{tr}\left(\left(\frac{\partial f}{\partial X}\right)^\top dX\right)
$$

by developing $df(X)$ with differential rules, we can obtain the expression of $\frac{\partial L}{\partial X}(X)$.

## Application in deep learning 1: Neural Network with two layers

Let $X$ be the input matrix of shape $(N \times D)$, where $N$ is the number of samples and $D$ is the number of features, and $y$ be the vector of shape $(N,)$, where $y_i\in\{0,1,...,C-1\}$ is the class of the $i$-th sample. 

Consider a 2-layer neural network with the following architecture:

$$
\begin{align*}
Z_1 &= X W_1 + b_1 \\
H_1 &= \sigma(Z_1) \\
Z_2 &= H_1 W_2  + b_2 \\
P &= \text{Softmax}(Z_2) \\
\end{align*}
$$

where
- $X$ is the input matrix of shape $(N \times D)$,
- $W_1$ is the weight matrix of the first layer of shape $(D \times H)$,
- $b_1$ is the bias row vector of the first layer of shape $(H)$,
- $W_2$ is the weight matrix of the second layer of shape $(H \times C)$,
- $b_2$ is the bias row vector of the second layer of shape $(C)$,
- $Z_1$ is the output of the first layer of shape $(N \times H)$,
- $H_1$ is the activation of the first layer of shape $(N \times H)$,
- $Z_2$ is the output of the second layer of shape $(N \times C)$,
- $P$ is the output of the network of shape $(N \times C)$.
- $Y$ is the one-hot encoded target matrix of shape $(N \times C)$. $Y_{i,c}=\delta_{c,y_i}$.

In other words, we have the following architecture:

$$
P = \text{Softmax}(W_2(\sigma(XW_1+b_1))+b_2)
$$

We note $Y$ the target matrix, i.e. the one-hot encoded matrix of shape $(N \times C)$, where $Y_{i,c}=\delta_{c,y_i}$.

We use the cross-entropy loss function:

$$
\begin{align*}
L &= -\frac{1}{N} \sum_{i=1}^N \log P_{i,y_i} \\
&= -\frac{1}{N} \sum_{i=1}^N \sum_{j=1}^C Y_{i,j} \log P_{i,j} \\
&= -\frac{1}{N} \mathrm{tr}(Y^\top \log P)
\end{align*}
$$

We leave the reader to verify that the $L$ is a Frobenius product of the target matrix $Y$ and the log-softmax output $P$.

### $\partial L / \partial Z_2$

This is the famous cross-entropy loss on the softmax output. Let's use the differential form of the loss function.

$$
\begin{align*}
dL &= -\frac{1}{N} \sum_{i=1}^N \sum_{j=1}^C \left( Y_{i,j} \frac{1}{P_{i,j}} \right) dP_{i,j} \\
\end{align*}
$$

Develop the differential form of $dP_{i,j}$. Since the softmax function is an row-wise operation, we have

$$
\begin{align*}
dP_{i,j} &= d\text{Softmax}(Z_{2,i,j}) \\
&= \sum_{k=1}^C \frac{\partial P_{i,j}}{\partial Z_{2,i,k}} dZ_{2,i,k}
\end{align*}
$$

Meanwhile,

$$
\begin{align*}
\partial P_{i,j} / \partial Z_{2,i,k} &= \frac{\partial}{\partial Z_{2,i,k}} \left( \frac{\exp(Z_{2,i,j})}{\sum_{l=1}^C \exp(Z_{2,i,l})} \right) \\
&= \frac{\exp(Z_{2,i,j})}{\sum_{l=1}^C \exp(Z_{2,i,l})} \delta_{j,k} - \frac{\exp(Z_{2,i,j})\exp(Z_{2,i,k})}{\left(\sum_{l=1}^C \exp(Z_{2,i,l})\right)^2} \\
&= P_{i,j} \delta_{j,k} - P_{i,j} P_{i,k}\\
&= P_{i,j}(\delta_{j,k} - P_{i,k})
\end{align*}
$$

Substituting into the expression for $dL$:

$$
\begin{align*}
dL &= -\frac{1}{N} \sum_{i=1}^N \sum_{j=1}^C \left( Y_{i,j} \frac{1}{P_{i,j}} \right) \sum_{k=1}^C P_{i,j} (\delta_{j,k} - P_{i,k}) dZ_{2,i,k}\\
&= -\frac{1}{N} \sum_{i=1}^N \sum_{j=1}^C \sum_{k=1}^C Y_{i,j} (\delta_{j,k} - P_{i,k}) dZ_{2,i,k}\\
&= -\frac{1}{N} \sum_{i=1}^N\sum_{k=1}^C \left(  \sum_{j=1}^C Y_{i,j} (\delta_{j,k} - P_{i,k})\right) dZ_{2,i,k}
\end{align*}
$$

Focus on the inner sum:

- When $\delta_{j,k} = 1$, the term simplifies to $Y_{i,k}$.
- The second term sums over $j$ as $-P_{i,k} \sum_{j=1}^C Y_{i,j}$.

Since $\sum_{j=1}^C Y_{i,j} = 1$ (only one class is true for each sample):

$$
dL= -\frac{1}{N} \sum_{i=1}^N \sum_{k=1}^C (Y_{i,k} - P_{i,k}) dZ_{2,i,k}
$$



Then we can vectorize this calculation.

$$
\begin{align*}
dL &= -\frac{1}{N} \mathrm{tr}\left( (Y - P)^\top dZ_2 \right) \\
&= \mathrm{tr}\left(\left(\frac{P-Y}{N}\right)^\top dZ_2 \right) \\
\end{align*}
$$

We have 

$$
\frac{\partial L}{\partial Z_2} = \frac{1}{N}(P-Y)
$$

### $\partial L / \partial W_2$ and $\partial L / \partial b_2$

$$
dZ_2 = d(H_1 W_2 + b_2) = dH_1 W_2 + H_1 dW_2 + db_2 
$$

Then

$$
\begin{align*}
dL &= \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}\right)^\top \left( dH_1 W_2 + H_1 dW_2 + db_2 \right)\right) \\
&= \underbrace{\mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}\right)^\top dH_1 W_2 \right)}_{dL_1}  \\
& \quad +\underbrace{\mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}\right)^\top H_1 dW_2 \right)}_{dL_2} + \underbrace{\mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}\right)^\top db_2 \right)}_{dL_3} \\
\end{align*}
$$

Since the first term and the third term are independent of $dW_2$, we obtain

$$
\frac{\partial L}{\partial W_2} = \frac{\partial L_2}{\partial W_2} = H_1^\top \frac{\partial L}{\partial Z_2}
$$

For the gradient of $b_2$ we had gotta be careful. Since $b2$ is broadcasted, we have

$$
\begin{align*}
dL_3 &= \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}\right)^\top d(\mathbf{1}_{N}b_2) \right) \\
&= \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}\right)^\top \mathbf{1}_{N} db_2 \right) \\
&= \mathrm{tr}\left(\left( \mathbf{1}_{N}^\top\frac{\partial L}{\partial Z_2}\right)^\top db_2 \right)  \\
\end{align*}
$$

where $\mathbf{1}_{N}$ is a column vector of ones of shape $(1,N)$.

Thus we have

$$
\frac{\partial L}{\partial b_2} = \mathbf{1}_{N}^\top \frac{\partial L}{\partial Z_2}=\frac{1}{N}\sum_{i=1}^N (P[i,:]-Y[i,:])
$$

### $\partial L / \partial H_1$

Repeat the same calculation for $dL_1$ and $dH_1$. 

$$
\begin{align*}
dL_1 &= \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}\right)^\top dH_1 W_2 \right)\\
&= \mathrm{tr}\left(W_2\left(\frac{\partial L}{\partial Z_2}\right)^\top dH_1\right)\\
&= \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_2}W_2^\top\right)^\top dH_1\right)\\
\end{align*}
$$

Thus we have

$$
\frac{\partial L}{\partial H_1} = \frac{\partial L}{\partial Z_2}W_2^\top
$$

### $\partial L / \partial Z_1$

Repeat 
$$
\begin{align*}
dL_1 &= \mathrm{tr}\left(\left(\frac{\partial L}{\partial H_1}\right)^\top dH_1 \right)\\
&= \mathrm{tr}\left(\left(\frac{\partial L}{\partial H_1}\right)^\top \left( \sigma'(Z_1) \odot dZ_1 \right)  \right) \\
&= \mathrm{tr}\left(\left(\frac{\partial L}{\partial H_1}\odot\sigma'(Z_1)\right)^\top dZ_1  \right) \\

\end{align*}
$$

Thus we have

$$
\frac{\partial L}{\partial Z_1} = \frac{\partial L}{\partial H_1}\odot\sigma'(Z_1)
$$

### $\partial L / \partial W_1$ and $\partial L / \partial b_1$

Repeat...
$$
\begin{align*}
dL &= \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_1}\right)^\top dZ_1 \right) \\
&=\mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_1}\right)^\top \left( dX W_1 + X dW_1 + db_1\right) \right) \\
&=\mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_1}\right)^\top  XdW_1 \right) + \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_1}\right)^\top d(\mathbf{1}_{N} b_1) \right) \\
&=\mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_1}\right)^\top  XdW_1 \right) + \mathrm{tr}\left(\left(\frac{\partial L}{\partial Z_1}\right)^\top \mathbf{1}_{N} db_1 \right)
\end{align*}
$$

Then finally we have

$$
\frac{\partial L}{\partial W_1} = X^\top \frac{\partial L}{\partial Z_1} \
$$

$$
\frac{\partial L}{\partial b_1} = \mathbf{1}_{N}^\top \frac{\partial L}{\partial Z_1}
$$

### Summary

The regularized loss function is

$$
L = -\frac{1}{N} \mathrm{tr}\left( Y^\top \log P \right) + \lambda \left( W_{1,i,j}^2 + W_{2,i,j}^2 \right)
$$

$$
\frac{\partial L}{\partial Z_2} = \frac{1}{N}(P-Y)
$$

$$
\frac{\partial L}{\partial W_2} = H_1^\top \frac{\partial L}{\partial Z_2} + 2\lambda W_2
$$

$$
\frac{\partial L}{\partial b_2} = \mathbf{1}_{N}^\top \frac{\partial L}{\partial Z_2}
$$

$$
\frac{\partial L}{\partial H_1} = \frac{\partial L}{\partial Z_2}W_2^\top
$$

$$
\frac{\partial L}{\partial Z_1} = \frac{\partial L}{\partial H_1}\odot\sigma'(Z_1)
$$

$$
\frac{\partial L}{\partial W_1} = X^\top \frac{\partial L}{\partial Z_1} + 2\lambda W_1
$$

$$
\frac{\partial L}{\partial b_1} = \mathbf{1}_{N}^\top \frac{\partial L}{\partial Z_1}
$$

We can observe that the gradient of the layer deepens on the gradient of the next layer. This is the principle of backpropagation in deep learning.

### Implementation

```python ::collapsed-lines=10

# @Credits: UMich EECS 498-007 / 598-005 Deep Learning for Computer Vision
# Solution is my own implementation of the forward and backward pass of a two-layer neural network

def nn_forward_backward(
    params: Dict[str, torch.Tensor],
    X: torch.Tensor,
    y: Optional[torch.Tensor] = None,
    reg: float = 0.0
):
    """
    Compute the loss and gradients for a two layer fully connected neural
    network. When you implement loss and gradient, please don't forget to
    scale the losses/gradients by the batch size.

    Inputs: First two parameters (params, X) are same as nn_forward_pass
    - params: a dictionary of PyTorch Tensor that store the weights of a model.
      It should have following keys with shape
          W1: First layer weights; has shape (D, H)
          b1: First layer biases; has shape (H,)
          W2: Second layer weights; has shape (H, C)
          b2: Second layer biases; has shape (C,)
    - X: Input data of shape (N, D). Each X[i] is a training sample.
    - y: Vector of training labels. y[i] is the label for X[i], and each y[i] is
      an integer in the range 0 <= y[i] < C. This parameter is optional; if it
      is not passed then we only return scores, and if it is passed then we
      instead return the loss and gradients.
    - reg: Regularization strength.

    Returns:
    If y is None, return a tensor scores of shape (N, C) where scores[i, c] is
    the score for class c on input X[i].

    If y is not None, instead return a tuple of:
    - loss: Loss (data loss and regularization loss) for this batch of training
      samples.
    - grads: Dictionary mapping parameter names to gradients of those parameters
      with respect to the loss function; has the same keys as self.params.
    """
    # Unpack variables from the params dictionary
    W1, b1 = params["W1"], params["b1"]
    W2, b2 = params["W2"], params["b2"]
    N, D = X.shape

    scores, h1 = nn_forward_pass(params, X)
    # If the targets are not given then jump out, we're done
    if y is None:
        return scores

    # Compute the loss
    normalized_scores = scores - scores.max(dim=1, keepdim=True).values
    torch.exp(normalized_scores, out=normalized_scores)
    normalized_scores /= normalized_scores.sum(dim=1, keepdim=True)
    loss = torch.mean(-torch.log(normalized_scores[torch.arange(N), y]))
    loss += reg * (torch.sum(W1 * W1) + torch.sum(W2 * W2))
    
    # Backward pass: compute gradients
    grads = {}
    grad_z2 = normalized_scores
    grad_z2[torch.arange(N), y] -= 1  # For correct class, subtract 1
    grad_z2 /= N  # Scale by batch size

    grads['W2'] = h1.T @ grad_z2 + 2 * reg * W2  # Add regularization gradient
    grads['b2'] = grad_z2.sum(dim=0)  # Bias gradient (sum over N)

    # Compute gradient with respect to W1, b1
    grad_h1 = grad_z2 @ W2.T  # Backprop to first hidden layer
    grad_z1 = grad_h1 * (h1 > 0)  # Apply ReLU derivative

    grads['W1'] = X.T @ grad_z1 + 2 * reg * W1  # Add regularization gradient
    grads['b1'] = grad_z1.sum(dim=0)  # Bias gradient (sum over N)

    return loss, grads
```

