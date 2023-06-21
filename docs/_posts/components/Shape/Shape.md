---
title: Shape
date: 2022-01-07
nav: components-Shape
categories: [components, Shape]
tags: [Shape, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Shape can appear under any grouping node. Shape can contain an Appearance node and a geometry node (Box Cone Cylinder ElevationGrid Extrusion IndexedFaceSet IndexedLineSet LineSet PointSet Sphere Text).

The Shape node belongs to the **Shape** component and its default container field is *children.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DShapeNode
      + Shape
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [in, out] **castShadow** TRUE

*castShadow* defines whether this Shape casts shadows as produced by lighting nodes.

#### Hint

- If the visible field is FALSE, then the Shape does not cast any shadows.
- If prior X3D3 content is loaded into an X3D4 model, then legacy Shape nodes have shadows set to true.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### SFNode [in, out] **appearance** NULL <small>[X3DAppearanceNode]</small>

Input/Output field appearance.

### SFNode [in, out] **geometry** NULL <small>[X3DGeometryNode]</small>

Input/Output field geometry.

## Description

### Hint

- You can also substitute a type-matched ProtoInstance node for contained content.

## External Links

- [X3D Specification of Shape](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Shape){:target="_blank"}
