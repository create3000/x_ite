---
title: NurbsCurve
date: 2023-01-07
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

The NurbsCurve node belongs to the **NURBS** component and requires at least level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsCurve
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/core.html#Metadata){:target="_blank"}

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

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify control points for NURBS geometry definitions.

## Advice

### Hint

- The contained controlPoint field can hold a [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.x3d)
{: .example-links }

## See Also

- [X3D Specification of NurbsCurve Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsCurve){:target="_blank"}
