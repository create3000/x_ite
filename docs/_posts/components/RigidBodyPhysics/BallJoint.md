---
title: BallJoint
date: 2023-01-07
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

The BallJoint node belongs to the **RigidBodyPhysics** component and requires at least support level **2,** its default container field is *joints.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DRigidJointNode
    + BallJoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### MFString [in, out] **forceOutput** "NONE" <small>["ALL", "NONE", ...]</small>

*forceOutput* controls which output fields are generated for the next frame. Values are ALL, NONE, or exact names of output fields updated at start of next frame.

### SFVec3f [in, out] **anchorPoint** 0 0 0 <small>(-∞,∞)</small>

*anchorPoint* is joint center, specified in world coordinates.

### SFVec3f [out] **body1AnchorPoint**

*body1AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if *body1AnchorPoint*!=body2AnchorPoint.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **body2AnchorPoint**

*body2AnchorPoint* describes anchorPoint position relative to local coordinate reference frame.

#### Hint

- Can detect separation if body1AnchorPoint!=*body2AnchorPoint*.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **body1** NULL <small>[RigidBody]</small>

The *body1* and body2 fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

### SFNode [in, out] **body2** NULL <small>[RigidBody]</small>

The body1 and *body2* fields indicate the two [RigidBody](/x_ite/components/rigidbodyphysics/rigidbody/) nodes connected by this joint.

## Advice

### Hint

- RigidBodyPhysics component, level 2.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/RigidBodyPhysics/BallJoint/BallJoint.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/RigidBodyPhysics/BallJoint/screenshot.avif" alt="BallJoint"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/RigidBodyPhysics/BallJoint/BallJoint.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/RigidBodyPhysics/BallJoint/BallJoint.x3d)
{: .example-links }

## See Also

- [X3D Specification of BallJoint Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#BallJoint)
