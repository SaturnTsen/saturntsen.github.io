---
title: UM-CV 2 Image Classification
tag: 
  - notes
  - computer-vision
createTime: 2024/12/20 14:30:31
permalink: /computer-vision/UMichigan-CV/um-cv-course-2-classification/
---

@Credits: [EECS 498.007](https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/)

This course is basically for beginners, so I will skip basic concepts and complete the notes with copilot.

# Image Classification

Problem：The semantic gap between low-level features and high-level concepts, and the computers do not have the intuition to understand the image.

## Intro

### Challenges

- intraclass variation
- fine-grained categories
- background clutter
- illumination change: lighting and shadow conditions
- deformatoion: the object may have various positions
- occlusion: the object may be partially covered

### Scientific Applications

- medical imaging
- galaxy classification

### Other Tasks in CV related to classification
- object detection: classify localized objects
- image captioning: generate a sentence to describe the image, which can be seen as a classification problem of the next-word prediction
- Playing Go: classify the next move

An Image Classifier?
```python
def classify(image):
    # Some magic here?
    return label
```
Approaches: find edges, corners, and other features based on human knowledge... but it is not scalable.

## Machine Learning: Data-driven Approach

1. Collect a dataset of images and labels
2. Use machine learning to train a classifier
3. Evaluate the classifier on new images

```python
def train(images, labels):
    # Machine learning
    return model
```

```python
def predict(model, test_image):
    # Use model to predict labels
    return label
```

### Datasets

The most basic datasets: MNIST, CIFAR-10
- MNIST: handwritten digits
- CIFAR-10: 10 classes of objects

Larger datasets:
- ImageNet: 1000 classes, 1.2 million images
- COCO: 80 object categories, 300k images
- MIT Places: 205 scene categories, 2.5 million images
- LAION-5B: 5.85 billion images

Datasets are getting larger and larger, and the models are getting more and more complex.

Omniglot dataset: 1623 characters from 50 alphabets, 20 examples per character. It is used for few-shot learning. Few-shot learning is a type of machine learning that focuses on learning from a small number of examples. （小样本学习）

## First Model: Nearest Neighbor

Metrics: L1 distance, L2 distance, cosine similarity

L1 distance: $d_1(I_1, I_2) = \sum_p |I_1^p - I_2^p|$

L2 distance: $d_2(I_1, I_2) = \sqrt{\sum_p (I_1^p - I_2^p)^2}$

```python
import numpy as np
class NearestNeighbor:
    def __init__(self):
        pass

    def train(self, X, y):
        self.Xtr = X
        self.ytr = y

    def predict(self, X):
        num_test = X.shape[0]
        Ypred = np.zeros(num_test, dtype=self.ytr.dtype)

        for i in range(num_test):
            distances = np.sum(np.abs(self.Xtr - X[i, :]), axis=1)
            min_index = np.argmin(distances)
            Ypred[i] = self.ytr[min_index]

        return Ypred
```

Training time: $O(1)$, Testing time: $O(N)$

1. This is computationally expensive!
2. Outliers can affect the result significantly.

<div style="text-align:center;">
<img src="/images/um-cv/um-cv-2-1.png" width="50%" alt="outlier examples"  /><br>
Fig: outliers
</div>

Web demo: [Nearest Neighbor Demo](http://vision.stanford.edu/teaching/cs231n-demos/knn/)

### Hyperparameters

What is the best K to use?

Hyperparameters: parameters that are not learned by the model, but are set at the start of the learning process.

Setting Hyperparameters:

- Idea 1: Choose hyperparamters that work best on the data.
  - BAD: This works best on the training data.
- Idea 2: Split data into train and test and choose hyperparameters that work best on the test data.
  - BAD: The algorithm is polluted by the test data!
- Idea 3: Split data into train, validation, and test. Choose hyperparameters that work best on the validation data.
  - Better and correst ! We only touch once the test data.
  - Bad perfomance on the test set implies bad performance on the real world.

<div style="text-align:center;">
<img src="/images/um-cv/um-cv-2-2.png" width="80%" alt="How to split your data"  /><br>
Fig: How to split your data
</div>

- Idea 4: Cross-validation: split data into k folds, train on k-1 folds, and test on the remaining fold. Repeat k times and average the results.
  - Better than Idea 3, but computationally expensive. Useful for small datasets, but not used too much in deep learning.

<div style="text-align:center;">
<img src="/images/um-cv/um-cv-2-3.png" width="80%" alt="cross-validation"  /><br>
Fig: cross-validation
</div>

Emprirical studies:

<div style="text-align:center;">
<img src="/images/um-cv/um-cv-2-4.png" width="80%" alt="Emprirical studies"  /><br>
Fig: Emprirical studies
</div>

### Correctness: Universal Approximation

KNN has universal approximaton power on compact sets.
<div style="text-align:center;">
<img src="/images/um-cv/um-cv-2-5.png" width="80%" alt="Universal Approximation"  /><br>
Fig: Universal Approximation
</div>

### Curse of Dimensionality

As the number of (input) dimensions increases, the volume of the space increases exponentially, and the number of data points required to fill the space increases exponentially.

### Summary

- KNN very is slow at runtime.
- Distance metrics on pixels are not informative, e.g. predicting a human's face based on the surrounding pixels.
- Surprisingly, KNN works well with extracted convolutional features!