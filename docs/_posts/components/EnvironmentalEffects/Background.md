---
title: Background
date: 2023-01-07
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

Background simulates ground and sky, using vertical arrays of wraparound color values. Background can also provide url addresses for backdrop textures on all six sides.

The Background node belongs to the **EnvironmentalEffects** component and requires at least level **1,** its default container field is *children.* It is available since VRML 2.0 and from X3D version 3.0 or higher.

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

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **set_bind**

Input event *set_bind*=true makes this node active, input event *set_bind*=false makes this node inactive. Thus setting *set_bind* true/false will pop/push (enable/disable) this node.

#### Hint

- Paired node operations can be established by connecting *set_bind* and isBound fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFString [in, out] **frontUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile
- This field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https url addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### MFString [in, out] **backUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile
- This field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https url addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### MFString [in, out] **leftUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile
- This field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https url addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### MFString [in, out] **rightUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile
- This field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https url addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### MFString [in, out] **topUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile
- This field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https url addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### MFString [in, out] **bottomUrl** [ ] <small>[URI]</small>

Image background panorama between ground/sky backdrop and scene's geometry.

#### Hints

- MFString arrays can have multiple values, so separate each individual string by quote marks "https://www.web3d.org" "https://www.web3d.org/about" "etc."
- Alternative XML encoding for quotation mark " is &amp;quot; (which is an example of a character entity).
- Can replace embedded blank(s) in url queries with %20 for each blank character. Interchange profile
- This field may be ignored, applying the default value regardless.

#### Warning

- Strictly match directory and filename capitalization for http links! This is important for portability. Some operating systems are forgiving of capitalization mismatches, but http/https url addresses and paths in Unix-based operating systems are all case sensitive and intolerant of uppercase/lowercase mismatches.

### MFFloat [in, out] **skyAngle** [ ] <small>[0,π]</small>

The angle array values increase from 0.0 zenith (straight up) to π/2=1.570796 (horizon) to π=3.14159 (nadir).

#### Hints

- This field may be ignored, applying the default value regardless.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warnings

- You must have one more skyColor value than *skyAngle* values.
- Colors at *skyAngle*=0 are ignored. Interchange profile

### MFColor [in, out] **skyColor** 0 0 0 <small>[0,1]</small>

[Color](/x_ite/components/rendering/color/) of the sky at various angles on the sky sphere. First value is color of sky at 0.0 radians representing the zenith (straight up).

#### Hints

- Setting the same color at two consecutive angles produces a solid color band.
- Only one color might be rendered, others can be ignored.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warning

- You must have one more *skyColor* value than skyAngle values. Interchange profile

### MFFloat [in, out] **groundAngle** [ ] <small>[0,π/2]</small>

The angle array values increase from 0.0 nadir (straight down) to π/2=1.570796 (horizon).

#### Hints

- This field may be ignored, applying the default value regardless.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warnings

- You must have one more groundColor value than *groundAngle* values.
- Colors at *groundAngle*=0 are ignored. Interchange profile

### MFColor [in, out] **groundColor** [ ] <small>[0,1]</small>

[Color](/x_ite/components/rendering/color/) of the ground at the various angles on the ground partial sphere. First value is color of ground at 0.0 radians representing the nadir (straight down).

#### Hints

- Setting the same color at two consecutive angles produces a solid color band.
- This field may be ignored, applying the default value regardless.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warning

- You must have one more *groundColor* value than groundAngle values. Interchange profile

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>

How "clear" the background is, allows underlying page to show through: 1.0 is completely transparent, 0.0 is completely opaque. Interchange profile

#### Hint

- *transparency* \< .5 opaque, *transparency* \> .5 transparent.

### SFBool [out] **isBound**

Event true sent when node becomes active, event false sent when unbound by another node.

#### Hint

- Paired node operations can be established by connecting set_bind and *isBound* fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **bindTime**

Event sent when node becomes active/inactive.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

## Advice

### Hints

- Background, [Fog](/x_ite/components/environmentaleffects/fog/), [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) and [Viewpoint](/x_ite/components/navigation/viewpoint/) are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- Background node is not sensed by [LoadSensor](/x_ite/components/networking/loadsensor/) due to node typing and multiple-image ambiguity, alternatively utilize [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/) node with multiple [ImageTexture](/x_ite/components/texturing/imagetexture/) nodes each referenced inside [LoadSensor](/x_ite/components/networking/loadsensor/).
- [X3D Example Archives, Basic, Universal Media Panoramas](https://www.web3d.org/x3d/content/examples/Basic/UniversalMediaPanoramas)

### Warning

- Results are undefined if a bindable node (Background, [Fog](/x_ite/components/environmentaleffects/fog/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), [TextureBackground](/x_ite/components/environmentaleffects/texturebackground/), [Viewpoint](/x_ite/components/navigation/viewpoint/)) is a contained descendant node of either [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/). Avoid this authoring pattern.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/EnvironmentalEffects/Background/Background.x3d" contentScale="auto" update="auto" xrMovementControl="VIEWER_POSE"></x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/EnvironmentalEffects/Background/Background.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/EnvironmentalEffects/Background/Background.x3d)
{: .example-links }

## See Also

- [X3D Specification of Background Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#Background)
