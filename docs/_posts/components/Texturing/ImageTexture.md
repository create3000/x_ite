---
title: ImageTexture
date: 2022-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [ImageTexture, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ImageTexture maps a 2D-image file onto a geometric shape. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) values in range [0.0, 1.0] for opposite corners of the image.

The ImageTexture node belongs to the **Texturing** component and its default container field is *texture.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DTexture2DNode
        + ImageTexture (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character.

#### Warning

Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

#### See Also

- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls){:target="_blank"}

### SFBool [ ] **repeatS** TRUE

Whether to horizontally repeat texture along S axis.

### SFBool [ ] **repeatT** TRUE

Whether to vertically repeat texture along T axis.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Field textureProperties.

## Description

### Hints

- Can contain a single TextureProperties node.
- Insert Shape and Appearance nodes before adding texture.
- Authors can provide multiple image formats for the same image, with each source address listed separately in the url field.
- Player support is required for .png and .jpg formats, support is suggested for .gif format. Other image formats are optionally supported.

Warnings
--------

- Bright Material emissiveColor values can wash out some textures.
- See ComposedCubeMapTexture and TextureBackground for special containerField values.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Texturing/ImageTexture/ImageTexture.x3d"></x3d-canvas>

## External Links

- [X3D Specification of ImageTexture](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#ImageTexture){:target="_blank"}
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images){:target="_blank"}
