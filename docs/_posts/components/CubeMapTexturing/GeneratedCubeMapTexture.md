---
title: GeneratedCubeMapTexture
date: 2023-01-07
nav: components-CubeMapTexturing
categories: [components, CubeMapTexturing]
tags: [GeneratedCubeMapTexture, CubeMapTexturing]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

GeneratedCubeMapTexture is a texture node that defines a cubic environment map that sources its data from internally generated images. The viewpoint of the generated texture is the location and orientation of the associated geometry in world space.

The GeneratedCubeMapTexture node belongs to the **CubeMapTexturing** component and requires at least level **3,** its default container field is *texture.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DTextureNode
      + X3DEnvironmentTextureNode
        + GeneratedCubeMapTexture
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

### SFString [in, out] **update** "NONE" <small>["NONE"|"NEXT_FRAME_ONLY"|"ALWAYS"]</small>

*update* controls regeneration of the texture.

#### Warnings

- An object trying to render itself in the scene graph can cause infinite loops.
- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFInt32 [ ] **size** 128 <small>(0,∞)</small>

*size* indicates the resolution of the generated images in number of pixels per side.

### SFNode [ ] **textureProperties** NULL <small>[TextureProperties]</small>

Single contained [TextureProperties](/x_ite/components/texturing/textureproperties/) node that can specify additional visual attributes applied to corresponding texture images.

## Advice

### Hints

- Can contain a single [TextureProperties](/x_ite/components/texturing/textureproperties/) node.
- Typically a [Box](/x_ite/components/geometry3d/box/) is used for applying the GeneratedCubeMapTexture.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='CubeMapTexturing' level='3'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/GeneratedCubeMapTexture.x3d" contentScale="auto" update="auto" xrMovementControl="VIEWPOINT">
  <img src="https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/screenshot.png" alt="GeneratedCubeMapTexture"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/GeneratedCubeMapTexture.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/GeneratedCubeMapTexture.x3d)
{: .example-links }

## See Also

- [X3D Specification of GeneratedCubeMapTexture Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalTexturing.html#GeneratedCubeMapTexture)
