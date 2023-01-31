---
title: IndexedFaceSet
date: 2022-01-07
nav: components-Geometry3D
categories: [components, Geometry3D]
tags: [IndexedFaceSet, Geometry3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IndexedFaceSet is a geometry node that can contain a Color/ColorRGBA, Coordinate/CoordinateDouble, Normal and TextureCoordinate nodes.

The IndexedFaceSet node belongs to the **Geometry3D** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DComposedGeometryNode
      + IndexedFaceSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFInt32 [in] **set_colorIndex** <small>[0,∞) or -1</small>

ColorIndex indices provide order in which colors are applied.

#### Hints

If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included. If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.

### MFInt32 [in] **set_texCoordIndex** <small>[-1,∞)</small>

List of texture-coordinate indices mapping attached texture to corresponding coordinates.

#### Hint

Use a tool!

### MFInt32 [in] **set_normalIndex** <small>[0,∞) or -1</small>

NormalIndex indices define the order in which normal vectors are applied.

#### Hints

If normalPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included. If normalPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions. Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFInt32 [in] **set_coordIndex** <small>[0,∞) or -1</small>

CoordIndex indices provide the order in which coordinates are applied to construct each polygon face. Order starts at index 0, commas are optional between sets.

#### Hint

Sentinel value -1 is used to separate indices for each successive polygon.

### SFBool [ ] **solid** TRUE

Setting solid true means draw only one side of polygons (backface culling on), setting solid false means draw both sides of polygons (backface culling off).

#### Hint

If in doubt, use solid='false' for maximum visibility.

#### Warning

Default value true can completely hide geometry if viewed from wrong side!

### SFBool [ ] **ccw** TRUE

Ccw = counterclockwise: ordering of vertex coordinates orientation.

#### Hint

Ccw false can reverse solid (backface culling) and normal-vector orientation.

### SFBool [ ] **convex** TRUE

Whether all polygons in a shape are convex (true), or possibly concave (false) A convex polygon is planar, does not intersect itself, and has all interior angles \< 180 degrees. Interchange profile hint: only convex=true IndexedFaceSets are supported.

#### Warning

Concave geometry may be invisible default convex=true.

### SFFloat [ ] **creaseAngle** <small>[0,∞)</small>

CreaseAngle defines angle (in radians) for determining whether adjacent polygons are drawn with sharp edges or smooth shading. If angle between normals of two adjacent polygons is less than creaseAngle, smooth shading is rendered across the shared line segment. Interchange profile hint: only 0 and π radians supported.

#### Hint

CreaseAngle=0 means render all edges sharply, creaseAngle=3.14159 means render all edges smoothly.

### SFBool [ ] **colorPerVertex** TRUE

Whether Color node color values are applied to each vertex (true) or to each polygon face (false).

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFBool [ ] **normalPerVertex** TRUE

Whether Normal node vector values are applied to each vertex (true) or to each polygon face (false).

### MFInt32 [ ] **colorIndex** [ ] <small>[0,∞) or -1</small>

ColorIndex indices provide order in which colors are applied.

#### Hints

If colorPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included. If colorPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions.

### MFInt32 [ ] **texCoordIndex** [ ] <small>[-1,∞)</small>

List of texture-coordinate indices mapping attached texture to corresponding coordinates.

#### Hint

Use a tool!

### MFInt32 [ ] **normalIndex** [ ] <small>[0,∞) or -1</small>

NormalIndex indices define the order in which normal vectors are applied.

#### Hints

If normalPerVertex='false' then one index is provided for each polygon defined by the coordIndex array. No sentinel -1 values are included. If normalPerVertex='true' then a matching set of indices is provided, each separated by sentinel -1, that exactly corresponds to individual values in the coordIndex array polygon definitions. Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFInt32 [ ] **coordIndex** [ ] <small>[0,∞) or -1</small>

CoordIndex indices provide the order in which coordinates are applied to construct each polygon face. Order starts at index 0, commas are optional between sets.

#### Hint

Sentinel value -1 is used to separate indices for each successive polygon.

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

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Geometry3D/IndexedFaceSet/IndexedFaceSet.x3d"></x3d-canvas>

## External Links

- [X3D Specification of IndexedFaceSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/geometry3D.html#IndexedFaceSet){:target="_blank"}
