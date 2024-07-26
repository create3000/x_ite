---
title: LOD
date: 2023-01-07
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

The LOD node belongs to the **Navigation** component and requires at least level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + LOD
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/core.html#Metadata

### SFBool [ ] **forceTransitions** FALSE

Whether to perform every range-based transition, regardless of browser optimizations that might otherwise occur.

### SFVec3f [ ] **center** 0 0 0 <small>(-∞,∞)</small>

[Viewpoint](/x_ite/components/navigation/viewpoint/) distance-measurement offset from origin of local coordinate system, used for LOD node distance calculations.

### MFFloat [ ] **range** [ ] <small>[0,∞) or -1</small>

Specifies ideal distances at which to switch between levels. The *range* field is a floating-point array of camera-to-object distance transitions for each child level, where *range* values go from near to far. For n *range* values, you must have n+1 child levels!

#### Hints

- Can add `<[WorldInfo](/x_ite/components/core/worldinfo/) info='null node'/>` as a nonrendering, invisible final (or initial or intermediate) child node that also documents the LOD switch-over rationale.
- Not setting *range* values indicates that level switching can be optimized automatically based on performance.

### SFInt32 [out] **level_changed**

Output event that reports current level of LOD children whenever switching occurs.

#### Hint

- LOD level index counting starts at zero. Thus *level_changed* value of -1 means no choice, 0 means initial child, 1 means second child, etc.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

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
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#X3DBoundedObject

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#X3DBoundedObject

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
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/grouping.html#GroupingAndChildrenNodes

## Advice

### Hints

- Can add \<[WorldInfo](/x_ite/components/core/worldinfo/) info='null node'/\> as a nonrendering, invisible final (or initial or intermediate) child node that also documents the LOD switch-over rationale.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) and [Viewpoint](/x_ite/components/navigation/viewpoint/) share the same binding stack, so no more than one of these nodes can be bound and active at a given time.
- Security mechanisms such as encryption and authentication can be applied to high levels of detail, allowing authors to protect intellectual property at high resolution for authorized users while still rendering simple unrestricted models for other users.
- Contained nodes must have type X3DChildNode, such as [Group](/x_ite/components/grouping/group/) or [Transform](/x_ite/components/grouping/transform/) or [Shape](/x_ite/components/shape/shape/).
- Apply `containerField='shape'` if parent node is [CADFace](/x_ite/components/cadgeometry/cadface/).
- [ConformanceNist X3D Examples Archive](https://www.web3d.org/x3d/content/examples/ConformanceNist/SpecialGroups/LOD)

### Warnings

- Do not include [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/) [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) or [Viewpoint](/x_ite/components/navigation/viewpoint/) as a child of LOD or [Switch](/x_ite/components/grouping/switch/), instead use [ViewpointGroup](/x_ite/components/navigation/viewpointgroup/) as parent to constrain location proximity where the viewpoint is available to user.
- Results are undefined if a bindable node ([Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/), [Viewpoint](/x_ite/components/navigation/viewpoint/)) is a contained descendant node of either LOD or [Switch](/x_ite/components/grouping/switch/). Avoid this authoring pattern.
- Nested LOD (and/or [GeoLOD](/x_ite/components/geospatial/geolod/)) nodes with overlapping range intervals can lead to unexpected or undefined behavior.
- LOD is not allowed as a direct parent of [Appearance](/x_ite/components/shape/appearance/), [Material](/x_ite/components/shape/material/), [Color](/x_ite/components/rendering/color/), [Coordinate](/x_ite/components/rendering/coordinate/), [Normal](/x_ite/components/rendering/normal/) or Texture nodes, instead ensure that a [Shape](/x_ite/components/shape/shape/) is present.

## See Also

- [X3D Specification of LOD Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#LOD)
