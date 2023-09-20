---
title: ToneMappedVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [ToneMappedVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ToneMappedVolumeStyle specifies that volumetric data is rendered with Gooch shading model of two-toned warm/cool coloring.

The ToneMappedVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ToneMappedVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFColorRGBA [in, out] **coolColor** 0 0 1 0 <small>[0,1]</small>

*coolColor* is used for surfaces facing away from the light direction.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFColorRGBA [in, out] **warmColor** 1 1 0 0 <small>[0,1]</small>

*warmColor* is used for surfaces facing towards the light.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Advisories

### Hints

- ToneMappedVolumeStyle can contain a single Texture3D node with `containerField='surfaceNormals'`
- [Gooch shading](https://en.wikipedia.org/wiki/Gooch_shading){:target="_blank"}

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/ToneMappedVolumeStyle.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/ToneMappedVolumeStyle.x3d)

## See Also

- [X3D Specification of ToneMappedVolumeStyle node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ToneMappedVolumeStyle){:target="_blank"}
