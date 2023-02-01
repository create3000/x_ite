---
title: TextureCoordinateGenerator
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [TextureCoordinateGenerator, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureCoordinateGenerator computes 2D (s,t) texture-coordinate points, used by vertex-based geometry nodes (such as IndexedFaceSet or ElevationGrid) to map textures to vertices (and patches to polygons).

The TextureCoordinateGenerator node belongs to the **Texturing** component and its default container field is *texCoord.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTextureCoordinateNode
      + X3DSingleTextureCoordinateNode
        + TextureCoordinateGenerator
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **mapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFString [in, out] **mode** "SPHERE"

Parameter field defines the algorithm used to compute texture coordinates.

#### Hint

- See X3D Specification [Table 18.6 Texture coordinate generation modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-Texturecoordgeneration){:target="_blank"} for further details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### MFFloat [in, out] **parameter** [ ]

*parameter* array contains scale and translation (x y z) values for Perlin NOISE mode, parameter[0] contains index of refraction for SPHERE-REFLECT mode, parameter[0] contains index of refraction and parameter[1 to 3] contains the eye point in local coordinates for SPHERE-REFLECT-LOCAL mode.

## Description

### Hint

- Add Shape and then polgyonal/planar geometry before adding TextureCoordinateGenerator.

## External Links

- [X3D Specification of TextureCoordinateGenerator](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureCoordinateGenerator){:target="_blank"}
