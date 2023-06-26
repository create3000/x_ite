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

The TextureCoordinate4D node belongs to the **Texturing3D** component and its default container field is *texCoord.* It is available from X3D version 3.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DGeometricPropertyNode
    + X3DTextureCoordinateNode
      + X3DSingleTextureCoordinateNode
        + TextureCoordinate4D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFString [in, out] **mapping** ""

The *mapping* label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node *mapping* validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator){:target="_blank"}

### MFVec4f [in, out] **point** [ ] <small>(-∞,∞)</small>

4-tuple values of 4D texture coordinates, either in range [0,1] or higher if repeating.

## Information

### Hint

- Add Shape and then polygonal/planar geometry before adding texture coordinates.

### Warning

- Requires X3D profile='Full' or else include <component name='Texturing3D' level='1'/>

## See Also

- [X3D Specification of TextureCoordinate4D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#TextureCoordinate4D){:target="_blank"}
