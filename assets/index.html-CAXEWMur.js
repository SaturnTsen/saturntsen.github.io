import{_ as a,c as i,f as e,a as s,b as o,r,o as l,e as d}from"./app-Ch-a3JOR.js";const p="/images/um-cv/7-1.png",c="/images/um-cv/7-2.png",m="/images/um-cv/7-3.png",g="/images/um-cv/7-4.png",h="/images/um-cv/7-5.png",u="/images/um-cv/7-6.png",v="/images/um-cv/7-7.png",f="/images/um-cv/7-8.png",b="/images/um-cv/7-9.png",x="/images/um-cv/7-10.png",y="/images/um-cv/7-11.png",w="/images/um-cv/7-12.png",C="/images/um-cv/7-13.png",N="/images/um-cv/7-14.png",k="/images/um-cv/7-15.png",_="/images/um-cv/7-16.png",F="/images/um-cv/7-17.png",S="/images/um-cv/8-4.png",A="/images/um-cv/8-1.png",T="/images/um-cv/8-2.png",M="/images/um-cv/8-3.png",z="/images/um-cv/8-5.png",I="/images/um-cv/8-6.png",P="/images/um-cv/8-7.png",R="/images/um-cv/8-8.png",L="/images/um-cv/8-9.png",V="/images/um-cv/8-10.png",U="/images/um-cv/8-11.png",D="/images/um-cv/8-12.png",B="/images/um-cv/8-13.png",G="/images/um-cv/8-14.png",E="/images/um-cv/8-15.png",W="/images/um-cv/8-16.png",H={};function O(K,t){const n=r("center");return l(),i("div",null,[t[1]||(t[1]=e('<p>Problem: All of the previous models flattens the input image into a vector. This loses the spatial structure of the image. CNNs are designed to work with image data directly.</p><p>@Credits: <a href="https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/" target="_blank" rel="noopener noreferrer">EECS 498.007</a> | Video Lecture: <a href="https://www.youtube.com/watch?v=g6InpdhUblE&amp;list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r&amp;index=6" target="_blank" rel="noopener noreferrer">UM-CV 5 Neural Networks</a></p><p>Personal work for the assignments of the course: <a href="https://github.com/SaturnTsen/EECS-498-007/" target="_blank" rel="noopener noreferrer">github repo</a>.</p><p><strong>Notice on Usage and Attribution</strong></p><p>These are personal class notes based on the University of Michigan EECS 498.008 / 598.008 course. They are intended solely for personal learning and academic discussion, with no commercial use.</p><p>For detailed information, please refer to the <strong><a href="#notice-on-usage-and-attribution">complete notice at the end of this document</a></strong></p><h2 id="components-of-cnn" tabindex="-1"><a class="header-anchor" href="#components-of-cnn"><span>Components of CNN</span></a></h2><ul><li>Convolutional Layers</li><li>Pooling Layers</li><li>Normalization Layers</li></ul><h3 id="convolution-layer" tabindex="-1"><a class="header-anchor" href="#convolution-layer"><span>Convolution Layer</span></a></h3><p>Image: 3x32x32</p><p>Filter: 3x5x5 Convolve the filter with the image to get a dot product. The filter is convolved with the image by sliding it across the image. The output is a 1x28x28 map.</p><p>We have multiple (for example 6) filters, each filter produces a different output. The output of the convolutional layer is a stack of 6 (28x28) maps.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+p+'" width="70%" alt="description"><br> Fig: General form of convolutional layer</div><div style="text-align:center;margin-bottom:1em;"><img src="'+c+'" width="70%" alt="description"><br> Fig: Stacking Convolutions</div><p>Typo: the length of <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>b</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">b_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> is 6.</p><h4 id="what-do-convolutional-filters-learn" tabindex="-1"><a class="header-anchor" href="#what-do-convolutional-filters-learn"><span>What do convolutional filters learn?</span></a></h4><p>MLP: A set of template matching filters. Each filter is a set of weights that are learned during training. The filter is convolved with the input image to produce an output.</p><p>Convolutional Network: A set of local image templates, like edge detectors, corner detectors, etc.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+m+'" width="70%" alt="description"><br> Fig: Convolutional Filters</div><h4 id="padding" tabindex="-1"><a class="header-anchor" href="#padding"><span>Padding</span></a></h4><p>A closer look at spatial dimensions</p><div style="text-align:center;margin-bottom:1em;"><img src="'+g+'" width="70%" alt="description"><br> Fig: Convolutional Filters</div><p>Input: 7x7 -&gt; Filter 3x3 -&gt; Output: 5x5 In general: Input W -&gt; Filter K -&gt; Output W-K+1</p><div style="text-align:center;margin-bottom:1em;"><img src="'+h+'" width="70%" alt="description"><br> Fig: Padding</div><h4 id="receptive-field" tabindex="-1"><a class="header-anchor" href="#receptive-field"><span>Receptive Field</span></a></h4><div style="text-align:center;margin-bottom:1em;"><img src="'+u+'" width="70%" alt="description"><br> Fig: Receptive Field</div><p>The receptive field has two meanings: The kernel size and the field that the input dimension affects.</p><h4 id="strided-convolutions" tabindex="-1"><a class="header-anchor" href="#strided-convolutions"><span>Strided Convolutions</span></a></h4><p>Stride: The number of pixels the filter moves each time. Strided convolutions reduce the spatial dimensions of the output.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+v+`" width="70%" alt="description"><br> Fig: Strided Convolutions</div><p>Example:</p><p>Input volume 3x32x32 -&gt; 10 3x5x5 filters with stride 1, padding 2 Output volume size? Number of parameters? Number of multiply-add operations?</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><button class="copy" title="Copy code" data-copied="Copied"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark has-focused-lines vp-code"><code><span class="line has-focus"><span>Answer:</span></span>
<span class="line"><span>10x((32+4-5)/1+1)^2 = 10x32x32</span></span>
<span class="line"><span>10x3x5x5 + 10 = 760</span></span>
<span class="line"><span>768000, since each output pixel requires 3x5x5 multiplications. Total = 75 * (10*32*32) outputs = 768000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Example: 1x1 convolution</p><div style="text-align:center;margin-bottom:1em;"><img src="`+f+'" width="70%" alt="description"><br> Fig: 1x1 Convolution</div><p>Stacking 1x1 convolution layers gives MLP operating on each input position. This preserves the spatial structure of the input.</p><h4 id="convolution-summary" tabindex="-1"><a class="header-anchor" href="#convolution-summary"><span>Convolution Summary</span></a></h4><ul><li>Input: C_in x H x W</li><li>Hyperparameters: F filters, K kernel size, S stride, P padding</li><li>Weight Matrix: C_out x C_in x K x K giving C_out filters of size KxK</li><li>Bias vector: C_out</li><li>Output: C_out x H_out x W_out</li><li>H_out = (H + 2P - K)/S + 1</li><li>W_out = (W + 2P - K)/S + 1</li></ul><h4 id="other-types-of-convolution" tabindex="-1"><a class="header-anchor" href="#other-types-of-convolution"><span>Other types of convolution</span></a></h4><p>So far: 2D convolution. There are other types of convolutions like 1D, 3D, etc.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+b+'" width="60%" alt="description"><br> Fig: 1D Convolution</div><div style="text-align:center;margin-bottom:1em;"><img src="'+x+'" width="60%" alt="description"><br> Fig: 3D Convolution</div><p>Pytorch has 1d to 3d convolutional layers.</p><h3 id="pooling-layer" tabindex="-1"><a class="header-anchor" href="#pooling-layer"><span>Pooling Layer</span></a></h3><p>The pooling layer is used to reduce the spatial dimensions of the input. It is used to reduce the number of parameters and computation in the network. It also helps in controlling overfitting.</p><p>Pooling is a form of <strong>downsampling</strong>. It reduces the spatial dimensions of the input.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+y+'" width="70%" alt="description"><br> Fig: Pooling Layer</div><p>Types of pooling:</p><ul><li>Max pooling: Takes the maximum value in the pooling window.</li><li>Average pooling: Takes the average value in the pooling window.</li></ul><p>This introduces invariance to small spatial shifts, and there is no learnable parameters in pooling.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+w+'" width="70%" alt="description"><br> Fig: Pooling Summary</div><h2 id="convolutional-networks" tabindex="-1"><a class="header-anchor" href="#convolutional-networks"><span>Convolutional Networks</span></a></h2><p>Classic architecture:</p>',53)),s(n,null,{default:o(()=>t[0]||(t[0]=[d(" [Conv, ReLU, Pool] x N, flatten, FC, ReLU, FC, softmax ")])),_:1}),t[2]||(t[2]=e('<p>Example: LeNet-5</p><table><thead><tr><th><strong>Layer</strong></th><th><strong>Output Size</strong></th><th><strong>Weight Size</strong></th></tr></thead><tbody><tr><td><strong>Input</strong></td><td>1 x 28 x 28</td><td></td></tr><tr><td><strong>Conv</strong> (C_out=20, K=5, P=2, S=1)</td><td>20 x 28 x 28</td><td>20 x 1 x 5 x 5</td></tr><tr><td><strong>ReLU</strong></td><td>20 x 28 x 28</td><td></td></tr><tr><td><strong>MaxPool</strong> (K=2, S=2)</td><td>20 x 14 x 14</td><td></td></tr><tr><td><strong>Conv</strong> (C_out=50, K=5, P=2, S=1)</td><td>50 x 14 x 14</td><td>50 x 20 x 5 x 5</td></tr><tr><td><strong>ReLU</strong></td><td>50 x 14 x 14</td><td></td></tr><tr><td><strong>MaxPool</strong> (K=2, S=2)</td><td>50 x 7 x 7</td><td></td></tr><tr><td><strong>Flatten</strong></td><td>2450</td><td></td></tr><tr><td><strong>Linear</strong> (2450-&gt;500)</td><td>50 x 7 x 7</td><td>2450 x 500</td></tr><tr><td><strong>ReLU</strong></td><td>500</td><td></td></tr><tr><td><strong>Linear</strong> (500-&gt;10)</td><td>10</td><td>500 x 10</td></tr></tbody></table><p>We tend to decrease the spatial dimensions and increase the number of channels as we go deeper into the network.</p><h3 id="training-deep-networks-batch-normalization" tabindex="-1"><a class="header-anchor" href="#training-deep-networks-batch-normalization"><span>Training Deep Networks: Batch Normalization</span></a></h3><p>Problem: Deep networks are hard to train. The gradients tend to vanish or explode as we go deeper into the network.</p><h4 id="solution-batch-normalization" tabindex="-1"><a class="header-anchor" href="#solution-batch-normalization"><span>Solution: Batch Normalization</span></a></h4><p>This helps reduce the internal covariate shift. It normalizes the activations of the network. It helps in training deeper networks.</p><p>(Joffe and Szegedy, ICML 2015, <a href="https://arxiv.org/abs/1502.03167" target="_blank" rel="noopener noreferrer">Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift</a>)</p><div style="text-align:center;margin-bottom:1em;"><img src="'+C+'" width="70%" alt="description"><br> Fig: Batch Normalization</div><div style="text-align:center;margin-bottom:1em;"><img src="'+N+'" width="70%" alt="description"><br> Fig: Calculating Batch Normalization</div><p>Calculating mean and variance over the batch means the inputs are intertangled. The estimation depends on the batch size.</p><p>During training, we use the batch mean and variance.</p><p>During testing, we use the average and variance of the entire seen data during training.</p><p>During testing, the batchnorm becomes a linear operator! We can fuse them into the previous layer.</p><h4 id="batch-normalization-for-convolutional-networks" tabindex="-1"><a class="header-anchor" href="#batch-normalization-for-convolutional-networks"><span>Batch Normalization for Convolutional Networks</span></a></h4><div style="text-align:center;margin-bottom:1em;"><img src="'+k+'" width="70%" alt="description"><br> Fig: Batch Normalization for Convolutional Networks</div><p>See <a href="https://arxiv.org/abs/1502.03167" target="_blank" rel="noopener noreferrer">ICML 2015 paper</a> for more details.</p><p>Advantages and Disadvantages of Batch Normalization:</p><ul><li><p>Makes deep networks much easier to train.</p></li><li><p>Allows higher learning rates and faster convergence.</p></li><li><p>Networks become more robust to initialization.</p></li><li><p>Acts as regularization during training.</p></li><li><p>Zero overhead at test time. Can be fused into the previous layer.</p></li><li><p>Works well with feed-forward networks.</p></li><li><p>Not well understood theoretically(yet)</p></li><li><p>0 Mean is forced, and may not be ideal for all models.</p></li><li><p>Behaves differently during training and testing: this is a very common source of bugs!</p></li></ul><h4 id="instance-normalization" tabindex="-1"><a class="header-anchor" href="#instance-normalization"><span>Instance Normalization</span></a></h4><div style="text-align:center;margin-bottom:1em;"><img src="'+_+'" width="70%" alt="description"><br> Fig: Instance Normalization</div><div style="text-align:center;margin-bottom:1em;"><img src="'+F+'" width="70%" alt="description"><br> Fig: Different Normalization Techniques</div><h2 id="cnn-architectures" tabindex="-1"><a class="header-anchor" href="#cnn-architectures"><span>CNN Architectures</span></a></h2><h3 id="imagenet-classification-challenge" tabindex="-1"><a class="header-anchor" href="#imagenet-classification-challenge"><span>ImageNet Classification Challenge</span></a></h3><div style="text-align:center;margin-bottom:1em;"><img src="'+S+'" width="50%" alt="description"><br> Fig: ImageNet Classification Challenge</div><h3 id="alexnet-2012-winner-8-layers-60-million-parameters" tabindex="-1"><a class="header-anchor" href="#alexnet-2012-winner-8-layers-60-million-parameters"><span>AlexNet: 2012 winner. 8 layers, 60 million parameters.</span></a></h3><p>227×227 inputs, 5 Convolutional layers, Max pooling, 3 Fully connected layers, ReLU nonlinearity. Used &quot;local response normalization&quot;(not used anymore). Trained on two GTX 580 GPUs - only 3GB of memory each. Model split over two GPUs.</p><p>Fun fact: citations to the AlexNet</p><div style="text-align:center;margin-bottom:1em;"><img src="'+A+'" width="70%" alt="description"><br> Fig: AlexNet</div><table><thead><tr><th><strong>Layer</strong></th><th><strong>Input Size (C)</strong></th><th><strong>Input Size (H / W)</strong></th><th><strong>Filters</strong></th><th><strong>Kernel</strong></th><th><strong>Stride</strong></th><th><strong>Pad</strong></th><th><strong>Output Size (C)</strong></th><th><strong>Output Size (H / W)</strong></th><th><strong>Memory (KB)</strong></th><th><strong>Params (k)</strong></th><th><strong>FLOP (M)</strong></th></tr></thead><tbody><tr><td><strong>conv1</strong></td><td>3</td><td>227</td><td>64</td><td>11</td><td>4</td><td>2</td><td>64</td><td>56</td><td>784</td><td>23</td><td>73</td></tr><tr><td><strong>pool1</strong></td><td>64</td><td>56</td><td></td><td>3</td><td>2</td><td>0</td><td>64</td><td>27</td><td>182</td><td>0</td><td>0</td></tr><tr><td><strong>conv2</strong></td><td>64</td><td>27</td><td>192</td><td>5</td><td>1</td><td>2</td><td>192</td><td>27</td><td>547</td><td>307</td><td>224</td></tr><tr><td><strong>pool2</strong></td><td>192</td><td>27</td><td></td><td>3</td><td>2</td><td>0</td><td>192</td><td>13</td><td>127</td><td>0</td><td>0</td></tr><tr><td><strong>conv3</strong></td><td>192</td><td>13</td><td>384</td><td>3</td><td>1</td><td>1</td><td>384</td><td>13</td><td>254</td><td>664</td><td>112</td></tr><tr><td><strong>conv4</strong></td><td>384</td><td>13</td><td>256</td><td>3</td><td>1</td><td>1</td><td>256</td><td>13</td><td>169</td><td>885</td><td>145</td></tr><tr><td><strong>conv5</strong></td><td>256</td><td>13</td><td>256</td><td>3</td><td>1</td><td>1</td><td>256</td><td>13</td><td>169</td><td>590</td><td>100</td></tr><tr><td><strong>pool5</strong></td><td>256</td><td>13</td><td></td><td>3</td><td>2</td><td>0</td><td>256</td><td>6</td><td>36</td><td>0</td><td>0</td></tr><tr><td><strong>flatten</strong></td><td>256</td><td>6</td><td></td><td></td><td></td><td></td><td>9216</td><td></td><td>36</td><td>0</td><td>0</td></tr><tr><td><strong>fc6</strong></td><td>9216</td><td></td><td></td><td></td><td></td><td></td><td>4096</td><td></td><td>16</td><td>37,749</td><td>38</td></tr><tr><td><strong>fc7</strong></td><td>4096</td><td></td><td></td><td></td><td></td><td></td><td>4096</td><td></td><td>16</td><td>16,777</td><td>17</td></tr><tr><td><strong>fc8</strong></td><td>4096</td><td></td><td></td><td></td><td></td><td></td><td>1000</td><td></td><td>4</td><td>4,096</td><td>4</td></tr></tbody></table><p>conv1: Number of floating point operations (multiply+add) = (number of output elements) * (ops per output element) = (64 * 56 * 56) * (11 * 11 * 3) = 72,855,552 = 73M flops</p><p><strong>How is it designed?</strong> Trails and errors. Also a compromise between memory usage and computational efficiency.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+T+'" width="70%" alt="description"><br> Fig: AlexNet</div><h4 id="zfnet-a-bigger-alexnet" tabindex="-1"><a class="header-anchor" href="#zfnet-a-bigger-alexnet"><span>ZFNet: A Bigger AlexNet</span></a></h4><p>Similar to AlexNet, but with smaller filters and deeper layers. 7x7 filters in the first layer, 3x3 filters in the second layer. Deeper layers.</p><h3 id="vgg-the-principles-of-designing-a-good-network" tabindex="-1"><a class="header-anchor" href="#vgg-the-principles-of-designing-a-good-network"><span>VGG: The principles of designing a good network</span></a></h3><ul><li>All conv are 3x3 stride 1 pad 1</li><li>All max pool are 2x2 stride 2 <ul><li>Two convolutional layers together make a receptive field of 5x5, while having fewer parameters and less flops. We can also add ReLU after each layer to add non-linearity to the network.</li></ul></li><li>After pool, double the number of channels <ul><li>We want each convolutional layer to have the same computational cost.</li><li>Input1: Cx2Hx2W - Conv(3x3, C-&gt;C) - 4HWC Memory - 9C^2 Params - 4HWC flops</li><li>Input2: 2CxHxW - Conv(3x3, 2C-&gt;2C) - 4HWC Memory - 36C^2 Params - 4HWC flops</li></ul></li></ul><p><strong>5 stages:</strong> conv-conv-pool conv-conv-pool conv-conv-pool conv-conv-conv-(conv)-pool conv-conv-conv-(conv)-pool FC-FC-FC</p><p>VGG is much larger than AlexNet. It has 138 million parameters! VGG is 19.4x computationally more expensive than AlexNet.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+M+'" width="70%" alt="description"><br> Fig: VGG</div><p>Done in academia by one grad and one faculty member.</p><h3 id="google-lenet-focus-on-efficiency" tabindex="-1"><a class="header-anchor" href="#google-lenet-focus-on-efficiency"><span>Google LeNet: Focus on Efficiency</span></a></h3><p>Design an efficient convolutional network for mobile devices. 22 layers, 4 million parameters.</p><p><strong>Aggressive Stem</strong> downsamples the network at the beginning. 3x3 convolutions, 1x1 convolutions, and factorized convolutions. (CVPR 2015)</p><div style="text-align:center;margin-bottom:1em;"><img src="'+z+'" width="70%" alt="description"><br> Fig: Google LeNet</div><p><strong>Inception Module</strong> repeated throughout the network. It uses multiple filter sizes in parallel. It uses 1x1, 3x3, 5x5, and max pooling in parallel. It concatenates the outputs of these filters. Do all the kernel sizes in parallel and concatenate the outputs.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+I+'" width="70%" alt="description"><br> Fig: Inception Module</div><p><strong>Global Average Pooling</strong> at the end. Rather than flatting tensor, it takes the average of the tensor.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+P+'" width="70%" alt="description"><br> Fig: Global Average Pooling</div><p><strong>Auxiliary Classifiers</strong> at intermediate layers. Making gradient flow easier. (For VGG, the network is trained layerwise.)</p><div style="text-align:center;margin-bottom:1em;"><img src="'+R+'" width="70%" alt="description"><br> Fig: Auxiliary Classifiers</div><h3 id="resnet-cvpr-2016" tabindex="-1"><a class="header-anchor" href="#resnet-cvpr-2016"><span>ResNet (CVPR 2016)</span></a></h3><p>Deeper models does worse than shallow model!</p><p>Initial Guess: Deep model is overfitting. In fact, the training error of deeper networks is also higher than the shallower networks.</p><p>Hypothesis: This is an optimization problem. The deeper networks are harder to optimize, and in particular don&#39;t learn the identity functions to emulate the shallower networks.</p><p>Solution: Change the network so learning identity function is easier.</p><p><strong>Residual Block</strong>: Instead of learning <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>H</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">H(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.08125em;">H</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>, learn <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>F</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>H</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>−</mo><mi>x</mi></mrow><annotation encoding="application/x-tex">F(x) = H(x) - x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.08125em;">H</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">x</span></span></span></span>. The network learns the residual function.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+L+'" width="70%" alt="description"><br> Fig: Residual Block</div><p>When backpropagating, the gradient is copied to the input. This makes the optimization easier.</p><p>Network is divided into stages like VGG. Each stage has a different number of filters.</p><div style="text-align:center;margin-bottom:1em;"><img src="'+V+'" width="70%" alt="description"><br> Fig: ResNet</div><h4 id="basic-block-and-bottleneck-block" tabindex="-1"><a class="header-anchor" href="#basic-block-and-bottleneck-block"><span>Basic Block and Bottleneck Block</span></a></h4><div style="text-align:center;margin-bottom:1em;"><img src="'+U+'" width="70%" alt="description"><br> Fig: Basic Block and Bottleneck Block</div><p>In 2015, ResNet ranked 1st in all five competitions!</p><p>MSRA @ ILSVRC &amp; COCO 2015 competitions</p><ul><li>ImageNet Classification</li><li>ImageNet Detection</li><li>ImageNet Localization</li><li>COCO Detection</li><li>COCO Segmentation</li></ul><h3 id="comparing-complexity" tabindex="-1"><a class="header-anchor" href="#comparing-complexity"><span>Comparing Complexity</span></a></h3><div style="text-align:center;margin-bottom:1em;"><img src="'+D+'" width="70%" alt="description"><br> Fig: Comparing Complexity</div><p>ImageNet 2016 winner: Model Ensembles</p><h3 id="resnext" tabindex="-1"><a class="header-anchor" href="#resnext"><span>ResNeXt</span></a></h3><p>ResNeXt: Aggregated Residual Transformations for Deep Neural Networks (CVPR 2017)</p><div style="text-align:center;margin-bottom:1em;"><img src="'+B+'" width="70%" alt="description"><br> Fig: ResNeXt</div><p>Annual ImageNet competition is no longer held after 2017. Now it is moved to Kaggle as a challenge.</p><h3 id="densenet" tabindex="-1"><a class="header-anchor" href="#densenet"><span>DenseNet</span></a></h3><p>Densely Connected Convolutional Networks (CVPR 2017)</p><div style="text-align:center;margin-bottom:1em;"><img src="'+G+'" width="70%" alt="description"><br> Fig: DenseNet</div><h3 id="mobilenets-tiny-networks" tabindex="-1"><a class="header-anchor" href="#mobilenets-tiny-networks"><span>MobileNets: Tiny Networks</span></a></h3><p>MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications (CVPR 2017)</p><div style="text-align:center;margin-bottom:1em;"><img src="'+E+'" width="70%" alt="description"><br> Fig: MobileNets</div><p>Also related:</p><p><a href="https://arxiv.org/abs/1707.01083" target="_blank" rel="noopener noreferrer">ShuffleNet: An Extremely Efficient Convolutional Neural Network for Mobile Devices (CVPR 2018)</a></p><p><a href="https://arxiv.org/abs/1801.04381" target="_blank" rel="noopener noreferrer">MobileNetV2: Inverted Residuals and Linear Bottlenecks (CVPR 2018)</a></p><p><a href="https://arxiv.org/abs/1807.11164" target="_blank" rel="noopener noreferrer">ShuffleNetV2: Practical Guidelines for Efficient CNN Architecture Design (ECCV 2018)</a></p><h3 id="neural-architecture-search-nas" tabindex="-1"><a class="header-anchor" href="#neural-architecture-search-nas"><span>Neural Architecture Search (NAS)</span></a></h3><p>a hot topic in deep learning research</p><div style="text-align:center;margin-bottom:1em;"><img src="'+W+'" width="70%" alt="description"><br> Fig: Neural Architecture Search</div><h2 id="summary" tabindex="-1"><a class="header-anchor" href="#summary"><span>Summary</span></a></h2><p>Early work (AlexNet, VGG) focused on designing deeper networks.</p><p>Later work (ResNet, DenseNet) focused on designing more efficient networks. Recent work (MobileNets, ShuffleNet) focused on designing networks for mobile devices.</p><p>Early work (AlexNet -&gt; ZFNet -&gt; VGG) shows that bigger networks work better</p><p>GoogLeNet one of the first to focus on efficiency (aggressive stem, 1x1 bottleneck convolutions, global avg pool instead of FC layers)</p><p>ResNet showed us how to train extremely deep networks - limited only by GPU memory! Started to show diminishing returns as networks got bigger</p><p>After ResNet: Efficient networks became central: how can we improve the accuracy without increasing the complexity?</p><p>Lots of tiny networks aimed at mobile devices: MobileNet, ShuffleNet, etc</p><p>Neural Architecture Search promises to automate architecture design</p><h3 id="what-architecture-should-i-use" tabindex="-1"><a class="header-anchor" href="#what-architecture-should-i-use"><span>What architecture should I use?</span></a></h3><p>For most problems you should use an off-the-shelf architecture (e.g. ResNet, DenseNet, etc)</p><p>If you just care about accuracy, ResNet-50 or ResNet-101 is a good choice.</p><p>If you care about efficiency, MobileNet or ShuffleNet is a good choice.</p><h2 id="notice-on-usage-and-attribution" tabindex="-1"><a class="header-anchor" href="#notice-on-usage-and-attribution"><span><strong>Notice on Usage and Attribution</strong></span></a></h2><p>This note is based on the <strong>University of Michigan&#39;s publicly available course EECS 498.008 / 598.008</strong> and is intended <strong>solely for personal learning and academic discussion</strong>, with no commercial use.</p><ul><li><strong>Nature of the Notes:</strong> These notes include extensive references and citations from course materials to ensure clarity and completeness. However, they are presented as personal interpretations and summaries, not as substitutes for the original course content.</li><li><strong>Original Course Resources:</strong> Please refer to the <strong>official University of Michigan website</strong> for complete and accurate course materials.</li><li><strong>Third-Party Open Access Content:</strong> This note may reference Open Access (OA) papers or resources cited within the course materials. These materials are used under their original <strong>Open Access licenses</strong> (e.g., CC BY, CC BY-SA).</li><li><strong>Proper Attribution:</strong> Every referenced OA resource is appropriately cited, including the <strong>author, publication title, source link, and license type</strong>.</li><li><strong>Copyright Notice:</strong> All rights to third-party content remain with their respective authors or publishers.</li><li><strong>Content Removal:</strong> If you believe any content infringes on your copyright, please contact me, and I will <strong>promptly remove</strong> the content in question.</li></ul><p>Thanks to the <strong>University of Michigan</strong> and the contributors to the course for their openness and dedication to accessible education.</p>',103))])}const j=a(H,[["render",O],["__file","index.html.vue"]]),q=JSON.parse('{"path":"/computer-vision/UMichigan-CV/um-cv-course-7-CNN/","title":"UM-CV 7 & 8 CNN and its design principles","lang":"en-US","frontmatter":{"title":"UM-CV 7 & 8 CNN and its design principles","tags":["notes","computer-vision"],"createTime":"2024/12/21 17:34:25","permalink":"/computer-vision/UMichigan-CV/um-cv-course-7-CNN/","description":"Problem: All of the previous models flattens the input image into a vector. This loses the spatial structure of the image. CNNs are designed to work with image data directly. @C...","head":[["meta",{"property":"og:url","content":"https://saturntsen.github.io/computer-vision/UMichigan-CV/um-cv-course-7-CNN/"}],["meta",{"property":"og:site_name","content":"SaturnTsen"}],["meta",{"property":"og:title","content":"UM-CV 7 & 8 CNN and its design principles"}],["meta",{"property":"og:description","content":"Problem: All of the previous models flattens the input image into a vector. This loses the spatial structure of the image. CNNs are designed to work with image data directly. @C..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-29T13:11:10.000Z"}],["meta",{"property":"article:tag","content":"notes"}],["meta",{"property":"article:tag","content":"computer-vision"}],["meta",{"property":"article:modified_time","content":"2024-12-29T13:11:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"UM-CV 7 & 8 CNN and its design principles\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-29T13:11:10.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":9.61,"words":2882},"git":{"updatedTime":1735477870000,"contributors":[{"name":"SaturnTsen","username":"SaturnTsen","email":"minger233@outlook.com","commits":5,"avatar":"https://avatars.githubusercontent.com/SaturnTsen?v=4","url":"https://github.com/SaturnTsen"}]},"autoDesc":true,"filePathRelative":"UM-CV/UM-CV 7 CNN.md","categoryList":[{"id":"a5343e","sort":10006,"name":"UM-CV"}],"bulletin":false}');export{j as comp,q as data};