---
title: Coordinate
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [Coordinate, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Coordinate builds geometry by defining a set of 3D coordinate triplet values. Coordinate is used by IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle\* and IndexedTriangle\* nodes. Coordinate is also used by HAnimHumanoid, HAnimSegment, and various Nurbs nodes.

The Coordinate node belongs to the **Rendering** component and its default container field is *coord.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + Coordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec3f [in, out] **point** [ ] <small>(-∞,∞)</small>

*point* contains a set of 3D coordinate triplet values.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/Coordinate/Coordinate.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of Coordinate](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Coordinate){:target="_blank"}
