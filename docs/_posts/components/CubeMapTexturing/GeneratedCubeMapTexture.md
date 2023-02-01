---
title: GeneratedCubeMapTexture
date: 2022-01-07
nav: components-CubeMapTexturing
categories: [components, CubeMapTexturing]
tags: [GeneratedCubeMapTexture, CubeMapTexturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeneratedCubeMapTexture defines a cubic environment map that sources its data from internally generated images. The viewpoint of the generated texture is the location and orientation of the associated geometry in world space.

The GeneratedCubeMapTexture node belongs to the **CubeMapTexturing** component and its default container field is *texture.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DEnvironmentTextureNode
        + GeneratedCubeMapTexture
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **update** "NONE" <small>["NONE"|"NEXT_FRAME_ONLY"|"ALWAYS"]</small>

Update controls regeneration of the texture.

#### Warnings

- An object trying to render itself in the scene graph can cause infinite loops. Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFInt32 [ ] **size** 128 <small>(0,∞)</small>

Size indicates the resolution of the generated images in number of pixels per side.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Field textureProperties.

## Description

### Hints

- Can contain a single TextureProperties node.
- Typically a Box is used for applying the GeneratedCubeMapTexture.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/GeneratedCubeMapTexture.x3d"></x3d-canvas>

## External Links

- [X3D Specification of GeneratedCubeMapTexture](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalTexturing.html#GeneratedCubeMapTexture){:target="_blank"}
