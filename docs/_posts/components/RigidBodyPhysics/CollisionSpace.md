---
title: CollisionSpace
date: 2023-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [CollisionSpace, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CollisionSpace holds collection of objects considered together for resolution of inter-object collisions. Contains multiple CollidableShape, CollidableOffset, or CollisionSpace nodes (`containerField='collidables').`

The CollisionSpace node belongs to the **RigidBodyPhysics** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DNBodyCollisionSpaceNode (X3DBoundedObject)*
    + CollisionSpace
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFBool | \[in, out\] | [enabled](#sfbool-in-out-enabled-true) | TRUE |
| SFBool | \[in, out\] | [useGeometry](#sfbool-in-out-usegeometry-false) | FALSE |
| SFBool | \[in, out\] | [visible](#sfbool-in-out-visible-true) | TRUE |
| SFBool | \[in, out\] | [bboxDisplay](#sfbool-in-out-bboxdisplay-false) | FALSE |
| SFVec3f | \[ \] | [bboxSize](#sfvec3f---bboxsize--1--1--1-0-or-1-1-1) | -1 -1 -1  |
| SFVec3f | \[ \] | [bboxCenter](#sfvec3f---bboxcenter-0-0-0--) | 0 0 0  |
| MFNode | \[in, out\] | [collidables](#mfnode-in-out-collidables---x3dnbodycollisionspacenode-x3dnbodycollidablenode) | \[ \] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFBool [in, out] **useGeometry** FALSE

*useGeometry* indicates whether collision-detection code checks down to level of geometry, or only make approximations using geometry bounds.

#### Hint

- Testing against object bounds is usually sufficient.

#### Warning

- Using geometry is more accurate but slower.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in, out] **collidables** [ ] <small>[X3DNBodyCollisionSpaceNode,X3DNBodyCollidableNode]</small>

Collection of collidable objects as well as nested CollisionSpace collections

## Advice

### Hint

- Content must be visible to be collidable and to be pickable.

## See Also

- [X3D Specification of CollisionSpace Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollisionSpace)
