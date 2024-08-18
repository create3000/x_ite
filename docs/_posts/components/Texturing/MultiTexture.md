---
title: MultiTexture
date: 2023-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [MultiTexture, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

MultiTexture applies several individual textures to a single geometry node, enabling a variety of visual effects that include light mapping and environment mapping. MultiTexture can contain zero or more ImageTexture, MovieTexture, PixelTexture, ComposedCubeMapTexture, GeneratedCubeMapTexture, ImageCubeMapTexture, ComposedTexture3D, ImageTexture3D, and PixelTexture3D nodes. Texture maps have a 2D coordinate system (s, t) horizontal and vertical, with (s, t) texture-coordinate values in range [0.0, 1.0] for opposite corners of the image.

The MultiTexture node belongs to the **Texturing** component and requires at least level **2,** its default container field is *texture.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + MultiTexture
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

The *color* field defines the RGB base values for mode operations.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **alpha** 1 <small>[0,1]</small>

The *alpha* field defines the *alpha* (1-transparency) base value for mode operations.

### MFString [in, out] **mode** [ ]

*mode* field indicates the type of blending operation, both for color and for alpha channel.

#### Hints

- Include the same number of *mode* values as textures, otherwise the default value MODULATE is added for each remaining stage.
- [X3D Architecture Table 18.3 Multitexture modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-MultitextureModes) for further details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### MFString [in, out] **source** [ ]

*source* field determines whether each image *source* is treated as DIFFUSE, SPECULAR or a multiplicative FACTOR. Empty string value "" indicates that no *source* modifier is applied for that stage.

#### Hints

- Include the same number of *source* values as textures, otherwise the default of no *source* interpretation is applied for each remaining stage.
- [X3D Architecture Table 18.4 Values for the *source* field](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-ValuesForSourceField) for further details.

### MFString [in, out] **function** [ ]

*function* operators COMPLEMENT or ALPHAREPLICATE can be applied after the mode blending operation. Empty string value "" indicates that no *function* operation is applied for that stage.

#### Hints

- Include the same number of *function* values as textures, otherwise the default of no *function* operation is applied for each remaining stage.
- [X3D Architecture Table 18.5 Values for the *function* field](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-ValuesForFunctionField) for further details.

### MFNode [in, out] **texture** [ ] <small>[X3DTextureNode]</small>

Contained *texture* nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/), [MovieTexture](/x_ite/components/texturing/movietexture/), [PixelTexture](/x_ite/components/texturing/pixeltexture/)) that map image(s) to surface geometry, defining each of the different *texture* channels.

#### Hints

- If *texture* node is NULL or unspecified, corresponding [Shape](/x_ite/components/shape/shape/) geometry for this [Appearance](/x_ite/components/shape/appearance/) is not textured.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- [X3D Architecture 18 Texturing component](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html)
- [X3D Architecture 33 Texturing3D component](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texture3D.html)

#### Warning

- MultiTexture may not contain another MultiTexture node.

## Advice

### Hints

- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding texture.
- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)
- Multitexturing is accomplished using MultiTexture, [MultiTextureCoordinate](/x_ite/components/texturing/multitexturecoordinate/) and [MultiTextureTransform](/x_ite/components/texturing/multitexturetransform/) nodes.
- Texture coordinates are reapplied (or else recomputed if textureTransform field initially NULL) whenever the corresponding vertex-based geometry changes.
- [X3D Texturing component Figure 18.2 Lightmap example](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#f-Lightmapexample)
- [X3D Texturing component Table 18.2: Comparison of single texture and multitexture attributes](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/texturing.html#t-SingleAndMultitextureAttrs)
- MultiTexture does not need to be included in [LoadSensor](/x_ite/components/networking/loadsensor/) watchList since any child [ImageTexture](/x_ite/components/texturing/imagetexture/) and [MovieTexture](/x_ite/components/texturing/movietexture/) nodes of interest can be handled separately.

### Warnings

- The number of textures to be blended may have a significant impact on performance, depending on available graphics hardware capabilities.
- MultiTexture may not contain another MultiTexture node.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Texturing/MultiTexture/MultiTexture.x3d" update="auto"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Texturing/MultiTexture/MultiTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Texturing/MultiTexture/MultiTexture.x3d)
{: .example-links }

## See Also

- [X3D Specification of MultiTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#MultiTexture)
