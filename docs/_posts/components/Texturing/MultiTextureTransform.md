---
title: MultiTextureTransform
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [MultiTextureTransform, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

MultiTextureTransform contains multiple TextureTransform nodes, for use by sibling ImageTexture MovieTexture or PixelTexture nodes.

The MultiTextureTransform node belongs to the **Texturing** component and its default container field is *textureTransform.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureTransformNode
      + MultiTextureTransform
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### MFNode [in, out] **textureTransform** [ ] <small>[X3DTextureTransformNode]</small>

Zero or more contained TextureTransform nodes, for each of the different texture channels, that define 2D transformation applied to texture coordinates.

#### Hints

- Texture coordinates are reapplied (or else recomputed if *textureTransform* field initially NULL) whenever the corresponding vertex-based geometry changes.
- If *textureTransform* array is empty, then this field has no effect.

#### Warning

- MultiTextureTransform may not contain another MultiTextureTransform node.

## Description

### Hint

- Insert Shape and Appearance nodes before adding TextureTransform.

## External Links

- [X3D Specification of MultiTextureTransform](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#MultiTextureTransform){:target="_blank"}
