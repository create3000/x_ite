---
title: Collision
date: 2023-01-07
nav: components-Navigation
categories: [components, Navigation]
tags: [Collision, Navigation]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Collision detects camera-to-object contact using current view and NavigationInfo avatarSize. Collision is a Grouping node that reports collision detection for its children.

The Collision node belongs to the [Navigation](/x_ite/components/overview/#navigation) component and requires at least support level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + Collision (X3DSensorNode)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFBool | [out] | [isActive](#fields-isActive) |  |
| SFTime | [out] | [collideTime](#fields-collideTime) |  |
| SFBool | [in, out] | [visible](#fields-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#fields-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#fields-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#fields-bboxCenter) | 0 0 0  |
| SFNode | [ ] | [proxy](#fields-proxy) | NULL  |
| MFNode | [in] | [addChildren](#fields-addChildren) |  |
| MFNode | [in] | [removeChildren](#fields-removeChildren) |  |
| MFNode | [in, out] | [children](#fields-children) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the node.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables collision detection for children and all descendants.

#### Hint

- Former name "collide" in VRML97 specification.

### SFBool [out] **isActive**
{: #fields-isActive }

*isActive* true/false events are sent when triggering the sensor. *isActive*=true when view-object collision occurs, *isActive*=false when view-object collision no longer occurs.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **collideTime**
{: #fields-collideTime }

Time of collision between camera (avatar) and geometry.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

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

### SFNode [ ] **proxy** NULL <small>[X3DChildNode]</small>
{: #fields-proxy }

The *proxy* node is used as a substitute for Collision children during collision detection, simplifying collision-intersection computations.

#### Hint

- The *proxy* node is used strictly for collision detection and is not drawn.

#### Warnings

- The *proxy* node must have `containerField='proxy'` or it is simply treated like other children nodes.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).

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

- Collision can contain a single proxy child node for substitute collision-detection geometry. Improve run-time performance by using proxy with simpler contact-calculation geometry.
- Proxy shapes are not rendered and remain invisible.
- Apply `containerField='proxy'` to uniquely identify the proxy child [Shape](/x_ite/components/shape/shape/) or grouping node.
- [NavigationInfo](/x_ite/components/navigation/navigationinfo/) types '"WALK" "FLY"' support camera-to-object collision detection.
- Content must be visible to be collidable and to be pickable.
- Insert a [Shape](/x_ite/components/shape/shape/) node before adding geometry or [Appearance](/x_ite/components/shape/appearance/).

### Warning

- [PointSet](/x_ite/components/rendering/pointset/), [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [Text](/x_ite/components/text/text/) are not collidable geometry do not trigger collisions.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Navigation/Collision/Collision.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Navigation/Collision/screenshot.avif" alt="Collision"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Navigation/Collision/Collision.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Navigation/Collision/Collision.x3d)
{: .example-links }

## See Also

- [X3D Specification of Collision Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/navigation.html#Collision)
