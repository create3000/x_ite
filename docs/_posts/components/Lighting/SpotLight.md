---
title: SpotLight
date: 2023-01-07
nav: components-Lighting
categories: [components, Lighting]
tags: [SpotLight, Lighting]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SpotLight is a light source that illuminates geometry within a conical beam. Lighting illuminates all geometry except lines and points. By default, light scope only illuminates peer geometry and children nodes within the scene graph hierarchy. Lights have no visible shape themselves and lighting effects continue through any intermediate geometry.

The SpotLight node belongs to the [Lighting](/x_ite/components/overview/#lighting) component and requires at least support level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + SpotLight
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in, out] | [global](#fields-global) | TRUE |
| SFBool | [in, out] | [on](#fields-on) | TRUE |
| SFColor | [in, out] | [color](#fields-color) | 1 1 1  |
| SFFloat | [in, out] | [intensity](#fields-intensity) | 1  |
| SFFloat | [in, out] | [ambientIntensity](#fields-ambientIntensity) | 0  |
| SFVec3f | [in, out] | [attenuation](#fields-attenuation) | 1 0 0  |
| SFVec3f | [in, out] | [location](#fields-location) | 0 0 0  |
| SFVec3f | [in, out] | [direction](#fields-direction) | 0 0 -1  |
| SFFloat | [in, out] | [radius](#fields-radius) | 100  |
| SFFloat | [in, out] | [beamWidth](#fields-beamWidth) | π |
| SFFloat | [in, out] | [cutOffAngle](#fields-cutOffAngle) | π/2  |
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

### SFBool [in, out] **global** TRUE
{: #fields-global }

Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Warning

- [DirectionalLight](/x_ite/components/lighting/directionallight/) default *global*=false to limit scope and avoid inadvertently illuminating every object in a large scene. [PointLight](/x_ite/components/lighting/pointlight/) and SpotLight default *global*=true since their effects are each limited by maximum radius value.

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

### SFVec3f [in, out] **attenuation** 1 0 0 <small>[0,∞)</small>
{: #fields-attenuation }

Constant, linear-distance and squared-distance dropoff factors as radial distance increases from the source.

#### Hint

- *attenuation* = 1/max(*attenuation*[0] + *attenuation*[1] ⨯ r + *attenuation*[2] ⨯ r2 , 1)

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>
{: #fields-location }

Position of light relative to local coordinate system.

### SFVec3f [in, out] **direction** 0 0 -1 <small>(-∞,∞)</small>
{: #fields-direction }

Orientation vector of light relative to local coordinate system.

### SFFloat [in, out] **radius** 100 <small>[0,∞)</small>
{: #fields-radius }

Maximum effective distance of light relative to local light position, affected by ancestor scaling.

### SFFloat [in, out] **beamWidth** π*3/16 <small>(0,π/2]</small>
{: #fields-beamWidth }

Inner conical solid angle (in radians) where light source has uniform full intensity.

#### Hints

- *beamWidth* is inner angle of full intensity, cutOffAngle is outer angle of zero intensity. Therefore set *beamWidth* \<= cutOffAngle.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- If *beamWidth* \> cutOffAngle, then *beamWidth* is reset to equal cutOffAngle.

### SFFloat [in, out] **cutOffAngle** π/2 <small>(0,π/2]</small>
{: #fields-cutOffAngle }

Outer conical solid angle (in radians) where light source intensity becomes zero.

#### Hints

- BeamWidth is inner angle of full intensity, *cutOffAngle* is outer angle of zero intensity. Therefore set beamWidth \<= *cutOffAngle*.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warning

- If beamWidth \> *cutOffAngle*, then beamWidth is reset to equal *cutOffAngle*.

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

### Hint

- The bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) controls whether headlight is enabled on/off.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Lighting/SpotLight/SpotLight.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Lighting/SpotLight/screenshot.avif" alt="SpotLight"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Lighting/SpotLight/SpotLight.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Lighting/SpotLight/SpotLight.x3d)
{: .example-links }

## See Also

- [X3D Specification of SpotLight Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#SpotLight)
