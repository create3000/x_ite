---
title: ProjectionVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [ProjectionVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ProjectionVolumeStyle uses voxel data to directly generate output color.

The ProjectionVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + ProjectionVolumeStyle
```

## Fields

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in, out] **intensityThreshold** 0 <small>[0,1]</small>

Threshold value used when type=MIN (LMIP) or type=MAX (MIP).

#### Hint

- Ignored if type=AVERAGE (no thresholding).

## External Links

- [X3D Specification of ProjectionVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ProjectionVolumeStyle){:target="_blank"}
