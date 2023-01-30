---
title: NurbsSwungSurface
date: 2022-01-07
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

NurbsSwungSurface contains a profileCurve [X3DNurbsControlCurveNode] and a trajectoryCurve [X3DNurbsControlCurveNode].

The NurbsSwungSurface node belongs to the **NURBS** component and its container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DParametricGeometryNode
      + NurbsSwungSurface
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

If in doubt, use solid='false' for maximum visibility.

#### Warning

Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

Ccw = counterclockwise: ordering of vertex coordinates orientation.

#### Hint

Ccw false can reverse solid (backface culling) and normal-vector orientation.

### SFNode [in, out] **profileCurve** NULL <small>[X3DNurbsControlCurveNode]</small>

Input/Output field profileCurve.

### SFNode [in, out] **trajectoryCurve** NULL <small>[X3DNurbsControlCurveNode]</small>

Input/Output field trajectoryCurve.

## External Links

- [X3D Specification of NurbsSwungSurface](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/nurbs.html#NurbsSwungSurface){:target="_blank"}
