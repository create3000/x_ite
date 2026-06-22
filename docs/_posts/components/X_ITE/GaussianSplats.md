---
title: GaussianSplats
date: 2026-05-30
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

The **GaussianSplats** node adds basic support for direct real-time radiance field rendering of volume data without converting into surface or line primitives.

The **GaussianSplats** node belongs to the [X_ITE](/x_ite/components/overview/#x_ite) component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 4.1 or higher.

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
| MFQuaternion | [in, out] | [orientations](#fields-orientations) | [ ] |
| MFVec3f | [in, out] | [scales](#fields-scales) | [ ] |
| MFFloat | [in, out] | [opacities](#fields-opacities) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree0Coef0](#fields-sphericalHarmonicsDegree0Coef0) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree1Coef0](#fields-sphericalHarmonicsDegree1Coef0) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree1Coef1](#fields-sphericalHarmonicsDegree1Coef1) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree1Coef2](#fields-sphericalHarmonicsDegree1Coef2) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree2Coef0](#fields-sphericalHarmonicsDegree2Coef0) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree2Coef1](#fields-sphericalHarmonicsDegree2Coef1) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree2Coef2](#fields-sphericalHarmonicsDegree2Coef2) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree2Coef3](#fields-sphericalHarmonicsDegree2Coef3) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree2Coef4](#fields-sphericalHarmonicsDegree2Coef4) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree3Coef0](#fields-sphericalHarmonicsDegree3Coef0) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree3Coef1](#fields-sphericalHarmonicsDegree3Coef1) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree3Coef2](#fields-sphericalHarmonicsDegree3Coef2) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree3Coef3](#fields-sphericalHarmonicsDegree3Coef3) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree3Coef4](#fields-sphericalHarmonicsDegree3Coef4) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree3Coef5](#fields-sphericalHarmonicsDegree3Coef5) | [ ] |
| MFVec3f | [in, out] | [sphericalHarmonicsDegree3Coef6](#fields-sphericalHarmonicsDegree3Coef6) | [ ] |
| SFBool | [in, out] | [pointerEvents](#fields-pointerEvents) | TRUE |
| SFBool | [in, out] | [castShadow](#fields-castShadow) | TRUE |
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

### SFString [in, out] **colorSpace** "SRGB_REC709_DISPLAY" <small>["SRGB_REC709_DISPLAY", "LIN_REC709_DISPLAY"]</small>
{: #fields-colorSpace }

The color space of the reconstructed color values, either SRGB_REC709_DISPLAY or LIN_REC709_DISPLAY

#### Hints

- [For details see](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md#color-space)
- [ASWF Color Interop Forum Recommendation, Color Space Encodings for Displays](https://github.com/AcademySoftwareFoundation/ColorInterop/blob/main/Recommendations/02_DisplayColorSpaces/DisplayColorSpaces.md)

### MFVec3f [in, out] **positions** [ ] <small>(-∞,∞)</small>
{: #fields-positions }

The mean vector for the Gaussian splat is provided by the *positions* of the mesh primitive. This defines the center of the Gaussian splat ellipsoid in local space. The effective global mean vector for the Gaussian splat is derived from the *positions* field value and the global transformation matrix of the X3D node that instantiates the mesh containing the splat primitive as defined in the glTF specification.

### MFQuaternion [in, out] **orientations** [ ] <small>[-1,1]</small>
{: #fields-orientations }

The *orientations* field values correspond to the orientation of those axes in local space. Orientation values are stored as unit quaternions in the usual glTF order (x,y,z,w).

### MFVec3f [in, out] **scales** [ ] <small>[0,∞)</small>
{: #fields-scales }

The values in the *scales* field correspond to the spread of the Gaussian along its local principal axes. Scale values are linear and nonnegative.

### MFFloat [in, out] **opacities** [ ] <small>[0,1]</small>
{: #fields-opacities }

The opacity of a Gaussian splat is defined by the *opacities* field. It stores a normalized linear value between 0.0 (transparent) and 1.0 (opaque).

### MFVec3f [in, out] **sphericalHarmonicsDegree0Coef0** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree0Coef0 }

Spherical harmonics data.

### MFVec3f [in, out] **sphericalHarmonicsDegree1Coef0** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree1Coef0 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree1Coef1** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree1Coef1 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree1Coef2** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree1Coef2 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree2Coef0** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree2Coef0 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree2Coef1** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree2Coef1 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree2Coef2** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree2Coef2 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree2Coef3** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree2Coef3 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree2Coef4** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree2Coef4 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree3Coef0** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree3Coef0 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree3Coef1** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree3Coef1 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree3Coef2** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree3Coef2 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree3Coef3** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree3Coef3 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree3Coef4** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree3Coef4 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree3Coef5** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree3Coef5 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### MFVec3f [in, out] **sphericalHarmonicsDegree3Coef6** [ ] <small>(-∞,∞)</small>
{: #fields-sphericalHarmonicsDegree3Coef6 }

Spherical harmonics data.

#### Warning

- To use higher degrees of spherical harmonics the lower degrees MUST be defined.

### SFBool [in, out] **pointerEvents** TRUE <small class="blue">non-standard</small>
{: #fields-pointerEvents }

Indicates whether this **GaussianSplats** node is a target for pointer events, if FALSE then it is ignored during pointer picking.

### SFBool [in, out] **castShadow** TRUE
{: #fields-castShadow }

*castShadow* defines whether this **GaussianSplats** node casts shadows as produced by lighting nodes.

#### Hint

- If the visible field is FALSE, then the **GaussianSplats** node does not cast any shadows.

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

## Advice

### Hints

- [Wikipedia Gaussian splatting](https://en.wikipedia.org/wiki/Gaussian_splatting)
- [Khronos glTF 2.0 extension KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md)
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.

### Warnings

- X3D Architecture version 4.1 draft is experimental and not fully implemented.
- X3D Architecture version 4.1 draft is experimental and not fully implemented.

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
