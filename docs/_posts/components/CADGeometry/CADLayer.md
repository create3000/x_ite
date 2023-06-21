---
title: CADLayer
date: 2022-01-07
nav: components-CADGeometry
categories: [components, CADGeometry]
tags: [CADLayer, CADGeometry]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CADLayer nodes define a hierarchy that shows layer structure for a Computer-Aided Design (CAD) model. CADLayer is a Grouping node that can contain CADAssembly and most nodes.

The CADLayer node belongs to the **CADGeometry** component and its default container field is *children.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + CADLayer
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **name** ""

Optional name for this particular CAD node.

#### Warning

- Name is not included if this instance is a USE node.

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

- Can also contain Shapes or other grouped content.
- Include `<component name='CADGeometry' level='2'/>`

## External Links

- [X3D Specification of CADLayer](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/CADGeometry.html#CADLayer){:target="_blank"}
