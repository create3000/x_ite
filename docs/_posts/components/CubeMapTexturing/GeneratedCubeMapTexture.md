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

The GeneratedCubeMapTexture node belongs to the **CubeMapTexturing** component and requires level **3,** its default container field is *texture.* It is available from X3D version 3.0 or higher.

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

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

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

Single contained TextureProperties node that can specify additional visual attributes applied to corresponding texture images.

## Advice

### Hints

- Can contain a single TextureProperties node.
- Typically a Box is used for applying the GeneratedCubeMapTexture.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='CubeMapTexturing' level='3'/>`

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/GeneratedCubeMapTexture.x3d" update="auto"></x3d-canvas>

[View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/CubeMapTexturing/GeneratedCubeMapTexture/GeneratedCubeMapTexture.x3d)

## See Also

- [X3D Specification of GeneratedCubeMapTexture node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalTexturing.html#GeneratedCubeMapTexture){:target="_blank"}
