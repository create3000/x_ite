---
title: Background
date: 2022-01-07
nav: components-EnvironmentalEffects
categories: [components, EnvironmentalEffects]
tags: [Background, EnvironmentalEffects]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

Background simulates ground and sky, using vertical arrays of wraparound color values, Background can also provide backdrop textures on all six sides.

The Background node belongs to the **EnvironmentalEffects** component and its default container field is *children.* It is available since X3D version 2.0 or later.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + X3DBackgroundNode
        + Background
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Metadata are not part of the X3D world and not interpreted by the X3D browser, but they can be accessed via the ECMAScript interface.

### SFBool [in] **set_bind**

Input event set_bind=true makes this node active, input event set_bind=false makes this node inactive. Thus setting set_bind true/false will pop/push (enable/disable) this node.

### MFString [in, out] **frontUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

### MFString [in, out] **backUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

### MFString [in, out] **leftUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

### MFString [in, out] **rightUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

### MFString [in, out] **topUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

### MFString [in, out] **bottomUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc." XML encoding for quotation mark " is &amp;quot; (which is called a character entity). Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https and other operating systems are not.

### MFFloat [in, out] **skyAngle** [ ] <small>[0,π]</small>

The angle array values increase from 0.0 zenith (straight up) to π/2=1.570796 (horizon) to π=3.14159 (nadir).

#### Warnings

- You must have one more skyColor value than skyAngle values. Colors at skyAngle=0 are ignored. Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFColor [in, out] **skyColor** 0 0 0 <small>[0,1]</small>

Color of the sky at various angles on the sky sphere. First value is color of sky at 0.0 radians representing the zenith (straight up).

#### Hint

- Setting the same color at two consecutive angles produces a solid color band.

#### Warning

- You must have one more skyColor value than skyAngle values. Interchange profile hint: only one color might be rendered, others can be ignored.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### MFFloat [in, out] **groundAngle** [ ] <small>[0,π/2]</small>

The angle array values increase from 0.0 nadir (straight down) to π/2=1.570796 (horizon).

#### Warnings

- You must have one more groundColor value than groundAngle values. Colors at groundAngle=0 are ignored. Interchange profile hint: this field may be ignored, applying the default value regardless.

### MFColor [in, out] **groundColor** [ ] <small>[0,1]</small>

Color of the ground at the various angles on the ground partial sphere. First value is color of ground at 0.0 radians representing the nadir (straight down).

#### Hint

- Setting the same color at two consecutive angles produces a solid color band.

#### Warning

- You must have one more groundColor value than groundAngle values. Interchange profile hint: this field may be ignored, applying the default value regardless.

#### See Also

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

How "clear" the background is, allows underlying page to show through: 1.0 is completely transparent, 0.0 is completely opaque. Interchange profile hint: transparency < .5 opaque, transparency > .5 transparent.

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

<x3d-canvas src="https://create3000.github.io/media/examples/EnvironmentalEffects/Background/Background.x3d"></x3d-canvas>

## External Links

- [X3D Specification of Background](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#Background){:target="_blank"}
- [X3D Example Archives, Basic, Universal Media Panoramas](https://www.web3d.org/x3d/content/examples/Basic/UniversalMediaPanoramas){:target="_blank"}
