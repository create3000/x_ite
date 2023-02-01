---
title: IndexedQuadSet
date: 2022-01-07
nav: components-CADGeometry
categories: [components, CADGeometry]
tags: [IndexedQuadSet, CADGeometry]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IndexedQuadSet is a geometry node that defines quadrilaterals. IndexedQuadSet can contain Color/ColorRGBA, Coordinate/CoordinateDouble, Normal and TextureCoordinate nodes.

The IndexedQuadSet node belongs to the **CADGeometry** component and its default container field is *geometry.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DComposedGeometryNode
      + IndexedQuadSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFInt32 [in] **set_index** <small>[0,∞)</small>

Index values provide order in which coordinates are applied. Order starts at index 0, commas are optional between sets. Four unique indices are defined for each quadrilateral.

#### Warning

- -1 sentinel values are not allowed.

#### Warning

- -1 sentinel values are not allowed.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

- If in doubt, use solid='false' for maximum visibility.

#### Warning

- Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

*ccw* = counterclockwise: ordering of vertex coordinates orientation.

#### Hint

- Ccw false can reverse solid (backface culling) and normal-vector orientation.

### SFBool [ ] **colorPerVertex** TRUE

Whether Color node color values are applied to each vertex (true) or to each polygon face (false).

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFBool [ ] **normalPerVertex** TRUE

Whether Normal node vector values are applied to each vertex (true) or to each polygon face (false).

### MFInt32 [ ] **index** [ ] <small>[0,∞)</small>

*index* values provide order in which coordinates are applied. Order starts at index 0, commas are optional between sets. Four unique indices are defined for each quad. Four unique indices are defined for each quad.

#### Warning

- -1 sentinel values are not allowed.

### MFNode [in, out] **attrib** [ ] <small>[X3DVertexAttributeNode]</small>

Input/Output field attrib.

### SFNode [in, out] **fogCoord** NULL <small>[FogCoordinate]</small>

Input/Output field fogCoord.

### SFNode [in, out] **color** NULL <small>[X3DColorNode]</small>

Input/Output field color.

### SFNode [in, out] **texCoord** NULL <small>[X3DTextureCoordinateNode]</small>

Input/Output field texCoord.

### SFNode [in, out] **normal** NULL <small>[X3DNormalNode]</small>

Input/Output field normal.

### SFNode [in, out] **coord** NULL <small>[X3DCoordinateNode]</small>

Input/Output field coord.

## Description

### Hints

- Insert a Shape node before adding geometry or Appearance.
- You can also substitute a type-matched ProtoInstance node for contained content.
- Include `<component name='CADGeometry' level='1'/>`

## External Links

- [X3D Specification of IndexedQuadSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/CADGeometry.html#IndexedQuadSet){:target="_blank"}
