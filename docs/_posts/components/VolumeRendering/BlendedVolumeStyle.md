---
title: BlendedVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [BlendedVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BlendedVolumeStyle combines rendering of two voxel data sets into one by blending voxel values.

The BlendedVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + BlendedVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFFloat [in, out] **weightConstant1** 0.5 <small>[0,1]</small>

*weightConstant1* is used when weightFunction1=CONSTANT

### SFFloat [in, out] **weightConstant2** 0.5 <small>[0,1]</small>

*weightConstant2* is used when weightFunction2=CONSTANT

### SFString [in, out] **weightFunction1** "CONSTANT" <small>["CONSTANT", "ALPHA0", "ALPHA1", "TABLE", "ONE_MINUS_ALPHA0", "ONE_MINUS_ALPHA1"]</small>

Specifies 2D textures used to determine weight values when weight function is set to TABLE.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **weightFunction2** "CONSTANT" <small>["CONSTANT", "ALPHA0", "ALPHA1", "TABLE", "ONE_MINUS_ALPHA0", "ONE_MINUS_ALPHA1"]</small>

Specifies 2D textures used to determine weight values when weight function is set to TABLE.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFNode [in, out] **weightTransferFunction1** NULL <small>[X3DTexture2DNode]</small>

The weightTransferFunction1 and weightTransferFunction2 fields specify two-dimensional textures that are used to determine the weight values when the weight function is set to "TABLE". The output weight value depends on the number of components in the textures as specified in Table 41.4.

### SFNode [in, out] **weightTransferFunction2** NULL <small>[X3DTexture2DNode]</small>

The weightTransferFunction1 and weightTransferFunction2 fields specify two-dimensional textures that are used to determine the weight values when the weight function is set to "TABLE". The output weight value depends on the number of components in the textures as specified in Table 41.4.

### SFNode [in, out] **renderStyle** NULL <small>[X3DComposableVolumeRenderStyleNode]</small>

Input/Output field renderStyle.

### SFNode [in, out] **voxels** NULL <small>[X3DTexture3DNode]</small>

Input/Output field voxels.

#### See Also

- [See X3D Specification Table 41.3, Weight function types](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/volume.html#t-WeightFunctionTypes){:target="_blank"}
- [See X3D Specification Table 41.4, Transfer function to weight mapping](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#t-transferFunctionToWeightMapping){:target="_blank"}

## Description

### Hint

- BlendedVolumeStyle can contain just one each of following: VolumeStyle node with containerField='renderStyle', Texture3D node with containerField='voxels', Texture2D node with containerField='weightTransferFunction1' and Texture2D node with containerField='weightTransferFunction2'.

## External Links

- [X3D Specification of BlendedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#BlendedVolumeStyle){:target="_blank"}
