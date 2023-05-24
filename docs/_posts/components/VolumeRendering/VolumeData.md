---
title: VolumeData
date: 2022-01-07
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

The VolumeData node belongs to the **VolumeRendering** component and its default container field is *children.* It is available since X3D version 3.3 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DVolumeDataNode
      + VolumeData
```

## Fields

### SFVec3f [in, out] **dimensions** 1 1 1 <small>(0,∞)</small>

Actual-size X-Y-Z dimensions of volume data in local coordinate system.

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [in, out] **renderStyle** NULL <small>[X3DVolumeRenderStyleNode]</small>

Input/Output field renderStyle.

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

### Hint

- VolumeData can contain a single Texture3D node with containerField='voxels' and a single RenderStyle node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/VolumeRendering/VolumeData/VolumeData.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of VolumeData](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#VolumeData){:target="_blank"}
