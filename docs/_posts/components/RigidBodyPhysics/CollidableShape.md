---
title: CollidableShape
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [CollidableShape, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CollidableShape connects the collision detection system, the rigid body model, and the renderable scene graph. Contains a single Shape node (containerField='shape') for animating collidable geometry.

The CollidableShape node belongs to the **RigidBodyPhysics** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DNBodyCollidableNode
      + CollidableShape
```

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

### SFNode [ ] **shape** NULL <small>[Shape]</small>

Field shape.

## Description

### Warning

- Avoid changing Shape geometry at run time to prevent performance problems.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/CollidableShape/CollidableShape.x3d"></x3d-canvas>

## External Links

- [X3D Specification of CollidableShape](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollidableShape){:target="_blank"}
