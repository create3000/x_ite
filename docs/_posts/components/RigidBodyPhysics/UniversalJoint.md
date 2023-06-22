---
title: UniversalJoint
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [UniversalJoint, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

UniversalJoint is like a BallJoint that constrains an extra degree of rotational freedom. Contains two RigidBody nodes (containerField values body1, body2).

The UniversalJoint node belongs to the **RigidBodyPhysics** component and its default container field is *joints.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + UniversalJoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **forceOutput** "NONE" <small>["ALL", "NONE", ...]</small>

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0 <small>(-∞,∞)</small>

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [in, out] **axis1** 0 0 0 <small>(-∞,∞)</small>

*axis1* defines axis vector of joint connection to body1.

#### Hint

- 0 0 0 means motor disabled.

### SFVec3f [in, out] **axis2** 0 0 0 <small>(-∞,∞)</small>

*axis2* defines axis vector of joint connection to body2.

#### Hint

- 0 0 0 means motor disabled.

### SFFloat [in, out] **stop1Bounce** 0 <small>[0,1]</small>

Input/Output field stop1Bounce.

### SFFloat [in, out] **stop2Bounce** 0 <small>[0,1]</small>

*stop2Bounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stop1ErrorCorrection** 0.8 <small>[0,1]</small>

*stop1ErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFFloat [in, out] **stop2ErrorCorrection** 0.8 <small>[0,1]</small>

*stop2ErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFVec3f [out] **body1AnchorPoint**

Output field body1AnchorPoint.

### SFVec3f [out] **body2AnchorPoint**

Output field body2AnchorPoint.

### SFVec3f [out] **body1Axis**

Output field body1Axis.

### SFVec3f [out] **body2Axis**

Output field body2Axis.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>

Input/Output field body1.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>

Input/Output field body2.

## Description

### Hints

- Useful in combination with BallJoint.
- RigidBodyPhysics component, level 2.

## External Links

- [X3D Specification of UniversalJoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#UniversalJoint){:target="_blank"}
