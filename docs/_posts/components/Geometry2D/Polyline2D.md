---
title: Polyline2D
date: 2022-01-07
nav: components-Geometry2D
categories: [components, Geometry2D]
tags: [Polyline2D, Geometry2D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Polyline2D is a geometry node that defines a connected set of vertices in a contiguous set of line segments in X-Y plane.

The Polyline2D node belongs to the **Geometry2D** component and its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + Polyline2D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFVec2f [ ] **lineSegments** [ ] <small>(-∞,∞)</small>

Coordinates of vertices connected into contiguous Polyline2D.

#### Hint

- For size animation, modify the scale of a parent/ancestor Transform node instead.

#### Warning

- Simple-geometry dimensions are initializeOnly and cannot be changed after initial creation, avoiding the need for potentially expensive tessellation at run time.

## Advisories

### Hints

- Material emissiveColor in corresponding Appearance is used for rendering lines.
- Adding LineProperties to the corresponding Appearance node can modify the rendering style of these lines.
- [Insert a Shape node before adding geometry or Appearance. Examples: X3D Example Archives, X3D for Web Authors, Chapter 10 Geometry 2D](https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter10Geometry2D){:target="_blank"}

### Warnings

- Lines are not lit, are not texture-mapped, and do not participate in collision detection.
- Use a different Material emissiveColor than the Background color, otherwise geometry is invisible.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry2D/Polyline2D/Polyline2D.x3d" update="auto"></x3d-canvas>

## See Also

- [X3D Specification of Polyline2D node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry2D.html#Polyline2D){:target="_blank"}
