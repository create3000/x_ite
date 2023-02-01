---
title: Material
date: 2022-01-07
nav: components-Shape
categories: [components, Shape]
tags: [Material, Shape]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Material specifies surface rendering properties for associated geometry nodes. Material attributes are used by the X3D lighting equations during rendering.

The Material node belongs to the **Shape** component and its default container field is *material.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DMaterialNode
      + X3DOneSidedMaterialNode
        + Material
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFFloat [in, out] **ambientIntensity** 0.2 <small>[0,1]</small>

How much ambient omnidirectional light is reflected from all light sources. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFString [in, out] **ambientTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFNode [in, out] **ambientTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying ambientIntensity for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hint

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include containerField='ambientTexture'

### SFColor [in, out] **diffuseColor** 0.8 0.8 0.8 <small>[0,1]</small>

How much direct, angle-dependent light is reflected from all light sources.

#### Hints

- Only emissiveColor affects IndexedLineSet, LineSet and PointSet. If a texture is present the diffuseColor is always multiplied with the texture color, in contrast to the specification. Set diffuseColor to (1 1 1) to get maximum texture color intensity.

### SFString [in, out] **diffuseTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying diffuseColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include containerField='diffuseTexture'

### SFColor [in, out] **specularColor** 0 0 0 <small>[0,1]</small>

Specular highlights are brightness reflections (example: shiny spots on an apple). Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFString [in, out] **specularTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFNode [in, out] **specularTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying specularColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include containerField='specularTexture'

### SFColor [in, out] **emissiveColor** 0 0 0 <small>[0,1]</small>

How much glowing light is emitted from this object.

#### Hints

- EmissiveColors glow even when all lights are off. Reset diffuseColor from default (.8 .8 .8) to (0 0 0) to avoid washout. Only emissiveColor affects IndexedLineSet, LineSet and PointSet.

#### Warning

- Bright emissiveColor values can wash out other colors and some textures.

### SFString [in, out] **emissiveTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFNode [in, out] **emissiveTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include containerField='emissiveTexture'

### SFFloat [in, out] **shininess** 0.2 <small>[0,1]</small>

Lower shininess values provide soft specular glows, while higher values result in sharper, smaller highlights. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFString [in, out] **shininessTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFNode [in, out] *shininessTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying shininess for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include containerField='shininessTexture'

### SFFloat [in, out] **occlusionStrength** 1 <small>[0,1]</small>

occlusionStrength indicates areas of indirect lighting, typically called ambient occlusion. Higher values indicate areas that should receive full indirect lighting and lower values indicate no indirect lighting.

#### Hints

- Only the Red channel of the texture is used for occlusion computations, other channels are ignored.
- https://en.wikipedia.org/wiki/Ambient_occlusion

### SFString [in, out] **occlusionTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFNode [in, out] **occlusionTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying occlusionStrength for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include containerField='occlusionTexture'

### SFFloat [in, out] **normalScale** 1 <small>[0,∞)</small>

normalScale controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.

#### Hints

- normalScale only affects computation of normalTexture modulations that affect lighting of characteristics of the parent Material and has no relation to normal vectors defined by corresponding geometry.
- normalTexture techniques apply Bump mapping https://en.wikipedia.org/wiki/Bump_mapping

### SFString [in, out] **normalTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

### SFNode [in, out] **normalTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying normalScale for this material node, the contained texture modulates the texture across the surface.

#### Hints

- normalTexture techniques apply Bump mapping https://en.wikipedia.org/wiki/Bump_mapping
- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include containerField='normalTexture'

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

How "clear" an object is: 1.0 is completely transparent, 0.0 is completely opaque.

#### Interchange profile hint:

Transparency < .5 opaque, transparency > .5 transparent.

#### Hint

- If a texture is present the transparency is always multiplied with the texture's transparency, in contrast to the specification. Set transparency to (0) to get a full opaque texture color.

## Description

### Hints

- Insert Shape and Appearance nodes before adding material.
- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Shape/Material/Material.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Material](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Material){:target="_blank"}
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}
- [X3D Example Archives, Basic, Universal Media Materials](https://www.web3d.org/x3d/content/examples/Basic/UniversalMediaMaterials){:target="_blank"}
