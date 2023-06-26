---
title: BoundaryEnhancementVolumeStyle
date: 2022-01-07
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

The BoundaryEnhancementVolumeStyle node belongs to the **VolumeRendering** component and its default container field is *renderStyle.* It is available from X3D version 3.3 or higher.

## Hierarchy

```
+ X3DNode
  + X3DVolumeRenderStyleNode
    + X3DComposableVolumeRenderStyleNode
      + BoundaryEnhancementVolumeStyle
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a MetadataBoolean, MetadataDouble, MetadataFloat, MetadataInteger, MetadataString or MetadataSet node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-CD1/Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **enabled** TRUE

Enables/disables node operation.

### SFFloat [in, out] **retainedOpacity** 0.2 <small>[0,1]</small>

*retainedOpacity* k_gc is the amount of initial opacity to mix into the output

### SFFloat [in, out] **boundaryOpacity** 0.9 <small>[0,1]</small>

*boundaryOpacity* k_gs is the factored amount of the gradient enhancement to use.

### SFFloat [in, out] **opacityFactor** 2 <small>[0,∞)</small>

*opacityFactor* k_ge is the power function to control the slope of the opacity curve to highlight the set of data.

## Information

### Warning

- Requires X3D profile='Full' or else include <component name='VolumeRendering' level='2'/>

## External Links

- [X3D Specification of BoundaryEnhancementVolumeStyle](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/volume.html#BoundaryEnhancementVolumeStyle){:target="_blank"}
