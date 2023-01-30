---
title: PointSet
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [PointSet, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PointSet is a node that contains a set of colored 3D points, represented by contained Color/ColorRGBA and Coordinate/CoordinateDouble nodes. Color values or a sibling Material emissiveColor is used to draw lines and points.

The PointSet node belongs to the **Rendering** component and its container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + PointSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Input/Output field attrib.

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Input/Output field fogCoord.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Input/Output field color.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Input/Output field coord.

## Description

### Hints

- Use a different color (or emissiveColor) than the background color.
- Insert a Shape node before adding geometry or Appearance.
- Each point is displayed independently, no other PointSet attributes for rendering are provided.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/PointSet/PointSet.x3d"></x3d-canvas>

## External Links

- [X3D Specification of PointSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#PointSet){:target="_blank"}
