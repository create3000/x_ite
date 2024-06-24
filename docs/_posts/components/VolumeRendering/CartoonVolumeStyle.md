---
title: CartoonVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [CartoonVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CartoonVolumeStyle generates cartoon-style non-photorealistic rendering of associated volumetric data.

The CartoonVolumeStyle node belongs to the **VolumeRendering** component and requires at least level **3,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + CartoonVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFInt32 [in, out] **colorSteps** 4 <small>[1,64]</small>

Number of distinct colors taken from interpolated colors and used to render the object.

#### Hints

- *colorSteps*=1 means no color interpolation takes place, only use orthogonalColor.
- ParallelColor and orthogonalColor interpolation is in HSV color space for RGB components, linearly for alpha component.

### SFColorRGBA [in, out] **orthogonalColor** 1 1 1 1 <small>[0,1]</small>

*orthogonalColor* is used for surface normals that are orthogonal (perpendicular) to viewer's current location.

#### Hints

- Plane of surface itself is orthogonal to user's view direction.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFColorRGBA [in, out] **parallelColor** 0 0 0 1 <small>[0,1]</small>

*parallelColor* is used for surface normals that are orthogonal to viewer's current location.

#### Hints

- Plane of surface itself is parallel to user's view direction.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Advice

### Hint

- Contains single Texture3D node with `containerField='surfaceNormals'`

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='3'/>`

## See Also

- [X3D Specification of CartoonVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#CartoonVolumeStyle){:target="_blank"}
