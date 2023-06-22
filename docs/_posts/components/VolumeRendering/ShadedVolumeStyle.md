---
title: ShadedVolumeStyle
date: 2022-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [ShadedVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ShadedVolumeStyle applies Blinn-Phong illumination model to volume rendering.

The ShadedVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ShadedVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **lighting** FALSE

Whether rendering calculates and applies shading effects to visual output.

### SFBool [in, out] **shadows** FALSE

Whether rendering calculates and applies shadows to visual output (using global illumination model).

### SFString [ ] **phaseFunction** "Henyey-Greenstein" <small>["Henyey-Greenstein"|"NONE"|...]</small>

Define scattering model for implementations using global illumination (NONE or Henyey-Greenstein phase function).#10;

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFNode [in, out] **material** NULL <small>[X3DMaterialNode]</small>

Input/Output field material.

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

Input/Output field surfaceNormals.

## Description

### Hint

- ShadedVolumeStyle can contain a single Texture3D node with containerField='surfaceNormals' and a single Material node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/VolumeRendering/ShadedVolumeStyle/ShadedVolumeStyle.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of ShadedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ShadedVolumeStyle){:target="_blank"}
