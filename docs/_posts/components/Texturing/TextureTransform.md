---
title: TextureTransform
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [TextureTransform, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureTransform shifts 2D texture coordinates for positioning, orienting and scaling image textures on geometry.

The TextureTransform node belongs to the **Texturing** component and its container field is *textureTransform.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureTransformNode
      + TextureTransform
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFVec2f [in, out] **translation** 0 0 <small>(-∞,∞)</small>

Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).

### SFFloat [in, out] **rotation** <small>(-∞,∞)</small>

Single rotation angle of texture about center (opposite effect appears on geometry).

#### Warning

Use a single radian angle value, not a 4-tuple Rotation.

### SFVec2f [in, out] **scale** 1 1 <small>(-∞,∞)</small>

Non-uniform planar scaling of texture about center (opposite effect appears on geometry).

### SFVec2f [in, out] **center** 0 0 <small>(-∞,∞)</small>

Center point in 2D (s,t) texture coordinates for rotation and scaling.

## Description

### Hints

- Order of operations is translation, rotation about center, non-uniform scale about center.
- Insert Shape and Appearance nodes before adding TextureTransform.

Warning
-------

- Resulting visible effects appear reversed because image changes occur before mapping to geometry.

## External Links

- [X3D Specification of TextureTransform](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureTransform){:target="_blank"}
