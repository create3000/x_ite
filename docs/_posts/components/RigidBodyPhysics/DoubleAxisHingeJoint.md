---
title: DoubleAxisHingeJoint
date: 2022-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [DoubleAxisHingeJoint, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

DoubleAxisHingeJoint has two independent axes located around a common anchor point. axis1 has limits and a motor, axis 2 only has a motor Contains two RigidBody nodes (containerField values body1, body2).

The DoubleAxisHingeJoint node belongs to the **RigidBodyPhysics** component and its default container field is *joints.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + DoubleAxisHingeJoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFString [in, out] **forceOutput** "NONE" <small>["ALL", "NONE", ...]</small>

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0 <small>(-∞,∞)</small>

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [in, out] **axis1** 0 0 0 <small>(-∞,∞)</small>

*axis1* defines axis vector of joint connection to body1.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFVec3f [in, out] **axis2** 0 0 0 <small>(-∞,∞)</small>

*axis2* defines axis vector of joint connection to body2.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFFloat [in, out] **minAngle1** -π <small>π [-π,π]</small> <small class="red">not supported</small>

*minAngle1* is minimum rotation angle for hinge.

### SFFloat [in, out] **maxAngle1** π <small>[-π,π]</small> <small class="red">not supported</small>

*maxAngle1* is maximum rotation angle for hinge.

### SFFloat [in, out] **desiredAngularVelocity1** 0 <small>(-∞,∞)</small> <small class="red">not supported</small>

*desiredAngularVelocity1* is goal rotation rate for hinge connection to body1.

### SFFloat [in, out] **desiredAngularVelocity2** 0 <small>(-∞,∞)</small> <small class="red">not supported</small>

*desiredAngularVelocity2* is goal rotation rate for hinge connection to body2.

### SFFloat [in, out] **maxTorque1** 0 <small>(-∞,∞)</small> <small class="red">not supported</small>

*maxTorque1* is maximum rotational torque applied by corresponding motor axis to achieve desiredAngularVelocity1.

### SFFloat [in, out] **maxTorque2** 0 <small>(-∞,∞)</small> <small class="red">not supported</small>

*maxTorque2* is maximum rotational torque applied by corresponding motor axis to achieve desiredAngularVelocity2.

### SFFloat [in, out] **stopBounce1** 0 <small>[0,1]<span class="red"> not supported</span></small>

Input/Output field *stopBounce1*.

### SFFloat [in, out] **stopConstantForceMix1** 0.001 <small>[0,∞)<span class="red"> not supported</span></small>

Input/Output field *stopConstantForceMix1*.

### SFFloat [in, out] **stopErrorCorrection1** 0.8 <small>[0,1]<span class="red"> not supported</span></small>

Input/Output field *stopErrorCorrection1*.

### SFFloat [in, out] **suspensionForce** 0 <small>[0,∞)<span class="red"> not supported</span></small>

*suspensionForce* describes how quickly the system resolves intersection errors due to floating-point inaccuracies.

#### Hints

- Use with stop1ConstantForceMix to improve softness and numerical stability.
- 0 means no stop adjustment, 1 means springier stop response.

### SFFloat [in, out] **suspensionErrorCorrection** 0.8 <small>[0,1]<span class="red"> not supported</span></small>

*suspensionErrorCorrection* describes how quickly the system resolves intersection errors due to floating-point inaccuracies.

#### Hints

- Use with stop1ConstantForceMix to improve softness and numerical stability.
- 0 means no stop adjustment, 1 means springier stop response.

### SFVec3f [out] **body1AnchorPoint**

Output field *body1AnchorPoint*.

### SFVec3f [out] **body2AnchorPoint**

Output field *body2AnchorPoint*.

### SFVec3f [out] **body1Axis**

Output field *body1Axis*.

### SFVec3f [out] **body2Axis**

Output field *body2Axis*.

### SFFloat [out] **hinge1Angle**

Output field *hinge1Angle*.

### SFFloat [out] **hinge2Angle**

Output field *hinge2Angle*.

### SFFloat [out] **hinge1AngleRate**

Output field *hinge1AngleRate*.

### SFFloat [out] **hinge2AngleRate**

Output field *hinge2AngleRate*.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>

The *body1* and body2 fields indicate the two RigidBody nodes connected by this joint.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>

The body1 and *body2* fields indicate the two RigidBody nodes connected by this joint.

## Information

### Hint

- RigidBodyPhysics component, level 2.

## External Links

- [X3D Specification of DoubleAxisHingeJoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#DoubleAxisHingeJoint){:target="_blank"}
