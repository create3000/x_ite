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

The SingleAxisHingeJoint node belongs to the [RigidBodyPhysics](/x_ite/components/overview/#rigidbodyphysics) component and requires at least support level **2,** its default container field is *joints.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + SingleAxisHingeJoint
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| MFString | [in, out] | [forceOutput](#fields-forceOutput) | "NONE"  |
| SFVec3f | [in, out] | [anchorPoint](#fields-anchorPoint) | 0 0 0  |
| SFVec3f | [in, out] | [axis](#fields-axis) | 0 1 0  |
| SFFloat | [in, out] | [minAngle](#fields-minAngle) | -π  |
| SFFloat | [in, out] | [maxAngle](#fields-maxAngle) | π  |
| SFFloat | [in, out] | [stopBounce](#fields-stopBounce) | 0  |
| SFFloat | [in, out] | [stopErrorCorrection](#fields-stopErrorCorrection) | 0.8  |
| SFVec3f | [out] | [body1AnchorPoint](#fields-body1AnchorPoint) |  |
| SFVec3f | [out] | [body2AnchorPoint](#fields-body2AnchorPoint) |  |
| SFFloat | [out] | [angle](#fields-angle) |  |
| SFFloat | [out] | [angleRate](#fields-angleRate) |  |
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

### SFVec3f [in, out] **axis** 0 1 0 <small>(-∞,∞)</small>
{: #fields-axis }

*axis* defines vector of joint connection between body1 and body2.

### SFFloat [in, out] **minAngle** -π <small>[-π,π)</small> <small class="red">not supported</small>
{: #fields-minAngle }

*minAngle* is minimum rotation angle for hinge.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

### SFFloat [in, out] **maxAngle** π <small>[-π,π)</small> <small class="red">not supported</small>
{: #fields-maxAngle }

*maxAngle* is maximum rotation angle for hinge.

#### Hint

- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

### SFFloat [in, out] **stopBounce** 0 <small>[0,1]</small> <small class="red">not supported</small>
{: #fields-stopBounce }

*stopBounce* is velocity factor for bounce back once stop point is reached.

#### Hint

- 0 means no bounce, 1 means return velocity matches.

### SFFloat [in, out] **stopErrorCorrection** 0.8 <small>[0,1]</small> <small class="red">not supported</small>
{: #fields-stopErrorCorrection }

*stopErrorCorrection* is fraction of error correction performed during time step once stop point is reached.

#### Hint

- 0 means no error correction, 1 means all error corrected in single step.

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

### SFFloat [out] **angle**
{: #fields-angle }

Output field *angle*.

### SFFloat [out] **angleRate**
{: #fields-angleRate }

Output field *angleRate*.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>
{: #fields-body1 }

The *body1* and body2 fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>
{: #fields-body2 }

The body1 and *body2* fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

## Advice

### Hint

- RigidBodyPhysics component, level 2.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/SingleAxisHingeJoint.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/screenshot.avif" alt="SingleAxisHingeJoint"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/SingleAxisHingeJoint.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/RigidBodyPhysics/SingleAxisHingeJoint/SingleAxisHingeJoint.x3d)
{: .example-links }

## See Also

- [X3D Specification of SingleAxisHingeJoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#SingleAxisHingeJoint)
