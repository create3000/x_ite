---
title: Material
date: 2023-01-07
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

The Material node belongs to the [Shape](/x_ite/components/overview/#shape) component and requires at least support level **1,** its default container field is *material.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DMaterialNode
      + X3DOneSidedMaterialNode
        + Material
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFFloat | [in, out] | [ambientIntensity](#fields-ambientIntensity) | 0.2  |
| SFString | [in, out] | [ambientTextureMapping](#fields-ambientTextureMapping) | "" |
| SFNode | [in, out] | [ambientTexture](#fields-ambientTexture) | NULL  |
| SFColor | [in, out] | [diffuseColor](#fields-diffuseColor) | 0.8 0.8 0.8  |
| SFString | [in, out] | [diffuseTextureMapping](#fields-diffuseTextureMapping) | "" |
| SFNode | [in, out] | [diffuseTexture](#fields-diffuseTexture) | NULL  |
| SFColor | [in, out] | [specularColor](#fields-specularColor) | 0 0 0  |
| SFString | [in, out] | [specularTextureMapping](#fields-specularTextureMapping) | "" |
| SFNode | [in, out] | [specularTexture](#fields-specularTexture) | NULL  |
| SFColor | [in, out] | [emissiveColor](#fields-emissiveColor) | 0 0 0  |
| SFString | [in, out] | [emissiveTextureMapping](#fields-emissiveTextureMapping) | "" |
| SFNode | [in, out] | [emissiveTexture](#fields-emissiveTexture) | NULL  |
| SFFloat | [in, out] | [shininess](#fields-shininess) | 0.2  |
| SFString | [in, out] | [shininessTextureMapping](#fields-shininessTextureMapping) | "" |
| SFNode | [in, out] | [shininessTexture](#fields-shininessTexture) | NULL  |
| SFFloat | [in, out] | [occlusionStrength](#fields-occlusionStrength) | 1  |
| SFString | [in, out] | [occlusionTextureMapping](#fields-occlusionTextureMapping) | "" |
| SFNode | [in, out] | [occlusionTexture](#fields-occlusionTexture) | NULL  |
| SFFloat | [in, out] | [normalScale](#fields-normalScale) | 1  |
| SFString | [in, out] | [normalTextureMapping](#fields-normalTextureMapping) | "" |
| SFNode | [in, out] | [normalTexture](#fields-normalTexture) | NULL  |
| SFFloat | [in, out] | [transparency](#fields-transparency) | 0  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFFloat [in, out] **ambientIntensity** 0.2 <small>[0,1]</small>
{: #fields-ambientIntensity }

How much ambient omnidirectional light is reflected from all light sources. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFString [in, out] **ambientTextureMapping** ""
{: #fields-ambientTextureMapping }

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **ambientTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-ambientTexture }

When applying ambientIntensity for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='ambientTexture'`

### SFColor [in, out] **diffuseColor** 0.8 0.8 0.8 <small>[0,1]</small>
{: #fields-diffuseColor }

How much direct, angle-dependent light is reflected from all light sources.

#### Hint

- Only emissiveColor affects [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [PointSet](/x_ite/components/rendering/pointset/).

### SFString [in, out] **diffuseTextureMapping** ""
{: #fields-diffuseTextureMapping }

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-diffuseTexture }

When applying diffuseColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='diffuseTexture'`

### SFColor [in, out] **specularColor** 0 0 0 <small>[0,1]</small>
{: #fields-specularColor }

Specular highlights are brightness reflections (example: shiny spots on an apple). Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFString [in, out] **specularTextureMapping** ""
{: #fields-specularTextureMapping }

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **specularTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-specularTexture }

When applying specularColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='specularTexture'`

### SFColor [in, out] **emissiveColor** 0 0 0 <small>[0,1]</small>
{: #fields-emissiveColor }

How much glowing light is emitted from this object.

#### Hints

- EmissiveColors glow even when all lights are off.
- Reset diffuseColor from default (.8 .8 .8) to (0 0 0) to avoid washout.
- Only *emissiveColor* affects [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [PointSet](/x_ite/components/rendering/pointset/).

#### Warning

- Bright *emissiveColor* values can wash out other colors and some textures.

### SFString [in, out] **emissiveTextureMapping** ""
{: #fields-emissiveTextureMapping }

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **emissiveTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-emissiveTexture }

When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='emissiveTexture'`

### SFFloat [in, out] **shininess** 0.2 <small>[0,1]</small>
{: #fields-shininess }

Lower *shininess* values provide soft specular glows, while higher values result in sharper, smaller highlights. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFString [in, out] **shininessTextureMapping** ""
{: #fields-shininessTextureMapping }

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **shininessTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-shininessTexture }

When applying shininess for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='shininessTexture'`

### SFFloat [in, out] **occlusionStrength** 1 <small>[0,1]</small>
{: #fields-occlusionStrength }

*occlusionStrength* indicates areas of indirect lighting, typically called ambient occlusion. Higher values indicate areas that should receive full indirect lighting and lower values indicate no indirect lighting.

#### Hints

- Only the Red channel of the texture is used for occlusion computations, other channels are ignored.
- Https://en.wikipedia.org/wiki/Ambient_occlusion

### SFString [in, out] **occlusionTextureMapping** ""
{: #fields-occlusionTextureMapping }

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **occlusionTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-occlusionTexture }

When applying occlusionStrength for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='occlusionTexture'`

### SFFloat [in, out] **normalScale** 1 <small>[0,∞)</small>
{: #fields-normalScale }

*normalScale* controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.

#### Hints

- *normalScale* only affects computation of normalTexture modulations that affect lighting of characteristics of the parent Material and has no relation to normal vectors defined by corresponding geometry.
- [NormalTexture techniques apply Bump mapping](https://en.wikipedia.org/wiki/Bump_mapping)

### SFString [in, out] **normalTextureMapping** ""
{: #fields-normalTextureMapping }

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **normalTexture** NULL <small>[X3DSingleTextureNode]</small>
{: #fields-normalTexture }

When applying normalScale for this material node, the contained texture modulates the texture across the surface.

#### Hints

- [*normalTexture* techniques apply Bump mapping](https://en.wikipedia.org/wiki/Bump_mapping)
- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='normalTexture'`

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>
{: #fields-transparency }

How "clear" an object is: 1.0 is completely transparent, 0.0 is completely opaque. Interchange profile

#### Hint

- *transparency* \< .5 opaque, *transparency* \> .5 transparent.

## Advice

### Hints

- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding material.
- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)
- [X3D Example Archives, Basic, Universal Media Materials](https://www.web3d.org/x3d/content/examples/Basic/UniversalMediaMaterials)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/lighting.html#Lightingmodel)
- [Rendering](https://en.wikipedia.org/wiki/Rendering_(computer_graphics))
- [3D rendering](https://en.wikipedia.org/wiki/3D_rendering)
- [Physically based rendering (PBR)](https://en.wikipedia.org/wiki/Physically_based_rendering)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Shape/Material/Material.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Shape/Material/screenshot.avif" alt="Material"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Shape/Material/Material.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Shape/Material/Material.x3d)
{: .example-links }

## See Also

- [X3D Specification of Material Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/shape.html#Material)
