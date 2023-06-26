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

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFColorRGBA [in, out] **edgeColor** 0 0 0 1 <small>[0,1]</small>

Color used to highlight edges.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **gradientThreshold** 0.4 <small>[0,π]</small>

Minimum angle (in radians) away from view-direction vector for surface normal before applying enhancement

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Information

### Hint

- SurfaceNormals can be provided in a single ComposedTexture3D, ImageTexture3D or PixelTexture3D node.

### Warning

- Requires X3D profile='Full' or else include <component name='VolumeRendering' level='2'/>

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/EdgeEnhancementVolumeStyle.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of EdgeEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#EdgeEnhancementVolumeStyle){:target="_blank"}
