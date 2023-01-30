---
title: PixelTexture
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [PixelTexture, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PixelTexture creates a 2D-image texture map using a numeric array of pixel values. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) values in range [0.0, 1.0] for opposite corners of the image.

The PixelTexture node belongs to the **Texturing** component and its container field is *texture.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DTexture2DNode
        + PixelTexture
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFImage [in, out] **image** 0 0 0

Defines image: width height number_of_components pixel_values. width and height are pixel count, number_of_components = 1 (intensity), 2 (intensity alpha), 3 (red green blue), 4 (red green blue alpha-opacity).

### SFBool [ ] **repeatS** TRUE

Whether to horizontally repeat texture along S axis.

### SFBool [ ] **repeatT** TRUE

Whether to vertically repeat texture along T axis.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Field textureProperties.

## Description

### Hints

- This is a good way to bundle image(s) into a single scene file, avoiding multiple downloads.
- Can contain a single TextureProperties node.
- Insert Shape and Appearance nodes before adding texture.

Warning
-------

- Aggregate file size can grow dramatically.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Texturing/PixelTexture/PixelTexture.x3d"></x3d-canvas>

## External Links

- [X3D Specification of PixelTexture](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#PixelTexture){:target="_blank"}
- [X3D Scene Authoring Hints, Images and Videos](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images){:target="_blank"}
