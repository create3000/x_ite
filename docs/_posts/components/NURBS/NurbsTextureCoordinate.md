---
title: NurbsTextureCoordinate
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsTextureCoordinate, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsTextureCoordinate describes a 3D NURBS surface in the parametric domain of its surface host, specifying mapping of texture onto the surface.

The NurbsTextureCoordinate node belongs to the **NURBS** component and requires at least support level **1,** its default container field is *texCoord.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + NurbsTextureCoordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFInt32 [ ] **uOrder** 3 <small>[2,∞)</small>

Define order of surface by polynomials of degree = order-1.

### SFInt32 [ ] **vOrder** 3 <small>[2,∞)</small>

Define order of surface by polynomials of degree = order-1.

### SFInt32 [ ] **uDimension** 0 <small>[0,∞)</small>

Number of control points in u dimension.

### SFInt32 [ ] **vDimension** 0 <small>[0,∞)</small>

Number of control points in v dimension.

### MFDouble [ ] **uKnot** [ ] <small>(-∞,∞)</small>

Knot vector, where size = number of control points + order of curve.

### MFDouble [ ] **vKnot** [ ] <small>(-∞,∞)</small>

Knot vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(0,∞)</small>

Output values for linear interpolation, each corresponding to knots.

#### Hint

- Number of weights must match number of knots!

### MFVec2f [in, out] **controlPoint** [ ] <small>(-∞,∞)</small>

*controlPoint* defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.

## Advice

### Hint

- The SFNode controlPoint field can contain a single [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node.

## See Also

- [X3D Specification of NurbsTextureCoordinate Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsTextureCoordinate)
