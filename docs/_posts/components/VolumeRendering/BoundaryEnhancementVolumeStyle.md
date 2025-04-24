---
title: BoundaryEnhancementVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [BoundaryEnhancementVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

BoundaryEnhancementVolumeStyle provides boundary enhancement for the volume rendering style.

The BoundaryEnhancementVolumeStyle node belongs to the **VolumeRendering** component and requires at least support level **2,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + BoundaryEnhancementVolumeStyle
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| SFFloat | [in, out] | [retainedOpacity](#fields-retainedOpacity) | 0.2  |
| SFFloat | [in, out] | [boundaryOpacity](#fields-boundaryOpacity) | 0.9  |
| SFFloat | [in, out] | [opacityFactor](#fields-opacityFactor) | 2  |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### SFFloat [in, out] **retainedOpacity** 0.2 <small>[0,1]</small>
{: #fields-retainedOpacity }

*retainedOpacity* k_gc is the amount of initial opacity to mix into the output

### SFFloat [in, out] **boundaryOpacity** 0.9 <small>[0,1]</small>
{: #fields-boundaryOpacity }

*boundaryOpacity* k_gs is the factored amount of the gradient enhancement to use.

### SFFloat [in, out] **opacityFactor** 2 <small>[0,∞)</small>
{: #fields-opacityFactor }

*opacityFactor* k_ge is the power function to control the slope of the opacity curve to highlight the set of data.

## Advice

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## See Also

- [X3D Specification of BoundaryEnhancementVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#BoundaryEnhancementVolumeStyle)
