---
title: SingleAxisHingeJoint
date: 2023-01-07
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

The SingleAxisHingeJoint node belongs to the **RigidBodyPhysics** component level **2** and its default container field is *joints.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + SingleAxisHingeJoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### MFString [in, out] **forceOutput** "NONE" <small>["ALL", "NONE", ...]</small>

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0 <small>(-∞,∞)</small>

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [in, out] **axis** 0 1 0 <small>(-∞,∞)</small>

*axis* defines vector of joint connection between body1 and body2.

### SFFloat [in, out] **minAngle** -π <small>[-π,π)</small> <small class="red">not supported</small>

*minAngle* is minimum rotation angle for hinge.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian){:target="_blank"}

### SFFloat [in, out] **maxAngle** π <small>[-π,π)</small> <small class="red">not supported</small>

*maxAngle* is maximum rotation angle for hinge.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian){:target="_blank"}

### SFFloat [in, out] **stopBounce** 0 <small>[0,1]</small> <small class="red">not supported</small>

*stopBounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stopErrorCorrection** 0.8 <small>[0,1]</small> <small class="red">not supported</small>

*stopErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFVec3f [out] **body1AnchorPoint**

Output field *body1AnchorPoint*.

### SFVec3f [out] **body2AnchorPoint**

Output field *body2AnchorPoint*.

### SFFloat [out] **angle**

Output field *angle*.

### SFFloat [out] **angleRate**

Output field *angleRate*.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>

The *body1* and body2 fields indicate the two RigidBody nodes connected by this joint.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>

The body1 and *body2* fields indicate the two RigidBody nodes connected by this joint.

## Advice

### Hint

- RigidBodyPhysics component, level 2.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/SingleAxisHingeJoint.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/SingleAxisHingeJoint.x3d)

## See Also

- [X3D Specification of SingleAxisHingeJoint node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#SingleAxisHingeJoint){:target="_blank"}
