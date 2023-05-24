---
title: ToneMappedVolumeStyle
date: 2022-01-07
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

The ToneMappedVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ToneMappedVolumeStyle
```

## Fields

### SFColorRGBA [in, out] **coolColor** 0 0 1 0 <small>[0,1]</small>

*coolColor* is used for surfaces facing away from the light direction.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

Input/Output field surfaceNormals.

### SFColorRGBA [in, out] **warmColor** 1 1 0 0 <small>[0,1]</small>

*warmColor* is used for surfaces facing towards the light.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

## Description

### Hint

- ToneMappedVolumeStyle can contain a single Texture3D node with containerField='surfaceNormals'

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/ToneMappedVolumeStyle.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of ToneMappedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ToneMappedVolumeStyle){:target="_blank"}
