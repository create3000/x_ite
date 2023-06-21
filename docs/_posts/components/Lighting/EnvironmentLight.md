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

EnvironmentLight ...

The EnvironmentLight node belongs to the **Lighting** component and its default container field is *children.* It is available since X3D version 4.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + EnvironmentLight
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **global** FALSE

*global* lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

### SFBool [in, out] **on** TRUE

Enables/disables this light source.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

*color* of light, applied to colors of objects.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>

Brightness of ambient (nondirectional background) emission from the light.

### MFFloat [in, out] **diffuseCoefficients** [ ]

### SFNode [in, out] **diffuse** NULL <small>[X3DSingleTextureNode]</small>

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DEnvironmentTextureNode]</small>

### SFNode [in, out] **specularTexture** NULL <small>[X3DEnvironmentTextureNode]</small>

### SFBool [in, out] **shadows** FALSE

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1]</small> <small class="yellow">non standard</small>

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 0 <small>[0,1]</small>

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1]</small> <small class="yellow">non standard</small>

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞)</small> <small class="yellow">non standard</small>

Size of the shadow map in pixels, must be power of two.

## External Links

- [X3D Specification of EnvironmentLight](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#EnvironmentLight){:target="_blank"}
