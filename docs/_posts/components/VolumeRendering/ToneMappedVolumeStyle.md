---
title: ToneMappedVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [ToneMappedVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ToneMappedVolumeStyle specifies that volumetric data is rendered with Gooch shading model of two-toned warm/cool coloring.

The ToneMappedVolumeStyle node belongs to the [VolumeRendering](/x_ite/components/overview/#volumerendering) component and requires at least support level **2,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ToneMappedVolumeStyle
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFColorRGBA | [in, out] | [coolColor](#fields-coolColor) | 0 0 1 0  |
| SFColorRGBA | [in, out] | [warmColor](#fields-warmColor) | 1 1 0 0  |
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

### SFColorRGBA [in, out] **coolColor** 0 0 1 0 <small>[0,1]</small>
{: #fields-coolColor }

*coolColor* is used for surfaces facing away from the light direction.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFColorRGBA [in, out] **warmColor** 1 1 0 0 <small>[0,1]</small>
{: #fields-warmColor }

*warmColor* is used for surfaces facing towards the light.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color)

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>
{: #fields-surfaceNormals }

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Advice

### Hints

- ToneMappedVolumeStyle can contain a single Texture3D node with `containerField='surfaceNormals'`
- [Gooch shading](https://en.wikipedia.org/wiki/Gooch_shading)

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## Example

<x3d-canvas class="xr-button-br" src="https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/ToneMappedVolumeStyle.x3d" contentScale="auto" update="auto">
  <img src="https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/screenshot.avif" alt="ToneMappedVolumeStyle"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/ToneMappedVolumeStyle.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/examples/VolumeRendering/ToneMappedVolumeStyle/ToneMappedVolumeStyle.x3d)
{: .example-links }

## See Also

- [X3D Specification of ToneMappedVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ToneMappedVolumeStyle)
