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

PointSet is a node that contains a set of colored 3D points, represented by contained Color or ColorRGBA and Coordinate or CoordinateDouble nodes.

The PointSet node belongs to the **Rendering** component and its default container field is *geometry.* It is available from X3D version 2.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + PointSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Single contained FloatVertexAttribute node that can specify list of per-vertex attribute information for programmable shaders.

#### Hint

- [X3D Architecture 32.2.2.4 Per-vertex attributes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shaders.html#Pervertexattributes){:target="_blank"}

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained Color or ColorRGBA node that can specify *color* values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations.

#### Hint

- Useful for special effects. Normal vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

#### Warning

- *normal* vectors increase file size, typically doubling geometry definitions.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Single contained Coordinate or CoordinateDouble node that can specify a list of vertex values.

## Advisories

### Hints

- [Point (geometry)](https://en.wikipedia.org/wiki/Point_(geometry)){:target="_blank"}
- Either values in a contained Color node, or else Material emissiveColor in corresponding Appearance node, are used for rendering lines and points.
- Insert a Shape node before adding geometry or Appearance.
- Each point is displayed independently, no other PointSet attributes for rendering are provided.

### Warning

- Use a different color (or Material emissiveColor) than the Background color, otherwise geometry is invisible.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/PointSet/PointSet.x3d" update="auto"></x3d-canvas>

## See Also

- [X3D Specification of PointSet node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#PointSet){:target="_blank"}
