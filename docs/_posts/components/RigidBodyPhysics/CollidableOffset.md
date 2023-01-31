---
title: CollidableOffset
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [CollidableOffset, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CollidableOffset repositions geometry relative to center of owning body. Contains a single CollidableShape or CollidableOffset node (containerField='collidable').

The CollidableOffset node belongs to the **RigidBodyPhysics** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DNBodyCollidableNode (X3DBoundedObject)*
      + CollidableOffset
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position (x, y, z in meters) of children relative to local coordinate system.

#### Hint

The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[0,1]</small>

Orientation (axis, angle in radians) of children relative to local coordinate system.

#### Hint

The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or -1 -1 -1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### SFNode [ ] **collidable** NULL <small>[X3DNBodyCollidableNode]</small>

Field collidable.

## External Links

- [X3D Specification of CollidableOffset](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollidableOffset){:target="_blank"}
