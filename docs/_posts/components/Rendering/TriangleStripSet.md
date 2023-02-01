---
title: TriangleStripSet
date: 2022-01-07
nav: components-Rendering
categories: [components, Rendering]
tags: [TriangleStripSet, Rendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TriangleStripSet is a geometry node that can contain a Color/ColorRGBA, Coordinate/CoordinateDouble, Normal and TextureCoordinate nodes.

The TriangleStripSet node belongs to the **Rendering** component and its default container field is *geometry.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometryNode
    + X3DComposedGeometryNode
      + TriangleStripSet
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

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

### MFInt32 [in, out] **stripCount** [ ] <small>[3,∞)</small>

*stripCount* array provides number of vertices in each strip.

#### Warning

- Do not exceed number of points in contained Coordinate/CoordinateDouble node.

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

## External Links

- [X3D Specification of TriangleStripSet](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/rendering.html#TriangleStripSet){:target="_blank"}
