---
title: DirectionalLight
date: 2022-01-07
nav: components-Lighting
categories: [components, Lighting]
tags: [DirectionalLight, Lighting]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

DirectionalLight creates parallel light rays to illuminate geometric shapes. Light is scoped and only illuminates geometry within its enclosing parent group! No source location is needed since rays are parallel from an infinitely distant source. DirectionalLight nodes do not attenuate with distance. Lights have no visible shape themselves and shine through occluding geometry.

The DirectionalLight node belongs to the **Lighting** component and its default container field is *children.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + DirectionalLight
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **global** FALSE

*global* lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

### SFBool [in, out] **on** TRUE

Enables/disables this light source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

*color* of light, applied to colors of objects.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>

Brightness of ambient (nondirectional background) emission from the light. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFVec3f [in, out] **direction** 0 0 -1 <small>(-∞,∞)</small>

Orientation vector of light relative to local coordinate system.

#### Hint

- Animate direction to simulate time-of-day sunlight effects.

### SFBool [in, out] **shadows** FALSE

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1] <span class="yellow">non standard</span></small>

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 0 <small>[0,1]</small>

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1] <span class="yellow">non standard</span></small>

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞) <span class="yellow">non standard</span></small>

Size of the shadow map in pixels, must be power of two.

## Description

### Hints

- Animate direction to simulate time-of-day sunlight effects.
- HeadLight enabled on/off is controlled by NavigationInfo.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Lighting/DirectionalLight/DirectionalLight.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of DirectionalLight](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#DirectionalLight){:target="_blank"}
