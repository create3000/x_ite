---
title: LayoutGroup
date: 2023-01-07
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

The LayoutGroup node belongs to the **Layout** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + LayoutGroup
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFNode \[in, out\] [layout](#sfnode-in-out-layout-null-x3dlayoutnode)
- SFNode \[in, out\] [viewport](#sfnode-in-out-viewport-null-x3dviewportnode)
- SFBool \[in, out\] [visible](#sfbool-in-out-visible-true)
- SFBool \[in, out\] [bboxDisplay](#sfbool-in-out-bboxdisplay-false)
- SFVec3f \[ \] [bboxSize](#sfvec3f---bboxsize--1--1--1-0-or-1-1-1)
- SFVec3f \[ \] [bboxCenter](#sfvec3f---bboxcenter-0-0-0--)
- MFNode \[in\] [addChildren](#mfnode-in-addchildren)
- MFNode \[in\] [removeChildren](#mfnode-in-removechildren)
- MFNode \[in, out\] [children](#mfnode-in-out-children---x3dchildnode)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFNode [in, out] **layout** NULL <small>[X3DLayoutNode]</small>

The *layout* field contains an X3DLayoutNode node that provides the information required to locate and size the *layout* region of the LayoutGroup node relative to its parent’s *layout* region, and also to scale the contents of the LayoutGroup.

### SFNode [in, out] **viewport** NULL <small>[X3DViewportNode]</small>

The content of the LayoutGroup is clipped by the specified *viewport*.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in] **addChildren**

Input field *addChildren*.

### MFNode [in] **removeChildren**

Input field *removeChildren*.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>

Grouping nodes contain an ordered list of *children* nodes.

#### Hints

- Each grouping node defines a coordinate space for its *children*, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

## Advice

### Hints

- The origin of the node is always in the center of its layout region. Thus, children (with the exception of LayoutGroup) are specified in a coordinate system whose origin is located at the center of the rectangle and can be transformed from that location.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- LayoutGroup does not directly have any pixel-dependent concepts. However, it can contain a [Layout](/x_ite/components/layout/layout/) node that does have pixel-specific options.

### Warning

- A LayoutGroup can only be a child of a [LayoutLayer](/x_ite/components/layout/layoutlayer/) node or another LayoutGroup node.

## See Also

- [X3D Specification of LayoutGroup Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#LayoutGroup)
