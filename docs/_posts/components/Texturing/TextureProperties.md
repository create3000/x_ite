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

TextureProperties allows fine control over texture application.

The TextureProperties node belongs to the **Texturing** component and its default container field is *textureProperties.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + TextureProperties
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFColorRGBA [in, out] **borderColor** 0 0 0 0 <small>[0,1]</small>

BorderColor defines border pixel color.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFInt32 [in, out] **borderWidth** <small>[0,1]</small>

BorderWidth number of pixels for texture border.

### SFFloat [in, out] **anisotropicDegree** 1 <small>[1,∞)</small>

AnisotropicDegree defines minimum degree of anisotropy to account for in texture filtering (1=none or higher value).

### SFBool [ ] **generateMipMaps** FALSE

Whether MIPMAPs are generated for texture (required for MIPMAP filtering modes)

### SFString [in, out] **minificationFilter** "FASTEST"

MinificationFilter indicates texture filter when image is larger than screen space representation.

#### Hint

- See X3D Specification [Table 18.9 Texture minification modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-TextureMinificationModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **magnificationFilter** "FASTEST"

MagnificationFilter indicates texture filter when image is smaller than screen space representation.

#### Hint

- See X3D Specification [Table 18.8 Texture magnification modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-TextureMagnificationModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeS** "REPEAT"

BoundaryModeS describes handling of texture-coordinate boundaries.

#### Hint

- See X3D Specification T[able 18.7 Texture boundary modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-TextureBoundaryModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeT** "REPEAT"

BoundaryModeT describes handling of texture-coordinate boundaries.

#### Hint

- See X3D Specification [Table 18.7 Texture boundary modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-TextureBoundaryModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **boundaryModeR** "REPEAT"

BoundaryModeR describes handling of texture-coordinate boundaries.

#### Hint

- See X3D Specification [Table 18.7 Texture boundary modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-TextureBoundaryModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFString [in, out] **textureCompression** "FASTEST"

TextureCompression indicates compression algorithm selection mode.

#### Hint

- See X3D Specification [Table 18.10 Texture compression modes](https://www.web3d.org/files/specifications/19775-1/V3.3/Part01/components/texturing.html#t-TextureCompressionModes){:target="_blank"} for details.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFFloat [in, out] **texturePriority** 0 <small>[0,1]</small>

TexturePriority defines priority for allocating texture memory.

## Description

### Hint

- Include `<component name='Shape' level='2'/>`

## External Links

- [X3D Specification of TextureProperties](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/texturing.html#TextureProperties){:target="_blank"}
