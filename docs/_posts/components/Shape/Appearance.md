---
title: Appearance
date: 2023-01-07
nav: components-Shape
categories: [components, Shape]
tags: [Appearance, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Appearance specifies the visual properties of geometry by containing the Material, ImageTexture/MovieTexture/PixelTexture, FillProperties, LineProperties, programmable shader nodes (ComposedShader, PackagedShader, ProgramShader) and TextureTransform nodes.

The Appearance node belongs to the **Shape** component and its default container field is *appearance.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceNode
    + Appearance
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### SFNode [in, out] **acousticProperties** NULL <small>[AcousticProperties]</small>

Single contained *acousticProperties* node that can specify additional acoustic attributes applied to associated surface geometry.

### SFString [in, out] **alphaMode** "AUTO" <small>["AUTO"|"OPAQUE"|"MASK"|"BLEND"]</small>

Provides options for control of alpha transparency handling for textures. AUTO means Material transparency is applied to texture transparency for full backwards compatility with X3D3, OPAQUE means ignore alpha transparency to render texture as opaque, MASK means alpha-testing of pixels as fully transparent when alpha value is less than alphaCutoff and fully opaque when alpha value is greater than or equal to alphaCutoff, BLEND combines partial transparency of textures and materials.

#### Hint

- [GlTF version 2 Alpha Coverage](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#alpha-coverage){:target="_blank"}

### SFFloat [in, out] **alphaCutoff** 0.5 <small>[0,1]</small>

Threshold value used for pixel rendering either transparent or opaque, used when alphaMode="MASK".

#### Hint

- [GlTF version 2 Alpha Coverage](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#alpha-coverage){:target="_blank"}

### SFNode [in, out] **pointProperties** NULL <small>[PointProperties]</small>

Single contained PointProperties node that can specify additional visual attributes applied to corresponding point geometry.

### SFNode [in, out] **lineProperties** NULL <small>[LineProperties]</small>

Single contained LineProperties node that can specify additional visual attributes applied to corresponding line geometry.

### SFNode [in, out] **fillProperties** NULL <small>[FillProperties]</small>

Single contained FillProperties node that can specify additional visual attributes applied to polygonal areas of corresponding geometry, on top of whatever other appearance is already defined.

### SFNode [in, out] **material** NULL <small>[X3DMaterialNode]</small>

Single contained Material node that can specify visual attributes for lighting response (color types, transparency, etc.) applied to corresponding geometry.

#### Warning

- If *material* is NULL or unspecified, lighting is off (all lights ignored) for this Shape and unlit object color is (1, 1, 1).

### SFNode [in, out] **backMaterial** NULL <small>[X3DOneSidedMaterialNode]</small>

Input/Output field *backMaterial*.

### SFNode [in, out] **texture** NULL <small>[X3DTextureNode]</small>

Single contained *texture* node (ImageTexture, MovieTexture, PixelTexture, MultiTexture) that maps image(s) to surface geometry.

#### Hints

- If *texture* node is NULL or unspecified, corresponding Shape geometry for this Appearance is not textured.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images){:target="_blank"}
- [X3D Architecture 18 Texturing component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/texturing.html){:target="_blank"}
- [X3D Architecture 33 Texturing3D component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/texture3D.html){:target="_blank"}

### SFNode [in, out] **textureTransform** NULL <small>[X3DTextureTransformNode]</small>

Single contained TextureTransform node that defines 2D transformation applied to texture coordinates.

#### Hints

- Texture coordinates are reapplied (or else recomputed if *textureTransform* field initially NULL) whenever the corresponding vertex-based geometry changes.
- If *textureTransform* array is empty, then this field has no effect.

### MFNode [in, out] **shaders** [ ] <small>[X3DShaderNode]</small>

Zero or more contained programmable shader nodes (ComposedShader, PackagedShader, ProgramShader) that specify, in order of preference, author-programmed rendering characteristics.

#### Hint

- [X3D Architecture 31 Programmable *shaders* component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/*shaders*.html){:target="_blank"}

### SFNode [in, out] **blendMode** NULL <small>[BlendMode]</small> <small class="yellow">non standard</small>

Single contained BlendMode node that defines blend mode properties.

## Advisories

### Hints

- Insert a Shape node before adding geometry or Appearance. Interchange profile hint: only Material and ImageTexture children are allowed.
- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- Advanced uses can contain MultiTexture, MultiTextureTransform/TextureTransformMatrix3D/TextureTransform3D, ComposedShader/PackagedShader/ProgramShader, ComposedTexture3D/ImageTexture3D/PixelTexture3D, or ComposedCubeMapTexture/GeneratedCubeMapTexture/ImageCubeMapTexture.
- [X3D Architecture 12.2.2 Appearance Node](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/shape.html#Appearancenode){:target="_blank"}
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/lighting.html#Lightingmodel){:target="_blank"}

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shape/Appearance/Appearance.x3d" update="auto"></x3d-canvas>

## See Also

- [X3D Specification of Appearance Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Appearance){:target="_blank"}
