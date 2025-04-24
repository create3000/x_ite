---
title: UniversalJoint
date: 2023-01-07
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

The UniversalJoint node belongs to the **RigidBodyPhysics** component and requires at least support level **2,** its default container field is *joints.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + UniversalJoint
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| MFString | [in, out] | [forceOutput](#field-forceOutput) | "NONE"  |
| SFVec3f | [in, out] | [anchorPoint](#field-anchorPoint) | 0 0 0  |
| SFVec3f | [in, out] | [axis1](#field-axis1) | 1 0 0  |
| SFVec3f | [in, out] | [axis2](#field-axis2) | 0 1 0  |
| SFFloat | [in, out] | [stop1Bounce](#field-stop1Bounce) | 0  |
| SFFloat | [in, out] | [stop2Bounce](#field-stop2Bounce) | 0  |
| SFFloat | [in, out] | [stop1ErrorCorrection](#field-stop1ErrorCorrection) | 0.8  |
| SFFloat | [in, out] | [stop2ErrorCorrection](#field-stop2ErrorCorrection) | 0.8  |
| SFVec3f | [out] | [body1Axis](#field-body1Axis) |  |
| SFVec3f | [out] | [body2Axis](#field-body2Axis) |  |
| SFVec3f | [out] | [body1AnchorPoint](#field-body1AnchorPoint) |  |
| SFVec3f | [out] | [body2AnchorPoint](#field-body2AnchorPoint) |  |
| SFNode | [in, out] | [body1](#field-body1) | NULL  |
| SFNode | [in, out] | [body2](#field-body2) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFString [in, out] **forceOutput** "NONE" <small>["ALL", "NONE", ...]</small>
{: #field-forceOutput }

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0 <small>(-∞,∞)</small>
{: #field-anchorPoint }

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [in, out] **axis1** 1 0 0 <small>(-∞,∞)</small>
{: #field-axis1 }

*axis1* defines axis vector of joint connection to body1.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFVec3f [in, out] **axis2** 0 1 0 <small>(-∞,∞)</small>
{: #field-axis2 }

*axis2* defines axis vector of joint connection to body2.

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

### SFVec3f [out] **body1Axis**
{: #field-body1Axis }

*body1Axis* describes report the current location of the anchor point relative to the corresponding body. This can be used to determine if the joint has broken.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **body2Axis**
{: #field-body2Axis }

Body1Axis describes report the current location of the anchor point relative to the corresponding body. This can be used to determine if the joint has broken.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **body1AnchorPoint**
{: #field-body1AnchorPoint }

*body1AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if *body1AnchorPoint*!=body2AnchorPoint.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **body2AnchorPoint**
{: #field-body2AnchorPoint }

*body2AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if body1AnchorPoint!=*body2AnchorPoint*.

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

- [X3D Specification of UniversalJoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#UniversalJoint)
