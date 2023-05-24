---
title: IsoSurfaceVolumeData
date: 2022-01-07
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

The IsoSurfaceVolumeData node belongs to the **VolumeRendering** component and its default container field is *children.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DVolumeDataNode (X3DBoundedObject)*
      + IsoSurfaceVolumeData
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFFloat [in, out] **contourStepSize** 0 <small>(-∞,∞)</small>

If contourStepSize is non-zero, also render all isosurfaces that are multiples of that step size from initial surface value.

#### Hint

- ContourStepSize can be negative so that steppping can proceed in a negative direction.

### SFVec3f [in, out] **dimensions** 1 1 1 <small>(0,∞)</small>

Actual-size X-Y-Z dimensions of volume data in local coordinate system.

### SFNode [in, out] **gradients** NULL <small>[X3DTexture3DNode]</small>

Input/Output field gradients.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFNode [in, out] **renderStyle** [ ] <small>[X3DVolumeRenderStyleNode]</small>

Input/Output field renderStyle.

### SFFloat [in, out] **surfaceTolerance** 0 <small>[0,∞)</small>

Threshold for gradient magnitude for voxel inolusion in isosurface.

#### Hint

- Contained Texture3D node with containerField='gradients' can provide explicit per-voxel gradient direction information for determining surface boundaries.

### MFFloat [in, out] **surfaceValues** [ ] <small>(-∞,∞)</small>

If surfaceValues has one value defined, render corresponding isosurface plus any isosurfaces based on contourStepSize. If surfaceValues has more than one value defined, ignore contourStepSize and render surfaces corresponding to listed surfaceValues.

### SFNode [in, out] **voxels** NULL <small>[X3DTexture3DNode]</small>

Input/Output field voxels.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### SFBool [ ] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [ ] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or -1 -1 -1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

## Description

### Hints

- IsoSurfaceVolumeData can contain a single Texture3D node with containerField='gradients' that is used to provide explicit per-voxel gradient direction information for determining surface boundaries, rather than having values implicitly calculated by the implementation.
- IsoSurfaceVolumeData can contain another Texture3D node with containerField='voxels' containing voxel data.
- IsoSurfaceVolumeData can contain multiple VolumeStyle nodes.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/VolumeRendering/IsoSurfaceVolumeData/IsoSurfaceVolumeData.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of IsoSurfaceVolumeData](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#IsoSurfaceVolumeData){:target="_blank"}
