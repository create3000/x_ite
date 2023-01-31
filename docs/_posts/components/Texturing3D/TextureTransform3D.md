---
title: TextureTransform3D
date: 2022-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [TextureTransform3D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureTransform3D applies a 3D transformation to texture coordinates.

The TextureTransform3D node belongs to the **Texturing3D** component and its default container field is *textureTransform.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureTransformNode
      + X3DSingleTextureTransformNode
        + TextureTransform3D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **mapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFVec3f [in, out] **translation** 0 0 0 <small>(-∞,∞)</small>

Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).

### SFRotation [in, out] **rotation** 0 0 1 0 <small>(-∞,∞)</small>

Rotation angle of texture about center (opposite effect appears on geometry).

### SFVec3f [in, out] **scale** 1 1 1 <small>(-∞,∞)</small>

Non-uniform planar scaling of texture about center (opposite effect appears on geometry).

### SFVec3f [in, out] **center** 0 0 0 <small>(-∞,∞)</small>

Center point in 2D (s,t) texture coordinates for rotation and scaling.

## Description

### Hints

- Order of operations is translation, rotation about center, non-uniform scale about center.
- Insert Shape and Appearance nodes before adding TextureTransform.

### Warning

- Resulting visible effects appear reversed because image changes occur before mapping to geometry.

## External Links

- [X3D Specification of TextureTransform3D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#TextureTransform3D){:target="_blank"}
