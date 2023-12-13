---
title: LineSet
date: 2023-01-07
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

LineSet is a geometry node that can contain a Coordinate or CoordinateDouble node and optionally a Color or ColorRGBA node.

The LineSet node belongs to the **Rendering** component and requires at least level **1,** its default container field is *geometry.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + LineSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](../core/metadataboolean), [MetadataDouble](../core/metadatadouble), [MetadataFloat](../core/metadatafloat), [MetadataInteger](../core/metadatainteger), [MetadataString](../core/metadatastring) or [MetadataSet](../core/metadataset) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### MFInt32 [in, out] **vertexCount** [ ] <small>[2,∞)</small>

Vertices at a time.

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Single contained [FloatVertexAttribute](../shaders/floatvertexattribute) node that can specify list of per-vertex attribute information for programmable shaders.

#### Hint

- [X3D Architecture 32.2.2.4 Per-vertex attributes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/shaders.html#Pervertexattributes){:target="_blank"}

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Single contained [FogCoordinate](../environmentaleffects/fogcoordinate) node that can specify depth parameters for fog in corresponding geometry.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained [Color](../rendering/color) or [ColorRGBA](../rendering/colorrgba) node that can specify *color* values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained [Normal](../rendering/normal) node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. [Normal](../rendering/normal) vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

#### Warning

- *normal* vectors increase file size, typically doubling geometry definitions.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Single contained [Coordinate](../rendering/coordinate) or [CoordinateDouble](../rendering/coordinatedouble) node that can specify a list of vertex values.

## Advice

### Hints

- [Polygonal chain](https://en.wikipedia.org/wiki/Polygonal_chain){:target="_blank"}
- Either values in a contained [Color](../rendering/color) node, or else [Material](../shape/material) emissiveColor in corresponding [Appearance](../shape/appearance) node, are used for rendering lines and points.
- Adding [LineProperties](../shape/lineproperties) to the corresponding [Appearance](../shape/appearance) node can modify the rendering style of these lines.
- Step-wise variation or linear interpolation of color values can be used as a good scientific visualization technique to map arbitrary function values to a color map.
- Insert a [Shape](../shape/shape) node before adding geometry or [Appearance](../shape/appearance).
- For advanced extensibility, authors can substitute a type-matched ProtoInstance node (with correct containerField value) for contained node content.
- Consider including [Fog](../environmentaleffects/fog) (with [Fog](../environmentaleffects/fog) color matching [Background](../environmentaleffects/background) color) to provide further depth cueing for LineSet (LS).

### Warnings

- Lines are not lit, are not texture-mapped, and do not participate in collision detection.
- Use a different color (or [Material](../shape/material) emissiveColor) than the [Background](../environmentaleffects/background) color, otherwise geometry is invisible.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/LineSet/LineSet.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Rendering/LineSet/LineSet.x3d)

## See Also

- [X3D Specification of LineSet node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#LineSet){:target="_blank"}
