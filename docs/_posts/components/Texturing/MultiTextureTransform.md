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

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFNode [in, out] **textureTransform** [ ] <small>[X3DTextureTransformNode]</small>

Input/Output field textureTransform.

## Description

### Hint

- Insert Shape and Appearance nodes before adding TextureTransform.

## External Links

- [X3D Specification of MultiTextureTransform](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#MultiTextureTransform){:target="_blank"}
