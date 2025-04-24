---
title: MotorJoint
date: 2023-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [MotorJoint, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

MotorJoint drives relative angular velocities between body1 and body2 within a common reference frame. Contains two RigidBody nodes (containerField values body1, body2).

The MotorJoint node belongs to the **RigidBodyPhysics** component and requires at least support level **2,** its default container field is *joints.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + MotorJoint
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [ ] | [autoCalc](#field-autoCalc) | FALSE |
| MFString | [in, out] | [forceOutput](#field-forceOutput) | "NONE"  |
| SFFloat | [in, out] | [axis1Angle](#field-axis1Angle) | 0  |
| SFFloat | [in, out] | [axis2Angle](#field-axis2Angle) | 0  |
| SFFloat | [in, out] | [axis3Angle](#field-axis3Angle) | 0  |
| SFFloat | [in, out] | [axis1Torque](#field-axis1Torque) | 0  |
| SFFloat | [in, out] | [axis2Torque](#field-axis2Torque) | 0  |
| SFFloat | [in, out] | [axis3Torque](#field-axis3Torque) | 0  |
| SFInt32 | [in, out] | [enabledAxes](#field-enabledAxes) | 1  |
| SFVec3f | [in, out] | [motor1Axis](#field-motor1Axis) | 1 0 0  |
| SFVec3f | [in, out] | [motor2Axis](#field-motor2Axis) | 0 1 0  |
| SFVec3f | [in, out] | [motor3Axis](#field-motor3Axis) | 0 0 1  |
| SFFloat | [in, out] | [stop1Bounce](#field-stop1Bounce) | 0  |
| SFFloat | [in, out] | [stop2Bounce](#field-stop2Bounce) | 0  |
| SFFloat | [in, out] | [stop3Bounce](#field-stop3Bounce) | 0  |
| SFFloat | [in, out] | [stop1ErrorCorrection](#field-stop1ErrorCorrection) | 0 |
| SFFloat | [in, out] | [stop2ErrorCorrection](#field-stop2ErrorCorrection) | 0 |
| SFFloat | [in, out] | [stop3ErrorCorrection](#field-stop3ErrorCorrection) | 0 |
| SFFloat | [out] | [motor1Angle](#field-motor1Angle) |  |
| SFFloat | [out] | [motor2Angle](#field-motor2Angle) |  |
| SFFloat | [out] | [motor3Angle](#field-motor3Angle) |  |
| SFFloat | [out] | [motor1AngleRate](#field-motor1AngleRate) |  |
| SFFloat | [out] | [motor2AngleRate](#field-motor2AngleRate) |  |
| SFFloat | [out] | [motor3AngleRate](#field-motor3AngleRate) |  |
| SFNode | [in, out] | [body1](#field-body1) | NULL  |
| SFNode | [in, out] | [body2](#field-body2) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [ ] **autoCalc** FALSE
{: #field-autoCalc }

*autoCalc* controls whether user manually provides individual angle rotations each frame (false) or if angle values are automatically calculated by motor implementations (true).

### MFString [in, out] **forceOutput** "NONE" <small>["ALL", "NONE", ...]</small>
{: #field-forceOutput }

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFFloat [in, out] **axis1Angle** 0 <small>[-π,π]</small>
{: #field-axis1Angle }

*axis1Angle* (radians) is rotation angle for corresponding motor axis when in user-calculated mode.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

### SFFloat [in, out] **axis2Angle** 0 <small>[-π,π]</small>
{: #field-axis2Angle }

*axis2Angle* (radians) is rotation angle for corresponding motor axis when in user-calculated mode.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

### SFFloat [in, out] **axis3Angle** 0 <small>[-π,π]</small>
{: #field-axis3Angle }

*axis3Angle* (radians) is rotation angle for corresponding motor axis when in user-calculated mode.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

### SFFloat [in, out] **axis1Torque** 0 <small>(-∞,∞)</small>
{: #field-axis1Torque }

*axis1Torque* is rotational torque applied by corresponding motor axis when in user-calculated mode.

### SFFloat [in, out] **axis2Torque** 0 <small>(-∞,∞)</small>
{: #field-axis2Torque }

*axis2Torque* is rotational torque applied by corresponding motor axis when in user-calculated mode.

### SFFloat [in, out] **axis3Torque** 0 <small>(-∞,∞)</small>
{: #field-axis3Torque }

*axis3Torque* is rotational torque applied by corresponding motor axis when in user-calculated mode.

### SFInt32 [in, out] **enabledAxes** 1 <small>[0,3]</small>
{: #field-enabledAxes }

*enabledAxes* indicates which motor axes are active. (0) none, (1) axis 1, (2) axes 1 and 2, (3) all three axes.

### SFVec3f [in, out] **motor1Axis** 1 0 0 <small>(-∞,∞)</small>
{: #field-motor1Axis }

*motor1Axis* defines axis vector of corresponding motor axis.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFVec3f [in, out] **motor2Axis** 0 1 0 <small>(-∞,∞)</small>
{: #field-motor2Axis }

*motor2Axis* defines axis vector of corresponding motor axis.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFVec3f [in, out] **motor3Axis** 0 0 1 <small>(-∞,∞)</small>
{: #field-motor3Axis }

*motor3Axis* defines axis vector of corresponding motor axis.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFFloat [in, out] **stop1Bounce** 0 <small>[0,1]</small>
{: #field-stop1Bounce }

*stop1Bounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stop2Bounce** 0 <small>[0,1]</small>
{: #field-stop2Bounce }

*stop2Bounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stop3Bounce** 0 <small>[0,1]</small>
{: #field-stop3Bounce }

*stop3Bounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stop1ErrorCorrection** 0.8 <small>[0,1]</small>
{: #field-stop1ErrorCorrection }

*stop1ErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFFloat [in, out] **stop2ErrorCorrection** 0.8 <small>[0,1]</small>
{: #field-stop2ErrorCorrection }

*stop2ErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFFloat [in, out] **stop3ErrorCorrection** 0.8 <small>[0,1]</small>
{: #field-stop3ErrorCorrection }

*stop3ErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFFloat [out] **motor1Angle**
{: #field-motor1Angle }

*motor1Angle* provides calculated angle of rotation (radians) for this motor joint from last frame.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **motor2Angle**
{: #field-motor2Angle }

*motor2Angle* provides calculated angle of rotation (radians) for this motor joint from last frame.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **motor3Angle**
{: #field-motor3Angle }

*motor3Angle* provides calculated angle of rotation (radians) for this motor joint from last frame.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **motor1AngleRate**
{: #field-motor1AngleRate }

*motor1AngleRate* provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **motor2AngleRate**
{: #field-motor2AngleRate }

*motor2AngleRate* provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFFloat [out] **motor3AngleRate**
{: #field-motor3AngleRate }

*motor3AngleRate* provides calculated anglular rotation rate (radians/second) for this motor joint from last frame.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>
{: #field-body1 }

The *body1* and body2 fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>
{: #field-body2 }

The body1 and *body2* fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

## Advice

### Hints

- Useful in combination with [BallJoint](/x_ite/components/rigidbodyphysics/balljoint/).
- RigidBodyPhysics component, level 2.

## See Also

- [X3D Specification of MotorJoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#MotorJoint)
