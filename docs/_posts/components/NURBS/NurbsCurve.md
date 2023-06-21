---
title: NurbsCurve
date: 2022-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsCurve, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsCurve is a 3D curve analogous to NurbsPatchSurface.

The NurbsCurve node belongs to the **NURBS** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsCurve
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

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>

Input/Output field controlPoint.

## Description

### Hint

- The contained controlPoint field can hold a Coordinate or CoordinateDouble node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of NurbsCurve](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsCurve){:target="_blank"}
