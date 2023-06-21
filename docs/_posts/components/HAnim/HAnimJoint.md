---
title: HAnimJoint
date: 2022-01-07
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimJoint, HAnim]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Each joint in the body is represented by an HAnimJoint node.

The HAnimJoint node belongs to the **HAnim** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + HAnimJoint
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [ ] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [ ] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ] <small>[HAnimJoint,HAnimSegment,HAnimSite]</small>

Input/Output field children.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

#### Hint

- Usually HAnimJoint position is controlled by the center field, not the translation field.

### MFNode [in, out] **displacers** [ ] <small>[HAnimDisplacer]</small>

Input/Output field displacers.

### SFRotation [in, out] **limitOrientation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Orientation of upper/lower rotation limits, relative to HAnimJoint center.

### MFFloat [in, out] **llimit** [ ] <small>(-∞,∞)</small>

Lower limit for minimum joint rotation in radians.

#### Hint

- Always contains 3 values, one for each local axis.

### SFString [in, out] **name** ""

Unique name attribute must be defined so that HAnimJoint node can be identified at run time for animation purposes.

#### Warning

- Name is not included if this instance is a USE node. Examples: HumanoidRoot sacroiliac l_hip l_knee l_ankle etc. as listed in HAnim Specification.

#### See Also

- [HAnim Humanoid Joint Names](https://www.web3d.org/x3d/content/examples/Basic/HumanoidAnimation/tables/HAnimJointNames19774V1.0.txt){:target="_blank"}
- [HAnim Specification, Humanoid Joint-Segment Hierarchy](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/concepts.html#Hierarchy){:target="_blank"}

### SFRotation [in, out] **rotation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Orientation of children relative to local coordinate system.

### SFVec3f [in, out] **scale** 1 1 1 <small>(0,∞)</small>

Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### MFInt32 [in, out] **skinCoordIndex** [ ] <small>[0,∞)</small>

Coordinate index values referencing which vertices are influenced by the HAnimJoint.

#### Hint

- Corresponding skinCoord Coordinate and skinNormal Normal nodes are directly contained within the ancestor HAnimHumanoid node for this HAnimJoint.

#### Warning

- -1 sentinel values are not allowed.

### MFFloat [in, out] **skinCoordWeight** [ ]

Weight deformation values for the corresponding values in the skinCoordIndex field.

### MFFloat [in, out] **stiffness** [ 0, 0, 0 ] <small>[0,1]</small>

Axial values (0,1) indicating willingness of joint to move (about local X, Y, Z axes), larger stiffness values means greater resistance.

#### Hint

- Used by inverse kinematics (IK) systems.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position of children relative to local coordinate system.

#### Warning

- Usually HAnimJoint position is controlled by the center field, not the translation field.

### MFFloat [in, out] **ulimit** [ ] <small>(-∞,∞)</small>

Upper limit for maximum joint rotation in radians.

#### Hint

- Always contains 3 values, one for each local axis.

## Description

### Hints

- HAnimJoint may only be a child of another HAnimJoint node, or skeleton field for the HAnimHumanoid.
- HAnimJoint can only contain nodes HAnimJoint, HAnimSegment, HAnimSite with containerField='children' and also HAnimDisplacer nodes with containerField='displacers'.
- Visualization shapes for HAnimJoint nodes can be placed in child HAnimSegment or HAnimSite nodes.
- Include `<component name='HAnim' level='1'/>`

### Warning

- An HAnimJoint may not be a child of an HAnimSegment.

## External Links

- [X3D Specification of HAnimJoint](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimJoint){:target="_blank"}
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/HAnimArchitecture.html){:target="_blank"}
- [HAnim Specification, Joint](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/ObjectInterfaces.html#Joint){:target="_blank"}
