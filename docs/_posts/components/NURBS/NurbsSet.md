---
title: NurbsSet
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsSet, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsSet collects a set of NurbsSurface nodes into a common group and treats NurbsSurface set as a unit during tessellation, thereby enforcing tessellation continuity along borders.

The NurbsSet node belongs to the **NURBS** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + NurbsSet (X3DBoundedObject)*
```

\* Derived from multiple interfaces.
{: .small }

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFFloat | [in, out] | [tessellationScale](#field-tessellationScale) | 1  |
| SFBool | [in, out] | [visible](#field-visible) | TRUE |
| SFBool | [in, out] | [bboxDisplay](#field-bboxDisplay) | FALSE |
| SFVec3f | [ ] | [bboxSize](#field-bboxSize) | -1 -1 -1  |
| SFVec3f | [ ] | [bboxCenter](#field-bboxCenter) | 0 0 0  |
| MFNode | [in] | [addGeometry](#field-addGeometry) |  |
| MFNode | [in] | [removeGeometry](#field-removeGeometry) |  |
| MFNode | [in, out] | [geometry](#field-geometry) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **tessellationScale** 1 <small>(0,∞)</small>
{: #field-tessellationScale }

Scale for surface tessellation in children NurbsSurface nodes.

### SFBool [in, out] **visible** TRUE
{: #field-visible }

Whether or not renderable content within this node is visually displayed.

#### Hints

- The *visible* field has no effect on animation behaviors, event passing or other non-visual characteristics.
- Content must be *visible* to be collidable and to be pickable.

### SFBool [in, out] **bboxDisplay** FALSE
{: #field-bboxDisplay }

Whether to display bounding box for associated geometry, aligned with world coordinates.

#### Hint

- The bounding box is displayed regardless of whether contained content is visible.

### SFVec3f [ ] **bboxSize** -1 -1 -1 <small>[0,∞) or −1 −1 −1</small>
{: #field-bboxSize }

Bounding box size is usually omitted, and can easily be calculated automatically by an X3D player at scene-loading time with minimal computational cost. Bounding box size can also be defined as an optional authoring hint that suggests an optimization or constraint.

#### Hints

- Can be useful for collision computations or inverse-kinematics (IK) engines.
- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### SFVec3f [ ] **bboxCenter** 0 0 0 <small>(-∞,∞)</small>
{: #field-bboxCenter }

Bounding box center accompanies bboxSize and provides an optional hint for bounding box position offset from origin of local coordinate system.

#### Hints

- Precomputation and inclusion of bounding box information can speed up the initialization of large detailed models, with a corresponding cost of increased file size.
- [X3D Architecture, 10.2.2 Bounding boxes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#BoundingBoxes)
- [X3D Architecture, 10.3.1 X3DBoundedObject](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/grouping.html#X3DBoundedObject)

### MFNode [in] **addGeometry**
{: #field-addGeometry }

Input field *addGeometry*.

### MFNode [in] **removeGeometry**
{: #field-removeGeometry }

Input field *removeGeometry*.

### MFNode [in, out] **geometry** [ ] <small>[X3DNurbsSurfaceGeometryNode]</small>
{: #field-geometry }

The children form a closed loop with first point of first child repeated as last point of last child, and the last point of a segment repeated as first point of the consecutive one.

#### Hints

- Children nodes are listed in consecutive order according to topology of the contour.
- Utilizing USE nodes for *geometry* can ensure that rendered *geometry* occurs elsewhere in the model.

#### Warnings

- *geometry* represented in children of this node shall not be directly rendered. It is an informational node only.
- Surfaces not represented elsewhere in transformation hierarchy shall not be rendered.

## Advice

### Hint

- USE nodes for geometry ensure renderable versions occur elsewhere in the model. The bounds information is provided for optimization purposes only. A browser may choose to use this information about when to apply trimming or smooth tessellation between patches based on the bounds information.

### Warnings

- Geometry represented in children of this node shall not be directly rendered. It is an informational node only.
- Surfaces not represented elsewhere in transformation hierarchy shall not be rendered.

## See Also

- [X3D Specification of NurbsSet Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsSet)
