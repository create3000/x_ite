---
title: NurbsSweptSurface
date: 2022-01-07
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

NurbsSweptSurface contains a crossSectionCurve [X3DNurbsControlCurveNode] and a trajectoryCurve [NurbsCurve].

The NurbsSweptSurface node belongs to the **NURBS** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsSweptSurface
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* = counterclockwise: ordering of vertex coordinates orientation.

#### Hint

- *ccw* false can reverse solid (backface culling) and normal-vector orientation.

### SFNode [in, out] **crossSectionCurve** NULL <small>[X3DNurbsControlCurveNode]</small>

Input/Output field crossSectionCurve.

### SFNode [in, out] **trajectoryCurve** NULL <small>[NurbsCurve]</small>

Input/Output field trajectoryCurve.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/NURBS/NurbsSweptSurface/NurbsSweptSurface.x3d"></x3d-canvas>

## External Links

- [X3D Specification of NurbsSweptSurface](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsSweptSurface){:target="_blank"}
