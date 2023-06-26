---
title: ContourPolyline2D
date: 2022-01-07
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

The ContourPolyline2D node belongs to the **NURBS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DNurbsControlCurveNode
    + ContourPolyline2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFVec2d [in, out] **controlPoint** [ ] <small>(-∞,∞)</small>

*controlPoint* specifies the end points of each segment of the piecewise linear curve.

## Information

### Warning

- ContourPolyline2D is not a renderable geometry node.

## External Links

- [X3D Specification of ContourPolyline2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#ContourPolyline2D){:target="_blank"}
