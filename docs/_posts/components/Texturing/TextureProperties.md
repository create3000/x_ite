---
title: TextureProperties
date: 2023-01-07
nav: components-Texturing
categories: [components, Texturing]
tags: [TextureProperties, Texturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureProperties allows precise fine-grained control over application of image textures to geometry.

The TextureProperties node belongs to the [Texturing](/x_ite/components/overview/#texturing) component and requires at least support level **2,** its default container field is *textureProperties.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + TextureProperties
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFColorRGBA | [in, out] | [borderColor](#fields-borderColor) | 0 0 0 0  |
| SFInt32 | [in, out] | [borderWidth](#fields-borderWidth) | 0  |
| SFFloat | [in, out] | [anisotropicDegree](#fields-anisotropicDegree) | 1  |
| SFBool | [ ] | [generateMipMaps](#fields-generateMipMaps) | FALSE |
| SFString | [in, out] | [minificationFilter](#fields-minificationFilter) | "DEFAULT"  |
| SFString | [in, out] | [magnificationFilter](#fields-magnificationFilter) | "DEFAULT"  |
| SFString | [in, out] | [boundaryModeS](#fields-boundaryModeS) | "REPEAT"  |
| SFString | [in, out] | [boundaryModeT](#fields-boundaryModeT) | "REPEAT"  |
| SFString | [in, out] | [boundaryModeR](#fields-boundaryModeR) | "REPEAT"  |
| SFString | [in, out] | [textureCompression](#fields-textureCompression) | "DEFAULT"  |
| SFFloat | [in, out] | [texturePriority](#fields-texturePriority) | 0  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFColorRGBA [in, out] **borderColor** 0 0 0 0 <small>[0,1]</small>
{: #fields-borderColor }

*borderColor* defines border pixel color.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFInt32 [in, out] **borderWidth** 0 <small>[0,1]</small>
{: #fields-borderWidth }

*borderWidth* number of pixels for texture border.

### SFFloat [in, out] **anisotropicDegree** 1 <small>[1,∞)</small>
{: #fields-anisotropicDegree }

*anisotropicDegree* defines minimum degree of anisotropy to account for in texture filtering (1=no effect for symmetric filtering, otherwise provide higher value). At least 2-to-1 anisotropy is often supported in low-level graphics rendering software and hardware, relative to horizontal and vertical directions.

#### Hints

- [Anisotropy indicates directional dependence of properties.](https://en.wikipedia.org/wiki/Anisotropy)
- [OpenGL EXT_texture_filter_anisotropic](https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_texture_filter_anisotropic.txt)

### SFBool [ ] **generateMipMaps** FALSE
{: #fields-generateMipMaps }

Determines whether MIPMAPs are generated for texture images.

#### Hints

- Mipmap preprocessing is a low-level rendering technique that can increase rendering speed and reduce aliasing artifacts.
- Mipmap pyramids are pre-calculated, optimized sequences of images, each of which is a progressively lower resolution representation of the same image. The height and width of each image level in the mipmap is a power of two smaller than the previous level.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing) and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics))
- [Mipmap](https://en.wikipedia.org/wiki/Mipmap)

#### Warning

- Must declare *generateMipMaps*='true' for minificationFilter modes with MIPMAP in their value.

### SFString [in, out] **minificationFilter** "DEFAULT" <small>["AVG_PIXEL", "AVG_PIXEL_AVG_MIPMAP", "AVG_PIXEL_NEAREST_MIPMAP", "DEFAULT", "FASTEST", "NEAREST_PIXEL", "NEAREST_PIXEL_AVG_MIPMAP", "NEAREST_PIXEL_NEAREST_MIPMAP", "NICEST"]</small>
{: #fields-minificationFilter }

*minificationFilter* indicates texture filter when image is larger than screen space representation.

#### Hint

- [X3D Architecture Table 18.9 Texture minification modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-TextureMinificationModes) for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **magnificationFilter** "DEFAULT" <small>["AVG_PIXEL", "DEFAULT", "FASTEST", "NEAREST_PIXEL", "NICEST"]</small>
{: #fields-magnificationFilter }

*magnificationFilter* indicates texture filter when image is smaller than screen space representation.

#### Hint

- [X3D Architecture Table 18.8 Texture magnification modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-TextureMagnificationModes) for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeS** "REPEAT" <small>["CLAMP", "CLAMP_TO_EDGE", "CLAMP_TO_BOUNDARY", "MIRRORED_REPEAT", "REPEAT"]</small>
{: #fields-boundaryModeS }

*boundaryModeS* describes handling of texture-coordinate boundaries.

#### Hint

- [X3D Architecture Table 18.7 Texture boundary modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-TextureBoundaryModes) for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeT** "REPEAT" <small>["CLAMP", "CLAMP_TO_EDGE", "CLAMP_TO_BOUNDARY", "MIRRORED_REPEAT", "REPEAT"]</small>
{: #fields-boundaryModeT }

*boundaryModeT* describes handling of texture-coordinate boundaries.

#### Hint

- [X3D Architecture Table 18.7 Texture boundary modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-TextureBoundaryModes) for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeR** "REPEAT" <small>["CLAMP", "CLAMP_TO_EDGE", "CLAMP_TO_BOUNDARY", "MIRRORED_REPEAT", "REPEAT"]</small>
{: #fields-boundaryModeR }

*boundaryModeR* describes handling of texture-coordinate boundaries.

#### Hint

- [X3D Architecture Table 18.7 Texture boundary modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-TextureBoundaryModes) for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **textureCompression** "DEFAULT" <small>["DEFAULT", "FASTEST", "HIGH", "LOW", "MEDIUM", "NICEST"]</small>
{: #fields-textureCompression }

*textureCompression* indicates compression algorithm selection mode.

#### Hints

- [X3D Architecture Table 18.10 Texture compression modes](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html#t-TextureCompressionModes) for details.
- [Texture compression](https://en.wikipedia.org/wiki/Texture_compression)

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFFloat [in, out] **texturePriority** 0 <small>[0,1]</small>
{: #fields-texturePriority }

*texturePriority* defines relative priority for this texture when allocating texture memory, an important rendering resource in graphics-card hardware. Default value 0 is lowest, 1 is highest.

## Advice

### Hint

- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='Shape' level='2'/>`

## See Also

- [X3D Specification of TextureProperties Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureProperties)
