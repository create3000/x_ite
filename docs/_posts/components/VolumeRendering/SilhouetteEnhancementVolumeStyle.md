---
title: SilhouetteEnhancementVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [SilhouetteEnhancementVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SilhouetteEnhancementVolumeStyle specifies that volumetric data is rendered with silhouette enhancement.

The SilhouetteEnhancementVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + SilhouetteEnhancementVolumeStyle
```

## Fields

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in, out] **silhouetteBoundaryOpacity** 0 <small>[0,1]</small>

Amount of the silhouette enhancement to use.

### SFFloat [in, out] **silhouetteRetainedOpacity** 1 <small>[0,1]</small>

Scaling of non-silhouette regions.

### SFFloat [in, out] **silhouetteSharpness** 0.5 <small>[0,∞)</small>

Power function to control sharpness of the silhouette.

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

Input/Output field surfaceNormals.

## Description

### Hint

- SilhouetteEnhancementVolumeStyle can contain a single Texture3D node with containerField='surfaceNormals'

## External Links

- [X3D Specification of SilhouetteEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#SilhouetteEnhancementVolumeStyle){:target="_blank"}
