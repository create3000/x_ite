---
title: NurbsOrientationInterpolator
date: 2023-01-07
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

The NurbsOrientationInterpolator node belongs to the **NURBS** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + NurbsOrientationInterpolator
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFFloat \[in\] [set_fraction](#sffloat-in-set_fraction--)
- SFInt32 \[in, out\] [order](#sfint32-in-out-order-3-2)
- MFDouble \[in, out\] [knot](#mfdouble-in-out-knot----)
- MFDouble \[in, out\] [weight](#mfdouble-in-out-weight----)
- SFNode \[in, out\] [controlPoint](#sfnode-in-out-controlpoint-null-x3dcoordinatenode)
- SFRotation \[out\] [value_changed](#sfrotation-out-value_changed)
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>

Setting *fraction* in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.

#### Hint

- *set_fraction* values are typically in same range interval as values in the key array. Response to an input *set_fraction* value less than minimum is equivalent to minimum key, and response to an input *set_fraction* value greater than maximum is equivalent to maximum key.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFInt32 [in, out] **order** 3 <small>(2,∞)</small>

Define *order* of surface by polynomials of degree = *order*-1.

### MFDouble [in, out] **knot** [ ] <small>(-∞,∞)</small>

*knot* vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(-∞,∞)</small>

Output values for computational interpolation, each corresponding to knots.

#### Hint

- Number of weights must match number of knots!

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify control points for NURBS geometry definitions.

### SFRotation [out] **value_changed**

Computationaly interpolated output value determined by current key time and corresponding keyValue pair.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- The SFNode controlPoint field can contain a single [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node.

## See Also

- [X3D Specification of NurbsOrientationInterpolator Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsOrientationInterpolator)
