---
title: RenderedTexture
date: 2023-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [RenderedTexture, Texturing, VRML]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

A RenderedTexture is a texture node that renders a separate scene or viewpoint into an offscreen buffer, producing an image that can be applied to geometry in real time. It enables effects such as dynamic reflections, live video screens, shadows, or portals by continuously updating the texture based on the rendered content.

The RenderedTexture node belongs to the [Texturing](/x_ite/components/overview/#texturing) component and requires at least support level **1,** its default container field is *texture.* It is available from X3D version 4.1 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DSingleTextureNode
        + X3DTexture2DNode
          + RenderedTexture
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFImage | [in, out] | [image](#fields-image) | 0 0 0 |
| SFBool | [ ] | [repeatS](#fields-repeatS) | TRUE |
| SFBool | [ ] | [repeatT](#fields-repeatT) | TRUE |
| SFNode | [ ] | [textureProperties](#fields-textureProperties) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [ ] **repeatS** TRUE
{: #fields-repeatS }

Whether to repeat texture along S axis horizontally from left to right.

### SFBool [ ] **repeatT** TRUE
{: #fields-repeatT }

Whether to repeat texture along T axis vertically from top to bottom.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>
{: #fields-textureProperties }

Optional single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Advice

### Hints

- This is a good way to bundle image(s) into a single scene file, avoiding multiple downloads.
- [X3D-Edit includes RenderedTexture image-conversion import capabilities.](https://www.web3d.org/x3d/tools/X3D-Edit/images/PixelTextureImportImage.png)
- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- [X3D Scene Authoring Hints, Images and Videos](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- If a texture is opaque, omitting values in the alpha channel can help avoid rendering artifacts related to transparency.
- Texture coordinates are reapplied (or else recomputed if textureTransform field initially NULL) whenever the corresponding vertex-based geometry changes.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/lighting.html#Lightingmodel)

### Warnings

- Aggregate file size can grow dramatically.
- See [ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/) and [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) for special containerField values.

## Example

<x3d-canvas class="buttons-br" src="https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Texturing/RenderedTexture/screenshot.avif" alt="RenderedTexture"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing/RenderedTexture/RenderedTexture.x3d)
{: .example-links }

## See Also

- [X3D Specification of RenderedTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#RenderedTexture)
