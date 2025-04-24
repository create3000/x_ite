---
title: CollidableShape
date: 2023-01-07
nav: components-RigidBodyPhysics
categories: [components, RigidBodyPhysics]
tags: [CollidableShape, RigidBodyPhysics]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CollidableShape connects the collision detection system, the rigid body model, and the renderable scene graph. Contains a single Shape node (`containerField='shape')` for animating collidable geometry.

The CollidableShape node belongs to the **RigidBodyPhysics** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DNBodyCollidableNode
      + CollidableShape
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [in, out] | [enabled](#field-enabled) | TRUE |
| SFVec3f | [in, out] | [translation](#field-translation) | 0 0 0  |
| SFRotation | [in, out] | [rotation](#field-rotation) | 0 0 1 0  |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#field-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#field-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#field-bboxCenter) | 0 0 0  |
| SFNode | [ ] | [shape](#field-shape) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE
{: #field-enabled }

Enables/disables node operation.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>
{: #field-translation }

Position (x, y, z in meters) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then *translation*.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[0,1]</small>
{: #field-rotation }

Orientation (axis, angle in radians) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then *rotation*, then restore the center offset, then translation.

### SFBool [in, out] **visible** TRUE
{: #field-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #field-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #field-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #field-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFNode [ ] **shape** NULL <small>[Shape]</small>
{: #field-shape }

The *shape* field provides a geometry proxy for specifying which geometry best represents the collidable object.

## Advice

### Hint

- Content must be visible to be collidable and to be pickable.

### Warnings

- Avoid changing [Shape](/x_ite/components/shape/shape/) geometry at run time to prevent performance problems.
- Apply `containerField='shape'` to single [Shape](/x_ite/components/shape/shape/) child node, not `containerField='children'` default.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/RigidBodyPhysics/CollidableShape/CollidableShape.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/RigidBodyPhysics/CollidableShape/screenshot.avif" alt="CollidableShape"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/RigidBodyPhysics/CollidableShape/CollidableShape.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/RigidBodyPhysics/CollidableShape/CollidableShape.x3d)
{: .example-links }

## See Also

- [X3D Specification of CollidableShape Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rigidBodyPhysics.html#CollidableShape)
