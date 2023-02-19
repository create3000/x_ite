---
title: ElevationGrid
date: 2022-01-07
nav: components-Geometry3D
categories: [components, Geometry3D]
tags: [ElevationGrid, Geometry3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ElevationGrid is a geometry node defining a rectangular height field, with default values for a 1m by 1m square at height 0. Vertices corresponding to ElevationGrid height values define quadrilaterals, which are placed above or below a flat surface.

The ElevationGrid node belongs to the **Geometry3D** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + ElevationGrid
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFFloat [in] **set_height** <small>(-∞,∞)</small>

Grid array of height vertices with upward direction along +Y axis, with xDimension rows and zDimension columns.

#### Hint

- Height array values are given in row-major order from left to right along X axis, then back to front along Z axis.

### SFInt32 [ ] **xDimension** <small>[0,∞)</small>

Number of elements in the height array along X direction.

### SFInt32 [ ] **zDimension** <small>[0,∞)</small>

Number of elements in the height array along Z direction.

### SFFloat [ ] **xSpacing** 1 <small>(0,∞)</small>

Meters distance between grid-array vertices along X direction.

#### Hint

- Total horizontal x-axis distance equals (xDimension-1) \* xSpacing.

### SFFloat [ ] **zSpacing** 1 <small>(0,∞)</small>

Meters distance between grid-array vertices along Z direction.

#### Hint

- Total lateral z-axis distance equals (zDimension-1) \* zSpacing.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* = counterclockwise: ordering of vertex coordinates orientation.

#### Hint

- *ccw* false can reverse solid (backface culling) and normal-vector orientation.

### SFFloat [ ] **creaseAngle** 0 <small>[0,∞)</small>

*creaseAngle* defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading. If angle between normals of two adjacent polygons is less than creaseAngle, smooth shading is rendered across the shared line segment.

#### Hint

- CreaseAngle=0 means render all edges sharply, creaseAngle=3.14159 means render all edges smoothly.

### SFBool [ ] **colorPerVertex** TRUE

Whether Color node color values are applied to each vertex (true) or per quadrilateral (false).

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFBool [ ] **normalPerVertex** TRUE

Whether Normal node vector values are applied to each vertex (true) or per quadrilateral (false).

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Multiple contained FloatVertexAttribute nodes that can specify list of per-vertex attribute information for programmable shaders.

#### Hint

- [X3D Architecture 32.2.2.4 Per-vertex attributes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/shaders.html#Pervertexattributes){:target="_blank"}

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Single contained FogCoordinate node that can specify depth parameters for fog in corresponding geometry.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Single contained Color or ColorRGBA node that can specify color values applied to corresponding vertices according to colorIndex and colorPerVertex fields.

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode]</small>

Single contained TextureCoordinate, TextureCoordinateGenerator or MultiTextureCoordinate node that can specify coordinates for texture mapping onto corresponding geometry.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Single contained Normal node that can specify perpendicular vectors for corresponding vertices to support rendering computations, applied according to the normalPerVertex field.

#### Hint

- Useful for special effects. Normal vector computation by 3D graphics hardware is quite fast so adding normals to a scene is typically unnecessary.

### MFFloat [ ] **height** [ ] <small>(-∞,∞)</small>

Grid array of height vertices with upward direction along +Y axis, with xDimension rows and zDimension columns.

#### Hint

- Height array values are given in row-major order from left to right along X axis, then back to front along Z axis.

## Description

### Hints

- The height array defines (xDimension-1)\*(zDimension-1) quadrilaterals.
- Positive direction for normal of each triangle is on same side of the quadrilateral. Triangles are defined either counterclockwise or clockwise depending on value of ccw field.
- ElevationGrid can contain Color/ColorRGBA, Normal and TextureCoordinate nodes.
- Insert a Shape node before adding geometry or Appearance.
- You can also substitute a type-matched ProtoInstance node for contained content.

### Warning

- Generated quadrilaterals can be nonplanar. Tessellation splits quadrilaterals into triangles along seam starting at initial vertex of the quadrilateral and proceeding to opposite vertex.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry3D/ElevationGrid/ElevationGrid.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ElevationGrid](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#ElevationGrid){:target="_blank"}
