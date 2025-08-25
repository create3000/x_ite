---
title: TextureBackground
date: 2023-01-07
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

The TextureBackground node belongs to the [EnvironmentalEffects](/x_ite/components/overview/#environmentaleffects) component and requires at least support level **3,** its default container field is *children.* It is available from X3D version 3.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DBindableNode
      + X3DBackgroundNode
        + TextureBackground
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in] | [set_bind](#fields-set_bind) |  |
| MFFloat | [in, out] | [skyAngle](#fields-skyAngle) | [ ] |
| MFColor | [in, out] | [skyColor](#fields-skyColor) | 0 0 0  |
| MFFloat | [in, out] | [groundAngle](#fields-groundAngle) | [ ] |
| MFColor | [in, out] | [groundColor](#fields-groundColor) | [ ] |
| SFFloat | [in, out] | [transparency](#fields-transparency) | 0  |
| SFBool | [out] | [isBound](#fields-isBound) |  |
| SFTime | [out] | [bindTime](#fields-bindTime) |  |
| SFNode | [in, out] | [frontTexture](#fields-frontTexture) | NULL  |
| SFNode | [in, out] | [backTexture](#fields-backTexture) | NULL  |
| SFNode | [in, out] | [leftTexture](#fields-leftTexture) | NULL  |
| SFNode | [in, out] | [rightTexture](#fields-rightTexture) | NULL  |
| SFNode | [in, out] | [topTexture](#fields-topTexture) | NULL  |
| SFNode | [in, out] | [bottomTexture](#fields-bottomTexture) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in] **set_bind**
{: #fields-set_bind }

Input event *set_bind*=true makes this node active, input event *set_bind*=false makes this node inactive. Thus setting *set_bind* true/false will pop/push (enable/disable) this node.

#### Hint

- Paired node operations can be established by connecting *set_bind* and isBound fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient inputOnly field in an X3D file, instead only use it a destination for ROUTE events.

### MFFloat [in, out] **skyAngle** [ ] <small>[0,π]</small>
{: #fields-skyAngle }

The angle array values increase from 0.0 zenith (straight up) to π/2=1.570796 (horizon) to π=3.14159 (nadir).

#### Hints

- This field may be ignored, applying the default value regardless.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warnings

- You must have one more skyColor value than *skyAngle* values.
- Colors at *skyAngle*=0 are ignored. Interchange profile

### MFColor [in, out] **skyColor** 0 0 0 <small>[0,1]</small>
{: #fields-skyColor }

[Color](/x_ite/components/rendering/color/) of the sky at various angles on the sky sphere. First value is color of sky at 0.0 radians representing the zenith (straight up).

#### Hints

- Setting the same color at two consecutive angles produces a solid color band.
- Only one color might be rendered, others can be ignored.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warning

- You must have one more *skyColor* value than skyAngle values. Interchange profile

### MFFloat [in, out] **groundAngle** [ ] <small>[0,π/2]</small>
{: #fields-groundAngle }

The angle array values increase from 0.0 nadir (straight down) to π/2=1.570796 (horizon).

#### Hints

- This field may be ignored, applying the default value regardless.
- [Radian units for angular measure](https://en.wikipedia.org/wiki/Radian)

#### Warnings

- You must have one more groundColor value than *groundAngle* values.
- Colors at *groundAngle*=0 are ignored. Interchange profile

### MFColor [in, out] **groundColor** [ ] <small>[0,1]</small>
{: #fields-groundColor }

[Color](/x_ite/components/rendering/color/) of the ground at the various angles on the ground partial sphere. First value is color of ground at 0.0 radians representing the nadir (straight down).

#### Hints

- Setting the same color at two consecutive angles produces a solid color band.
- This field may be ignored, applying the default value regardless.
- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

#### Warning

- You must have one more *groundColor* value than groundAngle values. Interchange profile

### SFFloat [in, out] **transparency** 0 <small>[0,1]</small>
{: #fields-transparency }

*transparency* applied to texture images, enabling an X3D scene to overlay an HTML page or desktop.

### SFBool [out] **isBound**
{: #fields-isBound }

Event true sent when node becomes active, event false sent when unbound by another node.

#### Hint

- Paired node operations can be established by connecting set_bind and *isBound* fields of corresponding bindable nodes.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFTime [out] **bindTime**
{: #fields-bindTime }

Event sent when node becomes active/inactive.

#### Warning

- It is an error to define this transient outputOnly field in an X3D file, instead only use it a source for ROUTE events.

### SFNode [in, out] **frontTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>
{: #fields-frontTexture }

Parent TextureBackground element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/) [MultiTexture](/x_ite/components/texturing/multitexture/)).

#### Warning

- Each child image node must have a different containerField value.

### SFNode [in, out] **backTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>
{: #fields-backTexture }

Parent TextureBackground element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/) [MultiTexture](/x_ite/components/texturing/multitexture/)).

#### Warning

- Each child image node must have a different containerField value.

### SFNode [in, out] **leftTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>
{: #fields-leftTexture }

Parent TextureBackground element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/) [MultiTexture](/x_ite/components/texturing/multitexture/)).

#### Warning

- Each child image node must have a different containerField value.

### SFNode [in, out] **rightTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>
{: #fields-rightTexture }

Parent TextureBackground element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/) [MultiTexture](/x_ite/components/texturing/multitexture/)).

#### Warning

- Each child image node must have a different containerField value.

### SFNode [in, out] **topTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>
{: #fields-topTexture }

Parent TextureBackground element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/) [MultiTexture](/x_ite/components/texturing/multitexture/)).

#### Warning

- Each child image node must have a different containerField value.

### SFNode [in, out] **bottomTexture** NULL <small>[X3DTexture2DNode,MultiTexture]</small>
{: #fields-bottomTexture }

Parent TextureBackground element can contain up to six image nodes ([ImageTexture](/x_ite/components/texturing/imagetexture/) [PixelTexture](/x_ite/components/texturing/pixeltexture/) [MovieTexture](/x_ite/components/texturing/movietexture/) [MultiTexture](/x_ite/components/texturing/multitexture/)).

#### Warning

- Each child image node must have a different containerField value.

## Advice

### Hints

- [Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [GeoViewpoint](/x_ite/components/geospatial/geoviewpoint/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), TextureBackground and [Viewpoint](/x_ite/components/navigation/viewpoint/) are bindable nodes, meaning that no more than one of each node type can be active at a given time.
- Authors can have [LoadSensor](/x_ite/components/networking/loadsensor/) nodes receive notifications and send reporting events when background texture node(s) are loaded.

### Warnings

- Results are undefined if a bindable node ([Background](/x_ite/components/environmentaleffects/background/), [Fog](/x_ite/components/environmentaleffects/fog/), [NavigationInfo](/x_ite/components/navigation/navigationinfo/), [OrthoViewpoint](/x_ite/components/navigation/orthoviewpoint/), TextureBackground, [Viewpoint](/x_ite/components/navigation/viewpoint/)) is a contained descendant node of either [LOD](/x_ite/components/navigation/lod/) or [Switch](/x_ite/components/grouping/switch/). Avoid this authoring pattern.
- Each of the child [ImageTexture](/x_ite/components/texturing/imagetexture/) or [PixelTexture](/x_ite/components/texturing/pixeltexture/) nodes must have unique containerField values for backTexture, bottomTexture, frontTexture, leftTexture, rightTexture, or topTexture.

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/EnvironmentalEffects/TextureBackground/TextureBackground.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/EnvironmentalEffects/TextureBackground/screenshot.avif" alt="TextureBackground"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/EnvironmentalEffects/TextureBackground/TextureBackground.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/EnvironmentalEffects/TextureBackground/TextureBackground.x3d)
{: .example-links }

## See Also

- [X3D Specification of TextureBackground Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/environmentalEffects.html#TextureBackground)
