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
    + X3DChildNode
      + GaussianSplats (*X3DBoundedObject)
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) |  |
| SFBool | [in, out] | [pointerEvents](#fields-pointerEvents) |  |
| SFBool | [in, out] | [castShadow](#fields-castShadow) |  |
| SFBool | [in, out] | [visible](#fields-visible) |  |
| SFBool | [in, out] | [bboxDisplay](#fields-bboxDisplay) |  |
| SFVec3f | [ ] | [bboxSize](#fields-bboxSize) |  |
| SFVec3f | [ ] | [bboxCenter](#fields-bboxCenter) |  |
| SFNode | [in, out] | [appearance](#fields-appearance) |  |
| SFNode | [in, out] | [geometry](#fields-geometry) |  |
| SFNode | [in, out] | [metadata](#fields-metadata) |  |
| SFString | [in, out] | [colorSpace](#fields-colorSpace) |  |
| MFVec3f | [in, out] | [positions](#fields-positions) |  |
| MFVec4f | [in, out] | [orientations](#fields-orientations) |  |
| MFVec3f | [in, out] | [scales](#fields-scales) |  |
| MFFloat | [in, out] | [opacities](#fields-opacities) |  |
| MFVec3f | [in, out] | [sphericalHarmonics0](#fields-sphericalHarmonics0) |  |
| MFVec3f | [in, out] | [sphericalHarmonics1](#fields-sphericalHarmonics1) |  |
| MFVec3f | [in, out] | [sphericalHarmonics2](#fields-sphericalHarmonics2) |  |
| MFVec3f | [in, out] | [sphericalHarmonics3](#fields-sphericalHarmonics3) |  |
| SFBool | [in, out] | [visible](#fields-visible) |  |
| SFBool | [in, out] | [bboxDisplay](#fields-bboxDisplay) |  |
| SFVec3f | [ ] | [bboxSize](#fields-bboxSize) |  |
| SFVec3f | [ ] | [bboxCenter](#fields-bboxCenter) |  |
{: .fields }

### SFNode [in, out] **metadata**
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **pointerEvents**
{: #fields-pointerEvents }

Input/Output field *pointerEvents*.

### SFBool [in, out] **castShadow**
{: #fields-castShadow }

Input/Output field *castShadow*.

### SFBool [in, out] **visible**
{: #fields-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay**
{: #fields-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize**
{: #fields-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter**
{: #fields-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFNode [in, out] **appearance**
{: #fields-appearance }

Input/Output field *appearance*.

### SFNode [in, out] **geometry**
{: #fields-geometry }

Input/Output field *geometry*.

### SFNode [in, out] **metadata**

### SFString [in, out] **colorSpace**
{: #fields-colorSpace }

Input/Output field *colorSpace*.

### MFVec3f [in, out] **positions**
{: #fields-positions }

Input/Output field *positions*.

### MFVec4f [in, out] **orientations**
{: #fields-orientations }

Input/Output field *orientations*.

### MFVec3f [in, out] **scales**
{: #fields-scales }

Input/Output field *scales*.

### MFFloat [in, out] **opacities**
{: #fields-opacities }

Input/Output field *opacities*.

### MFVec3f [in, out] **sphericalHarmonics0**
{: #fields-sphericalHarmonics0 }

Input/Output field *sphericalHarmonics0*.

### MFVec3f [in, out] **sphericalHarmonics1**
{: #fields-sphericalHarmonics1 }

Input/Output field *sphericalHarmonics1*.

### MFVec3f [in, out] **sphericalHarmonics2**
{: #fields-sphericalHarmonics2 }

Input/Output field *sphericalHarmonics2*.

### MFVec3f [in, out] **sphericalHarmonics3**
{: #fields-sphericalHarmonics3 }

Input/Output field *sphericalHarmonics3*.

### SFBool [in, out] **visible**

### SFBool [in, out] **bboxDisplay**

### SFVec3f [ ] **bboxSize**

### SFVec3f [ ] **bboxCenter**

## Browser Compatibility

| Castle Game Engine | FreeWRL | X_ITE X3D Browser | X3D-Edit | X3DOM |
|--------------------|---------|-------------------|----------|-------|
| <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-check green" title="Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> | <i class="fa-solid fa-circle-xmark red" title="Not Supported"></i> |
{: .browser-compatibility }

## See Also

- [Khronos glTF Specification of the KHR_gaussian_splatting Extension](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md)
