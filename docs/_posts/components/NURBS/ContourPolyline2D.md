---
title: ContourPolyline2D
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [ContourPolyline2D, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ContourPolyline2D defines a linear curve segment as part of a trimming contour in the u-v domain of a NURBS surface. NurbsCurve2D and ContourPolyline2D nodes that together form a closed contour, defined in the u-v parametric space of a NURBS surface, may be used as children in a Contour2D node.

The ContourPolyline2D node belongs to the **NURBS** component and requires at least level **3,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DNurbsControlCurveNode
    + ContourPolyline2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/core.html#Metadata

### MFVec2d [in, out] **controlPoint** [ ] <small>(-∞,∞)</small>

*controlPoint* specifies the end points of each segment of the piecewise linear curve.

## Advice

### Warning

- ContourPolyline2D is not a renderable geometry node.

## See Also

- [X3D Specification of ContourPolyline2D Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#ContourPolyline2D)
