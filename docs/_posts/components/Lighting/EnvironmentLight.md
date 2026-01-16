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

Environment maps can represent incident illumination at a point, and can be used to show reflections of distant objects. The EnvironmentLight node supports Image Based Lighting (IBL) techniques by specifying light-source intensity around a given location (i.e., the environment) as a cube map. EnvironmentLight defines both specular radiance and diffuse irradiance, converting an environment map into an irradiance map that shows how much light comes from any particular direction.

The EnvironmentLight node belongs to the [Lighting](/x_ite/components/overview/#lighting) component and requires at least support level **3,** its default container field is *children.* It is available from X3D version 4.1 or higher.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in future versions of X_ITE.
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
| SFVec3f | [in, out] | [origin](#fields-origin) | 0 0 0  |
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

*global* field affects the scope of lighting effects produced by the EnvironmentLight node, and has no effect on the computation of environment textures. Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

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

Brightness of ambient (nondirectional background) emission from the light.

#### Hint

- In Interchange profile this field may be ignored, applying the default value regardless.

### SFVec3f [in, out] **origin** 0 0 0 <small>(-∞,∞)</small>
{: #fields-origin }

*origin* defines the relative position for observing the surrounding scene to create an environment texture. Input illumination to the EnvironmentLight node reflects all scene illumination visible at the node *origin*.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>
{: #fields-rotation }

Single *rotation* angle of texture about center (opposite effect appears on geometry).

#### Warning

- Use a single radian angle value, not a 4-tuple Rotation.

### MFFloat [in, out] **diffuseCoefficients** [ ]
{: #fields-diffuseCoefficients }

*diffuseCoefficients* field provides a 3 x 9 array of float values providing spherical harmonic coefficients for low-frequency characteristics of the environment map to produce an irradiance map corresponding to glTF irradianceCoefficients field.

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DEnvironmentTextureNode]</small>
{: #fields-diffuseTexture }

*diffuseTexture* defines explicit precomputed X3DEnvironmentTextureNode ([ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/), [GeneratedCubeMapTexture](/x_ite/components/cubemaptexturing/generatedcubemaptexture/), [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/)) nodes as the image source for the EnvironmentLight. When applying diffuseColor for this light node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hint

- If texture node is NULL or unspecified, no effect is applied.

#### Warning

- Contained texture node must include `containerField='diffuseTexture'`

### SFNode [in, out] **specularTexture** NULL <small>[X3DEnvironmentTextureNode]</small>
{: #fields-specularTexture }

*specularTexture* defines explicit precomputed X3DEnvironmentTextureNode ([ComposedCubeMapTexture](/x_ite/components/cubemaptexturing/composedcubemaptexture/), [GeneratedCubeMapTexture](/x_ite/components/cubemaptexturing/generatedcubemaptexture/), [ImageCubeMapTexture](/x_ite/components/cubemaptexturing/imagecubemaptexture/)) nodes as the image source for the EnvironmentLight. When applying specularColor for this light node, the contained texture provides Physically Based Rendering (PBR) modulation for each pixel.

#### Hint

- If texture node is NULL or unspecified, no effect is applied.

#### Warning

- Contained texture node must include `containerField='specularTexture'`

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

## Advice

### Hints

- Lights have no visible shape themselves and lighting effects continue through any intermediate geometry.
- The bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) controls whether the user headlight is enabled on/off.
- [Wikipedia Cube mapping](https://en.wikipedia.org/wiki/Cube_mapping)

## See Also

- [X3D Specification of EnvironmentLight Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#EnvironmentLight)
- [glTF Sample Environments](https://github.com/KhronosGroup/glTF-Sample-Environments)
