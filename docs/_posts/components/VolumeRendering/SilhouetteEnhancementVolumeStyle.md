---
title: SilhouetteEnhancementVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [SilhouetteEnhancementVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

SilhouetteEnhancementVolumeStyle specifies that volumetric data is rendered with silhouette enhancement.

The SilhouetteEnhancementVolumeStyle node belongs to the **VolumeRendering** component and requires at least support level **2,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + SilhouetteEnhancementVolumeStyle
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#field-metadata) | NULL  |
| SFBool | [in, out] | [enabled](#field-enabled) | TRUE |
| SFFloat | [in, out] | [silhouetteRetainedOpacity](#field-silhouetteRetainedOpacity) | 1  |
| SFFloat | [in, out] | [silhouetteBoundaryOpacity](#field-silhouetteBoundaryOpacity) | 0  |
| SFFloat | [in, out] | [silhouetteSharpness](#field-silhouetteSharpness) | 0 |
| SFNode | [in, out] | [surfaceNormals](#field-surfaceNormals) | NULL  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #field-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE
{: #field-enabled }

Enables/disables node operation.

### SFFloat [in, out] **silhouetteRetainedOpacity** 1 <small>[0,1]</small>
{: #field-silhouetteRetainedOpacity }

Scaling of non-silhouette regions.

### SFFloat [in, out] **silhouetteBoundaryOpacity** 0 <small>[0,1]</small>
{: #field-silhouetteBoundaryOpacity }

Amount of the silhouette enhancement to use.

### SFFloat [in, out] **silhouetteSharpness** 0.5 <small>[0,∞)</small>
{: #field-silhouetteSharpness }

Power function to control sharpness of the silhouette.

### SFNode [in, out] **surfaceNormals** NULL <small>[X3DTexture3DNode]</small>
{: #field-surfaceNormals }

The *surfaceNormals* field contains a 3D texture with at least three component values. Each voxel in the texture represents the surface normal direction for the corresponding voxel in the base data source.

## Advice

### Hint

- SilhouetteEnhancementVolumeStyle can contain a single Texture3D node with `containerField='surfaceNormals'`

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## See Also

- [X3D Specification of SilhouetteEnhancementVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#SilhouetteEnhancementVolumeStyle)
