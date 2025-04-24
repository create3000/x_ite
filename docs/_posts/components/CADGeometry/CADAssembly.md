---
title: CADAssembly
date: 2023-01-07
nav: components-CADGeometry
categories: [components, CADGeometry]
tags: [CADAssembly, CADGeometry]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CADAssembly holds a set of Computer-Aided Design (CAD) assemblies or parts grouped together. CADAssembly is a Grouping node that can contain CADAssembly (subassembly), CADPart or CADFace nodes.

The CADAssembly node belongs to the **CADGeometry** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DGroupingNode
      + CADAssembly (X3DProductStructureChildNode)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFString | \[in, out\] | [name](#sfstring-in-out-name-) | "" |
| SFBool | \[in, out\] | [visible](#sfbool-in-out-visible-true) | TRUE |
| SFBool | \[in, out\] | [bboxDisplay](#sfbool-in-out-bboxdisplay-false) | FALSE |
| SFVec3f | \[ \] | [bboxSize](#sfvec3f---bboxsize--1--1--1-0-or-1-1-1) | -1 -1 -1  |
| SFVec3f | \[ \] | [bboxCenter](#sfvec3f---bboxcenter-0-0-0--) | 0 0 0  |
| MFNode | \[in\] | [addChildren](#mfnode-in-addchildren) |  |
| MFNode | \[in\] | [removeChildren](#mfnode-in-removechildren) |  |
| MFNode | \[in, out\] | [children](#mfnode-in-out-children---x3dproductstructurechildnode-x3dgroupingnode) | \[ \] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **name** ""

Optional *name* for this particular CAD node.

#### Hints

- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions)

#### Warning

- *name* field is not included if this instance is a USE node, in order to avoid potential mismatches.

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

### MFNode [in, out] **children** [ ] <small>[X3DProductStructureChildNode, X3DGroupingNode]</small>

Grouping nodes contain an ordered list of *children* nodes.

#### Hints

- Each grouping node defines a coordinate space for its *children*, relative to the coordinate space of its parent node. Thus transformations accumulate down the scene graph hierarchy.
- InputOnly MFNode addChildren field can append new X3DChildNode nodes via a ROUTE connection, duplicate input nodes (i.e. matching DEF, USE values) are ignored.
- InputOnly MFNode removeChildren field can remove nodes from the *children* list, unrecognized input nodes (i.e. nonmatching DEF, USE values) are ignored.
- [X3D Architecture 10.2.1 Grouping and *children* node types](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#GroupingAndChildrenNodes)

## Advice

### Hints

- Can also contain Shapes or other grouped content.
- [Datum reference](https://en.wikipedia.org/wiki/Datum_reference)
- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/ComputerAidedDesignInterchangeProfile.pdf)
- [ViewpointGroup](/x_ite/components/navigation/viewpointgroup/) and [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/) require Navigation component level 3, which is higher than CADInterchange profile.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='CADGeometry' level='2'/>`

## See Also

- [X3D Specification of CADAssembly Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/CADGeometry.html#CADAssembly)
