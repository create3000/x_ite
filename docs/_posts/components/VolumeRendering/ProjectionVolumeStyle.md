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

The ProjectionVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + ProjectionVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

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

## Information

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## See Also

- [X3D Specification of ProjectionVolumeStyle node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ProjectionVolumeStyle){:target="_blank"}
