---
title: LayoutLayer
date: 2022-01-07
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

The LayoutLayer node belongs to the **Layout** component and its default container field is *layers.* It is available since X3D version 3.2 or later.

## Hierarchy

```
+ X3DNode
  + X3DLayerNode
    + LayoutLayer
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **pickable** TRUE

*pickable* determines whether pick traversal is performed for this layer.

### MFString [in, out] **objectType** "ALL" <small>["ALL","NONE"|"TERRAIN"|...]</small>

The objectType field specifies a set of labels used in the picking process. Each string specified is treated as an independent label that needs to be matched against the same type in one of the pick sensor instances.

#### Hints

- Authors may define any value for objectType. MFString arrays can have multiple values, so "separate each individual string" "by using quote marks".

### SFBool [in, out] **visible** TRUE

Whether or not renderable content within this node is visually displayed.

### SFNode [in, out] **layout** NULL <small>[X3DLayoutNode]</small>

The layout field contains an X3DLayoutNode node that provides the information required to locate and size the layout region of the LayoutGroup node relative to its parent’s layout region, and also to scale the contents of the LayoutGroup.

### SFNode [in, out] **viewport** NULL <small>[X3DViewportNode]</small>

The content of the LayoutGroup is clipped by the specified viewport.

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

### Warning

- Better functional description needed in X3D specification.

## External Links

- [X3D Specification of LayoutLayer](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/layout.html#LayoutLayer){:target="_blank"}
