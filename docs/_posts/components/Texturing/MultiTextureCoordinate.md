---
title: MultiTextureCoordinate
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [MultiTextureCoordinate, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

MultiTextureCoordinate contains multiple TextureCoordinate or TextureCoordinateGenerator nodes, for use by a parent polygonal geometry node such as IndexedFaceSet or a Triangle\* node. Each of the contained texture coordinate nodes correspond to the multiple texture nodes contained in a sibling Appearance/MultiTexture node.

The MultiTextureCoordinate node belongs to the **Texturing** component and its container field is *texCoord.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTextureCoordinateNode
      + MultiTextureCoordinate
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFNode [in, out] **texCoord** [ ] <small>[X3DTextureCoordinateNode]</small>

Input/Output field texCoord.

## Description

### Hint

- Add Shape and then polgyonal/planar geometry before adding MultiTextureCoordinate.

## External Links

- [X3D Specification of MultiTextureCoordinate](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#MultiTextureCoordinate){:target="_blank"}
