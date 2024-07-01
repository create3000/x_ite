---
title: NurbsTrimmedSurface
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsTrimmedSurface, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsTrimmedSurface generates texture coordinates from a Non-Uniform Rational B-Spline (NURBS) surface.

The NurbsTrimmedSurface node belongs to the **NURBS** component and requires at least level **4,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + X3DNurbsSurfaceGeometryNode
        + NurbsTrimmedSurface
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS){:target="_blank"} /Part01/components/core.html#Metadata

### SFInt32 [in, out] **uTessellation** 0 <small>(-∞,∞)</small>

Hint for surface tessellation.

### SFInt32 [in, out] **vTessellation** 0 <small>(-∞,∞)</small>

Hint for surface tessellation.

### SFBool [ ] **solid** TRUE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **uClosed** FALSE

Whether opposite surface sides are closed (seamless) across u dimension.

### SFBool [ ] **vClosed** FALSE

Whether opposite surface sides are closed (seamless) across u dimension.

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

### MFDouble [in, out] **weight** [ ] <small>(0,∞)</small>

Vector assigning relative *weight* value to each control point.

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode|NurbsTextureCoordinate]</small>

Single contained [NurbsTextureCoordinate](/x_ite/components/nurbs/nurbstexturecoordinate/), [TextureCoordinate](/x_ite/components/texturing/texturecoordinate/), [TextureCoordinateGenerator](/x_ite/components/texturing/texturecoordinategenerator/) or [MultiTextureCoordinate](/x_ite/components/texturing/multitexturecoordinate/) node that can specify coordinates for texture mapping onto corresponding geometry.

### SFNode [in, out] **controlPoint** NULL <small>[X3DCoordinateNode]</small>

Single contained [Coordinate](/x_ite/components/rendering/coordinate/) or [CoordinateDouble](/x_ite/components/rendering/coordinatedouble/) node that can specify control points for NURBS geometry definitions.

### MFNode [in] **addTrimmingContour** <small class="red">not supported</small>

Input field *addTrimmingContour*.

### MFNode [in] **removeTrimmingContour** <small class="red">not supported</small>

Input field *removeTrimmingContour*.

### MFNode [in, out] **trimmingContour** [ ] <small>[Contour2D]</small> <small class="red">not supported</small>

A set of [Contour2D](/x_ite/components/nurbs/contour2d/) nodes are used as trimming loops.

#### Hint

- If no trimming contours are defined, NurbsTrimmedSurface has same semantics as [NurbsPatchSurface](/x_ite/components/nurbs/nurbspatchsurface/) node.

## See Also

- [X3D Specification of NurbsTrimmedSurface Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsTrimmedSurface){:target="_blank"}
