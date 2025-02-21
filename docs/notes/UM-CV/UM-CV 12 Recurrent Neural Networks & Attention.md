---
title:  12 & 13 Recurrent Neural Networks & Attention Mechanism
tags: 
  - notes
  - computer-vision
createTime: 2024/12/27 11:21:07
permalink: /notes/um-cv/um-cv-12/
outline: [2, 4]
---

# UM-CV 11 Recurrent Neural Networks & Attention

Part 1: RNNs, Vanilla Rnns, LSTMs, GRU, Gradient explosion, Gradient vanishing,
Architecture Search, Empirical Understanding of RNNs.

Part 2: Seq2Seq, Attention Mechanism, Self-Attention, Multi-head Attention,
Transformers, Scaling up Transformers.

<!-- more -->

@Credits: [EECS 498.007](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/) | 
Video Lecture: [UM-CV](https://www.youtube.com/watch?v=dJYGatp4SvA&list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r) 

Personal work for the assignments of the course: [github repo](https://github.com/SaturnTsen/EECS-498-007/).

**Notice on Usage and Attribution**

These are personal class notes based on the University of Michigan EECS 498.008
/ 598.008 course. They are intended solely for personal learning and academic
discussion, with no commercial use.

For detailed information, please refer to the **[complete notice at the end of this document](#notice-on-usage-and-attribution)**

## Intro

### Process Sequences

- one to one: standard feed-forward network
- one to many: image captioning
- many to one: sentiment analysis, image classification
- many to many: machine translation/per-frame video classification

### Sequential Processing of Non-Sequential Data

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-1.png" width="70%" alt="Sequential Processing of Non-Sequential Data"  /><br> Sequential Processing of Non-Sequential Data: Classification</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-2.png" width="70%" alt="Sequential Processing of Non-Sequential Data"  /><br> Sequential Processing of Non-Sequential Data: Generation</div>

## Recurrent Neural Networks

### Architecture

Key idea: RNNs maintain a hidden state that is updated at each time step.

$$
h_t = f_W(h_{t-1}, x_t)
$$

where $h_t$ is the hidden state at time $t$, $x_t$ is the input at time $t$, and
$f_W$ is a function parameterized by $W$.

Vanilla Recurrent Neural Networks:

$$
h_t = \tanh(W_{hh}h_{t-1} + W_{xh}x_t)
$$

$$
\begin{aligned}
h_t &= \tanh(W_{hh}h_{t-1} + W_{xh}x_t) \\
y_t &= W_{hy}h_t
\end{aligned}
$$

### Computational Graph

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-3.png" width="70%" alt="Computational Graph of RNN"  /><br> Computational Graph of RNN</div>

Many to many:

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-4.png" width="70%" alt="Computational Graph of RNN"  /><br> Computational Graph of RNN: Many to Many</div>

Many to one: Encode input sequence in a single vector. See [Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215).

One to many: Produce output sequence from single input vector.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-5.png" width="70%" alt="Seq2Seq"  /><br> Seq2Seq</div>

Example: Language Modeling

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-6.png" width="70%" alt="Language Modeling"  /><br> Language Modeling</div>

Given "h", predict "e", given "hell", predict "o".

So far: encode inputs as one-hot-vector -> Embedding layer

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-7.png" width="70%" alt="Embedding layer"  /><br> Embedding layer</div>

### Backpropagation Through Time

- Problem: Takes a lot of memory for long sequences.
- Unroll the RNN for a fixed number of time steps.
- Solution: Truncated chunks of the sequence.
<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-8.png" width="70%" alt="Backpropagation Through Time"  /><br> Backpropagation Through Time</div>

Minimal implementation: [min-char-rnn.py](https://gist.github.com/karpathy/d4dee566867f8291f086)

### Training RNNs

Shakespeare's Sonnet, Algebraic Geometry Textbook LaTeX code, Generated C Code

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-9.png" width="70%" alt="Training RNNs"  /><br> Training RNNs</div>

### Searching for Interpretable Hidden Units

Visualizing and Understanding Recurrent Networks: [arXiv:1506.02078](https://arxiv.org/abs/1506.02078)

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-10.png" width="70%" alt="Searching for Interpretable Hidden Units"  /><br> Quote deletion cell</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-11.png" width="70%" alt="Searching for Interpretable Hidden Units"  /><br> line length tracking cell</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-12.png" width="70%" alt="Searching for Interpretable Hidden Units"  /><br> If statement cell</div>

Example: Image captioning

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-13.png" width="70%" alt="Searching for Interpretable Hidden Units"  /><br> Image captioning</div>

Transfer learning from CNN, then add RNN.

Results: [arXiv:1411.4555](https://arxiv.org/abs/1411.4555)

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-14.png" width="70%" alt="Searching for Interpretable Hidden Units"  /><br> Image captioning results</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-15.png" width="70%" alt="Searching for Interpretable Hidden Units"  /><br> Image captioning results</div>

Failure Cases:

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-16.png" width="70%" alt="Searching for Interpretable Hidden Units"  /><br> Failure Cases</div>

### Gradient Flow

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-17.png" width="70%" alt="Gradient Flow"  /><br> Gradient Flow</div>

Computing gradient of $h_0$ involves many factors of W (and repeated tanh)

Gradient Clipping: Scale gradients if they get too large.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-18.png" width="70%" alt="Gradient Clipping"  /><br> Gradient Clipping</div>

Vanishing Gradient: If the gradient is too small, the weights won't change ->
Change the architecture.

### Long Short Term Memory (LSTM)

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-19.png" width="70%" alt="LSTM"  /><br> LSTM (1997)</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-20.png" width="70%" alt="LSTM"  /><br> LSTM</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-21.png" width="70%" alt="LSTM"  /><br> LSTM</div>

Uninterrupted gradient flow!

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-22.png" width="70%" alt="LSTM"  /><br> LSTM</div>

### Multi-layer RNNs

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-23.png" width="70%" alt="Two-layer RNN"  /><br> Two-layer RNN</div>

### Other RNN Variants

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-24.png" width="70%" alt="Other RNN Variants"  /><br>Search for RNN architectures empirically.</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/12-25.png" width="70%" alt="Other RNN Variants"  /><br>Neural Architecture Search.</div>


## Attention Mechanism

Problem of Attention: Long sequences are hard to process.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-1.png" width="70%" alt="Attention Mechanism"  /><br> Attention Mechanism</div>

### Seq to Seq with RNNs and Attention

Compute (scalar) alignment scores.

$$
e_{t,i} = f_{att}(s_{t-1}, h_i)
$$

$f_{att}$ is an MLP

Normalize alignment scores to get attention weights $0 < a_{t,i} < 1$, $\sum_i a_{t,i} = 1$

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-2.png" width="70%" alt="Seq to Seq with RNNs and Attention"  /><br> RNN</div>

Compute context vector as weighted sum of encoder hidden states.

$c_t$ = $\sum_i a_{t,i}h_i$

Use the context vector as input to the decoder:

$$
s_t = g_{U}(s_{t-1}, y_{t-1}, c_t)
$$

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-3.png" width="70%" alt="Seq to Seq with RNNs and Attention"  /><br> Seq to Seq with RNNs and Attention</div>

We do not need to tell the model to pay attention to which part of the input.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-4.png" width="70%" alt="Seq to Seq with RNNs and Attention"  /><br> Seq to Seq with RNNs and Attention</div>

Rather than trying to stuff all the information in a single vector, we give the model the ability to attend to different parts of the input.

Example: Translation Takes
<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-5.png" width="70%" alt="Attention Matrix"  /><br> Attention Matrix</div>

### Image Captioning with RNNs and Attention

CNN -> Attention to get Alignment Scores -> RNN

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-6.png" width="70%" alt="Image Captioning with RNNs and Attention"  /><br></div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-7.png" width="70%" alt="Image Captioning with RNNs and Attention"  /><br> Image Captioning with RNNs and Attention</div>

[Neural Image Caption Generation with Visual Attention](https://arxiv.org/abs/1502.03044)

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-8.png" width="70%" alt="Image Captioning with RNNs and Attention"  /><br> Area to which the attention is attributed</div>

#### Biological Inspiration

Our retina has a fovea, which is a high-resolution area in the center of our
vision. Our eyes move around constantly to focus on different parts of the image
so we don't notice.

Retina的中文是视网膜，Fovea是视网膜的中心区域，视网膜的中心区域是视觉最清晰的地
方，也是视觉最敏锐的地方。

#### X, attend, and Y

- [Show, Attend and Tell: Neural Image Caption Generation with Visual Attention](https://arxiv.org/abs/1502.03044)
- [Ask, Attend and Answer: Exploring Question-Guided Spatial Attention for Visual Question Answering](https://arxiv.org/abs/1806.01214)
- [Listen, Attend and Spell](https://arxiv.org/abs/1508.01211)
- [Listen, Attend and Walk](https://arxiv.org/abs/1606.02245)
- [Show, Attend, and Interact](https://arxiv.org/abs/1704.03054)
- [Show, Attend and Read](https://arxiv.org/abs/1706.03762)

### General-Purpose Attention Layer

Inputs: Query vector, Input vectors, and Similarity function. Computation:
Similarities, Attention weights, Output vector.

#### 1st generalization

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-9.png" width="70%" alt="General-Purpose Attention Layer"  /><br> General-Purpose Attention Layer</div>

Use scaled dot product for similarity

#### 2nd generalization: Multiple query vectors

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-10.png" width="70%" alt="General-Purpose Attention Layer"  /><br> General-Purpose Attention Layer</div>

#### 3rd generalization: Query-Key-Value Attention

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-11.png" width="70%" alt="General-Purpose Attention Layer"  /><br> General-Purpose Attention Layer</div>

### Self-Attention Layer

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-12.png" width="70%" alt="Self-Attention Layer"  /><br> Self-Attention Layer</div>

Problem: Self-attention is permutation invariant. It does not care about order
all.

Solution: Positional encoding. We append a vector indicating the position of the
word.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-13.png" width="70%" alt="Self-Attention Layer"  /><br> Self-Attention Layer</div>

### Masked Self-Attention

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-14.png" width="70%" alt="Masked Self-Attention"  /><br> Masked Self-Attention</div>


### Multi-head Self-Attention

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-15.png" width="70%" alt="Multi-head Self-Attention"  /><br> Multi-head Self-Attention</div>

### Example: CNN with Self-Attention

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-16.png" width="70%" alt="CNN with Self-Attention"  /><br> CNN with Self-Attention</div>

## Three ways of Processing Sequences

1. RNN: works on ordered sequences, is good at long sequences: After one RNN
   layer, h_t sees the whole sequence. But it is not parallelizable.
2. 1D Convolution: Works on Multidimensional Grids. It is not good at long
   sequences. It is highly parallelizable
3. Self-Attention: Works on unordered sequences. It is good at long sequences.
   After one self-attention layer, each word sees the whole sequence. It is
   highly parallelizable. But memory complexity is quadratic in the sequence
   length.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-17.png" width="70%" alt="Three ways of Processing Sequences"  /><br> Three ways of Processing Sequences</div>

### Attention is All You Need

[Attention is All You Need](https://arxiv.org/abs/1706.03762)

A model build only with self-attention layers.

Layer normalization: Self-attention is giving a set of vectors, and layer
normalization does not add communication to the vectors.

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-18.png" width="70%" alt="Attention is All You Need"  /><br> Attention is All You Need</div>

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-19.png" width="70%" alt="Attention is All You Need"  /><br> The transformer</div>

"ImageNet" Moment for Natural Language Processing.

Pretraining: Download a lot of text from the internet. Train a giant Transformer
model for language modeling.

Fine-tuning: Fine-tune the transformer on your own NLP task.

### Scaling up Transformers

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-20.png" width="70%" alt="Scaling up Transformers"  /><br> Scaling up Transformers</div>

### Summary

<div style="text-align:center;margin-bottom:1em;">
  <img src="/images/um-cv/13-21.png" width="70%" alt="Summary"  /><br> Summary</div>

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