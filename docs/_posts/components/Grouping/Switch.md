---
title: Switch
date: 2023-01-07
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

Switch is a Grouping node that only renders one (or zero) child at a time. Switch can contain most nodes. (Contained nodes are now called 'children' rather than 'choice', for consistent naming among all GroupingNodeType nodes.) All child choices continue to receive and send events regardless of whichChoice is active.

The Switch node belongs to the **Grouping** component and requires at least level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + Switch
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataboolean/), [MetadataDouble](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatadouble/), [MetadataFloat](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatafloat/), [MetadataInteger](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatainteger/), [MetadataString](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadatastring/) or [MetadataSet](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFInt32 [in, out] **whichChoice** -1 <small>[-1,∞)</small>

Index of active child choice, counting from 0.

#### Warning

- Default value *whichChoice*= -1 means no selection (and no rendering), *whichChoice*=0 means initial child, *whichChoice*=1 means second child, etc.

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

- Insert a [Shape](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/appearance/).
- Authors can temporarily hide test geometry under an unselected child of a Switch. This is a good alternative to "commenting out" nodes.
- [GeoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geoviewpoint/) [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/) and [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) share the same binding stack, so no more than one of these nodes can be bound and active at a given time.
- Contained nodes must have type X3DChildNode, such as [Group](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/grouping/group/) or [Transform](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/grouping/transform/) or [Shape](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/shape/).

### Warnings

- Do not include [GeoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/geospatial/geoviewpoint/) [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/) or [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/) as a child of [LOD](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/lod/) or Switch, instead use [ViewpointGroup](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpointgroup/) as parent to constrain location proximity where the viewpoint is available to user.
- Results are undefined if a bindable node ([Background](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/background/), [Fog](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/fog/), [NavigationInfo](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/environmentaleffects/texturebackground/), [Viewpoint](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/viewpoint/)) is a contained descendant node of either [LOD](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/navigation/lod/) or Switch. Avoid this authoring pattern.
- Switch is not allowed as parent of [Appearance](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/appearance/), [Material](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/shape/material/), [Color](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/color/), [Coordinate](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/coordinate/), [Normal](/x_ite/components//users/holger/desktop/x_ite/x_ite/docs/_posts/components/rendering/normal/) or Texture nodes.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Grouping/Switch/Switch.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Grouping/Switch/screenshot.avif" alt="Switch"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Grouping/Switch/Switch.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Grouping/Switch/Switch.x3d)
{: .example-links }

## See Also

- [X3D Specification of Switch Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/grouping.html#Switch)
