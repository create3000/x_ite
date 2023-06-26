---
title: TextureProperties
date: 2022-01-07
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

The TextureProperties node belongs to the **Texturing** component and its default container field is *textureProperties.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + TextureProperties
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFColorRGBA [in, out] **borderColor** 0 0 0 0 <small>[0,1]</small>

*borderColor* defines border pixel color.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFInt32 [in, out] **borderWidth** 0 <small>[0,1]</small>

*borderWidth* number of pixels for texture border.

### SFFloat [in, out] **anisotropicDegree** 1 <small>[1,∞)</small>

*anisotropicDegree* defines minimum degree of anisotropy to account for in texture filtering (1=no effect for symmetric filtering, otherwise provide higher value). At least 2-to-1 anisotropy is often supported in low-level graphics rendering software and hardware, relative to horizontal and vertical directions.

#### Hints

- [Anisotropy indicates directional dependence of properties.](https://en.wikipedia.org/wiki/Anisotropy){:target="_blank"}
- [OpenGL EXT_texture_filter_anisotropic](https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_texture_filter_anisotropic.txt){:target="_blank"}

### SFBool [ ] **generateMipMaps** FALSE

Determines whether MIPMAPs are generated for texture images.

#### Hints

- Mipmap preprocessing is a low-level rendering technique that can increase rendering speed and reduce aliasing artifacts.
- Mipmap pyramids are pre-calculated, optimized sequences of images, each of which is a progressively lower resolution representation of the same image. The height and width of each image level in the mipmap is a power of two smaller than the previous level.
- [Aliasing](https://en.wikipedia.org/wiki/Aliasing){:target="_blank"} and [Clipping](https://en.wikipedia.org/wiki/Clipping_(computer_graphics)){:target="_blank"}
- [Mipmap](https://en.wikipedia.org/wiki/Mipmap){:target="_blank"}

#### Warning

- Must declare *generateMipMaps*='true' for minificationFilter modes with MIPMAP in their value.

### SFString [in, out] **minificationFilter** "FASTEST"

*minificationFilter* indicates texture filter when image is larger than screen space representation.

#### Hint

- [X3D Architecture Table 18.9 Texture minification modes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texturing.html#t-TextureMinificationModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **magnificationFilter** "FASTEST"

*magnificationFilter* indicates texture filter when image is smaller than screen space representation.

#### Hint

- [X3D Architecture Table 18.8 Texture magnification modes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texturing.html#t-TextureMagnificationModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeS** "REPEAT"

*boundaryModeS* describes handling of texture-coordinate boundaries.

#### Hint

- [X3D Architecture Table 18.7 Texture boundary modes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texturing.html#t-TextureBoundaryModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeT** "REPEAT"

*boundaryModeT* describes handling of texture-coordinate boundaries.

#### Hint

- [X3D Architecture Table 18.7 Texture boundary modes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texturing.html#t-TextureBoundaryModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeR** "REPEAT"

*boundaryModeR* describes handling of texture-coordinate boundaries.

#### Hint

- [X3D Architecture Table 18.7 Texture boundary modes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texturing.html#t-TextureBoundaryModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **textureCompression** "FASTEST"

*textureCompression* indicates compression algorithm selection mode.

#### Hints

- [X3D Architecture Table 18.10 Texture compression modes](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/texturing.html#t-TextureCompressionModes){:target="_blank"} for details.
- [Texture compression](https://en.wikipedia.org/wiki/Texture_compression){:target="_blank"}

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFFloat [in, out] **texturePriority** 0 <small>[0,1]</small>

*texturePriority* defines relative priority for this texture when allocating texture memory, an important rendering resource in graphics-card hardware. Default value 0 is lowest, 1 is highest.

## Information

### Hint

- [Texture mapping](https://en.wikipedia.org/wiki/Texture_mapping){:target="_blank"}

### Warning

- Requires X3D profile='Full' or else include <component name='Shape' level='2'/>

## External Links

- [X3D Specification of TextureProperties](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureProperties){:target="_blank"}
