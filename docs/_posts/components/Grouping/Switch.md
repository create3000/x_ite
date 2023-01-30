---
title: Switch
date: 2022-01-07
nav: components-Grouping
categories: [components, Grouping]
tags: [Switch, Grouping]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Switch is a Grouping node that only renders one (or zero) child at a time. Switch can contain most nodes. (Contained nodes are now called 'children' rather than 'choice', for consistent naming among all GroupingNodeType nodes.) All child choices continue to receive &amp; send events regardless of whichChoice is active.

The Switch node belongs to the **Grouping** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + Switch
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFInt32 [in, out] **whichChoice** -1 <small>[-1,∞)</small>

Index of active child choice, counting from 0.

#### Warning

Default whichChoice= -1 means no selection (and no rendering), whichChoice=0 means initial child.

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

- Insert a Shape node before adding geometry or Appearance.
- Authors can temporarily hide test geometry under an unselected child of a Switch. This is a good alternative to "commenting out" nodes.

Warnings
--------

- Do not include Viewpoint or OrthoViewpoint as a child of LOD or Switch, instead use ViewpointGroup as parent to constrain location proximity where the viewpoint is available to user.
- Results are undefined if a bindable node (Viewpoint, OrthoViewpoint, NavigationInfo, Fog, Background, TextureBackground) is a contained child of LOD or Switch.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Grouping/Switch/Switch.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Switch](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/grouping.html#Switch){:target="_blank"}
