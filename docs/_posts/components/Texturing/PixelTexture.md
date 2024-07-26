---
title: PixelTexture
date: 2023-01-07
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

PixelTexture creates a 2D-image texture map using a numeric array of pixel values. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) texture-coordinate values in range [0.0, 1.0] for opposite corners of the image.

The PixelTexture node belongs to the **Texturing** component and requires at least level **1,** its default container field is *texture.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture2DNode
          + PixelTexture
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/core.html#Metadata

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFImage [in, out] **image** 0 0 0

Defines *image*: width, height, number_of_components per each pixel value, and list of pixel_values. Note that width and height are pixel count, and allowed values for RGBA number_of_components in each pixel value are 1 (intensity), 2 (intensity alpha), 3 (red green blue), 4 (red green blue alpha-opacity).

#### Hints

- It is easier to understand hexadecimal values for each pixel, but integer values are also allowed.
- The array of pixel values has length = (width*height).
- The full list of integers in this field has length = (width*height + 3).

#### Warning

- The order of initial values in PixelTexture and [PixelTexture3D](/x_ite/components/texturing3d/pixeltexture3d/) *image* arrays are different. Example: intensity [1 2 1 0xFF 0x00] Example: intensity-alpha [2 2 1 0 255 255 0] Example: red-green-blue [2 4 3 0xFF0000 0xFF00 0 0 0 0 0xFFFFFF 0xFFFF00] Example: red-green-blue-alpha [2 2 4 0xFFFFFFAA 0xFFFF00AA 0x11111111AA 0x787800AA]

### SFBool [ ] **repeatS** TRUE

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** TRUE

Whether to repeat texture along T axis vertically from top to bottom.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Advice

### Hints

- This is a good way to bundle image(s) into a single scene file, avoiding multiple downloads.
- [X3D-Edit includes PixelTexture image-conversion import capabilities.](https://savage.nps.edu/X3D-Edit/images/PixelTextureImportImage.png)
- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- [X3D Scene Authoring Hints, Images and Videos](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- If a texture is opaque, omitting values in the alpha channel can help avoid rendering artifacts related to transparency.
- Texture coordinates are reapplied (or else recomputed if textureTransform field initially NULL) whenever the corresponding vertex-based geometry changes.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS) /Part01/components/lighting.html#Lightingmodel

### Warnings

- Aggregate file size can grow dramatically.
- See [ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/) and [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) for special containerField values.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Texturing/PixelTexture/PixelTexture.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing/PixelTexture/PixelTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing/PixelTexture/PixelTexture.x3d)
{: .example-links }

## See Also

- [X3D Specification of PixelTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#PixelTexture)
