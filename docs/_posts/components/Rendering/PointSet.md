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

The PointSet node belongs to the **Rendering** component and its default container field is *geometry.* It is available since X3D version 2.0 or later.

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

Multiple contained FloatVertexAttribute nodes that can specify list of per-vertex attribute information for programmable shaders.

#### Hint

- [X3D Architecture 32.2.2.4 Per-vertex attributes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shaders.html#Pervertexattributes){:target="_blank"}

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. Normal vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.

## Description

### Hints

- Use a different color (or emissiveColor) than the background color.
- Insert a Shape node before adding geometry or Appearance.
- Each point is displayed independently, no other PointSet attributes for rendering are provided.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/PointSet/PointSet.x3d"></x3d-canvas>

## External Links

- [X3D Specification of PointSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#PointSet){:target="_blank"}
