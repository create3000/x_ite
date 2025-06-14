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

The NurbsCurve node belongs to the [NURBS](/x_ite/components/overview/#nurbs) component and requires at least support level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsCurve
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFInt32 | [in, out] | [tessellation](#fields-tessellation) | 0  |
| SFBool | [ ] | [closed](#fields-closed) | FALSE |
| SFInt32 | [ ] | [order](#fields-order) | 3  |
| MFDouble | [ ] | [knot](#fields-knot) | [ ] |
| MFDouble | [in, out] | [weight](#fields-weight) | [ ] |
| SFNode | [in, out] | [controlPoint](#fields-controlPoint) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFInt32 [in, out] **tessellation** 0 <small>(-∞,∞)</small>
{: #fields-tessellation }

Hint for surface *tessellation*.

### SFBool [ ] **closed** FALSE
{: #fields-closed }

Whether or not the curve is *closed* (i.e. matching end values).

### SFInt32 [ ] **order** 3 <small>[2,∞)</small>
{: #fields-order }

Define *order* of surface by polynomials of degree = *order*-1.

### MFDouble [ ] **knot** [ ] <small>(-∞,∞)</small>
{: #fields-knot }

*knot* vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(0,∞)</small>
{: #fields-weight }

Vector assigning relative *weight* value to each control point.

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>
{: #fields-controlPoint }

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify control points for NURBS geometry definitions.

## Advice

### Hint

- The contained controlPoint field can hold a [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/NURBS/NurbsCurve/screenshot.avif" alt="NurbsCurve"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/NURBS/NurbsCurve/NurbsCurve.x3d)
{: .example-links }

## See Also

- [X3D Specification of NurbsCurve Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsCurve)
