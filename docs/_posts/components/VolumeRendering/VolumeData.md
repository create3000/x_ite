---
title: VolumeData
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [VolumeData, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

VolumeData displays a simple non-segmented voxel dataset with a single RenderStyle node.

The VolumeData node belongs to the **VolumeRendering** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DVolumeDataNode
      + VolumeData
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFVec3f | [in, out] | [dimensions](#field-dimensions) | 1 1 1  |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#field-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#field-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#field-bboxCenter) | 0 0 0  |
| SFNode | [in, out] | [renderStyle](#field-renderStyle) | NULL  |
| SFNode | [in, out] | [voxels](#field-voxels) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFVec3f [in, out] **dimensions** 1 1 1 <small>(0,∞)</small>
{: #field-dimensions }

Actual-size X-Y-Z *dimensions* of volume data in local coordinate system.

### SFBool [in, out] **visible** TRUE
{: #field-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #field-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #field-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #field-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFNode [in, out] **renderStyle** NULL <small>[X3DVolumeRenderStyleNode]</small>
{: #field-renderStyle }

Single contained X3DVolumeRenderStyleNode node that defines specific rendering technique for this volumetric object. If field is not defined, default is [OpacityMapVolumeStyle](/x_ite/components/volumerendering/opacitymapvolumestyle/) node.

### SFNode [in, out] **voxels** NULL <small>[X3DTexture3DNode]</small>
{: #field-voxels }

Single contained X3DTexture3DNode ([ComposedTexture3D](/x_ite/components/texturing3d/composedtexture3d/), [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/), [PixelTexture3D](/x_ite/components/texturing3d/pixeltexture3d/)) that provides raw voxel information utilized by corresponding rendering styles. Any number of color components (1-4) may be defined.

## Advice

### Hint

- VolumeData can contain a single Texture3D node with `containerField='voxels'` and a single RenderStyle node.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='1'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/VolumeRendering/VolumeData/VolumeData.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/VolumeRendering/VolumeData/screenshot.avif" alt="VolumeData"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/VolumeRendering/VolumeData/VolumeData.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/VolumeRendering/VolumeData/VolumeData.x3d)
{: .example-links }

## See Also

- [X3D Specification of VolumeData Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#VolumeData)
