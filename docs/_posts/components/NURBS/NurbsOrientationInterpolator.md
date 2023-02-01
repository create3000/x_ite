---
title: NurbsOrientationInterpolator
date: 2022-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsOrientationInterpolator, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsOrientationInterpolator describes a 3D NURBS curve and outputs interpolated orientation values.

The NurbsOrientationInterpolator node belongs to the **NURBS** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + NurbsOrientationInterpolator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

Setting fraction in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>

Input/Output field controlPoint.

### MFDouble [in, out] **knot** [ ] <small>(-∞,∞)</small>

Knot vector, where size = number of control points + order of curve.

### SFInt32 [in, out] **order** 3 <small>(2,∞)</small>

Define order of surface by polynomials of degree = order-1.

### MFDouble [in, out] **weight** [ ] <small>(-∞,∞)</small>

Output values for linear interpolation, each corresponding to knots.

#### Hint

- Number of weights must match number of knots!

### SFRotation [out] **value_changed**

Linearly interpolated output value determined by current key time and corresponding keyValue pair.

## Description

### Hint

- The SFNode controlPoints field can contain a single Coordinate or CoordinateDouble node.

## External Links

- [X3D Specification of NurbsOrientationInterpolator](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsOrientationInterpolator){:target="_blank"}
