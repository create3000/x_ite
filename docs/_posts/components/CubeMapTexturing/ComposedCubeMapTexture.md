---
title: ComposedCubeMapTexture
date: 2022-01-07
nav: components-CubeMapTexturing
categories: [components, CubeMapTexturing]
tags: [ComposedCubeMapTexture, CubeMapTexturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ComposedCubeMapTexture defines a cubic environment map source as an explicit set of images drawn from individual 2D texture nodes.

The ComposedCubeMapTexture node belongs to the **CubeMapTexturing** component and its default container field is *texture.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DEnvironmentTextureNode
        + ComposedCubeMapTexture
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [in, out] **front** NULL <small>[X3DTexture2DNode]</small>

Input/Output field front.

### SFNode [in, out] **back** NULL <small>[X3DTexture2DNode]</small>

Input/Output field back.

### SFNode [in, out] **left** NULL <small>[X3DTexture2DNode]</small>

Input/Output field left.

### SFNode [in, out] **right** NULL <small>[X3DTexture2DNode]</small>

Input/Output field right.

### SFNode [in, out] **top** NULL <small>[X3DTexture2DNode]</small>

Input/Output field top.

### SFNode [in, out] **bottom** NULL <small>[X3DTexture2DNode]</small>

Input/Output field bottom.

## Description

### Hint

- 0..6 child image nodes are allowed (ImageTexture MovieTexture PixelTexture) with corresponding containerField values: front back left right top bottom.

Warning
-------

- Child ImageTexture nodes must have unique containerField values for back, bottom, front, left, right, or top.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/CubeMapTexturing/ComposedCubeMapTexture/ComposedCubeMapTexture.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ComposedCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalTexturing.html#ComposedCubeMapTexture){:target="_blank"}
