---
title: NurbsSet
date: 2022-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsSet, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsSet collects a set of NurbsSurface nodes into a common group and treats NurbsSurface set as a unit during tessellation, thereby enforcing tessellation continuity along borders.

The NurbsSet node belongs to the **NURBS** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + NurbsSet (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [in] **addGeometry**

Input field addGeometry.

### MFNode [in] **removeGeometry**

Input field removeGeometry.

### MFNode [in, out] **geometry** [ ] <small>[X3DNurbsSurfaceGeometryNode]</small>

Input/Output field geometry.

### SFFloat [in, out] **tessellationScale** 1 <small>(0,∞)</small>

Scale for surface tesselation in children NurbsSurface nodes.

## External Links

- [X3D Specification of NurbsSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsSet){:target="_blank"}
