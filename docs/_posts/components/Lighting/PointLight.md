---
title: PointLight
date: 2023-01-07
nav: components-Lighting
categories: [components, Lighting]
tags: [PointLight, Lighting]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

PointLight is a single light source that illuminates outwards in all directions. Lighting illuminates all geometry except lines and points. By default, light scope only illuminates peer geometry and children nodes within the scene graph hierarchy. Lights have no visible shape themselves and lighting effects continue through any intermediate geometry.

The PointLight node belongs to the **Lighting** component and requires at least support level **2,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + PointLight
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [in, out] | [global](#field-global) | TRUE |
| SFBool | [in, out] | [on](#field-on) | TRUE |
| SFColor | [in, out] | [color](#field-color) | 1 1 1  |
| SFFloat | [in, out] | [intensity](#field-intensity) | 1  |
| SFFloat | [in, out] | [ambientIntensity](#field-ambientIntensity) | 0  |
| SFVec3f | [in, out] | [attenuation](#field-attenuation) | 1 0 0  |
| SFVec3f | [in, out] | [location](#field-location) | 0 0 0  |
| SFFloat | [in, out] | [radius](#field-radius) | 100  |
| SFBool | [in, out] | [shadows](#field-shadows) | FALSE |
| SFColor | [in, out] | [shadowColor](#field-shadowColor) | 0 0 0  |
| SFFloat | [in, out] | [shadowIntensity](#field-shadowIntensity) | 1  |
| SFFloat | [in, out] | [shadowBias](#field-shadowBias) | 0 |
| SFInt32 | [ ] | [shadowMapSize](#field-shadowMapSize) | 1024  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **global** TRUE
{: #field-global }

Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Warning

- [DirectionalLight](/x_ite/components/lighting/directionallight/) default *global*=false to limit scope and avoid inadvertently illuminating every object in a large scene. PointLight and [SpotLight](/x_ite/components/lighting/spotlight/) default *global*=true since their effects are each limited by maximum radius value.

### SFBool [in, out] **on** TRUE
{: #field-on }

Enables/disables this light source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>
{: #field-color }

*color* of light, applied to colors of objects.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>
{: #field-intensity }

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>
{: #field-ambientIntensity }

Brightness of ambient (nondirectional background) emission from the light.

### SFVec3f [in, out] **attenuation** 1 0 0 <small>[0,∞)</small>
{: #field-attenuation }

Constant, linear-distance and squared-distance dropoff factors as radial distance increases from the source.

#### Hint

- *attenuation* = 1/max(*attenuation*[0] + *attenuation*[1] ⨯ r + *attenuation*[2] ⨯ r2 , 1)

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>
{: #field-location }

Position of light relative to local coordinate system.

### SFFloat [in, out] **radius** 100 <small>[0,∞)</small>
{: #field-radius }

Maximum effective distance of light relative to local light position, affected by ancestor scaling.

### SFBool [in, out] **shadows** FALSE
{: #field-shadows }

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1]</small> <small class="blue">non-standard</small>
{: #field-shadowColor }

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 1 <small>[0,1]</small>
{: #field-shadowIntensity }

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1]</small> <small class="blue">non-standard</small>
{: #field-shadowBias }

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞)</small> <small class="blue">non-standard</small>
{: #field-shadowMapSize }

Size of the shadow map in pixels, must be power of two.

## Advice

### Hint

- The bound [NavigationInfo](/x_ite/components/navigation/navigationinfo/) controls whether headlight is enabled on/off.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/Lighting/PointLight/PointLight.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/Lighting/PointLight/screenshot.avif" alt="PointLight"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/Lighting/PointLight/PointLight.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/Lighting/PointLight/PointLight.x3d)
{: .example-links }

## See Also

- [X3D Specification of PointLight Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#PointLight)
