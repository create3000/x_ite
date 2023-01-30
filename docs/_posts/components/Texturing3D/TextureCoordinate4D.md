---
title: TextureCoordinate4D
date: 2022-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [TextureCoordinate4D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureCoordinate4D specifies a set of 4D (homogeneous 3D) texture coordinates used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map 3D textures to vertices.

The TextureCoordinate4D node belongs to the **Texturing3D** component and its container field is *texCoord.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTextureCoordinateNode
      + TextureCoordinate4D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec4f [in, out] **point** [ ] <small>(-∞,∞)</small>

4-tuples of 4D texture coordinates, either in range [0,1] or higher if repeating.

## Description

### Hint

- Add Shape and then polgyonal/planar geometry before adding texture coordinates.

## External Links

- [X3D Specification of TextureCoordinate4D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#TextureCoordinate4D){:target="_blank"}
