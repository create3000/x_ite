---
title: ShadedVolumeStyle
date: 2023-01-07
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

The ShadedVolumeStyle node belongs to the **VolumeRendering** component and requires at least level **3,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ShadedVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **lighting** FALSE

Whether rendering calculates and applies shading effects to visual output.

### SFBool [in, out] **shadows** FALSE

Whether rendering calculates and applies *shadows* to visual output (using global illumination model).

### SFString [ ] **phaseFunction** "Henyey-Greenstein" <small>["Henyey-Greenstein"|"NONE"|...]</small>

Define scattering model for implementations using global illumination (NONE or Henyey-Greenstein phase function).#10;

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFNode [in, out] **material** NULL <small>[X3DMaterialNode]</small>

Colour and opacity is determined based on whether a value has been specified for the *material* field.

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Advice

### Hint

- ShadedVolumeStyle can contain a single Texture3D node with `containerField='surfaceNormals'` and a single [Material](/x_ite/components/shape/material/) node.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='3'/>` or level='4' to include shadows.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/VolumeRendering/ShadedVolumeStyle/ShadedVolumeStyle.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/VolumeRendering/ShadedVolumeStyle/screenshot.png" alt="ShadedVolumeStyle"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/VolumeRendering/ShadedVolumeStyle/ShadedVolumeStyle.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/VolumeRendering/ShadedVolumeStyle/ShadedVolumeStyle.x3d)
{: .example-links }

## See Also

- [X3D Specification of ShadedVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ShadedVolumeStyle)
