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

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFFloat [in, out] **silhouetteRetainedOpacity** 1 <small>[0,1]</small>

Scaling of non-silhouette regions.

### SFFloat [in, out] **silhouetteBoundaryOpacity** 0 <small>[0,1]</small>

Amount of the silhouette enhancement to use.

### SFFloat [in, out] **silhouetteSharpness** 0.5 <small>[0,∞)</small>

Power function to control sharpness of the silhouette.

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Description

### Hint

- SilhouetteEnhancementVolumeStyle can contain a single Texture3D node with containerField='surfaceNormals'

## External Links

- [X3D Specification of SilhouetteEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#SilhouetteEnhancementVolumeStyle){:target="_blank"}
