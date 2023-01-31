---
title: Fog
date: 2022-01-07
nav: components-EnvironmentalEffects
categories: [components, EnvironmentalEffects]
tags: [Fog, EnvironmentalEffects]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Fog simulates atmospheric effects by blending distant objects with fog color.

The Fog node belongs to the **EnvironmentalEffects** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + Fog (X3DFogObject)*
```

<small>\* Derived from multiple interfaces.</small>

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_bind**

Setting set_bind true makes this node active setting set_bind false makes this node inactive. Thus setting set_bind true/false will pop/push (enable/disable) this node.

### SFString [in, out] **fogType** "LINEAR" <small>["LINEAR"|"EXPONENTIAL"]</small>

Specifies algorithm for rate of increasing Fog, either LINEAR or EXPONENTIAL.

#### Hint

EXPONENTIAL is more natural but also more computationally expensive.

#### Warning

Do not wrap extra quotation marks around these SFString enumeration values, since "quotation" "marks" are only used for MFString values.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

Fog color.

#### Hint

Match Background color to make objects fade away.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **visibilityRange** <small>[0,∞)</small>

Distance in meters where objects are totally obscured by the fog, using local coordinate system.

#### Hint

VisibilityRange 0 disables Fog.

### SFBool [out] **isBound**

Event true sent when node becomes active, event false sent when unbound by another node.

### SFTime [out] **bindTime**

Event sent when node becomes active/inactive.

## Description

### Hint

- NavigationInfo, Background, TextureBackground, Fog, OrthoViewpoint and Viewpoint are bindable nodes, meaning that no more than one of each node type can be active at a given time.

### Warning

- Results are undefined if a bindable node (Viewpoint, OrthoViewpoint, NavigationInfo, Fog, Background, TextureBackground) is a contained child of LOD or Switch.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalEffects/Fog/Fog.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Fog](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#Fog){:target="_blank"}
