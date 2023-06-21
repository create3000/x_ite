---
title: NurbsTextureCoordinate
date: 2022-01-07
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

The NurbsTextureCoordinate node belongs to the **NURBS** component and its default container field is *texCoord.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + NurbsTextureCoordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec2f [in, out] **controlPoint** [ ] <small>(-∞,∞)</small>

*controlPoint* defines a set of control points of dimension uDimension by vDimension, and defines a mesh where the points do not have uniform spacing.

### MFFloat [in, out] **weight** [ ] <small>(0,∞)</small>

Output values for linear interpolation, each corresponding to knots.

#### Hint

- Number of weights must match number of knots!

### SFInt32 [ ] **uDimension** 0 <small>[0,∞)</small>

Number of control points in u dimension.

### MFDouble [ ] **uKnot** [ ] <small>(-∞,∞)</small>

Knot vector, where size = number of control points + order of curve.

### SFInt32 [ ] **uOrder** 3 <small>[2,∞)</small>

Define order of surface by polynomials of degree = order-1.

### SFInt32 [ ] **vDimension** 0 <small>[0,∞)</small>

Number of control points in v dimension.

### MFDouble [ ] **vKnot** [ ] <small>(-∞,∞)</small>

Knot vector, where size = number of control points + order of curve.

### SFInt32 [ ] **vOrder** 3 <small>[2,∞)</small>

Define order of surface by polynomials of degree = order-1.

## Description

### Hint

- The SFNode controlPoints field can contain a single Coordinate or CoordinateDouble node.

## External Links

- [X3D Specification of NurbsTextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsTextureCoordinate){:target="_blank"}
