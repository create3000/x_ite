---
title: NurbsSurfaceInterpolator
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsSurfaceInterpolator, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsSurfaceInterpolator describes a 3D NURBS curve and outputs interpolated position and normal values.

The NurbsSurfaceInterpolator node belongs to the **NURBS** component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + NurbsSurfaceInterpolator
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFVec2f | \[in\] | [set_fraction](#sfvec2f-in-set_fraction--) |  |
| SFInt32 | \[ \] | [uOrder](#sfint32---uorder-3-2) | 3  |
| SFInt32 | \[ \] | [vOrder](#sfint32---vorder-3-2) | 3  |
| SFInt32 | \[ \] | [uDimension](#sfint32---udimension-0-0) | 0  |
| SFInt32 | \[ \] | [vDimension](#sfint32---vdimension-0-0) | 0  |
| MFDouble | \[ \] | [uKnot](#mfdouble---uknot----) | \[ \] |
| MFDouble | \[ \] | [vKnot](#mfdouble---vknot----) | \[ \] |
| MFDouble | \[in, out\] | [weight](#mfdouble-in-out-weight----) | \[ \] |
| SFNode | \[in, out\] | [controlPoint](#sfnode-in-out-controlpoint-null-x3dcoordinatenode) | NULL  |
| SFVec3f | \[out\] | [normal_changed](#sfvec3f-out-normal_changed) |  |
| SFVec3f | \[out\] | [position_changed](#sfvec3f-out-position_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFVec2f [in] **set_fraction** <small>(-∞,∞)</small>

Setting *fraction* in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.

#### Hint

- *set_fraction* values are typically in same range interval as values in the key array. Response to an input *set_fraction* value less than minimum is equivalent to minimum key, and response to an input *set_fraction* value greater than maximum is equivalent to maximum key.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

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

### MFDouble [in, out] **weight** [ ] <small>(-∞,∞)</small>

Output values for linear interpolation, each corresponding to knots.

#### Hint

- Number of weights must match number of knots!

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify control points for NURBS geometry definitions.

### SFVec3f [out] **normal_changed**

Computationaly interpolated output value determined by current key time and corresponding keyValue pair.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFVec3f [out] **position_changed**

Computationaly interpolated output value determined by current key time and corresponding keyValue pair.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- The SFNode controlPoint field can contain a single [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node.

## See Also

- [X3D Specification of NurbsSurfaceInterpolator Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsSurfaceInterpolator)
