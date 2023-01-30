---
title: LOD
date: 2022-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [LOD, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LOD (Level Of Detail) uses camera-to-object distance to switch among contained child levels. (Contained nodes are now called 'children' rather than 'level', for consistent naming among all GroupingNodeType nodes.) LOD range values go from near to far (as child geometry gets simpler for better performance). For n range values, you must have n+1 children levels! Only currently selected children level is rendered, but all levels continue to send/receive events.

The LOD node belongs to the **Navigation** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + LOD
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [ ] **forceTransitions** FALSE

Whether to perform every range-based transition, regardless of browser optimizations that might otherwise occur.

### SFVec3f [ ] **center** 0 0 0 <small>(-∞,∞)</small>

Viewpoint distance-measurement offset from origin of local coordinate system, used for LOD node distance calculations.

### MFFloat [ ] **range** [ ] <small>[0,∞) or -1</small>

Specifies ideal distances at which to switch between levels. The range field is a floating-point array of camera-to-object distance transitions for each child level, where range values go from near to far. For n range values, you must have n+1 child levels!

#### Hints

Can add `<WorldInfo info='null node'/>` as a nonrendering, invisible final (or initial or intermediate) child node that also documents the LOD switch-over rationale. Not setting range values indicates that level switching can be optimized automatically based on performance.

### SFInt32 [out] **level_changed**

Indicates current level of LOD children when activated.

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

- Can add `<WorldInfo info='null node'/>` as a nonrendering, invisible final (or initial or intermediate) child node that also documents the LOD switch-over rationale.
- Insert a Shape node before adding geometry or Appearance.
- Security mechanisms such as encryption and authentication can be applied to high levels of detail, allowing authors to protect intellectual property at high resolution for authorized users while still rendering simple unrestricted models for other users.

Warnings
--------

- Do not include Viewpoint or OrthoViewpoint as a child of LOD or Switch, instead use ViewpointGroup as parent to constrain location proximity where the viewpoint is available to user.
- Results are undefined if a bindable node (Viewpoint, OrthoViewpoint, NavigationInfo, Fog, Background, TextureBackground) is a contained child of LOD or Switch.
- Nested LOD nodes with overlapping range intervals can lead to unexpected or undefined behavior.

## External Links

- [X3D Specification of LOD](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#LOD){:target="_blank"}
