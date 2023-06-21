---
title: PickableGroup
date: 2022-01-07
nav: components-Picking
categories: [components, Picking]
tags: [PickableGroup, Picking]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PickableGroup is a Grouping node that can contain most nodes. PickableGroup contains children that are marked as having a given classification of picking types, and can also enable or disable picking of the children.

The PickableGroup node belongs to the **Picking** component and its default container field is *children.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + PickableGroup (X3DPickableObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **pickable** TRUE

The pickable field determines whether pick traversal is performed on this node or its children.

#### Hint

- Pickable only affects children accessed through the transformation hierarchy of the parent.

#### Warning

- If one or more of the children of this instance is accessible through another transformation hierarchy through DEF/USE that still has picking enabled, they are still pickable through that path only.

### MFString [in, out] **objectType** "ALL" <small>["ALL","NONE","TERRAIN",...]</small>

The objectType field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances.

#### Hints

- Authors may define any value for objectType. MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

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

Grouping nodes contain a list of children nodes.

#### Hint

- Each grouping node defines a coordinate space for its children, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.

## Description

### Hint

- Insert a Shape node before adding geometry or Appearance.

## External Links

- [X3D Specification of PickableGroup](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/picking.html#PickableGroup){:target="_blank"}
