---
title: Transform
date: 2023-01-07
nav: components-Grouping
categories: [components, Grouping]
tags: [Transform, Grouping]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Transform is a Grouping node that can contain most nodes. Transform translates, orients and scales child geometry within the local world coordinate system.

The Transform node belongs to the [Grouping](/x_ite/components/overview/#grouping) component and requires at least support level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + Transform
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFVec3f | [in, out] | [translation](#fields-translation) | 0 0 0  |
| SFRotation | [in, out] | [rotation](#fields-rotation) | 0 0 1 0  |
| SFVec3f | [in, out] | [scale](#fields-scale) | 1 1 1  |
| SFRotation | [in, out] | [scaleOrientation](#fields-scaleOrientation) | 0 0 1 0  |
| SFVec3f | [in, out] | [center](#fields-center) | 0 0 0  |
| SFBool | [in, out] | [visible](#fields-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#fields-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#fields-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#fields-bboxCenter) | 0 0 0  |
| MFNode | [in] | [addChildren](#fields-addChildren) |  |
| MFNode | [in] | [removeChildren](#fields-removeChildren) |  |
| MFNode | [in, out] | [children](#fields-children) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>
{: #fields-translation }

Position (x, y, z in meters) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then rotation, then restore the center offset, then *translation*.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-rotation }

Orientation (axis, angle in radians) of children relative to local coordinate system.

#### Hint

- The order of operation is first apply the center offset, then scaleOrientation and scale, then *rotation*, then restore the center offset, then translation.

### SFVec3f [in, out] **scale** 1 1 1 <small>(-∞,∞)</small>
{: #fields-scale }

Non-uniform x-y-z *scale* of child coordinate system, adjusted by center and scaleOrientation.

#### Hints

- The order of operation is first apply the center offset, then scaleOrientation and *scale*, then rotation, then restore the center offset, then translation.
- Negative *scale* values allowed beginning with X3D version 3.1

### SFRotation [in, out] **scaleOrientation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-scaleOrientation }

Preliminary rotation of coordinate system before scaling (to allow scaling around arbitrary orientations).

#### Hint

- The order of operation is first apply the center offset, then *scaleOrientation* and scale, then rotation, then restore the center offset, then translation.

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>
{: #fields-center }

Translation offset from origin of local coordinate system, applied prior to rotation or scaling.

#### Hint

- The order of operation is first apply the *center* offset, then scaleOrientation and scale, then rotation, then restore the *center* offset, then translation.

### SFBool [in, out] **visible** TRUE
{: #fields-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #fields-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #fields-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #fields-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in] **addChildren**
{: #fields-addChildren }

Input field *addChildren*.

### MFNode [in] **removeChildren**
{: #fields-removeChildren }

Input field *removeChildren*.

### MFNode [in, out] **children** [ ] <small>[X3DChildNode]</small>
{: #fields-children }

Grouping nodes contain an ordered list of *children* nodes.

#### Hints

- Each grouping node defines a coordinate space for its *children*, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

## Advice

### Hints

- Each transformation creates a new coordinate system relative to the parent coordinate system.
- +Y axis is the up direction. (Similarly some scenes may consider +X is North and +Z is East.)
- Best authoring approach is to keep +Y axis pointing towards local up direction, supporting scene composability and effective navigation response (which is based on gravity direction).
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).
- Translation/rotation/scaling field attributes can be defined in any order in the scene. The applied order of translation/rotation/scaling transformation-matrix operations remains consistent.
- Authors can modify order of translation/rotation/scaling operations by splitting them into separate nested parent/child Transform nodes.
- [X3D Scene Authoring Hints, Coordinate Systems](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#CoordinateSystems)
- [X3D Scene Authoring Hints, Scale Factors and Unit Conversions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Scale)
- Apply `containerField='shape'` if parent node is [CADFace](/x_ite/components/cadgeometry/cadface/).

### Warning

- Transform contained by [CADFace](/x_ite/components/cadgeometry/cadface/) can only hold a single [LOD](/x_ite/components/navigation/lod/) or [Shape](/x_ite/components/shape/shape/) node.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Grouping/Transform/Transform.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Grouping/Transform/screenshot.avif" alt="Transform"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Grouping/Transform/Transform.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Grouping/Transform/Transform.x3d)
{: .example-links }

## See Also

- [X3D Specification of Transform Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/grouping.html#Transform)
