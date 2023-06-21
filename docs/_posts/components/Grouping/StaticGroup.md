---
title: StaticGroup
date: 2022-01-07
nav: components-Grouping
categories: [components, Grouping]
tags: [StaticGroup, Grouping]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

StaticGroup is a Grouping node that can contain most nodes. StaticGroup children are guaranteed to not change, send events, receive events, or include re-USE-able content. This allows browser optimizations of contained-node content.

The StaticGroup node belongs to the **Grouping** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + StaticGroup (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hint

- The visible field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be visible to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hint

- Can be useful for collision computations or inverse-kinematics (IK) engines.

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center: optional hint for position offset from origin of local coordinate system.

### MFNode [ ] **children** [ ] <small>[X3DChildNode]</small>

Grouping nodes contain a list of children nodes.

#### Hint

- Each grouping node defines a coordinate space for its children, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.

## Description

### Hints

- Insert a Shape node before adding geometry or Appearance.
- Include `<component name='Grouping' level='3'/>`

## External Links

- [X3D Specification of StaticGroup](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/grouping.html#StaticGroup){:target="_blank"}
