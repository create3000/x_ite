---
title: Appearance
date: 2022-01-07
nav: components-Shape
categories: [components, Shape]
tags: [Appearance, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Appearance specifies the visual properties of geometry by containing the Material, ImageTexture/MovieTexture/PixelTexture, FillProperties, LineProperties, and TextureTransform nodes.

The Appearance node belongs to the **Shape** component and its default container field is *appearance.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceNode
    + Appearance
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFNode [in, out] **fillProperties** NULL <small>[FillProperties]</small>

Input/Output field fillProperties.

### SFNode [in, out] **lineProperties** NULL <small>[LineProperties]</small>

Input/Output field lineProperties.

### SFNode [in, out] **material** NULL <small>[X3DMaterialNode]</small>

Input/Output field material.

### SFNode [in, out] **texture** NULL <small>[X3DTextureNode]</small>

Input/Output field texture.

### SFNode [in, out] **textureTransform** NULL <small>[X3DTextureTransformNode]</small>

Input/Output field textureTransform.

### MFNode [in, out] **shaders** [ ] <small>[X3DShaderNode]</small>

Input/Output field shaders.

### SFNode [in, out] **blendMode** NULL <small>[BlendMode] <span class="yellow">non standard</span></small>

Input/Output field blendMode.

## Description

### Hints

- Insert a Shape node before adding geometry or Appearance. Interchange profile hint: only Material and ImageTexture children are allowed.
- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- Advanced uses can contain MultiTexture, MultiTextureTransform/TextureTransformMatrix3D/TextureTransform3D, ComposedShader/PackagedShader/ProgramShader, ComposedTexture3D/ImageTexture3D/PixelTexture3D, or ComposedCubeMapTexture/GeneratedCubeMapTexture/ImageCubeMapTexture.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shape/Appearance/Appearance.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Appearance](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Appearance){:target="_blank"}
