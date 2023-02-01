---
title: Collision
date: 2022-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [Collision, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Collision detects camera-to-object contact using current view and NavigationInfo avatarSize. Collision is a Grouping node that handles collision detection for its children. Collision can contain a single proxy child node for substitute collision-detection geometry.

The Collision node belongs to the **Navigation** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + Collision (X3DSensorNode)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables collision detection for children and all descendants.

#### Hint

- Former name "collide" in VRML97 specification.

### SFBool [out] **isActive**

*isActive* true/false events are sent when triggering the sensor. isActive=true when view-object collision occurs, isActive=false when view-object collision no longer occurs.

### SFTime [out] **collideTime**

Time of collision between camera (avatar) and geometry.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### SFNode [ ] **proxy** NULL <small>[X3DChildNode]</small>

Field proxy.

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Grouping nodes contain a list of children nodes.

#### Hint

- Each grouping node defines a coordinate space for its children, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.

## Description

### Hints

- Proxy shapes are not rendered and remain invisible.
- Apply containerField='proxy' to uniquely identify the proxy child Shape or grouping node.
- PointSet, IndexedLineSet, LineSet and Text are not collidable geometry do not trigger collisions.
- Improve performance using proxy for simpler contact-calculation geometry.
- NavigationInfo types '"WALK" "FLY"' support camera-to-object collision detection.
- Insert a Shape node before adding geometry or Appearance.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Navigation/Collision/Collision.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Collision](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#Collision){:target="_blank"}
