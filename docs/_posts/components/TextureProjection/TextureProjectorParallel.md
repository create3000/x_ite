---
title: TextureProjectorParallel
date: 2023-01-31
nav: components-TextureProjection
categories: [components, TextureProjection]
tags: [TextureProjectorParallel, TextureProjection]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

TextureProjectorParallel is similar to a light that projects a texture into the scene, illuminating geometry that intersects the parallel projection volume.

The TextureProjectorParallel node belongs to the **TextureProjection** component and requires at least support level **2,** its default container field is *children.* It is available from X3D version 4.0 or higher.

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + X3DTextureProjectorNode
        + TextureProjectorParallel
```

## Fields

- SFNode \[in, out\] [metadata](#sfnode-in-out-metadata-null-x3dmetadataobject)
- SFString \[in, out\] [description](#sfstring-in-out-description-)
- SFBool \[in, out\] [global](#sfbool-in-out-global-true)
- SFBool \[in, out\] [on](#sfbool-in-out-on-true)
- SFColor \[in, out\] [color](#sfcolor-in-out-color-1-1-1-0-1)
- SFFloat \[in, out\] [intensity](#sffloat-in-out-intensity-1-0)
- SFFloat \[in, out\] [ambientIntensity](#sffloat-in-out-ambientintensity-0-0-1)
- SFVec3f \[in, out\] [location](#sfvec3f-in-out-location-0-0-0--)
- SFVec3f \[in, out\] [direction](#sfvec3f-in-out-direction-0-0-1--)
- SFVec3f \[in, out\] [upVector](#sfvec3f-in-out-upvector-0-0-1--)
- SFVec4f \[in, out\] [fieldOfView](#sfvec4f-in-out-fieldofview--1--1-1-1--)
- SFFloat \[in, out\] [nearDistance](#sffloat-in-out-neardistance--1--1-or-0)
- SFFloat \[in, out\] [farDistance](#sffloat-in-out-fardistance--1--1-or-0)
- SFFloat \[out\] [aspectRatio](#sffloat-out-aspectratio)
- SFNode \[in, out\] [texture](#sfnode-in-out-texture-null-x3dtexture2dnode)
- SFBool \[in, out\] [shadows](#sfbool-in-out-shadows-false)
- SFColor \[in, out\] [shadowColor](#sfcolor-in-out-shadowcolor-0-0-0-0-1-small-classbluenon-standard)
- SFFloat \[in, out\] [shadowIntensity](#sffloat-in-out-shadowintensity-1-0-1)
- SFFloat \[in, out\] [shadowBias](#sffloat-in-out-shadowbias-0005-0-1-small-classbluenon-standard)
- SFInt32 \[ \] [shadowMapSize](#sfint32---shadowmapsize-1024-0-small-classbluenon-standard)

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFString [in, out] **description** ""

Author-provided prose that describes intended purpose of the url asset.

#### Hint

- Many XML tools substitute XML character references for special characters automatically if needed within an attribute value (such as &amp;#38; for &amp; ampersand character, or &amp;#34; for " quotation-mark character).

### SFBool [in, out] **global** TRUE

Global texture projection illuminates all objects within their volume of influence. Scoped texture projection (*global* false) only illuminates objects within the same transformation hierarchy.

### SFBool [in, out] **on** TRUE

Enables/disables this texture projection source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

*color* of light, applied to colors of objects.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>

Brightness of ambient (nondirectional background) emission from the light. Interchange profile

#### Hint

- This field may be ignored, applying the default value regardless.

### SFVec3f [in, out] **location** 0 0 0 <small>(-∞,∞)</small>

Position of center of texture projection relative to local coordinate system.

### SFVec3f [in, out] **direction** 0 0 1 <small>(-∞,∞)</small>

Direction for projection.

### SFVec3f [in, out] **upVector** 0 0 1 <small>(-∞,∞)</small>

*upVector* describes the roll of the camera by defining which direction is up for camera orientation.

### SFVec4f [in, out] **fieldOfView** -1 -1 1 1 <small>(-∞,∞)</small>

Minimum and maximum extents of projection texture in units of local coordinate system. Small field of view roughly corresponds to a telephoto lens, large field of view roughly corresponds to a wide-angle lens.

#### Hint

- Rectangular display width/height = (maxX-minX) / (maxY-minY).

#### Warnings

- Minimum corner values must remain less than maximum corner values.
- This field differs for TextureProjectorParallel and [TextureProjector](/x_ite/components/textureprojection/textureprojector/).

### SFFloat [in, out] **nearDistance** -1 <small>-1 or (0,∞)</small>

Minimum distance necessary for texture display.

### SFFloat [in, out] **farDistance** -1 <small>-1 or (0,∞)</small>

Maximum distance necessary for texture display.

### SFFloat [out] **aspectRatio**

*aspectRatio* is the ratio of width and height that is projected.

### SFNode [in, out] **texture** NULL <small>[X3DTexture2DNode]</small>

Single contained *texture* node ([ImageTexture](/x_ite/components/texturing/imagetexture/), [MovieTexture](/x_ite/components/texturing/movietexture/), [PixelTexture](/x_ite/components/texturing/pixeltexture/), [MultiTexture](/x_ite/components/texturing/multitexture/)) that maps image(s) to surface geometry.

#### Hints

- If *texture* node is NULL or unspecified, corresponding [Shape](/x_ite/components/shape/shape/) geometry for this [Appearance](/x_ite/components/shape/appearance/) is not textured.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- [X3D Architecture 18 Texturing component](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texturing.html)
- [X3D Architecture 33 Texturing3D component](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/texture3D.html)

### SFBool [in, out] **shadows** FALSE

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1]</small> <small class="blue">non-standard</small>

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 1 <small>[0,1]</small>

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1]</small> <small class="blue">non-standard</small>

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞)</small> <small class="blue">non-standard</small>

Size of the shadow map in pixels, must be power of two.

#### Hints

- If *texture* node is NULL or unspecified, corresponding Shape geometry for this Appearance is not textured.
- [X3D Scene Authoring Hints, Images](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Images)
- [X3D Architecture 18 Texturing component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/texturing.html)
- [X3D Architecture 33 Texturing3D component](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/texture3D.html)

## Advice

### Hints

- [Specification errata corrections](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4.1-CD/Part01/components/textureProjection.html#TextureProjectorParallel)
- [Diagram](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4.1-CD/Images/ptmparallel2.png)

## See Also

- [X3D Specification of TextureProjectorParallel Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/textureprojector.html#TextureProjectorParallel)
