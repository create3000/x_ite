---
title: ProjectionVolumeStyle
date: 2023-01-07
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

The ProjectionVolumeStyle node belongs to the **VolumeRendering** component and requires at least level **2,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + ProjectionVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFString [in, out] **type** "MAX" <small>["MAX"|"MIN"|"AVERAGE"]</small>

If *type*=MAX then Maximum Intensity Projection (MIP) or Least MIP (LMIP) algorithm is used to generate output color. If *type*=MIN then Minimum Intensity Projection algorithm is used. If *type*=AVERAGE then all voxels along ray are averaged.

#### Hint

- *type*=AVERAGE matches a simple approximation of an X-ray.#10;

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFFloat [in, out] **intensityThreshold** 0 <small>[0,1]</small>

Threshold value used when type=MIN (LMIP) or type=MAX (MIP).

#### Hint

- Ignored if type=AVERAGE (no thresholding).

## Advice

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/VolumeRendering/ProjectionVolumeStyle/ProjectionVolumeStyle.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/VolumeRendering/ProjectionVolumeStyle/screenshot.avif" alt="ProjectionVolumeStyle"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/VolumeRendering/ProjectionVolumeStyle/ProjectionVolumeStyle.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/VolumeRendering/ProjectionVolumeStyle/ProjectionVolumeStyle.x3d)
{: .example-links }

## See Also

- [X3D Specification of ProjectionVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ProjectionVolumeStyle)
