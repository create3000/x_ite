---
title: NurbsSwungSurface
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsSwungSurface, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsSwungSurface contains a profileCurve and a trajectoryCurve [X3DNurbsControlCurveNode].

The NurbsSwungSurface node belongs to the **NURBS** component and requires at least support level **3,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsSwungSurface
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | \[in, out\] | [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject) | NULL  |
| SFBool | \[ \] | [solid](#sfbool---solid-true) | TRUE |
| SFBool | \[ \] | [ccw](#sfbool---ccw-true) | TRUE |
| SFNode | \[in, out\] | [profileCurve](#sfnode-in-out-profilecurve-null-x3dnurbscontrolcurvenode) | NULL  |
| SFNode | \[in, out\] | [trajectoryCurve](#sfnode-in-out-trajectorycurve-null-x3dnurbscontrolcurvenode) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [ ] **solid** TRUE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- AccessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).

#### Hints

- A good debugging technique for problematic polygons is to try changing the value of *ccw*, which can reverse solid effects (single-sided backface culling) and normal-vector direction.
- [Clockwise](https://en.wikipedia.org/wiki/Clockwise)

#### Warning

- Consistent and correct ordering of left-handed or right-handed point sequences is important throughout the coord array of point values.

### SFNode [in, out] **profileCurve** NULL <small>[X3DNurbsControlCurveNode]</small>

2D curve in the yz-plane that describes the cross-sectional shape of the object.

### SFNode [in, out] **trajectoryCurve** NULL <small>[X3DNurbsControlCurveNode]</small>

2D curve in the xz-plane that describes path over which to trace the cross-section.

## See Also

- [X3D Specification of NurbsSwungSurface Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsSwungSurface)
