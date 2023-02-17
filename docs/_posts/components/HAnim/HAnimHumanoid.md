---
title: HAnimHumanoid
date: 2022-01-07
nav: components-HAnim
categories: [components, HAnim]
tags: [HAnimHumanoid, HAnim]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

The HAnimHumanoid node is used to: (a) store references to the joints, segments, sites, skin and viewpoints, (b) serve as a container for the entire humanoid, (c) provide a convenient way of moving the humanoid through its environment, and (d) store human-readable data such as author and copyright information. HAnimHumanoid contains HAnimJoint, HAnimSegment and HAnimSite nodes, plus a single optional Coordinate/CoordinateDouble mesh with a single corresponding Normal node.

The HAnimHumanoid node belongs to the **HAnim** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + HAnimHumanoid (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

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

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system.

### MFString [in, out] **info** [ ]

Contains metadata keyword=value pairs, where approved keyword terms are humanoidVersion authorName authorEmail copyright creationDate usageRestrictions age gender height and weight.

### MFNode [in, out] **joints** [ ] <small>[HAnimJoint]</small>

Input/Output field joints.

### SFString [in, out] **name** ""

Unique name attribute must be defined so that HAnimHumanoid node can be identified at run time for animation purposes.

#### Warning

- Name is not included if this instance is a USE node.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>(-∞,∞)|[-1,1]</small>

Orientation of children relative to local coordinate system.

### SFVec3f [in, out] **scale** 1 1 1 <small>(0,∞)</small>

Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>(-∞,∞)|[-1,1]</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

### MFNode [in, out] **segments** [ ] <small>[HAnimSegment]</small>

Input/Output field segments.

### MFNode [in, out] **sites** [ ] <small>[HAnimSite]</small>

Input/Output field sites.

### MFNode [in, out] **skeleton** [ ] <small>[HAnimJoint, HAnimSite]</small>

Input/Output field skeleton.

### MFNode [in, out] **skin** [ ] <small>[X3DChildNode]</small>

Input/Output field skin.

### SFNode [in, out] **skinCoord** NULL <small>[X3DCoordinateNode]</small>

Input/Output field skinCoord.

### SFNode [in, out] **skinNormal** NULL <small>[X3DNormalNode]</small>

Input/Output field skinNormal.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position of children relative to local coordinate system.

### SFString [in, out] **version** ""

HAnimHumanoid version, where standardized ISO 19774 value is 2.0.

#### Warning

- Prior versions of HAnim nodes might not validate correctly.

### MFNode [in, out] **viewpoints** [ ] <small>[HAnimSite]</small>

Input/Output field viewpoints.

## Description

### Hints

- MFNode arrays for joints, segments, sites, skin and viewpoints usually follow the human body definition and contain USE node references.
- The viewpoints field connects internal Site nodes that in turn hold relative Viewpoint nodes, such as `<HAnimSite USE='ObserveFace_viewSite' containerField='viewpoints'/>` which has a corresponding `<HAnimSite DEF='ObserveFace_viewSite' name='ObserveFace_view' containerField='children' description='look at me!'/>` node.
- Include `<component name='HAnim' level='1'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/HAnim/HAnimHumanoid/HAnimHumanoid.x3d"></x3d-canvas>

## External Links

- [X3D Specification of HAnimHumanoid](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/hanim.html#HAnimHumanoid){:target="_blank"}
- [HAnim Specification](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/HAnimArchitecture.html){:target="_blank"}
- [HAnim Specification, Humanoid](https://www.web3d.org/documents/specifications/19774-1/V2.0/HAnim/ObjectInterfaces.html#Humanoid){:target="_blank"}
