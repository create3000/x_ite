---
title: EdgeEnhancementVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [EdgeEnhancementVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

EdgeEnhancementVolumeStyle specifies edge enhancement for the volume rendering style.

The EdgeEnhancementVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + EdgeEnhancementVolumeStyle
```

## Fields

### SFColorRGBA [in, out] **edgeColor** 0 0 0 1 <small>[0,1]</small>

Color used to highlight edges.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFFloat [in, out] **gradientThreshold** 0.4 <small>[0,π]</small>

Minimum angle (in radians) away from view-direction vector for surface normal before applying enhancement

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

Input/Output field surfaceNormals.

## Description

### Hint

- SurfaceNormals can be provided in a single ComposedTexture3D, ImageTexture3D or PixelTexture3D node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/EdgeEnhancementVolumeStyle.x3d"></x3d-canvas>

## External Links

- [X3D Specification of EdgeEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#EdgeEnhancementVolumeStyle){:target="_blank"}
