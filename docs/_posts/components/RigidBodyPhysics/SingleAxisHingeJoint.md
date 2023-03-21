---
title: SingleAxisHingeJoint
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [SingleAxisHingeJoint, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SingleAxisHingeJoint has single axis about which to rotate, similar to a traditional door hinge. Contains two RigidBody nodes (containerField values body1, body2).

The SingleAxisHingeJoint node belongs to the **RigidBodyPhysics** component and its default container field is *joints.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + SingleAxisHingeJoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **forceOutput** "NONE" <small>["ALL","NONE",...]</small>

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [in, out] **axis** 0 0 0

*axis* defines vector of joint connection between body1 and body2.

### SFFloat [in, out] **minAngle** [-π,π)<small> <span class="red">not supported</span></small>

*minAngle* is minimum rotation angle for hinge.

### SFFloat [in, out] **maxAngle** [-π,π) <small><span class="red">not supported</span></small>

*maxAngle* is maximum rotation angle for hinge.

### SFFloat [in, out] **stopBounce** 0 <small>[0,1] <span class="red">not supported</span>
</small>

StopBounce is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stopErrorCorrection** 0.8 <small>[0,1] <span class="red">not supported</span>
</small>

StopErrorCorrection is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFVec3f [out] **body1AnchorPoint**

Output field body1AnchorPoint.

### SFVec3f [out] **body2AnchorPoint**

Output field body2AnchorPoint.

### SFFloat [out] **angle**

Output field angle.

### SFFloat [out] **angleRate**

Output field angleRate.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>

Input/Output field body1.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>

Input/Output field body2.

## Description

### Hint

- RigidBodyPhysics component, level 2.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/SingleAxisHingeJoint.x3d"></x3d-canvas>

## External Links

- [X3D Specification of SingleAxisHingeJoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#SingleAxisHingeJoint){:target="_blank"}
