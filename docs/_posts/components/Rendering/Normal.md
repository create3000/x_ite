---
title: Normal
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [Normal, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Normal defines a set of 3D surface-normal vectors that apply either to a sibling Coordinate/CoordinateDouble node, or else to a parent ElevationGrid node. Normal values are perpendicular directions that are used per-polygon or per-vertex when computing lighting and shading.

The Normal node belongs to the **Rendering** component and its container field is *normal.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DNormalNode
      + Normal
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec3f [in, out] **vector** [ ] <small>[-1,1]</small>

Set of unit-length normal vectors, corresponding to indexed polygons or vertices.

## External Links

- [X3D Specification of Normal](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Normal){:target="_blank"}
