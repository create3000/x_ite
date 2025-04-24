---
title: NurbsCurve2D
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsCurve2D, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsCurve2D defines a trimming segment that is part of a trimming contour in the u-v domain of a surface. NurbsCurve2D and ContourPolyline2D nodes that together form a closed contour, defined in the u-v parametric space of a NURBS surface, may be used as children in a Contour2D node.

The NurbsCurve2D node belongs to the **NURBS** component and requires at least support level **3,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DNurbsControlCurveNode
    + NurbsCurve2D
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFInt32 | [in, out] | [tessellation](#field-tessellation) | 0  |
| SFBool | [ ] | [closed](#field-closed) | FALSE |
| SFInt32 | [ ] | [order](#field-order) | 3  |
| MFDouble | [ ] | [knot](#field-knot) | [ ] |
| MFDouble | [in, out] | [weight](#field-weight) | [ ] |
| MFVec2d | [in, out] | [controlPoint](#field-controlPoint) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFInt32 [in, out] **tessellation** 0 <small>(-∞,∞)</small>
{: #field-tessellation }

Hint for surface *tessellation*.

### SFBool [ ] **closed** FALSE
{: #field-closed }

Whether or not the curve is *closed* (i.e. matching end values).

### SFInt32 [ ] **order** 3 <small>[2,∞)</small>
{: #field-order }

Define *order* of surface by polynomials of degree = *order*-1.

### MFDouble [ ] **knot** [ ] <small>(-∞,∞)</small>
{: #field-knot }

*knot* vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(0,∞)</small>
{: #field-weight }

Vector assigning relative *weight* value to each control point.

### MFVec2d [in, out] **controlPoint** [ ] <small>(-∞,∞)</small>
{: #field-controlPoint }

*controlPoint* defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.

## Advice

### Warning

- NurbsCurve2D is not a renderable geometry node.

## See Also

- [X3D Specification of NurbsCurve2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsCurve2D)
