---
title: SpotLight
date: 2022-01-07
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

SpotLight is a light source that illuminates geometry within a conical beam. Light illuminates all geometry and is normally scoped to illuminate peers and children nodes within the scene graph hierarchy Lights have no visible shape themselves and shine through occluding geometry.

The SpotLight node belongs to the **Lighting** component and its container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + SpotLight
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **global** TRUE

Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

### SFBool [in, out] **on** TRUE

Enables/disables this light source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

Color of light, applied to colors of objects.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **intensity** 1 <small>[0,1]</small>

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** <small>[0,1]</small>

Brightness of ambient (nondirectional background) emission from the light.

### SFVec3f [in, out] **attenuation** 1 0 0 <small>[0,∞)</small>

Constant, linear-distance and squared-distance dropoff factors.

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>

Position of light relative to local coordinate system.

### SFVec3f [in, out] **direction** 0 0 -1 <small>(-∞,∞)</small>

Orientation vector of light relative to local coordinate system.

### SFFloat [in, out] **radius** 100 <small>[0,∞)</small>

Maximum effective distance of light relative to local light position, affected by ancestor scaling.

### SFFloat [in, out] **beamWidth** 0.7854 <small>(0,π/2]</small>

Inner conical solid angle (in radians) where light source has uniform full intensity.

#### Hint

BeamWidth is inner angle of full intensity, cutOffAngle is outer angle of zero intensity. Therefore set beamWidth `<= cutOffAngle.

#### Warning

If beamWidth >` cutOffAngle, then beamWidth reset to equal cutOffAngle.

### SFFloat [in, out] **cutOffAngle** 1.5708 <small>(0,π/2]</small>

Outer conical solid angle (in radians) where light source intensity becomes zero.

#### Hint

BeamWidth is inner angle of full intensity, cutOffAngle is outer angle of zero intensity. Therefore set beamWidth `<= cutOffAngle.

#### Warning

If beamWidth >` cutOffAngle, then beamWidth reset to equal cutOffAngle.

### SFColor [in, out] **shadowColor** 0 0 0 <small class="small">[0,1]</small>

Color of shadow, applied to colors of objects.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **shadowIntensity** 0 <small class="small">[0,1]</small>  

Intensity of shadow.

### SFFloat [in, out] **shadowBias** 0.005 <small class="small">[0,1]</small>  

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small class="small">[0,∞)</small>

Size of the shadow map in pixels, must be power of two.

## Description

### Hint

- HeadLight enabled on/off is controlled by NavigationInfo.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/Lighting/SpotLight/SpotLight.x3d"></x3d-canvas>

## External Links

- [X3D Specification of SpotLight](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#SpotLight){:target="_blank"}
