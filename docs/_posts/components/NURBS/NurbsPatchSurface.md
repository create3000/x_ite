---
title: NurbsPatchSurface
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsPatchSurface, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsPatchSurface defines a contiguous 3D Non-Uniform Rational B-Spline (NURBS) surface.

The NurbsPatchSurface node belongs to the **NURBS** component and requires at least support level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + X3DNurbsSurfaceGeometryNode
        + NurbsPatchSurface
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFInt32 | [in, out] | [uTessellation](#fields-uTessellation) | 0  |
| SFInt32 | [in, out] | [vTessellation](#fields-vTessellation) | 0  |
| SFBool | [ ] | [solid](#fields-solid) | TRUE |
| SFBool | [ ] | [uClosed](#fields-uClosed) | FALSE |
| SFBool | [ ] | [vClosed](#fields-vClosed) | FALSE |
| SFInt32 | [ ] | [uOrder](#fields-uOrder) | 3  |
| SFInt32 | [ ] | [vOrder](#fields-vOrder) | 3  |
| SFInt32 | [ ] | [uDimension](#fields-uDimension) | 0  |
| SFInt32 | [ ] | [vDimension](#fields-vDimension) | 0  |
| MFDouble | [ ] | [uKnot](#fields-uKnot) | [ ] |
| MFDouble | [ ] | [vKnot](#fields-vKnot) | [ ] |
| MFDouble | [in, out] | [weight](#fields-weight) | [ ] |
| SFNode | [in, out] | [texCoord](#fields-texCoord) | NULL  |
| SFNode | [in, out] | [controlPoint](#fields-controlPoint) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFInt32 [in, out] **uTessellation** 0 <small>(-∞,∞)</small>
{: #fields-uTessellation }

Hint for surface tessellation.

### SFInt32 [in, out] **vTessellation** 0 <small>(-∞,∞)</small>
{: #fields-vTessellation }

Hint for surface tessellation.

### SFBool [ ] **solid** TRUE
{: #fields-solid }

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **uClosed** FALSE
{: #fields-uClosed }

Whether opposite surface sides are closed (seamless) across u dimension.

### SFBool [ ] **vClosed** FALSE
{: #fields-vClosed }

Whether opposite surface sides are closed (seamless) across u dimension.

### SFInt32 [ ] **uOrder** 3 <small>[2,∞)</small>
{: #fields-uOrder }

Define order of surface by polynomials of degree = order-1.

### SFInt32 [ ] **vOrder** 3 <small>[2,∞)</small>
{: #fields-vOrder }

Define order of surface by polynomials of degree = order-1.

### SFInt32 [ ] **uDimension** 0 <small>[0,∞)</small>
{: #fields-uDimension }

Number of control points in u dimension.

### SFInt32 [ ] **vDimension** 0 <small>[0,∞)</small>
{: #fields-vDimension }

Number of control points in v dimension.

### MFDouble [ ] **uKnot** [ ] <small>(-∞,∞)</small>
{: #fields-uKnot }

Knot vector, where size = number of control points + order of curve.

### MFDouble [ ] **vKnot** [ ] <small>(-∞,∞)</small>
{: #fields-vKnot }

Knot vector, where size = number of control points + order of curve.

### MFDouble [in, out] **weight** [ ] <small>(0,∞)</small>
{: #fields-weight }

Vector assigning relative *weight* value to each control point.

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode|NurbsTextureCoordinate]</small>
{: #fields-texCoord }

Single contained [NurbsTextureCoordinate](/x_ite/components/nurbs/nurbstexturecoordinate/), [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/), [TextureCoordinateGenerator](/x_ite/components/texturing/texturecoordinategenerator/) or [MultiTextureCoordinate](/x_ite/components/texturing/multitexturecoordinate/) node that can specify coordinates for texture mapping onto corresponding geometry.

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>
{: #fields-controlPoint }

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify control points for NURBS geometry definitions.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/NURBS/NurbsPatchSurface/NurbsPatchSurface.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/NURBS/NurbsPatchSurface/screenshot.avif" alt="NurbsPatchSurface"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/NURBS/NurbsPatchSurface/NurbsPatchSurface.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/NURBS/NurbsPatchSurface/NurbsPatchSurface.x3d)
{: .example-links }

## See Also

- [X3D Specification of NurbsPatchSurface Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsPatchSurface)
