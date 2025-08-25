---
title: ComposedVolumeStyle
date: 2023-01-07
nav: components-VolumeRendering
categories: [components, VolumeRendering]
tags: [ComposedVolumeStyle, VolumeRendering]
---
<style>
.post h3 {
  word-spacing: 0.2em;
}
</style>

## Overview

ComposedVolumeStyle allows compositing multiple rendering styles into single rendering pass.

The ComposedVolumeStyle node belongs to the [VolumeRendering](/x_ite/components/overview/#volumerendering) component and requires at least support level **3,** its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ComposedVolumeStyle
```

## Fields

| Type | Access Type | Name | Default Value |
| ---- | ----------- | ---- | ------------- |
| SFNode | [in, out] | [metadata](#fields-metadata) | NULL  |
| SFBool | [in, out] | [enabled](#fields-enabled) | TRUE |
| MFNode | [in, out] | [renderStyle](#fields-renderStyle) | [ ] |
{: .fields }

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>
{: #fields-metadata }

Information about this node can be contained in a [MetadataBoolean](/x_ite/components/core/metadataboolean/), [MetadataDouble](/x_ite/components/core/metadatadouble/), [MetadataFloat](/x_ite/components/core/metadatafloat/), [MetadataInteger](/x_ite/components/core/metadatainteger/), [MetadataString](/x_ite/components/core/metadatastring/) or [MetadataSet](/x_ite/components/core/metadataset/) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4/ISO-IEC19775-1v4-IS/Part01/components/core.html#Metadata)

### SFBool [in, out] **enabled** TRUE
{: #fields-enabled }

Enables/disables node operation.

### MFNode [in, out] **renderStyle** [ ] <small>[X3DComposableVolumeRenderStyleNode]</small>
{: #fields-renderStyle }

List of contributing rendering style nodes or node references that can be applied to the object. Each rendering style is applied strictly in the order declared, starting with the first rendering style in the *renderStyle* field.

## Advice

### Hint

- Contains multiple RenderStyle nodes.

### Warning

- Requires X3D `profile='Full'` or else include `<component name='VolumeRendering' level='2'/>`

## See Also

- [X3D Specification of ComposedVolumeStyle Node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ComposedVolumeStyle)
