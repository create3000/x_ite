---
title: LayoutLayer
date: 2023-01-07
nav: components-Layout
categories: [components, Layout]
tags: [LayoutLayer, Layout]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LayoutLayer is a Grouping node that can contain most nodes. LayoutLayer content is clipped by the specified viewport node.

The LayoutLayer node belongs to the **Layout** component and requires at least support level **1,** its default container field is *layers.* It is available from X3D version 3.2 or higher.

## Hierarchy

```
+ X3DNode
  + X3DLayerNode
    + LayoutLayer
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **pickable** TRUE

*pickable* determines whether pick traversal is performed for this layer.

### MFString [in, out] **objectType** "ALL" <small>["ALL", "NONE", "TERRAIN", ...]</small>

The *objectType* field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances. Example: labeling a [PickableGroup](/x_ite/components/picking/pickablegroup/) with the *objectType* value "WATER" and then attempting to intersect a pick sensor with *objectType* value "GROUND" fails since the *objectType* values do not match. Example: the special value "ALL" means that each node is available for picking regardless of the type specified by the pick sensor. Example: the special value "NONE" effectively disables all picking for this node and is the equivalent of setting the pickable field to false.

#### Hints

- Authors may define any value for *objectType*.
- MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

### SFBool [in, out] **pointerEvents** TRUE <small class="blue">non-standard</small>

*pointerEvents* defines whether this LayoutLayer becomes target for pointer events.

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFNode [in, out] **layout** NULL <small>[X3DLayoutNode]</small>

The *layout* field contains an X3DLayoutNode node that provides the information required to locate and size the *layout* region of the [LayoutGroup](/x_ite/components/layout/layoutgroup/) node relative to its parent’s *layout* region, and also to scale the contents of the [LayoutGroup](/x_ite/components/layout/layoutgroup/).

### SFNode [in, out] **viewport** NULL <small>[X3DViewportNode]</small>

The content of the [LayoutGroup](/x_ite/components/layout/layoutgroup/) is clipped by the specified *viewport*.

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

### Hint

- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).

### Warning

- Better functional description needed in X3D specification.

## See Also

- [X3D Specification of LayoutLayer Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#LayoutLayer)
