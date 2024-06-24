---
title: CADFace
date: 2023-01-07
nav: components-CADGeometry
categories: [components, CADGeometry]
tags: [CADFace, CADGeometry]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

CADFace holds geometry representing one face in a Computer-Aided Design (CAD) CADPart. CADFace can only contain a single Shape or LOD node (with `containerField='shape').`

The CADFace node belongs to the **CADGeometry** component and requires at least level **2,** its default container field is *children.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DProductStructureChildNode
      + CADFace (X3DBoundedObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

### SFString [in, out] **name** ""

Optional *name* for this particular CAD node.

#### Hints

- Well-defined names can simplify design and debugging through improved author understanding.
- [X3D Scene Authoring Hints, Naming Conventions](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#NamingConventions){:target="_blank"}

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
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#X3DBoundedObject

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#BoundingBoxes
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/grouping.html#X3DBoundedObject

### SFNode [in, out] **shape** NULL <small>[X3DShapeNode, LOD, Transform]</small>

Contained [Shape](/x_ite/components/shape/shape/) for this [CADPart](/x_ite/components/cadgeometry/cadpart/).

#### Warning

- If [LOD](/x_ite/components/navigation/lod/) or [Transform](/x_ite/components/grouping/transform/) are used, only zero or one [Shape](/x_ite/components/shape/shape/) child is allowed to be active at one time.

## Advice

### Hint

- [X3D for Advanced Modeling (X3D4AM) slideset](https://x3dgraphics.com/slidesets/X3dForAdvancedModeling/ComputerAidedDesignInterchangeProfile.pdf){:target="_blank"}

### Warnings

- Only zero or one [Shape](/x_ite/components/shape/shape/) child is allowed to be active at one time.
- Requires X3D `profile='Full'` or else include `<component name='CADGeometry' level='2'/>`

## See Also

- [X3D Specification of CADFace Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/CADGeometry.html#CADFace){:target="_blank"}
