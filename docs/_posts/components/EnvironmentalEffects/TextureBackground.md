---
title: TextureBackground
date: 2022-01-07
nav: components-EnvironmentalEffects
categories: [components, EnvironmentalEffects]
tags: [TextureBackground, EnvironmentalEffects]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

TextureBackground simulates ground and sky, using vertical arrays of wraparound color values, TextureBackground can also provide backdrop texture images on all six sides.

The TextureBackground node belongs to the **EnvironmentalEffects** component and its default container field is *children.* It is available since X3D version 3.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + X3DBackgroundNode
        + TextureBackground
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_bind**

Input event set_bind=true makes this node active, input event set_bind=false makes this node inactive. Thus setting set_bind true/false will pop/push (enable/disable) this node.

### MFFloat [in, out] **skyAngle** [ ] <small>[0,π]</small>

The angle array values increase from 0.0 zenith (straight up) to π/2=1.570796 (horizon) to π=3.14159 (nadir).

#### Warnings

You must have one more skyColor value than skyAngle values. Colors at skyAngle=0 are ignored. Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFColor [in, out] **skyColor** 0 0 0 <small>[0,1]</small>

Color of the sky at various angles on the sky sphere. First value is color of sky at 0.0 radians representing the zenith (straight up).

#### Hint

Setting the same color at two consecutive angles produces a solid color band.

#### Warning

You must have one more skyColor value than skyAngle values. Interchange profile hint: only one color might be rendered, others can be ignored.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### MFFloat [in, out] **groundAngle** [ ] <small>[0,π/2]</small>

The angle array values increase from 0.0 nadir (straight down) to π/2=1.570796 (horizon).

#### Warnings

You must have one more groundColor value than groundAngle values. Colors at groundAngle=0 are ignored. Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFColor [in, out] **groundColor** [ ] <small>[0,1]</small>

Color of the ground at the various angles on the ground partial sphere. First value is color of ground at 0.0 radians representing the nadir (straight down).

#### Hint

Setting the same color at two consecutive angles produces a solid color band.

#### Warning

You must have one more groundColor value than groundAngle values. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **transparency** <small>[0,1]</small>

Transparency applied to texture images, enabling an X3D scene to overlay an HTML page or desktop.

### SFBool [out] **isBound**

Event true sent when node becomes active, event false sent when unbound by another node.

### SFTime [out] **bindTime**

Event sent when node becomes active/inactive.

### SFNode [in, out] **frontTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>

Input/Output field frontTexture.

### SFNode [in, out] **backTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>

Input/Output field backTexture.

### SFNode [in, out] **leftTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>

Input/Output field leftTexture.

### SFNode [in, out] **rightTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>

Input/Output field rightTexture.

### SFNode [in, out] **topTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>

Input/Output field topTexture.

### SFNode [in, out] **bottomTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>

Input/Output field bottomTexture.

## Description

### Hints

- NavigationInfo, Background, TextureBackground, Fog, OrthoViewpoint and Viewpoint are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- Authors can have LoadSensor nodes receive notification when background texture node(s) are loaded.

Warnings
--------

- Results are undefined if a bindable node (Viewpoint, OrthoViewpoint, NavigationInfo, Fog, Background, TextureBackground) is a contained child of LOD or Switch.
- Child ImageTexture nodes must have unique containerField values for backTexture, bottomTexture, frontTexture, leftTexture, rightTexture, or topTexture.

## Example

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalEffects/TextureBackground/TextureBackground.x3d"></x3d-canvas>

## External Links

- [X3D Specification of TextureBackground](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#TextureBackground){:target="_blank"}
