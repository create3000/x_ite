---
title: ComposedVolumeStyle
date: 2022-01-07
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

The ComposedVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + ComposedVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### MFNode [in, out] **renderStyle** [ ] <small>[X3DComposableVolumeRenderStyleNode]</small>

List of contributing rendering style nodes or node references that can be applied to the object. Each rendering style is applied strictly in the order declared, starting with the first rendering style in the *renderStyle* field.

## Information

### Hint

- Contains multiple RenderStyle nodes.

### Warning

- Requires X3D profile='Full' or else include <component name='VolumeRendering' level='2'/>

## See Also

- [X3D Specification of ComposedVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#ComposedVolumeStyle){:target="_blank"}
