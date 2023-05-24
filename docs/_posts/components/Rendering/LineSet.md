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

LineSet is a geometry node that can contain a Coordinate/CoordinateDouble node and an (optional) Color/ColorRGBA node. Color values or a sibling Material emissiveColor is used to draw lines and points. Lines are not lit, are not texture-mapped, and do not participate in collision detection.

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

*vertexCount* describes how many vertices are used in each individual polyline segment from the Coordinate point values. Coordinate point values are assigned as a block of points to each line by taking vertexCount[n] vertices at a time.

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

#### Warning

- Normal vectors increase file size, typically doubling geometry definitions.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.

## Description

### Hints

- Use a different color (or emissiveColor) than the background color. Linear interpolation of colors can be used as a good scientific visualization technique to map arbitrary function values to a color map.
- Insert a Shape node before adding geometry or Appearance.
- You can also substitute a type-matched ProtoInstance node for contained content.
- Consider including Fog to provide further depth cueing for LineSet (LS).

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/LineSet/LineSet.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of LineSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#LineSet){:target="_blank"}
