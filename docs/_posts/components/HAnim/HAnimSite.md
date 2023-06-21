---
title: HAnimSite
date: 2022-01-07
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimSite, HAnim]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

An HAnimSite node serves three purposes: (a) define an "end effector" location which can be used by an inverse kinematics system, (b) define an attachment point for accessories such as jewelry and clothing, and (c) define a location for a virtual camera in the reference frame of an HAnimSegment (such as a view "through the eyes" of the humanoid for use in multi-user worlds).

The HAnimSite node belongs to the **HAnim** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + HAnimSite
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

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Input/Output field children.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

### SFString [in, out] **name** ""

Unique name attribute must be defined so that HAnimSite node can be identified at run time for animation purposes.

#### Hints

- HAnimSite nodes used as end effectors have '\_tip' suffix appended to the name. HAnimSite nodes containing a Viewpoint location have '\_view' suffix appended to the name. HAnimSite nodes serving other purposes have '\_pt' suffix appended to the name. Examples: cervicale l_infraorbitale supramenton etc. as listed in HAnim Specification.

#### Warning

- Name is not included if this instance is a USE node.

#### See Also

- [HAnim Humanoid Site Names LOA-3](https://www.web3d.org/x3d/content/examples/Basic/HumanoidAnimation/tables/HAnimSiteLoa3Names19774V1.0.txt){:target="_blank"}
- [HAnim Specification, LOA-3 default Site object translations](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/BodyDimensionsAndLOAs.html#LOA3DefaultSiteTranslations){:target="_blank"}

### SFRotation [in, out] **rotation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Orientation of children relative to local coordinate system.

### SFVec3f [in, out] **scale** 1 1 1 <small>(0,∞)</small>

Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>(-∞,∞) or [-1,1]</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position of children relative to local coordinate system.

## Description

### Hints

- HAnimSite nodes are stored as children of an HAnimSegment node.
- Include `<component name='HAnim' level='1'/>`

## External Links

- [X3D Specification of HAnimSite](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimSite){:target="_blank"}
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/HAnimArchitecture.html){:target="_blank"}
- [HAnim Specification, Site](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/ObjectInterfaces.html#Site){:target="_blank"}
- [HAnim Specification, Annex B, Feature points for the human body](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/FeaturePoints.html){:target="_blank"}
