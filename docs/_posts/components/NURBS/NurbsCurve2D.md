---
title: NurbsCurve2D
date: 2022-01-07
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

The NurbsCurve2D node belongs to the **NURBS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DNurbsControlCurveNode
    + NurbsCurve2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFInt32 [in, out] **tessellation** 0 <small>(-∞,∞)</small>

Hint for surface tesselation.

### SFBool [ ] **closed** FALSE

Whether or not the curve is closed (i.e. matching end values).

### SFInt32 [ ] **order** 3 <small>[2,∞)</small>

Define order of surface by polynomials of degree = order-1.

### MFDouble [ ] **knot** [ ] <small>(-∞,∞)</small>

*knot* vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(0,∞)</small>

Vector assigning relative weight value to each control point.

### MFVec2d [in, out] **controlPoint** [ ] <small>(-∞,∞)</small>

*controlPoint* defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.

## Description

### Warning

- NurbsCurve2D is not a renderable geometry node.

## External Links

- [X3D Specification of NurbsCurve2D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsCurve2D){:target="_blank"}
