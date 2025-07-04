---
title: TextureProjector
date: 2023-01-31
nav: components-TextureProjection
categories: [components, TextureProjection]
tags: [TextureProjection, TextureProjector]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

TextureProjector is similar to a light that projects a texture into the scene, illuminating geometry that intersects the perspective projection volume.

The TextureProjector node belongs to the [TextureProjection](/x_ite/components/overview/#textureprojection) component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + X3DTextureProjectorNode
        + TextureProjector
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFString | [in, out] | [description](#fields-description) | "" |
| SFBool | [in, out] | [global](#fields-global) | TRUE |
| SFBool | [in, out] | [on](#fields-on) | TRUE |
| SFColor | [in, out] | [color](#fields-color) | 1 1 1  |
| SFFloat | [in, out] | [intensity](#fields-intensity) | 1  |
| SFFloat | [in, out] | [ambientIntensity](#fields-ambientIntensity) | 0  |
| SFVec3f | [in, out] | [location](#fields-location) | 0 0 0  |
| SFVec3f | [in, out] | [direction](#fields-direction) | 0 0 1  |
| SFVec3f | [in, out] | [upVector](#fields-upVector) | 0 0 1  |
| SFFloat | [in, out] | [fieldOfView](#fields-fieldOfView) | π/4  |
| SFFloat | [in, out] | [nearDistance](#fields-nearDistance) | -1  |
| SFFloat | [in, out] | [farDistance](#fields-farDistance) | -1  |
| SFFloat | [out] | [aspectRatio](#fields-aspectRatio) |  |
| SFNode | [in, out] | [texture](#fields-texture) | NULL  |
| SFBool | [in, out] | [shadows](#fields-shadows) | FALSE |
| SFColor | [in, out] | [shadowColor](#fields-shadowColor) | 0 0 0  |
| SFFloat | [in, out] | [shadowIntensity](#fields-shadowIntensity) | 1  |
| SFFloat | [in, out] | [shadowBias](#fields-shadowBias) | 0.005  |
| SFInt32 | [ ] | [shadowMapSize](#fields-shadowMapSize) | 1024  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""
{: #fields-description }

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **global** TRUE
{: #fields-global }

Global texture projection illuminates all objects within their volume of influence. Scoped texture projection (*global* false) only illuminates objects within the same transformation hierarchy.

### SFBool [in, out] **on** TRUE
{: #fields-on }

Enables/disables this texture projection source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>
{: #fields-color }

*color* of light, applied to colors of objects.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>
{: #fields-intensity }

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>
{: #fields-ambientIntensity }

Brightness of ambient (nondirectional background) emission from the light. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>
{: #fields-location }

Position of center of texture projection relative to local coordinate system.

### SFVec3f [in, out] **direction** 0 0 1 <small>(-∞,∞)</small>
{: #fields-direction }

Direction for projection.

### SFVec3f [in, out] **upVector** 0 0 1 <small>(-∞,∞)</small>
{: #fields-upVector }

*upVector* describes the roll of the camera by defining which direction is up for camera orientation.

### SFFloat [in, out] **fieldOfView** π/4 <small>(0,π)</small>
{: #fields-fieldOfView }

Preferred minimum viewing angle for this projection in radians, providing minimum height or minimum width (whichever is smaller). Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

#### Warning

- This field differs for [TextureProjectorParallel](/x_ite/components/textureprojection/textureprojectorparallel/) and TextureProjector.

### SFFloat [in, out] **nearDistance** -1 <small>-1 or (0,∞)</small>
{: #fields-nearDistance }

Minimum distance necessary for texture display.

### SFFloat [in, out] **farDistance** -1 <small>-1 or (0,∞)</small>
{: #fields-farDistance }

Maximum distance necessary for texture display.

### SFFloat [out] **aspectRatio**
{: #fields-aspectRatio }

*aspectRatio* is the ratio of width and height that is projected.

### SFNode [in, out] **texture** NULL <small>[X3DTexture2DNode]</small>
{: #fields-texture }

Single contained *texture* node ([ImageTexture](/x_ite/components/texturing/imagetexture/), [MovieTexture](/x_ite/components/texturing/movietexture/), [PixelTexture](/x_ite/components/texturing/pixeltexture/), [MultiTexture](/x_ite/components/texturing/multitexture/)) that maps image(s) to surface geometry.

#### Hints

- If *texture* node is NULL or unspecified, corresponding [Shape](/x_ite/components/shape/shape/) geometry for this [Appearance](/x_ite/components/shape/appearance/) is not textured.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- [X3D Architecture 18 Texturing component](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html)
- [X3D Architecture 33 Texturing3D component](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texture3D.html)

### SFBool [in, out] **shadows** FALSE
{: #fields-shadows }

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1]</small> <small class="blue">non-standard</small>
{: #fields-shadowColor }

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 1 <small>[0,1]</small>
{: #fields-shadowIntensity }

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1]</small> <small class="blue">non-standard</small>
{: #fields-shadowBias }

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞)</small> <small class="blue">non-standard</small>
{: #fields-shadowMapSize }

Size of the shadow map in pixels, must be power of two.

#### Hints

- If *texture* node is NULL or unspecified, corresponding Shape geometry for this Appearance is not textured.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- [X3D Architecture 18 Texturing component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/texturing.html)
- [X3D Architecture 33 Texturing3D component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/texture3D.html)

## Advice

### Hints

- [Specification errata corrections](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4.1-CD/Part01/components/textureProjection.html#TextureProjector)
- [Diagram](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4.1-CD/Images/ptmperspective2.png)

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/TextureProjection/TextureProjector/TextureProjector.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/TextureProjection/TextureProjector/screenshot.avif" alt="TextureProjector"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/TextureProjection/TextureProjector/TextureProjector.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/TextureProjection/TextureProjector/TextureProjector.x3d)
{: .example-links }

## See Also

- [X3D Specification of TextureProjector Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/textureprojector.html#TextureProjector)
