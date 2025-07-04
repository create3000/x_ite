---
title: EdgeEnhancementVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [EdgeEnhancementVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

EdgeEnhancementVolumeStyle specifies edge enhancement for the volume rendering style.

The EdgeEnhancementVolumeStyle node belongs to the [VolumeRendering](/x_ite/components/overview/#volumerendering) component and requires at least support level **2,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + EdgeEnhancementVolumeStyle
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFColorRGBA | [in, out] | [edgeColor](#fields-edgeColor) | 0 0 0 1  |
| SFFloat | [in, out] | [gradientThreshold](#fields-gradientThreshold) | 0.4  |
| SFNode | [in, out] | [surfaceNormals](#fields-surfaceNormals) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFColorRGBA [in, out] **edgeColor** 0 0 0 1 <small>[0,1]</small>
{: #fields-edgeColor }

[Color](/x_ite/components/rendering/color/) used to highlight edges.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFFloat [in, out] **gradientThreshold** 0.4 <small>[0,π]</small>
{: #fields-gradientThreshold }

Minimum angle (in radians) away from view-direction vector for surface normal before applying enhancement

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>
{: #fields-surfaceNormals }

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Advice

### Hint

- SurfaceNormals can be provided in a single [ComposedTexture3D](/x_ite/components/texturing3d/composedtexture3d/), [ImageTexture3D](/x_ite/components/texturing3d/imagetexture3d/) or [PixelTexture3D](/x_ite/components/texturing3d/pixeltexture3d/) node.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/EdgeEnhancementVolumeStyle.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/screenshot.avif" alt="EdgeEnhancementVolumeStyle"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/EdgeEnhancementVolumeStyle.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/VolumeRendering/EdgeEnhancementVolumeStyle/EdgeEnhancementVolumeStyle.x3d)
{: .example-links }

## See Also

- [X3D Specification of EdgeEnhancementVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#EdgeEnhancementVolumeStyle)
