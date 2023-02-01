---
title: BallJoint
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [BallJoint, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BallJoint represents an unconstrained joint between two bodies that pivot about a common anchor point. Contains two RigidBody nodes (containerField values body1, body2).

The BallJoint node belongs to the **RigidBodyPhysics** component and its default container field is *joints.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + BallJoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **forceOutput** "NONE" <small>["ALL","NONE",...]</small>

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [out] **body1AnchorPoint**

*body1AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if body1AnchorPoint!=body2AnchorPoint.

### SFVec3f [out] **body2AnchorPoint**

*body2AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if body1AnchorPoint!=body2AnchorPoint.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>

Input/Output field body1.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>

Input/Output field body2.

## Description

### Hint

- RigidBodyPhysics component, level 2.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/RigidBodyPhysics/BallJoint/BallJoint.x3d"></x3d-canvas>

## External Links

- [X3D Specification of BallJoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#BallJoint){:target="_blank"}
