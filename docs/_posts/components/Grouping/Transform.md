---
title: Transform
date: 2022-01-07
nav: components-Grouping
categories: [components, Grouping]
tags: [Transform, Grouping]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Transform is a Grouping node that can contain most nodes. Transform translates, orients and scales child geometry within the local world coordinate system.

The Transform node belongs to the **Grouping** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + Transform
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Position (x, y, z in meters) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Orientation (axis, angle in radians) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFVec3f [in, out] **scale** 1 1 1 <small>(-∞,∞)</small>

Non-uniform x-y-z scale of child coordinate system, adjusted by center and scaleOrientation.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Translation offset from origin of local coordinate system, applied prior to rotation or scaling.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then translation.

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

Grouping nodes contain a list of children nodes.

#### Hint

- Each grouping node defines a coordinate space for its children, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.

## Description

### Hints

- Each transformation creates a new coordinate system relative to the parent coordinate system.
- +Y axis is the up direction. (Similarly some scenes may consider +X is North and +Z is East.)
- Best authoring approach is to keep +Y axis pointing towards local up direction, supporting scene composability and effective navigation response (which is based on gravity direction).
- Insert a Shape node before adding geometry or Appearance.
- Translation/rotation/scaling field attributes can be defined in any order in the scene. The applied order of translation/rotation/scaling transformation-matrix operations remains consistent.
- Authors can modify order of translation/rotation/scaling operations by splitting them into separate nested parent/child Transform nodes.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Grouping/Transform/Transform.x3d"></x3d-canvas>

### Warning

- Transform contained by CADFace can only hold a single LOD or Shape node.

## External Links

- [X3D Specification of Transform](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/grouping.html#Transform){:target="_blank"}
- [X3D Scene Authoring Hints, Coordinate Systems](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#CoordinateSystems){:target="_blank"}
- [X3D Scene Authoring Hints, Scale Factors and Unit Conversions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Scale){:target="_blank"}
