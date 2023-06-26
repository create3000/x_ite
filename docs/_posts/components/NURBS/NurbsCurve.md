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

The NurbsCurve node belongs to the **NURBS** component and its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsCurve
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFInt32 [in, out] **tessellation** 0 <small>(-∞,∞)</small>

Hint for surface *tessellation*.

### SFBool [ ] **closed** FALSE

Whether or not the curve is *closed* (i.e. matching end values).

### SFInt32 [ ] **order** 3 <small>[2,∞)</small>

Define *order* of surface by polynomials of degree = *order*-1.

### MFDouble [ ] **knot** [ ] <small>(-∞,∞)</small>

*knot* vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(0,∞)</small>

Vector assigning relative *weight* value to each control point.

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>

Single contained Coordinate or CoordinateDouble node that can specify control points for NURBS geometry definitions.

## Information

### Hint

- The contained controlPoint field can hold a Coordinate or CoordinateDouble node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.x3d" update="auto"></x3d-canvas>

## See Also

- [X3D Specification of NurbsCurve](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsCurve){:target="_blank"}
