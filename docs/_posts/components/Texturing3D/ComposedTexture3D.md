---
title: ComposedTexture3D
date: 2022-01-07
nav: components-Texturing3D
categories: [components, Texturing3D]
tags: [ComposedTexture3D, Texturing3D]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ComposedTexture3D defines a 3D image-based texture map as a collection of 2D texture sources at various depths.

The ComposedTexture3D node belongs to the **Texturing3D** component and its default container field is *texture.* It is available since X3D version 3.1 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture3DNode
          + ComposedTexture3D
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for & ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [ ] **repeatS** FALSE

Whether to horizontally repeat texture along S axis.

### SFBool [ ] **repeatT** FALSE

Whether to vertically repeat texture along T axis.

### SFBool [ ] **repeatR** FALSE

Whether to vertically repeat texture along R axis.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Field textureProperties.

### MFNode [in, out] **texture** [ ] <small>[X3DTexture2DNode]</small>

Input/Output field texture.

## Description

### Hints

- Insert 2^n ImageTexture, PixelTexture or MovieTexture child nodes. The first image is at depth 0 and each following image is at an increasing depth value in the R direction.
- Can contain a single TextureProperties node.
- Insert Shape and Appearance nodes before adding texture.

## External Links

- [X3D Specification of ComposedTexture3D](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#ComposedTexture3D){:target="_blank"}
- [See X3D Specification 33.2.2 3D texturing concepts](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texture3D.html#3DTextureconcepts){:target="_blank"}
