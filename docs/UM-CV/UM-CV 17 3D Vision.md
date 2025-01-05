---
title: UM-CV 17 3D Vision
tags:
    - computer-vision
createTime: 2025/01/04 23:09:39
permalink: /computer-vision/UMichigan-CV/um-cv-course-17-3D-vision/
---

Topics in 3D vision: Computing correspondences, stereo, structure from motion, simultaneous localization and mapping(SLAM), view synthesis, differentiable graphics, etc.

Focus: 3D shape prediction - Shape representations, shape comparison metrics, camera systems, coordinates, datasets, and an example of Mesh R-CNN.

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

## Shape representations

### Depth map

Depth map assigns a depth value to each pixel in the image. RGB-D image.
  - Cannot caputure occluded regions. Data can be recorded directly for some
    types of 3D sensors.
  - Task: Predicting Depth Maps
  - Problem: Scale/Depth Ambiguity
  - Solution: Use a loss function that is invariant to scale, e.g. log scale.

### Surfacer Normals

This gives a vector giving the normal vector to the object
   in the world for that pixel. Ground-truth normals: 3 × H × W

### Voxel grid

Represent a shape with a V × V × V grid of occupancies. Just like
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

### Implicit Surface

Learn a function to classify arbitrary 3D points as
   inside/outside the shape. Signed Distance Function (SDF) gives the Euclidean
   distance to the surface of the shape; sign gives inside/outside

### Point cloud

A set of points in 3D space. 
  
- (+) Can represent fine structures without huge numbers of points 
- ( ) Requires new architectures, losses, etc
- (-) Doesn't explicitly represent the surface of the shape: extracting a mesh for rendering or other. Need postprocessing to transform into another format.
- Segmentation: PointNet [PointNet, CVPR 2017](https://arxiv.org/abs/1612.00593)
- Generating Pointcloud Outputs: [A Point Set Generation Network for 3D Object Reconstruction from a Single Image, CVPR 2017](https://arxiv.org/abs/1612.00603)
- Chamfer Distance: Measure the distance between two point clouds.
$d_{CD}(X, Y) = \sum_{x \in X} \min_{y \in Y} \|x - y\|^2 + \sum_{y \in Y} \min_{x \in X} \|x - y\|^2$

### Mesh

Triangle mesh:
  - Vertices: Set of V points in 3D space
  - Faces: Set of triangles over the Vertices
  - (+) Standard representation for graphics
  - (-) Requires new architectures of neural Networks

Pixel2Mesh [Generating 3D Mesh Models from Single RGB Images, ECCV 2018](https://arxiv.org/abs/1804.01654)

Key ideas:
1. **idea 1** Iterative mesh refinement
    - Start from initial ellipsoid mesh network predicts offsets for each vertex repeat.
    - Predicting Triangle Meshes: Graph convolution
    - Input: Graph with a feature vector at each vertex.
    - Output: New feature vector for each vertex.
      - Graph Convolution: $h_v^{(l+1)} = \sigma \left( \sum_{u \in N(v)} \frac{1}{c_v} W^{(l)} h_u^{(l)} \right)$
1. **idea 2:** How to incorporate image information?
    - Aligned vertex features
    - For each vertex of the mesh, use camera information fo **project** onto image plane.
    - Use a bilinear interpolation to sample a CNN feature
1. **Loss function**
    - Prediction & Ground-truth is not unique, so we want our prediction to be invariant to the representation.
    - Loss: Chamfer distance between predicted samples and ground-truch samples.
    - [GEOMetrics: Exploiting Geometric Structure for Graph-Encoded Objects, ICML 2019](https://arxiv.org/abs/1901.11461)

## Shape Comparison Metrics

### IoU over 3D shapes

### Chamfer distance

  - Problem: Very sensitive to outliers

### F1 Score

  - Precision@t = fraction of predicted points within distance t of some
    ground-truth point.
  - Recall@t = fraction of ground-truth points within distance t of some
    predicted point.
  - [What Do single-view 3D Reconstruction Networks Learn? CVPR 2019](https://arxiv.org/abs/1904.04514)

<div class='img-wrapper'>
<img src="/images/um-cv-2/17-1.png" width="50%" alt="description"  /><br>
Fig: F1 score</div>

## Camera Systems, Coordinates

**Canonical Coordinates**: Predict 3D shape in a canonical coordinate system(e.g. front of chair is +z) regardless of the viewpoint of the camera.

**View Coordinates**: Predict 3D shape aligned to the viewpoint of the camera.

Many papers predict in canonical coordinates - easier to load data. However, canonical view breaks the "principle of feature alignment": Predictions should be aligned to inputs.

[Pixels, voxels and views: A study of shape representations for single view 3D object shape prediction, CVPR 2019](https://arxiv.org/abs/1804.06032)

Idea: View-Centric Voxel Predictions

## Datasets

3D Datasets: Object-centric. ShapeNet. ~50 categories, ~50k 3D CAD models.

Pix3D: Some papers train on ShapeNet and show qualitative results here, but use ground-truth segmentation masks. IKEA furniture aligned to ~17k images.

## Example

### Mesh R-CNN

[Mesh R-CNN, ICCV 2019](https://arxiv.org/abs/1906.02739)

Input: Single RGB image

Output: A set of detected objects for each object: 

Mask R-CNN
  - bbox
  - category label
  - instance segmentation

Mesh head
  - 3d triangle mesh

**Problem of Mesh deformation** The topology is fixed by the inital mesh - All predictions are homomorphic to the initial mesh.

**Mesh R-CNN Pipeline**

<div class='img-wrapper'>
<img src="/images/um-cv-2/17-2.png" width="50%" alt="description"  /><br>
Fig: Mesh R-CNN Pipeline</div>

Add **shape regularizers** to the loss function to encourage the predicted mesh to be regular and smooth.

Concept: **Amodal completion** - predict occluded parts of the objects.

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