---
title: SpecularGlossinessMaterial
date: 2023-01-31
nav: components-Shape
categories: [components, X_ITE]
tags: [SpecularGlossinessMaterial, X_ITE]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

SpecularGlossinessMaterial specifies surface rendering properties for associated geometry nodes. Material attributes are used by the X3D lighting equations during rendering.

The SpecularGlossinessMaterial node belongs to the **X_ITE** component and requires at least support level **1,** its default container field is *material.* It is available from X3D version 4.0 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
{: .prompt-info }

>**Deprecated:** This node is **deprecated** as of X3D version 4.0. Future versions of the standard may remove this node. Please use [PhysicalMaterial](/x_ite/components/shape/physicalmaterial/) instead.
{: .prompt-danger }

## Hierarchy

```
+ X3DNode
  + X3DAppearanceChildNode
    + X3DMaterialNode
      + X3DOneSidedMaterialNode
        + SpecularGlossinessMaterial
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFColor [in, out] **diffuseColor** 1 1 1 <small>[0,1]</small>

The reflected diffuse factor of the material.

### SFString [in, out] **diffuseTextureMapping** ""

Input/Output field *diffuseTextureMapping*.

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DSingleTextureNode]</small>

The diffuse texture.

### SFColor [in, out] **specularColor** 1 1 1 <small>[0,1]</small>

The specular RGB color of the material.

### SFFloat [in, out] **glossiness** 1 <small>[0,1]</small>

The glossiness or smoothness of the material.

### SFString [in, out] **specularGlossinessTextureMapping** ""

Input/Output field *specularGlossinessTextureMapping*.

### SFNode [in, out] **specularGlossinessTexture** NULL <small>[X3DSingleTextureNode]</small>

The specular-glossiness texture.

### SFColor [in, out] **emissiveColor** 0 0 0 <small>[0,1]</small>

How much glowing light is emitted from this object.

#### Hints

- EmissiveColors glow even when all lights are off.
- Reset diffuseColor from default (.8 .8 .8) to (0 0 0) to avoid washout.
- Only *emissiveColor* affects [IndexedLineSet](/x_ite/components/rendering/indexedlineset/), [LineSet](/x_ite/components/rendering/lineset/) and [PointSet](/x_ite/components/rendering/pointset/).

#### Warning

- Bright *emissiveColor* values can wash out other colors and some textures.

### SFString [in, out] **emissiveTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **emissiveTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying emissiveColor for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='emissiveTexture'`

### SFFloat [in, out] **occlusionStrength** 1 <small>[0,1]</small>

*occlusionStrength* indicates areas of indirect lighting, typically called ambient occlusion. Higher values indicate areas that should receive full indirect lighting and lower values indicate no indirect lighting.

#### Hints

- Only the Red channel of the texture is used for occlusion computations, other channels are ignored.
- Https://en.wikipedia.org/wiki/Ambient_occlusion

### SFString [in, out] **occlusionTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **occlusionTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying occlusionStrength for this material node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hints

- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='occlusionTexture'`

### SFFloat [in, out] **normalScale** 1 <small>[0,∞)</small>

*normalScale* controls the degree to which normalTexture RGB values apply XYZ-normal bump mapping to pixels in the parent material.

#### Hints

- *normalScale* only affects computation of normalTexture modulations that affect lighting of characteristics of the parent [Material](/x_ite/components/shape/material/) and has no relation to normal vectors defined by corresponding geometry.
- [NormalTexture techniques apply Bump mapping](https://en.wikipedia.org/wiki/Bump_mapping)

### SFString [in, out] **normalTextureMapping** ""

The mapping label identifies which texture coordinates and transformations are used to compute texture effects from corresponding geometry on a given material.

#### Hint

- [TODO support planned to perform multiple-node mapping validation checks using X3D Schematron or X3D Validator](https://savage.nps.edu/X3dValidator)

### SFNode [in, out] **normalTexture** NULL <small>[X3DSingleTextureNode]</small>

When applying normalScale for this material node, the contained texture modulates the texture across the surface.

#### Hints

- [*normalTexture* techniques apply Bump mapping](https://en.wikipedia.org/wiki/Bump_mapping)
- If texture node is NULL or unspecified, no effect is applied to material values.
- Contained texture node must include `containerField='normalTexture'`

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

How "clear" an object is: 1.0 is completely transparent, 0.0 is completely opaque. Interchange profile

#### Hint

- *transparency* \< .5 opaque, *transparency* \> .5 transparent.

### MFNode [in, out] **extensions** [ ] <small>[X3DMaterialExtensionNode]</small> <small class="blue">non-standard</small>

Input/Output field *extensions*.

## Advice

### Hints

- Insert [Shape](/x_ite/components/shape/shape/) and [Appearance](/x_ite/components/shape/appearance/) nodes before adding material.
- DEF/USE copies of a single node can provide a similar "look + feel" style for related shapes in a scene.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)
- [X3D Example Archives, Basic, Universal Media Materials](https://www.web3d.org/x3d/content/examples/Basic/UniversalMediaMaterials)
- [X3D Architecture 17.2.2 Lighting model](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS//Part01/components/lighting.html#Lightingmodel)
- [Rendering](https://en.wikipedia.org/wiki/Rendering_(computer_graphics))
- [3D rendering](https://en.wikipedia.org/wiki/3D_rendering)
- [Physically based rendering (PBR)](https://en.wikipedia.org/wiki/Physically_based_rendering)

## Example

- [View »Spec Gloss Vs Metal Rough« in glTF Sample Viewer](/x_ite/laboratory/gltf-sample-viewer/?url=SpecGlossVsMetalRough)

## See Also

- [Khronos glTF Specification of the KHR_materials_pbrSpecularGlossiness Material](https://kcoley.github.io/glTF/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness/#:~:text=The%20PBR%20specular%2Dglossiness%20extension,materials%20compared%20to%20metallic%2Droughness.)
