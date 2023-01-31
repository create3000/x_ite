---
title: TextureCoordinate
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [TextureCoordinate, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureCoordinate specifies 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to polygons).

The TextureCoordinate node belongs to the **Texturing** component and its default container field is *texCoord.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTextureCoordinateNode
      + TextureCoordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFVec2f [in, out] **point** [ ] <small>(-∞,∞)</small>

Pairs of 2D (s,t) texture coordinates, either in range [0,1] or higher if repeating.

## Description

### Hint

- Add Shape and then polgyonal/planar geometry before adding TextureCoordinate.

## External Links

- [X3D Specification of TextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureCoordinate){:target="_blank"}
