---
title: LocalFog
date: 2022-01-07
nav: components-EnvironmentalEffects
categories: [components, EnvironmentalEffects]
tags: [LocalFog, EnvironmentalEffects]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

LocalFog simulates atmospheric effects by blending distant objects with fog color. LocalFog effects occur around the local transformation center, rather than bound to the viewer. The nearest LocalFog node within range takes precedence over other LocalFog and Fog nodes.

The LocalFog node belongs to the **EnvironmentalEffects** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + LocalFog (X3DFogObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFString [in, out] **fogType** "LINEAR" <small>["LINEAR"|"EXPONENTIAL"]</small>

Specifies algorithm for rate of increasing Fog, either LINEAR or EXPONENTIAL.

#### Hint

- EXPONENTIAL is more natural but also more computationally expensive.

#### Warning

- Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

Fog color.

#### Hint

- Match Background color to make objects fade away.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **visibilityRange** 0 <small>[0,-∞)</small>

Distance in meters where objects are totally obscured by the fog, using local coordinate system.

#### Hint

- VisibilityRange 0 disables Fog.

## Description

### Warning

- LocalFog is not a bindable node.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalEffects/LocalFog/LocalFog.x3d" update="auto"></x3d-canvas>

## External Links

- [X3D Specification of LocalFog](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#LocalFog){:target="_blank"}
