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

The TextureTransform node belongs to the **Texturing** component and its default container field is *textureTransform.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureTransformNode
      + X3DSingleTextureTransformNode
        + TextureTransform
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

### SFVec2f [in, out] **translation** 0 0 <small>(-∞,∞)</small>

Lateral/vertical shift in 2D (s,t) texture coordinates (opposite effect appears on geometry).

### SFFloat [in, out] **rotation** 0 <small>(-∞,∞)</small>

Single *rotation* angle of texture about center (opposite effect appears on geometry).

#### Warning

- Use a single radian angle value, not a 4-tuple Rotation.

### SFVec2f [in, out] **scale** 1 1 <small>(-∞,∞)</small>

Non-uniform planar scaling of texture about center (opposite effect appears on geometry).

### SFVec2f [in, out] **center** 0 0 <small>(-∞,∞)</small>

*center* point in 2D (s,t) texture coordinates for rotation and scaling.

## Description

### Hints

- Order of operations is translation, rotation about center, non-uniform scale about center.
- Insert Shape and Appearance nodes before adding TextureTransform.

### Warning

- Resulting visible effects appear reversed because image changes occur before mapping to geometry.

## External Links

- [X3D Specification of TextureTransform](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureTransform){:target="_blank"}
