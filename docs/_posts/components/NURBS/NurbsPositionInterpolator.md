---
title: NurbsPositionInterpolator
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsPositionInterpolator, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsPositionInterpolator describes a 3D NURBS curve and outputs interpolated position values.

The NurbsPositionInterpolator node belongs to the [NURBS](/x_ite/components/overview/#nurbs) component and requires at least support level **1,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + NurbsPositionInterpolator
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [in] | [set_fraction](#fields-set_fraction) |  |
| SFInt32 | [in, out] | [order](#fields-order) | 3  |
| MFDouble | [in, out] | [knot](#fields-knot) | [ ] |
| MFDouble | [in, out] | [weight](#fields-weight) | [ ] |
| SFNode | [in, out] | [controlPoint](#fields-controlPoint) | NULL  |
| SFVec3f | [out] | [value_changed](#fields-value_changed) |  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in] **set_fraction** <small>(-∞,∞)</small>
{: #fields-set_fraction }

Setting *fraction* in range [0,1] selects input key for corresponding keyValue output, computing a 3D position on the curve.

#### Hint

- *set_fraction* values are typically in same range interval as values in the key array. Response to an input *set_fraction* value less than minimum is equivalent to minimum key, and response to an input *set_fraction* value greater than maximum is equivalent to maximum key.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### SFInt32 [in, out] **order** 3 <small>(2,∞)</small>
{: #fields-order }

Define *order* of surface by polynomials of degree = *order*-1.

### MFDouble [in, out] **knot** [ ] <small>(-∞,∞)</small>
{: #fields-knot }

*knot* vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(-∞,∞)</small>
{: #fields-weight }

Output values for linear interpolation, each corresponding to knots.

#### Hint

- Number of weights must match number of knots!

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>
{: #fields-controlPoint }

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify control points for NURBS geometry definitions.

### SFVec3f [out] **value_changed**
{: #fields-value_changed }

Computationaly interpolated output value determined by current key time and corresponding keyValue pair.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hint

- The SFNode controlPoint field can contain a single [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node.

## See Also

- [X3D Specification of NurbsPositionInterpolator Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsPositionInterpolator)
