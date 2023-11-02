---
title: NurbsSweptSurface
date: 2023-01-07
nav: components-NURBS
categories: [components, NURBS]
tags: [NurbsSweptSurface, NURBS]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

NurbsSweptSurface uses a trajectoryCurve path to describe a generalized surface that is swept by a crossSectionCurve.

The NurbsSweptSurface node belongs to the **NURBS** component level **3** and its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsSweptSurface
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [ ] **solid** TRUE

Setting *solid* true means draw only one side of polygons (backface culling on), setting *solid* false means draw both sides of polygons (backface culling off).

#### Hints

- Mnemonic "this geometry is *solid* like a brick" (you don't render the inside of a brick).
- If in doubt, use *solid*='false' for maximum visibility.
- (X3D version 4.0 ISO.proof draft) accessType relaxed to inputOutput in order to support animation and visualization.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* defines clockwise/counterclockwise ordering of vertex coordinates, which in turn defines front/back orientation of polygon normals according to Right-Hand Rule (RHR).

#### Hints

- A good debugging technique for problematic polygons is to try changing the value of *ccw*, which can reverse solid effects (single-sided backface culling) and normal-vector direction.
- [Clockwise](https://en.wikipedia.org/wiki/Clockwise){:target="_blank"}

#### Warning

- Consistent and correct ordering of left-handed or right-handed point sequences is important throughout the coord array of point values.

### SFNode [in, out] **crossSectionCurve** NULL <small>[X3DNurbsControlCurveNode]</small>

Defines cross-section of the surface traced about the trajectoryCurve axis.

### SFNode [in, out] **trajectoryCurve** NULL <small>[NurbsCurve]</small>

Describes the center-line path using a NurbsCurve node, oriented so that it is defined counterclockwise when looking down the −Y axis, thus defining a concept of inside and outside.

## Advice

### Hint

- Conceptually it is the NURBS equivalent of Extrusion but permits the use of non-closed cross sections.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/NURBS/NurbsSweptSurface/NurbsSweptSurface.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/NURBS/NurbsSweptSurface/NurbsSweptSurface.x3d)

## See Also

- [X3D Specification of NurbsSweptSurface node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsSweptSurface){:target="_blank"}
