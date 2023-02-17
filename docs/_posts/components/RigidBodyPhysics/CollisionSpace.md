---
title: CollisionSpace
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [CollisionSpace, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CollisionSpace holds collection of objects considered together for resolution of inter-object collisions. Contains multiple CollidableShape, CollidableOffset, or CollisionSpace nodes (containerField='collidables').

The CollisionSpace node belongs to the **RigidBodyPhysics** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DNBodyCollisionSpaceNode (X3DBoundedObject)*
    + CollisionSpace
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **useGeometry** FALSE

*useGeometry* indicates whether collision-detection code checks down to level of geometry, or only make approximations using geometry bounds.

#### Hint

- Testing against object bounds is usually sufficient.

#### Warning

- Using geometry is more accurate but slower.

### SFBool [ ] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [ ] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [in, out] **collidables** [ ] <small>[X3DNBodyCollisionSpaceNode,X3DNBodyCollidableNode]</small>

Input/Output field collidables.

## External Links

- [X3D Specification of CollisionSpace](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollisionSpace){:target="_blank"}
