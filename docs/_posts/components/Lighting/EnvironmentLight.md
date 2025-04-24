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

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFBool \[in, out\] [global](#sfbool-in-out-global-false)
- SFBool \[in, out\] [on](#sfbool-in-out-on-true)
- SFColor \[in, out\] [color](#sfcolor-in-out-color-1-1-1-0-1)
- SFFloat \[in, out\] [intensity](#sffloat-in-out-intensity-1-0)
- SFFloat \[in, out\] [ambientIntensity](#sffloat-in-out-ambientintensity-0-0-1)
- SFRotation \[in, out\] [rotation](#sfrotation-in-out-rotation-0-0-1-0--1-1-or--)
- MFFloat \[in, out\] [diffuseCoefficients](#mffloat-in-out-diffusecoefficients--)
- SFNode \[in, out\] [diffuseTexture](#sfnode-in-out-diffusetexture-null-x3denvironmenttexturenode)
- SFNode \[in, out\] [specularTexture](#sfnode-in-out-speculartexture-null-x3denvironmenttexturenode)
- SFBool \[in, out\] [shadows](#sfbool-in-out-shadows-false)
- SFColor \[in, out\] [shadowColor](#sfcolor-in-out-shadowcolor-0-0-0-0-1-small-classbluenon-standard)
- SFFloat \[in, out\] [shadowIntensity](#sffloat-in-out-shadowintensity-1-0-1)
- SFFloat \[in, out\] [shadowBias](#sffloat-in-out-shadowbias-0005-0-1-small-classbluenon-standard)
- SFInt32 \[ \] [shadowMapSize](#sfint32---shadowmapsize-1024-0-small-classbluenon-standard)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **global** FALSE

Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Warning

- [DirectionalLight](/x_ite/components/lighting/directionallight/) default *global*=false to limit scope and avoid inadvertently illuminating every object in a large scene. [PointLight](/x_ite/components/lighting/pointlight/) and [SpotLight](/x_ite/components/lighting/spotlight/) default *global*=true since their effects are each limited by maximum radius value.

### SFBool [in, out] **on** TRUE

Enables/disables this light source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

*color* of light, applied to colors of objects.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>

Brightness of ambient (nondirectional background) emission from the light. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

Input/Output field *rotation*.

### MFFloat [in, out] **diffuseCoefficients** [ ]

Input/Output field *diffuseCoefficients*.

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DEnvironmentTextureNode]</small>

Input/Output field *diffuseTexture*.

### SFNode [in, out] **specularTexture** NULL <small>[X3DEnvironmentTextureNode]</small>

Input/Output field *specularTexture*.

### SFBool [in, out] **shadows** FALSE

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1]</small> <small class="blue">non-standard</small>

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 1 <small>[0,1]</small>

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1]</small> <small class="blue">non-standard</small>

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞)</small> <small class="blue">non-standard</small>

Size of the shadow map in pixels, must be power of two.

## See Also

- [X3D Specification of EnvironmentLight Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#EnvironmentLight)
