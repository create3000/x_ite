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
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFString | [in, out] | [forceOutput](#fields-forceOutput) | "NONE"  |
| SFVec3f | [in, out] | [anchorPoint](#fields-anchorPoint) | 0 0 0  |
| SFVec3f | [in, out] | [axis1](#fields-axis1) | 1 0 0  |
| SFVec3f | [in, out] | [axis2](#fields-axis2) | 0 1 0  |
| SFFloat | [in, out] | [stop1Bounce](#fields-stop1Bounce) | 0  |
| SFFloat | [in, out] | [stop2Bounce](#fields-stop2Bounce) | 0  |
| SFFloat | [in, out] | [stop1ErrorCorrection](#fields-stop1ErrorCorrection) | 0.8  |
| SFFloat | [in, out] | [stop2ErrorCorrection](#fields-stop2ErrorCorrection) | 0.8  |
| SFVec3f | [out] | [body1Axis](#fields-body1Axis) |  |
| SFVec3f | [out] | [body2Axis](#fields-body2Axis) |  |
| SFVec3f | [out] | [body1AnchorPoint](#fields-body1AnchorPoint) |  |
| SFVec3f | [out] | [body2AnchorPoint](#fields-body2AnchorPoint) |  |
| SFNode | [in, out] | [body1](#fields-body1) | NULL  |
| SFNode | [in, out] | [body2](#fields-body2) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFString [in, out] **forceOutput** "NONE" <small>["ALL", "NONE", ...]</small>
{: #fields-forceOutput }

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0 <small>(-∞,∞)</small>
{: #fields-anchorPoint }

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [in, out] **axis1** 1 0 0 <small>(-∞,∞)</small>
{: #fields-axis1 }

*axis1* defines axis vector of joint connection to body1.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFVec3f [in, out] **axis2** 0 1 0 <small>(-∞,∞)</small>
{: #fields-axis2 }

*axis2* defines axis vector of joint connection to body2.

#### Hint

- 0 0 0 means motor disabled about this axis.

### SFFloat [in, out] **stop1Bounce** 0 <small>[0,1]</small>
{: #fields-stop1Bounce }

*stop1Bounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stop2Bounce** 0 <small>[0,1]</small>
{: #fields-stop2Bounce }

*stop2Bounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stop1ErrorCorrection** 0.8 <small>[0,1]</small>
{: #fields-stop1ErrorCorrection }

*stop1ErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFFloat [in, out] **stop2ErrorCorrection** 0.8 <small>[0,1]</small>
{: #fields-stop2ErrorCorrection }

*stop2ErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

### SFVec3f [out] **body1Axis**
{: #fields-body1Axis }

*body1Axis* describes report the current location of the anchor point relative to the corresponding body. This can be used to determine if the joint has broken.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **body2Axis**
{: #fields-body2Axis }

Body1Axis describes report the current location of the anchor point relative to the corresponding body. This can be used to determine if the joint has broken.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **body1AnchorPoint**
{: #fields-body1AnchorPoint }

*body1AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if *body1AnchorPoint*!=body2AnchorPoint.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **body2AnchorPoint**
{: #fields-body2AnchorPoint }

*body2AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if body1AnchorPoint!=*body2AnchorPoint*.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>
{: #fields-body1 }

The *body1* and body2 fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>
{: #fields-body2 }

The body1 and *body2* fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

## Advice

### Hints

- Useful in combination with [BallJoint](/x_ite/components/rigidbodyphysics/balljoint/).
- RigidBodyPhysics component, level 2.

## See Also

- [X3D Specification of UniversalJoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#UniversalJoint)
