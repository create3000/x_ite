---
title: CartoonVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [CartoonVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CartoonVolumeStyle generates cartoon-style non-photorealistic rendering of associated volumetric data.

The CartoonVolumeStyle node belongs to the **VolumeRendering** component and its container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + CartoonVolumeStyle
```

## Fields

### SFInt32 [in, out] **colorSteps** 4 <small>[1,64]</small>

Number of distinct colors taken from interpolated colors and used to render the object.

#### Hints

ColorSteps=1 means no color interpolation takes place, only use orthogonalColor. ParallelColor and orthogonalColor interpolation is in HSV color space for RGB components, linearly for alpha component.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFColorRGBA [in, out] **orthogonalColor** 1 1 1 1 <small>[0,1]</small>

OrthogonalColor is used for surface normals that are orthogonal (perpendicular) to viewer's current location.

#### Hint

Plane of surface itself is orthogonal to user's view direction.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFColorRGBA [in, out] **parallelColor** 0 0 0 1 <small>[0,1]</small>

ParallelColor is used for surface normals that are orthogonal to viewer's current location.

#### Hint

Plane of surface itself is parallel to user's view direction.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

Input/Output field surfaceNormals.

## Description

### Hint

- Contains single Texture3D node with containerField='surfaceNormals'

## External Links

- [X3D Specification of CartoonVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#CartoonVolumeStyle){:target="_blank"}
