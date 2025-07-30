---
title: EnvironmentLight
date: 2023-01-31
nav: components-Lighting
categories: [components, Lighting]
tags: [EnvironmentLight, Lighting]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

EnvironmentLight is a light node for [PhysicalMaterial](/x_ite/components/shape/physicalmaterial/) and [SpecularGlossinessMaterial](/x_ite/components/x-ite/specularglossinessmaterial/) nodes.

The EnvironmentLight node belongs to the **Lighting** component and its default container field is *children.* It is available since X3D version 4.0 or later.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE. This node only affects the [PhysicalMaterial](../../shape/physicalmaterial/) and [SpecularGlossinessMaterial](../../x-ite/specularglossinessmaterial/) nodes.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + EnvironmentLight
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in, out] | [global](#fields-global) | FALSE |
| SFBool | [in, out] | [on](#fields-on) | TRUE |
| SFColor | [in, out] | [color](#fields-color) | 1 1 1  |
| SFFloat | [in, out] | [intensity](#fields-intensity) | 1  |
| SFFloat | [in, out] | [ambientIntensity](#fields-ambientIntensity) | 0  |
| SFRotation | [in, out] | [rotation](#fields-rotation) | 0 0 1 0  |
| MFFloat | [in, out] | [diffuseCoefficients](#fields-diffuseCoefficients) | [ ] |
| SFNode | [in, out] | [diffuseTexture](#fields-diffuseTexture) | NULL  |
| SFNode | [in, out] | [specularTexture](#fields-specularTexture) | NULL  |
| SFBool | [in, out] | [shadows](#fields-shadows) | FALSE |
| SFColor | [in, out] | [shadowColor](#fields-shadowColor) | 0 0 0  |
| SFFloat | [in, out] | [shadowIntensity](#fields-shadowIntensity) | 1  |
| SFFloat | [in, out] | [shadowBias](#fields-shadowBias) | 0.005  |
| SFInt32 | [ ] | [shadowMapSize](#fields-shadowMapSize) | 1024  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **global** FALSE
{: #fields-global }

Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Warning

- [DirectionalLight](/x_ite/components/lighting/directionallight/) default *global*=false to limit scope and avoid inadvertently illuminating every object in a large scene. [PointLight](/x_ite/components/lighting/pointlight/) and [SpotLight](/x_ite/components/lighting/spotlight/) default *global*=true since their effects are each limited by maximum radius value.

### SFBool [in, out] **on** TRUE
{: #fields-on }

Enables/disables this light source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>
{: #fields-color }

*color* of light, applied to colors of objects.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>
{: #fields-intensity }

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>
{: #fields-ambientIntensity }

Brightness of ambient (nondirectional background) emission from the light. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-rotation }

Input/Output field *rotation*.

### MFFloat [in, out] **diffuseCoefficients** [ ]
{: #fields-diffuseCoefficients }

Input/Output field *diffuseCoefficients*. Coefficients used during generation of diffuse texture from specular texture.

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DEnvironmentTextureNode]</small>
{: #fields-diffuseTexture }

Input/Output field *diffuseTexture*. If `NULL` the texture is generated from specular texture.

### SFNode [in, out] **specularTexture** NULL <small>[X3DEnvironmentTextureNode]</small>
{: #fields-specularTexture }

Input/Output field *specularTexture*.

#### Hint

- [glTF Sample Environments](https://github.com/KhronosGroup/glTF-Sample-Environments)

### SFBool [in, out] **shadows** FALSE
{: #fields-shadows }

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1]</small> <small class="blue">non-standard</small>
{: #fields-shadowColor }

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 1 <small>[0,1]</small>
{: #fields-shadowIntensity }

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1]</small> <small class="blue">non-standard</small>
{: #fields-shadowBias }

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞)</small> <small class="blue">non-standard</small>
{: #fields-shadowMapSize }

Size of the shadow map in pixels, must be power of two.

## See Also

- [X3D Specification of EnvironmentLight Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#EnvironmentLight)
- [glTF Sample Environments](https://github.com/KhronosGroup/glTF-Sample-Environments)
