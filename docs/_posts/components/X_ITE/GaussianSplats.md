---
title: GaussianSplats
date: 2023-01-07
nav: components-X_ITE
categories: [components, X_ITE]
tags: [GaussianSplats, X_ITE]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

The GaussianSplats node adds basic support for storing 3D Gaussian splats in X3D files.

The GaussianSplats node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and its default container field is *children.* It is available in X_ITE.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + GaussianSplats (*X3DBoundedObject)
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL |
| SFString | [in, out] | [colorSpace](#fields-colorSpace) | "SRGB_REC709_DISPLAY" |
| MFVec3f | [in, out] | [positions](#fields-positions) | [ ] |
| MFVec4f | [in, out] | [orientations](#fields-orientations) | [ ] |
| MFVec3f | [in, out] | [scales](#fields-scales) | [ ] |
| MFFloat | [in, out] | [opacities](#fields-opacities) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonics0](#fields-sphericalHarmonics0) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonics1](#fields-sphericalHarmonics1) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonics2](#fields-sphericalHarmonics2) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonics3](#fields-sphericalHarmonics3) | [ ] |
| SFBool | [in, out] | [visible](#fields-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#fields-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#fields-bboxSize) | -1 -1 -1 |
| SFVec3f | [ ] | [bboxCenter](#fields-bboxCenter) | 0 0 0 |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **colorSpace** "SRGB_REC709_DISPLAY"
{: #fields-colorSpace }

The color space of the reconstructed color values. It must be one of:

- SRGB_REC709_DISPLAY
- LIN_REC709_DISPLAY

### MFVec3f [in, out] **positions** [ ] <small>(-∞,∞)</small>
{: #fields-positions }

Input/Output field *positions*.

### MFVec4f [in, out] **orientations** [ ] <small>[-1,1]</small>
{: #fields-orientations }

Input/Output field *orientations*.

### MFVec3f [in, out] **scales** [ ] <small>(-∞,∞)</small>
{: #fields-scales }

Input/Output field *scales*.

### MFFloat [in, out] **opacities** [ ] <small>[0,1]</small>
{: #fields-opacities }

Input/Output field *opacities*.

### MFVec3f [in, out] **sphericalHarmonics0** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonics0 }

Input/Output field *sphericalHarmonics0*.

### MFVec3f [in, out] **sphericalHarmonics1** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonics1 }

Input/Output field *sphericalHarmonics1*.

### MFVec3f [in, out] **sphericalHarmonics2** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonics2 }

Input/Output field *sphericalHarmonics2*.

### MFVec3f [in, out] **sphericalHarmonics3** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonics3 }

Input/Output field *sphericalHarmonics3*.

### SFBool [in, out] **visible** TRUE
{: #fields-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #fields-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #fields-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #fields-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

## Example

<x3d-canvas class="buttons-br" src="https://create3000.github.io/media/examples/X_ITE/GaussianSplats/GaussianSplats.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/X_ITE/GaussianSplats/screenshot.avif" alt="GaussianSplats"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/X_ITE/GaussianSplats/GaussianSplats.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/X_ITE/GaussianSplats/GaussianSplats.x3d)
{: .example-links }

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> |
{: .browser-compatibility }

## See Also

- [Khronos glTF Specification of the KHR_gaussian_splatting Extension](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md)
