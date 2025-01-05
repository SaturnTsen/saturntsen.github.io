---
title: UM-CV 17 3D Vision
tags:
    - computer-vision
createTime: 2025/01/04 23:09:39
permalink: /computer-vision/UMichigan-CV/um-cv-course-17-3D-vision/
---

Topics in 3D vision: Computing correspondences, stereo, structure from motion, simultaneous localization and mapping(SLAM), view synthesis, differentiable graphics, etc.

Today's focus: 3D shape prediction.

<!-- more -->

## Different types of 3D shape representations

1. Depth map: assigns a depth value to each pixel in the image. RGB-D image.
  - Cannot caputure occluded regions. Data can be recorded directly for some
    types of 3D sensors.
  - Task: Predicting Depth Maps
  - Problem: Scale/Depth Ambiguity
  - Solution: Use a loss function that is invariant to scale, e.g. log scale.
2. Surfacer Normals. This gives a vector giving the normal vector to the object
   in the world for that pixel. Ground-truth normals: 3 × H × W
3. Voxel grid: Represent a shape with a V × V × V grid of occupancies. Just like
   segmentation masks in Mask R-CNN, but in 3D.
   - Conceptually simple
   - High resolution to capture fine structures
   - Scaling to high resolutions is nontrivial
   - Processing Voxel Inputs: 3D Convolution similar
   - Generating Voxel Shapes from 2D Images
      - 2D image -> 2D CNN -> FC -> 3D CNN -> Voxel grid
      - Problem: 3D Convolution is computationally expensive, also memory
        intensive. e.g. storing a 1024^3 voxel grid requires 4GB of memory.
      - Voxel Tubes [3D-R2N2: A Unified Approach for Single and Multi-view 3D
        Object Reconstruction, ECCV 2016](https://arxiv.org/abs/1604.00449):
        Final conv layer: V filters Interpret as a "tube" of voxel scores.
        Problem: loss of translation invariance in z direction.
      - Scaling Voxel Networks: Octree-based methods [OctNet: Learning Deep 3D
        Representations at High Resolutions, ICCV 2017](https://arxiv.org/abs/1611.05009)
      - Nested Shape Layers [Matryoshka Networks: Predicting 3D Geometry via
        Nested Shape Layers, CVPR 2018](https://arxiv.org/abs/1804.10975)
4. Implicit Surface: Learn a function to classify arbitrary 3D points as
   inside/outside the shape. Signed Distance Function (SDF) gives the Euclidean distance to the surface of the shape; sign gives inside/outside
5. Point cloud
6. Mesh 