---
title: ImageTexture
date: 2023-01-07
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

ImageTexture maps a 2D-image file onto a geometric shape. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) texture-coordinate values in range [0.0, 1.0] for opposite corners of the image.

The ImageTexture node belongs to the **Texturing** component and requires at least level **1,** its default container field is *texture.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture2DNode
          + ImageTexture (X3DUrlObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **load** TRUE

*load*=true means *load* immediately, *load*=false means defer loading or else unload a previously loaded scene.

#### Hints

- Allows author to design when [Inline](/x_ite/components/networking/inline/) loading occurs via user interaction, event chains or scripting.
- Use a separate [LoadSensor](/x_ite/components/networking/loadsensor/) node to detect when loading is complete.

### MFString [in, out] **url** [ ] <small>[URI]</small>

Location and filename of image. Multiple locations are more reliable, and including a Web address lets e-mail attachments work.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in *url* queries with %20 for each blank character.
- [X3D Scene Authoring Hints, urls](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#urls)

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https *url* addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### SFTime [in, out] **autoRefresh** 0 <small>[0,∞)</small>

*autoRefresh* defines interval in seconds before automatic reload of current url asset is performed.

#### Hints

- If preceding file loading fails or load field is false, no refresh is performed.
- Repeated refresh attempts to reload currently loaded entry of url list. If that fails, the browser retries other entries in the url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFTime [in, out] **autoRefreshTimeLimit** 3600 <small>[0,∞)</small>

*autoRefreshTimeLimit* defines maximum duration that automatic refresh activity can occur.

#### Hint

- Automatic refresh is different than query and response timeouts performed by a networking library while sequentially attempting to retrieve addressed content from a url list.

#### Warning

- Automatically reloading content has security considerations and needs to be considered carefully.

### SFBool [ ] **colorSpaceConversion**

Field *colorSpaceConversion*.

### SFBool [ ] **repeatS** TRUE

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** TRUE

Whether to repeat texture along T axis vertically from top to bottom.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Supported File Formats

Any image file format supported by the web browser, but at least:

| Encoding | File Extension  | MIME Type  | Comment             |
|----------|-----------------|------------|---------------------|
| PNG      | .png            | image/png  | lossless            |
| AVIF     | .avif           | image/avif | lossless/lossy      |
| WebP     | .webp           | image/webp | lossless/lossy |
| JPEG     | .jpeg, .jpg     | image/jpeg | lossy               |
| GIF      | .gif            | image/gif  | lossy               |
| SVG      | .svg            | image/svg  |                     |
| KTX2     | .ktx2, .ktx2.gz | image/ktx2 | TEXTURE_2D, WebGL 2 |

## Advice

### Hints

- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- Authors can provide multiple image formats for the same image, with each source address listed separately in the url field.
- Player support is required for .png and .jpg formats, support is suggested for .gif format. Other image formats are optionally supported.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- If a texture is opaque, omitting values in the alpha channel can help avoid rendering artifacts related to transparency and reduce file size by 25%.
- Texture coordinates are reapplied (or else recomputed if textureTransform field initially NULL) whenever the corresponding vertex-based geometry changes.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/lighting.html#Lightingmodel)
- [When parent node is LoadSensor, apply `containerField='children'` (X3Dv4) or `containerField='watchList'` (X3Dv3).](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#fieldNameChanges)

### Warnings

- Bright [Material](/x_ite/components/shape/material/) emissiveColor values can wash out some textures.
- See [ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/) and [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) for special containerField values.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Texturing/ImageTexture/ImageTexture.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Texturing/ImageTexture/screenshot.avif" alt="ImageTexture"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing/ImageTexture/ImageTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing/ImageTexture/ImageTexture.x3d)
{: .example-links }

## See Also

- [X3D Specification of ImageTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#ImageTexture)
