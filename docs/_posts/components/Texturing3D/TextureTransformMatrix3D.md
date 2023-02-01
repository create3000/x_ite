---
title: TextureTransformMatrix3D
date: 2022-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [TextureTransformMatrix3D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureTransformMatrix3D applies a 3D transformation to texture coordinates.

The TextureTransformMatrix3D node belongs to the **Texturing3D** component and its default container field is *textureTransform.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureTransformNode
      + X3DSingleTextureTransformNode
        + TextureTransformMatrix3D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **mapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFMatrix4f [in, out] **matrix** 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 <small>(-∞,∞)</small>

*matrix* is a generalized, unfiltered 4x4 transformation matrix to modify texture (opposite effect appears on geometry).

## Description

### Hints

- Order of operations is translation, rotation about center, non-uniform scale about center.
- Insert Shape and Appearance nodes before adding TextureTransform.

### Warning

- Resulting visible effects appear reversed because image changes occur before mapping to geometry.

## External Links

- [X3D Specification of TextureTransformMatrix3D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#TextureTransformMatrix3D){:target="_blank"}
