---
title: Billboard
date: 2022-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [Billboard, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Billboard is a Grouping node that can contain most nodes. Content faces the user, rotating about the specified axis. Set axisOfRotation=0 0 0 to fully face the user's camera.

The Billboard node belongs to the **Navigation** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + Billboard
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [in, out] **axisOfRotation** 0 1 0 <small>(-∞,∞)</small>

AxisOfRotation direction is relative to local coordinate system.

#### Hint

Axis 0 0 0 always faces viewer.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [in] **addChildren**

Input field addChildren.

### MFNode [in] **removeChildren**

Input field removeChildren.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Grouping nodes contain a list of children nodes.

#### Hint

Each grouping node defines a coordinate space for its children, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.

## Description

### Hints

- Put Billboard as close to the geometry as possible, nested inside Transform for local coordinate system.
- Insert a Shape node before adding geometry or Appearance.

Warning
-------

- Don't put Viewpoint inside a Billboard.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Navigation/Billboard/Billboard.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Billboard](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#Billboard){:target="_blank"}
