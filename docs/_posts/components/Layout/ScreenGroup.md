---
title: ScreenGroup
date: 2022-01-07
nav: components-Layout
categories: [components, Layout]
tags: [ScreenGroup, Layout]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ScreenGroup is a Grouping node that can contain most nodes. ScreenGroup modifies the screen scale in such a way that one unit is equal to one pixel in both the horizontal and vertical directions.

The ScreenGroup node belongs to the **Layout** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + ScreenGroup
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>(0,∞) or -1 -1 -1</small>

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

### Hint

- Insert a Shape node before adding geometry or Appearance.

## External Links

- [X3D Specification of ScreenGroup](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#ScreenGroup){:target="_blank"}
