---
title: IndexedTriangleSet
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [IndexedTriangleSet, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

IndexedTriangleSet is a geometry node that can contain a Color/ColorRGBA, Coordinate/CoordinateDouble, Normal and TextureCoordinate nodes.

The IndexedTriangleSet node belongs to the **Rendering** component and its container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DComposedGeometryNode
      + IndexedTriangleSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFInt32 [in] **set_index** <small>[0,∞)</small>

Index list specifies triangles by connecting Coordinate vertices.

#### Warning

-1 sentinel values are not allowed.

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

### SFBool [ ] **colorPerVertex** TRUE

Whether Color node color values are applied to each vertex (true) or to each polygon face (false).

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFBool [ ] **normalPerVertex** TRUE

Whether Normal node vector values are applied to each vertex (true) or to each polygon face (false).

### MFInt32 [ ] **index** [ ] <small>[0,∞)</small>

Index list specifies triangles by connecting Coordinate vertices.

#### Warning

-1 sentinel values are not allowed.

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

<x3d-canvas src="https://create3000.github.io/media/examples/Rendering/IndexedTriangleSet/IndexedTriangleSet.x3d"></x3d-canvas>[/c3-source-example]

## External Links

- [X3D Specification of IndexedTriangleSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#IndexedTriangleSet){:target="_blank"}
