---
title: OpacityMapVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [OpacityMapVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

OpacityMapVolumeStyle specifies that volumetric data is rendered using opacity mapped to a transfer function texture.

The OpacityMapVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + OpacityMapVolumeStyle
```

## Fields

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [in, out] **transferFunction** NULL <small>[X3DTexture2DNode,X3DTexture3DNode]</small>

Input/Output field transferFunction.

## Description

### Hint

- Contains a single ImageTexture2D or ImageTexture3D node with containerField='transferFunction'. Voxel values are used as lookup coordinates into the transfer function texture, where the texel value represents the output color.

## External Links

- [X3D Specification of OpacityMapVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#OpacityMapVolumeStyle){:target="_blank"}
