---
title: IsoSurfaceVolumeData
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [IsoSurfaceVolumeData, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IsoSurfaceVolumeData displays one or more surfaces extracted from a voxel dataset. A surface is defined as the boundary between regions in the volume where the voxel values are larger than a given value (the iso value) on one side of the boundary and smaller on the other side, and the gradient magnitude is larger than surfaceTolerance.

The IsoSurfaceVolumeData node belongs to the **VolumeRendering** component and requires at least level **2,** its default container field is *children.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DVolumeDataNode (X3DBoundedObject)*
      + IsoSurfaceVolumeData
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFVec3f [in, out] **dimensions** 1 1 1 <small>(0,∞)</small>

Actual-size X-Y-Z *dimensions* of volume data in local coordinate system.

### SFFloat [in, out] **contourStepSize** 0 <small>(-∞,∞)</small>

If *contourStepSize* is non-zero, also render all isosurfaces that are multiples of that step size from initial surface value.

#### Hint

- *contourStepSize* can be negative so that steppping can proceed in a negative direction.

### MFFloat [in, out] **surfaceValues** [ ] <small>(-∞,∞)</small>

If *surfaceValues* has one value defined, render corresponding isosurface plus any isosurfaces based on contourStepSize. If *surfaceValues* has more than one value defined, ignore contourStepSize and render surfaces corresponding to listed *surfaceValues*.

### SFFloat [in, out] **surfaceTolerance** 0 <small>[0,∞)</small>

Threshold for gradient magnitude for voxel inolusion in isosurface.

#### Hint

- Contained Texture3D node with `containerField='gradients'` can provide explicit per-voxel gradient direction information for determining surface boundaries.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in, out] **renderStyle** [ ] <small>[X3DVolumeRenderStyleNode]</small>

Multiple contained X3DVolumeRenderStyleNode nodes corresponding to each isosurface that define specific rendering technique for this volumetric object.

#### Warning

- If not defined, no default renderStyle is defined.

### SFNode [in, out] **gradients** NULL <small>[X3DTexture3DNode]</small>

Single contained X3DTexture3DNode ([ComposedTexture3D](/x_ite/components/texturing3d/composedtexture3d/), [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/), [PixelTexture3D](/x_ite/components/texturing3d/pixeltexture3d/)) that provides explicit per-voxel gradient direction information for determining surface boundaries, rather than having it implicitly calculated by the implementation.

### SFNode [in, out] **voxels** NULL <small>[X3DTexture3DNode]</small>

Single contained X3DTexture3DNode ([ComposedTexture3D](/x_ite/components/texturing3d/composedtexture3d/), [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/), [PixelTexture3D](/x_ite/components/texturing3d/pixeltexture3d/)) that provides raw voxel information utilized by corresponding rendering styles. Any number of color components (1-4) may be defined.

## Advice

### Hints

- IsoSurfaceVolumeData can contain a single Texture3D node with `containerField='gradients'` that is used to provide explicit per-voxel gradient direction information for determining surface boundaries, rather than having values implicitly calculated by the implementation.
- IsoSurfaceVolumeData can contain another Texture3D node with `containerField='voxels'` containing voxel data.
- IsoSurfaceVolumeData can contain multiple VolumeStyle nodes.

### Warnings

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.
- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/VolumeRendering/IsoSurfaceVolumeData/IsoSurfaceVolumeData.x3d" update="auto" xrMovementControl="VIEWER_POSE"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/VolumeRendering/IsoSurfaceVolumeData/IsoSurfaceVolumeData.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/VolumeRendering/IsoSurfaceVolumeData/IsoSurfaceVolumeData.x3d)
{: .example-links }

## See Also

- [X3D Specification of IsoSurfaceVolumeData Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#IsoSurfaceVolumeData)
