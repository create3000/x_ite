---
title: LayoutGroup
date: 2022-01-07
nav: components-Layout
categories: [components, Layout]
tags: [LayoutGroup, Layout]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LayoutGroup is a Grouping node that can contain most nodes, whose children are related by a common layout within a parent layout. The layout field contains an X3DLayoutNode node that provides the information required to locate and size the layout region of the LayoutGroup node relative to its parent’s layout region. LayoutGroup content is clipped by the specified viewport node.

The LayoutGroup node belongs to the **Layout** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + LayoutGroup
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [in, out] **layout** NULL <small>[X3DLayoutNode]</small>

The layout field contains an X3DLayoutNode node that provides the information required to locate and size the layout region of the LayoutGroup node relative to its parent’s layout region, and also to scale the contents of the LayoutGroup.

### SFNode [in, out] **viewport** NULL <small>[X3DViewportNode]</small>

The content of the LayoutGroup is clipped by the specified viewport.

### SFBool [ ] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [ ] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>(-∞,∞)</small>

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

- The origin of the node is always in the center of its layout region. Thus, children (with the exception of LayoutGroup) are specified in a coordinate system whose origin is located at the center of the rectangle and can be transformed from that location.
- Insert a Shape node before adding geometry or Appearance.
- LayoutGroup does not directly have any pixel-dependent concepts. However, it can contain a Layout node that does have pixel-specific options.

### Warning

- A LayoutGroup can only be a child of a LayoutLayer node or another LayoutGroup node.

## External Links

- [X3D Specification of LayoutGroup](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#LayoutGroup){:target="_blank"}
