---
title: Coordinate
date: 2023-01-07
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

Coordinate builds geometry by defining a set of 3D coordinate (triplet) point values. Coordinate is used by IndexedFaceSet, IndexedLineSet, LineSet, PointSet, Triangle* and IndexedTriangle* nodes. Coordinate is also used by HAnimHumanoid, HAnimSegment, and various Nurbs nodes.

The Coordinate node belongs to the **Rendering** component and its default container field is *coord.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DCoordinateNode
      + Coordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### MFVec3f [in, out] **point** [ ] <small>(-∞,∞)</small>

*point* contains a set of 3D coordinate (triplet) *point* values.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/Coordinate/Coordinate.x3d" update="auto"></x3d-canvas>

## See Also

- [X3D Specification of Coordinate node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#Coordinate){:target="_blank"}
