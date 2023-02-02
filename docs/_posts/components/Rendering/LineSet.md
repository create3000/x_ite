---
title: LineSet
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [LineSet, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LineSet is a geometry node that can contain a Coordinate\|CoordinateDouble node and an (optional) Color\|ColorRGBA node. Color values or a sibling Material emissiveColor is used to draw lines and points. Lines are not lit, are not texture-mapped, and do not participate in collision detection.

The LineSet node belongs to the **Rendering** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + LineSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFInt32 [in, out] **vertexCount** [ ] <small>[2,∞)</small>

Vertices at a time.

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

- Use a different color (or emissiveColor) than the background color. Linear interpolation of colors can be used as a good scientific visualization technique to map arbitrary function values to a color map.
- Insert a Shape node before adding geometry or Appearance.
- You can also substitute a type-matched ProtoInstance node for contained content.
- Consider including Fog to provide further depth cueing for LineSet (LS).

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/LineSet/LineSet.x3d"></x3d-canvas>

## External Links

- [X3D Specification of LineSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#LineSet){:target="_blank"}
